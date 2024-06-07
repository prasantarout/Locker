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
import {useNavigation} from '@react-navigation/native';
import MyStatusBar from '../utils/helpers/MyStatusBar';
import {Fonts, Icons} from '../themes/ImagePath';

let Data = [
  {
    id: 1,
    Icon: Icons.users,
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    time: '15:32',
  },
  {
    id: 2,
    Icon: Icons.phone,
    title: 'Lorem Ipsum is simply dummy text of the printing',
    time: '15:35',
  },
];

const Chat = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: normalize(20),
          marginBottom: normalize(20),
        }}>
        {index === 0 ? (
          <>
            <View>
              <View
                style={{
                  paddingVertical: normalize(10),
                  backgroundColor: index == 1 ? '#E6E6E6' : 'white',
                  paddingLeft: normalize(5),
                  paddingRight: normalize(10),
                  width: '94%',
                }}>
                <Text
                  style={{
                    fontSize: normalize(13),
                    color: '#5C6066',
                  }}>
                  {item?.title}
                </Text>
              </View>

              <Text style={styles.time}>{item?.time}</Text>
            </View>
            <Image source={Icons.exPro} style={styles.dp} />
          </>
        ) : (
          <>
            <Image
              source={Icons.exPro}
              style={[styles.dp, {marginRight: normalize(10)}]}
            />
            <View>
              <View
                style={{
                  paddingVertical: normalize(15),
                  backgroundColor: index == 1 ? '#E6E6E6' : 'white',
                  paddingLeft: normalize(7),
                  paddingRight: normalize(10),
                  width: '94%',
                  borderRadius: normalize(16),
                  borderTopLeftRadius: 0,
                }}>
                <Text
                  style={{
                    fontSize: normalize(13),
                    color: '#5C6066',
                  }}>
                  {item?.title}
                </Text>
              </View>

              <Text style={[styles.time, {alignSelf: 'flex-start', right: 0}]}>
                {item?.time}
              </Text>
            </View>
          </>
        )}
      </View>
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

          <Text style={styles.txt1}>Chat Answer</Text>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}

          <FlatList
            contentContainerStyle={{marginTop: normalize(20)}}
            data={Data}
            renderItem={renderItem}
          />
        </ScrollView>

        {/* Bottom part */}
        <View style={styles.bottom}>
          <TextInput
            style={{
              flex: 1,
              marginRight: normalize(10),
            }}
            placeholder="Write your question.."
            placeholderTextColor={'#5A5A5A'}
            underlineColorAndroid="transparent"
            color={'black'}
          />
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <Image source={Icons.sent} style={styles.pro} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Chat;

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
    width: '57%',
  },
  backCont: {
    height: normalize(35),
    width: normalize(35),
    borderRadius: normalize(18),
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
  },
  txt1: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Regular,
    alignSelf: 'center',
    color: '#000000',
    fontWeight: Platform.OS == 'android' ? '700' : '400',
  },
  icon1: {
    height: normalize(85),
    width: normalize(85),
    resizeMode: 'contain',
    borderRadius: normalize(55),
    justifyContent: 'flex-end',
  },
  bottom: {
    height: normalize(60),
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(30),
  },
  pro: {
    resizeMode: 'contain',
    height: normalize(30),
    width: normalize(30),
  },
  dp: {
    resizeMode: 'contain',
    height: normalize(32),
    width: normalize(32),
    
   
  },
  time: {
    fontSize: normalize(11),
    color: '#5C6066',
    alignSelf: 'flex-end',
    right: normalize(15),
    marginTop: normalize(10),
  },
});
