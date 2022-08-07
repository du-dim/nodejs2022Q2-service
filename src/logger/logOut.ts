export const logOut = (
  method: string,
  url: string,
  query: any,
  body: any,
  user: any,
  statusCode: number,
  message: string,
) => {
  return `URL: ${url}; Method: ${method}; Query: ${JSON.stringify(
    query,
  )}; User: ${JSON.stringify(user)}; Body: ${JSON.stringify(
    body,
  )}; -> Status Code: ${statusCode}; ${message ? 'Message: ' : ''}${message}\n`;
};
