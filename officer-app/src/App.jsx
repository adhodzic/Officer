import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import AssetView from "./views/Assets/AssetView";
import AppLayout from "./AppLayout";
import LoginView from "./views/Login/LoginView";
import RegisterView from "./views/Login/RegisterView";
import NotFoundView from "./views/Misc/NotFoundView";
import ProtectedRoute from "./hooks/Auth/ProtectedRoute";
import { UserProvider } from "./hooks/Auth/UserContext";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="login" element={<LoginView />}></Route>
          <Route path="register" element={<RegisterView />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" exact element={<AppLayout />}>
              <Route path="assets" element={<AssetView />}></Route>
              <Route path="*" element={<NotFoundView></NotFoundView>}></Route>
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
