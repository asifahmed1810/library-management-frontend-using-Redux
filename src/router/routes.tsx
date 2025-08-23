import App from "@/App";

import AllBooks from "@/pages/AllBooks";
import Home from "@/pages/Home";

import { createBrowserRouter } from "react-router";

const router=createBrowserRouter([
    {
        path:"/",
        element:<App></App>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/books",
                element:<AllBooks></AllBooks>
            },
            {
                // path:"/add-book",
                // element:<AddBookModal></AddBookModal>
            }
        ]
    }
]);

export default router;