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
import React, {useEffect, useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import {logoutRequest} from '../../redux/reducer/AuthReducer';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {UserActiveDeactiveaccRequest, userDetailsFetchRequest} from '../../redux/reducer/ProfileReducer';
import Button from '../../components/Button';
import Modal from 'react-native-modal';
import { Colors } from '../../themes/Colors';
let Data = [
  {
    id: 1,
    Icon: Icons.pro1,
    title: 'Update Profile',
  },
  {
    id: 2,
    Icon: Icons.pro2,
    title: 'Connected Experts',
  },
  {
    id: 3,
    Icon: Icons.pro3,
    title: 'Reviews & Ratings',
  },
  {
    id: 4,
    Icon: Icons.pro4,
    title: 'Call History',
  },
  {
    id: 5,
    Icon: Icons.pro5,
    title: 'Change Password',
  },
];

let status = '';
const Profile = () => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const navigation = useNavigation();
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  const [data, setData] = useState([]);
  const [activeacc, setactiveacc] = useState(1);
  const [ModalVisible,setModalVisible]=useState(false)
  console.log('kgygijjyjf', data);

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(userDetailsFetchRequest());
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);

  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      case 'Profile/userDetailsFetchRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/userDetailsFetchSuccess':
        status = ProfileReducer?.status;
        setData(ProfileReducer?.userDetailsFetchResponse?.data);
        break;
      case 'Profile/userDetailsFetchFailure':
        status = ProfileReducer?.status;
        break;

        case 'Profile/UserActiveDeactiveaccRequest':
          status = ProfileReducer?.status;
          break;
        case 'Profile/UserActiveDeactiveaccSuccess':
          status = ProfileReducer?.status;
         dispatch(logoutRequest())
          break;
        case 'Profile/UserActiveDeactiveaccFailure':
          status = ProfileReducer?.status;
          break;
    }
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.mainCon,
          {
            borderBottomWidth: index == 4 ? 0 : normalize(1),
          },
        ]}
        onPress={() =>
          index == 0
            ? navigation.navigate('UpdateProfile')
            : index == 1
            ? navigation.navigate('Connected')
            : index == 2
            ? navigation.navigate('Review')
            : index == 3
            ? navigation.navigate('Call')
            : index == 4
            ? navigation.navigate('ChangePass')
            : null
        }>
        <View style={{flexDirection: 'row',alignItems:'center'}}>
          <Image source={item.Icon} style={styles.icon2} />
          <Text style={styles.txt5}>{item.title}</Text>
        </View>
        <Image source={Icons.left} style={styles.right} />
      </TouchableOpacity>
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

          <Text style={styles.txt1}>Profile</Text>

          <View style={{alignItems: 'center'}}>
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

        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}
          <View style={styles.upTopView}>
            <ImageBackground
              imageStyle={{borderRadius: normalize(40)}}
              source={
                {uri: data?.profile_photo_url}
              }
              style={styles.icon1}>
              {/* <View
              style={{
                alignSelf: 'center',
                bottom: normalize(4),
                height: normalize(24),
                width: normalize(24),
                borderRadius: normalize(12),
                backgroundColor: '#00000080',
                justifyContent: 'center'
              }}>
              <Image source={Icons.camera} style={styles.camera} />
            </View> */}
            </ImageBackground>

            <View style={{width: '55%', left: normalize(15)}}>
              <Text style={styles.txt2}>{data?.full_name}</Text>

              <Text style={styles.txt3}>{data?.email}</Text>
              <TouchableOpacity
                style={styles.joinContain}
                onPress={() => navigation.navigate('UpdateProfile')}>
                <Text style={styles.txt4}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginTop: normalize(35),
              marginHorizontal: normalize(25),
              backgroundColor: 'white',
              padding: normalize(10),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
              borderRadius: normalize(10),
              paddingVertical: 0,
            }}>
            <FlatList nestedScrollEnabled data={Data} renderItem={renderItem} />
          </View>

          <View style={styles.bottomCon}>
            <Text style={styles.txt6}>Deactivate Account</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!ModalVisible)
                // setactiveacc(!activeacc);
              }}>
              <Image
                source={activeacc == 1 ? Icons.onbutton : Icons.offbutton}
                style={styles.switch}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.txt6,
              {marginLeft: normalize(25), marginTop: normalize(10)},
            ]}>
            Contact Us
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#1BACE3',
              justifyContent: 'center',
              height: normalize(46),
              width: 137,
              borderRadius: normalize(50),
              marginTop: normalize(20),
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
            onPress={() =>
              connectionrequest()
                .then(() => {
                  dispatch(logoutRequest());
                })
                .catch(err => {
                  console.log(err);
                  showErrorAlert('Please connect to internet');
                })
            }>
            <Text
              style={{
                fontFamily: Fonts?.Poppins_Medium,
                textAlign: 'center',
                fontSize: 14,
                color: '#FFFFFF',

                lineHeight: 21,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
  //transparent={false}
  isVisible={ModalVisible}
  //coverScreen={true}
  backdropOpacity={0.5}
  // backdropColor={Colors.aquablue}
  onBackdropPress={() => setModalVisible(false)}>
  <View
    style={{
      borderRadius: normalize(10),
      width: '100%',
      right: 0,
      backgroundColor: Colors.white,
      alignSelf: 'center',
      // marginHorizontal: normalize(40),
      height: normalize(150),
      // top:normalize(-50)
    }}>
    <View style={{alignItems: 'center'}}>
      <Text
        style={{
          marginTop: normalize(18),
          color: '#3770E2',
          fontSize: normalize(15),
          fontFamily: Fonts.Poppins_SemiBold,
          textAlign: 'center',
          width: normalize(200),
        }}>
        Are you sure to deactivate your account?
      </Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: normalize(15),
      }}>
      <Button

        alignSelf={'center'}
        marginTop={normalize(20)}
        //   marginBottom={normalize(30)}
        backgroundColor={'#17C147'}
        height={normalize(40)}
        width={'45%'}
        borderRadius={normalize(15)}
        textColor={'white'}
        
        fontSize={normalize(15)}

        title={'Yes'}
        titlesingle={true}
        fontFamily={
          Platform.OS == 'ios'
            ? Fonts.Poppins_Bold
            : Fonts.Poppins_Bold
        }
        onPress={() => {
          connectionrequest()
      .then(() => {
        dispatch(UserActiveDeactiveaccRequest({active:0}));
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
        //   setModalIndex(!ModalIndex);
        }}
      />
      <Button
        alignSelf={'center'}
        marginTop={normalize(20)}
        //   marginBottom={normalize(30)}
        backgroundColor={'#EBEBEB'}
        height={normalize(40)}
        width={'45%'}
        borderRadius={normalize(15)}
        textColor={'#006ADA'}
        fontSize={normalize(13)}
        title={'No'}
        titlesingle={true}
        fontFamily={
          Platform.OS == 'ios'
            ? Fonts.Poppins_Bold
            : Fonts.Poppins_Bold
        }
        onPress={() => {
          setModalVisible(false)
        }}
      />
    </View>
  </View>
</Modal>
      </ImageBackground>
    </View>
  );
};

export default Profile;

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
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_Medium,
    color: '#000000',
    textTransform:'capitalize'
  },
  txt3: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Light,
    color: '#000000',
    marginTop: normalize(5),
  },
  joinContain: {
    height: normalize(25),
    backgroundColor: '#161616',
    borderRadius: normalize(25),
    width: '28%',
    justifyContent: 'center',
    marginTop: normalize(20),
  },
  txt4: {
    fontFamily: Fonts?.Poppins_Regular,
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
  mainCon: {
    paddingVertical: normalize(15),
    flexDirection: 'row',
    marginBottom: normalize(10),
    justifyContent: 'space-between',
    borderBottomWidth: normalize(1),
    borderColor: '#5C60661F',
  },
  icon2: {
    resizeMode: 'contain',
    height: normalize(15),
    width: normalize(15),
  },
  txt5: {
    fontFamily: Fonts?.Poppins_Regular,
    fontSize: normalize(13),
    color: '#000000',
    alignSelf: 'center',
    left: normalize(10),
  },
  right: {
    resizeMode: 'contain',
    height: normalize(11),
    width: normalize(11),
    alignSelf: 'center',
    transform: [{rotate: '180 deg'}],
  },
  bottomCon: {
    marginTop: normalize(20),
    marginHorizontal: normalize(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt6: {
    fontFamily: Fonts?.Poppins_Regular,
    fontSize: normalize(12),
    color: '#000000',
  },
  switch: {
    resizeMode: 'contain',
    height: normalize(22),
    width: normalize(22),
  },
});
