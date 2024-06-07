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
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {useNavigation} from '@react-navigation/native';
import Textarea from 'react-native-textarea';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import {
  datewiseSlotRequest,
  expertWiseTimeSlotRequest,
  fetchTimeSlotRequest,
  scheduleCallManagementRequest,
} from '../../redux/reducer/ProfileReducer';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Loader from '../../utils/helpers/Loader';

let status = '';
const ScheduleACall = props => {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const navigation = useNavigation();
  const {id, ExpertData} = props?.route?.params;
  // console.log('kubgkugikyjgiuyg', id);
  // console.log('dfgdthtdhrt', ExpertData);
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [selectedButton, setSelectedButton] = useState(undefined);
  // console.log('jhvjyfvhjgtfh', selectedButton);
  const handleChangeText = newText => {
    setText(newText);
  };
  const [date, setDate] = useState(
    new Date(moment(new Date()).format('YYYY-MM-DD')),
  );
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  console.log('uklhuikhdfuikhrw', data);

  // useEffect(() => {
  //   connectionrequest()
  //     .then(() => {
  //       // dispatch(fetchTimeSlotRequest(id));
  //       dispatch(datewiseSlotRequest());
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       showErrorAlert('Please connect to internet');
  //     });
  // }, []);

  function datePostFunc(d) {
    if (date == '') {
      showErrorAlert('Please enter date');
    } else {
      let obj = new FormData();
      obj.append('expert_id', id);
      obj.append('date', moment(d).format('YYYY-MM-DD'));

      console.log('srgerge', obj);
      connectionrequest()
        .then(() => {
          dispatch(expertWiseTimeSlotRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  function scheduleCallFunc() {
    if (text == '') {
      showErrorAlert('Please enter subject');
    } else if (text1 == '') {
      showErrorAlert('Please enter description');
    } else if (startTime == '') {
      showErrorAlert('Please select slot');
    }
    // else if (selectedButton == undefined) {
    //   showErrorAlert('Please select slot');
    // }
    else {
      let obj = new FormData();
      obj.append('expert_id', id);
      obj.append('call_subject', text);
      obj.append('call_description', text1);
      obj.append('call_date', moment(date).format('YYYY-MM-DD'));
      obj.append('call_slot_from', startTime);
      obj.append('call_slot_to', endTime);
      // obj.append('expert_id', 50);
      // obj.append('call_subject', 'jhvhghbvsd');
      // obj.append('call_description', "text1");
      // obj.append('call_date', '2023-10-10');
      // obj.append('call_slot_from', '08:42 PM');
      // obj.append('call_slot_to', '09:42 PM');

      console.log('srgerge', obj);
      connectionrequest()
        .then(() => {
          selectedButton == undefined
            ? Alert.alert('Please select another date or empty slot')
            : dispatch(scheduleCallManagementRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  }

  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      // case 'Profile/fetchTimeSlotRequest':
      //   status = ProfileReducer?.status;
      //   break;
      // case 'Profile/fetchTimeSlotSuccess':
      //   status = ProfileReducer?.status;
      //   setData(ProfileReducer?.fetchTimeSlotResponse?.data);
      //   break;
      // case 'Profile/fetchTimeSlotFailure':
      //   status = ProfileReducer?.status;
      //   break;
      //////////////////////////////////
      case 'Profile/expertWiseTimeSlotRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/expertWiseTimeSlotSuccess':
        status = ProfileReducer?.status;
        setData(ProfileReducer?.expertWiseTimeSlotResponse?.data);
        break;
      case 'Profile/expertWiseTimeSlotFailure':
        status = ProfileReducer?.status;
        break;
      //////////////////////////////////
      case 'Profile/scheduleCallManagementRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/scheduleCallManagementSuccess':
        props?.navigation?.goBack();
        status = ProfileReducer?.status;
        break;
      case 'Profile/scheduleCallManagementFailure':
        status = ProfileReducer?.status;
        break;
    }
  }
  const renderItem1 = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          // [styles.button,{backgroundColor: item?.is_available == 0 ? 'red' : '#fff'}],
          styles.button,
          selectedButton == index
            ? styles.selectedButton
            : styles.outlinedButton,
        ]}
        onPress={() => {
          console.log('jgvfghjfhgfh', item);
          setStartTime(item?.From_Working_Hours);
          setEndTime(item?.To_Working_Hours);
          item?.is_available == 0
            ? Alert.alert('This slot is already booked for another user')
            : setSelectedButton(index);
        }}>
        <Text
          style={[
            styles.buttonText,
            selectedButton == index
              ? styles.selectedButtonText
              : styles.outlinedButtonText,
          ]}>
          {item?.From_Working_Hours} - {item?.To_Working_Hours}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Loader
        visible={
          ProfileReducer.status == 'Profile/scheduleCallManagementRequest'
        }
      />
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
                fontSize: normalize(13),
                color: '#000000',
                fontWeight: Platform.OS == 'ios' ? '400' : '700',
                lineHeight: 21,
              }}>
              Schedule a call
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
                fontFamily: Fonts?.Poppins_Bold,

                fontSize: 20,
                lineHeight: 24,
              }}>
              Schedule a call
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
                source={{uri: ExpertData?.profile_photo_url}}
                style={{
                  width: normalize(43),
                  height: normalize(42),
                  borderRadius: 5,
                }}
              />
              <View style={{width: '80%',}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // backgroundColor: 'red',
                    
                    justifyContent: 'space-between',
                    bottom: normalize(5),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.Poppins_SemiBold,
                      fontSize: normalize(13),
                      color: '#000000',
                      textTransform: 'capitalize',
                      // bottom: normalize(8),
                      textAlign: 'left',
                      // right:
                      //   Platform.OS === 'android' ? normalize(12) : normalize(15),
                    }}>
                    {ExpertData?.full_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // bottom: normalize(15),
                    }}>
                    <Image
                      source={Icons.star}
                      style={{
                        width: normalize(10),
                        height: normalize(10),
                        right: normalize(3),
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts?.Poppins_Medium,
                        fontSize: normalize(11),
                        color: '#5C6066',
                        fontWeight: '400',
                        marginLeft: normalize(2), // Add margin to separate icon and text
                      }}>
                      {ExpertData?.rating}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Image
                    source={Icons.vid}
                    style={{width: normalize(14), height: normalize(14), resizeMode: 'contain'}}
                  />
                  <Text
                    style={{
                      fontFamily: Fonts?.Poppins_Medium,
                      fontSize: normalize(11),
                      color: '#5C6066',
                      fontWeight: '400',
                      marginLeft: normalize(6),
                    }}>
                    $5/minute 
                  </Text>
                </View>
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
                fontFamily: Fonts?.Poppins_SemiBold,
                fontSize:normalize (14),
                lineHeight: 24,
              }}>
              Call Subject
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
            <Text style={styles.headerText}>
              Please choose a date from here
            </Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={{
                height: normalize(35),
                width: '100%',
                borderRadius: normalize(8),
                borderWidth: normalize(1),
                borderColor: '#5C6066',
                justifyContent: 'center',
                paddingLeft: normalize(10),
              }}>
              <Text style={styles.headerText}>
                {' '}
                {moment(date).format('MMM DD, YYYY')}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.headerText, {marginTop: normalize(10)}]}>
              Duration
            </Text>
            {data?.length == 0 ? (
              <Text style={[styles.buttonText, {fontSize: normalize(15)}]}>
                No Slot Found!
              </Text>
            ) : (
              <View style={styles.buttonContainer}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={renderItem1}
                  contentContainerStyle={{paddingRight: '20%'}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
                {/* {data?.map((item, index) => (
                  <>
                   
                  </>
                ))} */}
              </View>
            )}
          </View>
          <View
            style={{
              marginHorizontal: normalize(20),
              paddingTop: normalize(20),
            }}>
            <View
              style={{
                marginTop: normalize(2),
                marginBottom: normalize(10),
                borderBottomWidth: 1,
                borderBottomColor: '#D8D8D8',
              }}
            />
            <Text
              style={{
                color: '#000000',
                fontFamily: Fonts?.Poppins_SemiBold,

                fontSize: normalize(12),
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
                    fontSize: normalize(11.5),
                  }}>
                  + Add New Payment Method
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: normalize(18),
                  marginBottom: normalize(10),
                  borderBottomWidth: 1,
                  borderBottomColor: '#D8D8D8',
                }}
              />
            </View>
          </View>
          <View>
            <View style={styles.policyContainer}>
              <Text style={styles.policyTitle}>Scheduling Policy</Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
            </View>
            <View style={styles.policyContainer}>
              <Text style={styles.policyTitle}>Rescheduling Policy</Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
            </View>
            <View style={styles.policyContainer}>
              <Text style={styles.policyTitle}>Cancellation Policy</Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
              <Text style={styles.policyText}>
                {'\u2022'} Lorem Ipsum is simply dummy text of the printing.
              </Text>
            </View>
          </View>
          <View
            style={{
              //   marginHorizontal: normalize(25),
              paddingTop: normalize(30),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: normalize(140),
                height: normalize(46),
                backgroundColor: 'rgba(27, 172, 227, 1)',
                justifyContent: 'center',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                scheduleCallFunc();
                // navigation.navigate('Video')
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
                Lock In ($15)
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          minimumDate={new Date(moment(new Date()).format('YYYY-MM-DD'))}
          // maximumDate={new Date(moment(new Date(date1)).format('YYYY-MM-DD'))}
          onConfirm={v => {
            setOpen(false);
            setDate(v);
            datePostFunc(v);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default ScheduleACall;

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
    paddingVertical:normalize(7),
    paddingHorizontal:normalize(8),
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
    paddingVertical:normalize(7),
    paddingHorizontal:normalize(8),
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: normalize(12),
    color: '#333',
  
  },
  containering: {
    marginHorizontal: 25,
    paddingTop: 20,
  },
  headerText: {
    color: '#000000',
    fontFamily: Fonts?.Poppins_SemiBold,
    fontWeight: Platform.OS == 'ios' ? null : '700',
    fontSize: 14,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
  },
  button: {
    width: normalize(120),
    height: normalize(30),
    borderRadius: normalize(60),
    marginRight: normalize(5),
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
    fontSize: 12,
    color:'black'
  },
  selectedButtonText: {
    color: '#fff',
  },
  outlinedButtonText: {
    color: '#000',
  },
  policyContainer: {
    marginHorizontal: 25,
    paddingTop: 1,
  },
  policyTitle: {
    color: '#000000',
    fontFamily: Fonts?.Poppins_SemiBold,
    fontSize: normalize(12),
    lineHeight: 24,
    marginVertical:normalize(5)
  },
  policyText: {
    // Add left margin to create space for the bullet point
    marginTop: 5, // Add top margin to separate lines
    marginBottom:normalize(3),
    color:'black'
  },
});
