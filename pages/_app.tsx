import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";

import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure(awsExports);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
