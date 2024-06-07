import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';

import Modal from 'react-native-modal';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import Accrodian from '../../components/Accrodian';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import showErrorAlert from '../../utils/helpers/Toast';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  ExpertSchduleDataRequest,
  SlotCreateRequest,
  datewiseSlotRequest,
} from '../../redux/reducer/ProfileReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../themes/Colors';
import Button from '../../components/Button';
let status;

const ExCal = props => {
  const dispatch = useDispatch();

  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const navigation = useNavigation();
  const [selTime, setSelTime] = useState(1);
  const [activeDate, setActiveDate] = useState(2);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(tomorrow);
  const [datePickModal, setdatePickModal] = useState(false);
  const [FormTimeIndex, setFormTimeIndex] = useState(undefined);
  const [WorkingHours, setWorkingHours] = useState(new Date());
  const [WorkingHoursModal, setWorkingHoursModal] = useState(false);
  const [WorkingHours1, setWorkingHours1] = useState(new Date());
  const [ToTimeIndex, setToTimeIndex] = useState(undefined);
  const [WorkingHoursModal1, setWorkingHoursModal1] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [minTime, setMinTime] = useState(undefined);
  const [dates, setDates] = useState([]);
  const [userName, setuserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userSchduleDate, setuserSchduleDate] = useState('');
  const [userSchduleTime, setuserSchduleTime] = useState('');
  const [userImage, setuserImage] = useState('');
  const [ConsulationModal, setConsulationModal] = useState(false);

  const [formArray, setFromArray] = useState([
    {
      From_Working_Hours: new Date(),
      To_Working_Hours: new Date(),
    },
  ]);
  useEffect(() => {
    setConsulationModal(true);
  }, [])
  

  const renderItem1 = ({item, index}) => {
    console.log("index222",item);
    return (
      <TouchableOpacity
        onPress={() => {
          
          setSelTime(index),
            connectionrequest()
              .then(() => {
                dispatch(
                  ExpertSchduleDataRequest({
                    From_Working_Hours: item?.From_Working_Hours,
                    To_Working_Hours: item?.To_Working_Hours,
                    date: dates.toISOString().slice(0, 10),
                  }),
                );
              })
              .catch(err => {
                console.log('err', err);
                showErrorAlert('Please connect to Internet', err);
              });
        }}
        style={[
          styles.timeCon,
          {backgroundColor: selTime == index ? 'black' : '#EEEEEE'},
        ]}>
        <Text
          style={[
            styles.timeTxt,
            {color: selTime == index ? 'white' : 'black'},
          ]}>
          {/* {`item?.From_Working_Hours`} */}
          {`${item?.From_Working_Hours}-${item?.To_Working_Hours}`}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const formWorkingHours = (index, value) => {
    const temp = [...formArray];
    temp[index].From_Working_Hours = value;
    setFromArray(temp);
  };
  const ToWorkingHours = (index, value) => {
    const temp = [...formArray];
    temp[index].To_Working_Hours = value;
    setFromArray(temp);
  };

  const calculateTimeDifference = index => {};

  function validateFormArray(formArray) {
    const minDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
    const maxDuration = 60 * 60 * 1000; // 1 hour in milliseconds
    const overlappingSlots = [];

    for (const [index, item] of formArray.entries()) {
      const fromTime = new Date(item.From_Working_Hours).getTime();
      const toTime = new Date(item.To_Working_Hours).getTime();
      const duration = toTime - fromTime;

      if (duration < minDuration) {
        overlappingSlots.push(
          `Row ${index + 1}: Duration is less than 15 minutes.`,
        );
      } else if (duration > maxDuration) {
        overlappingSlots.push(
          `Row ${index + 1}: Duration is greater than 1 hour.`,
        );
      }
    }

    return overlappingSlots;
  }

  function checkForOverlaps(formArray, slotTimings) {
    const overlappingSlots = [];

    for (const [index, item] of formArray.entries()) {
      const fromTime = new Date(item.From_Working_Hours).getTime();
      const toTime = new Date(item.To_Working_Hours).getTime();

      for (const [slotStart, slotEnd] of Object.entries(slotTimings)) {
        const start = new Date(slotStart).getTime();
        const end = new Date(slotEnd).getTime();

        if (fromTime < end && toTime > start) {
          overlappingSlots.push(
            `Row ${index + 1} overlaps with another booked slot.`,
          );
          break;
        }
      }
    }

    return overlappingSlots;
  }

  function checkForOverlaps(formArray) {
    const slotTimings = {}; // To store booked slot timings
    const overlappingSlots = [];

    for (const [index, item] of formArray.entries()) {
      const fromTime = new Date(item.From_Working_Hours).getTime();
      const toTime = new Date(item.To_Working_Hours).getTime();

      for (const [slotStart, slotEnd] of Object.entries(slotTimings)) {
        const start = new Date(slotStart).getTime();
        const end = new Date(slotEnd).getTime();

        if (fromTime < end && toTime > start) {
          overlappingSlots.push(
            `Row ${index + 1} overlaps with another booked slot.`,
          );
          break;
        }
      }

      // Store the booked slot timing for the current form entry
      slotTimings[item.From_Working_Hours] = item.To_Working_Hours;
    }

    return overlappingSlots;
  }

  function Onsave() {
    const minDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
    const maxDuration = 60 * 60 * 1000; // 1 hour in milliseconds
    const overlappingSlots = validateFormArray(formArray);

    if (overlappingSlots?.length === 0) {
      const overlaps = checkForOverlaps(formArray);

      if (overlaps?.length === 0) {
        const obj = {
          date: moment(date).format('MM/DD/YYYY'),
          timeslot: formArray.map(item => ({
            From_Working_Hours: moment(item.From_Working_Hours).format(
              'hh:mm A',
            ),
            To_Working_Hours: moment(item.To_Working_Hours).format('hh:mm A'),
          })),
        };

        connectionrequest()
          .then(() => {
            dispatch(SlotCreateRequest(obj));
          })
          .catch(err => {
            console.log('err', err);
            showErrorAlert('Please connect to Internet', err);
          });
      } else {
        overlaps.forEach(message => {
          setTimeout(() => {
            showErrorAlert(message);
          }, 1500);
        });
      }
    } else {
      overlappingSlots.forEach(message => {
        setTimeout(() => {
          showErrorAlert(message);
        }, 1500);
      });
    }
  }

  function selectDate(date) {
    setDates(date);
    let d = date.toISOString().slice(0, 10);

    let obj = {date: d};
    console.log('DATE========', obj);
    connectionrequest()
      .then(() => {
        dispatch(datewiseSlotRequest(obj));
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/SlotCreateRequest':
        status = ProfileReducer.status;

        break;

      case 'Profile/SlotCreateSuccess':
        status = ProfileReducer.status;
        setOpen(!open);
        setFromArray([
          {
            From_Working_Hours: new Date(),
            To_Working_Hours: new Date(),
          },
        ]);
        break;

      case 'Profile/SlotCreateFailure':
        status = ProfileReducer.status;

        break;

      case 'Profile/ExpertSchduleDataRequest':
        status = ProfileReducer.status;

        break;

      case 'Profile/ExpertSchduleDataSuccess':
        status = ProfileReducer.status;
        setConsulationModal(false);
        setuserName(
          ProfileReducer?.ExpertSchduleDataResponse?.data?.user?.full_name,
        );
        setuserEmail(
          ProfileReducer?.ExpertSchduleDataResponse?.data?.user?.email,
        );
        setuserSchduleDate(
          ProfileReducer?.ExpertSchduleDataResponse?.data?.call_date,
        );
        setuserSchduleTime(
          `${ProfileReducer?.ExpertSchduleDataResponse?.data?.call_slot_from}-${ProfileReducer?.ExpertSchduleDataResponse?.data?.call_slot_to}`,
        );
        setuserImage(
          ProfileReducer?.ExpertSchduleDataResponse?.data?.user
            ?.profile_photo_url,
        );
        break;

      case 'Profile/ExpertSchduleDataFailure':
        status = ProfileReducer.status;

        break;

      case 'Profile/datewiseSlotRequest':
        status = ProfileReducer.status;
        setuserEmail('');
        setuserImage('');
        setuserName('');
        setuserSchduleDate('');
        setuserSchduleTime('');
        setConsulationModal(true);
        break;

      case 'Profile/datewiseSlotSuccess':
        status = ProfileReducer.status;
        break;

      case 'Profile/datewiseSlotFailure':
        status = ProfileReducer.status;

        break;
    }
  }

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '20%'}}
          showsVerticalScrollIndicator={false}>
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

            <Text style={styles.txt1}>Calendar</Text>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Notification')}>
                <Image
                  source={Icons.Notification}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{
              marginTop: normalize(20),
              marginHorizontal: normalize(10),
              backgroundColor: 'white',
              borderRadius: normalize(8),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
            onPress={() => {
              setOpen(true);

              setToTimeIndex(0);
            }}>
            {/* </View> */}
            <CalendarStrip
              calendarAnimation={{type: 'sequence', duration: 30}}
              selectedDate={moment()}
              iconLeft={Icons.left}
              iconRight={Icons.left}
              onDateSelected={date => selectDate(date)}
              // calendarHeaderFormat={moment(dates).format('ll')}
              style={{
                height: normalize(100),
                paddingTop: normalize(10),
                paddingBottom: normalize(10),
                width: '100%',
                paddingHorizontal: normalize(10),
                // backgroundColor: Colors.yellow,
              }}
              calendarHeaderStyle={{color: 'black'}}
              // calendarColor={'#7743CE'}
              dateNumberStyle={{
                fontSize: normalize(9),
                marginTop: normalize(5),
                fontFamily: Fonts.Poppins_Regular,
                color: 'black',
                // backgroundColor:'red'
              }}
              dateNameStyle={{
                fontSize: normalize(9),
                fontFamily: Fonts.EncodeSansRegular,
                color: 'black',
                // backgroundColor:'red'
              }}
              disabledDateNameStyle={{color: 'grey'}}
              disabledDateNumberStyle={{color: 'grey'}}
              scrollable={true}
              iconContainer={{
                bottom: normalize(40),
                backgroundColor: Colors.backGround,
                padding: normalize(5),
                borderRadius: normalize(30),
              }}
              iconLeftStyle={{height: normalize(10), width: normalize(10)}}
              iconRightStyle={{
                height: normalize(10),
                width: normalize(10),
                transform: [{rotate: '180deg'}],
              }}
              highlightDateContainerStyle={{
                backgroundColor: Colors.heilightBlue,
                height: normalize(32),
                width: normalize(32),
              }}
              highlightDateNameStyle={{
                color: 'white',
                fontSize: normalize(10),
              }}
              highlightDateNumberStyle={{
                color: 'white',
                fontSize: normalize(11),
              }}
            />
          </TouchableOpacity>

          <View
            style={{marginTop: normalize(10), marginHorizontal: normalize(20)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ProfileReducer?.datewiseSlotRes?.data}
              renderItem={renderItem1}
              numColumns={2}
              ListEmptyComponent={() => {
                return (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Medium,
                      textAlign: 'center',
                    }}>
                    No slot booking on this date
                  </Text>
                );
              }}
            />
          </View>
          {ConsulationModal ? null : (
            <>
              <Text style={styles.uptxt}>Consultation Requests</Text>
              <View style={{marginTop: normalize(10)}}>
                {/* <FlatList
              showsVerticalScrollIndicator={false}
              data={ProfileReducer?.ExpertSchduleDataResponse?.data              }
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: '20%'}}
            /> */}
                <View style={styles.upView}>
                  <View style={styles.upTopView}>
                    <Image
                      source={{
                        uri: userImage,
                      }}
                      style={styles.icon1}
                    />

                    <View style={{width: '60%', left: normalize(5)}}>
                      <Text style={styles.txt2}>{userName}</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.txt3}>Business</Text>
                        <View
                          style={{
                            borderTopWidth: normalize(0.9),
                            borderColor: '#5C60664D',
                            width: '60%',
                            alignSelf: 'center',
                            left: normalize(5),
                          }}
                        />
                      </View>

                      <View
                        style={{
                          marginTop: normalize(5),
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View style={styles.cir}>
                            <Image
                              source={Icons.mail}
                              style={styles.icon2}
                              // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
                            />
                          </View>
                          <Text 
                           numberOfLines={1}
                          style={[styles.txt4,{width:'85%'}]}>{userEmail}</Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View style={styles.cir}>
                            <Image
                              source={Icons.calenders}
                              style={styles.icon2}
                            />
                          </View>
                          <Text style={styles.txt4}>
                            {moment(userSchduleDate).format('ll')}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center',}}>
                          <View style={styles.cir}>
                            <Image source={Icons.clock} style={styles.icon2} />
                          </View>
                          <Text 
                         

                          style={styles.txt4}>{userSchduleTime}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      borderTopWidth: normalize(0.9),
                      borderColor: '#5C60664D',
                      height: 1,
                      width: '100%',
                      marginTop: normalize(15),
                    }}
                  />

                  <Button
                    width={'60%'}
                    backgroundColor={'#33BC7A'}
                    alignSelf={'center'}
                    titlesingle={true}
                    title={'Lock in'}
                    textColor={'white'}
                    textAlign={'center'}
                    fontFamily={Fonts.Poppins_Medium}
                    fontSize={normalize(12)}
                    borderRadius={normalize(20)}
                    marginTop={normalize(10)}
                  />
                </View>
              </View>
            </>
          )}
        </ScrollView>
        <View>
          <Modal isVisible={open} onBackdropPress={() => setOpen(false)}>
            <View
              style={{
                height: normalize(350),
                width: '95%',
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: normalize(10),
                padding: normalize(10),
                bottom: normalize(35),
                // paddingHorizontal: normalize(20),
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.offTxt, {marginTop: normalize(20)}]}>
                  Off Days
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setdatePickModal(!datePickModal);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: normalize(10),
                    marginTop: normalize(12),
                    backgroundColor: '#F8F8F8',
                    padding: normalize(15),
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: normalize(11),
                  }}>
                  <Text style={styles.txtdate}>
                    {' '}
                    {moment(date).format('MM/DD/YYYY')}
                  </Text>
                  <View>
                    <Image
                      source={Icons.calcal}
                      style={{
                        height: normalize(15),
                        width: normalize(15),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </TouchableOpacity>

                <View
                  style={[
                    styles.timeCon,
                    {marginTop: normalize(20), backgroundColor: 'black'},
                  ]}>
                  <Text style={[styles.timeTxt, {color: 'white'}]}>
                    {moment(date).format('MM/DD/YYYY')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={[styles.offTxt, {}]}>Working Hours</Text>
                  {formArray?.length == 10 ? null : (
                    <TouchableOpacity
                      style={{padding: normalize(10)}}
                      onPress={() => {
                        let temp = [...formArray];
                        temp.push({
                          From_Working_Hours:
                            formArray[ToTimeIndex]?.To_Working_Hours,
                          To_Working_Hours: new Date(),
                        });
                        setFromArray(temp);
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: normalize(12),
                          fontFamily: Fonts.Poppins_Medium,
                        }}>
                        Add More
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {formArray?.map((formData, index) => {
                  console.log('indexss', index);

                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '93%',
                          marginTop: normalize(18),
                          alignItems: 'center',
                          // backgroundColor: 'blue',
                          padding: normalize(5),
                        }}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#F8F8F8',
                            // backgroundColor: 'yellow',

                            width: '40%',
                            // alignSelf:'center',

                            borderRadius: normalize(11),
                            padding: normalize(10),
                          }}
                          onPress={() => {
                            setWorkingHoursModal(!WorkingHoursModal);
                            setFormTimeIndex(index);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',

                              width: '70%',
                            }}>
                            <Text style={[styles.txtdate, {}]}>
                              {moment(formData?.From_Working_Hours).format(
                                'hh:mm',
                              )}
                            </Text>
                            {/* <Text style={styles.txtdate}>To</Text>
                <Text style={styles.txtdate}>16:30</Text> */}
                          </View>
                          <Image
                            source={Icons.time}
                            style={{
                              height: normalize(15),
                              width: normalize(15),
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                        <Text style={styles.txtdate}>To</Text>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#F8F8F8',
                            // backgroundColor: 'red',

                            width: '40%',
                            // alignSelf:'center',

                            borderRadius: normalize(11),
                            padding: normalize(10),
                          }}
                          onPress={() => {
                            setWorkingHoursModal1(!WorkingHoursModal1);
                            index > 0 &&
                              setMinTime(formData?.From_Working_Hours);
                            setWorkingHours1(formData?.From_Working_Hours);
                            setToTimeIndex(index);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',

                              width: '50%',
                            }}>
                            <Text style={[styles.txtdate, {}]}>
                              {moment(formData?.To_Working_Hours).format(
                                'hh:mm',
                              )}
                            </Text>
                            {/* <Text style={styles.txtdate}>To</Text>
                <Text style={styles.txtdate}>16:30</Text> */}
                          </View>
                          <Image
                            source={Icons.time}
                            style={{
                              height: normalize(15),
                              width: normalize(15),
                              resizeMode: 'contain',
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      {index == 0 ? null : (
                        <TouchableOpacity
                          onPress={() => {
                            let xyz = formArray.splice(index, 1);
                            console.log(formArray, 'lksklkkkl');
                            setRefresh(xyz);
                            setFromArray(formArray);
                          }}>
                          <Image
                            source={Icons.remove}
                            style={{
                              height: normalize(15),
                              width: normalize(15),
                              // position: 'absolute',
                              // right:normalize(10),
                              // bottom:normalize(15),
                              tintColor: 'red',
                            }}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </ScrollView>
              <TouchableOpacity
                style={styles.joinContainBox}
                onPress={() => {
                  Onsave();
                }}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontFamily: Fonts.Poppins_Medium,
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
              {/* <Text style={[styles.offTxt, {marginTop: normalize(20)}]}>
                Break
              </Text> */}
            </View>
          </Modal>

          <DatePicker
            mode="date"
            minimumDate={tomorrow}
            modal
            open={datePickModal}
            date={date}
            onConfirm={date => {
              setdatePickModal(false);
              setDate(date);
            }}
            onCancel={() => {
              setdatePickModal(false);
            }}
            onDateChange={setDate}
          />

          <DatePicker
            mode="time"
            modal
            open={WorkingHoursModal}
            date={WorkingHours}
            // is24hourSource={'locale'}
            onConfirm={date => {
              setWorkingHoursModal(false);
              setWorkingHours(date);
              formWorkingHours(FormTimeIndex, date);
            }}
            // minimumDate={formArray[ToTimeIndex]?.From_Working_Hours}
            // maximumDate={formArray[ToTimeIndex]?.To_Working_Hours}
            onCancel={() => {
              setWorkingHoursModal(false);
            }}
            onDateChange={date => {
              // You can format the date with moment before setting it
              const formattedDate = moment(date).format('HH:mm');
              setWorkingHours(formattedDate);
            }}
          />
          <DatePicker
            mode="time"
            modal
            minimumDate={minTime}
            open={WorkingHoursModal1}
            // is24hourSource="device"
            date={WorkingHours1}
            onConfirm={date => {
              setWorkingHoursModal1(false);
              setWorkingHours1(date);
              ToWorkingHours(ToTimeIndex, date);
              calculateTimeDifference(ToTimeIndex, date);
            }}
            onCancel={() => {
              setWorkingHoursModal1(false);
            }}
            onDateChange={setWorkingHours1}
            is24Hour={true}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ExCal;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },

  upView: {
    marginBottom: normalize(15),
    marginTop: normalize(5),
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
    backgroundColor: 'white',
    marginHorizontal: normalize(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: normalize(8),
  },
  upTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon1: {
    height: normalize(85),
    width: normalize(85),
    resizeMode: 'contain',
  },
  txt2: {
    fontSize: normalize(13),
    fontFamily: Fonts.Poppins_Medium,
    color: '#000000',
  },
  txt3: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_Light,
    color: '#000000',
    alignSelf: 'center',
  },
  icon2: {
    width: normalize(9),
    height: normalize(9),
    resizeMode: 'contain',
    tintColor: '#000000',
    alignSelf: 'center',
  },
  txt4: {
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: 12,
    lineHeight: 18,
    color: '#5C6066',
    left: normalize(5),
    
  },
  upBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(10),
  },
  txt5: {
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: normalize(11),
    lineHeight: 18,
    color: '#5C6066',
  },
  joinContain: {
    height: normalize(38),
    borderRadius: normalize(25),
    width: '45%',
    justifyContent: 'center',
  },
  cir: {
    height: normalize(15),
    width: normalize(15),
    borderRadius: normalize(13),
    backgroundColor: '#5C60661A',
    justifyContent: 'center',
  },
  uptxt: {
    color: 'black',
    fontFamily: Fonts.Poppins_Regular,
    marginLeft: normalize(22),
    marginTop: normalize(20),
  },
  container_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: normalize(20),
    marginHorizontal: normalize(20),
    paddingTop: Platform?.OS === 'ios' ? normalize(25) : normalize(45),
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
  timeCon: {
    marginBottom: normalize(10),
    marginTop: normalize(5),

    height: normalize(35),
    width: '48%',
    backgroundColor: '#EEEEEE',
    marginHorizontal: normalize(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    borderRadius: normalize(8),
    justifyContent: 'center',
  },
  timeTxt: {
    fontSize: normalize(12),
    color: '#000000',
    fontFamily: Fonts.Poppins_Regular,
    alignSelf: 'center',
  },
  dateCon: {
    marginBottom: normalize(15),
    marginTop: normalize(10),

    height: normalize(65),
    paddingHorizontal: normalize(8),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    marginRight: normalize(10),
    elevation: 6,
    borderRadius: normalize(28),
    justifyContent: 'center',
    paddingTop: normalize(8),
  },
  datetxt: {
    fontSize: normalize(9),
    color: '#000000',
    fontFamily: Fonts.Poppins_Regular,
    alignSelf: 'center',
  },
  date: {
    fontSize: normalize(12),
    color: '#000000',
    fontFamily: Fonts.Poppins_Medium,
    alignSelf: 'center',
  },
  circle: {
    height: normalize(25),
    width: normalize(25),
    borderRadius: normalize(13),
    backgroundColor: '#5C60661A',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(2),
  },
  dot: {
    height: normalize(3),
    width: normalize(3),
    backgroundColor: 'black',
    borderRadius: normalize(1.5),
    alignSelf: 'center',
    marginTop: normalize(5),
  },
  datTopBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(10),
    marginTop: normalize(10),
  },
  datLeft: {
    height: normalize(8),
    width: normalize(8),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  head: {
    fontSize: normalize(10),
    fontFamily: Fonts.Poppins_SemiBold,
    color: 'black',
  },
  offTxt: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(12),
    color: 'black',
    // marginTop: normalize(20),
  },
  txtdate: {
    fontSize: normalize(11),
    color: '#5C6066',
    fontFamily: Fonts.Poppins_Regular,
  },
  joinContainBox: {
    height: normalize(38),
    borderRadius: normalize(25),
    width: '45%',
    justifyContent: 'center',
    backgroundColor: '#1BACE3',
    alignSelf: 'center',
    marginTop: normalize(5),
  },
});
