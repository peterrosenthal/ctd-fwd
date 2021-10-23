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

async function addTestData() {
  try {
    const doc = await addDoc(collection(firestore, 'test'), {
      id: Math.floor(Math.random() * 10),
      name: 'code',
    });
    console.log(`Document written with ID: ${doc.id}`);
  } catch (e) {
    console.error(`Error adding document: ${e}`);
  }
}

async function getTestData() {
  const querySnapshot = await getDocs(collection(firestore, 'test'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc.data());
  });
}

addTestData();
getTestData();
