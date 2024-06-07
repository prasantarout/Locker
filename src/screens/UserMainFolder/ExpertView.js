import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {useNavigation} from '@react-navigation/native';
import {fetchExpertDetailsRequest} from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';

let status = '';
const ExpertView = ({route, props}) => {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  let {ExpertData} = route?.params;
  const [data, setData] = useState([]);
  console.log('jygjuygfjuyv', data);
  const [expertData, setExpertData] = React.useState([]);
  console.log('expertData', expertData);
  const [selected, setSelected] = useState('askQuestion'); // Initially select 'askQuestion'
  // 'none', 'askQuestion', or 'scheduleCall'
  const navigation = useNavigation();
  useEffect(() => {
    let tempArr = [];
    tempArr.push(ExpertData);
    console.log(tempArr, 'dasdkasdk');
    setExpertData(tempArr);
  }, [ExpertData]);
  console.log(ExpertData, 'dasdkasdk');

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(fetchExpertDetailsRequest(ExpertData?.id));
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);

  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      case 'Profile/fetchExpertDetailsRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/fetchExpertDetailsSuccess':
        status = ProfileReducer?.status;
        setData(ProfileReducer?.fetchExpertDetailsResponse?.data);
        break;
      case 'Profile/fetchExpertDetailsFailure':
        status = ProfileReducer?.status;
        break;
    }
  }

  // let dataItem = [
  //   {
  //     id: 1,
  //     title: 'Video Answer',
  //     desc: 'Get a recorded video response to a text question',
  //     price: '$150',
  //     icon: Icons.video,
  //   },
  //   {
  //     id: 2,
  //     title: 'Text Answer',
  //     desc: 'Get a text response to a text question',
  //     price: '$150',
  //     icon: Icons.msg,
  //   },
  //   {
  //     id: 3,
  //     title: 'Video Call',
  //     desc: 'Get a direct video call from expert',
  //     price: '$150',
  //     icon: Icons.video,
  //   },
  // ];

  let ChatItem = [
    {
      id: 1,
      title: 'Name Here',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      rating: '4.9',
      ratingIcon: Icons.star,
      heroImg: Icons.chatHero,
    },
    {
      id: 1,
      title: 'Name Here',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      rating: '4.9',
      ratingIcon: Icons.star,
      heroImg: Icons.chatHero1,
    },
    {
      id: 1,
      title: 'Name Here',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      rating: '4.9',
      ratingIcon: Icons.star,
      heroImg: Icons.chatHero2,
    },
  ];
  const renderItem = ({item, index}) => {
    // const isSelected = selectedItems.includes(item.id);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: normalize(15),
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#EEEEEE',
            paddingHorizontal: normalize(10),
            height: normalize(30),
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}>
          <Image
            source={{uri: item?.thumbnail}}
            style={{
              width: normalize(12),
              height: normalize(12),
              marginRight: 8,
              tintColor: '#000000',
            }}
          />
          <Text
            style={{
              fontFamily: Fonts?.Poppins_Medium,
              fontSize: normalize(11),
              textTransform: 'capitalize',
              color: '#000000',
              textAlign: 'center',
            }}>
            {item?.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Loader
        visible={ProfileReducer.status == 'Profile/fetchExpertDetailsRequest'}
      />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container_wrapper}>
            <TouchableOpacity
              style={{
                width: normalize(40),
                height: normalize(40),
                borderRadius: 50,
                backgroundColor: '#ECECEC',
                elevation: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Image
                source={Icons.lefts}
                style={{
                  width: normalize(12),
                  height: normalize(12),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: normalize(70),
                fontFamily: Fonts?.Poppins_Medium,
                fontSize: normalize(15),
                color: '#000000',
              }}>
              Expert View
            </Text>
          </View>

          <View
            style={{
              borderRadius: 10,
              // backgroundColor: '#1BACE3',
              marginTop: normalize(25),
              marginHorizontal: normalize(15),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Image
                source={{uri: ExpertData?.profile_photo_url}}
                style={{
                  width: '45%',
                  height: normalize(132),
                  borderRadius: 5,
                }}
              />
              <View style={{}}>
                <Text
                  style={{
                    fontSize: normalize(12.5),
                    textTransform: 'capitalize',
                    fontFamily: Fonts?.Poppins_Medium,
                    color: '#000000',
                  }}>
                  {data?.full_name}
                </Text>
                <View
                  style={{
                    marginTop:
                      Platform.OS == 'android' ? normalize(4) : normalize(5),
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.cir}>
                      <Image source={Icons.msgbox} style={styles.ic} />
                    </View>
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontSize: normalize(9),
                        lineHeight: 18,
                        color: '#5C6066',
                        left: normalize(5),
                      }}>
                      250 Consultations
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: normalize(4),
                    }}>
                    <View style={styles.cir}>
                      <Image source={Icons.star} style={styles.ic} />
                    </View>
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontSize: normalize(9),
                        lineHeight: 18,
                        color: '#5C6066',
                        left: normalize(5),
                      }}>
                      {data?.rating}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: normalize(4),
                    }}>
                    <View style={styles.cir}>
                      <Image source={Icons.price} style={styles.ic} />
                    </View>
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontSize: normalize(9),
                        lineHeight: 18,
                        color: '#5C6066',
                        left: normalize(5),
                      }}>
                      {data?.video_call_charges ? data?.video_call_charges : 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: normalize(4),
                    }}>
                    <View style={styles.cir}>
                      <Image source={Icons.web} style={styles.ic} />
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontSize: normalize(9),
                        lineHeight: 18,
                        color: '#5C6066',
                        left: normalize(5),
                        width: normalize(90),
                      }}>
                      {data?.email}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginTop: normalize(5),
                      right: normalize(5),
                    }}>
                    <TouchableOpacity style={styles.SocialIcon}>
                      <Image
                        source={Icons.instagram}
                        style={styles.socialIco}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SocialIcon}>
                      <Image source={Icons.twitter} style={styles.socialIco} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SocialIcon}>
                      <Image source={Icons.linkedin} style={styles.socialIco} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.expertiseCard}>
            <Text style={styles.expertise}>Expertise</Text>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: normalize(15),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#EEEEEE',
                  paddingHorizontal: normalize(10),
                  height: normalize(30),
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}>
                <Image
                  source={Icons.business}
                  style={{
                    width: normalize(12),
                    height: normalize(12),
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontFamily: Fonts?.Poppins_Medium,
                    fontSize: normalize(11),

                    color: '#000000',
                    textAlign: 'center',
                  }}>
                  Business
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#EEEEEE',
                  paddingHorizontal: normalize(10),
                  height: normalize(30),
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={Icons.cryptos}
                  style={{
                    width: normalize(12),
                    height: normalize(12),
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontFamily: Fonts?.Poppins_Medium,
                    fontSize: normalize(11),

                    color: '#000000',
                    textAlign: 'center',
                  }}>
                  Crypto Currency
                </Text>
              </View>
            </View> */}
            <FlatList
              data={data?.categories}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              numColumns={3}
              contentContainerStyle={styles.flatlistContentContainer}
              columnWrapperStyle={styles.columnWrapper}
              //   horizontal
              ListEmptyComponent={() => {
                return (
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: normalize(12),
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      fontFamily: Fonts.Poppins_Regular,
                      alignSelf: 'center',
                      paddingVertical: normalize(20),
                    }}>
                    No Experties Found!
                  </Text>
                );
              }}
            />
          </View>

          <View style={styles.aboutMe}>
            <Text
              style={{
                fontSize: normalize(14),
                FontFamily: Fonts?.Poppins_Medium,
                fontWeight: '600',

                color: '#000000',
              }}>
              About Me
            </Text>
            {data?.description == null ? (
              <Text
                style={{
                  fontSize: normalize(12),
                  fontFamily: Fonts?.Poppins_Regular,
                  letterSpacing: 0.9,
                  color: '#5C6066',
                  marginTop: normalize(8),
                  textTransform: 'capitalize',
                }}>
                No description found!
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: normalize(10),
                  fontFamily: Fonts?.Poppins_Regular,
                  letterSpacing: 0.9,
                  color: '#5C6066',
                  marginTop: normalize(8),
                  textTransform: 'capitalize',
                }}>
                {data?.description}
              </Text>
            )}
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
                fontSize: normalize(13),
                FontFamily: Fonts?.Poppins_Medium,
                fontWeight: '600',
                lineHeight: 21,
                color: '#000000',
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
                  fontSize: normalize(12),
                  FontFamily: Fonts?.Poppins_Medium,
                  fontWeight: '600',

                  color: '#000000',
                }}>
                Video Answers
              </Text>
              <Text
                style={{
                  marginTop: normalize(5),
                  fontSize: normalize(12),
                  FontFamily: Fonts?.Poppins_Medium,
                  letterSpacing: 0.5,
                  lineHeight: 21,
                  color: '#5C6066',
                }}>
                Book a time for us to have a one on one call for the most
                personalized advice.
              </Text>
              <View style={{flexDirection: 'column', marginTop: normalize(10)}}>
                {/* {dataItem?.map((item, index) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}>
                    <Image
                      source={item.icon}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{marginLeft: 12, width: '65%'}}>
                      <Text
                        style={{
                          fontSize: normalize(11),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '600',

                          color: '#000000',
                        }}>
                        {item?.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#5C6066',
                        }}>
                        {item?.desc}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: normalize(66),
                        height: normalize(33),
                        borderRadius: 50,
                        backgroundColor: '#1BACE3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: normalize(5), // Push the button to the right end
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(12),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#FFFFFF',
                        }}>
                        {item?.price}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))} */}
                {data?.video_answer_charges == null ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}>
                    <Image
                      source={Icons.video}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{marginLeft: 12, width: '65%'}}>
                      <Text
                        style={{
                          fontSize: normalize(11),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '600',

                          color: '#000000',
                        }}>
                        Video Answers
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#5C6066',
                        }}>
                        No video answers set yet!
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}>
                    <Image
                      source={Icons.video}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{marginLeft: 12, width: '65%'}}>
                      <Text
                        style={{
                          fontSize: normalize(11),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '600',

                          color: '#000000',
                        }}>
                        Video Answers
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#5C6066',
                        }}>
                        Get a recorded video response to a text question
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: normalize(66),
                        height: normalize(33),
                        borderRadius: 50,
                        backgroundColor: '#1BACE3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: normalize(5), // Push the button to the right end
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(12),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#FFFFFF',
                        }}>
                        $ {data?.video_answer_charges}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {data?.chat_answer_charges == null ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}>
                    <Image
                      source={Icons.video}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{marginLeft: 12, width: '65%'}}>
                      <Text
                        style={{
                          fontSize: normalize(11),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '600',

                          color: '#000000',
                        }}>
                        Text Answers
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#5C6066',
                        }}>
                        No text answers set yet!
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}>
                    <Image
                      source={Icons.video}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{marginLeft: 12, width: '65%'}}>
                      <Text
                        style={{
                          fontSize: normalize(11),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '600',

                          color: '#000000',
                        }}>
                        Text Answer
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#5C6066',
                        }}>
                        Get a text response to a text question
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: normalize(66),
                        height: normalize(33),
                        borderRadius: 50,
                        backgroundColor: '#1BACE3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: normalize(5), // Push the button to the right end
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(12),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#FFFFFF',
                        }}>
                        $ {data?.chat_answer_charges}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {data?.video_call_charges == null ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}>
                    <Image
                      source={Icons.video}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{marginLeft: 12, width: '65%'}}>
                      <Text
                        style={{
                          fontSize: normalize(11),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '600',

                          color: '#000000',
                        }}>
                        Video Call
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#5C6066',
                        }}>
                        No video call set yet!
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}>
                    <Image
                      source={Icons.video}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{marginLeft: 12, width: '65%'}}>
                      <Text
                        style={{
                          fontSize: normalize(11),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '600',

                          color: '#000000',
                        }}>
                        Video Call
                      </Text>
                      <Text
                        style={{
                          fontSize: normalize(10),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#5C6066',
                        }}>
                        Get a direct video call from expert
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: normalize(66),
                        height: normalize(33),
                        borderRadius: 50,
                        backgroundColor: '#1BACE3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: normalize(5), // Push the button to the right end
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(12),
                          fontFamily: Fonts?.Poppins_Medium,
                          fontWeight: '400',
                          lineHeight: 21,
                          color: '#FFFFFF',
                        }}>
                        $ {data?.video_call_charges}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.aboutMes}>
            <Text
              style={{
                fontSize: normalize(14),
                FontFamily: Fonts?.Poppins_Medium,
                fontWeight: '600',
                lineHeight: 21,
                color: '#000000',
              }}>
              Reviews{' '}
            </Text>
            {ChatItem?.map((item, index) => (
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
                  source={item?.heroImg}
                  style={{
                    width: normalize(47),
                    height: normalize(47),
                    marginRight: normalize(10), // Add margin between hero image and rating
                  }}
                />
                <View style={{flexDirection: 'column', width: '89%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: normalize(0),
                    }}>
                    <Image
                      source={item?.ratingIcon}
                      style={{
                        width: normalize(8.41),
                        height: normalize(8),
                        marginRight: normalize(4),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={{color: 'black', fontSize: normalize(9)}}>
                      {item?.rating}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: normalize(12),
                      fontFamily: Fonts?.Poppins_Medium,

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
                    {item?.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={
                  // styles.button,
                  // selected === 'askQuestion' &&
                  //  styles.selectedButton,
                  styles.blueBtn
                }
                onPress={() => {
                  setSelected('askQuestion'),
                    navigation.navigate('AskAQuestion');
                }}>
                <Text
                  style={
                    // selected === 'askQuestion' &&
                    [
                      styles.selectedButtonText,
                      {
                        color: 'white',
                        fontFamily: Fonts.Poppins_Regular,
                        fontSize: normalize(11),
                      },
                    ]
                  }>
                  Ask a question
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  // selected === 'scheduleCall' &&
                  // styles.selectedButton,
                ]}
                onPress={() => {
                  setSelected('scheduleCall'),
                    navigation.navigate('ScheduleACall', {
                      id: data?.id,
                      ExpertData: ExpertData,
                    });
                }}>
                <Text
                  style={[
                    // selected === 'scheduleCall' &&
                    styles.selectedButtonText,
                    {color: 'black'},
                  ]}>
                  Schedule a call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ExpertView;

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
    // justifyContent: 'space-between',
    // paddingHorizontal: normalize(20),
    marginHorizontal: normalize(20),
    paddingTop: Platform?.OS === 'ios' ? normalize(25) : normalize(45),
  },
  SocialIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: normalize(28),
    height: normalize(28),
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    justifyContent: 'center',
  },
  expertiseCard: {
    width: '85%',
    borderRadius: normalize(10),
    marginHorizontal: normalize(22),
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    alignItems: 'center',
    paddingBottom: normalize(15),
    marginTop: normalize(35),
  },
  expertise: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: Fonts?.Poppins_Medium,
    lineHeight: 21,
    textAlign: 'center',
    color: '#000000',
    paddingTop: normalize(10),
    fontWeight: Platform.OS == 'ios' ? null : '700',
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
  blueBtn: {
    width: 162,
    height: 50,
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: '#1BACE3',
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
