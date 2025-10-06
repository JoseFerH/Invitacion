import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { headers } from 'next/headers';

function getAppInstance(): FirebaseApp {
  const allApps = getApps();
  if (allApps.length) {
    return allApps[0];
  }
  return initializeApp(firebaseConfig);
}

function getAuthInstance(app: FirebaseApp) {
    // When this is called on the server, we need to specify a persistence layer.
    // In this case, we're using browserLocalPersistence because we're not actually
    // storing any sensitive user data, but we need to satisfy the API.
    // In a real app with user accounts, you would use a different strategy on the server.
    return initializeAuth(app, { persistence: browserLocalPersistence });
}


export function getSdks() {
  const app = getAppInstance();
  const auth = typeof window === 'undefined' ? getAuthInstance(app) : getAuth(app);
  const firestore = getFirestore(app);

  return {
    firebaseApp: app,
    auth: auth,
    firestore: firestore,
  };
}
