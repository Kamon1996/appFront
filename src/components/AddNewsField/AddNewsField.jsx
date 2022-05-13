import './index.css';
import React, { useState } from 'react';
import { getDataForPost } from '../../Redux/actions/post';
import { useDispatch } from 'react-redux';

export default function AddNewsField() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title;
    const body = e.target.body;
    const post = { title: title.value, body: body.value };
    dispatch(getDataForPost(post));
    title.value = body.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className='add-news-field-wrapper' action=''>
      <label className='title-wrapper' htmlFor='title'>
        Заголовок
        <input
          autoFocus={true}
          autoComplete='off'
          required
          className='add-news-field'
          placeholder='Введите заголовок'
          name='title'
          id='title'
        ></input>
      </label>
      <label htmlFor='body'>
        Описание
        <input
          autoComplete='off'
          required
          className='add-news-field'
          placeholder='Опишите че да как'
          name='body'
          id='body'
        ></input>
      </label>
      <button className='btn-nice blue' type='submit'>
        Опубликовать
      </button>
    </form>
  );
}
