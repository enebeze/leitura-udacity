import api from './api';

export const requestPosts = (category, postId) => {
  let url = !category
    ? "/posts"
    : postId ? `/posts/${postId}` : `/${category}/posts`;

  return api.get(url);
};

export const add = post => api.post("/posts", post);

export const update = post => api.put(`/posts/${post.id}`, post);

export const remove = postId => api.delete(`/posts/${postId}`);

export const likeNotLike = (postId, value) => api.post(`/posts/${postId}`, value);

// export const get = bookId =>
//   fetch(`${api}/books/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book);

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data => data.books);

// export const update = (book, shelf) =>
//   fetch(`${api}/books/${book.id}`, {
//     method: "PUT",
//     headers: {
//       ...headers,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json());

// export const search = (query, maxResults) =>
//   fetch(`${api}/search`, {
//     method: "POST",
//     headers: {
//       ...headers,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ query, maxResults })
//   })
//     .then(res => res.json())
//     .then(data => data.books);
