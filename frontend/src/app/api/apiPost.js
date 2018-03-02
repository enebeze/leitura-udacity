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