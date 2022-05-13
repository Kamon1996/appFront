import { API } from '../consts';

export async function APIgetPostsAll() {
  const response = await API.get(`/posts`);
  return response;
}

export async function APIgetCorrentPost(id) {
  const response = await API.get(`/posts/${id}`);
  return response.data;
}

export async function APIgetPostsLimited(count) {
  const response = await API.get(`/posts/lim/${count}`);
  return response.data;
}
