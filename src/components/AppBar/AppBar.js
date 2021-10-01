import React from 'react'
import { AppBar, Button, ButtonGroup, IconButton, Toolbar, Typography } from '@material-ui/core'
import {Menu } from '@material-ui/icons'
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';


const useStyles = makeStyles({
    'home' : {
        color : '#fff',
        fontSize : '1rem',
        '&:hover' : {
            color : 'grey'
        },
        position :'absolute',
        right :'1.2rem'
    },
    group :{
        display :'flex',
        justifyContent : 'end',
        width : '100%',
    },
    create :{
        color : '#fff',
        fontSize : '1rem',
        border : 'none !important',
        '&:hover' : {
            color : 'grey'
        },
    },
    nav1 :{
        backgroundColor : '#f64c72',
        marginBottom :'1.2rem',
        textAlign : 'center'
    },
    nav2 :{
        backgroundColor : '#f64c72',
    }
}) 

export default function NavBar(props) {
    const classes = useStyles()
    const history = useHistory();
    const [demo,setDemo]=useState(false);
    useEffect(()=>{
        if(props.email === 'test123@test.com'){
            setDemo(true);
        }
    },[props.email])
    return (
        <div>
        <AppBar position='static' className={ demo ? classes.nav2 : classes.nav1} >
            <Toolbar>
                <Typography variant='h6'>NOTEY</Typography>
                <ButtonGroup className={classes.group}>
                <Button color='secondary' onClick={()=>history.push('/')} className={classes.create}>HOME</Button>
                {props.isLogin && <Button color='secondary' onClick={()=>history.push('/create')} className={classes.create}>Create new notes</Button>}
                {props.isLogin && <Button color='secondary' onClick={()=> {setDemo(false);localStorage.removeItem('token');localStorage.removeItem('email') ; props.setIslogin(false);history.push('/login')} } className={classes.create}>Logout</Button>}
                {!props.isLogin &&<Button color='secondary' onClick={()=>history.push('/login')} className={classes.create}>Login</Button>}
                </ButtonGroup>
            </Toolbar>
        </AppBar>
        {demo && <AppBar position='static' className={classes.nav1} >
            <Typography variant='body1'>To post notes you should make an account first</Typography>
            </AppBar>}
        {props.children}
        </div>
    )
}
