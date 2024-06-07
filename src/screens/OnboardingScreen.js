import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Fonts, Icons} from '../themes/ImagePath';
import normalize from '../utils/helpers/dimen';
import {Colors} from '../themes/Colors';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../utils/helpers/NetInfo';
import showErrorAlert from '../utils/helpers/Toast';
import {onboardingScreenRequest} from '../redux/reducer/AuthReducer';
import Loader from '../utils/helpers/Loader';
let status;

const OnboardingScreen = props => {
  const dispatch = useDispatch();

  const AuthReducer = useSelector(state => state.AuthReducer);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setslider] = useState([]);
  const sliderRef = useRef(null);
  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);

    if (sliderRef.current) {
      sliderRef.current.goToSlide(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    props.navigation.navigate('SignIn')
    // if (sliderRef.current) {
    //   sliderRef.current.goToSlide(slides.length - 1);
    // }
  };

  useEffect(() => {
    connectionrequest()
      .then(() => {
        dispatch(onboardingScreenRequest());
      })
      .catch(err => {
        console.log(err);
        showErrorAlert('Please connect to internet');
      });
  }, []);
  const ImageArray = [Icons.man1, Icons.man2, Icons.man3];

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/onboardingScreenRequest':
        status = AuthReducer.status;

        break;

      case 'Auth/onboardingScreenSuccess':
        status = AuthReducer.status;
        setslider(AuthReducer?.onboardingScreenResponse?.data);
        break;

      case 'Auth/onboardingScreenFailure':
        status = AuthReducer.status;

        break;
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}>
          <Loader
          visible={
            AuthReducer.status == 'Auth/onboardingScreenRequest'
          }
        />
      <ImageBackground
        resizeMode="contain"
        style={styles.backgroundImageContainer}
        source={Icons.onBoarding}>
         
        <AppIntroSlider
          ref={sliderRef}
          renderItem={({item, index}) => (
            <View style={styles.slideContainer}>
              <Image
                source={ImageArray[index]}
                style={[
                  styles.image,

                  {
                    height: normalize(320),
                    width: normalize(280),
                    //left: index == 1 ? normalize(7) : null,
                    //right: index == 2 ? normalize(1) : null,
                  },
                ]}
                resizeMode="contain"
              />
              <Image source={Icons.logo} style={styles.icon} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.slideText}>{item.text}</Text>
            </View>
          )}
          data={slides}
          // onSlideChange={index => {
          //   console.log(`Slide changed to index ${index}`);
          //   setCurrentIndex(index);
          // }}
          dotStyle={{
            bottom: normalize(50),
            backgroundColor: Colors.placeholder,
          }}
          activeDotStyle={styles.activeDot}
          showSkipButton={true}
          renderNextButton={() => (
            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}
          renderSkipButton={() => (
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.buttonTextSkip}>Skip</Text>
            </TouchableOpacity>
          )}
          renderDoneButton={() => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignIn')}
              style={styles.buttons}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          )}
        />
         <Image
          source={Icons.wave}
          style={{resizeMode:'contain',
        position:'absolute',
        width:'100%',
        height:normalize(130),
        bottom:0,
        zIndex:-1
        }}
          />
      </ImageBackground>
    </ScrollView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  slideContainer: {
    flex: 1,
    // backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(24),
  },
  image: {
    resizeMode: 'stretch',
    marginBottom: 20,
    width: '111%',
  },
  icon: {
    width: '35%',
    height: normalize(28),
    resizeMode: 'contain',
    marginBottom: normalize(10),
  },
  title: {
    fontSize: normalize(15),
    marginBottom: normalize(10),
    textAlign: 'center',
    fontFamily: Fonts.Poppins_Bold,
  },
  slideText: {
    fontSize: normalize(10),
    textAlign: 'center',
    marginBottom: normalize(15),
    color: '#5C6066',
    width: '85%',
    fontFamily: Fonts.Poppins_Regular,
  },
  button: {
    color: '#007AFF',
    backgroundColor: '#1BACE3',
    borderRadius: 50,
    height: normalize(40),
    width: normalize(85),
    justifyContent: 'center',
    // zIndex:1,position:'absolute',
    // right:40
  },
  buttons: {
    color: '#007AFF',
    justifyContent: 'center',
    backgroundColor: '#1BACE3',
    borderRadius: 50,
    height: normalize(40),
    width: 153,
    gap: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
  },
  buttonTextSkip: {
    fontWeight: '500',
    marginLeft: normalize(15),
    color: '#5C6066',
    fontSize: normalize(12),
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: Fonts.Poppins_Regular,
    marginTop: normalize(6),
    right: normalize(11),
  },
  activeDot: {
    backgroundColor: '#000000',
    bottom: normalize(50),
  },
});
