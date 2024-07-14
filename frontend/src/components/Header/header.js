import React from 'react';
import logo from '../../assets/lendlord.png';
import '../Header/header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt="logo" className="logo" />
      </div>
    </header>
  );
}
