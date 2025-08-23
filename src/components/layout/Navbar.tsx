import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";


function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo / App Name */}
      <Link to="/" className="text-2xl font-bold text-black">
        📚 LibraryHub
      </Link>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className="font-semibold">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Books */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Books</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4 grid gap-2 w-48">
              <NavigationMenuLink asChild>
                <Link to="/books">All Books</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/books/add">Add New Book</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Borrow */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Borrow</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4 grid gap-2 w-48">
              <NavigationMenuLink asChild>
                <Link to="/borrow">Borrow Book</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/borrowed">Borrowed Books</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/summary">Borrow Summary</Link>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          
        
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

export default Navbar;
