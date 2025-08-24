import App from "@/App";

import AllBooks from "@/pages/AllBooks";
import BorrowedBook from "@/pages/BorrowedBook";
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
                path:"/borrowed",
                element:<BorrowedBook></BorrowedBook>
            }
        ]
    }
]);

export default router;