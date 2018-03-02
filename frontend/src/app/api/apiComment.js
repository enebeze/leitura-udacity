import api from './api';

export const requestCommentsByPost = postId => api.get(`/posts/${postId}/comments`);

export const add = comment => api.post("/comments", comment);

export const update = comment => api.put(`/comments/${comment.id}`, comment);

export const remove = commentId => api.delete(`/comment/${commentId}`);

export const likeNotLike = (commentId, value) => api.post(`/comment/${commentId}`, value);