import { API, Auth, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { NextRouter } from "next/router";
import { setCurrentUser, UserType } from "../redux/auth";
import { DispatchType } from "../redux/store";
import { GetUsersQuery } from "../API";

interface InputTypes {
  dispatch: DispatchType;
  router: NextRouter;
}

// If user is authenticated, fill redux/auth/currentUser with necessary info and head to /index. If not, re-route to /Auth
async function AuthGetCurrentUser({ dispatch, router }: InputTypes) {
  try {
    const userInfo = await Auth.currentUserInfo();
    if (
      userInfo != null &&
      typeof userInfo.attributes === "object" &&
      typeof userInfo.attributes["custom:userID"] === "string"
    ) {
      const userID = userInfo.attributes["custom:userID"];
      const { data } = (await API.graphql(
        graphqlOperation(`
              query GetUser {
                  getUsers (
                      id: "${userID}"
                  ) {
                      id
                      displayname
                      storagesizeinbytes
                  }
              }
          `)
      )) as GraphQLResult<GetUsersQuery>;

      if (
        typeof data != "undefined" &&
        typeof data.getUsers != "undefined" &&
        data.getUsers != null &&
        typeof data.getUsers.displayname === "string" &&
        typeof data.getUsers.storagesizeinbytes != "undefined"
      ) {
        const currentUser: UserType = {
          userID: data.getUsers.id,
          displayName: data.getUsers.displayname,
          storageSizeInBytes: data.getUsers.storagesizeinbytes,
        };
        dispatch(setCurrentUser(currentUser));
        router.push("/");
      }
    } else {
      router.push("/Auth");
      dispatch(setCurrentUser("unAuth"));
    }
  } catch (error) {
    console.log(error);
  }
}

export default AuthGetCurrentUser;
