import React from "react";
import { useState } from "react";
// import { useState } from 'react'
import NoteContext from "./noteContex";

function NoteState(props) {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNmEzOTQ1MDllYWUxMzM2Njc1NmU5In0sImlhdCI6MTY1OTcxOTYzOX0.303kPmdn1DuaenyGeAby3JH8LkvIwKKq2-r11fHBtXk",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNmEzOTQ1MDllYWUxMzM2Njc1NmU5In0sImlhdCI6MTY1OTcxOTYzOX0.303kPmdn1DuaenyGeAby3JH8LkvIwKKq2-r11fHBtXk",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json)
    
    console.log("Adding a new note");
    const note = {
      _id: "61322f119553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a0664",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  const deleteNote = (id) => {
    // TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, description, title, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlNmEzOTQ1MDllYWUxMzM2Njc1NmU5In0sImlhdCI6MTY1OTcxOTYzOX0.303kPmdn1DuaenyGeAby3JH8LkvIwKKq2-r11fHBtXkQ",
          
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json)

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <div>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  );
}

export default NoteState;
