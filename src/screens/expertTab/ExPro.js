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
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';

import Modal from 'react-native-modal';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import Accrodian from '../../components/Accrodian';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../themes/Colors';
import Button from '../../components/Button';
import {logoutRequest} from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {ExpertProfileDetailRequest} from '../../redux/reducer/ProfileReducer';

let Data = [
  {
    id: 1,
    Icon: Icons.yt,
    title: 'Thomas Ellsworth YT',
  },
  {
    id: 2,
    Icon: Icons.fb,
    title: 'Thomas Ellsworth FB',
  },
  {
    id: 3,
    Icon: Icons.insta,
    title: 'Thomas Ellsworth INSTA',
  },
];

let Data1 = [
  {
    id: 1,

    title: 'Aug 27th, 2023',
  },
  {
    id: 2,

    title: 'Aug 27th, 2023',
  },
  {
    id: 3,

    title: 'Aug 27th, 2023',
  },
];

const ExPro = props => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const navigation = useNavigation();

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(ExpertProfileDetailRequest());
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.background,
          width: '100%',
          justifyContent: 'space-between',
          marginTop: normalize(12),
          // padding:normalize(2),
          borderRadius: normalize(12),
          alignItems: 'center',
          height: normalize(50),
          paddingHorizontal: normalize(10),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={item?.Icon} style={styles.icon} />
          <Text style={[styles.titltTxt, {fontSize: normalize(10.5)}]}>
            {item?.title}
          </Text>
        </View>

        <Image source={Icons.cirTick} style={styles.icon} />
        {/* {index == 2 && (
          <View
            style={{
              // height: normalize(30),
              // width: normalize(30),
              backgroundColor: '#33BC7A',
              // alignSelf: 'center',
              borderRadius: normalize(12),
              justifyContent: 'center',
              alignItems: 'center',
              padding: normalize(5),
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontFamily: Fonts.Poppins_Medium,
                fontSize: normalize(11),
              }}>
              Verify
            </Text>
          </View>
        )} */}
      </View>
    );
  };
  const renderItem1 = ({item, index}) => {
    return (
      <View style={[styles.upView, {marginTop: normalize(10)}]}>
        <View>
          <Text
            style={[
              styles.titltTxt,
              {fontFamily: Fonts.Poppins_Light, fontSize: normalize(11)},
            ]}>
            Received From
          </Text>
          <Text
            style={[
              styles.titltTxt,
              {
                fontFamily: Fonts.Poppins_SemiBold,
                fontSize: normalize(13),
                color: 'black',
              },
            ]}>
            Name Title
          </Text>
        </View>

        <View style={{right: normalize(20)}}>
          <Text
            style={[
              styles.titltTxt,
              {
                fontFamily: Fonts.Poppins_SemiBold,
                fontSize: normalize(13),
                color: 'black',
              },
            ]}>
            $150
          </Text>
          <Text
            style={[
              styles.titltTxt,
              {
                fontFamily: Fonts.Poppins_Regular,
                fontSize: normalize(10),
                color: 'rgba(0, 0, 0, 1)',
              },
            ]}>
            {item?.title}
          </Text>
        </View>
      </View>
    );
  };

  const reviewsItem = ({item}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: normalize(15),
            marginHorizontal:
              Platform.OS === 'ios' ? normalize(20) : normalize(10),
            right: normalize(15),
            marginTop: normalize(18),
          }}>
          <Image
            source={{uri: item?.user?.profile_photo_url}}
            style={{
              width: normalize(47),
              height: normalize(47),
              marginRight: normalize(10), // Add margin between hero image and rating
            }}
            resizeMode="contain"
          />
          <View style={{flexDirection: 'column', width: '89%'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: normalize(0),
              }}>
              <Image
                source={Icons.star}
                style={{
                  width: normalize(10),
                  height: normalize(10),
                  marginRight: normalize(4),
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: '#5C6066',
                  fontSize:
                    Platform.OS == 'ios' ? normalize(10) : normalize(10.5),
                }}>
                {item?.star_rating}
              </Text>
            </View>
            <Text
              style={{
                fontSize: normalize(12),
                fontFamily: Fonts?.Poppins_SemiBold,

                lineHeight: 21,
                color: '#000000',
                marginTop: normalize(2),
              }}>
              {item?.title}
            </Text>
            <Text
              style={{
                fontSize: normalize(10),
                fontFamily: Fonts?.Poppins_Regular,
                marginTop: normalize(2),
                lineHeight: 14,
                color: '#5C6066',
              }}>
              {item?.long_description}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: normalize(1),
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        <View style={styles.container_wrapper}>
          <TouchableOpacity
            onPress={() => navigation.goBack('')}
            style={[
              styles.backCont,
              {
                backgroundColor: 'rgba(236, 236, 236, 1)',
                padding: normalize(10),
                borderRadius: normalize(20),
              },
            ]}>
            <Image
              source={Icons.lefts}
              style={{
                height: normalize(15),
                width: normalize(15),
                resizeMode: 'contain',
                alignSelf: 'center',
                // tintColor:'black',
                backgroundColor: 'transparent',
              }}
            />
          </TouchableOpacity>

          <Text style={styles.txt1}>Profile</Text>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate('Notification')}>
              <Image
                source={Icons.Notification}
                style={{width: normalize(24), height: normalize(24)}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '40%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.upTopView}>
            <ImageBackground
              imageStyle={{borderRadius: normalize(40)}}
              source={{
                uri: ProfileReducer?.ExpertProfileDetailRes?.data
                  ?.profile_photo_url,
              }}
              style={styles.icon1}></ImageBackground>

            <View style={{width: '55%', left: normalize(15)}}>
              <Text style={styles.txt2}>
                {ProfileReducer?.ExpertProfileDetailRes?.data?.full_name}
              </Text>

              <Text style={styles.txt3}>
                {' '}
                {ProfileReducer?.ExpertProfileDetailRes?.data?.email}
              </Text>
              <TouchableOpacity
                style={styles.joinContain}
                onPress={() =>
                  navigation.navigate('ProfileUpdate')
                }>
                <Text style={styles.txt4}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.main}>
            <FlatList
              data={Data}
              renderItem={renderItem}
              ListHeaderComponent={() => {
                return <Text style={styles.valText}>Verified Platforms</Text>;
              }}
              // ListFooterComponent={() => {
              //   return (
              //     <TouchableOpacity
              //       style={{
              //         backgroundColor: Colors.background,
              //         width: '100%',
              //         // justifyContent: 'space-between',
              //         marginTop: normalize(12),
              //         // padding:normalize(2),
              //         borderRadius: normalize(12),
              //         // alignItems:'center',
              //         justifyContent: 'center',
              //         height: normalize(50),
              //         paddingHorizontal: normalize(10),
              //       }}>
              //       <Text
              //         style={[
              //           styles.valText,
              //           {
              //             // marginTop: normalize(20),
              //             fontFamily: Fonts.Poppins_Regular,
              //             // textAlign:'center'
              //           },
              //         ]}>
              //         Add Another Account
              //       </Text>
              //     </TouchableOpacity>
              //   );
              // }}
              // contentContainerStyle={{marginTop: normalize(25)}}
            />
          </View>

          <View style={styles.aboutMe}>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Bold,
              }}>
              About Me
            </Text>
            <Text
              style={{
                fontSize:
                  Platform.OS == 'ios' ? normalize(10.5) : normalize(11),
                fontFamily: Fonts?.Poppins_Regular,
                // letterSpacing: 0.9,
                color: '#5C6066',
                marginTop: normalize(8),
                textTransform: 'capitalize',
              }}>
              {ProfileReducer?.ExpertProfileDetailRes?.data?.description}
            </Text>
          </View>
          <View
            style={{
              marginVertical: normalize(15),
              marginHorizontal: normalize(25),
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Bold,
              }}>
              Ratings
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(11),
              }}>
              <View>
                <Text
                  style={{
                    fontSize: normalize(11.5),
                    color: '#5C6066',
                    fontFamily: Fonts.Poppins_Regular,
                    textTransform: 'capitalize',
                  }}>
                  Number of reviews
                </Text>
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: 'black',
                    fontFamily: Fonts.Poppins_SemiBold,
                    marginTop: normalize(5),
                  }}>
                  {
                    ProfileReducer?.ExpertProfileDetailRes?.data
                      ?.number_of_reviews
                  }
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: normalize(11.5),
                    color: '#5C6066',
                    fontFamily: Fonts.Poppins_Regular,
                    textTransform: 'capitalize',
                  }}>
                  Average review
                </Text>
                <View style={{flexDirection: 'row', marginTop: normalize(5)}}>
                  <Image
                    source={Icons.colStar}
                    style={{
                      height: normalize(18),
                      width: normalize(18),
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: normalize(16),
                      color: 'black',
                      fontFamily: Fonts.Poppins_SemiBold,
                    }}>
                    {ProfileReducer?.ExpertProfileDetailRes?.data?.rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: normalize(283),
              // borderRadius:50,
              marginHorizontal: normalize(18),
              backgroundColor: '#FFFFFF',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 3,

              borderRadius: 30,
              marginTop: normalize(10),
              paddingVertical: normalize(20),
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Bold,
                paddingLeft: normalize(20),
                marginTop: normalize(8),
              }}>
              Rates
            </Text>
            <View
              style={{
                marginTop: normalize(15),
                justifyContent: 'flex-start',
                marginHorizontal: normalize(20),
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(14),
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                Video Answers
              </Text>
              <Text
                style={{
                  marginTop: normalize(5),
                  fontSize: normalize(11),
                  // FontFamily: Fonts.Poppins_Regular,
                  fontFamily:Fonts.Poppins_Regular,
                  // letterSpacing: 0.5,
                  lineHeight: 21,
                  color: '#5C6066',
                }}>
                Book a time for us to have a one on one call for the most
                personalized advice.
              </Text>
              <View style={{flexDirection: 'column', marginTop: normalize(10)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: normalize(16),
                  }}>
                  <Image
                    source={Icons.video}
                    style={{
                      width: normalize(20),
                      height: normalize(20),
                      resizeMode: 'contain',
                    }}
                  />
                  <View style={{marginLeft: 12, width: '60%'}}>
                    <Text style={styles.videoText}>Video Answer</Text>
                    <Text style={styles.description}>
                      Get a recorded video response to a text question
                    </Text>
                  </View>
                  <View style={styles.PriceView}>
                    <Text style={styles.PriceText}>
                      {ProfileReducer?.ExpertProfileDetailRes?.data
                        ?.video_answer_charges
                        ? ProfileReducer?.ExpertProfileDetailRes?.data
                            ?.video_answer_charges
                        : `$0`}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: normalize(16),
                  }}>
                  <Image
                    source={Icons.msg}
                    style={{
                      width: normalize(18),
                      height: normalize(18),
                      resizeMode: 'contain',
                    }}
                  />
                  <View style={{marginLeft: 12, width: '60%'}}>
                    <Text style={styles.videoText}>Text Answer</Text>
                    <Text style={styles.description}>
                      Get a text response to a text question
                    </Text>
                  </View>
                  <View style={styles.PriceView}>
                    <Text style={styles.PriceText}>
                      {ProfileReducer?.ExpertProfileDetailRes?.data
                        ?.chat_answer_charges
                        ? ProfileReducer?.ExpertProfileDetailRes?.data
                            ?.chat_answer_charges
                        : `$0`}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: normalize(16),
                  }}>
                  <Image
                    source={Icons.video}
                    style={{
                      width: normalize(18),
                      height: normalize(18),
                      resizeMode: 'contain',
                    }}
                  />
                  <View style={{marginLeft: 12, width: '60%'}}>
                    <Text style={styles.videoText}>Video Call</Text>
                    <Text style={styles.description}>
                      Get a direct video call from expert
                    </Text>
                  </View>
                  <View style={styles.PriceView}>
                    <Text style={styles.PriceText}>
                      {' '}
                      {ProfileReducer?.ExpertProfileDetailRes?.data
                        ?.video_call_charges
                        ? ProfileReducer?.ExpertProfileDetailRes?.data
                            ?.video_call_charges
                        : `$0`}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.aboutMes}>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_Bold,
              }}>
              Reviews{' '}
            </Text>
            <FlatList
              data={ProfileReducer?.ExpertProfileDetailRes?.data?.feedbacks}
              renderItem={reviewsItem}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      width: '60%',
                      backgroundColor: 'white',
                      borderRadius: normalize(15),
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginVertical: normalize(50),
                      padding: normalize(15),
                    }}>
                    <Text
                      style={{
                        color: 'grey',
                        fontSize: normalize(15),
                        textAlign: 'center',
                        fontFamily: Fonts.PoppinsBold,
                      }}>
                      No Review Found
                    </Text>
                  </View>
                );
              }}
            />
          </View>

          <View
            style={{marginHorizontal: normalize(25), marginTop: normalize(15)}}>
            <Text style={styles.payText}>Payment History</Text>
            <FlatList
              data={Data1}
              renderItem={renderItem1}
              // contentContainerStyle={{marginTop: normalize(20)}}
            />
          </View>
          <Button
            width={'90%'}
            backgroundColor={'black'}
            titlesingle={true}
            title={'Logout'}
            borderRadius={normalize(15)}
            textColor={'white'}
            marginTop={normalize(20)}
            alignSelf={'center'}
            onPress={() =>
              connectionrequest()
                .then(() => {
                  dispatch(logoutRequest());
                })
                .catch(err => {
                  console.log(err);
                  showErrorAlert('Please connect to internet');
                })
            }
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ExPro;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  description: {
    fontSize: normalize(10),
    fontFamily: Fonts?.Poppins_Regular,
    fontWeight: '400',
    // lineHeight: 21,
    color: '#5C6066',
  },
  PriceView: {
    width: normalize(66),
    height: normalize(33),
    borderRadius: 50,
    backgroundColor: '#1BACE3',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: normalize(5), // Push the button to the right end
  },
  PriceText: {
    fontSize: normalize(12),
    fontFamily: Fonts?.Poppins_Medium,
    fontWeight: '400',
    lineHeight: 21,
    color: '#FFFFFF',
  },
  videoText: {
    fontSize: normalize(11),
    fontFamily: Fonts?.Poppins_Bold,
    fontWeight: '600',

    color: '#000000',
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
  txt1: {
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_Medium,
    alignSelf: 'center',
    color: '#000000',
  },
  upTopView: {
    flexDirection: 'row',
    marginTop: normalize(20),
    marginHorizontal: normalize(20),
  },
  icon1: {
    height: normalize(85),
    width: normalize(85),
    resizeMode: 'contain',
    borderRadius: normalize(55),
    justifyContent: 'flex-end',
  },
  txt2: {
    fontSize: normalize(16),
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#000000',
    textTransform:'capitalize'
  },
  txt3: {
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_Regular,
    color: '#5C6066',
    marginTop: normalize(5),
  },
  joinContain: {
    height: normalize(25),
    backgroundColor: '#161616',
    borderRadius: normalize(25),
    width: '30%',
    justifyContent: 'center',
    marginTop: normalize(15),
  },
  txt4: {
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: normalize(10),
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  camera: {
    height: normalize(12),
    width: normalize(12),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  main: {
    marginHorizontal: normalize(20),
    padding: normalize(15),
    backgroundColor: 'white',
    marginTop: normalize(15),
    borderRadius: normalize(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  valText: {
    fontSize: normalize(11.5),
    fontFamily: Fonts.Poppins_Medium,
    color: '#5C6066',
  },
  upView: {
    // marginTop: normalize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: normalize(15),
  },
  icon: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
  titltTxt: {
    fontSize: normalize(11.5),
    fontFamily: Fonts.Poppins_Medium,
    left: normalize(10),
    color: '#5C6066',
  },
  aboutMe: {
    marginHorizontal: normalize(25),
    marginTop: normalize(20),
  },
  aboutMes: {
    marginHorizontal: normalize(25),
    marginTop: normalize(35),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(30),
    left: normalize(5),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 162,
    height: 50,
    borderRadius: 50,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  selectedButton: {
    backgroundColor: '#1BACE3',
    borderColor: 'transparent',
  },
  selectedButtonText: {
    color: '#fff',
  },
  cir: {
    height: normalize(15),
    width: normalize(15),
    borderRadius: normalize(13),
    backgroundColor: '#5C60661A',
    justifyContent: 'center',
  },
  ic: {
    width: normalize(9),
    height: normalize(9),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  socialIco: {width: normalize(9), height: normalize(9), resizeMode: 'contain'},
  payText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: normalize(14),
    color: 'black',
  },
});
