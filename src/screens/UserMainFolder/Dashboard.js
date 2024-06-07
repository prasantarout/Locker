import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import connectionrequest from '../../utils/helpers/NetInfo';
import { logoutRequest } from '../../redux/reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { createUserCatRequest, fetchAllCatUserRequest } from '../../redux/reducer/ProfileReducer';

let status = '';
const Dashboard = props => {
  const dispatch = useDispatch();

  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [data, setData] = useState([]);
  console.log('khbjhgvj', data);

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(fetchAllCatUserRequest());
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);

  function onSubmit() {
    if (selectedItems == []) {
      showErrorAlert('Please select categories');
    }else {
      // let obj = new FormData();
      // obj.append('category_ids', selectedItems);
      let obj = {
        category_ids: selectedItems,
      };

      console.log('dgbdrbgdbhttrghr', obj);
      connectionrequest()
        .then(() => {
          console.log('d');
          dispatch(createUserCatRequest(obj));
          
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    }
  }

  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      case 'Profile/fetchAllCatUserRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/fetchAllCatUserSuccess':
        status = ProfileReducer?.status;
        setData(ProfileReducer?.fetchAllCatUserResponse?.data);
        break;
      case 'Profile/fetchAllCatUserFailure':
        status = ProfileReducer?.status;
        break;
////////////////////////////////
        case 'Profile/createUserCatRequest':
          status = ProfileReducer?.status;
          break;
        case 'Profile/createUserCatSuccess':
          // onPress={() => handleContinuePress()}
          console.log("success");
          props?.navigation?.navigate('BottomTabNav');
          status = ProfileReducer?.status;
          break;
        case 'Profile/createUserCatFailure':
          status = ProfileReducer?.status;
          break;
    }
  }
  // let dataItem = [
  //   {
  //     id: 1,
  //     Icon: Icons.busi,
  //     title: 'Business',
  //   },
  //   {
  //     id: 2,
  //     Icon: Icons.bitcoin,
  //     title: 'Crypto',
  //   },
  //   {
  //     id: 3,
  //     Icon: Icons.usero,
  //     title: 'Celebrity',
  //   },
  //   {
  //     id: 4,
  //     Icon: Icons.teacher,
  //     title: 'Coaching',
  //   },
  //   {
  //     id: 5,
  //     Icon: Icons.messages,
  //     title: 'Counselling',
  //   },
  //   {
  //     id: 6,
  //     Icon: Icons.heal,
  //     title: 'Health',
  //   },
  //   {
  //     id: 7,
  //     Icon: Icons.emptyWallet,
  //     title: 'Finance',
  //   },
  //   {
  //     id: 8,
  //     Icon: Icons.marketting,
  //     title: 'Marketing',
  //   },
  //   {
  //     id: 9,
  //     Icon: Icons.cup,
  //     title: 'Social Media',
  //   },
  // ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  console.log('selectedItemsselectedItems', selectedItems);

  const handleItemPress = itemId => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  const handleContinuePress = () => {
    if (selectedItems?.length === 0) {
      Alert.alert(
        'Alert',
        'Please select an categories.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else if (selectedItems?.length > 3) {
      // Show an alert if more than 3 items are selected
      Alert.alert(
        'Alert',
        'Maximum 3 items can be selected.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    } else {
      // Continue with your desired action when 3 or fewer items are selected
      console.log('Continue with your action');
      onSubmit()
      // props?.navigation?.navigate('BottomTabNav');
    }
  };

  const renderItem = ({item, index}) => {
    const isSelected = selectedItems.includes(item.id);
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[
            {
              height: normalize(50),
              width: normalize(50),
              borderRadius: normalize(18),
              backgroundColor: '#FFFFFF',
              shadowColor: '#171717',
              // backgroundColor: digit != '' ? 'black' : 'white',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 20,
              justifyContent: 'center',
              alignItems: 'center',
            },
            isSelected ? styles.selectedItem : null,
          ]}
          onPress={() => handleItemPress(item.id)}>
          <Image
            style={[
              styles.iconImage,
              // {
              //   tintColor:
              //     index == 4
              //       ? 'black'
              //       : index == 0
              //       ? 'black'
              //       : index == 5
              //       ? 'black'
              //       : null,
              // },
              isSelected ? styles.selectedImage : null,
            ]}
            // source={item?.thumbnail}
            source={{uri: item.thumbnail}}
          />
        </TouchableOpacity>
        <Text
          style={{
            top: normalize(8),
            fontFamily: Fonts?.Poppins_Regular,
       
            fontSize: Platform.OS === 'android' ? normalize(11) : normalize(11),
            // lineHeight: 10,
            textAlign: 'center',
            color: '#5C6066',
          }}>
          {item?.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        <View style={{flex: 1, paddingTop: normalize(90)}}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Bold,
              fontSize: 20,

              lineHeight: 24,
              textAlign: 'center',
              color: '#000000',
            }}>
            Interested Categories
          </Text>
          <Text
            style={{
              color: '#5C6066',
              fontFamily: Fonts.Poppins_Regular,
              fontSize: 12,
              textAlign: 'center',
              fontWeight: '400',
              top: normalize(10),
            }}>
            Select top 3 categories of interest
          </Text>
          <View style={{paddingTop: normalize(20)}}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item?.id?.toString()}
              numColumns={3}
              contentContainerStyle={styles.flatlistContentContainer}
              columnWrapperStyle={styles.columnWrapper}
              //   horizontal
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',

              zIndex: 1111,
            }}>
            <TouchableOpacity
            onPress={()=>{
              // onSubmit()
              handleContinuePress();
            }}
              style={{
                backgroundColor: '#1BACE3',
                justifyContent: 'center',
                height: normalize(46),
                width: normalize(127),
                borderRadius: normalize(50),
                bottom:normalize(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}
             >
              <Text
                style={{
                  fontFamily: Fonts?.Poppins_Medium,
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#FFFFFF',

                  lineHeight: 21,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                backgroundColor: '#1BACE3',
                justifyContent: 'center',
                height: normalize(46),
                width: 137,
                borderRadius: normalize(50),
                marginTop: normalize(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                connectionrequest()
                  .then(() => {
                    dispatch(logoutRequest());
                  })
                  .catch(err => {
                    console.log(err);
                    showErrorAlert('Please connect to internet');
                  })
              }>
              <Text
                style={{
                  fontFamily: Fonts?.Poppins_Medium,
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#FFFFFF',

                  lineHeight: 21,
                }}>
                Logout
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <View>
        <Image source={Icons.abstract} style={{width: normalize(450)}} />
      </View> */}
      </ImageBackground>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: normalize(15),

    paddingHorizontal: 2,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Add space between columns
  },
  flatlistContentContainer: {
    padding: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  rowContentContainer: {
    flexGrow: 1,
  },
  selectedItem: {
    backgroundColor: 'black',
  },
  iconImage: {
    width: normalize(18),
    height: normalize(18),
    resizeMode: 'contain',
    tintColor: 'black',
  },
  selectedImage: {
    tintColor: 'white', // Change the image color to white when selected
  },
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
});
