import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTransaction } from "@/contexts/TransactionContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { clearTransaction } = useTransaction();
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clearTransaction();
    navigate("/");
  };
  
  return (
    <header className="bg-brisanet-orange text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <a href="/" onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold cursor-pointer">Sistema de Conferência</h1>
        </a>
      </div>
    </header>
  );
};

export default Header;
