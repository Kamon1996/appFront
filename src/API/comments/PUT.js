import { API } from '../consts';

export async function APIchangeComment(payload) {
  const { id, body } = payload;
  const response = await API.put(`/comments/${id}`, {
    body,
  });
  return response;
}
