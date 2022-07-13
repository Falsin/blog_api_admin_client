import { useState } from "react";

export default function AddCommentBlock({post, serverLink, getComments}) {
  const [commentData, setCommentData] = useState({text: ''});

  async function submit(e) {
    e.preventDefault();

    console.log('fuck')

    let request = await fetch(serverLink + '/comment', {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        ...post,
        comment: commentData
      })
    })
    
    request = await request.json();
    console.log('test')

    if (request) {
      setCommentData({text: ''})
      getComments();
    }
  }

  return (
    <form onSubmit={submit}>
      <textarea name='text' onChange={e => setCommentData({text: e.target.value})} value={commentData.text} />
      <button>Add comment</button>
    </form>
  )
}