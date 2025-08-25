import { Outlet } from "react-router"
import Navbar from "./components/layout/Navbar"





function App() {
 
  return (
    <>
     
     <Navbar></Navbar>
     <Outlet></Outlet>
      
    </>
  )
}

export default App
