import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import normalize from '../utils/helpers/dimen';
import {Colors} from '../themes/Colors';
import {Fonts, Icons} from '../themes/ImagePath';
export default function TextIn(props) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <View
      style={{
        height: props.height,
        flexDirection: 'row',
        width: props.width,
        borderRadius: props.borderRadius,
        borderWidth: props.show ? props.borderWidth : props.borderWidth1,
        backgroundColor: props.backgroundColor,
        marginTop: props.marginTop,
        marginLeft: props.marginLeft,
        borderColor: props.show && props.borderColor,
        alignSelf: 'center',
        alignItems: props.alignItems ? props.alignItems : 'center',
        paddingLeft: props.paddingLeft,
        paddingRight: props.paddingRight,
        borderTopRightRadius: props.borderTopRightRadius,
        borderBottomRightRadius: props.borderBottomRightRadius,
        borderTopLeftRadius: props.borderTopLeftRadius,
        borderBottomLeftRadius: props.borderBottomLeftRadius,
        justifyContent: 'space-between',
        
      }}>
      <View style={{alignItems: 'flex-start'}}>
        {props.show ? (
          <View
            style={
              Platform.OS === 'ios'
                ? {
                    height: normalize(20),
                    width: props.outlineTxtwidth,
                    position: 'absolute',
                    backgroundColor: Colors.lightdark_White,
                    bottom: props.bottom ? props.bottom : normalize(13),
                    // borderColor:'red'
                  }
                : {
                    height: normalize(20),
                    width: props.outlineTxtwidth,
                    position: 'absolute',
                    backgroundColor: Colors.lightdark_White,
                    bottom: props.bottom ? props.bottom : normalize(15),
                  }
            }>
            <Text
              style={{
                color: props.borderColor,
                fontFamily: Fonts.RobotoMedium,
                textAlign: 'center',
                fontSize: normalize(13),
                fontFamily: Fonts.Poppins_Regular,
              }}>
              {props.label}
            </Text>
          </View>
        ) : null}
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          //paddingHorizontal: !props.show ? normalize(10) : null,
        }}>
        {!props.show && props.placeholderIcon && (
          <View
            style={{
              paddingHorizontal: 5,
              marginLeft: normalize(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={props.placeholderIcon}
              resizeMode="contain"
              style={{
                width: normalize(15),
                height: normalize(15),
                resizeMode: 'contain',
              }}
            />
          </View>
        )}
        <View style={{width: '90%',}}>
        <TextInput
          // onFocus={() =>props.onFocus()?props.onFocus():false }
          // onBlur={() =>props.onBlur()?props.onBlur():false}
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          maxLength={props.maxLength}
          fontFamily={props.fonts}
          value={props.value}
          secureTextEntry={passwordVisible ? props.isVisible : !props.isVisible}
          onChangeText={text => onChangeText(text)}
          multiline={props.multiline}
          autoCapitalize="none"
          textAlignVertical={props.textAlignVertical}
          editable={props.editable}
          
          style={{
          //  width: '100%',
            width:'90%',
            numberOfLines: props.numberOfLines,
            fontSize: props.fontSize ? props.fontSize : normalize(14),
            textAlign: props.textAlign,
            //paddingLeft: props.paddingLeft,
            color: Colors.black2,
            maxLength: props.maxLength,
            marginTop: props.marginTopInput ? props.marginTopInput : null,
            keyboardType: props.keyboardType,
            left: normalize(4),
            fontFamily: Fonts.Poppins_Regular,
            height: props.height
           
          }}
        />
              </View>
      </View>

      {/* Eye iCON */}
      {props.Eyeshow && (
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={{right: normalize(22), height: normalize(17)}}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: 14,
              lineHeight: 16,
              color: '#A9A9A9',
              right: normalize(25),
              top: normalize(5),
              textDecorationLine: 'underline',
            }}>
            {!passwordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      )}

      {/* downarrow */}
      {props.arrowshow && (
        <View
          style={{
            //width: normalize(20),
            // height:normalize(20),
            //backgroundColor: 'blue',
            position: 'absolute',
            alignSelf: 'center',
            right: normalize(15),
          }}>
          <TouchableOpacity onPress={() => onPress()}>
            <Image
              source={Icons.DownArrow}
              style={{
                resizeMode: 'contain',
                height: normalize(5),
                width: normalize(10),
                tintColor: 'black',
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* calender */}
      {props.calenderShown && (
        <View
          style={{
            //width: normalize(20),
            // height:normalize(20),
            //backgroundColor: 'blue',
            position: 'absolute',
            alignSelf: 'center',
            right: normalize(15),
          }}>
          <TouchableOpacity onPress={() => onPress()}>
            <Image
              source={Icons.calender}
              style={{
                resizeMode: 'contain',
                height: normalize(17),
                width: normalize(17),
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* checkbox */}
      {props.checkedShown && (
        <View
          style={{
            //width: normalize(20),
            // height:normalize(20),
            //backgroundColor: 'blue',
            position: 'absolute',
            alignSelf: 'center',
            right: normalize(15),
          }}>
          <TouchableOpacity
            onPress={() => {
              onPress();
            }}>
            <Image
              source={props.userOption ? Icons.checked : Icons.unchecked}
              resizeMode="contain"
              style={{
                height: normalize(15),
                width: normalize(15),
                tintColor: Colors.orange,
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
