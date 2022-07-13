import { useEffect, useState } from "react";
import Comment from "./Comment";
import uniqid from "uniqid"; 
import AddCommentBlock from "./AddCommentBlock";

function CommentsBlock({post, serverLink}) {
  const [commentsArray, setCommentsArray] = useState([]);
  const [isInvisible, setInvisibleStatus] = useState(true);

  useEffect(() => {
    getComments()
  }, [])

  async function getComments() {
    let request = await fetch(serverLink + `/comment/${post._id}`, {
      credentials: 'include',
    })
    console.log(post)
    request = await request.json();
    setCommentsArray(request)
  }

  return (
    <div>
      <button onClick={() => setInvisibleStatus(!isInvisible)}>{isInvisible ? `Show ${commentsArray.length} comments` : 'hide comments'}</button>
      {isInvisible
        ? null
        : <>
            {commentsArray.map(elem => <Comment key={uniqid()} comment={elem} />)}
            <AddCommentBlock post={post} serverLink={serverLink} getComments={getComments} />
          </>
      }
    </div>
  )
}

export default CommentsBlock;