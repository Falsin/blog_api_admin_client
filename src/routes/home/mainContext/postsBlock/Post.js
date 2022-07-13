import { useState } from 'react';
import CredentialContext from '../../../../credentialsContext';
import StyledUpdatePostBlock from './UpdatePostBlock';
import styled from "styled-components";
import CommentsBlock from '../commentsBlock/CommentsBlock';

const StyledPost = styled(Post)`
  border: solid red 1px;
  min-width: 60vmin;
`

function Post({post, setState, className, children}) {
  const [isReadMode, setMode] = useState(true);

  async function makeDelete(context) {

    const url = context.serverLink + '/record';

    let request = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(post)
    })

    request = await request.json();

    if (request) {
      setState()
    }
  }

  return (
    <CredentialContext.Consumer>
      {(context) => {
        const date = new Date(post.date);
        const formatDate = date.toLocaleString('ru')
        
        if (isReadMode) {
          return (
            <div className={className + ' post'}>
              <div className="author">{post.author.username}</div>
              <div className="date">{formatDate}</div>
              <h2>{post.title}</h2>
              <div className="content">{post.text}</div>
  
              <button onClick={() => setMode(false)}>Edit</button>
              <button onClick={() => makeDelete(context)}>Delete</button>

              <CommentsBlock post={post} serverLink={context.serverLink} />
            </div>
          )
        }
        return <StyledUpdatePostBlock setState={setState} post={post} setMode={setMode} />
      }}
    </CredentialContext.Consumer>
  )
}

export default StyledPost;