import { create } from "apisauce";

const baseURL = "http://localhost:3001";

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