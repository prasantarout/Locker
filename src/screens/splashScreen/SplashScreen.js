import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Icons } from '../../themes/ImagePath';


const SplashScreen = props => {

useEffect(()=>{
    // setTimeout(()=>{
    //     // props.navigation.navigate('NaviagteScreenOne')
    // },1000)
},[])

  return (
    <ImageBackground
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="stretch"
      source={Icons.Splash}
    />
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
