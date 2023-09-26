import { useState, useEffect } from "react";

import { Layout } from "components/Layout";
import Router from "components/Router";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const auth = getAuth(app);
    const [init, setInit] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!auth?.currentUser
    );
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setInit(true);
        });
    }, [auth]);
    console.log(auth, isAuthenticated);
    return (
        <Layout>
            <ToastContainer />
            {init ? <Router isAuthenticated={isAuthenticated} /> : "loading"}
        </Layout>
    );
}

export default App;
