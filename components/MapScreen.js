import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView from "react-native-maps";
import Marker from "react-native-maps";


export function MapScreen() {
  const locationData = [
    // {latitude: current_lat, longitude: current_long, desc: "current", color:"green"},
    {latitude: 51.910387777297345, 
      longitude: 4.4639805215644, 
      desc: "Academieplein",
      color: "blue",
      adress: "G.J. de Jonghweg 4-6"
    },
      {latitude: 51.90668123869861, 
      longitude: 4.459002341955153, 
      desc:"Peter de Hoochweg",
      color:"green",
      adress: "Peter de Hoochweh 129"
    },
      {latitude: 51.91868541619013, 
      longitude: 4.48439474997006, 
      desc:"Wijnhaven 99",
      color: "black",
      adress: "Wijnhaven 99"
      
    }
  ];
  return (
    <MapView
    zoomEnabled={true}
    showsUserLocation={true}
    style={styles.map}
  initialRegion={{
    latitude: 51.92482212888799,
    longitude: 4.471815601820459,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
 <Marker 
        //image= {require("./assets/banners/food-banner3.jpg")}
   
        title={"Title"}
        description={"Adres"}
        pinColor={"red"}
         coordinate={{ 
          latitude: locationData[0].latitude, longitude: locationData[0].longitude
          }}/>
</MapView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '80%',
    },
  });