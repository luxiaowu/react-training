import React, { useState, useEffect } from 'react';

const HocExample = () => {
  const [comments, setComments] = useState([]);
  return (
    <div>
      {/* {comments.map(x => (
        <Comment comment={x} key={x.id}></Comment>
      ))} */}
    </div>
  );
}

export default HocExample;
