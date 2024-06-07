import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {useNavigation} from '@react-navigation/native';
import Textarea from 'react-native-textarea';

const TextAnswer = () => {
  const navigation = useNavigation();
  const [text1, setText1] = useState('');
  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container_wrapper}>
            <TouchableOpacity
              style={{
                width: normalize(40),
                height: normalize(40),
                borderRadius: 50,
                backgroundColor: '#ECECEC',
                elevation: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Image source={Icons.lefts} style={{width: 18, height: 20}} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: normalize(90),
                fontFamily: Fonts?.Poppins_Medium,
                fontSize: normalize(14),
                color: '#000000',
                fontWeight: '400',
                lineHeight: 21,
              }}>
              Chat
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: normalize(25),
              paddingTop: normalize(20),
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: Fonts?.Poppins_Medium,
                fontWeight: '600',
                fontSize: 20,
                lineHeight: 24,
              }}>
              Ask A question
            </Text>
          </View>
          <View style={styles.description}>
            <Textarea
              containerStyle={styles.textareaContainer1}
              style={styles.textarea}
              onChangeText={text => setText1(text)}
              defaultValue={text1}
              // maxLength={1000}
              placeholder={'Write Your Answer'}
              placeholderTextColor={'#5C6066'}
            />
          </View>
          <View style={{justifyContent:'center',alignItems:'center',paddingTop:normalize(20)}}>
            <TouchableOpacity
              style={{
                width: normalize(147),
                height: normalize(45),
                backgroundColor: 'rgba(27, 172, 227, 1)',
                paddingTop: 18,
                paddingRight: 36,
                paddingBottom: 18,
                paddingLeft: 36,
                borderRadius:50,
                justifyContent:'center',
                alignItems:'center'
              }} 
              onPress={()=>navigation?.navigate('Chat')}
              >
              <Text style={{
                color:'rgba(255, 255, 255, 1)',
                fontFamily:Fonts?.Poppins_Medium,
                fontWeight:'500',
                fontSize:14,
                lineHeight:21
              }} >Submit Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default TextAnswer;

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
    // justifyContent: 'space-between',
    // paddingHorizontal: normalize(20),
    marginHorizontal: normalize(20),
    paddingTop: Platform?.OS === 'ios' ? normalize(25) : normalize(45),
  },
  textareaContainer: {
    height: 91,
    padding: 5,
    backgroundColor: '#F8F8F8',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
    borderRadius: 10,
  },
  textareaContainer1: {
    height: 173,
    padding: normalize(8),
    backgroundColor: '#F8F8F8',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
    borderRadius: 10,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  description: {
    paddingTop: normalize(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(20),
  },
});
