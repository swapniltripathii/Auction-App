import React, { useState, useEffect } from 'react';
import { firestore } from './firebase/firebase'; 
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user
  const [adminName, setAdminName] = useState("Admin"); // State for admin name

  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      const usersData = await getAllDocuments('users');
      console.log("Fetched Users:", usersData);
      const productsData = await getAllDocuments('products');
      setUsers(usersData);
      setProducts(productsData);
    };
  
    fetchUsersAndProducts();
  }, []);
  
  const getAllDocuments = async (collectionName) => {
    const collectionRef = collection(firestore, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };

  const verifyProduct = async (productId) => {
    await updateDoc(doc(firestore, 'products', productId), { verified: true });
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, verified: true } : product
      )
    );
  };

  const deleteProduct = async (productId) => {
    await deleteDoc(doc(firestore, 'products', productId));
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID
  };

  return (
    <div className="admin-panel p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
        <h2 className="text-xl font-md mb-4">Swapnil Tripathi</h2> {/* Display admin name */}
        <div className="users-list grid grid-cols-1 gap-4"> {/* Use grid for users list */}
          {users.map((user) => (
            <div
              key={user.id}
              className="user-card border bg-black p-4 cursor-pointer"
              onClick={() => handleUserClick(user.id)} // Handle user click
            >
              <h2 className="text-xl text-white mb-2">{`${user.firstName} ${user.lastName}`}</h2> {/* Show user's full name */}
              <p className="text-white">{user.email}</p> {/* Show user's email */}
            </div>
          ))}
        </div>
      </div>

      <div>
        {selectedUserId ? ( // Show products of the selected user
          <div>
            <button onClick={() => setSelectedUserId(null)} className="mb-4 text-blue-500">
              Back to Users
            </button>
            <h2 className="text-2xl font-bold mb-4">{`${users.find(user => user.id === selectedUserId)?.firstName}'s Products`}</h2>
            <div className="products-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products
                .filter((product) => product.userId === selectedUserId)
                .slice(0, 10) // Limit to 10 products
                .map((product) => (
                  <div key={product.id} className="product-card border p-2 flex flex-col bg-green-300 items-start mb-2">
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover mb-2" />
                    )}
                    <h3 className="text-sm truncate">{product.name}</h3>
                    <p>{product.category}</p>
                    <p>{product.subcategory}</p>
                    <p className="font-bold">{`Price: $${product.price}`}</p> {/* Display product price */}
                    <div className="flex space-x-2 mt-2">
                      {!product.verified && (
                        <button
                          onClick={() => verifyProduct(product.id)}
                          className="bg-green-500 text-white px-2 py-1"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-500 text-white px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Select a user to view their products.</div> // Message when no user is selected
        )}
      </div>
    </div>
  );
};

export default AdminPanel;  
