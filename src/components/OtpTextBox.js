import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import { Colors } from '../themes/Colors';
import normalize from '../utils/helpers/dimen'
import { Fonts } from '../themes/ImagePath';
const OtpTextBox = props => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    inputRef1.current.focus();
  }, []);
  useEffect(() => {
    props.onChangeText(pin1 + pin2 + pin3 + pin4);

    setOtp(pin1 + pin2 + pin3 + pin4);
    console.log(pin1 + pin2 + pin3 + pin4, 'sldjslj');
  }, [pin4]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: props.marginTop,
        }}>
        <TextInput
          placeholder="-"
          placeholderTextColor={Colors.greyText}
          style={
            isFocus
              ? [styles.inputBox, styles.borderStyleHighLighted]
              : styles.inputBox
          }
          //   placeholder="_"
          ref={inputRef1}
          value={pin1}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={val => {
            setPin1(val);
            if (!pin1?.length > 0) {
              inputRef2.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          placeholderTextColor={Colors.greyText}
          style={
            isFocus
              ? [styles.inputBox, styles.borderStyleHighLighted]
              : styles.inputBox
          }
          //   placeholder="_"
          ref={inputRef2}
          value={pin2}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={val => {
            setPin2(val);
            if (!pin2?.length > 0) {
              inputRef3.current.focus();
            } else {
              inputRef1.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          placeholderTextColor={Colors.greyText}
          style={
            isFocus
              ? [styles.inputBox, styles.borderStyleHighLighted]
              : styles.inputBox
          }
          //   placeholder="_"
          ref={inputRef3}
          value={pin3}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={val => {
            setPin3(val);
            if (!pin3?.length > 0) {
              inputRef4.current.focus();
            } else {
              inputRef2.current.focus();
            }
          }}
        />
        <TextInput
          placeholder="-"
          placeholderTextColor={Colors.greyText}
          
          style={
            isFocus
              ? [styles.inputBox, styles.borderStyleHighLighted]
              : styles.inputBox
          }
          //   placeholder="_"
          ref={inputRef4}
          value={pin4}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={val => {
            setPin4(val);
            if (!pin4?.length > 0) {
              inputRef4.current.focus();
            } else {
              inputRef3.current.focus();
            }
          }}
        />
      </View>
    </>
  );
};

export default OtpTextBox;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whitheBox: {
    width: 335,
    height: 332,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontFamily: Fonts.Poppins_Regular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 24,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: Colors.black,
  },
  verifyOtp: {
    marginTop: 10,
    fontFamily: Fonts.Poppins_Regular,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'right',
    color: Colors.black,
  },
  inputBox: {
    borderRadius: normalize(10),
    width: normalize(60),
    height: normalize(60),
    textAlign: 'center',
    backgroundColor: '#F1F4F8',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(15),
    color:'black'
  },

  borderStyleHighLighted: {
    borderColor: Colors.buttonOrange,
  },

  bottomTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  getHelpText: {
    fontFamily: Fonts.Poppins_Regular,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'right',
    color: Colors.black,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timer: {
    fontFamily: Fonts.Poppins_Regular,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'right',
    color: Colors.black2,
  },
});
