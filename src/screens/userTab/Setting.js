import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {useNavigation} from '@react-navigation/native';

let Data = [
  {
    id: 1,

    title: 'Notification Settings',
  },
  {
    id: 2,

    title: 'Chat Setting',
  },
  {
    id: 3,

    title: 'Call Setting',
  },
];

const Setting = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.main,
          {
            borderBottomWidth: index == 4 ? 0 : normalize(1),
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt5}>{item.title}</Text>
        </View>
        <Image source={Icons.left} style={styles.right} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        {/* header */}

        <View style={styles.container_wrapper}>
          <TouchableOpacity
            onPress={() => navigation.goBack('')}
            style={styles.backCont}>
            <Image
              source={Icons.left}
              style={{
                height: normalize(10),
                width: normalize(10),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <Text style={styles.txt1}>Settings</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.iconContainer, {right: normalize(10)}]}
              onPress={() => navigation.navigate('Profile')}>
              <Image source={Icons.users} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.iconContainer}>
              <Image
                source={Icons.Notification}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}
          <View style={styles.mainCon}>
            <FlatList nestedScrollEnabled data={Data} renderItem={renderItem} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  container_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: normalize(20),
    marginHorizontal: normalize(20),
    paddingTop: Platform?.OS === 'ios' ? normalize(25) : normalize(45),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: '#171717',
    // backgroundColor: digit != '' ? 'black' : 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  backCont: {
    height: normalize(35),
    width: normalize(35),
    borderRadius: normalize(18),
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
  },
  txt1: {
    fontSize: normalize(11.5),
    fontFamily: Fonts.Poppins_Regular,
    alignSelf: 'center',
    color: '#000000'
  },
  mainCon: {
    marginTop: normalize(29),
    backgroundColor: 'white',
    marginHorizontal: normalize(25),
    paddingBottom: normalize(80),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    paddingHorizontal: normalize(15),
  },
  main: {
    paddingVertical: normalize(15),
    flexDirection: 'row',
    marginBottom: normalize(10),
    justifyContent: 'space-between',
    borderBottomWidth: normalize(1),
    borderColor: '#5C60661F',
  },
  icon2: {
    resizeMode: 'contain',
    height: normalize(15),
    width: normalize(15),
  },
  txt5: {
    fontFamily: Fonts?.Poppins_Regular,
    fontSize: normalize(13),
    color: '#000000',
    alignSelf: 'center',
  },
  right: {
    resizeMode: 'contain',
    height: normalize(11),
    width: normalize(11),
    alignSelf: 'center',
    transform: [{rotate: '180 deg'}],
  },
});
