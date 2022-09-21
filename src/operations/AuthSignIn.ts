import { Auth } from "aws-amplify";
import { NextRouter } from "next/router";
import { DispatchType } from "../redux/store";
import AuthGetCurrentUser from "./AuthGetCurrentUser";

interface InputTypes {
  email: string;
  password: string;
  setErrorMessage: Function;
  dispatch: DispatchType;
  router: NextRouter;
}

async function AuthSignIn({
  email,
  password,
  setErrorMessage,
  dispatch,
  router,
}: InputTypes) {
  try {
    const currentUser = await Auth.signIn(email, password);
    if (typeof currentUser.attributes["custom:userID"] === "string") {
      // GetCurrentUser automatically pushes to index
      AuthGetCurrentUser({ dispatch, router });
    } else {
      setErrorMessage("Incorrect email or password.");
    }
  } catch (error) {
    setErrorMessage("Incorrect email or password.");
    console.log(error);
  }
}

export default AuthSignIn;
