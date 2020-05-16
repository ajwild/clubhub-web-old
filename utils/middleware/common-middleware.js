import cookieSession from './cookie-session';
import cookieSessionRefresh from './cookie-session-refresh';

export default (handler) => cookieSession(cookieSessionRefresh(handler));
