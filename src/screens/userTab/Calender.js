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

let upData = [
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

let pastData = [
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
];

const Calender = () => {
  const [call, setCall] = useState(1);

  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.upView}>
        <View style={styles.upTopView}>
          <Image source={item?.Icon} style={styles.icon1} />

          <View style={{width: '60%', left: normalize(5)}}>
            <Text style={styles.txt2}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.txt3}>Business</Text>
              <View
                style={{
                  borderTopWidth: normalize(0.9),
                  borderColor: '#5C60664D',
                  width: '60%',
                  alignSelf: 'center',
                  left: normalize(5),
                }}
              />
            </View>

            <View
              style={{
                marginTop: normalize(5),
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.cir}>
                  <Image
                    source={Icons.calenders}
                    style={styles.icon2}
                    // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
                  />
                </View>
                <Text style={styles.txt4}>Aug 27th, 2023</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.cir}>
                  <Image
                    source={Icons.clock}
                    style={styles.icon2}
                    // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
                  />
                </View>
                <Text style={styles.txt4}>10:00AM - 10:30AM</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            borderTopWidth: normalize(0.9),
            borderColor: '#5C60664D',
            height: 1,
            width: '100%',
            marginTop: normalize(15),
          }}
        />

        <View style={styles.upBottom}>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.txt5}>Booking Status</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Icons.right} style={styles.icon2} />
              <Text style={[styles.txt4, {color: '#000000'}]}>Confirm</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.joinContain}>
            <Text
              style={[styles.txt5, {color: '#FFFFFF', alignSelf: 'center'}]}>
              Join Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem1 = ({item, index}) => {
    return (
      <View style={[styles.upView, {paddingBottom: normalize(12)}]}>
        <View style={styles.upTopView}>
          <Image source={item?.Icon} style={styles.icon1} />

          <View style={{width: '55%'}}>
            <Text style={styles.txt2}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.txt3}>Business</Text>
              <View
                style={{
                  borderTopWidth: normalize(0.9),
                  borderColor: '#5C60664D',
                  height: 1,
                  width: '60%',
                  alignSelf: 'center',
                  left: normalize(5),
                }}
              />
            </View>

            <View
              style={{
                marginTop: normalize(5),
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.cir}>
                  <Image source={Icons.calenders} style={styles.icon2} />
                </View>
                <Text style={styles.txt4}>Aug 27th, 2023</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          <TouchableOpacity>
            <Image source={Icons.setting} style={{width: 39, height: 39}} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.iconContainer, {right: normalize(10)}]}
              onPress={() => navigation.navigate('Profile')}>
              <Image source={Icons.users} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate('Notification')}>
              <Image
                source={Icons.Notification}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* main body */}
        <View style={styles.callContain}>
          <TouchableOpacity
            onPress={() => setCall(1)}
            style={[
              styles.card,
              {backgroundColor: call == 1 ? '#161616' : '#EEEEEE'},
            ]}>
            <Text
              style={[styles.txt1, {color: call == 1 ? '#FFFFFF' : 'rgba(0, 0, 0, 1)'}]}>
              Upcoming Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCall(2)}
            style={[
              styles.card,
              {backgroundColor: call == 2 ? '#161616' : '#EEEEEE'},
            ]}>
            <Text
              style={[styles.txt1, {color: call == 2 ? '#FFFFFF' : '#000000'}]}>
              Past Calls
            </Text>
          </TouchableOpacity>
        </View>

        {/* data */}
        <View style={{marginTop: normalize(25)}}>
          {call == 1 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={upData}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: '80%'}}
            />
          ) : call == 2 ? (
            <FlatList
              nestedScrollEnabled
              data={pastData}
              renderItem={renderItem1}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: '80%'}}
            />
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Calender;

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
  callContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(35),
    marginTop: normalize(32),
  },
  card: {
    height: normalize(28),
    width: '45%',
    borderRadius: normalize(5),
    justifyContent: 'center',
  },
  txt1: {
    fontSize: normalize(11.5),
    fontFamily: Fonts.Poppins_Regular,
    alignSelf: 'center',
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
    height: normalize(85),
    width: normalize(85),
    resizeMode: 'contain',
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
    alignSelf: 'center',
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
  upBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(10),
  },
  txt5: {
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: normalize(11),
    lineHeight: 18,
    color: '#5C6066',
  },
  joinContain: {
    // height: normalize(38),
    backgroundColor: '#1BACE3',
    borderRadius: normalize(25),
    width: '41%',
    justifyContent: 'center',
    paddingVertical:normalize(9)
  },
  cir: {
    height: normalize(15),
    width: normalize(15),
    borderRadius: normalize(13),
    backgroundColor: '#5C60661A',
    justifyContent: 'center',
  },
});
