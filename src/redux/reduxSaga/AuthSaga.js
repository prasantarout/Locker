import {call, put, select, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApi, postApi} from '../../utils/helpers/ApiRequest';
import {
  CountryListFailure,
  CountryListSuccess,
  LanguageListFailure,
  LanguageListtSuccess,
  ResetPasswordFailure,
  ResetPasswordSuccess,
  UserSignUpFailure,
  UserSignUpSuccess,
  categoryListFailure,
  categoryListtSuccess,
  forgotpasswordFailure,
  forgotpasswordSuccess,
  getTokenFailure,
  getTokenSuccess,
  logoutFailure,
  logoutSuccess,
  onboardingScreenFailure,
  onboardingScreenSuccess,
  otpFailure,
  otpSuccess,
  signUpFailure,
  signUpSuccess,
  signinFailure,
  signinSuccess,
  setUserTypeSuccess,
  DataStoreRequest,
  DataStoreFailure,
  DataStoreSuccess,
} from '../reducer/AuthReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import constants from '../../utils/helpers/constants';

let getItem = state => state.AuthReducer;

export function* getTokenSaga() {
  //   let item = yield select(getItem);
  try {
    const response = yield call(AsyncStorage.getItem, constants.TOKEN);
    const userType = yield call(AsyncStorage.getItem, constants.USER_TYPE);

    if (response != null) {
      yield put(getTokenSuccess(response));
      yield put(setUserTypeSuccess(userType));
    } else {
      yield put(getTokenSuccess(null));
    }
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}
//expertSignUp

export function* signUpSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
  };
  try {
    let response = yield call(
      postApi,
      'register-expert',
      action.payload,
      header,
    );
    console.log('xyzzzzzz', response);

    if (response.data.status == 200) {
      yield put(signUpSuccess(response.data));
      showErrorAlert(response.data.message);
      yield put(DataStoreSuccess({}));
    } else {
      yield put(signUpFailure(response.data));
      // console.log(response);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    // showErrorAlert('Something went wrong');
    //console.log(error?.response?.data?.[0]);
    console.log('xyzzzzzz error', error);
    yield put(signUpFailure(error.response));
    showErrorAlert(error?.response?.data?.message);
  }
}

//Expert signIn

export function* signinSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'login', action.payload, header);
    console.log('responseresponse', response);

    if (response.data.status == 200) {
      yield put(signinSuccess(response.data));
      yield call(
        AsyncStorage.setItem,
        constants.TOKEN,
        response?.data?.data?.token,
      );
      yield call(
        AsyncStorage.setItem,
        constants.USER_TYPE,
        action?.payload?.Role,
      );
      yield put(getTokenSuccess(response?.data?.data?.token));
      yield put(setUserTypeSuccess(action?.payload?.Role));
      //yield put()
      console.log('123456--', response.data.data.remember_me);
      if (action.payload.remember_me == 1) {
        action?.payload?.Role == 'USER'
          ? yield call(
              AsyncStorage.setItem,
              constants.TOGIN_CREDENTIAL,
              // response.data.token,
              JSON.stringify({
                email: action.payload.email,
                password: action.payload.password,
                // Role:action.payload.Role
              }),
            )
          : yield call(
              AsyncStorage.setItem,
              constants.TOGIN_CREDENTIAL,
              // response.data.token,
              JSON.stringify({
                emailExpert: action.payload.email,
                passwordExpert: action.payload.password,
                // Role:action.payload.Role
              }),
            );
      } else {
        try {
          yield call(AsyncStorage.removeItem, constants.TOGIN_CREDENTIAL);
        } catch (ex) {}
      }
      console.log('dfjkhbndikfjgoheriudgop', response.data);
      // showErrorAlert(response?.data?.message);
    } else {
      yield put(signinFailure(response.data));
      showErrorAlert(response?.data?.message);
      // showErrorAlert("Somthing went wrong");
    }
  } catch (error) {
    // Toast('Something went wrong')
    yield put(signinFailure(error));
    showErrorAlert(error?.response?.data?.message);
    // showErrorAlert("Somthing went wrong");
  }
}

//countryListSaga
export function* countryListSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'all-countries', header);
    console.log('Register', response);

    if (response.data.status == 200) {
      yield put(CountryListSuccess(response.data));
      // showErrorAlert(response.data.message);
    } else {
      yield put(CountryListFailure(response.data));
      // console.log(response);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert('Something went wrong');
    //console.log(error?.response?.data?.[0]);
    yield put(CountryListFailure(error.response));
  }
}
//categoryList

export function* categoryListSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'user-categories', header);
    console.log('Register', response);

    if (response.data.status == 200) {
      yield put(categoryListtSuccess(response.data));
      // showErrorAlert(response.data.message);
    } else {
      yield put(categoryListFailure(response.data));
      // console.log(response);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert('Something went wrong');
    //console.log(error?.response?.data?.[0]);
    yield put(categoryListFailure(error.response));
  }
}
//LanguageList
export function* LanguageListSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'all-languages', header);
    console.log('Register', response);

    if (response.data.status == 200) {
      yield put(LanguageListtSuccess(response.data));
      // showErrorAlert(response.data.message);
    } else {
      yield put(LanguageListFailure(response.data));
      // console.log(response);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert('Something went wrong');
    //console.log(error?.response?.data?.[0]);
    yield put(LanguageListFailure(error.response));
  }
}

//onboardingScreen

export function* onboardingScreenSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(getApi, 'user-on-boarding', header);
    console.log('Register', response);

    if (response.data.status == 200) {
      yield put(onboardingScreenSuccess(response.data));
      // showErrorAlert(response.data.message);
    } else {
      yield put(onboardingScreenFailure(response.data));
      // console.log(response);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert('Something went wrong');
    //console.log(error?.response?.data?.[0]);
    yield put(onboardingScreenFailure(error.response));
  }
}
//forgotPassword
export function* forgotPasswordSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'forget-password',
      action.payload,
      header,
    );
    console.log('Register', response);

    if (response.data.status == 200) {
      yield put(forgotpasswordSuccess(response.data));
      showErrorAlert(response?.data?.message);
    } else if (response?.status == 400) {
      yield put(forgotpasswordFailure(response.data));
      showErrorAlert(response?.data?.message?.email);
    } else {
      console.log('vghggfcg++', response);
      yield put(forgotpasswordFailure(response.data));
      //  showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    if (error.response.status == 400) {
      yield put(forgotpasswordFailure(error.response));
      showErrorAlert('user not found');
    }
    yield put(forgotpasswordFailure(error.response));
  }
}

//otpVerification

export function* otpVerificationSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'otp-match', action.payload, header);
    console.log('khugiygiyuguy', response);

    if (response.data.status == 200) {
      yield put(otpSuccess(response.data));
      showErrorAlert(response?.data?.message);
    } else if (response?.data?.status == 400) {
      yield put(otpSuccess(response.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(otpFailure(response.data));
      // console.log(response);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert('Invalid OTP');
    //console.log(error?.response?.data?.[0]);
    yield put(otpFailure(error.response));
  }
}

//ResetPassword
export function* ResetPasswordSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'reset-password',
      action.payload,
      header,
    );
    console.log('Register', response);

    if (response.data.status == 200) {
      yield put(ResetPasswordSuccess(response?.data));
      // showErrorAlert(response.data.message);
    } else {
      yield put(ResetPasswordFailure(response?.data));
      // console.log(response);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    showErrorAlert('Something went wrong');
    //console.log(error?.response?.data?.[0]);
    yield put(ResetPasswordFailure(error?.response));
  }
}
//userSignuP
export function* UsersignUpSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    const response = yield call(postApi, 'register', action.payload, header);
    console.log('Register', response);

    if (response.data.status == 200) {
      yield put(UserSignUpSuccess(response.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(UserSignUpFailure(response.data));
      console.log('hello click');
      // console.log(response);
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('response', error);
    console.log('heellllllll');
    showErrorAlert(error?.response?.data?.message);
    //console.log(error?.response?.data?.[0]);
    yield put(UserSignUpFailure(error.response));
  }
}
//logout
export function* logout_Saga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    yield call(AsyncStorage.removeItem, constants.TOKEN);
    yield put(getTokenSuccess(null));
    yield put(logoutSuccess('logout'));
    showErrorAlert('Logout successfully');
  } catch (error) {
    console.log(error);
    yield put(logoutFailure(error));
  }
}
/////////Store data/////////
export function* DataStoreSaga(action) {
  yield put(DataStoreSuccess(action?.payload));
}
const watchFunction = [
  (function* () {
    yield takeLatest('Auth/logoutRequest', logout_Saga);
  })(),
  (function* () {
    yield takeLatest('Auth/UserSignUpRequest', UsersignUpSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/ResetPasswordRequest', ResetPasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/otpRequest', otpVerificationSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/forgotpasswordRequest', forgotPasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/onboardingScreenRequest', onboardingScreenSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/LanguageListRequest', LanguageListSaga);
  })(),

  (function* () {
    yield takeLatest('Auth/categoryListRequest', categoryListSaga);
  })(),

  (function* () {
    yield takeLatest('Auth/CountryListRequest', countryListSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/getTokenRequest', getTokenSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/signUpRequest', signUpSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/signinRequest', signinSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/DataStoreRequest', DataStoreSaga);
  })(),
];
export default watchFunction;
