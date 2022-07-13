import { useState } from "react";
import makeRequest from 'make-request-to-server';
import CredentialContext from "../credentialsContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    isAdmin: true,
  })

  let navigate = useNavigate();

  function changeState(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  async function submit(e, context) {
    e.preventDefault();

    const request = await login(context);

    if (request) {
      await context.setState.function(request)
      navigate('/home')
    }
  }

  function login(context) {
    const url = context.serverLink + '/login';
    
    return makeRequest(JSON.stringify(credentials), url);
  }

  return (
    <CredentialContext.Consumer>
      {context => {
        return (
          <>
            <h1>This is an log in form</h1>
            <form onSubmit={(e) => submit(e, context)}>
              <label>Username
                  <input name="username" onChange={changeState} placeholder="username" type="text" />
                </label>

                <label>Password
                  <input name="password" onChange={changeState} type="password" />
                </label>

                <button>Log in</button>
            </form> 
          </>
        )
      }}
    </CredentialContext.Consumer>
  )
}