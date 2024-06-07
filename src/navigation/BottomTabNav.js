import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Platform,
  BackHandler,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {Icons} from '../themes/ImagePath';
import {Colors} from '../themes/Colors';
import Home from '../screens/userTab/Home';
import Setting from '../screens/userTab/Setting';

import Calender from '../screens/userTab/Calender';
import UnionScreen from '../screens/UserMainFolder/UnionScreen';


const UnionStack = createStackNavigator();
const CalenderStack = createStackNavigator();
const SettingStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // unmountOnBlur: true,
        keyboardHidesTabBar: true,
        tabBarHideOnKeyboard: true,
        showIcon: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(22, 22, 22, 1) rgba(0, 0, 0, 1)',
          borderTopRightRadius: normalize(20),
          borderTopLeftRadius: normalize(20),
          height: Platform.OS === 'ios' ? normalize(70) : normalize(70),
          position: 'absolute',
          bottom: 0,
          shadowColor: Colors.black2,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 15,
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarIconConatiner}>
                {focused && (
                  <Image
                    source={Icons.angle}
                    style={{
                      resizeMode: 'contain',
                      height: normalize(7),
                      width: normalize(7),
                      bottom: normalize(5),
                    }}
                  />
                )}
                <Image
                  style={{
                    height: focused ? normalize(25) : normalize(18),
                    width: focused ? normalize(45) : normalize(18),
                  }}
                  source={focused ? Icons.home : Icons.home}
                  resizeMode="contain"
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Reward"
        component={UnionStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarIconConatiner}>
                {focused && (
                  <Image
                    source={Icons.angle}
                    style={{
                      resizeMode: 'contain',
                      height: normalize(7),
                      width: normalize(7),
                      bottom: normalize(5),
                    }}
                  />
                )}
                <Image
                  style={{
                    height: focused ? normalize(25) : normalize(18),
                    width: focused ? normalize(45) : normalize(18),
                  }}
                  source={focused ? Icons.union : Icons.union}
                  resizeMode="contain"
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Calender"
        component={CalenderStackScreen}
        // listeners={({navigation}) => ({
        //   blur: () => navigation.setParams({screen: undefined}),
        // })}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarIconConatiner}>
                {focused && (
                  <Image
                    source={Icons.angle}
                    style={{
                      resizeMode: 'contain',
                      height: normalize(7),
                      width: normalize(7),
                      bottom: normalize(5),
                    }}
                  />
                )}
                <Image
                  style={{
                    height: focused ? normalize(25) : normalize(21),
                    width: focused ? normalize(45) : normalize(21),
                  }}
                  source={focused ? Icons.calender : Icons.calender}
                  resizeMode="contain"
                />
              </View>
            );
          },
        }}
      />
      
      <Tab.Screen
        name="Setting"
        component={SettingStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.tabBarIconConatiner}>
                {focused && (
                  <Image
                    source={Icons.angle}
                    style={{
                      resizeMode: 'contain',
                      height: normalize(7),
                      width: normalize(7),
                      bottom: normalize(5),
                    }}
                  />
                )}
                <Image
                  style={{
                    height: focused ? normalize(25) : normalize(18),
                    width: focused ? normalize(45) : normalize(18),
                  }}
                  source={focused ? Icons.settings : Icons.settings}
                  resizeMode="contain"
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({
  tabBarIconConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? normalize(8) : null,
  },
});

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}>
      <HomeStack.Screen name="home" component={Home} />
    </HomeStack.Navigator>
  );
};
const UnionStackScreen = () => {
  return (
    <UnionStack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}>
      <UnionStack.Screen name="union" component={UnionScreen} />
    </UnionStack.Navigator>
  );
};
const CalenderStackScreen = () => {
  return (
    <CalenderStack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}>
      <CalenderStack.Screen name="calender" component={Calender} />
    </CalenderStack.Navigator>
  );
};

const SettingStackScreen = () => {
  return (
    <SettingStack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}>
      <SettingStack.Screen name="setting" component={Setting} />
    </SettingStack.Navigator>
  );
};
