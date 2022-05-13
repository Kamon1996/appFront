import { store } from '../../Redux/store/configureStore';
import { API } from '../consts';

export async function APIsignIn() {
  const {
    user: { email, password },
  } = store.getState();
  const response = await API.post(`/auth/sign_in`, {
    email: email.toLowerCase(),
    password,
  });
  const token = response.data.headers['access-token'];
  API.defaults.headers.common['access-token'] = token;
  API.defaults.headers.common['uid'] = email.toLowerCase();
  localStorage.setItem('uid', email.toLowerCase());
  localStorage.setItem('access-token', token);
  return response;
}

export async function APIlogIn() {
  const {
    user: { name, sername, nickname, email, password },
  } = store.getState();
  const response = await API.post(`/auth`, {
    name,
    sername,
    nickname,
    email,
    password,
  });
  return response;
}
