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
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Fonts} from '../../themes/ImagePath';
import {Colors} from '../../themes/Colors';
import {Icons} from '../../themes/ImagePath';
import TextIn from '../../components/TextIn';
import NavigationService from '../../navigation/NavigationService';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import normalize from '../../utils/helpers/dimen';
import showErrorAlert from '../../utils/helpers/Toast';
import {
  forgotpasswordRequest,
  signinRequest,
} from '../../redux/reducer/AuthReducer';
import connectionrequest from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/helpers/constants';
import Button from '../../components/Button';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let status;
import Modal from 'react-native-modal';
import Loader from '../../utils/helpers/Loader';
const SignIn = props => {
  const dispatch = useDispatch();

  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  console.log('kbjhbjhdbc++', AuthReducer);

  const [user, setUser] = useState(true);
  console.log('kbjhbjhdbc--', user, AuthReducer?.userType);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [role, setRole] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [useremail, setuserEmail] = useState('');
  const [userpassword, setuserPassword] = useState('');

  const navigation = useNavigation();

  const [email1, setEmail1] = useState('');
  const [individualsCheckAddress, setIndividualsCheckAddress] = useState(false);
  const [individualsCheckAddress1, setIndividualsCheckAddress1] =
    useState(false);

  const [ForgotModal, setForgotModal] = useState(false);
  const [roleType, setroleType] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(constants.USER_TYPE).then(typ => {
      typ == 'EXPERT' ? setUser(false) : setUser(true);
    });
  }, []);

  function forgot_password() {
    if (email1 == '') {
      showErrorAlert('Please write your email');
    } else {
      let obj = {
        email: email1,
        Role: role == false ? 'EXPERT' : 'USER',
      };

      console.log('ehhhasd', obj);
      connectionrequest()
        .then(() => {
          dispatch(forgotpasswordRequest(obj));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    }
  }
  useEffect(() => {
    AsyncStorage.getItem(constants.TOGIN_CREDENTIAL).then(rem => {
      if (rem && rem != '') {
        const jsonRes = JSON.parse(rem);
        console.log('khgjgbhjasv+-+-', jsonRes, user);
        user == true
          ? (setuserEmail(jsonRes?.email ?? ''),
            setuserPassword(jsonRes?.password ?? ''),
            setIndividualsCheckAddress1(jsonRes?.email ? true : false),
            setIndividualsCheckAddress(false))
          : (setEmail(jsonRes?.emailExpert ?? ''),
            setPassword(jsonRes?.passwordExpert ?? ''),
            setIndividualsCheckAddress(jsonRes?.emailExpert ? true : false),
            setIndividualsCheckAddress1(false));
      }
    });
  }, [user]);

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  function exPertsignin() {
    if (user ? useremail == '' : email == '') {
      showErrorAlert('Please enter your email');
    } else if (
      user ? regex.test(useremail) == false : regex.test(email) == false
    ) {
      showErrorAlert('Please enter correct email');
    } else if (user ? userpassword == '' : password == '') {
      showErrorAlert('Please enter your password');
    } else {
      let obj = {
        email: user ? useremail : email,
        password: user ? userpassword : password,
        Role: user == false ? 'EXPERT' : 'USER',
        remember_me:
          user == true ? individualsCheckAddress1 : individualsCheckAddress,
      };
      connectionrequest()
        .then(() => {
          console.log('kjhbjgjgv', obj);
          dispatch(signinRequest(obj));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    }
  }

  const setRoleValue = async value => {
    try {
      await AsyncStorage.setItem(constants.USER_TYPE, JSON.stringify(value));
      console.log('helllpppp', JSON.stringify(value));
    } catch (error) {
      console.error('Error setting Role:', error);
    }
  };

  // useEffect(() => {

  //   VerifyRole()
  // }, [])

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/forgotpasswordRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/forgotpasswordSuccess':
        status = AuthReducer.status;

        navigation.navigate('VerifyOtp', {
          exKey: props?.route?.params?.exKey,
          email1: email1,
          role: role == false ? 'EXPERT' : 'USER',
        }),
          setForgotModal(!ForgotModal);
        // sheetRef.current.close();
        setEmail1('');
        break;

      case 'Auth/forgotpasswordFailure':
        status = AuthReducer.status;
        break;
      case 'Auth/otpRequest':
        status = AuthReducer.status;
        break;
      case 'Auth/otpSuccess':
        status = AuthReducer.status;
        // setEmail1('');
        break;
      case 'Auth/otpFailure':
        status = AuthReducer.status;
        break;
    }
  }

  return (
    <ImageBackground
      resizeMode="stretch"
      source={Icons.Auth}
      style={{flex: 1, alignItems: 'center'}}>
      <Loader visible={AuthReducer.status == 'Auth/signinRequest'} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: Platform.OS == 'ios' ? normalize(150) : normalize(80),
          width: '75%',
        }}>
        <Text style={styles.headerLoginTxt}>Welcome to Locked In</Text>
        <Text style={styles.headerDescTxt}>
          {
            'Lorem Ipsum is simply dummy text of the.Lorem Ipsum has been the dummy text.'
          }
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{paddingBottom: normalize(50)}}>
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
              SignIn as
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
          <View
            style={{
              paddingTop: normalize(25),
              paddingHorizontal: normalize(20),
            }}>
            <TextIn
              // show={email.length > 0 ? true : false}
              value={user ? useremail : email}
              isVisible={false}
              // onChangeText={email => [
              //   actionOnEmailTextFieldClick(email),
              //   setIsValidateEmail(true),
              //   setErrorMessage(''),
              // ]}
              onChangeText={text => {
                user ? setuserEmail(text) : setEmail(text);
              }}
              height={normalize(55)}
              width={normalize(280)}
              fonts={Fonts.Poppins_Medium}
              borderColor={Colors.black}
              borderWidth={2}
              maxLength={30}
              // marginTop={normalize(15)}
              outlineTxtwidth={normalize(40)}
              label={'Email'}
              placeholder={'Email Address'}
              marginTopInput={
                Platform.OS == 'ios' ? normalize(0) : normalize(3)
              }
              placeholderIcon={Icons.email}
              placeholderTextColor={'#5C6066'}
              borderRadius={normalize(12)}
              backgroundColor={Colors.background}
              fontSize={normalize(12)}
              //Eyeshow={true}
              // paddingLeft={normalize(12)}
            />

            <TextIn
              // show={password.length > 0 ? true : false}
              value={user ? userpassword : password}
              isVisible={true}
              // onChangeText={password => [
              //   actionOnPasswordTextFieldClick(password),
              //   setIsDigitActivated(true),
              //   setErrorMessage(''),
              // ]}
              onChangeText={text => {
                user ? setuserPassword(text) : setPassword(text);
              }}
              height={normalize(55)}
              width={normalize(280)}
              marginTopInput={
                Platform.OS == 'ios' ? normalize(0) : normalize(3)
              }
              fonts={Fonts.RobotoMedium}
              borderColor={Colors.black}
              outlineTxtwidth={normalize(70)}
              borderWidth={2}
              marginTop={normalize(10)}
              maxLength={30}
              label={'Password'}
              placeholder={'Password'}
              placeholderIcon={Icons.key}
              placeholderTextColor={'#5C6066'}
              borderRadius={normalize(12)}
              backgroundColor={Colors.background}
              fontSize={14}
              Eyeshow={true}
              // paddingLeft={normalize(12)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              user
                ? setIndividualsCheckAddress1(!individualsCheckAddress1)
                : setIndividualsCheckAddress(!individualsCheckAddress);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: normalize(23),
              paddingTop: normalize(10),
            }}>
            <View
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
                  opacity:
                    user == true
                      ? individualsCheckAddress1
                        ? 1
                        : 0
                      : individualsCheckAddress
                      ? 1
                      : 0,
                  height: normalize(10),
                  width: normalize(10),
                  tintColor: 'black',
                }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Poppins_Light,
                lineHeight: 21,
                color: '#5C6066',
                paddingLeft: normalize(10),
              }}>
              Remember me
            </Text>
          </TouchableOpacity>

          <View style={styles.btnMainContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1BACE3',
                // paddingRight: 36,
                // paddingBottom: 18,
                // paddingLeft: 36,
                // padding: normalize(14),
                // height: normalize(46),
                // width: 126,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: normalize(50),
                width: '40%',
                paddingVertical: normalize(13),
              }}
              onPress={() => {
                exPertsignin();
                setRoleValue(user == false ? 'EXPERT' : 'USER');
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_SemiBold,
                  fontSize: normalize(13),

                  textAlign: 'center',
                  lineHeight: 21,
                  color: Colors.white,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // top: normalize(18),
              marginTop: normalize(25),
              height: normalize(25),
            }}
            onPress={
              () => setForgotModal(!ForgotModal)
              // refRBSheet.current.open()
            }>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Poppins_Medium,
                // lineHeight: 21,
                color: '#000000',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: normalize(10),
            }}>
            <Text style={styles.footerORTxt}>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => props?.navigation.navigate('SignUp')}>
              <Text style={[styles.footerORTxts, {color: 'black'}]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          avoidKeyboard
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          backdropTransitionOutTiming={0}
          hideModalContentWhileAnimating={true}
          isVisible={ForgotModal}
          // backdropColor={ 'transparent' }
          // backdropOpacity={0}
          animationInTiming={800}
          animationOutTiming={800}
          onBackButtonPress={() => setForgotModal(false)}
          onBackdropPress={() => setForgotModal(false)}
          style={{
            margin: 0,
            bottom: 0,
            position: 'absolute',
            justifyContent: 'center',
            alignSelf: 'center',
            width: '100%',
          }}>
          <View
            style={{
              height: normalize(430),
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderTopLeftRadius: normalize(20),
              borderTopRightRadius: normalize(20),
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              automaticallyAdjustKeyboardInsets={true}>
              <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: normalize(18),

                      fontFamily: Fonts?.Poppins_Bold,
                      color: Colors?.black2,
                      textAlign: 'center',
                      marginTop: normalize(25),
                    }}>
                    Forgot Password?
                  </Text>

                  <Text
                    style={{
                      fontSize: normalize(11.5),
                      textAlign: 'center',

                      color: '#5C6066',

                      marginTop: normalize(8),
                      fontFamily: Fonts.Poppins_Regular,
                      width: normalize(250),
                    }}>
                    Enter your registered email address, an verification/reset
                    password link will be sent to your registered email address.
                  </Text>
                </View>

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
                      fontSize: normalize(14),
                      // lineHeight: 25,
                      color: '#000000',
                    }}>
                    Forgot password as
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
                      borderBottomWidth: role ? 1 : 0,
                      borderColor: '#000',
                      width: '18%',

                      justifyContent: 'center',
                    }}
                    onPress={() => setRole(true)}>
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Regular,
                        fontSize: normalize(12),
                        lineHeight: 20,
                        color: role ? '#000000' : '#5C6066',
                        marginBottom: normalize(6),
                        alignSelf: 'center',
                      }}>
                      User
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      borderBottomWidth: role ? 0 : 1,
                      borderColor: '#000',
                      marginLeft: normalize(28),
                      width: '20%',
                    }}
                    onPress={() => setRole(false)}>
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontSize: normalize(12),
                        color: role ? '#5C6066' : '#000000',

                        alignSelf: 'center',
                      }}>
                      Experts
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <Text
          style={{
            color: 'black',
            fontSize: normalize(13),
            fontFamily: Fonts.Poppins_Medium,
            marginTop: normalize(10),
            paddingLeft:normalize(20)
          }}>
          Choose Option
        </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: normalize(10),
            justifyContent: 'space-between',
            paddingHorizontal: normalize(20),
          }}>
          <TouchableOpacity
            onPress={() => setRole(false)}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.optionView}>
              <View
                style={{
                  height: normalize(10),
                  width: normalize(10),
                  borderRadius: normalize(5),
                  backgroundColor:
                    role == false ? Colors.blue : Colors.backGround,
                }}
              />
            </View>
            <Text
              style={{
                color: '#4D5464',
                fontSize: normalize(12),
                fontWeight: '500',
                fontFamily: Fonts.PoppinsMedium,
                marginLeft: normalize(5),
              }}>
              Expert
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRole(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: normalize(20),
            }}>
            <View style={styles.optionView}>
              <View
                style={{
                  height: normalize(10),
                  width: normalize(10),
                  borderRadius: normalize(5),
                  backgroundColor: role == true ? Colors.blue : Colors.greyText,
                }}
              />
            </View>
            <Text
              style={{
                color: '#4D5464',
                fontSize: normalize(12),
                fontWeight: '500',
                fontFamily: Fonts.Poppins_Medium,
                marginLeft: normalize(5),
              }}>
              User
            </Text>
          </TouchableOpacity>
        </View> */}

                <TextIn
                  // show={email1.length > 0 ? true : false}
                  value={email1}
                  isVisible={false}
                  // onChangeText={email => [
                  //   actionOnEmailTextFieldClick1(email),
                  //   setIsValidateEmail1(true),
                  //   setErrorMessage(''),
                  // ]}
                  onChangeText={text => {
                    setEmail1(text);
                  }}
                  height={normalize(55)}
                  width={normalize(280)}
                  fonts={Fonts.RobotoMedium}
                  borderColor={Colors.yellow}
                  borderWidth={2}
                  maxLength={30}
                  marginTop={normalize(15)}
                  outlineTxtwidth={normalize(40)}
                  label={'Email'}
                  placeholder={'Email Address'}
                  placeholderIcon={Icons.email}
                  placeholderTextColor="#5C6066"
                  borderRadius={normalize(12)}
                  backgroundColor={Colors.lightdark_White}
                  fontSize={14}
                  //Eyeshow={true}
                  paddingLeft={normalize(12)}
                />

                <Button
                  width={'35%'}
                  titlesingle={true}
                  title={'Send'}
                  alignSelf={'center'}
                  backgroundColor={'#1BACE3'}
                  textColor={'white'}
                  fontFamily={Fonts.Poppins_Medium}
                  fontSize={normalize(12)}
                  borderRadius={normalize(60)}
                  marginTop={normalize(20)}
                  onPress={() => {
                    setTimeout(() => {
                      forgot_password();
                    }, 500);
                    // {email1==''?setForgotModal(true):setForgotModal(false)}
                  }}
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
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
    marginTop: Platform.OS == 'ios' ? normalize(75) : normalize(75),
  },
  headerLoginTxt: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(18),

    color: Colors.white,
    textTransform: 'capitalize',
    lineHeight: 24,
  },
  headerDescTxt: {
    fontFamily: Fonts.Poppins_Light,
    fontSize: normalize(10.5),
    lineHeight: 20,
    color: '#A9A9A9',
    marginTop: normalize(10),
    textAlign: 'center',
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
    // lineHeight: 20,
    textAlign: 'center',
    color: '#5C6066',
    //textTransform: 'capitalize',
    paddingVertical: normalize(15),
  },
  footerORTxts: {
    fontFamily: Fonts.Poppins_Light,
    fontWeight: '400',
    fontSize: 14,
    // lineHeight: 20,
    textAlign: 'center',
    color: '##000000',
    left: 2,
  },
  btnMainContainer: {
    width: '100%',
    paddingHorizontal: normalize(20),
    marginTop: normalize(27),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerORTxt: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
    // lineHeight: 20,
    textAlign: 'center',
    color: '#5C6066',
    //textTransform: 'capitalize',
    paddingVertical: normalize(15),
  },
  footerORTxts: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 14,
    // lineHeight: 20,
    textAlign: 'center',
    color: '##000000',
    left: 2,
  },
  optionView: {
    height: normalize(16),
    width: normalize(16),
    borderRadius: normalize(8),
    borderWidth: normalize(1),
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
