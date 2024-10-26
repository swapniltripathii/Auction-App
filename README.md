# BidRare

BidRare is a web-based auction platform allowing users to browse, buy, and sell unique products across categories like apparels, collectibles, sneakers, accessories, and electronics. Built on the MERN stack with Firebase integration, it provides a robust, user-friendly, and secure platform for all auction needs.

## Table of Contents
1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- **Category-based Product Listings:** Organized collections such as apparels, collectibles, sneakers, accessories, and electronics for easy browsing.
- **Advanced Search:** Search functionality across collections to find products by keywords.
- **Auction Functionality:** Bid on items, track auctions, and manage bids.
- **User Authentication:** Secure sign-up and login using Firebase Authentication.
- **Product Management:** Add, edit, and remove listings using Firestore for product storage.

## Technologies

BidRare leverages the following technologies:

- **Frontend:** React, Tailwind CSS, Framer Motion, React Scroll
- **Backend:** Node.js, Express, Firebase Firestore
- **Database:** Firestore
- **Authentication:** Firebase Authentication

---

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14+)
- **npm** or **yarn**
- **Firebase Account** with Firestore and Firebase Authentication enabled

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/swapniltripathii/bidrare.git
    cd bidrare
    ```

2. **Install dependencies for the frontend and backend:**
    ```bash
    # Install backend dependencies
    npm install

    # Navigate to frontend folder (if exists separately) and install dependencies
    cd client
    npm install
    ```

3. **Set up Firebase:**
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Firebase Authentication.
   - Add your Firebase config in a `.env` file in the root directory:
     ```plaintext
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the Application:**
   - For the frontend:
     ```bash
     npm start
     ```
   - For the backend:
     ```bash
     node server.js
     ```

---

## Usage

- **Home Page:** Browse through categories like apparels, collectibles, sneakers, etc.
- **Search Products:** Use the search bar in the `NavbarTop.js` to find products across categories.
- **User Authentication:** Log in or sign up to participate in auctions.
- **Create Listings:** Registered users can add products for sale on the Sell page.
- **Bid and Win:** Place bids, track auctions, and win items through a seamless auction process.

---

## Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/YourFeature`)
3. **Commit your Changes** (`git commit -m 'Add new feature'`)
4. **Push to the Branch** (`git push origin feature/YourFeature`)
5. **Open a Pull Request**

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
