import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { PostsByUsersQuery } from "../API";
import {
  setDownloadActive,
  setDownloadBytesCompleted,
  setDownloadComplete,
} from "../redux/download";
import { DispatchType } from "../redux/store";
import DownloadGetNextToken from "./DownloadGetNextToken";
import DownloadSingle from "./DownloadSingle";

async function DownloadRecursion({
  dispatch,
  queryLimit,
  userID,
  nextToken,
}: {
  dispatch: DispatchType;
  queryLimit: number;
  userID: string;
  nextToken: string | null;
}) {
  try {
    const { data } = (await API.graphql(
      graphqlOperation(`
        query PostsByUsers {
            postsByUsers (
                usersID: "${userID}",
                sortDirection: ASC,
                limit: ${queryLimit},
                ${DownloadGetNextToken(nextToken)},
                filter: {
                    cognitosub: {
                        ne: "deleted"
                    }
                }
            ) {
                items {
                    id
                    contentkey
                }
                nextToken
            }
        }
    `)
    )) as GraphQLResult<PostsByUsersQuery>;

    const postResults = data?.postsByUsers?.items;

    if (typeof postResults === "object") {
      for await (const item of postResults) {
        if (typeof item?.contentkey === "string") {
          await DownloadSingle({
            dispatch,
            contentKey: item?.contentkey,
          });
        }
      }
    }

    if (typeof data?.postsByUsers?.nextToken === "string") {
      DownloadRecursion({
        dispatch,
        queryLimit,
        userID,
        nextToken: data.postsByUsers.nextToken,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

interface InputTypes {
  dispatch: DispatchType;
  userID: string;
}

// This function takes a user's ID and recursively iterates through all the user's posts, downloading each image and video along the way.
async function DownloadManager({ dispatch, userID }: InputTypes) {
  try {
    const queryLimit = 20;
    await DownloadRecursion({
      dispatch,
      queryLimit,
      userID,
      nextToken: null,
    });
    dispatch(setDownloadActive(false));
    dispatch(setDownloadComplete(true));
    dispatch(setDownloadBytesCompleted(0));
  } catch (error) {
    console.log(error);
  }
}

export default DownloadManager;
