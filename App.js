import React, { useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
} from 'react-native';
import StackNav from './src/navigation/StackNav';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import { getTokenRequest } from './src/redux/reducer/AuthReducer';
import { useDispatch } from 'react-redux';
LogBox.ignoreAllLogs();

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // requestUserPermission();
    // getDeviceToken()
    //   .then(token => {
    //     console.log('token26', token);
    //   })
    //   .catch(err => {
    //     console.log('tokenerr29', err);
    //   });
    setTimeout(() => {
      dispatch(getTokenRequest());
    }, 2000);
  }, []);
  const mytheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    },
  };
  return (
    <NavigationContainer theme={mytheme}>
      <StackNav />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
