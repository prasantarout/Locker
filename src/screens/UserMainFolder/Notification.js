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

    title: 'Your Appointment Id #12345 has been Confirmed for Aug 27th, 2023',
  },
  {
    id: 2,

    title: 'Your Appointment Id #12345 has been Confirmed for Aug 27th, 2023',
  },
  {
    id: 3,

    title: 'Your Appointment Id #12345 has been Confirmed for Aug 27th, 2023',
  },
  {
    id: 4,

    title: 'Your Appointment Id #12345 has been Confirmed for Aug 27th, 2023',
  },
  {
    id: 5,

    title: 'Your Appointment Id #12345 has been Confirmed for Aug 27th, 2023',
  },
  {
    id: 6,

    title: 'Your Appointment Id #12345 has been Confirmed for Aug 27th, 2023',
  },
  {
    id: 7,

    title: 'Your Appointment Id #12345 has been Confirmed for Aug 27th, 2023',
  },
];

const Notification = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.mainCon,
          {
            marginBottom: index == 6 ? normalize(15) : normalize(0),
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.txt5,
              {
                fontFamily:
                  index == 0
                    ? Fonts.Poppins_Medium
                    : index == 1
                    ? Fonts.Poppins_Medium
                    : Fonts.Poppins_Light,
              },
            ]}>
            {item.title}
          </Text>
        </View>
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

          <Text style={styles.txt1}>Notifications</Text>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}
          <View
            style={{marginTop: normalize(10), paddingBottom: normalize(10), paddingTop: normalize(10)}}>
            <FlatList nestedScrollEnabled data={Data} renderItem={renderItem} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Notification;

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
    width: '55%',
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
  },
  mainCon: {
    marginTop: normalize(10),
    backgroundColor: 'white',
    marginHorizontal: normalize(25),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    paddingHorizontal: normalize(13),
    paddingVertical: normalize(15),
  },

  icon2: {
    resizeMode: 'contain',
    height: normalize(15),
    width: normalize(15),
  },
  txt5: {
    fontFamily: Fonts?.Poppins_Regular,
    fontSize: normalize(11),
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
