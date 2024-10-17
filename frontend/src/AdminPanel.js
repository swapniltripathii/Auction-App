import React, { useState, useEffect } from "react";
import { firestore } from "./firebase/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user
  const [adminName, setAdminName] = useState("Admin"); // State for admin name

  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      const usersData = await getAllDocuments("users");
      console.log("Fetched Users:", usersData);
      const productsData = await getAllDocuments("products");
      setUsers(usersData);
      setProducts(productsData);
    };

    fetchUsersAndProducts();

    // Real-time listener for new products
    const unsubscribe = onSnapshot(
      collection(firestore, "products"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newProduct = { id: change.doc.id, ...change.doc.data() };
            setProducts((prevProducts) => [...prevProducts, newProduct]);
          }
        });
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const getAllDocuments = async (collectionName) => {
    const collectionRef = collection(firestore, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const verifyProduct = async (productId, category) => {
    const productRef = doc(firestore, "products", productId);

    await updateDoc(productRef, { verified: true }); // This will update the correct field

    // Add product to the corresponding collection (e.g., apparels, sneakers)
    const categoryCollectionRef = collection(firestore, category);
    const productData = (await getDoc(productRef)).data();

    await setDoc(doc(categoryCollectionRef, productId), {
      ...productData,
      verified: true,
    });

    // Update UI
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, verified: true } : product
      )
    );
  };

  const deleteProduct = async (productId, category) => {
    try {
      // Delete the product from the 'products' collection
      await deleteDoc(doc(firestore, "products", productId));

      // Delete the product from the respective category collection
      await deleteDoc(doc(firestore, category, productId));

      // Update the UI to reflect the deletion
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId); // Set the selected user ID
  };

  return (
    <div className="admin-panel flex p-4 bg-gray-200 h-full overflow w-full">
      <div className="w-1/5 h-full">
        <h3 className="text-2xl font-bold pl-2 mb-2">User's List</h3>
        <div className="users-list grid p-2 rounded-xl grid-cols-1 gap-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="user-card rounded-xl border border-black shadow-lg p-2 cursor-pointer"
              onClick={() => handleUserClick(user.id)}
            >
              <h2 className="text-xl text-black font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
              {/* <p className="text-black">{user.email}</p> */}
            </div>
          ))}
        </div>
      </div>

      <div className=" w-4/5">
        {selectedUserId ? (
          <div className=" pl-4 pt-1">
            <h2 className="text-2xl font-semibold mb-1">{`${
              users.find((user) => user.id === selectedUserId)?.firstName
            }'s Products`}</h2>

            {/* Filter products by selected user */}
            {products.filter((product) => product.userId === selectedUserId)
              .length === 0 ? (
              <div className="text-gray-600 text-lg font-medium">
                No products listed.
              </div>
            ) : (
              <div className="products-list grid w-full pr-4 pb-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {products
                  .filter((product) => product.userId === selectedUserId)
                  .slice(0, 15) // Limit to 15 products
                  .map((product) => (
                    <div
                      key={product.id}
                      className="product-card border bg-white border-black p-2 flex flex-col rounded-2xl items-start"
                    >
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-24 object-contain bg-white rounded-xl mb-1"
                        />
                      )}
                      <h3 className="text-md font-semibold truncate">
                        {product.name.length > 15
                          ? `${product.name.slice(0, 15)}...`
                          : product.name}
                      </h3>
                      <p className="text-sm">{product.category}</p>
                      <p className="font-semibold">{`Price: $${product.price}`}</p>

                      <div className="flex space-x-12 justify-between">
                        {!product.verified ? (
                          <button
                            onClick={() =>
                              verifyProduct(product.id, product.category)
                            }
                            className="text-blue-600 bottom-2 left-2 font-medium"
                          >
                            Verify
                          </button>
                        ) : (
                          <button
                            disabled
                            className="text-blue-600 bottom-2 opacity-75 left-2 font-medium cursor-not-allowed"
                          >
                            Verified
                          </button>
                        )}
                        <button
                          onClick={() =>
                            deleteProduct(product.id, product.category)
                          }
                          className="text-red-600 bottom-2 right-2 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-black text-lg font-semibold">
            Select a user to view their products.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
