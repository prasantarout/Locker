import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  StatusBar,
  Keyboard,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Fonts} from '../../themes/ImagePath';
import {Colors} from '../../themes/Colors';
import {Icons} from '../../themes/ImagePath';
import TextIn from '../../components/TextIn';
import NavigationService from '../../navigation/NavigationService';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
// import {Dropdown} from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import normalize from '../../utils/helpers/dimen';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  CountryListRequest,
  DataStoreRequest,
  LanguageListRequest,
  categoryListRequest,
  signUpRequest,
} from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from '../../components/Dropdown';
import Picker from '../../components/Picker';
import {ExpertProfileDetailRequest} from '../../redux/reducer/ProfileReducer';
let status;

const SetUpProfile = props => {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  let userTempData = AuthReducer.DataStoreResponse;

  console.log('hello', userTempData);
  const [firstName, setFirstName] = useState(userTempData?.ExpertFullName);
  const [email, setEmail] = useState(userTempData?.ExpertEmail);
  const [company, setCompany] = useState(userTempData?.company);
  const [country, setCountry] = useState(userTempData?.country);
  const [countryModal, setCountryModal] = useState(false);
  const [language, setlanguage] = useState(userTempData?.language);
  const [languageModal, setlanguageModal] = useState(false);

  const [category, setcategory] = useState(userTempData?.category);
  const [categoryModal, setcategoryModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState(
    userTempData?.date
      ? userTempData?.date
      : new Date(moment().subtract(365, 'day').format('YYYY-MM-DD')),
  );
  // console.log('kluhgkiuygiy', date, new Date());
  const [description, setdescription] = useState(userTempData?.description);
  const [address, setaddress] = useState(userTempData?.address);
  const [linkedinLink, setlinkedinLink] = useState(userTempData?.linkedinLink);
  const [fackbookLink, setfackbookLink] = useState(userTempData?.fackbookLink);
  const [twitterLink, settwitterLink] = useState(userTempData?.twitterLink);

  const [chatCharge, setchatCharge] = useState(userTempData?.chatCharge);
  const [VideocallCharge, setVideocallCharge] = useState(
    userTempData?.VideocallCharge,
  );
  const [vdeoanscharge, setvdeoanscharge] = useState(
    userTempData?.vdeoanscharge,
  );

  const [profileimage, setprofileimage] = useState('');
  const [selectedprofilePhoto, setselectedprofilePhoto] = useState(
    userTempData?.selectedprofilePhoto,
  );

  const saveData = () => {
    let object = {
      ExpertFullName: firstName,
      ExpertPhone: userTempData?.ExpertPhone,
      ExpertEmail: email,
      expertPassword: userTempData?.expertPassword,
      expertconfirmPassword: userTempData?.expertconfirmPassword,
      company: company,
      country: country,
      language: language,
      category: category,
      date: date,
      description: description,
      address: address,
      linkedinLink: linkedinLink,
      fackbookLink: fackbookLink,
      twitterLink: twitterLink,
      chatCharge: chatCharge,
      VideocallCharge: VideocallCharge,
      vdeoanscharge: vdeoanscharge,
      selectedprofilePhoto: selectedprofilePhoto,
    };
    dispatch(DataStoreRequest(object));
  };

  useEffect(() => {
    saveData();
  }, [
    company,
    country,
    language,
    category,
    date,
    description,
    address,
    linkedinLink,
    fackbookLink,
    twitterLink,
    chatCharge,
    VideocallCharge,
    vdeoanscharge,
    selectedprofilePhoto,
  ]);
  useEffect(() => {
    connectionrequest()
      .then(() => {
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
        let getOriginalname = arr[arr?.length - 1];
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

  const Registration = () => {
    const fullName = userTempData?.ExpertFullName;
    const firstName1 = fullName?.split(' ').slice(0, 1).join(' ');
    const lastName = fullName
      ?.split(' ')
      .slice(1, fullName?.length - 1)
      .join(' ');
    console.log('firstName', firstName1);
    console.log('lastName', lastName);

    let formdata = new FormData();
    if (selectedprofilePhoto == null || selectedprofilePhoto == undefined) {
      showErrorAlert('Please select your profile Image');
    } else if (company == '' || company == undefined) {
      showErrorAlert('Please write your company name');
    } else if (country?.country == undefined) {
      showErrorAlert('Select your country');
    }
    else if (language?.language == undefined) {
      showErrorAlert('Select you language');
    }
    else if (category?.title == undefined) {
      showErrorAlert('Please select your category');
    } else if (moment(date).format('DD/MM/YYYY') == '') {
      showErrorAlert('Please select DOB');
    } else if (moment(date) === new Date()) {
      showErrorAlert('Current date must not birthdate');
    } else if (address == '' || address == undefined) {
      showErrorAlert('Select your address');
    } else {
      formdata.append('first_name', firstName1);
      formdata.append('last_name', lastName);
      formdata.append('email', userTempData?.ExpertEmail);
      formdata.append('phone', userTempData?.ExpertPhone);
      formdata.append('company_name', company);
      formdata.append('address', address);
      formdata.append('country_id', country?.id);
      formdata.append('language_id', language?.id);
      formdata.append('category_id', category?.id);
      formdata.append('description', description);
      formdata.append('facebook', fackbookLink);
      formdata.append('twitter', twitterLink);
      formdata.append('linkedin', linkedinLink);
      // formdata.append('chat_answer_charges')
      // formdata.append('video_answer_charges')
      // formdata.append('video_call_charges')
      formdata.append('date_of_birth', moment(date).format('DD/MM/YYYY'));
      if (selectedprofilePhoto !== null) {
        formdata.append('profile_photo_path', selectedprofilePhoto);
      }
      formdata.append('is_terms_conditions', '1');
      formdata.append('password', userTempData?.expertPassword);
      formdata.append(
        'confirm_password',
        userTempData?.expertconfirmPassword,
      );
      formdata.append('Role', 'EXPERT');
      console.log('khgjhgjuh', formdata);
      connectionrequest()
        .then(() => {
          dispatch(signUpRequest(formdata));
        })
        .catch(err => {
          showErrorAlert('Please connect to Internet', err);
        });
    }
  };

  const updateProfile = () => {};

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/signUpRequest':
        status = AuthReducer.status;

        break;

      case 'Auth/signUpSuccess':
        status = AuthReducer.status;
        props.navigation.navigate('SignIn');

        break;

      case 'Auth/signUpFailure':
        status = AuthReducer.status;

        break;
    }
  }

  // const getPreviousDay = () => {
  //   const previousDay = new Date(moment(new Date()).format('YYYY-MM-DD')) - ('YYYY-MM-DD', 1);
  //   // return moment(previousDay).format('YYYY-MM-DD');
  //   console.log('khgjygjyg',  new Date(moment(new Date()).format('YYYY-MM-DD')) - ('YYYY-MM-DD', 1));
  // };

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

            <Text style={styles.txt1}>
              {
                'Set Up Profile'}
            </Text>

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
                profilePhoto();
              }}>
              <Image
                style={styles.exPro}
                source={
                  selectedprofilePhoto
                    ? {uri: selectedprofilePhoto.uri}
                    : // :
                      //  profileimage
                      // ? {uri: constants.IMAGEPATH + profileimage}
                      Icons.exPro
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
                  {
                     'Personal Information'}
                </Text>

                <TextIn
                  value={firstName}
                  isVisible={false}
                  onChangeText={text => [setFirstName(text)]}
                  editable={
                    props?.route?.params?.UpdateProfileData ? true : false
                  }
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
                  value={country?.country == undefined ? 'Select Country' : country?.country}
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
                  // backgroundColor={}
                  value={
                    language?.language == undefined ? 'Select Language' : language?.language
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
                  value={category?.title == undefined ? 'Select Category' : category?.title}
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

                <TouchableOpacity
                  onPress={() => {
                    setDateModal(!dateModal);
                  }}
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
                </TouchableOpacity>
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
                    Registration();
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
          <DatePicker
            mode="date"
            modal
            open={dateModal}
            date={date}
            maximumDate={
              new Date(moment().subtract(365, 'day').format('YYYY-MM-DD'))
            }
            // maximumDate={getPreviousDay()}
            onConfirm={date => {
              setDateModal(false);
              setDate(date);
            }}
            onCancel={() => {
              setDateModal(false);
            }}
            onDateChange={setDate}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default SetUpProfile;

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
