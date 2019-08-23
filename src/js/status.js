import "./general";
import apiCall from "./services/api/apiCall";
import Chart from "chart.js";

class Status {
  constructor() {
    // get all tab elements
    this.$experienceTab = document.querySelector("#experienceTab");
    this.$professionTab = document.querySelector("#professionTab");
    this.$ageTab = document.querySelector("#ageTab");
    // get all canvas elements
    this.$ageCanvas = document.querySelector("#ageChart");
    this.$professionCanvas = document.querySelector("#professionChart");
    this.$experienceCanvas = document.querySelector("#experienceChart");
    // get misc elements
    this.$loadingIndicator = document.querySelector("#loadingIndicator");
    this.$tabArea = document.querySelector("#tabArea");
    this.$chartArea = document.querySelector("#chartArea");
    // get error message element
    this.$errorMessage = document.querySelector("#loadingError");
    // variable to store data
    this.statisticData;
    // make network request
    this.loadData();
    // Event listeners method
    this.addEventListeners();
  }

  // load data method
  loadData() {
    apiCall("statistics")
      .then(response => {
        this.statisticData = response;

        this.$loadingIndicator.classList.add("hidden");
        this.$tabArea.classList.remove("hidden");
        this.$chartArea.classList.remove("hidden");

        this.loadExperience();
      })
      .catch(() => {
        this.$loadingIndicator.classList.add("hidden");
        this.$errorMessage.classList.remove("hidden");
      });
  }

  // load experience chart function
  loadExperience(event = null) {
    if (event) event.preventDefault();
    this.hideCharts();
    this.$experienceCanvas.classList.remove("hidden");
    this.$experienceTab.parentElement.classList.add("active");

    const data = {
      datasets: [
        {
          data: this.statisticData.experience,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)"
          ],
          borderColor: ["white", "white", "white"]
        }
      ],
      labels: ["Beginner", "Intermediate", "Advanced"]
    };

    new Chart(this.$experienceCanvas, {
      type: "pie",
      data
    });
  }

  // load profession chart function
  loadProfession(event = null) {
    if (event) event.preventDefault();
    this.hideCharts();
    this.$professionCanvas.classList.remove("hidden");
    this.$professionTab.parentElement.classList.add("active");

    const data = {
      datasets: [
        {
          data: this.statisticData.profession,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 130, 105, 0.6)"
          ],
          borderColor: ["white", "white", "white", "white", "white"]
        }
      ],
      labels: [
        "School Student",
        "College Student",
        "Trainees",
        "Employees",
        "Freelancers"
      ]
    };

    new Chart(this.$professionCanvas, {
      type: "pie",
      data
    });
  }

  // load age chart function
  loadAge(event = null) {
    if (event) event.preventDefault();
    this.hideCharts();
    this.$ageCanvas.classList.remove("hidden");
    this.$ageTab.parentElement.classList.add("active");

    const data = {
      datasets: [
        {
          data: this.statisticData.age,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)"
          ],
          borderColor: ["white", "white", "white"]
        }
      ],
      labels: ["10-15 years", "15-25 years", "25-35 years"]
    };

    new Chart(this.$ageCanvas, {
      type: "pie",
      data
    });
  }

  // hide charts depending on active tab
  hideCharts() {
    this.$experienceTab.parentElement.classList.remove("active");
    this.$professionTab.parentElement.classList.remove("active");
    this.$ageTab.parentElement.classList.remove("active");
    this.$ageCanvas.classList.add("hidden");
    this.$professionCanvas.classList.add("hidden");
    this.$experienceCanvas.classList.add("hidden");
  }

  // add event listener to clicked tab items
  addEventListeners() {
    this.$experienceTab.addEventListener(
      "click",
      this.loadExperience.bind(this)
    );
    this.$professionTab.addEventListener(
      "click",
      this.loadProfession.bind(this)
    );
    this.$ageTab.addEventListener("click", this.loadAge.bind(this));
  }
}

window.addEventListener("load", () => {
  new Status();
});
