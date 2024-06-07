import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Fonts, Icons} from '../../themes/ImagePath';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
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

const Review = () => {
  const navigation = useNavigation();
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [defaultRating, setDefaultRating] = useState(0);

  const RatingView = ({title, defaultRating}) => (
    <View
      style={{
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: normalize(20),
        marginBottom: normalize(5),
        
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          
        }}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
            //   key={item}
              onPress={() => {
                setDefaultRating(item);
                // console.log(item,"fafhja");
              }}
              style={{marginRight: 10,}}
              >
              <Image
                style={styles.starImageStyle}
                // source={item <= defaultRating ? Icons.rateStar : Icons.fadeStar}
                // source={item <= defaultRating ? Icons.rateStar : Icons.fadeStar}
                source={item <= defaultRating ? Icons.fullStar : Icons.star}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* <Text style={styles.reviewTxt}>{title}</Text> */}
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ImageBackground
        style={styles.backgroundImageContainer}
        source={Icons.reset}>
        {/* header */}

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

          <Text style={styles.txt1}>Reviews & Ratings</Text>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          {/* mainTop container */}

          <View style={styles.mainCon}>
            <ImageBackground
              imageStyle={{borderRadius: normalize(35)}}
              source={Icons.hero}
              style={styles.icon}
            />
            <Text style={styles.txt2}>Thomas Ellsworth</Text>
            <RatingView defaultRating={defaultRating} />
          </View>

          <TouchableOpacity style={styles.joinContain}>
            <Text style={styles.txt7}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Review;

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
    justifyContent: 'space-between',
    // paddingHorizontal: normalize(20),
    marginHorizontal: normalize(20),
    paddingTop: Platform?.OS === 'ios' ? normalize(25) : normalize(45),
    width: '64%',
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
    color: '#000000'
  },
  mainCon: {
    paddingVertical: normalize(20),
    backgroundColor: 'white',
    marginHorizontal: normalize(20),
    marginTop: normalize(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    borderRadius: normalize(10),
  },
  icon: {
    height: normalize(70),
    width: normalize(70),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txt2: {
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_Medium,
    alignSelf: 'center',
    color: '#000000',
    marginTop: normalize(12),
  },
  starImageStyle: {
    width: normalize(27),
    height: normalize(28),
    resizeMode: 'contain',
    tintColor: '#000000',
    
  },
  joinContain:{
    height: normalize(38),
    backgroundColor: '#1BACE3',
    borderRadius: normalize(25),
    width: '35%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(25)
  },
  txt7: {
    fontFamily: Fonts?.Poppins_Regular,
    fontSize: normalize(12),
    color: '#FFFFFF',
    alignSelf: 'center'
  },
});
