import { firestore } from './firebase'; 
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore"; // Correct imports

// Add a new document to a specific collection
export const addDocument = async (collectionName, documentId, data) => {
  const docRef = doc(firestore, collectionName, documentId);
  try {
    await setDoc(docRef, data);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Get a document from a specific collection
export const getDocument = async (collectionName, documentId) => {
  const docRef = doc(firestore, collectionName, documentId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};

// Get all documents from a collection
export const getAllDocuments = async (collectionName) => {
  const collectionRef = collection(firestore, collectionName);
  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

// Update a document
export const updateDocument = async (collectionName, documentId, newData) => {
  const docRef = doc(firestore, collectionName, documentId);
  try {
    await updateDoc(docRef, newData);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Delete a document
export const deleteDocument = async (collectionName, documentId) => {
  const docRef = doc(firestore, collectionName, documentId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export { collection, doc, getDocs, updateDoc, deleteDoc };
