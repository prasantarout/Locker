import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Fonts, Icons} from '../themes/ImagePath';

const Video = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.videoPro}>
        {/* header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalize(45),
            marginHorizontal: normalize(20),
          }}>
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
          <View style={{alignSelf: 'flex-end'}}>
            <Image source={Icons.videoPro1} style={styles.pro} />
          </View>
        </View>

        <View
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            right: normalize(20),
            bottom: normalize(150),
          }}>
          <TouchableOpacity style={styles.infoCont}>
            <Image
              source={Icons.down}
              style={{
                height: normalize(10),
                width: normalize(10),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoCont}>
            <Image
              source={Icons.audioV}
              style={{
                height: normalize(13),
                width: normalize(13),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoCont}>
            <Image
              source={Icons.video1}
              style={{
                height: normalize(13),
                width: normalize(13),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* bottom button */}
        <TouchableOpacity style={styles.joinContain}>
          <Image source={Icons.callV} style={styles.call} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  pro: {
    resizeMode: 'contain',
    height: normalize(80),
    width: normalize(70),
  },
  backCont: {
    height: normalize(35),
    width: normalize(35),
    borderRadius: normalize(18),
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
  },
  infoCont: {
    height: normalize(35),
    width: normalize(35),
    borderRadius: normalize(18),
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    marginBottom: normalize(15),
  },
  joinContain: {
    height: normalize(70),
    backgroundColor: '#B50808',
    borderRadius: normalize(35),
    width: normalize(70),
    justifyContent: 'center',
    marginTop: normalize(25),
    position: 'absolute',
    bottom: normalize(60),
    alignSelf: 'center',
  },
  call: {
    height: normalize(30),
    width: normalize(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
