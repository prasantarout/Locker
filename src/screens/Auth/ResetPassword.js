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
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Fonts} from '../../themes/ImagePath';
import {Colors} from '../../themes/Colors';
import {Icons} from '../../themes/ImagePath';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import TextIn from '../../components/TextIn';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import {ResetPasswordRequest} from '../../redux/reducer/AuthReducer';
import {ScrollView} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let status;
const ResetPassword = props => {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function ChangePassword() {
    if (password == '') {
      showErrorAlert('Please enter your new password');
    } else if (confirmPassword != password) {
      showErrorAlert('Confirm password must be same as the new password');
    } else {
      let obj = {};
      obj.password = password;
      obj.confirm_password = confirmPassword;
      obj.otp = props?.route?.params?.otp;
      obj.email = props?.route?.params?.email1;
      obj.Role = props?.route?.params?.Role;
      connectionrequest()
        .then(() => {
          // console.log('khgjyguyjg', obj);
          dispatch(ResetPasswordRequest(obj));
        })
        .catch(error => {
          console.log(error);
          showErrorAlert('Please connect to Internet');
        });
    }
  }
  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer?.status) {
      case 'Auth/ResetPasswordRequest':
        status = AuthReducer.status;
        break;

      case 'Auth/ResetPasswordSuccess':
        status = AuthReducer?.status;
        // toggleModal();
        props?.navigation?.navigate('SignIn');
        showErrorAlert('Password changed successfully');
        break;

      case 'Auth/ResetPasswordFailure':
        status = AuthReducer?.status;

        break;
    }
  }

  return (
    <ImageBackground
      style={styles.backgroundImageContainer}
      source={Icons.reset}>
      <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => props?.navigation.goBack()}
          style={styles.btnContainer}>
          <Image
            source={Icons.left}
            style={{width: normalize(6.87), height: normalize(12)}}
          />
        </TouchableOpacity>
        <ScrollView automaticallyAdjustKeyboardInsetsy={true}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerLoginTxt}>Reset New Password</Text>
            <Text style={styles.headerDescTxt}>
              {
                'Lorem Ipsum is simply dummy text of the.Lorem Ipsum has been the dummy text.'
              }
            </Text>
          </View>
          <View
            style={{
              marginTop:
                Platform.OS === 'android' ? normalize(50) : normalize(0),
              paddingHorizontal: normalize(20),
            }}>
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
              borderWidth={2}
              marginTop={normalize(15)}
              maxLength={30}
              label={'Password'}
              placeholder={'Password'}
              placeholderIcon={Icons.key}
              placeholderTextColor={'#5C6066'}
              borderRadius={normalize(12)}
              backgroundColor={Colors.background}
              fontSize={normalize(12)}
              Eyeshow={true}
              paddingLeft={normalize(12)}
            />

            <TextIn
              // show={confirmPassword.length > 0 ? true : false}
              value={confirmPassword}
              isVisible={true}
              // onChangeText={password => [
              //   actionOnConfirmPasswordTextFieldClick(password),
              //   setIsDigitActivated1(true),
              //   setErrorMessage(''),
              // ]}\
              onChangeText={text => {
                setConfirmPassword(text);
              }}
              height={normalize(55)}
              width={normalize(280)}
              fonts={Fonts.RobotoMedium}
              borderColor={Colors.yellow}
              outlineTxtwidth={normalize(70)}
              borderWidth={2}
              marginTop={normalize(15)}
              maxLength={30}
              label={'Confirm Password'}
              placeholder={'Confirm Password'}
              placeholderIcon={Icons.key}
              placeholderTextColor={'#5C6066'}
              borderRadius={normalize(12)}
              backgroundColor={Colors.background}
              fontSize={normalize(12)}
              Eyeshow={true}
              paddingLeft={normalize(12)}
            />
          </View>
          <View style={styles.btnMainContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: '#1BACE3',
                justifyContent: 'center',
                height: normalize(46),
                width: 137,
                borderRadius: normalize(50),
              }}
              onPress={() => {
                ChangePassword();
                // toggleModal();
                // setTimeout(() => {
                //   {
                //     props.route.params.exKey == 2 ?
                //     props?.navigation.navigate('ExpertBottomTab')
                //     :
                //     props?.navigation.navigate('Dashboard')
                //   }

                //   setModalVisible(false);
                // }, 2000);
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.Poppins_Medium,
                  fontSize: 14,

                  textAlign: 'center',
                  lineHeight: 21,
                  color: Colors.white,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            height: normalize(200),
            borderRadius: 10,
            padding: 10,
          }}>
          <Image source={Icons?.success} />
          <Text
            style={{
              fontWeight: '600',
              fontSize: 20,
              textAlign: 'center',
              fontFamily: Fonts?.Poppins_Light,
              lineHeight: 26.2,
              color: '#000000',
            }}>
            Congrats!
          </Text>
          <View>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 14,
                textAlign: 'center',
                fontFamily: Fonts?.Poppins_Light,
                lineHeight: 26.2,
                color: '#5C6066',
              }}>
              Password reset successful
            </Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  btnContainer: {
    marginTop: normalize(15),
    paddingHorizontal: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: normalize(32),
    height: normalize(32),
    borderRadius: normalize(17),
    backgroundColor: '#ECECEC',
    left: Platform.OS === 'android' ? normalize(10) : normalize(10),
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
    marginBottom: normalize(30),
  },
  headerLoginTxt: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 20,

    color: Colors.black2,
    textTransform: 'capitalize',
    lineHeight: 24,
    textAlign: 'center',
    width: '85%',
  },
  headerDescTxt: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
    lineHeight: 20,

    color: '#A9A9A9',
    paddingTop: normalize(10),
    textAlign: 'center',
    width: '85%',
  },
  footerContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? windowHeight / 3 : windowHeight / 3.8,
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
});
