// firestore.js
import { firestore } from './firebase'; // Correct path to your firebase.js
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore"; 

// Add a new document to a specific collection
export const addDocument = async (collectionName, documentId, data) => {
  const docRef = doc(firestore, collectionName, documentId);
  return await setDoc(docRef, data);
};

// Get a document from a specific collection
export const getDocument = async (collectionName, documentId) => {
  const docRef = doc(firestore, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

// Get all documents from a collection
export const getAllDocuments = async (collectionName) => {
  const collectionRef = collection(firestore, collectionName);
  const querySnapshot = await getDocs(collectionRef);
  let documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  return documents;
};

// Update a document
export const updateDocument = async (collectionName, documentId, newData) => {
  const docRef = doc(firestore, collectionName, documentId);
  return await updateDoc(docRef, newData);
};

// Delete a document
export const deleteDocument = async (collectionName, documentId) => {
  const docRef = doc(firestore, collectionName, documentId);
  return await deleteDoc(docRef);
};
