import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./assets/layouts/MainLayout.jsx";
import MyProfilePage from "./assets/pages/my-profile/MyProfile.jsx";
import HomePage from "./assets/pages/home/HomePage.jsx";


const router = createBrowserRouter([
    {
        path: "/admin",
        element: <MainLayout />,
        children: [
             {
                path: "",
                element: <h1>Admin Dashboard</h1>
            }
        ]
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "my-profile",
                element: <MyProfilePage />
            },
            {
                path: "my-profile/edit",
                element: <MyProfilePage isEdit={true} />
            }
        ]
    }
]);

export default router;