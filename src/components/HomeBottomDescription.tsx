import styles from "../../styles/Home.module.css";

interface InputTypes {
  downloadActive: boolean;
  downloadComplete: boolean;
}

const HomeBottomDescription = ({
  downloadActive,
  downloadComplete,
}: InputTypes) => {
  if (downloadActive === false) {
    if (downloadComplete === true) {
      return (
        <small className={styles.dowloadInfoText}>
          It may take a moment for your browser to catch up. Downloads should be
          visible in your computer's <i>Downloads</i> folder.
        </small>
      );
    }
    return (
      <small className={styles.dowloadInfoText}>
        Type <i>Confirm</i> and press <i>Download</i> to save all Render Vault
        uploads to your PC Downloads folder.
      </small>
    );
  }
  return (
    <small className={styles.dowloadInfoText}>
      Download in progress. Please do not close the tab. All buttons are frozen
      until completion. Please permit multiple downloads if prompted.
    </small>
  );
};

export default HomeBottomDescription;
