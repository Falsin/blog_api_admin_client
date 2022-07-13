import { useNavigate } from "react-router-dom";
import makeRequest from 'make-request-to-server';
import { useState } from "react";
import CredentialContext from "../credentialsContext";

function Authentication(props) {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    isAdmin: true
  })

  function changeState(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  async function submit(e, context) {
    e.preventDefault();

    const response = await checkPasswordAndSingUp(context.serverLink);

    if (!Array.isArray(response)) {
      await context.setState.function(response)
      navigate('/home')
    } else {
      console.log(response)
    }
  }

  async function checkPasswordAndSingUp(link) {
    const result = prompt('Type the secret password', '');
  
    const objet = {
      credentials: credentials,
      password: result
    }
  
    const url = link + '/check';
  
    return makeRequest(JSON.stringify(objet), url);
  }

  return (
    <CredentialContext.Consumer>
      {(context) => {
        console.log(context)
        return (
          <div>
            <h1>This is an authentication form</h1>
            <form onSubmit={(e) => submit(e, context)} >
              <label>First name
                <input name="first_name" onChange={changeState} placeholder="First name" type="text" />
              </label>

              <label>Last name
                <input name="last_name" onChange={changeState} placeholder="Last name" type="text" />
              </label>

              <label>Username
                <input name="username" onChange={changeState} placeholder="username" type="text" />
              </label>

              <label>Password
                <input name="password" onChange={changeState} type="password" />
              </label>

              <button>Sign up</button>
            </form>
          </div>
        )
      }}
    </CredentialContext.Consumer>
  )
}

export default Authentication;