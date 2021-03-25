/* eslint-disable no-empty-pattern */
import React, { useState } from 'react'
import '../login/Login.css';
import './signup.css';
import Input from '../../components/Input/Input';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import {CreateUser,LoginUser} from '../../services/userService'
function Signup (props) {
const [ userName, setUserName ] = useState('');
const [ password, setPassword ] = useState('');
const [ email, setEmail ] = useState('');
const [signupmode,SetSignupMode] = useState(true);
const [error , setError] = useState('');
const createUser = () => {
    if(userName!=='' && password!='' && email!='')
    {
    
    CreateUser(userName,password,email)
    .then( (data) => {
        alert(data.status);
        SetSignupMode(false);
      },
      (error) => {
        alert(error);
      });
}
else
{
  setError("Please Filled All Data Properly");
}
  
    
}
const loginUser = () => {
    if(email!=='' && password!='')
    {
        LoginUser(password,email)
        .then( (data) => {
            if(data.status)
            {
                props.userLogin();
                console.log(data)
                props.setUser(data.name);
                props.setId(data.id);
                alert(data.massage);
            }

            else
            {
                setError(data.massage);
            }
            
          },
          (error) => {
            alert(error);
          });

}
else
{
  setError("Please Filled All Data Properly");
}
}


    return (
            
        
              <div>
                 <form >
                     
                
                <div className="login__name-input">
                    <Input type='text' placeholder="Type your Email" onInputChange={(value) => setEmail(value)}/>
                </div>
                 {
                    signupmode ?
                <div className="login__name-input">
                    <Input type='text' placeholder="Type your Username" onInputChange={(value) => setUserName(value)}  />
                </div>
                 : null
                } 
                <div className="login__name-input">
                    <Input type='text' placeholder="Type your Password" onInputChange={(value) => setPassword(value)} />
                </div>
               
               
                {
                    signupmode ?
                
                <div type="submit" className="login__signup-button" onClick={() => createUser()}>
                   
                    <p>Sign Up</p>
                </div>
                :
                <div type="submit" className="login__signup-button" onClick={() => loginUser()}>
                   
                    <p>Login</p>
                </div>
                }
              
                </form>
                <div className="login__signup-button" >
                 {  signupmode ?
                 <p onClick={() => SetSignupMode(false)}>alrady Account</p>:<p onClick={() => SetSignupMode(true)}>Go to signup</p> }
                </div>
                {
                error ?
  < ErrorBox error={error} setError={() => { setError('') }} /> :null
            }
                </div>
    )
}

export default Signup
