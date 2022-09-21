import { NextRouter } from "next/router";
import { Auth } from "aws-amplify";
import { clearAuth } from "../redux/auth";
import { DispatchType } from "../redux/store";
import { clearDownload } from "../redux/download";

interface InputTypes {
  dispatch: DispatchType;
  router: NextRouter;
}

async function AuthLogOut({ dispatch, router }: InputTypes) {
  try {
    dispatch(clearAuth());
    dispatch(clearDownload());
    await Auth.signOut();
    router.push("/Auth");
  } catch (error) {
    console.log(error);
  }
}

export default AuthLogOut;
