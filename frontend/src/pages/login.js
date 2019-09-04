import React, { useState } from 'react';
import './login.css';
import api from '../services/api';

import Logo from '../assets/logo.svg';

export default function Login({history}){
    const [username, setUsername] = useState('');
    async function handlesubmit (e){
        e.preventDefault();
        const response = await api.post('/devs',{
            username : username
        } );
        const {_id} = response.data;
        history.push(`/dev/${_id}`);
    }
    return(
        <div className= "login-container">
           <form onSubmit = {handlesubmit}>
                <img src = {Logo} alt= "Tindev"/>
                <input 
                placeholder = "Digite seu usuario Github"
                value = {username}
                onChange={e => setUsername(e.target.value)}
                />
                <button type = "submit">Enviar</button>
            </form> 
        </div>
    );
}
