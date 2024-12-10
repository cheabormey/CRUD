// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ref, onUnmounted } from "vue"; // Assuming you're using Vue.js

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsvGPowVnPXXYUVoKJ4qMdUI9Gy3LFvQk",
  authDomain: "teststore-ea4d3.firebaseapp.com",
  projectId: "teststore-ea4d3",
  storageBucket: "teststore-ea4d3.appspot.com", // Fixed incorrect storage bucket URL
  messagingSenderId: "407168897891",
  appId: "1:407168897891:web:9a0dc9a142b97996ddb956",
  measurementId: "G-SHEFCEJK1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Reference to the 'users' collection
const usersCollection = collection(db, "users");

// CRUD Operations

// Create a new user
export const createUser = async (user) => {
  try {
    const docRef = await addDoc(usersCollection, user);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Get a user by ID
export const getUser = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};

// Update a user by ID
export const updateUser = async (id, updates) => {
  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

// Real-time listener to load users
export const useLoadUsers = () => {
  const users = ref([]);
  const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  });
  onUnmounted(unsubscribe);
  return users;
};

// Reference to the 'products' collection
const productsCollection = collection(db, "products");

export const addProduct = async (productName, rating, price, imageURL) => {
  try {
    const docRef = await addDoc(productsCollection, {
      product: productName,
      rating: rating,
      price: price,
      image: imageURL,
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
