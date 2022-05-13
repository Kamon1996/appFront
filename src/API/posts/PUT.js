import { API } from '../consts';

export async function APIChangePost(payload) {
  const response = await API.put(`/posts/${payload.id}`, payload.newData);
  return response.data;
}
