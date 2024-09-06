import './App.css'
import Login from "./components/Login.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage.tsx";
import {NextUIProvider} from "@nextui-org/react";

function App() {

  return (
        <NextUIProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/*" element={<Navigate to={"/login"} />} />
                </Routes>
            </BrowserRouter>
        </NextUIProvider>
  )
}

export default App
