import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function PageWrapper({ children }) {
  return (
    <div className="mx-auto bg-gray-100 min-h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default PageWrapper;
