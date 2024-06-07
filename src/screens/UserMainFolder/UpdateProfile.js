import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import {
  UserProfileUpdateRequest,
  userDetailsFetchRequest,
} from '../../redux/reducer/ProfileReducer';
import TextIn from '../../components/TextIn';
import {Colors} from '../../themes/Colors';
import ImageCropPicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
let status = '';

const UpdateProfile = (props) => {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [fullname, setfullname] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [profileimage, setprofileimage] = useState('');
  const [selectedprofilePhoto, setselectedprofilePhoto] = useState();
  const [btnmodalVisible, setBtnModalVisible] = useState(false);
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
  const navigation = useNavigation();

  const profilePhoto = () => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: false,
      sortOrder: 'none',
      compressImageQuality: Platform.OS === 'android' ? 1 : 0.8,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      multiple: false,
    })
      .then(image => {
        let arr = image.path.split('/');
        let getOriginalname = arr[arr.length - 1];
        let imageObj = {
          name: getOriginalname,
          type: image.mime,
          uri:
            Platform.OS === 'android'
              ? image.path
              : image.path.replace('file://', ''),
        };

        setselectedprofilePhoto(imageObj);
        setprofileimage(imageObj.uri);
        if (imageObj) {
          setBtnModalVisible(!btnmodalVisible);
        }
      })
      .catch(err => {
        const _err = new String(err).toString().includes('permission');
        if (_err) {
          Platform.OS == 'ios'
            ? Alert.alert('Permission Denied', 'Please Give Access', [
                {
                  text: 'cancel',
                },
                {
                  text: 'settings',
                  onPress: () => {
                    Linking.openSettings()
                      .then(() => {})
                      .catch(ex => {});
                  },
                },
              ])
            : console.log(err);
        }
        // setModalImagePicker(false);
      });
  };
  function cameraUpload() {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
      },
    })
      .then(image => {
        let arr = image.path.split('/');
        let getOriginalname = arr[arr.length - 1];
        let imageObj = {
          name: getOriginalname,
          type: image.mime,
          uri:
            Platform.OS === 'android'
              ? image.path
              : image.path.replace('file://', ''),
        };

        setselectedprofilePhoto(imageObj);
        setprofileimage(imageObj.uri);
        if (imageObj) {
          setBtnModalVisible(!btnmodalVisible);
        }
      })
      .catch(err => {
        if (err?.code == 'E_NO_CAMERA_PERMISSION') {
          Alert.alert('Camera Permission Denied', 'Go To Setting', [
            {
              text: 'cancel',
            },
            {
              text: 'ok',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]);
        } else {
          console.log('errr', JSON.stringify(err));
        }

        console.log('errr', JSON.stringify(err));
      });
  }

  const fullName = fullname;
  const firstName1 = fullName.split(' ').slice(0, 1).join(' ');
  const lastName = fullName
    .split(' ')
    .slice(1, fullName?.length - 1)
    .join(' ');

  const updateProfile = () => {
    let formData = new FormData();
    if (phone == '') {
      showErrorAlert('Phone number should not be blank');
    } else if (fullname == '') {
      showErrorAlert('Name should not be blank');
    } else {
      formData.append('first_name', firstName1);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', phone);

      if (selectedprofilePhoto != undefined || selectedprofilePhoto != null) {
        formData.append('profile_photo_path', selectedprofilePhoto);
      }

      connectionrequest()
        .then(() => {
          dispatch(UserProfileUpdateRequest(formData));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    }
  };

  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      case 'Profile/userDetailsFetchRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/userDetailsFetchSuccess':
        status = ProfileReducer?.status;
        setfullname(ProfileReducer?.userDetailsFetchResponse?.data?.full_name);
        setemail(ProfileReducer?.userDetailsFetchResponse?.data?.email);
        setphone(ProfileReducer?.userDetailsFetchResponse?.data?.phone);
        setprofileimage(
          ProfileReducer?.userDetailsFetchResponse?.data?.profile_photo_url ??
            '',
        );
        break;
      case 'Profile/userDetailsFetchFailure':
        status = ProfileReducer?.status;
        break;
        case 'Profile/UserProfileUpdateRequest':
          status = ProfileReducer.status;
  
          break;
  
        case 'Profile/UserProfileUpdateSuccess':
          status = ProfileReducer.status;
          dispatch(userDetailsFetchRequest())
          props.navigation.goBack()
   break;
  
        case 'Profile/UserProfileUpdateFailure':
          status = ProfileReducer.status;
  
          break;
    }
  }

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

          <Text style={styles.txt1}>Update Profile</Text>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}
          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: normalize(20)}}
            onPress={() => {
              setBtnModalVisible(!btnmodalVisible)
            }}>
            <ImageBackground
              imageStyle={{borderRadius: normalize(40)}}
              source={
                selectedprofilePhoto
                  ? {uri: selectedprofilePhoto.uri}
                  : profileimage
                  ? {uri: profileimage}
                  : Icons.hero1
              }
              style={styles.icon1}>
              <View
                style={{
                  alignSelf: 'center',
                  bottom: normalize(4),
                  height: normalize(24),
                  width: normalize(24),
                  borderRadius: normalize(12),
                  backgroundColor: '#00000080',
                  justifyContent: 'center',
                }}>
                <Image source={Icons.camera} style={styles.camera} />
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <View
            style={{
              marginTop: normalize(30),

              backgroundColor: 'white',
              padding: normalize(10),
              shadowColor: '#000',
              width: '90%',
              alignSelf: 'center',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
              borderRadius: normalize(10),
              paddingVertical: 0,
              paddingBottom: normalize(15),
            }}>
            <Text
              style={[
                styles.txt5,
                {marginTop: normalize(15), fontFamily: Fonts.Poppins_Medium},
              ]}>
              Personal Information
            </Text>
            <TextIn
              value={fullname}
              isVisible={false}
              onChangeText={text => setfullname(text)}
              height={normalize(45)}
              width={'98%'}
              fonts={Fonts.RobotoMedium}
              borderColor={Colors.black}
              marginTop={normalize(15)}
              outlineTxtwidth={normalize(70)}
              // label={'twitterLink'}
              placeholder={'Full name'}
              placeholderIcon={Icons.users}
              placeholderTextColor={'#5C6066'}
              borderRadius={normalize(12)}
              backgroundColor={Colors.background}
              fontSize={normalize(11.5)}
              // maxLength={30}
              // Eyeshow={true}
              // paddingLeft={normalize(12)
              // }
            />
            <TextIn
              value={phone}
              isVisible={false}
              onChangeText={text => setphone(text)}
              height={normalize(45)}
              width={'98%'}
              fonts={Fonts.RobotoMedium}
              borderColor={Colors.black}
              marginTop={normalize(15)}
              outlineTxtwidth={normalize(70)}
              // label={'twitterLink'}
              placeholder={'Phone Number'}
              placeholderIcon={Icons.phone}
              placeholderTextColor={'#5C6066'}
              borderRadius={normalize(12)}
              backgroundColor={Colors.background}
              fontSize={normalize(11.5)}
              keyboardType={'numeric'}
              // maxLength={30}
              // Eyeshow={true}
              // paddingLeft={normalize(12)
              // }
            />
            <TextIn
              value={email}
              editable={false}
              isVisible={false}
              onChangeText={text => setemail(text)}
              height={normalize(45)}
              width={'98%'}
              fonts={Fonts.RobotoMedium}
              borderColor={Colors.black}
              marginTop={normalize(15)}
              outlineTxtwidth={normalize(70)}
              // label={'twitterLink'}
              placeholder={'Email Address'}
              placeholderIcon={Icons.email}
              placeholderTextColor={'#5C6066'}
              borderRadius={normalize(12)}
              backgroundColor={Colors.background}
              fontSize={normalize(11.5)}
              // maxLength={30}
              // Eyeshow={true}
              // paddingLeft={normalize(12)
              // }
            />
          </View>

          <TouchableOpacity
            style={styles.joinContain}
            onPress={() => {
              updateProfile();
            }}>
            <Text style={styles.txt7}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          isVisible={btnmodalVisible}
          style={{width: '100%', alignSelf: 'center', margin: 0}}
          animationInTiming={800}
          animationOutTiming={1000}
          onBackdropPress={() => setBtnModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderTopRightRadius: normalize(20),
              borderTopLeftRadius: normalize(20),
              paddingBottom: normalize(15),
              alignItems: 'center',
            }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <Button
              width={'60%'}
              height={normalize(45)}
              alignSelf={'center'}
              marginTop={normalize(10)}
              marginBottom={normalize(10)}
              backgroundColor={Colors.Pink}
              title={'Select from Camera'}
              textColor={Colors.white}
              borderRadius={normalize(27)}
              textAlign={'center'}
              fontSize={normalize(15)}
              justifyContent={'center'}
              fontFamily={Fonts.Sora_Bold}
              titlesingle
              onPress={() => {
                cameraUpload();
              }}
              activeOpacity={0.6}
            />
            <Button
              width={'60%'}
              height={normalize(45)}
              alignSelf={'center'}
              marginTop={normalize(10)}
              marginBottom={normalize(10)}
              backgroundColor={Colors.Pink}
              title={'Select from Gallery'}
              textColor={Colors.white}
              borderRadius={normalize(27)}
              textAlign={'center'}
              fontSize={normalize(15)}
              titlesingle
              justifyContent={'center'}
              fontFamily={Fonts.Sora_Bold}
              onPress={() => {
                profilePhoto();
              }}
              activeOpacity={0.6}
            />
          </View>
        </Modal>
      </ImageBackground>

    </View>
  );
};

export default UpdateProfile;

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
    // justifyContent: 'flex-end',
    alignItems:'center',
    justifyContent:'center'
  },
  txt2: {
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_Medium,
    color: '#000000',
  },
  txt3: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Light,
    color: '#000000',
    marginTop: normalize(5),
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
    // bottom: normalize(5),
  },
  mainCon: {
    paddingVertical: normalize(15),
    flexDirection: 'row',
    marginBottom: normalize(10),
    justifyContent: 'space-between',
    backgroundColor: '#F8F8F8',
    borderRadius: normalize(8),
    paddingHorizontal: normalize(3),
  },
  icon2: {
    resizeMode: 'contain',
    height: normalize(13),
    width: normalize(13),
    alignSelf: 'center',
  },
  txt5: {
    fontFamily: Fonts?.Poppins_Regular,
    fontSize: normalize(15),
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
    fontSize: normalize(11.5),
    color: '#5C6066',
    left: normalize(8),
    flex: 1,
  },
  switch: {
    resizeMode: 'contain',
    height: normalize(22),
    width: normalize(22),
  },
  camera: {
    height: normalize(12),
    width: normalize(12),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  joinContain: {
    height: normalize(38),
    backgroundColor: '#1BACE3',
    borderRadius: normalize(25),
    width: '25%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(25),
  },
  txt7: {
    fontFamily: Fonts?.Poppins_Regular,
    fontSize: normalize(12),
    color: '#FFFFFF',
    alignSelf: 'center',
  },
});
