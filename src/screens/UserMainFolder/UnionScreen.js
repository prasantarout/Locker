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
import React, { useEffect, useState } from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import { useDispatch, useSelector } from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import { fetchAllExpertRequest } from '../../redux/reducer/ProfileReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import Loader from '../../utils/helpers/Loader';

let status = '';
const UnionScreen = props => {
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);

  const [experts, setExperts] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState([]);
  console.log('khbgjkhgbhjgjvhgvj', experts);

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(fetchAllExpertRequest());
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);

  if (status == '' || ProfileReducer?.status != status) {
    switch (ProfileReducer?.status) {
      case 'Profile/fetchAllExpertRequest':
        status = ProfileReducer?.status;
        break;
      case 'Profile/fetchAllExpertSuccess':
        status = ProfileReducer?.status;
        setExperts(ProfileReducer?.fetchAllExpertResponse?.data);
        setFilteredDataSource(ProfileReducer?.fetchAllExpertResponse?.data);
        setMasterDataSource(ProfileReducer?.fetchAllExpertResponse?.data)
        break;
      case 'Profile/fetchAllExpertFailure':
        status = ProfileReducer?.status;
        break;

    }
  }

  const searchFilterFunction = (text) => {
       console.log(text,'searchFilterFunctionsearchFilterFunctionsearchFilterFunction')
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource?.filter(function (item) {
       console.log(item,'searchFilterFunctionsearchFilteritemFunctionsearchFilterFunction')

        const itemData = item?.full_name
        
          ? item?.full_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          props?.navigation.navigate('ExpertView', {ExpertData: item})
        }>
         <ImageBackground
          source={{uri: item?.profile_photo_url}}
          // source={item?.profile_image != '' ? {uri: item?.profile_image} : {uri: item?.profile_photo_url}}
          style={[styles.icon]}
          imageStyle={{
            borderColor: '#F2F4F4', // Add your desired border color here
            borderWidth: normalize(4),
            borderRadius: normalize(8),
            // borderRadius: 10,
            resizeMode: 'cover',
          }}>
          <View style={styles.ratingContainer}>
            <Image
              source={Icons.star}
              style={[styles.ratingIcon, ]}
            />
            <Text style={styles.ratingText}>{item?.rating}</Text>
          </View>
        </ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: normalize(5),
          }}>
          <Text style={styles.title}>{item?.full_name}</Text>
          <Image style={[styles.group]} source={Icons.frame} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft:normalize(4)
          }}>
          <Image style={styles.groups} source={Icons.group} />
          <Text style={styles.gTitle}>250 Consultations</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Loader
          visible={
            ProfileReducer.status == 'Profile/fetchAllExpertRequest'
          }
        />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container_wrapper}>
            <View style={styles.inputContainer}>
              <Image source={Icons.search} style={styles.searchIcon} />
              <TextInput
                placeholder="Search..."
                style={{paddingHorizontal: 10,color:'black'}}
                placeholderTextColor={'#808080'}
                value={search}
                onChangeText={(e)=>{
                  searchFilterFunction(e)
                }}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={styles.iconContainer}>
                <Image
                  source={Icons.filter}
                  style={{width: normalize(15), height: normalize(15)}}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.second_container}>
            <Text
              style={{
                fontSize: 20,
                color: 'rgba(0, 0, 0, 1)',

                lineHeight: 24,
                fontFamily: 'Poppins-Medium',
                fontWeight: Platform.OS == 'ios' ? '600' : '700',
              }}>
              Featured Experts
            </Text>
          </View>

          <View style={{marginTop: normalize(15)}}>
            <FlatList
              data={filteredDataSource}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignSelf: 'center',
              }}
              // columnWrapperStyle={{alignSelf: 'center'}}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default UnionScreen;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: normalize(20),
    marginHorizontal: normalize(20),
    paddingTop: Platform?.OS === 'ios' ? normalize(25) : normalize(45),
  },
  second_container: {
    // flex:1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: normalize(25),
    paddingTop: normalize(25),
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderRadius: 5,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    width: normalize(231),
    paddingLeft: normalize(15),
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    width: normalize(15),
    height: normalize(15),
    //  left:10,
    color: '#555',
  },
  item: {
    height: normalize(190),
    marginHorizontal: normalize(8),
    // marginBottom: normalize(-10),
    // right: normalize(5)
    // backgroundColor:'red',
  },
  icon: {
    // width: Platform.OS == 'ios' ? '103%' : '104%',
    width:normalize(130),
    height: normalize(130),
    resizeMode: 'stretch',
    // marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'flex-end',
    width: normalize(40),
    paddingHorizontal:normalize(5),
    paddingVertical:normalize(2),
    // height: 28,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 50,
    bottom: normalize(5),
    right: normalize(5),
  },
  ratingIcon: {
    width: normalize(10), // Adjust the width as needed
    height: normalize(10), // Adjust the height as needed
    resizeMode: 'contain',
    marginRight:normalize(4)
    // Adjust the margin as needed
  },
  ratingText: {
    fontSize: 14,
    color: 'grey',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 21,
    fontFamily: Fonts?.Poppins_Medium,
    color: 'rgba(0, 0, 0, 1)',
    // right: Platform.OS === 'ios' ? -5 : 5,
    fontWeight: Platform.OS == 'ios' ? '600' : '700',
    textTransform:'capitalize'
  },
  group: {
    // color: 'rgba(92, 96, 102, 1)',
    width: normalize(12),
    height: normalize(12),
    // left: Platform.OS === 'ios' ? normalize(8) : normalize(2),
    marginHorizontal: 8,
  },
  groups: {
    width: 14.25,
    height: 12,
    marginHorizontal: 5,
    // right: Platform.OS === 'ios' ? 5 : 8,
  },
  gTitle: {
    fontSize: normalize(10),
    color: 'rgba(92, 96, 102, 1)',
    marginHorizontal: 3,
  },
});
