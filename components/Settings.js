import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Switch, RadioButton   } from 'react-native-paper';

const Settings = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
   const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const themeStyles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkTheme ? '#333' : '#fff',
    },
    box: {
      marginVertical: 20,
      backgroundColor: isDarkTheme ? '#666' : '#f0f0f0',
    },
    buttonText: {
      color: isDarkTheme ? '#fff' : '#000',
    },
  };

  return (
    <View style={themeStyles.container}>
   
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      <TouchableOpacity onPress={toggleTheme} style={[styles.button, { backgroundColor: isDarkTheme ? '#fff' : '#333' }]}>
        <Text style={themeStyles.buttonText}>{isDarkTheme ? 'Light Theme' : 'Dark Theme'}</Text>
      </TouchableOpacity>
      <View style={[styles.box, themeStyles.box]} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default Settings;
