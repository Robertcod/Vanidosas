import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md dark:bg-gray-900 fixed w-full z-10">
      <div className="flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center gap-x-2">

          <img
            src="/imgs/caraLogo.png"
            alt="Logo Vanidosas"
            className="h-20"
          />

<img
            src="/imgs/palabraLogo.PNG"
            alt="Logo Vanidosas"
            className="h-16"
          />

        </div>

        {/* Botón menú para móviles */}
        <button
          className="md:hidden text-gray-700 dark:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menú de navegación */}
        <nav className={`absolute md:relative top-16 md:top-0 right-0 md:flex bg-white dark:bg-gray-900 w-full md:w-auto px-6 py-4 md:p-0 ${isOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex flex-col md:flex-row md:gap-6 text-gray-700 dark:text-white">
            <li><a href="#home" className="block py-2 px-4 hover:text-purple-600">Home</a></li>
            <li><a href="#about" className="block py-2 px-4 hover:text-purple-600">About</a></li>
            <li><a href="#services" className="block py-2 px-4 hover:text-purple-600">Services</a></li>
            <li><a href="#contact" className="block py-2 px-4 hover:text-purple-600">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
