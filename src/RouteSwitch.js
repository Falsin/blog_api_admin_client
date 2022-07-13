import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Authentication from "./routes/AuthRoute";
import HomePage from "./routes/home/Home";
import { useState, useEffect } from "react";
import CredentialContext from "./credentialsContext";
import Login from "./routes/Login";


//const serverLink = 'http://localhost:9000';
const serverLink = 'https://powerful-escarpment-32442.herokuapp.com';
let storage = window.localStorage;

const RouteSwitch = () => {
  const [credentials, setCredentials] = useState(() => {
    return storage.getItem('credentials') ? JSON.parse(storage.getItem('credentials')) : null
  })

  const context = {
    setState: {
      credentials: credentials,
      function: request,
    },
    serverLink: serverLink
  }

  useEffect(() => {
    request()
  }, []);

  async function request() {
    try {
      const getUserCredentials = await fetch(serverLink + '/home', {
        credentials: 'include',
      })
        .then(response => response.json());

      const credentialsString = JSON.stringify(getUserCredentials);

      if (credentialsString !== storage.getItem('credentials')) {
        storage.setItem('credentials', credentialsString)
        setCredentials(getUserCredentials);
      }
      
    } catch (error) {
      return null;
    }
  }

  return (
    <CredentialContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/sign-up' element={<Authentication link={serverLink} setParentState={[credentials, setCredentials]} />} />
          <Route path='/home' element={<HomePage state={credentials} />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CredentialContext.Provider>
  )
}

export default RouteSwitch;