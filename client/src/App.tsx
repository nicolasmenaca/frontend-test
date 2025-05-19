// src/App.tsx
import React from "react";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./components/context/AuthContext";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
};

export default App;
