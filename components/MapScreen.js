import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Appbar  } from 'react-native-paper';
// import * as Location from 'expo-location';


const MapScreen = (props) => {
  const data= {lat,long, desc, adress}= props.route.params
  const [current_lat, set_current_lat]= React.useState(null)
  const [current_long, set_current_long]= React.useState(null)
  const [locations,setLocations]= React.useState("")


  //get curren position
React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location.coords.latitude)
    
      set_current_lat(location.coords.latitude)
      set_current_long(location.coords.longitude)
    })();
  }, []);

const [theme, setTheme]= React.useState("")

//get theme
const get_theme = async () => {
  try {
    const value = await AsyncStorage.getItem('theme');
    if (value !== null) {
      // value previously stored
      console.log(value)
   
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

//get hotspost from local database
getData_hotspots()

//get theme from local database
get_theme()




  return (
    <View style={{ flex: 1,backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000'}}>
     <Appbar.Header >
   
      <Appbar.Content title="Hogeschool Rotterdam Locations"  />
     
    </Appbar.Header>
      <MapView
       showsUserLocation={true}
        style={{ flex: 1}}
        initialRegion={{
          latitude: 51.92406928557815,
          longitude: 4.492373052337382,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      
      >

       <Marker
           title={"Current position"}
           pinColor={"green"}
       
         coordinate={{ 
          latitude: current_lat, longitude: current_long
          }}
        />
     
           {
  !lat ?
  
    locations.map((location, index) => (
      
       
        <Marker 
        //image= {require("./assets/banners/food-banner3.jpg")}
    
        title={location.desc}
        description={location.adress}
        pinColor={location.color}
        key={index}
          coordinate={{ 
          latitude: location.latitude, longitude: location.longitude 
          }}/>
           
         
        ))
        
        :
        <Marker
           title={desc}
        description={adress}
         coordinate={{ 
          latitude: lat, longitude: long
          }}
        />
     
        }

        
       
      </MapView>


    </View>
  );
};

export default MapScreen;
