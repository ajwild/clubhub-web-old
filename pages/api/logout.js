import commonMiddleware from '../../utils/middleware/common-middleware';

const handler = (request, response) => {
  // Destroy the session.
  // https://github.com/expressjs/cookie-session#destroying-a-session
  request.session = null;
  response.status(200).json({ status: true });
};

export default commonMiddleware(handler);
