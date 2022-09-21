// Returns a nextToken compatible with string-based GraphQL queries
const DownloadGetNextToken = (nextToken: string | null) => {
  if (nextToken === null) {
    return `nextToken: null`;
  }
  return `nextToken: "${nextToken}"`;
};

export default DownloadGetNextToken;
