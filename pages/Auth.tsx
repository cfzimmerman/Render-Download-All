import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import type { NextPage } from "next";
import styles from "../styles/Auth.module.css";
import { useDispatch } from "react-redux";
import AuthSignIn from "../src/operations/AuthSignIn";

const Authentication: NextPage = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  const FormSubmit = () => {
    if (!emailInput.includes("@")) {
      setErrorMessage("Please provide your email address.");
    } else if (passwordInput.length < 1) {
      setErrorMessage("Please provide your password.");
    } else {
      setErrorMessage("");
      AuthSignIn({
        email: emailInput,
        password: passwordInput,
        setErrorMessage,
        dispatch,
        router,
      });
    }
  };

  const UpdateEmailInput = (data: any) => {
    setEmailInput(data.target.value);
  };

  const UpdatePasswordInput = (data: any) => {
    setPasswordInput(data.target.value);
  };

  return (
    <div>
      <div className={styles.blurredBackground}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta name="theme-color" content="#000000" />
        </Head>
        <main className={styles.pageWrapper}>
          <section className={styles.contentContainer}>
            <div className={styles.renderLogo}>
              <Image
                src={
                  "https://mobile965f75596afb4ca68a1e637998665f92161112-production.s3.amazonaws.com/public/CompanyStock/Render-text-logo.png"
                }
                layout="fill"
                objectFit="contain"
                alt="Render text logo"
                priority={true}
              />
            </div>
            <form className={styles.pageForm}>
              <div className={styles.itemSpacer}>
                <input
                  className="fullBarInput"
                  type="email"
                  onChange={UpdateEmailInput}
                  placeholder="Email"
                  value={emailInput}
                />
              </div>
              <div className={styles.itemSpacer}>
                <input
                  className="fullBarInput"
                  type="password"
                  onChange={UpdatePasswordInput}
                  placeholder="Password"
                  value={passwordInput}
                />
              </div>
              <div className={styles.itemSpacer}>
                <small className={styles.errorMessage}>{errorMessage}</small>
              </div>
              <div className={styles.halfBarButtonHolder}>
                <button
                  className="halfBarButton"
                  type="button"
                  onClick={FormSubmit}
                >
                  <p className={styles.buttonText}>Submit</p>
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Authentication;
