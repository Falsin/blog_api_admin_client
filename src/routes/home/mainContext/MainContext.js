import { useEffect, useState } from "react";
import uniqid from "uniqid";
import AddPostBlock from "./postsBlock/AddPostBlock";
import StyledPost from "./postsBlock/Post";
import styled from "styled-components";

const StyledMainContext = styled(MainContext)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function MainContext({serverLink, children, className}) {
  const [postCollection, setPostCollection] = useState([]);

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts() {
    const url = serverLink + '/record';

    const request = await fetch(url, {
      credentials: 'include'
    })

    setPostCollection(await request.json())
  }

  return (
    <div id="mainContent" className={className}>
      <AddPostBlock setState={getPosts} />
      {postCollection.map(elem => <StyledPost key={uniqid()} post={elem} setState={getPosts} />)}
    </div>
  )
}

export default StyledMainContext;