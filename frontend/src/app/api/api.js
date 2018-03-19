import { create } from "apisauce";

const baseURL = "https://api-server-udacity.azurewebsites.net";

let token = localStorage.token;
if (!token) token = localStorage.token = "bXktcmVhZHMtZWJlbmV6ZXI=";

const headers = {
  Accept: "application/json",
  Authorization: token
};

// define the api
export default create({
  baseURL: baseURL,
  headers: headers
});