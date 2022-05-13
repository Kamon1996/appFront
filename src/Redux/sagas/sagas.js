import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  REQUEST_ADD_NEW_COMMENT,
  REQUEST_ADD_NEW_POST,
  REQUEST_CHANGE_COMMENT,
  REQUEST_CHANGE_POST,
  REQUEST_DELETE_COMMENT,
  REQUEST_DELETE_POST,
  REQUEST_GET_CORRENT_POST,
  REQUEST_GET_POSTS_ALL,
  REQUEST_LOG_OUT,
} from '../actions/types';

import {
  addNewComment,
  addNewPost,
  changePost,
  deleteComment,
  deletePost,
  getCorrentPost,
  getPostsAll,
} from '../actions/post';

import {
  REQUEST_LOG_IN,
  REQUEST_GET_PROFILE,
  REQUEST_SIGN_IN,
} from '../actions/types';
import { APIlogIn, APIsignIn } from '../../API/auth/POST';
import { APIgetCorrentPost, APIgetPostsAll } from '../../API/posts/GET';
import { APIAddNewPost } from '../../API/posts/POST';
import { APIDeletePost } from '../../API/posts/DELETE';
import { APIChangePost } from '../../API/posts/PUT';
import { APIAddNewComment } from '../../API/comments/POST';
import { APIdeleteComment } from '../../API/comments/DELETE';
import { APIchangeComment } from '../../API/comments/PUT';
import { APIgetProfile } from '../../API/auth/GET';
import { removeError, setError } from '../actions/error';
import { clearForm, logOut, signIn } from '../actions/user';
import { APIlogOut } from '../../API/auth/DELETE';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* sagaWatcher() {
  yield takeLeading(REQUEST_SIGN_IN, sagaSignIn);
  yield takeLeading(REQUEST_LOG_IN, sagaLogIn);
  yield takeEvery(REQUEST_ADD_NEW_POST, sagaNewPostAdd);
  yield takeLeading(REQUEST_DELETE_POST, sagaDeletePost);
  yield takeLeading(REQUEST_CHANGE_POST, sagaChangePost);
  yield takeLeading(REQUEST_ADD_NEW_COMMENT, sagaAddNewComment);
  yield takeLeading(REQUEST_DELETE_COMMENT, sagaDeleteComment);
  yield takeLeading(REQUEST_GET_CORRENT_POST, sagaGetCorrentPost);
  yield takeLeading(REQUEST_CHANGE_COMMENT, sagaChangeComment);
  yield takeLeading(REQUEST_GET_PROFILE, sageGetProfile);
  yield takeLeading(REQUEST_GET_POSTS_ALL, sagaGetPostsAll);
  yield takeLeading(REQUEST_LOG_OUT, sagaLogOut);
}
//-----------------------------------------------------------//
//---------- Настройка Всплывающего окна с ошибкой ----------//
//-----------------------------------------------------------//

function* showError(error, timeOut = 1500) {
  yield put(setError(error));
  yield delay(timeOut);
  yield put(removeError());
}

//-----------------------------------------------------------//
//--------------- Операции с ауентификацией -----------------//
//-----------------------------------------------------------//

//------ Вход, получение токена и постов ------ //

function* sagaSignIn() {
  try {
    const payload = yield call(APIsignIn);
    yield put(signIn(payload));
    yield put(clearForm());
  } catch (error) {
    yield showError(error.response.data || error.response.data);
  }
}

//------ Регистрация ------ //

function* sagaLogIn() {
  try {
    yield call(APIlogIn);
    console.log('lol tut bi navigate na sign in');
  } catch (error) {
    yield showError(error.response.data.error);
  }
}

//------ Если есть токен - Оставить пользователя залогиненым ------ //

function* sageGetProfile() {
  try {
    const response = yield call(APIgetProfile);
    yield put(signIn(response));
  } catch (error) {
    yield showError(
      error.response.data.errors ||
        `
      Что-то пошло не так..
      `
    );
  }
}

//------ Выход из сессии ------ //

function* sagaLogOut() {
  try {
    yield call(APIlogOut);
    yield put(logOut());
  } catch (error) {
    yield showError(error.response.data);
  }
}

//-----------------------------------------------------------//
//--------------- Операции с постами ------------------------//
//-----------------------------------------------------------//

//------ Получить все посты ------ //

function* sagaGetPostsAll() {
  try {
    const response = yield call(APIgetPostsAll);
    yield put(getPostsAll(response.data.posts));
  } catch (error) {
    yield showError(
      error.response.data.errors ||
        `
      Что-то пошло не так..
      `
    );
  }
}

//------ Добавить новый пост ------ //

function* sagaNewPostAdd(action) {
  try {
    const payload = yield call(APIAddNewPost, action.payload);
    yield put(addNewPost(payload));
  } catch (error) {
    yield showError(
      error.response.data ||
        `
        что-то пошло не так
    `
    );
  }
}

//------ Удалить выбранный пост ------ //

function* sagaDeletePost(action) {
  try {
    yield call(APIDeletePost, action.payload);
    yield put(deletePost(action.payload));
  } catch (error) {
    yield showError(error.response.data);
  }
}

//------ Изменить выбранный пост ------ //

function* sagaChangePost(action) {
  try {
    const changedPost = yield call(APIChangePost, action.payload);
    yield put(changePost(changedPost));
  } catch (error) {
    yield showError(error.response.data);
  }
}

//------ Получить выбранный пост по id  ------ //

function* sagaGetCorrentPost(action) {
  try {
    const postData = yield call(APIgetCorrentPost, action.payload);
    yield put(getCorrentPost(postData));
  } catch (error) {
    yield showError(
      error.response.data ||
        `
      post Not Found
      `
    );
  }
}

//-----------------------------------------------------------//
//--------------- Операции с комментариями ------------------//
//-----------------------------------------------------------//

//------ Добавить новый комментарий ------ //

function* sagaAddNewComment(action) {
  try {
    const newPost = yield call(APIAddNewComment, action.payload);
    yield put(addNewComment(newPost));
  } catch (error) {
    yield showError(
      error.response.data ||
        `
        Привет, кажется ты нашел баг!
        Сейчас разберемся..
    `
    );
  }
}

//------ Удалить выбранный комментарий ------ //

function* sagaDeleteComment(action) {
  try {
    yield call(APIdeleteComment, action.payload.commentId);
    yield put(deleteComment(action.payload.commentId, action.payload.postId));
  } catch (error) {
    yield showError(error.response.data);
  }
}

//------ Измененить комментарий  ------ //

function* sagaChangeComment(action) {
  try {
    yield call(APIchangeComment, action.payload);
  } catch (error) {
    yield showError(error.response.data);
  }
}
