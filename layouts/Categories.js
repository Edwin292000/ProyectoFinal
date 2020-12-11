import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Text, TouchableOpacity, Alert, ScrollView , Image, Button, SafeAreaView} from 'react-native';

export default function Categories({ route, navigation }){
    const [usa, setUsa]=useState(route.params.idus);
    const [categorias, setCategorias]=useState([]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.button}>
                <TouchableOpacity onPress={() => {
                    navigation.push('CreateCategory',{idus:usa});
                }} >
                    <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:24,fontWeight: 'bold', color:'white',}}>+</Text>
                    </View>
                </TouchableOpacity>
                </View>
            ),
        });
    });
    useEffect(()=>{
        console.log("id de susaraoidfiosfsdf  ",usa)
        fetch('http://192.168.1.14:3001/categorias')
        .then(res=>res.json())
        .then(datos=>{
            console.log(datos)
            setCategorias(datos)
        })
        .catch(error=>{
            console.log(error)
            Alert.alert("No hay conexion")
        })
    },[]);

   

    return(
        <View style={styles.container}>
            <ScrollView>
            <View style={{ width:'95%'}}>
            {
                categorias.map((items)=>{
                    return(
                        <View style={styles.mcard} key={items.Id}>
                            <TouchableOpacity onPress={() => {
                                navigation.push('Foods',{categoria:items.Id, idus:usa});
                            }} >
                            <View style={{alignItems:'center'}}>
                                <View style={{flex:1, width:'100%', backgroundColor:'#F2AC29', padding:5,borderTopStartRadius:20,borderTopEndRadius:20,}}>
                                     {items.Foto && <Image source={{ uri:'http://192.168.1.14:3001/Imagenes/Categorias/'+items.Foto  }} style={{ width: '100%', height: 200, }} />}
                                </View>
                                <View style={{flex:1, backgroundColor:'#044BD9', width:'100%', borderBottomEndRadius:25, borderBottomStartRadius:25, alignItems:'center'}}>
                                    <Text style={{fontSize:20,fontWeight: 'bold', color:'white'}}>{items.Nombre}</Text>
                                </View>
                               
                                
                            </View>
                            </TouchableOpacity>
                        </View>

                    );
                })
            }
            </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
    },
    input:{
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 100,
        padding:10,
        width: '75%',
        margin:8,
        fontSize:18,
        borderColor:'#044BD9', 
      },
    button:{
        width:'75%',
        backgroundColor:'red',
        justifyContent: 'center',
        padding:10,
        borderRadius:50,
        margin:10
    },
    mcard:{
        width:'100%',
        backgroundColor:'white',
        padding:5,
        borderRadius:25,
        margin:10,
        borderWidth:2,
    },
});