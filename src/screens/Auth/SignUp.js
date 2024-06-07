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
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Fonts} from '../../themes/ImagePath';
import {Colors} from '../../themes/Colors';
import {Icons} from '../../themes/ImagePath';
import TextIn from '../../components/TextIn';
import NavigationService from '../../navigation/NavigationService';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {DataStoreRequest, UserSignUpRequest} from '../../redux/reducer/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import { normalizeUnits } from 'moment';
import { privacyPolicyRequest, termsConditionRequest } from '../../redux/reducer/ProfileReducer';
import { useIsFocused } from '@react-navigation/native';
import HTMLTextComponent from '../../components/HTMLTextComponent';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let status;
let status1='';
const SignUp = props => {
  const dispatch = useDispatch();

  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  let userTempData = AuthReducer.DataStoreResponse;
  const [user, setUser] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [mobileNumber, setMobilenNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [UserTerms, setuserTerms] = useState(false);
  const [expertfullName, setexpertfullName] = useState('');
  const [expertmobileNumber, setexpertMobilenNumber] = useState('');
  const [expertemail, setexpertEmail] = useState('');
  const [expertpassword, setexpertPassword] = useState('');
  const [expertconfirmPassword, setexpertConfirmPassword] = useState('');
  const [expertTerms, setexpertTerms] = useState(false);
  const [isModalVisible,setIsModalVisible]=useState(false);
  const [key,setKey]=useState(0);
  const isFocus=useIsFocused();
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const ExpertSignUp = () => {
    if (expertfullName == '') {
      showErrorAlert('Please enter your full name');
    } else if (expertmobileNumber == '') {
      showErrorAlert('please enter your Mobile number');
    } else if (expertmobileNumber?.length < 8) {
      showErrorAlert('please enter atlease 8 degit Mobile number');
    } else if (expertmobileNumber?.length > 16) {
      showErrorAlert('please enter within 16 degit Mobile number');
    } else if (expertemail == '') {
      showErrorAlert('enter your email');
    } else if (!regex.test(expertemail)) {
      showErrorAlert('Invalid email id');
    } else if (expertpassword == '') {
      showErrorAlert('please enter your password');
    } else if (!expertconfirmPassword) {
      showErrorAlert('Re-Enter Your Password');
    } else if (expertpassword != expertconfirmPassword) {
      showErrorAlert('Confirm Password Should Be Same As Password');
    } else if (expertTerms == false) {
      showErrorAlert('Please accept Terms and condition');
    } else {
      let obj = {
        ExpertFullName: expertfullName,
        ExpertPhone: expertmobileNumber,
        ExpertEmail: expertemail,
        expertPassword:expertpassword,
        expertconfirmPassword: expertconfirmPassword,
        company: userTempData?.company,
        country: userTempData?.country,
        language: userTempData?.language,
        category: userTempData?.category,
        date: userTempData?.date,
        description: userTempData?.description,
        address: userTempData?.address,
        linkedinLink: userTempData?.linkedinLink,
        fackbookLink: userTempData?.fackbookLink,
        twitterLink: userTempData?.twitterLink,
        chatCharge: userTempData?.chatCharge,
        VideocallCharge: userTempData?.VideocallCharge,
        vdeoanscharge: userTempData?.vdeoanscharge,
        selectedprofilePhoto:userTempData?.selectedprofilePhoto
        
      };

      dispatch(DataStoreRequest(obj))
      props?.navigation.navigate('SetUpProfile');
    }
  };

  const UserSignUp = () => {
    if (firstName == '') {
      showErrorAlert('Please enter your full name');
    } else if (mobileNumber == '') {
      showErrorAlert('please enter your Mobile number');
    } else if (mobileNumber?.length < 8) {
      showErrorAlert('please enter atlease 8 degit Mobile number');
    } else if (mobileNumber?.length > 16) {
      showErrorAlert('please enter within 16 degit Mobile number');
    } else if (email == '') {
      showErrorAlert('enter your email');
    } else if (!regex.test(email)) {
      showErrorAlert('Invalid email id');
    } else if (password == '') {
      showErrorAlert('please enter your password');
    } else if (!confirmPassword) {
      showErrorAlert('Re-Enter Your Password');
    } else if (password != confirmPassword) {
      showErrorAlert('Confirm Password Should Be Same As Password');
    } else if (UserTerms == false) {
      showErrorAlert('Please accept Terms and condition');
    } else {
      const fullName = firstName;
      const firstName1 = fullName.split(' ').slice(0, 1).join(' ');
      const lastName = fullName
        .split(' ')
        .slice(1, fullName?.length - 1)
        .join(' ');

      let obj = {
        first_name: firstName1,
        last_name: lastName,
        email: email,
        phone: mobileNumber,
        password: password,
        confirm_password: confirmPassword,
        Role: user == true ? 'USER' : 'EXPERT',
      };
      connectionrequest()
        .then(() => {
          dispatch(UserSignUpRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect to Internet', err);
        });
      // props?.navigation.navigate('SetUpProfile', {obj: obj});
    }
  };

  // useEffect(()=>{
  //   connectionrequest()
  //   .then(() => {
  //     dispatch(termsConditionRequest());
  //     dispatch(privacyPolicyRequest())
  //   })
  //   .catch((err) => {
  //       showErrorAlert("Please connect to Internet", err)
  //  })
    
  // },[isFocus]);

  // useEffect(() => {
  //   const unsubscribe = props?.navigation.addListener('focus', () => {
  //     connectionrequest()
  //       .then(() => {
  //         dispatch(termsConditionRequest());
  //         dispatch(privacyPolicyRequest())
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         showErrorAlert('Please connect to internet');
  //       });
  //   });

  //   return unsubscribe;
  // }, [props?.navigation]);

  function termsFunction(){
    connectionrequest()
    .then(() => {
      dispatch(termsConditionRequest());
      // dispatch(privacyPolicyRequest())
      setKey(1); 
    })
    .catch(err => {
      console.log(err);
      showErrorAlert('Please connect to Internet');
    });
  }

  function policyFunction(){
    connectionrequest()
    .then(() => {
      // dispatch(termsConditionRequest());
      dispatch(privacyPolicyRequest())
      setKey(2); 
    })
    .catch(err => {
      console.log(err);
      showErrorAlert('Please connect to Internet');
    });
  }

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/UserSignUpRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/UserSignUpSuccess':
        status = AuthReducer.status;
        props.navigation.navigate('SignIn');
        break;

      case 'Auth/UserSignUpFailure':
        status = AuthReducer.status;
        break;
    }
  }

  if (status1 == '' || ProfileReducer.status != status1) {
    switch (ProfileReducer.status) {
      case 'Profile/termsConditionRequest':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/termsConditionSuccess':
        status1 = ProfileReducer.status;
        setIsModalVisible(true);
        // console.log("hello",ProfileReducer?.termsConditionResponse?.text_content);
        break;
      case 'Profile/termsConditionFailure':
        status1 = ProfileReducer.status;
        break;
        case 'Profile/privacyPolicyRequest':
        status1 = ProfileReducer.status;
        break;
      case 'Profile/privacyPolicySuccess':
        status1 = ProfileReducer.status;
        setIsModalVisible(true);
        break;
      case 'Profile/privacyPolicyFailure':
        status1 = ProfileReducer.status;
        break;
    }
  }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="stretch"
        source={Icons.Auth}
        style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Platform.OS == 'ios' ? normalize(150) : normalize(80),
            width: '75%',
          }}>
          <Text style={styles.headerLoginTxt}>Sign Up To Locked In</Text>
          <Text style={styles.headerDescTxt}>
            {
              'Lorem Ipsum is simply dummy text of the.Lorem Ipsum has been the dummy text..'
            }
          </Text>
        </View>
        <MyStatusBar />
        <View style={styles.footerContainer}>
          <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingTop: normalize(25),
                paddingHorizontal: normalize(20),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(16),
                  lineHeight: 25,
                  color: '#000000',
                }}>
                Sign up as
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: normalize(20),
                marginTop: normalize(15),
              }}>
              <TouchableOpacity
                style={{
                  borderBottomWidth: user ? 1 : 0,
                  borderColor: '#000',
                  width: '18%',

                  justifyContent: 'center',
                }}
                onPress={() => setUser(true)}>
                <Text
                  style={{
                    fontFamily: Fonts?.Poppins_Regular,
                    fontSize: normalize(12),
                    lineHeight: 20,
                    color: user ? '#000000' : '#5C6066',
                    marginBottom: normalize(6),
                    alignSelf: 'center',
                  }}>
                  User
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderBottomWidth: user ? 0 : 1,
                  borderColor: '#000',
                  marginLeft: normalize(28),
                  width: '20%',
                }}
                onPress={() => setUser(false)}>
                <Text
                  style={{
                    fontFamily: Fonts?.Poppins_Medium,
                    fontSize: normalize(12),
                    color: user ? '#5C6066' : '#000000',

                    alignSelf: 'center',
                  }}>
                  Experts
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
                style={{
                  borderWidth: 1,
                  borderColor: '#000',
                  width: '18%',
                  bottom: normalize(2.3),
                  marginHorizontal: normalize(20),
                }}
              /> */}

            {/* User part */}
            {user ? (
              <View
                style={{
                  paddingTop: normalize(25),
                  paddingHorizontal: normalize(20),
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: normalize(16),
                    marginBottom: normalize(20),
                  }}>
                  Personal Information
                </Text>

                <View>
                  <TextIn
                    // show={firstName.length > 0 ? true : false}
                    value={firstName}
                    // borderWidth={1}
                    // borderWidth={firstName.length >0 ?normalize(1):normalize(0)}
                    isVisible={false}
                    // onChangeText={mUserFirstName => [
                    //   // actionOnFirstNameTextFieldClick(mUserFirstName),
                    //   // setErrorMessage(''),

                    // ]}
                    onChangeText={text => {
                      setFirstName(text);
                    }}
                    height={normalize(55)}
                    width={normalize(280)}
                    fonts={Fonts.RobotoMedium}
                    borderColor={Colors.yellow}
                    //marginTop={normalize(25)}
                    outlineTxtwidth={normalize(70)}
                    label={'Full Name'}
                    placeholder={'Full Name'}
                    placeholderIcon={Icons.Profile_Unclicked}
                    placeholderTextColor={'#5C6066'}
                    borderRadius={normalize(12)}
                    backgroundColor={'#FFFFFF'}
                    fontSize={14}
                    maxLength={30}
                    // Eyeshow={true}
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
                    value={email}
                    isVisible={false}
                    // onChangeText={email => [
                    //   actionOnEmailTextFieldClick(email),
                    //   setIsValidateEmail(true),
                    //   setErrorMessage(''),
                    // ]}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                    keyboardType={'email-address'}
                    height={normalize(55)}
                    width={normalize(280)}
                    fonts={Fonts.RobotoMedium}
                    borderColor={Colors.yellow}
                    // borderWidth={2}
                    maxLength={30}
                    marginTop={normalize(15)}
                    outlineTxtwidth={normalize(40)}
                    label={'Email'}
                    placeholder={'Email Address'}
                    placeholderIcon={Icons.email}
                    placeholderTextColor={'#5C6066'}
                    borderRadius={normalize(12)}
                    backgroundColor={'#FFFFFF'}
                    fontSize={14}
                    //Eyeshow={true}
                    paddingLeft={normalize(12)}
                  />

                  <TextIn
                    value={password}
                    isVisible={true}
                    // onChangeText={password => [
                    //   actionOnPasswordTextFieldClick(password),
                    //   setIsDigitActivated(true),
                    //   setErrorMessage(''),
                    // ]}
                    onChangeText={text => {
                      setPassword(text);
                    }}
                    height={normalize(55)}
                    width={normalize(280)}
                    fonts={Fonts.RobotoMedium}
                    borderColor={Colors.yellow}
                    outlineTxtwidth={normalize(70)}
                    marginTop={normalize(15)}
                    maxLength={30}
                    label={'Password'}
                    placeholder={'Password'}
                    placeholderIcon={Icons.key}
                    placeholderTextColor={'#5C6066'}
                    borderRadius={normalize(12)}
                    backgroundColor={'#FFFFFF'}
                    fontSize={14}
                    Eyeshow={true}
                    paddingLeft={normalize(12)}
                  />

                  <TextIn
                    value={confirmPassword}
                    isVisible={true}
                    onChangeText={val => {
                      setConfirmPassword(val.replace(/\s/g, ''));
                      // setIsConfirmPass(true);
                    }}
                    height={normalize(55)}
                    width={normalize(280)}
                    fonts={Fonts.RobotoMedium}
                    borderColor={Colors.yellow}
                    outlineTxtwidth={normalize(120)}
                    marginTop={normalize(15)}
                    maxLength={30}
                    label={'Confirm Password'}
                    placeholder={'Confirm Password'}
                    placeholderIcon={Icons.key}
                    placeholderTextColor={'#5C6066'}
                    borderRadius={normalize(12)}
                    backgroundColor={'#FFFFFF'}
                    fontSize={14}
                    Eyeshow={true}
                    paddingLeft={normalize(12)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: normalize(18),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setuserTerms(!UserTerms);
                      // toggleButtons()
                      // ?
                      // setYesInfo(true):
                      // setNoInfo(false)
                      //  InfoItem&& item?.status ? setNoInfo(false):setYesInfo(true)
                      //   setInfoItem(item?.id)
                    }}
                    style={{
                      borderRadius: normalize(3),
                      borderWidth: normalize(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#DDDDDD',
                      height: normalize(14),
                      width: normalize(14),
                      //bottom:normalize(5)
                    }}>
                    <Image
                      source={Icons.tick}
                      // source={item.status ? Icons.tick : Icons.check}
                      style={{
                        opacity: UserTerms ? 1 : 0,
                        height: normalize(10),
                        width: normalize(10),
                        tintColor: 'black',
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() => {
                      Alert.alert('T&C content is comming soon!');
                      // toggleButtons()
                      // ?
                      // setYesInfo(true):
                      // setNoInfo(false)
                      //  InfoItem&& item?.status ? setNoInfo(false):setYesInfo(true)
                      //   setInfoItem(item?.id)
                    }}> */}
                    <>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,

                        color: '#5C6066',
                        paddingLeft: normalize(10),
                      }}>
                      Please accept our 
                    </Text>
                    <TouchableOpacity 
                     onPress={()=>{
                      termsFunction();
                      }}
                    >
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,
                        color: '#1BACE3',
                        textDecorationLine:'underline'
                      }}>
                      {' '}Terms and Conditions
                    </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,

                        color: '#5C6066',
                        // paddingLeft: normalize(10),
                      }}>
                      {' '}& 
                    </Text>
                    </View>        
                    </>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:normalize(20)}}>
                    
                    <TouchableOpacity
                    onPress={()=>
                      policyFunction()}
                    >
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,
                        color: '#1BACE3',
                        textDecorationLine:'underline'
                      }}>
                      {' '}Privacy Policy
                    </Text>
                    </TouchableOpacity>
                    </View>
              </View>
            ) : (
              <View
                style={{
                  paddingTop: normalize(25),
                  paddingHorizontal: normalize(20),
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: normalize(16),
                    marginBottom: normalize(20),
                  }}>
                  Personal Informations
                </Text>

                <View>
                  <TextIn
                    value={expertfullName}
                    isVisible={false}
                    // onChangeText={mUserFirstName => [
                    //   actionOnFirstNameTextFieldClick(mUserFirstName),
                    //   setErrorMessage(''),
                    // ]}
                    onChangeText={text => setexpertfullName(text)}
                    height={normalize(55)}
                    width={normalize(280)}
                    fonts={Fonts.RobotoMedium}
                    borderColor={Colors.yellow}
                    // borderWidth={2}
                    //marginTop={normalize(25)}
                    outlineTxtwidth={normalize(70)}
                    // label={'Full Name'}
                    placeholder={'Full Name'}
                    placeholderIcon={Icons.Profile_Unclicked}
                    placeholderTextColor={'#5C6066'}
                    borderRadius={normalize(12)}
                    backgroundColor={'#FFFFFF'}
                    fontSize={14}
                    maxLength={30}
                    // Eyeshow={true}
                    paddingLeft={normalize(12)}
                  />

                  <TextIn
                    value={expertmobileNumber}
                    isVisible={false}
                    keyboardType={'number-pad'}
                    // onChangeText={mUserLastName => [
                    //   actionOnmobileTextFieldClick(mUserLastName),
                    //   setErrorMessage(''),
                    // ]}
                    onChangeText={text => {
                      setexpertMobilenNumber(text);
                    }}
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
                    value={expertemail}
                    isVisible={false}
                    keyboardType={'email-address'}
                    // onChangeText={email => [
                    //   actionOnEmailTextFieldClick(email),
                    //   setIsValidateEmail(true),
                    //   setErrorMessage(''),
                    // ]}
                    onChangeText={text => {
                      setexpertEmail(text);
                    }}
                    height={normalize(55)}
                    width={normalize(280)}
                    fonts={Fonts.RobotoMedium}
                    borderColor={Colors.yellow}
                    // borderWidth={2}
                    maxLength={30}
                    marginTop={normalize(15)}
                    outlineTxtwidth={normalize(40)}
                    label={'Email'}
                    placeholder={'Email Address'}
                    placeholderIcon={Icons.email}
                    placeholderTextColor={'#5C6066'}
                    borderRadius={normalize(12)}
                    backgroundColor={'#FFFFFF'}
                    fontSize={14}
                    //Eyeshow={true}
                    paddingLeft={normalize(12)}
                  />

                  <TextIn
                    value={expertpassword}
                    isVisible={true}
                    // onChangeText={password => [
                    //   actionOnPasswordTextFieldClick(password),
                    //   setIsDigitActivated(true),
                    //   setErrorMessage(''),
                    // ]}
                    onChangeText={text => {
                      setexpertPassword(text);
                    }}
                    height={normalize(55)}
                    width={normalize(280)}
                    fonts={Fonts.RobotoMedium}
                    borderColor={Colors.yellow}
                    outlineTxtwidth={normalize(70)}
                    // borderWidth={2}
                    marginTop={normalize(15)}
                    maxLength={30}
                    label={'Password'}
                    placeholder={'Password'}
                    placeholderIcon={Icons.key}
                    placeholderTextColor={'#5C6066'}
                    borderRadius={normalize(12)}
                    backgroundColor={'#FFFFFF'}
                    fontSize={14}
                    Eyeshow={true}
                    paddingLeft={normalize(12)}
                  />

                  <TextIn
                    value={expertconfirmPassword}
                    isVisible={true}
                    // onChangeText={val => {
                    //   setConfirmPassword(val.replace(/\s/g, '')),
                    //     setIsConfirmPass(true);
                    // }}
                    onChangeText={text => {
                      setexpertConfirmPassword(text);
                    }}
                    height={normalize(55)}
                    width={normalize(280)}
                    fonts={Fonts.RobotoMedium}
                    borderColor={Colors.yellow}
                    outlineTxtwidth={normalize(120)}
                    // borderWidth={2}
                    marginTop={normalize(15)}
                    maxLength={30}
                    label={'Confirm Password'}
                    placeholder={'Confirm Password'}
                    placeholderIcon={Icons.key}
                    placeholderTextColor={'#5C6066'}
                    borderRadius={normalize(12)}
                    backgroundColor={'#FFFFFF'}
                    fontSize={14}
                    Eyeshow={true}
                    paddingLeft={normalize(12)}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: normalize(18),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setexpertTerms(!expertTerms);
                      // toggleButtons()
                      // ?
                      // setYesInfo(true):
                      // setNoInfo(false)
                      //  InfoItem&& item?.status ? setNoInfo(false):setYesInfo(true)
                      //   setInfoItem(item?.id)
                    }}
                    style={{
                      borderRadius: normalize(3),
                      borderWidth: normalize(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#DDDDDD',
                      height: normalize(14),
                      width: normalize(14),
                    }}>
                    <Image
                      source={Icons.tick}
                      // source={item.status ? Icons.tick : Icons.check}
                      style={{
                        opacity: expertTerms ? 1 : 0,
                        height: normalize(10),
                        width: normalize(10),
                        tintColor: 'black',
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() => {
                      Alert.alert('T&C content is comming soon!');
                      // toggleButtons()
                      // ?
                      // setYesInfo(true):
                      // setNoInfo(false)
                      //  InfoItem&& item?.status ? setNoInfo(false):setYesInfo(true)
                      //   setInfoItem(item?.id)
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,

                        color: '#5C6066',
                        paddingLeft: normalize(10),
                      }}>
                      Terms and Conditions of Lorem
                    </Text>
                  </TouchableOpacity> */}
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,

                        color: '#5C6066',
                        paddingLeft: normalize(10),
                      }}>
                      Please accept our 
                    </Text>
                    <TouchableOpacity 
                    onPress={()=>{
                      termsFunction();
                      }}
                    >
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,
                        color: '#1BACE3',
                        textDecorationLine:'underline'
                      }}>
                      {' '}Terms and Conditions
                    </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,

                        color: '#5C6066',
                        // paddingLeft: normalize(10),
                      }}>
                      {' '}& 
                    </Text>
                    </View>  
                     
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:normalize(20)}}>
                    
                    <TouchableOpacity
                    onPress={()=>{
                     policyFunction()}}
                    >
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.RobotoMedium,
                        color: '#1BACE3',
                        textDecorationLine:'underline'
                      }}>
                      {' '}Privacy Policy
                    </Text>
                    </TouchableOpacity>
                    </View>
              </View>
            )}

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
                }}
                onPress={() => {
                  user ? UserSignUp() : ExpertSignUp();
                }}>
                <Text
                  style={{
                    fontFamily: Fonts?.Poppins_Medium,
                    fontSize: 14,

                    textAlign: 'center',
                    lineHeight: 21,
                    color: Colors.white,
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login */}
            <TouchableOpacity
              onPress={() => {
                props?.navigation.navigate('SignIn');
                //  user
                //      ? props?.navigation.navigate('ExpertSignIn', {exKey: 1})
                //     : props?.navigation.navigate('ExpertSignIn', {exKey: 2});
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: normalize(20),
              }}>
              <Text style={styles.footerORTxt}>
                If already have an account?{' '}
              </Text>
              <Text
                style={[
                  styles.footerORTxts,
                  {color: 'black', fontFamily: Fonts.Poppins_Regular},
                ]}>
                Login
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
      <Modal 
      backdropColor='black'
      animationType="slide"
      transparent={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={isModalVisible}
      avoidKeyboard={true}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}
      onBackdropPress={()=> setIsModalVisible(false)}
      style={{margin:0}}
      >
        <View style={styles.modalView} >
          <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:normalize(50)}}
          >
           {
            key==1?
            <Text style={styles.termsTitle}>{ProfileReducer?.termsConditionResponse?.title}</Text>
          :
          <Text style={styles.termsTitle}>{ProfileReducer?.privacyPolicyResponse?.title}</Text>
          }
         {key==1? 
         <View style={{marginTop:normalize(10)}}>
         <HTMLTextComponent
            htmlContent={ProfileReducer?.termsConditionResponse?.text_content }
          /></View>:
          <View style={{marginTop:normalize(10)}}>
          <HTMLTextComponent
            htmlContent={ProfileReducer?.privacyPolicyResponse?.text_content }
          />
          </View>
          }
          </ScrollView>
        </View>

      </Modal>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '60%',
    justifyContent: 'flex-start',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  btnContainer: {
    marginTop: normalize(15),
    paddingHorizontal: normalize(15),
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    lineHeight: 17,
    textAlign: 'right',
    color: Colors.white,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(15),

    height: normalize(200),
  },
  headerLoginTxt: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(14),
    color: Colors.white,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: normalize(10),
  },
  headerDescTxt: {
    fontFamily: Fonts.Poppins_Light,
    fontSize: normalize(11),
    color: '#A9A9A9',
    paddingTop: normalize(10),
    textAlign: 'center',
    width: '85%',
  },
  footerContainer: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    height: '60%',
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
  },
  footerORTxts: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(11.5),
    lineHeight: 20,
    textAlign: 'center',
    color: '##000000',
    left: 2,
    // fontWeight:'bold'
  },
  modalView:{
    height:normalize(420),
    width:'100%',
    backgroundColor:'white',
    position:'absolute',
    bottom:normalize(0),
    borderTopLeftRadius:normalize(12),
    borderTopRightRadius:normalize(12),
    paddingTop:normalize(20),
    paddingHorizontal:normalize(15),
    // alignItems:'center',
    // justifyContent:'center'
  },
  termsTitle:{
    fontSize:normalize(17),
    fontFamily:Fonts.Poppins_Bold,
    color:'black',textAlign:'center'
  }
});
