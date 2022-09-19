import { NextRouter } from "next/router";
import { UserType } from "../redux/auth";
import { DispatchType } from "../redux/store";
import AuthGetCurrentUser from "./AuthGetCurrentUser";

interface InputTypes {
  dispatch: DispatchType;
  currentUser: UserType;
  router: NextRouter;
}

// Call this function when each protected page is loaded
const AuthCheckAuth = ({ dispatch, currentUser, router }: InputTypes) => {
  if (typeof currentUser === "object") {
    return;
  }
  if (currentUser === "preAuth") {
    AuthGetCurrentUser({ dispatch, router });
  } else if (currentUser === "unAuth") {
    router.push("/Auth");
  }
};

export default AuthCheckAuth;
