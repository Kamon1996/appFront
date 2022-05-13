import { API } from '../consts';

export async function APIDeletePost(id) {
  const response = await API.delete(`/posts/${id}`);
  return response;
}
