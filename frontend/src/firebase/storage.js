// storage.js
import { storage } from './firebase'; // Correct path to your firebase.js
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Upload a file to Firebase Storage
export const uploadFile = async (filePath, file) => {
  const storageRef = ref(storage, filePath); // filePath is the location in storage (e.g., 'images/product.jpg')
  const snapshot = await uploadBytes(storageRef, file);
  return snapshot;
};

// Get the download URL of a file from Firebase Storage
export const getFileURL = async (filePath) => {
  const fileRef = ref(storage, filePath);
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
};

// Delete a file from Firebase Storage
export const deleteFile = async (filePath) => {
  const fileRef = ref(storage, filePath);
  return await deleteObject(fileRef);
};
