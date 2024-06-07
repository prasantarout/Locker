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
];

const Connected = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.upView}>
        <View style={styles.upTopView}>
          <Image source={item?.Icon} style={styles.icon1} />

          <View style={{width: '65%', left: normalize(15)}}>
            <Text style={styles.txt2}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.txt3}>Business</Text>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: '#5C60664D',
                  height: 1,
                  width: '50%',
                  alignSelf: 'center',
                  left: normalize(5),
                }}
              />
            </View>

            <View
              style={{
                marginTop: normalize(3),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.cir}>
                  <Image
                    source={Icons.messaging}
                    style={styles.icon2}
                    // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
                  />
                </View>
                <Text style={styles.txt4}>250 Consultations</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: normalize(2)}}>
                <View style={styles.cir}>
                  <Image source={Icons.calenders} style={styles.icon2} />
                </View>
                <Text style={styles.txt4}>Aug 27th, 2023</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: normalize(2)}}>
                <View style={styles.cir}>
                  <Image source={Icons.clock} style={styles.icon2} />
                </View>
                <Text style={styles.txt4}>10:00AM - 10:30AM</Text>
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

          <Text style={styles.txt1}>Connected Experts</Text>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}

          <FlatList
            contentContainerStyle={{marginTop: normalize(20)}}
            nestedScrollEnabled
            data={Data}
            renderItem={renderItem}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Connected;

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
    width: '65%',
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
    marginBottom: normalize(15),
    marginTop: normalize(5),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
    backgroundColor: 'white',
    marginHorizontal: normalize(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: normalize(8),
  },
  upTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon1: {
    height: normalize(88),
    width: normalize(88),
    resizeMode: 'cover',
  },
  txt2: {
    fontSize: normalize(13),
    fontFamily: Fonts.Poppins_Medium,
    color: '#000000',
  },
  txt3: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Light,
    color: '#000000',
  },
  icon2: {
    width: normalize(9),
    height: normalize(9),
    resizeMode: 'contain',
    tintColor: '#000000',
    alignSelf: 'center',
  },
  txt4: {
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: 12,
    lineHeight: 18,
    color: '#5C6066',
    left: normalize(5),
  },
  cir: {
    height: normalize(15),
    width: normalize(15),
    borderRadius: normalize(13),
    backgroundColor: '#5C60661A',
    justifyContent: 'center',
    
  },
});
