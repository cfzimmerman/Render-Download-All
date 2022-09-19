import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import AuthCheckAuth from "../src/operations/AuthCheckAuth";
import { RootStateType } from "../src/redux/store";
import GeneralLoading from "../src/components/GeneralLoading";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [gotUser, setGotUser] = useState<boolean>(false);
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

  return (
    <main>
      <div className={styles.main}>
        <h1>Hello there</h1>
        <h2>Hello there</h2>
        <h3>Hello there</h3>
        <h4>Hello there</h4>
        <p>Hello there</p>
      </div>
    </main>
  );
};

export default Home;
