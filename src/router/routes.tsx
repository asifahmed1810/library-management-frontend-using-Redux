import Navbar from "@/components/layout/Navbar";
import { createBrowserRouter } from "react-router";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Navbar></Navbar>
    }
]);

export default router;