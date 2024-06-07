import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import { UserChangePasswordRequest } from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import { logoutRequest } from '../../redux/reducer/AuthReducer';
import Loader from '../../utils/helpers/Loader';
let status
const ChangePass = () => {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [oldpassword, setoldpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [ConfirmNewPassword, setConfirmNewPassword] = useState('');


  const ChangePassword=()=>{
    if(oldpassword==''){
      showErrorAlert('Please enter your old password')
    }
    else if(newPassword==''){
      showErrorAlert('Please enter your new password')
    }
    else if(ConfirmNewPassword==''){
      showErrorAlert('Please enter your confirm password')
    }else if (oldpassword==newPassword){
      showErrorAlert("New password can't be same as old password ")
    }
    else if (newPassword!=ConfirmNewPassword){
      showErrorAlert("Confirm new password should be same as new password ")
    }
    else{
      let obj={
        old_password:oldpassword,
        password:newPassword,
        confirm_password:ConfirmNewPassword
      }
      connectionrequest()
      .then(() => {
        dispatch(UserChangePasswordRequest(obj));
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
    }
    
  }

  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      case 'Profile/UserChangePasswordRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/UserChangePasswordSuccess':
        status = ProfileReducer?.status;
       dispatch(logoutRequest())
     
        break;
      case 'Profile/UserChangePasswordFailure':
        status = ProfileReducer?.status;
        break;
       
    }
  }

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Loader
          visible={
            ProfileReducer.status == 'Profile/UserChangePasswordRequest'
          }
        />
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

          <Text style={styles.txt1}>Change Password</Text>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}
          <View
            style={{
              marginTop: normalize(29),
              backgroundColor: 'white',
              marginHorizontal: normalize(20),
              paddingBottom: normalize(15),
              borderRadius: normalize(10),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
            }}>
            <View style={styles.SectionStyle}>
              <Image source={Icons.key} style={styles.ImageStyle} />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: normalize(1),
                  fontFamily: Fonts.Poppins_Regular,
                }}
                value={oldpassword}
                onChangeText={text => {
                  setoldpassword(text);
                }}
                placeholder="Old Password"
                placeholderTextColor={'#5A5A5A'}
                underlineColorAndroid="transparent"
                color={'black'}
                secureTextEntry={show ? false : true}
              />
              {show ? (
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Text style={styles.hide}>Hide</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Text style={styles.hide}>Show</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.SectionStyle}>
              <Image source={Icons.key} style={styles.ImageStyle} />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: normalize(1),
                  fontFamily: Fonts.Poppins_Regular,
                }}
                value={newPassword}
                onChangeText={text => {
                  setnewPassword(text);
                }}
                placeholder="New Password"
                placeholderTextColor={'#5A5A5A'}
                underlineColorAndroid="transparent"
                color={'black'}
                secureTextEntry={show2 ? false : true}
              />
              {show2 ? (
                <TouchableOpacity onPress={() => setShow2(!show2)}>
                  <Text style={styles.hide}>Hide</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShow2(!show2)}>
                  <Text style={styles.hide}>Show</Text>
                </TouchableOpacity>
              )}
            </View>


            <View style={styles.SectionStyle}>
              <Image source={Icons.key} style={styles.ImageStyle} />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: normalize(1),
                  fontFamily: Fonts.Poppins_Regular,
                }}
                value={ConfirmNewPassword}
                onChangeText={text => {
                  setConfirmNewPassword(text);
                }}
                placeholder="Confirm New Password"
                placeholderTextColor={'#5A5A5A'}
                underlineColorAndroid="transparent"
                color={'black'}
                secureTextEntry={show1 ? false : true}
              />
              {show1 ? (
                <TouchableOpacity onPress={() => setShow1(!show1)}>
                  <Text style={styles.hide}>Hide</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShow1(!show1)}>
                  <Text style={styles.hide}>Show</Text>
                </TouchableOpacity>
              )}
            </View>

  
          </View>

          <TouchableOpacity style={styles.joinContain} onPress={()=>{
            ChangePassword()
          }}>
            <Text style={styles.txt7}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ChangePass;

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
    width: '65%',
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
  ImageStyle: {
    margin: normalize(10),
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'contain',
    alignItems: 'center',
  },
  changepass: {
    fontSize: normalize(24),
    marginTop: normalize(29),
    color: 'black',
    fontFamily: Fonts.Poppins_Medium,
  },
  pass: {
    color: 'white',
    fontSize: normalize(15),
    fontFamily: Fonts.Poppins_Medium,
  },
  hide: {
    color: '#5A5A5A',
    fontSize: normalize(11.5),
    fontFamily: Fonts.Poppins_Medium,
    right: normalize(15),
    textDecorationLine: 'underline',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: normalize(0.6),
    height: normalize(45),
    borderRadius: normalize(12),
    marginTop: normalize(15),
    marginHorizontal: normalize(15),
    borderColor: '#5C6066',
  },
  joinContain: {
    height: normalize(38),
    backgroundColor: '#1BACE3',
    borderRadius: normalize(25),
    width: '35%',
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
