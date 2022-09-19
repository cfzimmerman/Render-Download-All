import React, { useState } from "react";
import type { NextPage } from "next";
import GeneralLoading from "../src/components/GeneralLoading";
import styles from "../styles/Auth.module.css";

const ErrorMessage = () => {};

const Auth: NextPage = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const FormSubmit = () => {
    setErrorMessage("Submitted");
  };

  const UpdateEmailInput = (data: any) => {
    setEmailInput(data.target.value);
  };

  const UpdatePasswordInput = (data: any) => {
    setPasswordInput(data.target.value);
  };

  return (
    <div className={styles.blurredBackground}>
      <main className={styles.pageWrapper}>
        <section className={styles.contentContainer}>
          <h1 className={styles.renderLogo}>Render</h1>
          <form>
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
                className={styles.halfBarButton}
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
  );
};

export default Auth;
