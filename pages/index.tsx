import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AuthCheckAuth from "../src/operations/AuthCheckAuth";
import { RootStateType } from "../src/redux/store";
import GeneralLoading from "../src/components/GeneralLoading";
import styles from "../styles/Home.module.css";
import Head from "next/head";

// https://www.npmjs.com/package/js-file-download

const GetDisplayNumber = (size: number | null) => {
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
};

const Home: NextPage = () => {
  const [gotUser, setGotUser] = useState<boolean>(false);
  const [confirmInput, setConfirmInput] = useState<string>("");
  const { currentUser } = useSelector((state: RootStateType) => state.auth);
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

  const displayNumber = GetDisplayNumber(currentUser.storageSizeInBytes);

  const UpdateConfirmInput = (data: any) => {
    setConfirmInput(data.target.value);
  };

  return (
    <main className={styles.pageWrapper}>
      <section className={styles.contentHolder}>
        <div className={styles.downloadBox}>
          <p className={styles.fadedText}>Vault: Download All</p>
          <div className={styles.boxInfoContainer}>
            <h1>{displayNumber}</h1>
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
                />
                <button className="halfBarButton" type="button">
                  <p className={styles.logOutText}>Download</p>
                </button>
              </div>
              <div className={styles.infoTextHolder}>
                <small className={styles.dowloadInfoText}>
                  Type <i>Confirm</i> and press <i>Download</i> to save all
                  Render Vault uploads to your PC Downloads folder.
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.lineDivider} />
        <div className={styles.nameBox}>
          <h3 className={styles.fadedText}>{currentUser.displayName}</h3>
          <button className="halfBarButton" type="button">
            <p className={styles.logOutText}>Log out</p>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
