import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

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
    const newData = doc.data();
    newData.id = doc.id;
    data.push(newData);
  });
  return data;
}

export async function deleteTestData(id) {
  await deleteDoc(doc(firestore, 'test', id));
}

export async function updateTestData(id, data) {
  await updateDoc(doc(firestore, 'test', id), data);
}
