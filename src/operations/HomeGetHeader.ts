const HomeGetHeader = ({
  size,
  downloadActive,
  storageSizeInBytes,
  downloadBytesCompleted,
  downloadComplete,
}: {
  size: number | null;
  downloadActive: boolean;
  storageSizeInBytes: number | null;
  downloadBytesCompleted: number;
  downloadComplete: boolean;
}): string => {
  if (downloadActive === false) {
    if (downloadComplete === true) {
      return "Complete";
    }
    if (typeof size === "number") {
      const mbSize = Math.round(size / 1000000);
      if (mbSize < 1) {
        return "<1 mb";
      } else if (mbSize > 999) {
        return `${(mbSize / 1000).toFixed(1)} gb`;
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

export default HomeGetHeader;
