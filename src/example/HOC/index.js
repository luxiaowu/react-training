import React, { useState } from 'react'

const HocExample = () => {
  const [comments] = useState([])
  return (
    <div>
      {/* {comments.map(x => (
        <Comment comment={x} key={x.id}></Comment>
      ))} */}
      <ul>
        {comments.map(x => (
          <li key={x.id}>{x.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default HocExample
