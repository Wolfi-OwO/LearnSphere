import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { AppStoreProvider } from "./assets/store/AppStore.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppStoreProvider>
      <RouterProvider router={router} />
    </AppStoreProvider>
  </StrictMode>,
);
