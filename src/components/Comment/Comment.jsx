import './index.css';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqChangeComment } from '../../Redux/actions/post';

export default function Comment(props) {
  const { id, body, created_at, updated_at, author } = props.data;
  const { onDelete } = props;
  const { id: currentUserID } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const changeCommentHandler = (id, body) => {
    dispatch(reqChangeComment(id, body));
  };
  const [editeble, allowEdit] = useState(false);
  return (
    <div id={id} className='comment-item'>
      <div className='comment-item-avatar'></div>
      <div className='comment-item-body'>
        <div className='row comment-header'>
          <h5 className='author'>
            {author.name} {author.sername}
          </h5>
          <div className='row comment-buttons'>
            {author.id === currentUserID && (
              <>
                <button onClick={() => allowEdit(true)}>
                  <i className='fas fa-pen'></i>
                </button>
                <button onClick={onDelete}>
                  <i className='fas fa-times'></i>
                </button>
              </>
            )}
          </div>
        </div>
        <h4 contentEditable={editeble} className='text'>
          {body}
        </h4>
        {editeble && (
          <button
            onClick={(e) =>
              allowEdit(
                false,
                changeCommentHandler(
                  id,
                  e.target.previousElementSibling.innerText
                )
              )
            }
            className='btn-nice blue'
          >
            Сохранить
          </button>
        )}
        <p className='data-info'>{created_at}</p>
      </div>
    </div>
  );
}
