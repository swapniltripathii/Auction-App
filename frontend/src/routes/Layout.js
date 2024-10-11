import React from "react";

// Layout wrapper for routes that need padding and centered content
const Layout = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto p-6"> {/* Center content, add padding */}
      {children}
    </div>
  );
};

export default Layout;
