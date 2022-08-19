import React from 'react'
import { useState } from 'react'
// import { useState } from 'react'
import NoteContext from './noteContex'


function NoteState(props) {
  const notesInitial=[
    {
    "_id": "62ffee191c742a67a494524f",
    "user": "62e6a394509eae13366756e9",
    "title": "my titlele",
    "description": "hello request 2",
    "tag": "personal",
    "Date": "2022-08-19T20:10:01.060Z",
    "__v": 0
  },
  {
    "_id": "62ffee2b1c742a67a4945254",
    "user": "62e6a394509eae13366756e9",
    "title": "my titlele 2",
    "description": "hello request 21",
    "tag": "personal",
    "Date": "2022-08-19T20:10:19.324Z",
    "__v": 0
  },
  {
    "_id": "62ffee191c742a67a494524f",
    "user": "62e6a394509eae13366756e9",
    "title": "my titlele",
    "description": "hello request 2",
    "tag": "personal",
    "Date": "2022-08-19T20:10:01.060Z",
    "__v": 0
  },
  {
    "_id": "62ffee2b1c742a67a4945254",
    "user": "62e6a394509eae13366756e9",
    "title": "my titlele 2",
    "description": "hello request 21",
    "tag": "personal",
    "Date": "2022-08-19T20:10:19.324Z",
    "__v": 0
  },
  {
    "_id": "62ffee2b1c742a67a4945254",
    "user": "62e6a394509eae13366756e9",
    "title": "my titlele 2",
    "description": "hello request 21",
    "tag": "personal",
    "Date": "2022-08-19T20:10:19.324Z",
    "__v": 0
  }
];

  const [notes,setNotes]=useState(notesInitial)
  return (
    <div>
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>  
    </div>
  )
}


export default NoteState