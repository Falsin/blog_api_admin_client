import CredentialContext from "../credentialsContext";
import styled from 'styled-components';
import makeRequest from 'make-request-to-server';

const Header = styled(styledHeader)`
  display: flex;
  background: red;
  font-size: 30px;

  .userBlock {
    display: flex;
    margin-left: auto;

    & * {
      margin: 10px;
    }
  }
`

function styledHeader ({className, children}) {
  return (
    <CredentialContext.Consumer>
      {context => {
        return (
          <header className={className}>
            <h1>Blog API</h1>
            {context.setState.credentials ? <AuthorizedUser /> : <UnauthorizedUser />}
          </header>
        )
      }}
    </CredentialContext.Consumer>
  )
}

function AuthorizedUser() {
  async function logOut(context) {
    await makeRequest(JSON.stringify(context.setState.credentials), context.serverLink + '/logout');
    window.localStorage.setItem('credentials', '');
    context.setState.function(null)
  }

  return (
    <CredentialContext.Consumer>
      {context => {
        return (
          <div className="userBlock">
            <div>{context.setState.credentials.username}</div>
            <button onClick={() => logOut(context)}>Log out</button>
          </div>
        )
      }}
    </CredentialContext.Consumer>
  )
}

function UnauthorizedUser(params) {
  return (
    <div className="userBlock">
      <a href="/login">Log In</a>
    </div>
  )
}

export default Header;