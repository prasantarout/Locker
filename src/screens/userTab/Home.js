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
import { fetchAllCatUserRequest, fetchAllExpertRequest, selectedCategoriesRequest } from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../utils/helpers/Loader';

let status = '';
const Home = props => {
  id = props?.route?.params?.id
  console.log('khjbgjkygiyjgu', id);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [catData, setCatData] = useState([]);
  console.log('dsfgbvergverg', catData);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let data = [
    {
      id: 1,
      title: 'Recommended',
    },
    {
      id: 2,
      title: 'Newest Additions',
    },
    {
      id: 3,
      title: 'Consultations',
    },
  ];
  const [experts, setExperts] = useState([]);
  console.log('khbgjkhgbhjgjvhgvj', experts);

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(fetchAllExpertRequest());
        dispatch(fetchAllCatUserRequest());
        dispatch(selectedCategoriesRequest())
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);

  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      case 'Profile/fetchAllExpertRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/fetchAllExpertSuccess':
        status = ProfileReducer?.status;
        setExperts(ProfileReducer?.fetchAllExpertResponse?.data);
        break;
      case 'Profile/fetchAllExpertFailure':
        status = ProfileReducer?.status;
        break;
        ////////////////////////////////////////////////////////////////
        case 'Profile/selectedCategoriesRequest':
          status = ProfileReducer?.status;
          break;
        case 'Profile/selectedCategoriesSuccess':
          status = ProfileReducer?.status;
          break;
        case 'Profile/selectedCategoriesFailure':
          status = ProfileReducer?.status;
          break;

          case 'Profile/fetchAllCatUserRequest':
          status = ProfileReducer?.status;
          break;
        case 'Profile/fetchAllCatUserSuccess':
          status = ProfileReducer?.status;
          setCatData(ProfileReducer?.fetchAllCatUserResponse?.data);
          break;
        case 'Profile/fetchAllCatUserFailure':
          status = ProfileReducer?.status;
          break;

    }
  }
  // let dataItem = [
  //   {
  //     id: 1,
  //     title: 'Thomas Ellsworth',
  //     frame: Icons.frame,
  //     rating: '4.2',
  //     ratingIcon: Icons.star,
  //     icon: Icons.hero1,
  //     group: Icons.group,
  //     gTitle: '250 consultations',
  //   },
  //   {
  //     id: 2,
  //     title: 'Thomas Ellsworth',
  //     frame: Icons.frame,
  //     rating: '4.2',
  //     ratingIcon: Icons.star,
  //     icon: Icons.hero1,
  //     group: Icons.group,
  //     gTitle: '250 ',
  //   },
  //   {
  //     id: 3,
  //     title: 'Thomas Ellsworth',
  //     frame: Icons.frame,
  //     rating: '4.2',
  //     ratingIcon: Icons.star,
  //     icon: Icons.hero1,
  //     group: Icons.group,
  //     gTitle: '250 consultations',
  //   },
  //   {
  //     id: 4,
  //     title: 'Thomas Ellsworth',
  //     frame: Icons.frame,
  //     rating: '4.2',
  //     ratingIcon: Icons.star,
  //     icon: Icons.hero1,
  //     group: Icons.group,
  //     gTitle: '250 consultations',
  //   },
  //   {
  //     id: 5,
  //     title: 'Thomas Ellsworth',
  //     frame: Icons.frame,
  //     rating: '4.2',
  //     ratingIcon: Icons.star,
  //     icon: Icons.hero1,
  //     group: Icons.group,
  //     gTitle: '250 consultations',
  //   },
  //   {
  //     id: 6,
  //     title: 'Thomas Ellsworth',
  //     frame: Icons.frame,
  //     rating: '4.2',
  //     ratingIcon: Icons.star,
  //     icon: Icons.hero1,
  //     group: Icons.group,
  //     gTitle: '250 consultations',
  //   },
  // ];

  // let category = [
  //   {
  //     id: 1,
  //     Icon: Icons.busi,
  //     title: 'Business',
  //   },
  //   {
  //     id: 2,
  //     Icon: Icons.bitcoin,
  //     title: 'Crypto',
  //   },
  //   {
  //     id: 3,
  //     Icon: Icons.usero,
  //     title: 'Celebrity',
  //   },
  //   {
  //     id: 4,
  //     Icon: Icons.teacher,
  //     title: 'Coaching',
  //   },
  //   {
  //     id: 5,
  //     Icon: Icons.messages,
  //     title: 'Counselling',
  //   },
  //   {
  //     id: 6,
  //     Icon: Icons.health,
  //     title: 'Health',
  //   },
  //   {
  //     id: 7,
  //     Icon: Icons.emptyWallet,
  //     title: 'Finance',
  //   },
  //   {
  //     id: 8,
  //     Icon: Icons.marketting,
  //     title: 'Marketing',
  //   },
  //   {
  //     id: 9,
  //     Icon: Icons.cup,
  //     title: 'Social Media',
  //   },
  // ];

  const menu = [
    {
      id: 1,
      title: 'What is Lorem Ipsum?',
      data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      title: 'Where does it come from?',
      data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      title: 'Lorem Ipsum generators on the Internet tend?',
      data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(catData[0]?.id);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
      onPress={()=>{
        props?.navigation?.navigate('ExpertView', {ExpertData : item})
      }}
        style={[
          styles.item,
          {
            marginLeft: index == 0 ? 20 : 0,
          },
        ]}>
        <ImageBackground
          source={{uri: item?.profile_photo_url}}
          // source={item?.profile_image != '' ? {uri: item?.profile_image} : {uri: item?.profile_photo_url}}
          style={[styles.icon]}
          imageStyle={{
            borderColor: '#F2F4F4', // Add your desired border color here
            borderWidth: normalize(4),
            borderRadius: normalize(8),
            // borderRadius: 10,
            resizeMode: 'cover',
          }}>
          <View style={styles.ratingContainer}>
            <Image
              source={Icons.star}
              style={[styles.ratingIcon, {marginRight: 5, bottom: 2}]}
            />
            <Text style={styles.ratingText}>{item?.rating}</Text>
          </View>
        </ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: normalize(4),
          }}>
          <Text style={styles.title}>{item?.full_name}</Text>
          <Image style={[styles.group]} source={Icons.frame} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: normalize(9),
          }}>
          <Image style={styles.groups} source={Icons.group} />
          <Text style={styles.gTitle}>250 Consultations</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemData = ({item, index}) => {
    return (
      <View
        style={{
          margin: normalize(8),
          flex: 1,
          left: normalize(15),
        }}>
        <TouchableOpacity
          style={[
            {
              height: normalize(50),
              width: normalize(50),
              borderRadius: 24,
              backgroundColor: '#FFFFFF',
              shadowColor: '#171717',
              backgroundColor: index[0] ? 'black' : 'white',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 20,
              justifyContent: 'center',
              alignItems: 'center',
            },
            selectedCategory === item?.id && styles?.activeCategory,
            // isSelected ? styles.selectedItem : null,
          ]}
          onPress={() => setSelectedCategory(item?.id)}>
          <Image
             source={{uri: item?.thumbnail}}
            style={[
              styles.categoryIcon,
              {
                tintColor:  'black' ,
              },
              selectedCategory === item?.id && {tintColor: 'white'},
            ]}
          />
        </TouchableOpacity>
        <Text style={[styles.categoryTitle, {
                fontWeight:  'normal' ,
              },
              selectedCategory === item?.id && {fontWeight: '500'},]}>{item?.title}</Text>
      </View>
    );
  };

  const renderAccrodian = () => {
    return (
      <View>
        {menu.map((item, index) => (
          <Accrodian key={index} title={item.title} data={item.data} />
        ))}
      </View>
    );
  };

  return (
    <View style={{flex: 1,}}>
        <Loader
          visible={
            ProfileReducer.status == 'Profile/fetchAllExpertRequest'
          }
        />
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container_wrapper}>
            <TouchableOpacity>
              <Image source={Icons.setting} style={{width: 39, height: 39}} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={[styles.iconContainer, {right: normalize(10)}]}
                onPress={() => props?.navigation.navigate('Profile')}>
                <Image source={Icons.users} style={{width: 24, height: 24}} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => props?.navigation.navigate('Notification')}>
                <Image
                  source={Icons.Notification}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.second_container}>
            <Text
              style={{
                fontSize: 20,
                color: 'rgba(0, 0, 0, 1)',
                fontWeight: Platform.OS == 'ios' ? '600' : '700',
                lineHeight: 24,
                fontFamily: 'Poppins-Medium',
              }}>
              Featured Experts
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', right: 5}}
              onPress={toggleModal}>
              <Text
                style={{
                  color: 'rgba(92, 96, 102, 1)',
                  fontSize: 15,
                  fontWeight: '400',
                  lineHeight: 15,
                  paddingRight: normalize(5),
                }}>
                Recommended
              </Text>
              <Image
                source={Icons.down}
                style={{width: 10, height: 10, top: normalize(1.5)}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={experts?.slice(0, 10)}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingRight: '10%'}}
            />
          </View>
          <View style={{top: 5}}>
            <FlatList
              data={catData}
              renderItem={renderItemData}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: '10%',
              }}
            />
          </View>
          <View style={{marginHorizontal: normalize(20), top: normalize(20)}}>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 24,
                fontFamily: Fonts.Poppins_Medium,
                fontWeight: Platform.OS == 'ios' ? '600' : '700',
                color: '#000000',
              }}>
              Upcoming Appointment
            </Text>
            <View
              style={{
                height: 230,
                borderRadius: 10,
                backgroundColor: '#1BACE3',
                top: normalize(20),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingTop: normalize(10),
                }}>
                <Image
                  source={Icons.hero}
                  style={{width: 110, height: 109, borderRadius: 5}}
                />
                <View style={{top: normalize(18)}}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 18,
                      lineHeight: 27,
                      fontFamily: Fonts?.Poppins_Medium,
                      color: '#FFFFFF',
                      bottom: normalize(25),
                    }}>
                    Thomas Ellsworth
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bottom: normalize(20),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontWeight: '400',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#FFFFFF',
                      }}>
                      Business
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#FFFFFF',
                        width: Platform.OS === 'android' ? 85 : 95,
                        left: normalize(5),
                        opacity: 0.3,
                      }}
                    />
                  </View>
                  <View style={{bottom: normalize(15), left: normalize(3)}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={Icons.messaging}
                        style={{width: 14.25, height: 12}}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts?.Poppins_Medium,
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#FFFFFF',
                          left: normalize(5),
                        }}>
                        250 Consultations
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={Icons.calenders}
                        style={{width: 14.25, height: 13}}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts?.Poppins_Medium,
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#FFFFFF',
                          left: normalize(5),
                        }}>
                        Aug 27th, 2023
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={Icons.clock}
                        style={{width: 14.25, height: 13}}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts?.Poppins_Medium,
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#FFFFFF',
                          left: normalize(5),
                        }}>
                        10:00AM - 10:30AM
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#FFFFFF',
                  width: Platform.OS === 'android' ? 294 : 294,
                  marginHorizontal: normalize(20),
                  opacity: 0.2,
                  top: normalize(20),
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: normalize(30),
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 21,
                      color: '#FFFFFF',
                      fontFamily: Fonts?.Poppins_Medium,
                    }}>
                    Booking Status
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={Icons.right}
                      style={{width: 12, height: 12}}
                    />
                    <Text
                      style={{
                        fontWeight: '400',
                        lineHeight: 14.25,
                        fontSize: 12,
                        fontFamily: Fonts?.Poppins_Medium,
                        color: '#FFFFFF',
                        marginHorizontal: normalize(5),
                        top: 1,
                      }}>
                      Confirm
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    width: 136,
                    height: 46,
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: '#FFFFFF',
                    marginHorizontal: 20,
                    left: normalize(18),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.Poppins_Medium,
                      color:'black',
                      fontSize: normalize(11),
                      
                      textAlign: 'center',
                    }}>
                    Join Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginHorizontal: 1, paddingTop: normalize(40)}}>
              <Text
                style={{
                  fontFamily: Fonts?.Poppins_Medium,
                  fontSize: 20,
                  lineHeight: 26,
                  fontWeight: Platform.OS == 'ios' ? '600' : '700',
                  color: '#000000',
                }}>
                Recent Questions
              </Text>
              <View style={{paddingTop: normalize(8)}}>
                {renderAccrodian()}
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      <View>
        <Modal
          isVisible={isModalVisible}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          swipeDirection="left"
          onBackButtonPress={() => {
            setModalVisible(false);
          }}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          backdropColor="white"
          backdropOpacity={0.0}>
          <View style={styles.modalContainer}>
            {/* <View style={{flexDirection: 'column', padding:normalize(10)}}> */}
              {/* <View> */}
                {data?.map((item, index) => (
                  <TouchableOpacity 
                  style={{marginTop:normalize(3)}}
                  key={index}>
                    <Text
                      style={{
                        color: 'rgba(92, 96, 102, 1)',
                        fontSize: normalize(11.5),
                        lineHeight: 28,
                        fontWeight: '400',
                        fontFamily: Fonts.Poppins_Light,
                      }}>
                      {item?.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              {/* </View> */}
            {/* </View> */}
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Home;

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
  second_container: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: normalize(20),
    paddingTop: normalize(25),
  },
  modalContainer: {
    paddingHorizontal:normalize(10),
    paddingVertical:normalize(10),
    // justifyContent:'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    // backgroundColor:'red',
    height: normalize(102),
    width: normalize(134),
    borderRadius: normalize(5),
    bottom: Platform.OS === 'ios' ? normalize(140) : normalize(165),
    left: normalize(150),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    // justifyContent:'space-evenly',
  },
  item: {
    // top: normalize(15),
    width: 160,
    height: 234, // Adjust the height to accommodate the additional text

    justifyContent: 'center',
  },
  icon: {
    width: 154,
    height: 144,
    marginBottom: 10,
    // borderWidth: normalize(5),
    borderColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    justifyContent: 'flex-end',
    // elevation: 3,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal:normalize(7),
    marginBottom: normalize(5),
    width: normalize(40),
    paddingVertical:normalize(1),
    // height: normalize(22),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 50,
    alignSelf: 'flex-end',
    bottom: normalize(3),
    right: normalize(6),
  },
  ratingIcon: {
    width: normalize(10), // Adjust the width as needed
    height: normalize(10), // Adjust the height as needed
    resizeMode: 'contain',

    // Adjust the margin as needed
  },
  ratingText: {
    fontSize: normalize(10.5),
    color: 'gray',
    fontFamily:Fonts.Poppins_Regular,
    marginLeft:normalize(2)
  },
  title: {
    fontSize: Platform.OS == 'ios' ? normalize(10.5) : normalize(11.5),
    
    fontWeight: Platform.OS == 'ios' ? '600' : '700',
    lineHeight: 21,
    fontFamily: Fonts?.Poppins_Medium,
    color: 'rgba(0, 0, 0, 1)',
    // right: Platform.OS === 'ios' ? -5 : 5,
  },
  group: {
    // color: 'rgba(92, 96, 102, 1)',
    width: normalize(13),
    height: normalize(13),
    left: Platform.OS === 'ios' ? normalize(8) : normalize(2),
  },
  groups: {
    width: 14.25,
    height: 12,
    right: Platform.OS === 'ios' ? 5 : 8,
  },
  gTitle: {
    fontSize: normalize(8.6),
    color: 'rgba(92, 96, 102, 1)',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeCategory: {
    backgroundColor: 'yourActiveColor', // Add your active category background color here
    borderRadius: 8,
  },
  categoryIcon: {
    width: 24,
    height: 24,
  },
  categoryTitle: {
    marginTop: 5,
    fontSize: normalize(11),
    textAlign: 'center',
  },
  activeCategory: {
    backgroundColor: 'black', // Background color for the active item
  },
});
