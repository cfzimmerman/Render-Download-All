import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AuthCheckAuth from "../src/operations/AuthCheckAuth";
import { RootStateType } from "../src/redux/store";
import GeneralLoading from "../src/components/GeneralLoading";
import styles from "../styles/Home.module.css";
import AuthLogOut from "../src/operations/AuthLogOut";
import DownloadManager from "../src/operations/DownloadManager";
import { setDownloadActive } from "../src/redux/download";
import HomeGetHeader from "../src/operations/HomeGetHeader";
import HomeBottomDescription from "../src/components/HomeBottomDescription";

const Home: NextPage = () => {
  const [gotUser, setGotUser] = useState<boolean>(false);
  const [confirmInput, setConfirmInput] = useState<string>("");
  const { currentUser } = useSelector((state: RootStateType) => state.auth);
  const { downloadActive, downloadBytesCompleted, downloadComplete } =
    useSelector((state: RootStateType) => state.download);

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

  const displayHeader = HomeGetHeader({
    size: currentUser.storageSizeInBytes,
    downloadActive,
    storageSizeInBytes: currentUser.storageSizeInBytes,
    downloadBytesCompleted,
    downloadComplete,
  });

  const UpdateConfirmInput = (data: any) => {
    setConfirmInput(data.target.value);
  };

  const LogOut = () => {
    AuthLogOut({ dispatch, router });
  };

  const ActivateDownload = () => {
    if (downloadActive === false && confirmInput.toUpperCase() === "CONFIRM") {
      DownloadManager({ dispatch, userID: currentUser.userID });
      dispatch(setDownloadActive(true));
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <section className={styles.contentHolder}>
        <div className={styles.downloadBox}>
          <p className={styles.fadedText}>Vault: Download All</p>
          <div className={styles.boxInfoContainer}>
            <div className={styles.downloadWrapper}>
              <h1
                className={styles.downloadHeader}
                data-downloading={downloadActive.toString()}
              >
                {displayHeader}
              </h1>
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
                  onClick={ActivateDownload}
                >
                  <p className={styles.logOutText}>Download</p>
                </button>
              </div>
              <div className={styles.infoTextHolder}>
                <HomeBottomDescription
                  downloadActive={downloadActive}
                  downloadComplete={downloadComplete}
                />
              </div>
            </div>
          </div>
        </div>
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
