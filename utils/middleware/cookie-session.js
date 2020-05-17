import cookieSession from 'cookie-session';

import { getSecrets } from '../secrets';

export const addSession = async (request, response) => {
  const [SESSION_SECRET_CURRENT, SESSION_SECRET_PREVIOUS] = await getSecrets([
    'SESSION_SECRET_CURRENT',
    'SESSION_SECRET_PREVIOUS',
  ]);

  // Ensure that session secrets are set.
  if (!(SESSION_SECRET_CURRENT && SESSION_SECRET_PREVIOUS)) {
    throw new Error(
      'Session secrets must be set as env vars `SESSION_SECRET_CURRENT` and `SESSION_SECRET_PREVIOUS`.'
    );
  }

  // An array is useful for rotating secrets without invalidating old sessions.
  // The first will be used to sign cookies, and the rest to validate them.
  // https://github.com/expressjs/cookie-session#keys
  const sessionSecrets = [SESSION_SECRET_CURRENT, SESSION_SECRET_PREVIOUS];

  // Example:
  // https://github.com/billymoon/micro-cookie-session
  const includeSession = cookieSession({
    keys: sessionSecrets,
    maxAge: 604800000, // Week
    httpOnly: true,
    overwrite: true,
    // Set other options, such as "secure", "sameSite", etc.
    // https://github.com/expressjs/cookie-session#cookie-options
  });
  includeSession(request, response, () => {});
};

export default (handler) => (request, response) => {
  try {
    addSession(request, response);
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return response.status(500).json({ error: 'Could not get user session.' });
  }

  return handler(request, response);
};
