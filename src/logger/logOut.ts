export const logOut = (
  type: string,
  method: string,
  url: string,
  query: any,
  body: any,
  user: any,
  statusCode: number,
  message: string,
  time: number,
) => {
  const d = new Date().toISOString();
  const date = d.replace(
    /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z/,
    '$3/$2/$1 $4:$5:$6',
  );
  return `[REST_APP] ${
    process.pid
  } - ${date} [${type}] URL: ${url}; Method: ${method}; Query: ${JSON.stringify(
    query,
  )}; User: ${JSON.stringify(user)}; Body: ${JSON.stringify(
    body,
  )}; -> Status Code: ${statusCode}; ${
    message ? 'Message: ' : ''
  }${message} +${time}ms\n`;
};
