import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import FreeExtensions from "./pages/FreeExtensions";
import NotFound from "./pages/NotFound";
import AdobePremiere from "./pages/AdobePremiere";
import AfterEffects from "./pages/AfterEffects";
import DavinciResolve from "./pages/DavinciResolve";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateExtension from "./components/CreateExtension";
import WindowsApps from "./pages/WindowsApps";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/free-extensions" element={<FreeExtensions />} />
        <Route path="/premiere-pro" element={<AdobePremiere />} />
        <Route path="/after-effects" element={<AfterEffects />} />
        <Route path="/premiere-pro" element={<AdobePremiere />} />
        <Route path="/davinci-resolve" element={<DavinciResolve />} />
        <Route path="/windows-x64bit" element={<WindowsApps />} />
        <Route path="/create-extension" element={<CreateExtension />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
