import React, {useState, useContext} from 'react'
import {AlertContext} from '../context/alert/alertContext'
import {FirebaseContext} from '../context/firebase/firebaseContext'

export const Form = () => {
  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const firebase = useContext(FirebaseContext)

  // while (true) {
  //   firebase.addNote("Падение человека").then(() => {
  //     alert.show('Выявлено проявление девиантного поведения!', 'danger')
  //   })
  // }

  const submitHandler = event => {
    event.preventDefault()



    if (value.trim()) {
      // firebase.serviceWorker();
      firebase.addNote(value.trim()).then(() => {
        alert.show('Выявлено проявление девиантного поведения!', 'danger')
      })

      //       .catch(() => {
      //     alert.show('Что-то пошло не так', 'danger')
      //   })
      //   setValue('')
      // } else {
      //   alert.show('Введите название заметки')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group visually-hidden">
        <input
          type="text"
          className="form-control"
          placeholder="Введите название заметки"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    </form>
  )
}
