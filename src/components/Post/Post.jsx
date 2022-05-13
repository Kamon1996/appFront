import './index.css';
import Comment from '../Comment/Comment';

import React, { useEffect, useState } from 'react';
import InputField from './InputField/InputField';
import { useDispatch, useSelector } from 'react-redux';
import {
  reqAddNewComment,
  reqChangePost,
  reqDeleteComment,
  reqDeletePost,
  reqGetCorrentPost,
} from '../../Redux/actions/post';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

export default function Post(props) {
  const { id, author, title, body, created_at, updated_at, comments } =
    props.data;
  const navigate = useNavigate();

  const { id: currentUserID } = useSelector((store) => store.user);

  const [fieldIsShowed, showAddCommentField] = useState(false);
  const [wantMoreComments, showMoreComments] = useState(false);
  const [editeble, allowEditeble] = useState(false);
  const params = useParams();

  const dispatch = useDispatch();
  let location = useLocation();

  const saveChangeHandler = (post) => {
    const body = post.querySelector('.post-text').innerText;
    const title = post.querySelector('.post-title').innerText;
    dispatch(reqChangePost(id, { title, body }));
    allowEditeble(!editeble);
  };

  const deletePostHandler = (id) => {
    dispatch(reqDeletePost(id));
    (location.pathname == `/mypage/${id}` ||
      location.pathname == `/news/${id}`) &&
      navigate(-1, { replace: true });
  };

  const addNewCommentHandler = (comment) => {
    comment && dispatch(reqAddNewComment({ body: comment, post_id: id }));
  };

  const deleteCommentHandler = (commentId) => {
    dispatch(reqDeleteComment(commentId, id));
  };

  return (
    <div id={id} className='post-item'>
      <div className='post-item-header row'>
        <div className='small-avatar'></div>
        <div className='header-info'>
          <h4>
            {author?.name} {author?.sername}
          </h4>
          <p>{created_at}</p>
        </div>
        <i className='fas fa-ellipsis-h'>
          <ul className='pop-up__wrapper'>
            <Link to={`${id}`} className='btn-nice'>
              Показать детали
            </Link>
            {author.id === currentUserID && (
              <>
                <button
                  onClick={() => allowEditeble(!editeble)}
                  className='btn-nice'
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deletePostHandler(id)}
                  className='btn-nice'
                >
                  Удалить запись
                </button>
              </>
            )}
          </ul>
        </i>
      </div>
      <h3 contentEditable={editeble} className='post-title'>
        {title}
      </h3>
      <h4 contentEditable={editeble} className='post-text'>
        {body}
      </h4>
      {editeble && (
        <button
          onClick={(e) => saveChangeHandler(e.target.parentElement)}
          className='btn-nice blue btn-edit'
        >
          Сохранить
        </button>
      )}
      <div className='post-action-buttons row'>
        <div className='like-btn action-btn row'>
          <i className='fas fa-heart'></i>
          <span>10</span>
        </div>
        <div
          onClick={() => showAddCommentField(!fieldIsShowed)}
          className='comment-btn action-btn row'
        >
          <i className='fas fa-comment-alt'></i>
          <span>{comments?.length}</span>
        </div>
        <div className='repost-btn action-btn row'>
          <i className='fas fa-share'></i>
        </div>
      </div>

      <div className='comments'>
        {comments && wantMoreComments
          ? comments.map((comment) => {
              return (
                <Comment
                  data={comment}
                  key={comment.id}
                  onDelete={() => deleteCommentHandler(comment.id)}
                />
              );
            })
          : comments?.slice(0, 2).map((comment) => {
              return (
                <Comment
                  data={comment}
                  key={comment.id}
                  onDelete={() => deleteCommentHandler(comment.id)}
                />
              );
            })}
        {comments?.length > 2 && !wantMoreComments && (
          <button
            onClick={() =>
              showMoreComments(!wantMoreComments, showAddCommentField(true))
            }
            className='btn-nice'
          >
            Показать следующие комментарии
          </button>
        )}
      </div>
      {fieldIsShowed && <InputField onSend={addNewCommentHandler} />}
    </div>
  );
}
