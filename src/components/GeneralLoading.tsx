import ReactLoading from "react-loading";
import styles from "../../styles/component-styles/loading.module.css";

const GeneralLoading = () => {
  return (
    <div className={styles.loading}>
      <ReactLoading
        type={"bubbles"}
        color={"white"}
        height={"15%"}
        width={"15%"}
      />
    </div>
  );
};

export default GeneralLoading;
