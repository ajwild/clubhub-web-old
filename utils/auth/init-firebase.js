import firebase from 'firebase/app';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export default () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }
};
