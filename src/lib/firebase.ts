import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Same project the original site.html + admin.html already point to —
// do not regenerate this, it must match admin.html's config or the
// two apps will read/write different databases.
const firebaseConfig = {
  apiKey: 'AIzaSyCjqr_1JiDTgMZyku6-QwR_Sw7pDLVRIS0',
  authDomain: 'portfolio-73940.firebaseapp.com',
  databaseURL: 'https://portfolio-73940-default-rtdb.firebaseio.com',
  projectId: 'portfolio-73940',
  storageBucket: 'portfolio-73940.firebasestorage.app',
  messagingSenderId: '767148956455',
  appId: '1:767148956455:web:2248161ef2ad36672ca702',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
