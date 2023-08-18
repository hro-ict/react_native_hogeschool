// https://github.com/rnmapbox/maps/issues/1958

import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';

//localdatabase
import AsyncStorage from '@react-native-async-storage/async-storage';


import MapScreen from "./components/MapScreen";
import List from "./components/List";
import Settings from "./components/Settings";






//save theme data in locale database
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('theme', value);
  } catch (e) {
    // saving error
  }
};



//save hotspots in locale database
const storeData_hotspots = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('hotspots', jsonValue);
  } catch (e) {
    // saving error
  }
};


//get hotspots from web API

const get_hotspots_from_web_api = () => {
  return fetch('http://143.47.183.218:3389/hotspots')
    .then(response => response.json())
    .then(json => {
      storeData_hotspots(json.hotspots)
      
      return json;
      
    })
    .catch(error => {
      console.error(error);
    });
};

get_hotspots_from_web_api()
let { status } = await Location.requestForegroundPermissionsAsync();

//get hotspots from local
const getData_hotspots = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('hotspots');
    console.log(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

getData_hotspots()



const Tab = createMaterialBottomTabNavigator();

function MyTabs() {

const [theme, setTheme]= React.useState("")
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('theme');
    if (value !== null) {
      // value previously stored
   
      setTheme(value)
    }
  } catch (e) {
    // error reading value
  }
};

console.log(theme);

getData()
  return (
    <View style={{flex:1, backgroundColor:"#666"}}>
    <Tab.Navigator
      initialRouteName="List"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}

    >

    <Tab.Screen
        name="List"
        component={List}
        initialParams={{ age: 99 }}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-ul" size={24} color="tomato" />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={MapScreen}
         initialParams={{ age: 45 }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="map" size={24} color="tomato" />
          ),
        }}
      />

        <Tab.Screen
        name="Marker"
        component={MapScreen}
         initialParams={{ age: 45 }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
         <FontAwesome name="map-marker" size={24} color="tomato" />
          ),
        }}
      />



   


      
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
          <Feather name="settings" size={24} color="tomato" />
          ),
        }}
      />
    </Tab.Navigator>
       </View>
  );
}

export default function App() {
  return (
    <NavigationContainer style={{ backgroundColor:"black"}}>
      <MyTabs style={{ backgroundColor:"#000000"}} />
    </NavigationContainer>
  );
}

