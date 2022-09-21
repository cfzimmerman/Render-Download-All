import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { PostsByUsersQuery } from "../API";
import { setDownloadAcive, setDownloadComplete } from "../redux/download";
import { DispatchType } from "../redux/store";
import DownloadSingle from "./DownloadSingle";

const GetNextToken = (nextToken: string | null) => {
  if (nextToken === null) {
    return `nextToken: null`;
  }
  return `nextToken: "${nextToken}"`;
};

interface DRPT {
  dispatch: DispatchType;
  queryLimit: number;
  userID: string;
  nextToken: string | null;
}

async function DownloadRecursion({
  dispatch,
  queryLimit,
  userID,
  nextToken,
}: DRPT): Promise<"success" | "failure"> {
  try {
    const { data } = (await API.graphql(
      graphqlOperation(`
        query PostsByUsers {
            postsByUsers (
                usersID: "${userID}",
                sortDirection: ASC,
                limit: ${queryLimit},
                ${GetNextToken(nextToken)},
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
    return "success";
  } catch (error) {
    console.log(error);
    return "failure";
  }
}

interface InputTypes {
  dispatch: DispatchType;
  userID: string;
}

async function DownloadManager({ dispatch, userID }: InputTypes) {
  try {
    const queryLimit = 20;
    const downloadResult = await DownloadRecursion({
      dispatch,
      queryLimit,
      userID,
      nextToken: null,
    });
    dispatch(setDownloadAcive(false));
    dispatch(setDownloadComplete(true));
  } catch (error) {
    console.log(error);
  }
}

export default DownloadManager;
