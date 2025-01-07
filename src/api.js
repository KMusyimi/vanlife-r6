// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsWr1oAWBvGrPEHTCMR2JrK3zpFGkO19Y",
    authDomain: "vanlife-bfa7e.firebaseapp.com",
    projectId: "vanlife-bfa7e",
    storageBucket: "vanlife-bfa7e.firebasestorage.app",
    messagingSenderId: "327219420443",
    appId: "1:327219420443:web:6f64a40295e863bb5b07be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vanCollectionRef = collection(db, 'vans')

export async function getVans() {
    const querySnapshot = await getDocs(vanCollectionRef);
    return querySnapshot.docs.map(doc => ({
        ...doc.data(), id: doc.id
    }))

}

export async function getVan(id) {
    const docRef = doc(db, 'vans', id);
    const vanSnapShot = await getDoc(docRef);
    return {...vanSnapShot.data(), id: vanSnapShot.id};
}

export async function getHostVans() {
    const qry = query(vanCollectionRef, where('hostId', '==', '123'))
    const querySnapshot = await getDocs(qry);
    return querySnapshot.docs.map(doc => ({
        ...doc.data(), id: doc.id
    }))
}

export async function loginUser(creds) {
    const res = await fetch("/api/login", {method: "post", body: JSON.stringify(creds)})
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message, statusText: res.statusText, status: res.status
        }
    }

    return data
}