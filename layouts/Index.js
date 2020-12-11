import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Categories from './Categories'
import CreateCategory from './CreateCategory';
import CreateFood from './CreateFood';
import Foods from './Foods';

const Stack = createStackNavigator();

export default function Index({ route, navigation }) {
    const [usa, setUsa]=useState(route.params.idus);
  return (
      <Stack.Navigator initialRouteName="Categories" headerMode='screen'>
        <Stack.Screen name="Categories" component={Categories}  options={{
                title: 'Categorias',headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#044BD9',
                },
            }} initialParams={{idus:usa}}/>
        
        <Stack.Screen name="CreateCategory" component={CreateCategory} options={{
                title: '',headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#044BD9',
                },
            }}/>
        <Stack.Screen name="CreateFood" component={CreateFood} options={{
                title: '',headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#044BD9',
                },
            }}/>
        <Stack.Screen name="Foods" component={Foods} options={{
                title: 'Platillos',headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#044BD9',
                },
            }}/>
        {/*<Stack.Screen name="Comidas" component={Comidas} />
        <Stack.Screen name="NuevaCategoria" component={NuevaCategoria} />
        <Stack.Screen name="NuevaComida" component={NuevaComida} />
        <Stack.Screen name="Camara" component={Camara} />
        */}
      </Stack.Navigator>
  );
}