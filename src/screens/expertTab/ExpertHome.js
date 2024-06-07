import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';

import Modal from 'react-native-modal';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import Accrodian from '../../components/Accrodian';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import {AllupcommingCallListingRequest} from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import moment from 'moment';
import {Colors} from '../../themes/Colors';

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

const ExpertHome = props => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(AllupcommingCallListingRequest());
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.upView}>
        <View style={styles.upTopView}>
          <Image
            source={{uri: item?.user?.profile_photo_url}}
            style={styles.icon1}
          />

          <View style={{width: '60%', left: normalize(5)}}>
            <Text style={styles.txt2}>{item?.user?.full_name}</Text>
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
                <Image source={Icons.calender3} style={styles.icon2} />

                <Text
                  style={[styles.txt4, {fontFamily: Fonts.Poppins_Regular}]}>
                  {moment(item?.call_date).format('ll')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(3),
                }}>
                <Image
                  source={Icons.Newclock}
                  style={styles.icon2}
                  // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
                />

                <Text
                  style={[styles.txt4, {fontFamily: Fonts.Poppins_Regular}]}>
                  {`${item?.call_slot_from}-${item?.call_slot_to}`}
                </Text>
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

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '20%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container_wrapper}>
            <TouchableOpacity>
              <Image
                source={Icons.setting}
                style={{width: normalize(39), height: normalize(39)}}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={[styles.iconContainer, {right: normalize(10)}]}
                onPress={() => props?.navigation.navigate('Expro')}>
                <Image
                  source={Icons.users}
                  style={{width: normalize(24), height: normalize(24)}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => props?.navigation.navigate('Notification')}>
                <Image
                  source={Icons.Notification}
                  style={{width: normalize(24), height: normalize(24)}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.uptxt}>Upcoming Call</Text>
          <View style={{marginTop: normalize(15)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ProfileReducer?.AllupcommingCallListingRes?.data}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: '20%'}}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      backgroundColor: Colors.background,
                      width: '60%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: normalize(20),
                      marginTop: normalize(50),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: normalize(15),
                        textAlign: 'center',
                        fontFamily: Fonts.Poppins_Medium,
                      }}>
                      No upcoming calls are booked{' '}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ExpertHome;

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
    borderRadius:normalize(6)
  },
  txt2: {
    fontSize: normalize(13),
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#000000',
  },
  txt3: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Light,
    color: '#000000',
    alignSelf: 'center',
  },
  icon2: {
    width: normalize(11),
    height: normalize(11),
    resizeMode: 'contain',
    tintColor: '#000000',
    alignSelf: 'center',
  },
  txt4: {
    fontFamily: Fonts?.Poppins_SemiBold,
    fontSize: normalize(10),
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
    height: normalize(38),
    backgroundColor: '#1BACE3',
    borderRadius: normalize(25),
    width: '45%',
    justifyContent: 'center',
  },
  cir: {
    height: normalize(15),
    width: normalize(15),
    borderRadius: normalize(13),
    backgroundColor: '#5C60661A',
    justifyContent: 'center',
  },
  uptxt: {
    color: 'black',
    fontFamily: Fonts.Poppins_Regular,
    marginLeft: normalize(22),
    marginTop: normalize(20),
  },
});
