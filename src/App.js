import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FirebaseState} from "./context/firebase/FirebaseState";
import {AlertState} from "./context/alert/AlertState";
import {Navbar} from "./components/Navbar";
import {Alert} from "./components/Alert";
import {Home} from "./pages/Home";
import {About} from "./pages/About";

function App() {
    return (
        <FirebaseState>
            <AlertState>
                <BrowserRouter>
                    <Navbar/>
                    <div className="container pt-4">
                        <Alert/>
                        <Routes>
                            <Route exact path={'/'} element={<Home/>}/>
                            <Route path={'/about'} element={<About/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </AlertState>
        </FirebaseState>
    );
}

export default App;
