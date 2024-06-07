import React, {useEffect} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen/SplashScreen';

import Dashboard from '../screens/UserMainFolder/Dashboard';
import Home from '../screens/userTab/Home';
import BottomTabNav from './BottomTabNav';
import ExpertView from '../screens/UserMainFolder/ExpertView';
import AskAQuestion from '../screens/UserMainFolder/AskAQuestion';
import TextAnswer from '../screens/UserMainFolder/TextAnswer';
import Profile from '../screens/UserMainFolder/Profile';
import UpdateProfile from '../screens/UserMainFolder/UpdateProfile';
import Connected from '../screens/UserMainFolder/Connected';
import Review from '../screens/UserMainFolder/Review';
import Call from '../screens/UserMainFolder/Call';
import ChangePass from '../screens/UserMainFolder/ChangePass';

import Video from '../screens/Video';
import Chat from '../screens/Chat';
import VideoChat from '../screens/VideoChat';
import ScheduleACall from '../screens/UserMainFolder/ScheduleACall';

import ExpertBottomTab from './ExpertBottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import SignUp from '../screens/Auth/SignUp';
import SignIn from '../screens/Auth/SignIn';
import VerifyOtp from '../screens/Auth/VerifyOtp';
import ResetPassword from '../screens/Auth/ResetPassword';

import OnboardingScreen from '../screens/OnboardingScreen';
import Notification from '../screens/UserMainFolder/Notification';
import SetUpProfile from '../screens/ExpertMainFolder/SetUpProfile';
import ProfileUpdate from '../screens/ExpertMainFolder/ProfileUpdate';

const StackNav = props => {
  const isFocused = useIsFocused();
  const Stack = createStackNavigator();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const MyTransition = {
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 1],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 0.1],
            outputRange: [0, 0.1],
          }),
        },
      };
    },
  };
  //StartCondition

  // useEffect(() => {
  //   if (isFocused) {
  //     VerifyRole();
  //   }
  // }, [isFocused]);

  // const VerifyRole = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('Role');
  //     console.log('value', value);
  //     if (value !== null) {
  //       return JSON.parse(value);
  //     }
  //   } catch (error) {
  //     console.error('Error getting subsubCategoryId:', error);
  //   }
  // };

  // const isUser = VerifyRole() === 'USER';
  // const isTokenNull = AuthReducer?.token === null;

  // const Screens = isUser
  //   ? isTokenNull
  //     ? {
  //         OnboardingScreen: OnboardingScreen,
  //         SignUp: SignUp,
  //         SignIn: SignIn,
  //         VerifyOtp: VerifyOtp,
  //         ResetPassword: ResetPassword,
  //       }
  //     : {
  //         Dashboard: Dashboard,
  //         BottomTabNav: BottomTabNav,
  //         AskAQuestion: AskAQuestion,
  //         ScheduleACall: ScheduleACall,
  //         Notification: Notification,
  //         Review: Review,
  //         ChangePass: ChangePass,
  //         Profile: Profile,
  //       }
  //   : isTokenNull
  //   ? {
  // OnboardingScreen: OnboardingScreen,
  // SignUp: SignUp,
  // SetUpProfile: SetUpProfile,
  // SignIn: SignIn,
  // VerifyOtp: VerifyOtp,
  // ResetPassword: ResetPassword,
  //     }
  //   : {
  // ExpertBottomTab: ExpertBottomTab,

  // UpdateProfile: SetUpProfile,
  //     };
  //endcondition

  //normal pages

  // ExpertView: ExpertView,
  //
  // TextAnswer: TextAnswer,
  // ,

  // Connected: Connected,
  // Review: Review,
  // Call: Call,
  // ChangePass: ChangePass,
  // Notification: Notification,
  // Video: Video,
  // Chat: Chat,
  // VideoChat: VideoChat,

  //end

  //Expert

  //Rajasree

  // const Screens =
  //   AuthReducer?.token == null
  //     ? {
  //         OnboardingScreen: OnboardingScreen,
  //         SignUp: SignUp,
  //         SetUpProfile: SetUpProfile,
  //         SignIn: SignIn,
  //         VerifyOtp: VerifyOtp,
  //         ResetPassword: ResetPassword,
  //       }
  //     : {
  //         ExpertBottomTab: ExpertBottomTab,
  //         UpdateProfile: SetUpProfile,
  //       };
  console.log('---', AuthReducer?.logoutResponse);
  const Screens =
    AuthReducer?.token == null
      ? AuthReducer?.logoutResponse == null
        ? {
            OnboardingScreen: OnboardingScreen,
            SignUp: SignUp,
            SetUpProfile: SetUpProfile,
            SignIn: SignIn,
            VerifyOtp: VerifyOtp,
            ResetPassword: ResetPassword,
          }
        : {
            SignIn: SignIn,
            SignUp: SignUp,
            SetUpProfile: SetUpProfile,

            VerifyOtp: VerifyOtp,
            ResetPassword: ResetPassword,
          }
      : AuthReducer?.userType == 'USER' //&& Array.isArray(ProfileReducer?.selectedCategoriesRes)?.length == 0
      ? {
        Dashboard: Dashboard,
          BottomTabNav: BottomTabNav,
          AskAQuestion: AskAQuestion,
          ScheduleACall: ScheduleACall,
          Notification: Notification,
          Review: Review,
          ChangePass: ChangePass,
          Profile: Profile,
          ExpertView: ExpertView,
          UpdateProfile:UpdateProfile,
          
       }
      //  : AuthReducer?.userType == 'USER' && Array.isArray(ProfileReducer?.selectedCategoriesRes)?.length>0 ?{
        
      //     BottomTabNav: BottomTabNav,
      //     AskAQuestion: AskAQuestion,
      //     ScheduleACall: ScheduleACall,
      //     Notification: Notification,
      //     Review: Review,
      //     ChangePass: ChangePass,
      //     Profile: Profile,
      //     ExpertView: ExpertView,
      //     UpdateProfile:UpdateProfile
      //  }
      : {
          ExpertBottomTab: ExpertBottomTab,
          ProfileUpdate: ProfileUpdate

        };

  if (AuthReducer?.isLoading) {
    console.log('hghyyg');
    return <SplashScreen />;
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...MyTransition,
          animationEnabled: true,
        }}>
        {Object.entries({
          ...Screens,
        }).map(([name, component]) => {
          return <Stack.Screen name={name} component={component} key={name} />;
        })}
      </Stack.Navigator>
    );
  }
};
export default StackNav;
