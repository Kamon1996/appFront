import './index.css';

import React, { useEffect } from 'react';
import Post from '../../components/Post/Post';
import AddNewsField from '../../components/AddNewsField/AddNewsField';
import { useDispatch, useSelector } from 'react-redux';
import { reqGetPostsAll } from '../../Redux/actions/post';

export default function NewsPage() {
  const postsAll = useSelector((store) => store.posts);
  const { isLogged } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reqGetPostsAll());
    return () => {};
  }, []);

  return (
    <div className='news'>
      <AddNewsField />
      {postsAll.length > 0 &&
        postsAll.map((post) => <Post data={post} key={post.id} />).reverse()}
    </div>
  );
}
