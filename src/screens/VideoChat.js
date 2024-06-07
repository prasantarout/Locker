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

const VideoChat = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: index == 0 ? 'space-between' : null,
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
                  backgroundColor: index == 1 ? '#E6E6E6' : 'white',
                  width: '94%',
                  borderRadius: normalize(16),
                  borderTopLeftRadius: 0,
                  padding: normalize(10),
                  paddingRight: normalize(20),
                }}>
                <View>
                  <ImageBackground
                    imageStyle={{borderRadius: normalize(10)}}
                    source={Icons.team}
                    style={styles.icon1}>
                    <Image source={Icons.pause} style={styles.icon3} />
                  </ImageBackground>
                </View>
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

          <Text style={styles.txt1}>Video Answer</Text>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}

          <FlatList
            data={Data}
            renderItem={renderItem}
            contentContainerStyle={{marginTop: normalize(20)}}
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

export default VideoChat;

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
    fontSize: normalize(11.5),
    fontFamily: Fonts.Poppins_Regular,
    alignSelf: 'center',
  },
  icon1: {
    height: normalize(95),
    width: normalize(165),
    resizeMode: 'cover',
    justifyContent: 'center',
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
    height: normalize(30),
    width: normalize(30),
    borderRadius: normalize(15),
  },
  time: {
    fontSize: normalize(11),
    color: '#5C6066',
    alignSelf: 'flex-end',
    right: normalize(15),
    marginTop: normalize(10),
  },
  upView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    width: '100%',
    elevation: 6,
    borderRadius: normalize(8),
    marginRight: normalize(15),
    marginBottom: normalize(15),
  },
  icon3: {
    width: normalize(24),
    height: normalize(24),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  icon2: {
    width: normalize(11),
    height: normalize(11),
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  txt4: {
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: 12,
    lineHeight: 18,
    color: '#5C6066',
    left: normalize(5),
  },
  txt2: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
    color: '#000000',
    alignSelf: 'center',
    marginTop: normalize(5),
  },
});
