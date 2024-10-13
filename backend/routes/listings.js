const { collection, addDoc, getDocs } = require('firebase/firestore');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/add-listing", upload.single("image"), async (req, res) => {
  const { userId, productName, description, category, price } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const listingsRef = collection(db, 'listings');
    const newListing = await addDoc(listingsRef, {
      userId,
      productName,
      description,
      image,
      category,
      price,
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/listings', async (req, res) => {
  try {
    const listingsSnapshot = await getDocs(collection(db, 'listings'));
    const listings = listingsSnapshot.docs.map(doc => doc.data());

    res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
