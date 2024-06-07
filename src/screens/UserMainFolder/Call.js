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
import {Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {useNavigation} from '@react-navigation/native';

let Data = [
  {
    id: 1,
    Icon: Icons.hero,
    title: 'Thomas Ellsworth',
  },
  {
    id: 2,
    Icon: Icons.hero1,
    title: 'Thomas Ellsworth',
  },
  {
    id: 3,
    Icon: Icons.hero,
    title: 'Thomas Ellsworth',
  },
  {
    id: 4,
    Icon: Icons.hero1,
    title: 'Thomas Ellsworth',
  },
];

const Call = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.upView}>
        <View>
          <ImageBackground
            imageStyle={{borderRadius: normalize(10)}}
            source={item?.Icon}
            style={styles.icon1}>
            <Image source={Icons.pause} style={styles.icon3} />
          </ImageBackground>

          <View>
            <Text style={styles.txt2}>{item.title}</Text>

            <View
              style={{
                marginTop: normalize(5),
                marginLeft: normalize(8)
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: normalize(4),
                }}>
                <View style={styles.cir}>
                  <Image source={Icons.clock} style={styles.icon2} />
                </View>
                <Text style={styles.txt4}>30 Min</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: normalize(10),
                }}>
                  <View style={styles.cir}>
                <Image source={Icons.bag} style={styles.icon2} />
                </View>
                <Text style={styles.txt4}>Expire In 5 Days</Text>
              </View>
            </View>
          </View>
        </View>
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

          <Text style={styles.txt1}>Call History</Text>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}

          <FlatList
            contentContainerStyle={{
              marginTop: normalize(25),
              marginHorizontal: normalize(25),
            }}
            nestedScrollEnabled
            data={Data}
            renderItem={renderItem}
            numColumns={2}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Call;

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
    color: '#000000',
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
    width: '47%',
    elevation: 6,
    borderRadius: normalize(8),
    marginRight: normalize(15),
    marginBottom: normalize(15),
  },
  icon1: {
    height: normalize(95),
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  txt2: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
    color: '#000000',
    alignSelf: 'center',
    marginTop: normalize(5),
  },
  txt3: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Light,
    color: '#000000',
  },
  icon2: {
    width: normalize(8),
    height: normalize(8),
    resizeMode: 'contain',
    tintColor: '#4A4A4A',
    alignSelf: 'center'
  },
  txt4: {
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: 12,
    lineHeight: 18,
    color: '#5C6066',
    left: normalize(5),
  },
  icon3: {
    width: normalize(24),
    height: normalize(24),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  cir: {
    height: normalize(15),
    width: normalize(15),
    borderRadius: normalize(13),
    backgroundColor: '#5C60661A',
    justifyContent: 'center',
  },
});
