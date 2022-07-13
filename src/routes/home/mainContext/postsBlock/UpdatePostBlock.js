import { useState } from "react";
import styled from "styled-components";
import CredentialContext from "../../../../credentialsContext";

const StyledUpdatePostBlock = styled(UpdatePostBlock)`
  display: flex;
  flex-direction: column;
`

function UpdatePostBlock({className, children, setState, post, setMode}) {
  const [postData, setPostData] = useState({
    title: post ? post.title : '',
    text: post ? post.text : '',
  })

  function change(e) {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    })
  }

  async function submit(e, context) {
    e.preventDefault();

    const url = context.serverLink + '/record';
    const method = post ? 'PUT' : 'POST';
    const bodyRequest = !post ? postData : {
      ...post,
      ...postData
    };
    
    let response = await fetch(url, {
      method: method,
      body: JSON.stringify(bodyRequest),
      headers: {"Content-Type": "application/json"},
      credentials: "include"
    })
    response = await response.json();

    if (response) {
      setMode(true);
      setState();
    }
  }

  return (
    <CredentialContext.Consumer>
      {(context) => {
        return (
          <form className={className} onSubmit={(e) => submit(e, context)}>
            <label> Title
              <input name='title' placeholder="Post title" onChange={change} defaultValue={post ? post.title : ""} />
            </label>

            <textarea name='text' placeholder="Some text" onChange={change} defaultValue={post ? post.text : ""} />

            <div className="btns">
              <button onClick={() => setMode(true)} type='button'>Cancel</button>
              <button>{post ? 'Update post' : 'Add post'}</button>
            </div>
          </form>
        )
      }}
    </CredentialContext.Consumer>
  )
}

export default StyledUpdatePostBlock;