import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Text, TextInput, Alert, TouchableOpacity, Image} from 'react-native';
import { set } from 'react-native-reanimated';

export default function Login({ route, navigation }){
    
    const [usuario, setUsuario]=useState('');
    const [contra, setContra]=useState('');
    const [resp, setResp]=useState('');
    const [ok, setOk]=useState(false);
    const [todos, setTodos]=useState([]);

    function getUser(){
        fetch('http://192.168.1.14:3001/usuarios')
          .then(res=>res.json())
          .then(datos=>{
            console.log(datos);
            setTodos(datos)
          })
          .catch(error=>{
            console.log(error)
            Alert.alert("No hay conexion")
          })
    
          todos.map(t=>{
            if(usuario==t.Nombre && contra==t.Password){
              setUsuario('');
              setContra('');
              setResp('')
              setOk(t.Id)
              navigation.push('Index',{idus:t.Id});
              
            }
            else{
                setResp("Credenciales incorrectas")
            }
          })
      }
    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text}>Login</Text>
            <Text style={styles.text}>Edwin Cotom 201708004</Text>
          </View>
          <View style={styles.body}>
            <TextInput  style={styles.input} 
                        onChangeText={(text)=>{setUsuario(text)}}
                        placeholder="Usuario"
            >{usuario}</TextInput>
            <TextInput  style={styles.input} 
                        onChangeText={(text)=>{setContra(text)}} 
                        secureTextEntry={true}
                        placeholder="Contraseña"
            >{contra}</TextInput>
            <Text>{resp}</Text>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => {
                  getUser()
                
                /*if(usuario==usuarios[0].Usuario && contra==usuarios[0].Contra){
                  setUsuario('');
                  setContra('');
                  navigation.push('Inicio');
                }
                else{
                    Alert.alert("Error", "Ingrese usuario o contraseña validos");
                }*/
              }} >
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:20,fontWeight: 'bold', color:'white',}}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => {
                  setUsuario('');
                  setContra('');
                  navigation.push('Register');
              }} >
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:20,fontWeight: 'bold', color:'white',}}>Registrate</Text>
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
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      body:{
        flex: 4,
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
        margin:15,
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