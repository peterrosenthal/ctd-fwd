import { initializeApp } from 'firebase/app';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: 'AIzaSyA3D6y8tekOmx8P7Nw0i2D4RKAkdHH6-NQ',
  authDomain: 'fwd-lab-6-7574f.firebaseapp.com',
  projectId: 'fwd-lab-6-7574f',
  storageBucket: 'fwd-lab-6-7574f.appspot.com',
  messagingSenderId: '69985364492',
  appId: '1:69985364492:web:8f82777b809ad544dadc29',
});

const firestore = getFirestore(app);

export async function addTestData(data) {
  try {
    const doc = await addDoc(collection(firestore, 'test'), data);
    console.log(`Document written with ID: ${doc.id}`);
  } catch (e) {
    console.error(`Error adding document: ${e}`);
  }
}

export async function getTestData() {
  let data = [];
  const query = await getDocs(collection(firestore, 'test'));
  query.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}
