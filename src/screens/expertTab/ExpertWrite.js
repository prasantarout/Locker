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
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';

import Modal from 'react-native-modal';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import Accrodian from '../../components/Accrodian';
import {useNavigation} from '@react-navigation/native';

let Data = [
  {
    id: 1,
    Icon: Icons.hero,
    title: 'Thomas Ellsworth',
  },
  {
    id: 2,
    Icon: Icons.hero1,
    title: 'Thomas Ellsworth',
  },
];

let Data1 = [
  {
    id: 1,
    Icon: Icons.hero,
    title: 'Thomas Ellsworth',
  },
  {
    id: 2,
    Icon: Icons.hero1,
    title: 'Thomas Ellsworth',
  },
  {
    id: 3,
    Icon: Icons.hero,
    title: 'Thomas Ellsworth',
  },
];

let Data2 = [
  {
    id: 1,
    Icon: Icons.hero,
    title: 'Thomas Ellsworth',
  },
  {
    id: 2,
    Icon: Icons.hero1,
    title: 'Thomas Ellsworth',
  },
];

const ExpertWrite = (props) => {
  const navigation = useNavigation();
  const [selTime, setSelTime] = useState(1);
  const [activeDate, setActiveDate] = useState(2);
  const [open, setOpen] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.upView}>
        <View style={styles.upTopView}>
          <Image source={item?.Icon} style={styles.icon1} />

          <View style={{width: '60%', left: normalize(5)}}>
            <Text style={styles.txt2}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.txt3}>Buiness</Text>
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
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(5),
                }}>
                <Image
                  source={Icons.Newmail}
                  style={styles.icon2}
                  // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
                />

                <Text style={styles.txt4}>Abc@gmail.com</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(5),
                }}>
                <Image
                  source={Icons.calender3}
                  style={styles.icon2}
                  // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
                />

                <Text style={styles.txt4}>Aug 27th, 2023</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(5),
                }}>
                <Image
                  source={Icons.Newclock}
                  style={styles.icon2}
                  // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
                />

                <Text style={styles.txt4}>10:00AM - 10:30AM</Text>
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

        <View style={styles.upBottom}>
          <TouchableOpacity
            style={[styles.joinContain, {backgroundColor: '#33BC7A'}]}>
            <Text
              style={[styles.txt5, {color: '#FFFFFF', alignSelf: 'center'}]}>
              Lock in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={[styles.joinContain, {backgroundColor: '#D73A3A'}]}>
            <Text
              style={[styles.txt5, {color: '#FFFFFF', alignSelf: 'center'}]}>
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem1 = ({item, index}) => {
    return (
      <View
        style={[styles.upView, {paddingRight: normalize(35), marginRight: 0}]}>
        <View style={styles.upTopView}>
          <Image source={item?.Icon} style={styles.iconCom}  resizeMode= {'contain'} />

          <View style={{left: normalize(5)}}>
            <Text style={[styles.txt2, {fontSize: normalize(16)}]}>
              {item.title}
            </Text>

            <Text style={styles.txt3}>Business</Text>
          </View>
        </View>

        <View
          style={{
            borderTopWidth: normalize(0.9),
            borderColor: '#5C60664D',
            height: 1,
            width: '110%',
            marginTop: normalize(15),
          }}
        />

        <View
          style={{
            marginTop: normalize(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: normalize(10),
            }}>
            <Image source={Icons.calender3} style={styles.icon2} />

            <Text style={styles.txt4}>Aug 27th, 2023</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: normalize(5),
            }}>
            <Image
              source={Icons.Newclock}
              style={styles.icon2}
              // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
            />

            <Text style={styles.txt4}>10:00AM - 10:30AM</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItem2 = ({item, index}) => {
    return (
      <View style={[styles.upView, {}]}>
        <View style={[styles.upTopView, {justifyContent: 'flex-start'}]}>
          <Image source={item?.Icon} style={styles.iconCom} />

          <View style={{left: normalize(15)}}>
            <Text style={[styles.txt2, {fontSize: normalize(14)}]}>
              {item.title}
            </Text>

            <Text style={styles.txt3}>Business</Text>
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

        <View
          style={{
            marginTop: normalize(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: normalize(5),
            }}>
            <Image
              source={Icons.Newmail}
              style={styles.icon2}
              // style={{width: normalize(11), height: normalize(11), resizeMode: 'contain', tintColor: '#000000'}}
            />

            <Text
              style={[
                styles.txt4,
                {
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Regular,
                  textTransform: 'capitalize',
                },
              ]}>
              thomas.ellsworth@gmail.com
            </Text>
          </View>
        </View>
      </View>
    );
  };

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
            <TouchableOpacity>
              <Image source={Icons.setting} style={{width: 39, height: 39}} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={[styles.iconContainer, {right: normalize(10)}]}
                onPress={() => 
                  props?.navigation.navigate('Expro')
                }
                >
                <Image source={Icons.users} style={{width: 24, height: 24}} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => props?.navigation.navigate('Notification')}
                >
                <Image
                  source={Icons.Notification}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.uptxt}>Recent Communication</Text>
          <View style={{marginTop: normalize(10)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Data1}
              renderItem={renderItem1}
              contentContainerStyle={{paddingRight: '20%'}}
              horizontal
              showsHorizontalScrollIndicator={false}
              
            />
          </View>

          <Text style={styles.uptxt}>Requested Video call</Text>
          <View style={{marginTop: normalize(10)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Data}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: '5%'}}
            />
          </View>

          <Text style={[styles.uptxt, {marginTop: 0}]}>
            Requested Text Messages
          </Text>
          <View style={{marginTop: normalize(10)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Data2}
              renderItem={renderItem2}
              contentContainerStyle={{paddingBottom: '5%'}}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>

          <Text style={[styles.uptxt, {marginTop: 0}]}>
            Requested Video Answer
          </Text>
          <View style={{marginTop: normalize(10)}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Data2}
              renderItem={renderItem2}
              contentContainerStyle={{paddingBottom: '5%'}}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>

        <View>
          <Modal isVisible={open} onBackdropPress={() => setOpen(false)}>
            <View
              style={{
                height: '35%',
                width: '95%',
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: normalize(10),
                bottom: normalize(85),
                paddingHorizontal: normalize(20),
              }}>
              <Text style={styles.offTxt}>Why</Text>
              <TextInput
                style={styles.inputTxt}
                placeholder="Your Reason"
                placeholderTextColor={'#5C6066'}
              />
              <TouchableOpacity style={styles.joinContainBox}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontFamily: Fonts.Poppins_Medium,
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ExpertWrite;

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
    fontSize:Platform.OS=='ios'?normalize(12): normalize(13),
    fontFamily: Fonts.Poppins_Medium,
    color: '#000000',
  },
  txt3: {
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_Medium,
    color: '#5C6066',
    // alignSelf: 'center',
  },
  icon2: {
    width: normalize(20),
    height: normalize(20),
    resizeMode: 'contain',
    tintColor: '#000000',
    alignSelf: 'center',
  },
  txt4: {
    fontFamily: Fonts?.Poppins_Medium,
    fontSize: normalize(10),
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
    fontFamily: Fonts.Poppins_Medium,
    marginLeft: normalize(22),
    marginTop: normalize(20),
    fontSize: normalize(12),
  },

  timeCon: {
    marginBottom: normalize(10),
    marginTop: normalize(5),

    height: normalize(35),
    width: '45%',
    backgroundColor: '#EEEEEE',
    marginHorizontal: normalize(8),
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
    backgroundColor: '#EEEEEE',

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
    marginTop: normalize(30),
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
    backgroundColor: '#D73A3A',
    alignSelf: 'flex-start',
    marginTop: normalize(35),
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
  iconCom: {
    height: normalize(40),
    width: normalize(40),
   
  },
  inputTxt: {
    height: normalize(46),
    width: '100%',
    marginTop: normalize(15),

    color: 'black',
    fontSize: normalize(12),
    paddingHorizontal: normalize(10),
    fontFamily: Fonts.Poppins_Regular,
    backgroundColor: '#F8F8F8',
    borderRadius: normalize(8),
  },
});
