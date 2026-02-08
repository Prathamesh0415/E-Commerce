import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Company Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            {/* FIX 1: Added cursor pointer and hover effect for better UX */}
            <li className="cursor-pointer hover:text-black">Home</li>
            <li className="cursor-pointer hover:text-black">About us</li>
            <li className="cursor-pointer hover:text-black">Delivery</li>
            {/* FIX 2: Fixed Typo "Provacy" -> "Privacy" */}
            <li className="cursor-pointer hover:text-black">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-123-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          {/* FIX 3: Dynamic Date so it never expires */}
          Copyright {new Date().getFullYear()}@ forever.com. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;