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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Textarea from 'react-native-textarea';
import connectionrequest from '../../utils/helpers/NetInfo';
import { useDispatch, useSelector } from 'react-redux';
import { termsConditionRequest } from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import HTMLTextComponent from '../../components/HTMLTextComponent';

const AskAQuestion = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [selectedButton, setSelectedButton] = useState(1); // Initial selected button
  const isFocus=useIsFocused();
  const maxCharacters = 50;
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  const handleChangeText = newText => {
    setText(newText);
  };

  const characterCount = text?.length;
  const characterCountText = `${characterCount}/${maxCharacters}`;

  useEffect(()=>{
    connectionrequest()
    .then(() => {
      dispatch(termsConditionRequest());
    })
    .catch((err) => {
        showErrorAlert("Please connect to Internet", err)
   })
  },[isFocus]);


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
              <Image
                source={Icons.lefts}
                style={{width: 18, height: 18, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: normalize(70),
                fontFamily: Fonts?.Poppins_Medium,
                fontSize: normalize(14),
                color: '#000000',

                lineHeight: 21,
              }}>
              Ask a question
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
                
                fontSize: 20,
                lineHeight: 24,
              }}>
              Ask a question
            </Text>
            <View
              style={{
                marginTop: normalize(10),
                marginBottom: normalize(10),
                borderBottomWidth: 1,
                borderBottomColor: '#D8D8D8',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 2,
                justifyContent: 'space-between',
              }}>
              <Image
                source={Icons.hero}
                style={{
                  width: normalize(43),
                  height: normalize(42),
                  borderRadius: 5,
                }}
              />
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: Fonts?.Poppins_Medium,
                    fontSize: normalize(14),
                    color: '#000000',
                    
                    bottom: normalize(8),
                    right:
                      Platform.OS === 'android' ? normalize(12) : normalize(15),
                  }}>
                  Thomas Ellsworth
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={Icons.msgs}
                      style={{width: 11, height: 11}}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontSize: normalize(12),
                        color: '#5C6066',
                        fontWeight: '400',
                        marginLeft: 4, // Add margin to separate icon and text
                      }}>
                      $5/each
                    </Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 16 /* Add your desired spacing */,
                    }}></View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={Icons.video}
                      style={{width: 11, height: 11}}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontSize: normalize(12),
                        color: '#5C6066',
                        fontWeight: '400',
                        marginLeft: 4, // Add margin to separate icon and text
                      }}>
                      $15/each
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  bottom: normalize(15),
                }}>
                <Image source={Icons.star} style={{width: 10, height: 10}} />
                <Text
                  style={{
                    fontFamily: Fonts?.Poppins_Medium,
                    fontSize: normalize(12),
                    color: '#5C6066',
                    fontWeight: '400',
                    marginLeft: 4, // Add margin to separate icon and text
                  }}>
                  4.9
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(10),
                marginBottom: normalize(10),
                borderBottomWidth: 1,
                borderBottomColor: '#D8D8D8',
              }}
            />
          </View>
          <View
            style={{
              marginHorizontal: normalize(25),
              paddingTop: normalize(5),
            }}>
            <Text
              style={{
                color: '#000000',
                fontFamily: Fonts?.Poppins_Medium,
                
                fontSize: 16,
                lineHeight: 24,
              }}>
              Post Your Question
            </Text>
            <View style={styles.container}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={handleChangeText}
                defaultValue={text}
                maxLength={50}
                placeholder={'Type Here'}
                placeholderTextColor={'#5C6066'}
              />
            </View>
            <View style={styles.description}>
              <Textarea
                containerStyle={styles.textareaContainer1}
                style={styles.textarea}
                onChangeText={text => setText1(text)}
                defaultValue={text1}
                maxLength={1000}
                placeholder={'Description'}
                placeholderTextColor={'#5C6066'}
              />
            </View>
          </View>
          <View style={styles.containering}>
            <Text style={styles.headerText}>Choose Format</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton == 1
                    ? styles.selectedButton
                    : styles.outlinedButton,
                ]}
                onPress={() => setSelectedButton(1)}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton == 1
                      ? styles.selectedButtonText
                      : styles.outlinedButtonText,
                  ]}>
                  Text answer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton == 2
                    ? styles.selectedButton
                    : styles.outlinedButton,
                ]}
                onPress={() => setSelectedButton(2)}>
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton == 2
                      ? styles.selectedButtonText
                      : styles.outlinedButtonText,
                  ]}>
                  Video answer
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: normalize(25),
              paddingTop: normalize(20),
            }}>
            <View
              style={{
                marginTop: normalize(10),
                marginBottom: normalize(10),
                borderBottomWidth: 1,
                borderBottomColor: '#D8D8D8',
              }}
            />
            <Text
              style={{
                color: '#000000',
                fontFamily: Fonts?.Poppins_Bold,

                fontSize: 14,
                lineHeight: 24,
              }}>
              Select Payment Method
            </Text>

            <View style={{paddingTop: 10}}>
              <TouchableOpacity
                style={{
                  width: normalize(200),
                  height: normalize(36),
                  backgroundColor: 'rgba(238, 238, 238, 1)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  elevation: 1,
                }}>
                <Text
                  style={{
                    color: 'rgba(0, 0, 0, 1)',
                    lineHeight: 18,
                    fontFamily: Fonts?.Poppins_Regular,
                    fontSize: normalize(11.2),
                  }}>
                  + Add New Payment Method
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: normalize(10),
                  marginBottom: normalize(10),
                  borderBottomWidth: 1,
                  borderBottomColor: '#D8D8D8',
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: normalize(25),
              paddingTop: normalize(1),
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: Fonts?.Poppins_Bold,

                fontSize: 14,
                lineHeight: 24,
              }}>
              Terms and Conditions
            </Text>
            {/* <Text
              style={{
                fontFamily: Fonts.Poppins_Regular,
                fontSize: normalize(10),
                color: 'black',
              }}>
              Lorem Ipsum is simply dummy text of the printing.
            </Text> */}
            <HTMLTextComponent
            htmlContent={ProfileReducer?.termsConditionResponse?.text_content }
          />
          </View>
          <View
            style={{
              //   marginHorizontal: normalize(25),
              paddingTop: normalize(30),
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: normalize(140),
                height: normalize(46),
                backgroundColor: 'rgba(27, 172, 227, 1)',
                paddingTop: 18,
                paddingRight: 36,
                paddingBottom: 18,
                paddingLeft: 36,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (selectedButton == 2) {
                  navigation.navigate('VideoChat');
                } else {
                  navigation.navigate('Chat');
                }
              }}>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 1)',
                  fontFamily: Fonts?.Poppins_Medium,
                  fontWeight: '500',
                  fontSize: normalize(12),
                  lineHeight: 24,
                  textAlign: 'center',
                }}>
                Lock In ($5)
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default AskAQuestion;

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
  container: {
    // borderWidth:1,
    paddingTop: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    paddingTop: normalize(18),
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 5,
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
    fontSize: normalize(11),
    color: '#333',
    fontFamily: Fonts.Poppins_Regular,
    marginLeft: normalize(8)
  },
  containering: {
    marginHorizontal: 25,
    paddingTop: 20,
  },
  headerText: {
    color: '#000000',
    fontFamily: Fonts?.Poppins_Medium,
    
    fontSize: normalize(11.5),
    lineHeight: 24,
    marginLeft: normalize(5)
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    marginHorizontal: 30,
  },
  button: {
    width: 162,
    height: 50,
    borderRadius: 50,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  outlinedButton: {
    borderColor: '#000000',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: '500',
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: 14,
  },
  selectedButtonText: {
    color: '#fff',
  },
  outlinedButtonText: {
    color: '#000',
  },
});
