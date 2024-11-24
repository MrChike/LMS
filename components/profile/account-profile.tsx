import React, { useState, useEffect, useRef } from 'react';
import '../../app/globals.css';
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import Image from 'next/image';
// import { fetchUserData } from '@/app/api/auth/login/route';

const AccountProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);  // Reference to the menu
  const imageRef = useRef<HTMLImageElement>(null); // Reference to the profile image

  // Fetch user data on component mount

  // Toggle the menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) && 
        imageRef.current && !imageRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false); // Close the menu if clicked outside
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle sign out
  const handleSignOut = () => {
    // clear authentication tokens 
    localStorage.removeItem('auth_token')
    
    // Redirect to the sign-in page
    window.location.href = '/sign-in';  // Redirect to sign-in page
  };

  // Profile Menu Component
  const AccountProfileMenu = () => {
    return (
      <div className="profile-menu" ref={menuRef}>
        <div className="profile-header">
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="AccountProfile"
            className="profile-image"
          />
          <div className="profile-info">
            <div className="profile-name">Chike Egonu</div>
            <div className="profile-username">chikeegonu@gmail.com</div>
          </div>
        </div>
        <button className="AccountProfileIcon"><span> <IoSettingsOutline /> Manage account </span></button>
        <button
          className="AccountProfileIcon"
          style={{ width: "192px" }}
          onClick={handleSignOut}  // Add onClick handler for sign-out
        >
          <span><IoLogOutOutline /> Sign out</span>
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Image that triggers menu toggle */}
      <img
        src="https://www.w3schools.com/w3images/avatar2.png"
        alt="Description of the image"
        className="profile-image"
        ref={imageRef}  // Reference to the image
        onClick={toggleMenu} // Use toggleMenu function to show/hide the menu
        style={{ cursor: 'pointer' }} // Add hand cursor when hovering
      />

      {/* Conditionally render the AccountProfileMenu */}
      {menuOpen && <AccountProfileMenu />}
    </div>
  );
};

export default AccountProfile;
