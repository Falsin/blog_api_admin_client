import Header from "../../commonComponents/Header";
import CredentialContext from "../../credentialsContext";
//import MainContext from "./mainContext/MainContext";
import StyledMainContext from "./mainContext/MainContext";

function HomePage() {
  return (
    <CredentialContext.Consumer>
      {(context) => {
        return (
          <>
            <Header />
            <StyledMainContext serverLink={context.serverLink} />
            <footer>This is footer</footer>
          </>
        ) 
      }}
    </CredentialContext.Consumer>
  )
}

export default HomePage;