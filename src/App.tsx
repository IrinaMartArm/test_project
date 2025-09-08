import {useEffect, useState} from "react";
import {auth} from "./api";
import {Sidebar} from "./components";
import {OrganizationPage} from "./pages";
import './App.css'

function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function login() {
            const token = await auth("USERNAME");
            if (token) {
                // api.defaults.headers.common["Authorization"] = token;
                setIsReady(true);
            }
        }
        login();
    }, []);

    if (!isReady) {
        return <div>Loading...</div>;
    }

  return (
      <div className="app">
          <Sidebar/>
          <OrganizationPage/>
      </div>
  )
}

export default App
