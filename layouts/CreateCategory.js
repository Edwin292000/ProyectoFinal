import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Text, TextInput, Alert, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { set } from 'react-native-reanimated';
import Axios from 'axios';


export default function Register({ route, navigation }){
    const [usa, setUsa]=useState(route.params.idus);
    const [usuario, setUsuario]=useState(route.params.idus);
    const [nombre, setNombre]=useState('');
    const [foto, setFoto]=useState(null);
    const [estado, setEstado]=useState(false);
    //const [contra, setContra]=useState('');

    useEffect(() => {
        (async () => {
            if (estado===true){
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                alert('Debe de dar acceso a los archivos');
                }
            }
            
        })();
    }, [estado]);

    const obtenerImagen = async () => {
        setEstado(true)
        let f = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [9, 16],
          quality: 1,
        });
        if (!f.cancelled) {
            setEstado(false)
            setFoto(f);
        }
        setEstado(false)
    };

    const AddCategory = async()=>{
        const data = new FormData();
        data.append("foto",{
            name:nombre+".jpg",
            type: 'image/jpeg',
            uri:foto.uri
        })
        data.append('nombre',nombre)
        data.append('usuario',usa)
        console.log(data)
        Axios.post('http://192.168.1.14:3001/categorias',data)
        .then( res=>{
            Alert.alert("Categoria agregada exitosamente")
            navigation.goBack({d:'e'});
        } )
        .catch(error=>{
            console.log(error)
            Alert.alert("Ocurrio un error!")
        })
    }

    return(
        <View style={styles.container}>
          <View style={styles.header}>
            {foto && <Image source={{ uri: foto.uri }} style={{ width: '100%', height: 200 }} />}
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>Agregar Categoria</Text>
            <TextInput  style={styles.input} 
                        onChangeText={(text)=>{setNombre(text)}}
                        placeholder="Nombre"
            >{nombre}</TextInput>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => {
                obtenerImagen()
              }} >
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:20,fontWeight: 'bold', color:'white',}}>Buscar Imagen </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => {
                  AddCategory()
              }} >
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:20,fontWeight: 'bold', color:'white',}}>Guardar</Text>
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