import React from 'react';
import './index.css';

export default function Error(props) {
  const message = props.info;
  return (
    <div className='alert alert-danger' role='alert'>
      {Array.isArray(message)
        ? message.map((error, i) => <li key={i}>{error}</li>)
        : message}
    </div>
  );
}
