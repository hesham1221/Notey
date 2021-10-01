import React, { useState,useEffect } from 'react'
import { Card,CardHeader,CardContent, IconButton, Typography } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'

export default function NoteCard(props) {
    const [enabled,setEnabled] = useState(false);
    const user = props.note.user;
    const email = props.email;
    useEffect(()=>{
        if(user===email || user==='test123@test.com'){
            setEnabled(true)
        }
    },[user,email])
    
    return (
        <Card elevation={2}>
            <CardHeader
            action ={<IconButton disabled={!enabled} onClick={()=>{
                props.delete(props.note.id)
                }}>
                <DeleteOutline />
            </IconButton>}
            title = {props.note.title}
            subheader={`${props.note.catogory} by ${props.note.user} at ${props.note.date}`}
            />
            <CardContent>
                <Typography variant='body1' color='textSecondary'>
                    {props.note.details}
                </Typography>
            </CardContent>
        </Card>
    )
}
