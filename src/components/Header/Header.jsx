import React, { useEffect, useState } from 'react';
import './index.css';
import HeaderNavButtons from './HeaderNavButtons/HeaderNavButtons';
import HeaderProfileBtn from './HeaderProfileBtn/HeaderProfileBtn';
import { useDispatch, useSelector, shallowEqual, connect } from 'react-redux';
import { signIn, clearForm, reqLogOut } from '../../Redux/actions/user';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const { isLogged } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const signInHandler = () => {
    dispatch(signIn());
  };
  const logOutHandler = () => {
    dispatch(reqLogOut());
    dispatch(clearForm());
  };

  return (
    <header className='header'>
      <div className='wrapper'>
        <Link to='/news/' className='logo'>
          <i className='fab fa-react'></i>
          <h3>SocialApp</h3>
        </Link>

        {localStorage.getItem('access-token') ? (
          <HeaderProfileBtn logOut={logOutHandler} />
        ) : (
          <HeaderNavButtons signIn={signInHandler} />
        )}
      </div>
    </header>
  );
}
