import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AddBookModal from "@/pages/AddBookModal";
import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import BorrowModal from "@/pages/BorrowModal";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo / App Name */}
      <Link to="/" className="text-2xl font-bold text-black">
        📚 LibraryHub
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="font-semibold">
                  All Books
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Books */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Books</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 grid bg-white gap-2 w-48">
                <NavigationMenuLink asChild>
                  <AddBookModal />
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Borrow */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Borrow</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4 grid gap-2 w-48">
                <NavigationMenuLink asChild>
                   <BorrowModal></BorrowModal>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/borrowed">Borrow Summary</Link>
                </NavigationMenuLink>
                
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 md:hidden z-50">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block font-semibold"
                onClick={() => setIsOpen(false)}
              >
                All Books
              </Link>
            </li>
            <li>
              <p className="font-semibold">Books</p>
              <ul className="ml-4 space-y-2">
               
                <li>
                  <AddBookModal />
                </li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">Borrow</p>
              <ul className="ml-4 space-y-2">
                <li>
                  <BorrowModal></BorrowModal>
                </li>
                <li>
                  <Link
                    to="/borrowed"
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    Borrow Summary
                  </Link>
                </li>
                
              </ul>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
