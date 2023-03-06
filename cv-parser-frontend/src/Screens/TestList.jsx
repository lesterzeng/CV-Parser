import React, { useState } from 'react';
import EditButton from '../Component/EditButton'

function TestList() {
  const [text, setText] = useState('Hello, world!');

  function handleEditClick() {
    setText('You clicked the edit button!');
  }

  return (
    <div>
      <p>{text}</p>
      <EditButton onClick={handleEditClick} />
    </div>
  );
}

export default TestList;
