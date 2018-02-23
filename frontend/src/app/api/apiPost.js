import { create } from "apisauce";

const baseURL = "http://localhost:3001";

let token = localStorage.token;
if (!token) token = localStorage.token = "bXktcmVhZHMtZWJlbmV6ZXI=";

const headers = {
  Accept: "application/json",
  Authorization: token
};

// define the api
const api = create({
  baseURL: baseURL,
  headers: headers
});

export const getPosts = (category, post_id) => {
  let url = !category
    ? "/posts"
    : post_id ? `/posts/${post_id}` : `/${category}/posts`;

  return api.get(url);
};

export const get = bookId =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json());

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, maxResults })
  })
    .then(res => res.json())
    .then(data => data.books);
