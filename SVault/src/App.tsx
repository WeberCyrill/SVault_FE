import './App.css'
import Login from "./components/Login.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SvostOverview from "./components/SvostOverview.tsx";
import {NextUIProvider} from "@nextui-org/react";
import PostProvider from "./Context/PostContext.tsx";

function App() {

  return (
        <NextUIProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/svosts" element={<PostProvider> <SvostOverview /></PostProvider>} />
                    <Route path="/*" element={<Navigate to={"/login"} />} />
                </Routes>
            </BrowserRouter>
        </NextUIProvider>
  )
}

export default App
