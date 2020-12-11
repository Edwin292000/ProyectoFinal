import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Text, TextInput, Alert, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios'


export default function CreateFood({ route, navigation }){
    const [categoria, setCat]=useState(route.params.categoria);
    const [usa, setUsa]=useState(route.params.idus);

    const [hasPermission, setHasPermission] = useState(null);
    const [usuario, setUsuario]=useState('');
    const [nombre, setNombre]=useState('');
    const [descripcion, setDescripcion]=useState('');
    const [foto, setFoto]=useState(null);
    const [estado, setEstado]=useState(false);

    const [type, setType] = useState(Camera.Constants.Type.back);
    const [fotoc, setFotoc]=useState(null);
    const [camara, setCamara]=useState('')
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
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePick = async () => {
        if (camara) {
          let photo = await camara.takePictureAsync();
          setFoto(photo)
        }
    };

    const obtenerImagen = async () => {
        setEstado(true)
        let f = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [16, 9],
          quality: 1,
        });
        if (!f.cancelled) {
          setFoto(f);
        }
        setEstado(false)
    };
    const rotateCamera=()=>{
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
      }

    const AddFood = async()=>{
        console.log('enviando')
        const data = new FormData();
            data.append("foto",{
                name:nombre+".jpg",
                type: 'image/jpeg',
                uri:foto.uri
            })
        console.log('data',data);
        data.append('nombre',nombre)
        data.append('descripcion',descripcion)
        data.append('categoria',categoria)
        data.append('usuario',usa)
        Axios.post('http://192.168.1.14:3001/platillos',data)
            .then( res=>{
                console.log(res)
                Alert.alert("Platillo agregada exitosamente")
                navigation.goBack();
            } )
            .catch(error=>{
                console.log(error)
                Alert.alert("No hay conexion")
            })
    }

    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Camera
            style={{ flex: 1 }}
            type={type}
            ref={(ref) => {
                setCamara(ref)
            }}>
            <View style={styles.containercam} >
                <View style={styles.top} >
                    <View style={{flex:1}}>
                        <MaterialIcons.Button
                            name="cached"
                            size={50}
                            backgroundColor="transparent"
                            onPress={()=>rotateCamera()}
                        />
                        
                    </View>
                    <View style={{flex:1, opacity:0.2 }}>
                        <MaterialIcons.Button
                            name="camera"
                            size={50}
                            iconStyle={{marginLeft:25}}
                            onPress={()=>takePick()}
                        />
                    </View>
                    <View style={{flex:1, alignContent:"center", alignItems:'center'}}>
                    {

                        
                    
                    
                    }
                    </View>
                </View>
            </View>
            </Camera>
          </View>
          <View style={styles.body}>
            <ScrollView style={{width:'100%'}}>
            <View style={{width:'100%', alignItems:'center', marginBottom:15}}>
            <Text style={styles.text}>Agregar Platillo</Text>
            <TextInput  style={styles.input} 
                        onChangeText={(text)=>{setNombre(text)}}
                        placeholder="Nombre"
            >{nombre}</TextInput>
            <TextInput  style={styles.input} 
                        onChangeText={(text)=>{setDescripcion(text)}}
                        placeholder="Descripcion"
            >{descripcion}</TextInput>
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
                  AddFood()
              }} >
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:20,fontWeight: 'bold', color:'white',}}>Guardar</Text>
                </View>
              </TouchableOpacity>
            </View>
            {foto && <Image source={{ uri: foto.uri }} style={{ width: '100%', height: 200 }} />}
            </View>
            </ScrollView>
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
        justifyContent: 'center',
        margin:5
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
      top: {
        flex: 0.25,
        flexDirection:"row"
      },
      containercam:{
        flex:1, 
        backgroundColor:'transparent', 
        justifyContent:'flex-end',
      },
});