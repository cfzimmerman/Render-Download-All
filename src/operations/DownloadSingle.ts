import { Storage } from "aws-amplify";
import { DispatchType } from "../redux/store";
import fileDownload from "js-file-download";
import { incrementDownloadBytesCompleted } from "../redux/download";

interface InputTypes {
  dispatch: DispatchType;
  contentKey: string;
}

async function DownloadSingle({
  dispatch,
  contentKey,
}: InputTypes): Promise<"success" | "failure"> {
  try {
    const blobResult = await Storage.get(contentKey, { download: true });
    if (typeof blobResult != "undefined") {
      //@ts-ignore
      fileDownload(blobResult.Body, contentKey);
      // @ts-ignore
      dispatch(incrementDownloadBytesCompleted(blobResult.Body.size));
    }
    return "success";
  } catch (error) {
    console.log(error);
    return "failure";
  }
}

export default DownloadSingle;
