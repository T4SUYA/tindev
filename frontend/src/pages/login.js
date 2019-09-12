import React, { useState} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import api from '../services/api';
import Logo from '../assets/logo.svg';
toast.configure();
export default function Login({history}){
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    async function handlesubmit (e){
        e.preventDefault();
        await api.post('/devs',{
                username : username
            } )
            .then(response => {
                const {_id} = response.data;
                history.push(`/dev/${_id}`);
            })
            .catch(error =>{
                let errorObject=JSON.parse(JSON.stringify(error));
                if (errorObject){
                    console.log(errorObject);
                    setError(errorObject);    
                }
            });
    }
      class Error extends React.Component {
        simulateClick(el){
            if(el !== null && el !== undefined){
                el.click();
                setError(null);
            }
        }
        erro = () => toast(`Hmm, algo deu errado, sera que você digitou o usuário corretamente?`);
        render(){
          return (
               <div className = 'Erro' ref={this.simulateClick} onClick={this.erro}/>
          );
        }
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
                        <button type = 'submit'>Enviar</button>
                    </form>
                    {error && (
                        <Error/>
                    )}
                </div>
                
                
    );
}
