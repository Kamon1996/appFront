import { API } from '../consts';

export async function APIAddNewPost(payload) {
  const response = await API.post(`/posts`, payload);
  return response;
}
