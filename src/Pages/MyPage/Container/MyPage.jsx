import './index.css';

import React, { useEffect } from 'react';
import MyInfo from '../MyInfo/MyInfo';
import NewsHeader from '../NewsHeader/NewsHeader';
import Post from '../../../components/Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import AddNewsField from '../../../components/AddNewsField/AddNewsField';
import { reqGetPostsAll } from '../../../Redux/actions/post';

export default function MyPage() {
  const { id, name, sername, email, isLogged } = useSelector(
    (store) => store.user
  );
  const postsAll = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reqGetPostsAll());
    return () => {};
  }, []);

  const myPosts = postsAll.filter((post) => post.author.id === id);
  return (
    <div className='my-page'>
      <MyInfo first_name={name} last_name={sername} email={email} />
      <div className='news'>
        <NewsHeader />
        <AddNewsField />
        {myPosts?.length > 0 ? (
          myPosts.map((post) => <Post data={post} key={post.id} />).reverse()
        ) : (
          <h6>У вас пока нет ни одной записи</h6>
        )}
      </div>
    </div>
  );
}
