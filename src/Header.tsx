import { useEffect, useState, FunctionComponent, PropsWithChildren } from "react";
import "./App.css";

interface HeaderProps{
  title: String,
  onLogoClick: () => void
}

const Header: FunctionComponent<PropsWithChildren<HeaderProps>> = ({children, title, onLogoClick}) => {

  return (
    <>
      <div className="main-header-area">
        <div className="logo-container">
          <div className="logo" onClick={onLogoClick}>
            <img src="images/logos/logo.png" alt="Logo" />
          </div>
        </div>
        <div className="title-area">
          <div className="title">
            <p>{title}</p>
          </div>
        </div>
        <div className="buttons-area">
          {children}
        </div>
      </div>
    </>
  );
}

export default Header;
