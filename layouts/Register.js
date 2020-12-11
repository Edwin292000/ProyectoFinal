import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Text, TextInput, Alert, TouchableOpacity, Image} from 'react-native';


export default function Register({ route, navigation }){
    
    const [usuario, setUsuario]=useState('');
    const [contra, setContra]=useState('');
    const [correo, setCorreo]=useState('');
    //const [contra, setContra]=useState('');
    const AddUser = async()=>{ 
        await Axios.post('http://192.168.1.14:3001/usuarios',{
            nombre:usuario, correo: correo, pass:contra
        })
        .then( res=>{
            Alert.alert("Usuario registrado exitosamente")
            setUsuario('');
            setContra('');
            navigation.goBack();
        } )
        .catch(error=>{
            console.log(error)
            Alert.alert("Ocurrio un error!")
        })
    }

    function agregarUs(){
        fetch('http://192.168.1.14:3001/usuarios', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              { nombre:usuario, correo: correo, pass:contra }
            )
        })
        .then( res=>res.text() )
        .then( res=>{
              console.log(res)
              Alert.alert("Usuario creado exitosamente")
              navigation.goBack()
        } )
        .catch(error=>console.log(error))
    }

    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text}>Registrate</Text>
          </View>
          <View style={styles.body}>
            <TextInput  style={styles.input} 
                        onChangeText={(text)=>{setCorreo(text)}}
                        placeholder="Correo"
            >{correo}</TextInput>
            <TextInput  style={styles.input} 
                        onChangeText={(text)=>{setUsuario(text)}}
                        placeholder="Usuario"
            >{usuario}</TextInput>
            <TextInput  style={styles.input} 
                        onChangeText={(text)=>{setContra(text)}} 
                        secureTextEntry={true}
                        placeholder="Contraseña"
            >{contra}</TextInput>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => {
                  AddUser()
                  
              }} >
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:20,fontWeight: 'bold', color:'white',}}>Registrarse</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => {
                  setCorreo('')
                  setUsuario('');
                  setContra('');
                  navigation.push('Login');
              }} >
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:20,fontWeight: 'bold', color:'white',}}>Ya tengo una cuenta</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
        backgroundColor:'#044BD9'
      },
      header:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      body:{
        flex: 5,
        backgroundColor:'#F2AC29',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        alignItems: 'center',
        paddingTop:50,
      },
      text: {
        fontSize: 30,
        fontWeight: 'bold',
        color:'white'
      },
      input:{
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 100,
        padding:10,
        width: '75%',
        margin:8,
        fontSize:18,
        borderColor:'#044BD9'
      },
      button:{
        width:'75%',
        backgroundColor:'#044BD9',
        justifyContent: 'center',
        padding:10,
        borderRadius:50,
        margin:10
      },
});