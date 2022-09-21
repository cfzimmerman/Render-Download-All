import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AuthCheckAuth from "../src/operations/AuthCheckAuth";
import { RootStateType } from "../src/redux/store";
import GeneralLoading from "../src/components/GeneralLoading";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import AuthLogOut from "../src/operations/AuthLogOut";
import DownloadSingle from "../src/operations/DownloadSingle";

// https://www.npmjs.com/package/js-file-download

const GetDisplayNumber = ({
  size,
  downloadActive,
  storageSizeInBytes,
  downloadBytesCompleted,
}: {
  size: number | null;
  downloadActive: boolean;
  storageSizeInBytes: number | null;
  downloadBytesCompleted: number;
}) => {
  if (downloadActive === false) {
    if (typeof size === "number") {
      const mbSize = Math.round(size / 1000000);
      if (mbSize < 1) {
        return "<1 mb";
      } else if (mbSize > 999) {
        return `${mbSize / 1000} gb`;
      } else {
        return `${mbSize} mb`;
      }
    }
    return "";
  }
  if (storageSizeInBytes === null) {
    return "0%";
  }
  return `${Math.floor((downloadBytesCompleted / storageSizeInBytes) * 100)}%`;
};

const Home: NextPage = () => {
  const [gotUser, setGotUser] = useState<boolean>(false);
  const [confirmInput, setConfirmInput] = useState<string>("");
  const { currentUser } = useSelector((state: RootStateType) => state.auth);
  const { downloadActive, downloadBytesCompleted } = useSelector(
    (state: RootStateType) => state.download
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (gotUser === false) {
      AuthCheckAuth({ dispatch, currentUser, router });
      setGotUser(true);
    }
  });

  if (typeof currentUser != "object") {
    return <GeneralLoading />;
  }

  const displayHeader = GetDisplayNumber({
    size: currentUser.storageSizeInBytes,
    downloadActive,
    storageSizeInBytes: currentUser.storageSizeInBytes,
    downloadBytesCompleted,
  });

  const UpdateConfirmInput = (data: any) => {
    setConfirmInput(data.target.value);
  };

  const LogOut = () => {
    AuthLogOut({ dispatch, router });
  };

  const BottomDescription = () => {
    if (downloadActive === false) {
      return (
        <small className={styles.dowloadInfoText}>
          Type <i>Confirm</i> and press <i>Download</i> to save all Render Vault
          uploads to your PC Downloads folder.
        </small>
      );
    }
    return (
      <small className={styles.dowloadInfoText}>
        Download in progress. Please do not close the tab. All buttons are
        frozen until completion.
      </small>
    );
  };

  return (
    <main className={styles.pageWrapper}>
      <section className={styles.contentHolder}>
        <div className={styles.downloadBox}>
          <p className={styles.fadedText}>Vault: Download All</p>
          <div className={styles.boxInfoContainer}>
            <h1
              className={styles.downloadHeader}
              data-downloading={downloadActive.toString()}
            >
              {displayHeader}
            </h1>
            <div className={styles.downloadWrapper}>
              <div className={styles.confirmBox}>
                <input
                  className="fullBarInput"
                  id={styles.confirmInput}
                  type="text"
                  onChange={UpdateConfirmInput}
                  placeholder="Confirm"
                  value={confirmInput}
                  data-text={confirmInput.toUpperCase()}
                  disabled={downloadActive}
                />
                <button
                  className="halfBarButton"
                  type="button"
                  disabled={downloadActive}
                >
                  <p className={styles.logOutText}>Download</p>
                </button>
              </div>
              <div className={styles.infoTextHolder}>
                <BottomDescription />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.lineDivider} />
        <div className={styles.nameBox}>
          <h3 className={styles.fadedText}>{currentUser.displayName}</h3>
          <button
            className="halfBarButton"
            type="button"
            onClick={LogOut}
            disabled={downloadActive}
          >
            <p className={styles.logOutText}>Log out</p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
