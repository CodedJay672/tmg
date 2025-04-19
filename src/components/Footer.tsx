import React from "react";

const Footer = () => {
  return (
    <footer className="hidden lg:flex justify-between bg-secondary px-10 py-24">
      <div>
        <h3 className="text-2xl font-bold text-foreground">Logo</h3>
      </div>

      <div>
        <h3 className="text-base text-foreground font-bold">About us</h3>
      </div>
    </footer>
  );
};

export default Footer;
