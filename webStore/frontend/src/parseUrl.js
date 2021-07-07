export const parseUrl = () => {
  const url = document.location.hash.toLowerCase();
  console.log("url: " + url);
  const request = url.split("/");
  console.log("request: " + request);
  console.log("resource: " + request[1]);
  console.log("id: " + request[2]);
  console.log("action: " + request[3]);
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};
