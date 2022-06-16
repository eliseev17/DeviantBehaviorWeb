import React, {useReducer} from 'react'
import axios from 'axios'
import {FirebaseContext} from './firebaseContext'
import {firebaseReducer} from './firebaseReducer'
import {ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER} from '../types'

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get(`${url}/notes.json`)

        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })

        dispatch({type: FETCH_NOTES, payload})
    }

    // function checkFile(count) {
    //     let fs = require("fs");
    //     let text = fs.readFileSync("D:/predictions.txt");
    //     let textByLine = text.split("\n");
    //     let predCount = textByLine.length;
    //     if (predCount > count)
    //         addNote("Падение человека", `Камера: ${textByLine[textByLine.length - 1]}`);
    // }
    //
    // const serviceWorker = () => {
    //     let fs = require("fs");
    //     let text = fs.readFileSync("D:/predictions.txt");
    //     let textByLine = text.split("\n");
    //     let initialPredCount = textByLine.length;
    //     while (true) {
    //         setTimeout(checkFile,1000, initialPredCount);
    //     }
    // }

    const addNote = async (title) => {
        const res = await axios.get(`${url}/notes.json`)

        const payload = Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }
        })

        let oldCount = payload.length;
        let count = 0

        while (count <= oldCount) {
            const res = await axios.get(`${url}/notes.json`)

            const payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            })

            count = payload.length;
        }

        let dateArray = new Date().toLocaleDateString("en-US", {timeZone: "Europe/Moscow"}).split('/');
        let time = new Date().toTimeString().substring(0, 8);
        for (let i = 0; i < dateArray.length; i++)
            if (dateArray[i].length < 2)
                dateArray[i] = "0" + dateArray[i];
        let date = dateArray[1] + "." + dateArray[0] + "." + dateArray[2];
        const note = {
            title, date: `Время: ${time} Дата: ${date}`, cam: "Камера 1"
        }

        try {
            const res = await axios.post(`${url}/notes.json`, note);

            const payload = {
                ...note,
                id: res.data.name
            }

            dispatch({type: ADD_NOTE, payload})

        } catch (e) {
            throw new Error(e.message)
        }
    }

    const removeNote = async id => {
        await axios.delete(`${url}/notes/${id}.json`)

        dispatch({
            type: REMOVE_NOTE,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}


