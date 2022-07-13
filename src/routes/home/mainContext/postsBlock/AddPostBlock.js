import { useState } from "react";
import StyledUpdatePostBlock from "./UpdatePostBlock";

function AddPostBlock({setState}) {
  const [isReadMode, setMode] = useState(true);

  return isReadMode ? <button onClick={() => setMode(false)}>Add post</button> : <StyledUpdatePostBlock setState={setState} setMode={setMode} />
}

export default AddPostBlock;