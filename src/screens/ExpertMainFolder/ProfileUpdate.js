import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Colors} from '../../themes/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextIn from '../../components/TextIn';
import Picker from '../../components/Picker';
import Dropdown from '../../components/Dropdown';
import DatePicker from 'react-native-date-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  ExpertProfileDetailRequest,
  ExpertProfileUpdateRequest,
} from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import {
  CountryListRequest,
  LanguageListRequest,
  categoryListRequest,
} from '../../redux/reducer/AuthReducer';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
let status;
function ProfileUpdate(props) {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryModal, setCountryModal] = useState(false);
  const [language, setlanguage] = useState('');
  const [Selectedlanguage, setSelectedlanguage] = useState('');
  const [languageModal, setlanguageModal] = useState(false);
  const [category, setcategory] = useState([]);
  const [Selectedcategory, setSelectedcategory] = useState('');
  const [categoryModal, setcategoryModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState('');
  const [mobileNumber, setMobilenNumber] = useState('');
  const [description, setdescription] = useState('');
  const [address, setaddress] = useState('');
  const [linkedinLink, setlinkedinLink] = useState('');
  const [fackbookLink, setfackbookLink] = useState('');
  const [twitterLink, settwitterLink] = useState('');

  const [chatCharge, setchatCharge] = useState('');
  const [VideocallCharge, setVideocallCharge] = useState('');
  const [vdeoanscharge, setvdeoanscharge] = useState('');

  const [profileimage, setprofileimage] = useState('');
  const [selectedprofilePhoto, setselectedprofilePhoto] = useState();
  const [btnmodalVisible, setBtnModalVisible] = useState(false);

  // const profilePhoto = () => {
  //   ImageCropPicker.openPicker({
  //     width: 500,
  //     height: 500,
  //     cropping: true,
  //     cropperCircleOverlay: false,
  //     sortOrder: 'none',
  //     compressImageQuality: Platform.OS === 'android' ? 1 : 0.8,
  //     compressVideoPreset: 'MediumQuality',
  //     includeExif: true,
  //     multiple: false,
  //   })
  //     .then(image => {
  //       let arr = image.path.split('/');
  //       let getOriginalname = arr[arr?.length - 1];
  //       let imageObj = {
  //         name: getOriginalname,
  //         type: image.mime,
  //         uri:
  //           Platform.OS === 'android'
  //             ? image.path
  //             : image.path.replace('file://', ''),
  //       };

  //       setselectedprofilePhoto(imageObj);
  //       setprofileimage(imageObj.uri);
  //     })
  //     .catch(err => {
  //       const _err = new String(err).toString().includes('permission');
  //       if (_err) {
  //         Platform.OS == 'ios'
  //           ? Alert.alert('Permission Denied', 'Please Give Access', [
  //               {
  //                 text: 'cancel',
  //               },
  //               {
  //                 text: 'settings',
  //                 onPress: () => {
  //                   Linking.openSettings()
  //                     .then(() => {})
  //                     .catch(ex => {});
  //                 },
  //               },
  //             ])
  //           : console.log(err);
  //       }
  //       // setModalImagePicker(false);
  //     });
  // };

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(ExpertProfileDetailRequest());
        dispatch(CountryListRequest());
        dispatch(LanguageListRequest());
        dispatch(categoryListRequest());
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);


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



  const fullName = firstName;
  const firstName1 = fullName.split(' ').slice(0, 1).join(' ');
  const lastName = fullName
    .split(' ')
    .slice(1, fullName?.length - 1)
    .join(' ');

  const updateProfile = () => {
    let formData = new FormData();
    if(mobileNumber==''){
      showErrorAlert('Phone number should not be blank')
    }
    else if (firstName==''){
      showErrorAlert('Name should not be blank')
    }
    else{
      formData.append('first_name', firstName1);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', mobileNumber);
      company? 
      formData.append('company_name', company):'';
      address? 
      formData.append('address', address):'';
      country ? 
      formData.append('country_id', country?.id):'';
      language?
      formData.append('language_id', language?.id):'';
      description ?
      formData.append('description', description):'';
      fackbookLink ? formData.append('facebook', fackbookLink) : '';
      twitterLink ? formData.append('twitter', twitterLink) : '';
      linkedinLink ? formData.append('linkedin', linkedinLink) : '';
      chatCharge ? formData.append('chat_answer_charges', chatCharge) : '';
      vdeoanscharge ? formData.append('video_answer_charges', vdeoanscharge) : '';
      VideocallCharge
        ? formData.append('video_call_charges', VideocallCharge)
        : '';
      formData.append('date_of_birth', date);
  
      if (selectedprofilePhoto != undefined || selectedprofilePhoto != null) {
        formData.append('profile_photo_path', selectedprofilePhoto);
      }
  
      connectionrequest()
        .then(() => {
          dispatch(ExpertProfileUpdateRequest(formData));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    }
  
  };

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/ExpertProfileDetailRequest':
        status = ProfileReducer.status;

        break;

      case 'Profile/ExpertProfileDetailSuccess':
        status = ProfileReducer.status;
        setFirstName(ProfileReducer?.ExpertProfileDetailRes?.data?.full_name);
        setEmail(ProfileReducer?.ExpertProfileDetailRes?.data?.email);
        setCompany(ProfileReducer?.ExpertProfileDetailRes?.data?.company_name);
        setCountry(ProfileReducer?.ExpertProfileDetailRes?.data?.country);
        setSelectedCountry(
          ProfileReducer?.ExpertProfileDetailRes?.data?.country?.country,
        );
        setlanguage(ProfileReducer?.ExpertProfileDetailRes?.data?.language);
        setSelectedlanguage(
          ProfileReducer?.ExpertProfileDetailRes?.data?.language?.language,
        );
        setcategory(
          ProfileReducer?.ExpertProfileDetailRes?.data?.category?.category,
        );
        setSelectedcategory(
          ProfileReducer?.ExpertProfileDetailRes?.data?.categories?.[0],
        );
        setDate(ProfileReducer?.ExpertProfileDetailRes?.data?.date_of_birth);
        setMobilenNumber(ProfileReducer?.ExpertProfileDetailRes?.data?.phone);
        setdescription(
          ProfileReducer?.ExpertProfileDetailRes?.data?.description,
        );
        setaddress(ProfileReducer?.ExpertProfileDetailRes?.data?.address);
        setlinkedinLink(ProfileReducer?.ExpertProfileDetailRes?.data?.linkedin);
        setfackbookLink(ProfileReducer?.ExpertProfileDetailRes?.data?.facebook);
        settwitterLink(ProfileReducer?.ExpertProfileDetailRes?.data?.twitter);
        setchatCharge(
          ProfileReducer?.ExpertProfileDetailRes?.data?.chat_answer_charges,
        );
        setVideocallCharge(
          ProfileReducer?.ExpertProfileDetailRes?.data?.video_call_charges,
        );
        setvdeoanscharge(
          ProfileReducer?.ExpertProfileDetailRes?.data?.video_answer_charges,
        );
        setprofileimage(
          ProfileReducer?.ExpertProfileDetailRes?.data?.profile_photo_url ?? '',
        );
        // dispatch(ExpertProfileDetailRequest());
        // props.navigation.goBack()
        break;

      case 'Profile/ExpertProfileDetailFailure':
        status = ProfileReducer.status;

        break;

        case 'Profile/ExpertProfileUpdateRequest':
          status = ProfileReducer.status;
  
          break;
  
        case 'Profile/ExpertProfileUpdateSuccess':
          status = ProfileReducer.status;
          dispatch(ExpertProfileDetailRequest())
          props.navigation.goBack()
   break;
  
        case 'Profile/ExpertProfileUpdateFailure':
          status = ProfileReducer.status;
  
          break;
  



    }
  }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={styles.backgroundImageContainer}
        //resizeMode="stretch"
        source={Icons.Auth}>
        <MyStatusBar />

        <SafeAreaView style={styles.mainContainer}>
          {/* header */}
          <View style={styles.container_wrapper}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack('')}
              // style={styles.backCont}
            >
              <Image
                source={Icons.goBack}
                style={{
                  height: normalize(35),
                  width: normalize(35),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  tintColor: Colors.white,
                }}
              />
            </TouchableOpacity>

            <Text style={styles.txt1}>{'Update Profile'}</Text>

            <View
              style={{
                opacity: 0,
                height: normalize(35),
                width: normalize(35),
                resizeMode: 'contain',
                alignSelf: 'center',
                tintColor: Colors.white,
              }}
            />
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={{
                // justifyContent: 'center',
                // alignItems: 'center',
                alignSelf: 'center',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 99,
                top: normalize(-40),
              }}
              onPress={() => {
                setBtnModalVisible(!btnmodalVisible);
              }}>
              <Image
                style={styles.exPro}
                source={
                  selectedprofilePhoto
                    ? {uri: selectedprofilePhoto.uri}
                    : profileimage
                    ? {uri: profileimage}
                    : Icons.exPro
                }
              />
              <Image
                resizeMode="contain"
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  borderRadius: normalize(15),
                  position: 'absolute',
                  // alignSelf:'center',
                  // top:normalize(-5)
                }}
                tintColor={Colors.white}
                source={Icons.camera}
              />
            </TouchableOpacity>

            <KeyboardAwareScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              // style={{marginBottom: isKeyboardVisible ? 0 : 150}}
              enableOnAndroid={true}
              scrollEnabled={true}
              extraScrollHeight={100}
              keyboardShouldPersistTaps="handled"
              scrollToOverflowEnabled={false}
              enableAutomaticScroll={true}
              contentContainerStyle={
                {
                  // flexGrow: 1,
                  // paddingBottom: isKeyboardVisible
                  //   ? normalize(80)
                  //   : Platform.OS === 'ios'
                  //   ? normalize(100)
                  //   : normalize(120),
                  // // paddingBottom:
                  // //   Platform.OS === 'ios' ? normalize(20) : normalize(75),
                }
              }>
              <View
                style={{
                  paddingHorizontal: normalize(20),
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: normalize(16),
                    // marginBottom: normalize(20),
                    marginVertical: normalize(20),
                    marginTop: normalize(80),
                  }}>
                  {'Update Information'}
                </Text>

                <TextIn
                  value={firstName}
                  isVisible={false}
                  onChangeText={text => [setFirstName(text)]}
                  editable={true}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.black}
                  borderWidth={2}
                  //marginTop={normalize(25)}
                  outlineTxtwidth={normalize(70)}
                  label={'Full Name'}
                  // borderColor={'black'}
                  placeholder={'Full Name'}
                  placeholderIcon={Icons.Profile_Unclicked}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(12)}
                  paddingLeft={normalize(12)}
                />

                <TextIn
                  value={email}
                  isVisible={false}
                  editable={false}
                  onChangeText={text => [
                    setEmail(text),
                    // setIsValidateEmail(true),
                  ]}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.Poppins_Medium}
                  fontSize={normalize(12)}
                  borderColor={Colors.black}
                  // borderWidth={2}
                  maxLength={30}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(40)}
                  label={'Email'}
                  placeholder={'Email Address'}
                  placeholderIcon={Icons.email}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  //Eyeshow={true}
                  paddingLeft={normalize(12)}
                />
                <TextIn
                  // show={mobileNumber.length > 0 ? true : false}
                  value={mobileNumber}
                  isVisible={false}
                  // onChangeText={mUserLastName => [
                  //   actionOnmobileTextFieldClick(mUserLastName),
                  //   setErrorMessage(''),
                  // ]}
                  onChangeText={text => {
                    setMobilenNumber(text);
                  }}
                  keyboardType={'number-pad'}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.yellow}
                  // borderWidth={2}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(70)}
                  label={'Phone Number'}
                  placeholder={'Phone Number'}
                  placeholderIcon={Icons.phone}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={'#FFFFFF'}
                  fontSize={14}
                  maxLength={30}
                  //Eyeshow={true}
                  paddingLeft={normalize(12)}
                />

                <TextIn
                  value={company}
                  isVisible={false}
                  onChangeText={text => setCompany(text)}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.Poppins_Medium}
                  fontSize={normalize(12)}
                  borderColor={Colors.black}
                  borderWidth={2}
                  maxLength={30}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(40)}
                  label={'Company'}
                  placeholder={'Company Name'}
                  placeholderIcon={Icons.company}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  //Eyeshow={true}
                  paddingLeft={normalize(12)}
                />

                {/* country */}

                <Dropdown
                  leftImage={true}
                  LeftIcon={Icons.con}
                  LefticonHeight={normalize(12)}
                  leftImageWidth={normalize(12)}
                  height={normalize(55)}
                  width={normalize(280)}
                  borderRadius={normalize(12)}
                  paddingHorizontal={normalize(15)}
                  // borderColor={'26292B'}
                  rightIcontintColor={'#3470E1'}
                  rightIcon={Icons.down}
                  color={country == '' ? '#5C6066' : 'black'}
                  marginTop={normalize(10)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(12)}
                  fontFamily={Fonts.Poppins_Medium}
                  // borderWidth={country.length>0?normalize(1):normalize(0)}
                  // backgroundColor={}
                  // value={
                  //   ProfileReducer?.ExpertProfileDetailRes?.data?.country?.country
                  //     ? ProfileReducer?.ExpertProfileDetailRes?.data?.country?.country
                  //     : country == undefined
                  //     ? 'Select Country'
                  //     : country?.country
                  // }
                  value={selectedCountry ? selectedCountry : 'Select Country'}
                  onPress={() => {
                    setCountryModal(!countryModal);
                  }}
                />

                <Picker
                  backgroundColor={Colors.white}
                  dataList={AuthReducer?.CountryListResponse?.data}
                  modalVisible={countryModal}
                  paddingLeft={normalize(0)}
                  onBackdropPress={() => setCountryModal(!countryModal)}
                  renderData={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setCountry(item);
                          setSelectedCountry(item?.country);
                          setCountryModal(false);
                        }}
                        style={[
                          styles.dropDownItem,
                          country?.id == item.id
                            ? {backgroundColor: Colors.blue}
                            : null,
                        ]}>
                        <Text
                          style={[
                            styles.dropDownItemText,
                            country?.id == item.id
                              ? {color: Colors.white}
                              : null,
                          ]}>
                          {item?.country}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />

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
                {/* //language */}

                <Dropdown
                  leftImage={true}
                  LeftIcon={Icons.lan}
                  LefticonHeight={normalize(12)}
                  leftImageWidth={normalize(12)}
                  height={normalize(55)}
                  width={normalize(280)}
                  borderRadius={normalize(12)}
                  paddingHorizontal={normalize(15)}
                  // borderColor={'26292B'}
                  rightIcontintColor={'#3470E1'}
                  rightIcon={Icons.down}
                  color={language == '' ? '#5C6066' : 'black'}
                  marginTop={normalize(10)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(12)}
                  fontFamily={Fonts.Poppins_Medium}
                  value={
                    Selectedlanguage ? Selectedlanguage : 'Select Language'
                  }
                  onPress={() => {
                    setlanguageModal(!languageModal);
                  }}
                />

                <Picker
                  backgroundColor={Colors.white}
                  dataList={AuthReducer?.LanguageListResponse?.data}
                  modalVisible={languageModal}
                  paddingLeft={normalize(0)}
                  onBackdropPress={() => setlanguageModal(!languageModal)}
                  renderData={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setlanguage(item);
                          setSelectedlanguage(item?.language);
                          setlanguageModal(false);
                        }}
                        style={[
                          styles.dropDownItem,
                          language?.id == item.id
                            ? {backgroundColor: Colors.blue}
                            : null,
                        ]}>
                        <Text
                          style={[
                            styles.dropDownItemText,
                            language?.id == item.id
                              ? {color: Colors.white}
                              : null,
                          ]}>
                          {item?.language}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                {/* category */}
                <Dropdown
                  leftImage={true}
                  LeftIcon={Icons.cat}
                  LefticonHeight={normalize(12)}
                  leftImageWidth={normalize(12)}
                  height={normalize(55)}
                  width={normalize(280)}
                  borderRadius={normalize(12)}
                  paddingHorizontal={normalize(15)}
                  // borderColor={'26292B'}
                  rightIcontintColor={'#3470E1'}
                  rightIcon={Icons.down}
                  color={category == '' ? '#5C6066' : 'black'}
                  marginTop={normalize(10)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(12)}
                  fontFamily={Fonts.Poppins_Medium}
                  // backgroundColor={}
                  //   value={
                  //     category?.title == undefined
                  //       ? 'Select Category'
                  //       : category?.title
                  //   }
                  value={Selectedcategory}
                  onPress={() => {
                    setcategoryModal(!categoryModal);
                  }}
                />

                <Picker
                  backgroundColor={Colors.white}
                  dataList={AuthReducer?.categoryListResponse?.data}
                  modalVisible={categoryModal}
                  paddingLeft={normalize(0)}
                  onBackdropPress={() => setcategoryModal(!categoryModal)}
                  renderData={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setcategory(item);
                          setSelectedcategory(item?.title);
                          setcategoryModal(false);
                        }}
                        style={[
                          styles.dropDownItem,
                          category?.id == item.id
                            ? {backgroundColor: Colors.blue}
                            : null,
                        ]}>
                        <Text
                          style={[
                            styles.dropDownItemText,
                            category?.id == item.id
                              ? {color: Colors.white}
                              : null,
                          ]}>
                          {item?.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                <View
                  //   onPress={() => {
                  //     setDateModal(!dateModal);
                  //   }}
                  style={{
                    flexDirection: 'row',
                    width: normalize(280),
                    height: normalize(55),
                    backgroundColor: Colors.background,
                    borderRadius: normalize(12),
                    marginTop: normalize(15),
                    alignItems: 'center',
                    paddingLeft: normalize(13),
                  }}>
                  <Image
                    source={Icons.Dob}
                    style={{height: normalize(12), width: normalize(12)}}
                  />
                  <Text
                    style={{
                      color: '#5C6066',
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Regular,
                      marginLeft: normalize(13),
                    }}>
                    {moment(date).format('DD/MM/YYYY')}
                  </Text>
                </View>
                <Text
                  style={{
                    color: '#5C6066',
                    fontSize: normalize(13),
                    fontFamily: Fonts.Poppins_Regular,
                    marginVertical: normalize(15),
                  }}>
                  Profile Description
                </Text>
                <TextIn
                  // show={description.length > 0 ? true : false}
                  value={description}
                  isVisible={false}
                  onChangeText={text => {
                    // actionOnConuntryTextFieldClick(company),
                    setdescription(text);
                  }}
                  textAlignVertical={'top'}
                  height={normalize(180)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  multiline={true}
                  marginTopInput={normalize(8)}
                  borderColor={Colors.black}
                  // maxLength={30}
                  // marginTop={normalize(15)}
                  outlineTxtwidth={normalize(40)}
                  label={'Description'}
                  placeholder={'Enter your description...'}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(13)}
                  //Eyeshow={true}
                  paddingLeft={normalize(12)}
                />

                <Text
                  style={{
                    color: '#5C6066',
                    fontSize: normalize(13),
                    fontFamily: Fonts.Poppins_Regular,
                    marginVertical: normalize(15),
                  }}>
                  Address
                </Text>
                <TextIn
                  // show={description.length > 0 ? true : false}
                  value={address}
                  isVisible={false}
                  onChangeText={text => {
                    // actionOnConuntryTextFieldClick(company),
                    setaddress(text);
                    // setErrorMessage('');
                  }}
                  textAlignVertical={'top'}
                  height={normalize(180)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  multiline={true}
                  marginTopInput={normalize(8)}
                  borderColor={Colors.black}
                  // maxLength={30}
                  // marginTop={normalize(15)}
                  outlineTxtwidth={normalize(40)}
                  label={'Description'}
                  placeholder={'Enter your Address...'}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(13)}
                  //Eyeshow={true}
                  paddingLeft={normalize(12)}
                />

                <Text
                  style={{
                    color: '#5C6066',
                    fontSize: normalize(13),
                    fontFamily: Fonts.Poppins_Regular,
                    marginVertical: normalize(15),
                  }}>
                  Social Links
                </Text>
                <TextIn
                  value={linkedinLink}
                  isVisible={false}
                  onChangeText={text => [setlinkedinLink(text)]}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.black}
                  //marginTop={normalize(25)}
                  outlineTxtwidth={normalize(70)}
                  label={'LinkedIn'}
                  placeholder={'LinkedIn Account Link'}
                  placeholderIcon={Icons.linkedin}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(13)}
                  // maxLength={30}
                  // Eyeshow={true}
                  paddingLeft={normalize(12)}
                />
                <TextIn
                  value={fackbookLink}
                  isVisible={false}
                  onChangeText={text => [setfackbookLink(text)]}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.black}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(70)}
                  label={'Facebook Link'}
                  placeholder={'Facebook Account Link'}
                  placeholderIcon={Icons.fb}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(13)}
                  // maxLength={30}
                  // Eyeshow={true}
                  paddingLeft={normalize(12)}
                />
                <TextIn
                  value={twitterLink}
                  isVisible={false}
                  onChangeText={text => [settwitterLink(text)]}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.black}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(70)}
                  label={'twitterLink'}
                  placeholder={'twitter Account Link'}
                  placeholderIcon={Icons.twitter}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(13)}
                  // maxLength={30}
                  // Eyeshow={true}
                  paddingLeft={normalize(12)}
                />

                {/* charges */}

                <TextIn
                  value={chatCharge}
                  isVisible={false}
                  onChangeText={text => [setchatCharge(text)]}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.black}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(70)}
                  // label={'LinkedIn'}
                  placeholder={'Text Answer Charges'}
                  // placeholderIcon={Icons.linkedin}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(13)}
                  // maxLength={30}
                  // Eyeshow={true}
                  paddingLeft={normalize(12)}
                />
                <TextIn
                  value={VideocallCharge}
                  isVisible={false}
                  onChangeText={text => [setVideocallCharge(text)]}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.black}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(70)}
                  // label={'Facebook Link'}
                  placeholder={'Video Call Charges'}
                  // placeholderIcon={Icons.fb}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(13)}
                  // maxLength={30}
                  // Eyeshow={true}
                  paddingLeft={normalize(12)}
                />
                <TextIn
                  value={vdeoanscharge}
                  isVisible={false}
                  onChangeText={text => [setvdeoanscharge(text)]}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.black}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(70)}
                  // label={'twitterLink'}
                  placeholder={'Video Answer charges'}
                  // placeholderIcon={Icons.twitter}
                  placeholderTextColor={'#5C6066'}
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.background}
                  fontSize={normalize(13)}
                  // maxLength={30}
                  // Eyeshow={true}
                  paddingLeft={normalize(12)}
                />
              </View>

              {/* Sign Up */}
              <View style={styles.btnMainContainer}>
                <TouchableOpacity
                  title={'Register'}
                  // onPress={() => onNextToPersonalDetails()}
                  style={{
                    backgroundColor: '#1BACE3',
                    justifyContent: 'center',
                    height: normalize(46),
                    width: '40%',
                    borderRadius: normalize(50),
                    marginBottom: normalize(20),
                  }}
                  onPress={() => {
                    // props.navigation.navigate('ExpertBottomTab', {
                    //   screen: 'ExHome',
                    //   params: {
                    //     screen: 'home',
                    //   },
                    // });
                    updateProfile();
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.Poppins_Medium,
                      fontSize: normalize(13),
                      // fontWeight: '500',
                      textAlign: 'center',
                      // lineHeight: 21,
                      color: Colors.white,
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login */}
            </KeyboardAwareScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

export default ProfileUpdate;
const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '60%',
    justifyContent: 'flex-start',
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  dropDownItem: {
    paddingVertical: normalize(12),
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: normalize(1),
  },
  dropDownItemText: {
    fontSize: normalize(12),
    // lineHeight: normalize(8),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black,
    textTransform: 'uppercase',
    paddingLeft: normalize(20),
  },

  btnMainContainer: {
    width: '100%',
    paddingHorizontal: normalize(20),
    marginTop: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(15),
  },

  saveBtnText: {
    fontFamily: Fonts.RobotoMedium,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    // lineHeight: 17,
    textAlign: 'right',
    color: Colors.white,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    marginTop: Platform.OS == 'ios' ? normalize(110) : normalize(80),
  },
  headerLoginTxt: {
    fontFamily: Fonts.Poppins_Light,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 24,
  },
  headerDescTxt: {
    fontFamily: Fonts.Poppins_Light,
    fontSize: normalize(11),
    fontWeight: '400',
    color: '#A9A9A9',
    paddingTop: normalize(10),
    textAlign: 'center',
    width: '85%',
  },
  footerContainer: {
    // flex: 1,
    backgroundColor: '#F8F8F8',
    //justifyContent: 'flex-end',
    width: '100%',
    height: normalize(500),
    borderTopLeftRadius: normalize(25),
    borderTopRightRadius: normalize(25),
    position: 'absolute',
    bottom: 0,

    // top: Platform.OS === 'ios' ? windowHeight / 5 : windowHeight / 2.8,
  },

  footerORTxt: {
    fontFamily: Fonts.Poppins_Light,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#5C6066',
    //textTransform: 'capitalize',
    paddingVertical: normalize(15),
    letterSpacing: normalize(0.2),
  },
  footerORTxts: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(11.5),
    lineHeight: 20,
    textAlign: 'center',
    color: '##000000',
    left: 2,
  },
  container_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    width: '100%',
    marginTop: Platform.OS == 'ios' ? normalize(30) : normalize(50),
  },
  backCont: {
    height: normalize(35),
    width: normalize(35),
    borderRadius: normalize(18),
    backgroundColor: 'rgba(236, 236, 236, 1)',
    justifyContent: 'center',
  },
  txt1: {
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_Regular,
    // alignSelf: 'center',
    color: '#ECECEC',
    textAlign: 'center',
  },
  exPro: {
    height: normalize(90),
    width: normalize(90),
    // top: normalize(-40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(50),
    borderWidth: normalize(2),
    borderColor: 'white',
    // overflow:'hidden'
  },
  camera: {
    height: normalize(12),
    width: normalize(12),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  //dropDown
  // dropdown: {
  //   marginTop: normalize(15),
  //   height: normalize(55),
  //   backgroundColor: Colors.background,
  //   borderRadius: normalize(10),
  //   paddingHorizontal: normalize(15),
  // },
  icon: {
    resizeMode: 'contain',
    height: normalize(12),
    width: normalize(12),
  },
  placeholderStyle: {
    fontSize: normalize(12),
    marginLeft: normalize(10),
    color: '#5C6066',
    fontFamily: Fonts.Poppins_Medium,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: normalize(20),
    height: normalize(20),
    tintColor: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
