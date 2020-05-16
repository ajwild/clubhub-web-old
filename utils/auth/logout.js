import firebase from 'firebase/app';
// eslint-disable-next-line import/no-unassigned-import
import 'firebase/auth';

export default async () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      if (typeof window !== 'undefined') {
        // Remove the server-side rendered user data element. See:
        // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
        try {
          const element = window.document.querySelector('#__MY_AUTH_USER_INFO');
          element.remove();
        } catch (error) {
          console.error(error);
        }
      }

      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};
