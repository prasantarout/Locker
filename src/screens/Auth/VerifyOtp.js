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
  TextInput,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Fonts } from '../../themes/ImagePath';
import { Colors } from '../../themes/Colors';
import { Icons } from '../../themes/ImagePath';
import TextIn from '../../components/TextIn';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import OtpTextBox from '../../components/OtpTextBox';
import { forgotpasswordRequest, otpRequest } from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { normalizeUnits } from 'moment';
let status
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VerifyOtp = props => {
  const dispatch = useDispatch();

  const AuthReducer = useSelector(state => state.AuthReducer);
  const email1 = AuthReducer?.forgotpasswordResponse?.data;
  console.log('hello2++++++++', email1);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');

  const [blureffect, setBlureffect] = useState(false);
  const [blureffect1, setBlureffect1] = useState(false);
  const [blureffect2, setBlureffect2] = useState(false);
  const [blureffect3, setBlureffect3] = useState(false);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  function emailVerify_otp() {
    if (pin1 == '' || pin2 == '' || pin3 == '' || pin4 == '') {
      showErrorAlert('Please fill the otp field');
    } else {
      // let formdata = new FormData();
      // formdata.append('emailOTP', pin1 + pin2 + pin3 + pin4);
      // formdata.append('email', props.route.params.emailVerify);
      // formdata.append('isEmailVerified', true);
      let obj = {
        email: email1,//props.route.params?.email1,
        otp: `${pin1}${pin2}${pin3}${pin4}`,
        Role: props.route.params?.role
      };

      console.log("vghvghvghvghv",obj);
      connectionrequest()
        .then(() => {
          dispatch(otpRequest(obj));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    }
  }

  function ResendEmailotpVerify() {
    let obj = {
      email: email1,//props.route.params?.email1,
      Role: props.route.params?.role
    }

    connectionrequest()
      .then(() => {
         dispatch(forgotpasswordRequest(obj));
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });

  }

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/otpRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/otpSuccess':
        status = AuthReducer.status;
        console.log('hekko');
        navigation.navigate('ResetPassword', {
          exKey: props?.route?.params.exKey,
          email1:email1,
         otp: `${pin1}${pin2}${pin3}${pin4}`,
          Role: props.route.params?.role
        }),
          console.log('hello', email1);
          setPin1(''),
          setPin2(''),
          setPin3(''),
          setPin4('')
        break;

      case 'Auth/otpFailure':
        status = AuthReducer.status;

        break;
        case 'Auth/forgotpasswordRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/forgotpasswordSuccess':
        status = AuthReducer.status;
     
        // props.navigation.navigate('VerifyOtp')

        break;

      case 'Auth/forgotpasswordFailure':
        status = AuthReducer.status;

        break;

    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.backgroundImageContainer}
        //resizeMode="stretch"
        source={Icons.Auth}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.container}>
            <View style={{ height: StatusBar.currentHeight }} />
            <View style={{ flex: 2 }}>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={{
                    height: normalize(30),
                    width: normalize(30),
                    borderRadius: normalize(15),
                    justifyContent: 'center',
                    backgroundColor: '#1D1D1D',
                  }}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={Icons.left}
                    style={{
                      width: normalize(10),
                      height: normalize(10),
                      resizeMode: 'contain',
                      tintColor: 'white',
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => NavigationService.navigate('SignIn')}>
                    <Text style={styles.saveBtnText}>Sign In</Text>
                  </TouchableOpacity> */}
              </View>
              <View style={styles.headerContainer}>
                <Text style={styles.headerLoginTxt}>Check Your Mail</Text>
                <Text style={styles.headerDescTxt}>
                  {
                    'We have sent a verification code to your mail Please Verify.'
                  }
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <KeyboardAwareScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: isKeyboardVisible ? 0 : 150 }}
              enableOnAndroid={true}
              scrollEnabled={true}
              extraScrollHeight={100}
              keyboardShouldPersistTaps="handled"
              scrollToOverflowEnabled={false}
              enableAutomaticScroll={true}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: isKeyboardVisible
                  ? normalize(80)
                  : Platform.OS === 'ios'
                    ? normalize(100)
                    : normalize(120),
                // paddingBottom:
                //   Platform.OS === 'ios' ? normalize(20) : normalize(75),
              }}>
              <View
                style={{
                  paddingTop: normalize(25),
                  paddingHorizontal: normalize(20),
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>

                <View style={styles.optWrapper}>

                  <View
                    style={styles.otpInputWrapper}
                    
                  >
                    <TextInput
                      ref={inputRef1}
                      value={pin1}
                      keyboardType="numeric"
                      placeholder='-'
                      maxLength={1}
                      onBlur={() => {
                        setBlureffect(false);
                      }}
                      onChangeText={val => {
                        setPin1(val);
                        if (val?.length > 0) {
                          inputRef2.current.focus();
                        }
                      }}
                      onFocus={() => setBlureffect(true)}
                      style={styles.otpInput}
                    />
                  </View>
                  <View
                    style={styles.otpInputWrapper}
                  >
                    <TextInput
                      keyboardType="numeric"
                      placeholder='-'
                      maxLength={1}
                      ref={inputRef2}
                      value={pin2}
                      onBlur={() => {
                        setBlureffect1(false);
                      }}
                      onFocus={() => setBlureffect1(true)}
                      onKeyPress={({ nativeEvent }) => {
                        if(nativeEvent.key === 'Backspace'){
                          inputRef1.current.focus();
                        }
                      }}
                      onChangeText={val => {
                        setPin2(val);
                        if (val?.length > 0) {
                          inputRef3.current.focus();
                        } else {
                          inputRef1.current.focus();
                        }
                      }}
                      style={styles.otpInput}
                    />
                  </View>
                  <View
                    style={styles.otpInputWrapper}
                  >
                    <TextInput
                      keyboardType="numeric"
                      placeholder='-'
                      maxLength={1}
                      ref={inputRef3}
                      value={pin3}
                      onKeyPress={({ nativeEvent }) => {
                        if(nativeEvent.key === 'Backspace'){
                          inputRef2.current.focus();
                        }
                      }}
                      onBlur={() => {
                        setBlureffect2(false);
                      }}
                      onFocus={() => setBlureffect2(true)}
                      onChangeText={val => {
                        setPin3(val);
                        if (val?.length > 0) {
                          inputRef4.current.focus();
                        } else {
                          inputRef2.current.focus();
                        }
                      }}
                      style={styles.otpInput}
                    />
                  </View>
                  <View
                    style={styles.otpInputWrapper}

                  >
                    <TextInput
                      keyboardType="numeric"
                      placeholder='-'
                      maxLength={1}
                      ref={inputRef4}
                      value={pin4}
                      onKeyPress={({ nativeEvent }) => {
                        if(nativeEvent.key === 'Backspace'){
                          inputRef3.current.focus();
                        }
                      }}
                      onBlur={() => {
                        setBlureffect3(false);
                      }}
                      onFocus={() => setBlureffect3(true)}
                      onChangeText={val => {
                        setPin4(val);
                        if (val?.length > 0) {
                          inputRef4.current.focus();
                        } else {
                          inputRef3.current.focus();
                        }
                      }}
                      style={styles.otpInput}
                    />
                  </View>



                </View>

              </View>

              <Button
                width={'35%'}
                titlesingle={true}
                title={'Verify'}
                alignSelf={'center'}
                backgroundColor={'#1BACE3'}
                textColor={'white'}
                fontFamily={Fonts.Poppins_Medium}
                fontSize={normalize(12)}
                borderRadius={normalize(60)}
                marginTop={normalize(30)}
                onPress={() => {
                  emailVerify_otp();
                }}
              />

              <TouchableOpacity
         
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }} 
                onPress={() => {
                  ResendEmailotpVerify()
                }}>
                <Text style={styles.footerORTxt}>Didn’t Receive OTP? </Text>
                <Text style={[styles.footerORTxts, { color: '#000000' }]}>
                  Resend
                </Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default VerifyOtp;

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
    marginTop: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: normalize(40),
  },
  headerLoginTxt: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 20,

    color: Colors.white,
    textTransform: 'capitalize',
    lineHeight: 24,
  },
  headerDescTxt: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#A9A9A9',
    paddingTop: normalize(10),
    textAlign: 'center',
    width: '90%',
  },
  footerContainer: {
    flex: 2.5,
    backgroundColor: Colors.backGround,
    //justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    top: Platform.OS === 'ios' ? windowHeight / 3 : windowHeight / 2.8,
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
    fontFamily: Fonts.Poppins_Light,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '##000000',
    left: 2,
    padding: 10,
  },
  btnMainContainer: {
    width: '100%',
    paddingHorizontal: normalize(20),
    marginTop: normalize(20),
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: Fonts.Poppins_Light,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '##000000',
    left: 2,
  },
  box: {
    borderColor: 'black',
    width: 59,
    height: 59,
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
  },

  otpInputWrapper: {
    height: normalize(50),
    width:  normalize(50),
    backgroundColor: Colors.white,
    borderRadius: normalize(8),
    borderColor:Colors.borderColor,borderWidth:normalize(2)
  },
  optWrapper: {
    flexDirection: 'row',
     marginTop: normalize(50),
    marginBottom: normalize(20),
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInput: {
    height: normalize(55),
    width: '100%',
    borderRadius: normalize(8),
    fontSize: normalize(22),
    color: Colors.heilightBlue,
    textAlign: 'center',
    fontFamily:Fonts.Poppins_Medium

  },
});
