/** @format */

import { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";
import Loader from "./components/Loader/Loader";

const Home = lazy(() => import("./pages/Home/Home"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Login = lazy(() => import("./pages/Login/Login"));
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
    const { user } = useSelector((store) => store.user);
    const [searchNote, setSearchNote] = useState(false);

    const dispatch = useDispatch();

    // const getNotes = async () => {
    //     try {
    //         const res = await axios.get(`${serverURL}/note/all`, {
    //             withCredentials: true,
    //         });

    //         if (res.data.success) {
    //             dispatch(setAllNotes(res.data.notes));
    //             console.log("api req is ,", res.data.notes);
    //         }
    //         // console.log("all notes is ", res);
    //     } catch (error) {
    //         toast(error.res?.data?.message);
    //         console.log("get notes error", error);
    //     }
    // };
    // useEffect(() => {
    //     getNotes();
    // }, []);

    return (
        <>
            <BrowserRouter>
                {/* <Suspense> if our components is rederning */}
                <Suspense fallback={<Loader />}>
                    {user && <Navbar setSearchNote={setSearchNote} />}
                    <Routes>
                        <Route path="/" element={<Home setSearchNote={setSearchNote} />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                    <ToastContainer position="bottom-right" autoClose={5000} />
                    {user && <Footer />}
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
