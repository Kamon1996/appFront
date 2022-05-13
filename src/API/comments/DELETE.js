import { API } from '../consts';

export async function APIdeleteComment(id) {
  const response = await API.delete(`/comments/${id}`);
  return response;
}
