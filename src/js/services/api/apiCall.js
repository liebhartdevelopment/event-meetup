export default function apiCall(route, body = {}, method = "GET") {
  // request promise
  const request = new Promise((resolve, reject) => {
    // create a header with a content type
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    // create the requestDetails object
    const requestDetails = {
      method,
      mode: "cors",
      headers
    };
  });
}
