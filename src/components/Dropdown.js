import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/dimen'
import Modal from 'react-native-modal';
import { Fonts, Icons } from '../themes/ImagePath';
import { Colors } from '../themes/Colors';


export default function Dropdown(props) {
  const [visible, setVisible] = useState(false);



  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }
  return (
    <TouchableOpacity
          style={{
            //  width: '87%',
            width: props.width,
            height: props.height,
            // height:normalize(5),
            borderRadius: props.borderRadius,//props.borderRadius,
           borderWidth:props.borderWidth,
            borderColor: props.borderColor,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: props.alignSelf,
            marginTop: props.marginTop,
            justifyContent: 'space-between',
            paddingHorizontal: props.paddingHorizontal,
            paddingLeft: props.paddingLeft,
            borderBottomWidth: props.borderBottomWidth,
            backgroundColor: props.backgroundColor,
            margin: props.margin,
            marginLeft: props.marginLeft,
            // marginRight:normalize(30),
            marginRight: props.TouchmarginRight,

            borderBottomColor: props.borderBottomColor,
            // paddingHorizontal
          }}
          onPress={() => {
            onPress();
          }}>
            {
              props.leftImage  ? <Image
              style={{
                height: props.LefticonHeight,
                width: props.leftImageWidth,
                tintColor: props.leftImagetintColor,
                // marginLeft: normalize(20),
              }}
              resizeMode={'contain'}
              source={props.LeftIcon}
            /> :null

            }
          <Text
            style={{
              fontSize: props.fontSize,
              fontFamily: props.fontFamily,
              color: props.color,
              width: '80%',
              marginLeft: props.iconMarginleft,
            }}>
            {props.value}
          </Text>

          {props.downArr && (
            <Image
              style={{
                height: props.iconHeight,
                width: props.iconWidth,
                tintColor: props.rightIcontintColor,
                // marginLeft: normalize(20),
              }}
              resizeMode={'contain'}
              source={props.rightIcon}
            />
          )}
        </TouchableOpacity>
  );
}

Dropdown.propTypes = {
  dataList: PropTypes.array,
  modalVisible: PropTypes.bool,
  onItemSelected: PropTypes.func,
  modalBgColor: PropTypes.string,
  modalMaxHeight: PropTypes.number,
  height: PropTypes.any,
  width: PropTypes.any,
  borderRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  marginTop: PropTypes.number,
  value: PropTypes.string,
  selectedvalues: PropTypes.any,
  placeholder: PropTypes.string,

  itemParam: PropTypes.string,
  valueParam: PropTypes.string,
  downArr: PropTypes.bool,
  itemWidth: PropTypes.any,
  alignSelf: PropTypes.string,
  borderBottomWidth: PropTypes.number,
  rightIcon: PropTypes.string,
  paddingLeft: PropTypes.number,
  fontSize: PropTypes.number,
  iconHeight: PropTypes.number,
  iconWidth: PropTypes.number,
  backgroundColor: PropTypes.string,
  leftIcon: PropTypes.string,
  margin: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  iconMarginleft: PropTypes.number,
  isLeftIcon: PropTypes.bool,
  rightIcontintColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  paddingHorizontal: PropTypes.number,
  color: PropTypes.any,
  fontFamily: PropTypes.any,
  selectedColor: PropTypes.any,
};

Dropdown.defaultProps = {
  dataList: [],
  modalVisible: false,
  onItemSelected: null,
  modalBgColor: Colors.light_brown,
  modalMaxHeight: normalize(300),
  height: normalize(45),
  width: '100%',
  borderRadius: null,
  // borderWidth: normalize(0),
  borderColor: null,
  marginTop: null,
  value: '',
  placeholder: '',
  itemParam: '',
  valueParam: '',
  downArr: true,
  itemWidth: '100%',
  alignSelf: 'center',
  borderBottomWidth: null,
  rightIcon: Icons.dwon,
  paddingLeft: null,
  fontSize: normalize(12),
  iconHeight: normalize(19),
  iconWidth: normalize(10),
  // backgroundColor: Colors.InputBackground,
  //leftIcon: Icons.location,
  margin: null,
  marginLeft: null,
  marginRight: null,
  iconMarginleft: normalize(0),
  isLeftIcon: false,
  // borderBottomColor: Colors.theme_red,
  paddingHorizontal: normalize(0),
  color: '#3A2228',
  fontFamily: Fonts.MontserratRegular,
  selectedColor: '#3A2228',
};
