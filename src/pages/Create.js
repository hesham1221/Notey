import React,{useState} from "react";
import Typography from "@material-ui/core/Typography";
import { Button, RadioGroup } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { Container } from "@material-ui/core";
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { makeStyles } from "@material-ui/core";
import { createTheme , ThemeProvider } from "@material-ui/core";
import { TextField,FormControlLabel } from "@material-ui/core";
import { Radio,FormControl,FormLabel } from "@material-ui/core";
import { useHistory } from "react-router";
import { useEffect } from "react";

const theme = createTheme({
    palette : {
      primary :{
        main : '#aaa'
      }
    }
})
const useStyles = makeStyles({
  btn :{
    color : 'white',
    fontSize : 24,
    '&:hover' : {
      color :'blue'
    }
  },
  field : {
    margin :'0.5rem 0',
    display: 'block'
  },
  date : {
    display : 'block',
    borderRadius:'5px',
    borderColor : '#fefefe',
    width : '30%',
    marginBottom :'1.2rem',
    
  }
});
export default function Create(props) {
  const history = useHistory();
  const [enable,setEnable] = useState(false);

  useEffect(()=>{
    if(props.email === 'test123@test.com'){
      setEnable(true)
    }
  },[props.email])

const [data,setdata] = useState({
  nodte : '',
  details : ''
})

const [catogory,setCatogory] = useState('money')
const todayDate = new Date
const days = todayDate.getDate() > 10 ? todayDate.getDate() : '0' + todayDate.getDate()
const months = (todayDate.getMonth() + 1) >= 10 ? todayDate.getMonth() + 1 : '0' + (todayDate.getMonth() + 1)
const years = todayDate.getFullYear();
const todays = `${years}-${months}-${days}`
const [date,setDate] = useState(todays);

  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
    <Container>
      <form onSubmit={(e)=>{
        e.preventDefault();
        fetch('https://mynotes-57537-default-rtdb.firebaseio.com/notes.json',{
          method :'POST',
          body:JSON.stringify({
            title : data.nodte,
            details : data.details,
            catogory : catogory,
            date : date,
            user : props.email
          }),
          headers :{
            'Content-Type' : 'application/json'
          },}).then(()=>history.push('/'))

        setdata({nodte : '',details :''})
        setCatogory('money');
        setDate(todays)
      }}>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Creat a new note
      </Typography>
      <TextField 
      className={classes.field}
        variant='outlined'
        label='note title'
        color ='secondary'
        fullWidth
        required
        onChange={(e)=>{setdata({...data,nodte : e.target.value})}}
        value={data.nodte}
      />
      <TextField 
      className={classes.field}
        variant='outlined'
        label='note details'
        color ='secondary'
        fullWidth
        required
        multiline
        minRows='4'
        onChange={(e)=>{setdata({...data,details : e.target.value})}}
        value={data.details}
      />
      <FormControl className={classes.field}>
      <FormLabel>Aspect of life</FormLabel>
      <RadioGroup value={catogory} onChange={(e)=>setCatogory(e.target.value)}>
        <FormControlLabel value='family' control={<Radio/>} label='family'/>
        <FormControlLabel value='study' control={<Radio/>} label='study'/>
        <FormControlLabel value='projects' control={<Radio/>} label='projects'/>
        <FormControlLabel value='work' control={<Radio/>} label='work'/>
      </RadioGroup>
      </FormControl>
      <input type='date' className={classes.date} onChange={(e)=>setDate(e.target.value)} value={date} />
      <Button
      className={classes.btn}
        type="submit"
        endIcon={<ArrowForwardIosOutlinedIcon/>}
        color="secondary"
        variant="contained"
        disabled={enable}
      >
        Submit
      </Button>
      {/* <ButtonGroup color='secondary' variant='contained' >
        <Button>one</Button>
        <Button>two</Button>
        <Button>three</Button>
        </ButtonGroup>  
      
      <Button type='submit' variant="outlined" color='secondary'>Submit</Button>
         */}
      {/*
         ICONS
         */}
      {/* <AcUnitOutlinedIcon color='secondary' fontSize='large' />
         <AcUnitOutlinedIcon color='action' fontSize='small' />
         <AcUnitOutlinedIcon color='error' fontSize='small' />
         <AcUnitOutlinedIcon color='disabled' fontSize='small' /> */}
      </form>   
    </Container>
    
    </ThemeProvider>
  );
}
