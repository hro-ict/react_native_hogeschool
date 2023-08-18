import React, {useEffect, useState} from 'react';
  RefreshControl 
import { View, FlatList,  StyleSheet, ScroolView, RefreshControl, Alert, Linking} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { Avatar, Button , Card, Text, Appbar  } from 'react-native-paper';
import { NavigationContainer, Link  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { MaterialCommunityIcons, FontAwesome, Feather, AntDesign, Entypo } from '@expo/vector-icons';
import MapMarker from "./MapMarker";
const LeftContent = props => <Avatar.Icon {...props} icon="map" />

const Stack = createNativeStackNavigator();
const List = () => {

const [refreshing, setRefreshing] = React.useState(false);

const [locations,setLocations]= React.useState("")

const [counter,set_counter]=useState(0)

const [theme, setTheme]= React.useState("")



//check biometrie
useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      // Biometrische authenticatie beschikbaar
    } else {
      // Biometrische authenticatie niet beschikbaar
    }
  };

    const authenticate = async (id, location) => {
 
    const result = await LocalAuthentication.authenticateAsync();

    if (result.success) {
      // Biometrische authenticatie success

      removeItemFromArray(id)
      Alert.alert("Location: "+location+ " removed")
      //Alert.alert('Success', 'Biometric authentication successful!');
    } else {
      // Biometrische authenticatie mislukt
      Alert.alert('Error', 'Biometric authentication failed!');
    }
  };

//check biometrie

//delete item from local
const getArrayFromAsyncStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('hotspots');
    const array = JSON.parse(jsonValue) || [];
    return array;
  } catch (error) {
    console.error('Fout bij het ophalen van de array uit AsyncStorage:', error);
  }
};

const removeItemFromArray = async (itemId) => {
  try {
    const array = await getArrayFromAsyncStorage();
    const updatedArray = array.filter(item => item.id !== itemId);
    console.log(updatedArray)

    // Sla de bijgewerkte array op in AsyncStorage
    await AsyncStorage.setItem('hotspots', JSON.stringify(updatedArray));
    set_counter(0)
    getData_hotspots()
    
  } catch (error) {
    console.error('Fout bij het verwijderen van het item uit de array in AsyncStorage:', error);
  }
};

//removeItemFromArray('1');
//delete item from local

 const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

const get_theme = async () => {
  try {
    const value = await AsyncStorage.getItem('theme');
    if (value !== null) {
      // value previously stored
      //console.log(value)
   
      setTheme(value)
    }
  } catch (e) {
    // error reading value
  }
};

const getData_hotspots = async () => {

  if (counter==0){
      try {
    const jsonValue = await AsyncStorage.getItem('hotspots');
    console.log(jsonValue)
    setLocations(JSON.parse(jsonValue))
    set_counter(1)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
  }
  

};

//get locations-hotspots from local database
getData_hotspots()


//get theme from local database
get_theme()

console.log("locations")



  
  return (

    
  
       <View style={styles.container}>
       <Appbar.Header style={{backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000'}}>
   
      <Appbar.Content title="Hogeschool Rotterdam Locations"  style={{fontSize:12}} />
     
    </Appbar.Header>
      <FlatList
     refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // data={locations}
         data={locations}
        renderItem={({item, index}) => 
        
       <Card  style={{backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000'}}>
    <Card.Title title=<Text style={{color: theme === 'light' ? '#000000' : '#FFFFFF',}} > {item.desc}</Text> subtitle= <Text style={{color: theme === 'light' ? '#000000' : '#FFFFFF',}}> {item.adress}</Text> left={LeftContent} />
    <Card.Content>
   
    </Card.Content>

    <Card.Cover source={{ uri: item.image }} />
    <Card.Actions>
      <Button onPress={function(){Alert.alert(item.id)}}><AntDesign name="edit" size={30} color="green" /></Button>
      <Button style={{paddingLeft:30}} onPress={()=>authenticate(item.id, item.desc)}><AntDesign name="delete" size={30} color="red" /></Button>
<Link to={{ screen: 'Marker', params: { lat: item.latitude, long:item.longitude, desc:item.desc, adress:item.adress} }}>
      <Button style={{paddingLeft:30}}><Feather name="map-pin" size={30} color="blue" /></Button>
 </Link>
 <Button style={{paddingLeft:30}} onPress={()=>Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${current_lat}+${current_long}&destination=${item.latitude},${item.longitude}`)}><Entypo name="direction" size={30} color="#422040" /></Button>
    </Card.Actions>
  </Card>
        
        
        
        }
      />
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
   
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,246,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});



export default List;
