import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import NavSide from '../components/NavSide/NavSide';
import MyPage from '../Pages/MyPage/Container/MyPage';
import NewsPage from '../Pages/NewsPage/NewsPage';
import LoginForm from '../Pages/LoginPage/LoginForm';
import SignIn from '../Pages/SignInPage/SignIn';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { reqGetProfile } from '../Redux/actions/user';
import CorrentPost from '../Pages/CorrentPostPage/CorrentPost';
import Error from '../components/Error/Error';
import { animated, useTransition } from 'react-spring';

export default function App() {
  const { isLogged } = useSelector((store) => store.user);
  const { error } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('access-token') && !isLogged) {
      dispatch(reqGetProfile());
    }
    return () => {};
  }, []);

  return (
    <div className='app'>
      <Header />
      {error.isShowed && <Error info={error.message} />}
      <div className='wrapper'>
        <main className='main'>
          {localStorage.getItem('access-token') ? (
            <>
              <NavSide />
              <Routes>
                <Route index element={<NewsPage />} />
                <Route path='mypage/' element={<MyPage />} />
                <Route path={`mypage/:id`} element={<CorrentPost />} />
                <Route path='news/' element={<NewsPage />} />
                <Route path={`news/:id`} element={<CorrentPost />} />
                <Route path='*' element={<Navigate to='news/' replace />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path='signin' element={<SignIn />} />
              <Route path='logIn' element={<LoginForm />} />
              <Route path='*' element={<Navigate to='signin' replace />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
