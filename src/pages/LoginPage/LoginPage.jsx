import React from 'react';
import './LoginPage.css';
import { useState } from "react";
import { Link } from "react-router-dom";


import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import SignUpPage from '../SignupPage/SignupPage';
import { useNavigate } from 'react-router-dom'
import userService from "../../utils/userService";


export default function LoginPage(props) {
 const [error, setError] = useState('')
 const [state, setState] = useState({
   email: '',
   password: ''
 })

 const navigate = useNavigate();
 function handleChange(e) {


   setState({
     ...state,
     [e.target.name]: e.target.value
   });
 }


 async function handleSubmit(e) {
    e.preventDefault();
 
    try{
      
      props.handleSignUpOrLogin(e); //this is deconstructed in th props and sets the new user in state
      //change the view to the home page
      navigate('/');
    } catch(err){
      console.log(err.message, " <- this comes from tht throw in utils/login")
      setError('Check Your Terminal for errors!!!!!!!!!')
    }
 }


 return (
   <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
     <Grid.Column style={{ maxWidth: 450 }}>
       <Header as='h2' color='teal' textAlign='center'>
         <Image src="https://i.imgur.com/TM4eA5g.jpg" />Log-in to your account
       </Header>
       <Form size='large' onSubmit={handleSubmit}>
         <Segment stacked>
           <Form.Input
             type="email"
             name="email"
             placeholder="email"
             value={state.email}
             onChange={handleChange}
            
           />
           <Form.Input
             name="password"
             type="password"
             placeholder="password"
             value={state.password}
             onChange={handleChange}
            
           />
          
          <Button type="submit" color='teal' fluid size='large'>
             Login
           </Button>
       <br></br>
         </Segment>
         <Message>
          New to us? <Link to="/signup">Sign up!</Link>
        </Message>  
       </Form>
     </Grid.Column>
   </Grid>
 );
 }