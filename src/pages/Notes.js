import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Container, Grid, Paper } from "@material-ui/core";
import NoteCard from "../components/UI/NoteCard";
import { RepeatRounded } from "@material-ui/icons";
export default function Notes(props) {
  const history = useHistory()
  const [notes, setNotes] = useState([]);
  let loadedNotes = []
  useEffect(() => {
    if(props.isLogin){
    fetch("https://mynotes-57537-default-rtdb.firebaseio.com/notes.json")
      .then((res) => res.json())
      .then((data) => {
        for (const key in data){
          loadedNotes.push({
            id:key,
            title:data[key].title,
            catogory :data[key].catogory,
            details:data[key].details,
            date :data[key].date,
            user : data[key].user
          })
        }
      }).then(() => {setNotes(loadedNotes)})}else{
        history.push('/login')
      }
      }, [history]);

  const deleteItem = async (id) =>{
    await fetch(`https://mynotes-57537-default-rtdb.firebaseio.com/notes/${id}.json`,{
      method:'DELETE'
    })
    setNotes(note =>note.filter(note => note.id != id))
  }
  return (
    <Container>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid xs={12} sm={6} md={4} item key={note.id}>
            {
              <Paper>
                <NoteCard  email={props.email} note={note} delete={deleteItem}/>
              </Paper>
            }
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
