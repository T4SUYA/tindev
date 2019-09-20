/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View,Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import Logo from '../assets/logo.png';
import api from '../services/api';
import asyncStorage from '@react-native-community/async-storage';


export default function Login({navigation}) {
  const [user,setUser] = useState('');

  useEffect(() => {
    asyncStorage.getItem('user').then(user =>{
      if (user){
        navigation.navigate('Main', { user });
      }
    });
  }, []);

  async function handleLogin(){
    const response = await api.post('/devs', { username: user });

    const {_id} = response.data;

    await asyncStorage.setItem('user', _id);

    navigation.navigate('Main', {user: _id });
  }
  return (
    <View style={styles.container}>
      <Image source={Logo} />

      <TextInput
        autoCapitalize = "none"
        autoCorrect = {false}
        style={styles.input}
        placeholderTextColor = "#999"
        placeholder="
      Digite seu usuario no github"
      value = {user}
      onChangeText = {setUser}
      />
      <TouchableOpacity onPress = {handleLogin} style = {styles.button}>
        <Text style = {styles.buttonText}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    height:46,
    alignSelf:'stretch',
    backgroundColor: '#df4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
