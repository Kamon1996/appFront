import { API } from '../consts';

export async function APIlogOut() {
  const response = await API.delete(`/auth/sign_out`);
  return response;
}
