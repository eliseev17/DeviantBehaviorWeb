import React, {useReducer} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import {FETCH_NOTES} from "./context/types";
import {firebaseReducer} from "./context/firebase/firebaseReducer";
const url = process.env.REACT_APP_DB_URL

const server = () => {
    const initialState = {
        notes: [],
        loading: false
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    setInterval(async () => {
        const res = await axios.get(`${url}/notes.json`)

        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })

        dispatch({type: FETCH_NOTES, payload})
    },1000);
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// server();
