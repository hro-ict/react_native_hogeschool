
import { Text, View, StyleSheet, FlatList,TouchableOpacity,ScrollView, Alert} from 'react-native';

export function List() {
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
<View style={{marginTop:50, paddingLeft:20, paddingRight:20}}>


      {locationData.map((location, index) => (
          <TouchableOpacity
          style={styles.container}
          nativeID= {index.toString()}
            key={index}
            onPress={() => Alert.alert(location.adress) }
            style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}
          >
             <ScrollView  style={styles.container}>
            <Text >{location.desc}</Text>
           
           
            </ScrollView>
          </TouchableOpacity>
           
        ))}

</View>
  );
}

const styles = StyleSheet.create({
    container: {

      marginBottom:100
    },
    map: {
      width: '100%',
      height: '50%',
    },
  });