import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import './main.css';
import api from '../services/api';
import io from 'socket.io-client';
import itsamatch from '../assets/itsamatch.png';
import Loading from '../assets/Double Ring-3.1s-200px.gif';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Main({match}){
    const [users, setUsers] = useState([]);
    const [matchDev,setMatchDev] = useState(null);
    const [loggedDev,setLoggedDev] = useState([]);
    const [welcome, SetWelcome] = useState(null);
    const [likeNotification, SetLike] = useState(null);
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })
            const data = await api.get('/devData',{
                headers: {
                    user: match.params.id,
                }
            })
            setLoggedDev(data.data);
            setUsers(response.data);
            SetWelcome(data.data.name);
        }
        loadUsers();
    },[match.params.id]);
    useEffect (()=>{
        const socket = io(process.env.REACT_APP_API || "http://localhost:8080",{
            query: {user: match.params.id}
        });
        socket.on('match',dev =>{
            setMatchDev(dev);
        })
        socket.on('like', (dev) => {
            SetLike(dev);
        })
    },[match.params.id]);

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`,null, {
            headers:  { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id))
    }
    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`,null, {
            headers:  { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id))
    }
    while (users.length <=0 && loggedDev.length <= 0 ){
        return (
            <div className = 'center'> 
                <img src = {Loading} alt = "loading"/> 
                </div>
        )
    }
    class Welcome extends React.Component {
        simulateClick(el){
            if(el !== null && el !== undefined){
                el.click();
                SetWelcome(null);
            }
        }
        welcome = () => toast(`Bem vindo ${loggedDev.name} `);
        render(){
          return (
               <div className = 'phantom' ref={this.simulateClick} onClick={this.welcome}/>
          );
        }
      }
      class LikeNot extends React.Component {
        simulateClick(el){
            if(el !== null && el !== undefined){
                el.click();
                SetLike(null);
            }
        }
        like = () => toast(`${loggedDev.name} deu like em ${likeNotification} `);
        render(){
          return (
               <div className = 'phantom' ref={this.simulateClick} onClick={this.like}/>
          );
        }
      }
        return (
        <div className= 'main-container'>
            <div className = 'logo-container'>
                <img className = 'userImage' src= {loggedDev.avatar} alt = {loggedDev.name}/>
                <Link to ='/'>;
                <img src= {logo} alt="tindev"/>
                </Link>
               {welcome && (
                   <Welcome/>
               )}
            </div>
            { users.length >0 ?<ul>
                {users.map(user =>(
                    <li key ={user._id} >
                    <img src = 
                    {user.avatar} alt = {user.name} />
                    <footer>
                        <strong> {user.name} </strong>
                        <p>{user.bio}</p>
                    </footer>
                    <div className = "buttons">
                    <button type= 'button' onClick = {() => handleDislike(user._id)}>
                        <img src = {dislike} alt = "dislike"/>
                    </button>
                        <button type= 'button' onClick = {() => handleLike(user._id)}>
                            <img src = {like} alt = "Like"/>
                        </button>
                    </div>
                </li>
                ))}
                
            </ul> : (<div className = "empty"> Acabou ):</div>)
         }
         {likeNotification && (
             <LikeNot/>
         )}
         {matchDev && (
                    <div className = 'match-container' >
                        <img src =  {itsamatch} alt= 'its a match' />
                        <img className = 'avatar' src ={matchDev.avatar} alt = ""/>
                        <strong> {matchDev.name} </strong>
                        <p>{matchDev.bio}</p>
                        <button onClick = {() => setMatchDev(null)} type = 'button'> Fechar </button>
                    </div>
         )}
        </div>
    );
}