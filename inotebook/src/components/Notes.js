import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContex";
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {
    const context=useContext(noteContext);
    const {notes,addNote}=context;
  return (
    <>
    <AddNote/>
    <div className='row my-3'>
        <h1>Your notes</h1>
      {notes.map((note)=>{
      return <Noteitem key={note._id} note={note}/>
    })}
    </div>
    </>
  )
}

export default Notes
