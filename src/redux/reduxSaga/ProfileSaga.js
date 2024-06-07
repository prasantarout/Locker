import {call, put, select, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postApi, getApi} from '../../utils/helpers/ApiRequest';
import showErrorAlert from '../../utils/helpers/Toast';
import constants from '../../utils/helpers/constants';
import {
  ExpertProfileDetailFailure,
  ExpertProfileDetailSuccess,
  ExpertProfileUpdateFailure,
  ExpertProfileUpdateSuccess,
  SlotCreateFailure,
  SlotCreateSuccess,
  datewiseSlotFailure,
  datewiseSlotSuccess,
  fetchAllCatUserFailure,
  fetchAllCatUserSuccess,
  createUserCatSuccess,
  createUserCatFailure,
  fetchAllExpertSuccess,
  fetchAllExpertFailure,
  fetchExpertDetailsSuccess,
  fetchExpertDetailsFailure,
  fetchTimeSlotSuccess,
  fetchTimeSlotFailure,
  userDetailsFetchSuccess,
  userDetailsFetchFailure,
  scheduleCallManagementSuccess,
  scheduleCallManagementFailure,
  expertWiseTimeSlotSuccess,
  expertWiseTimeSlotFailure,
  ExpertSchduleDataSuccess,
  ExpertSchduleDataFailure,
  AllSchduledatalistingSuccess,
  AllSchduledatalistingFailure,
  AllupcommingCallListingSuccess,
  AllupcommingCallListingFailure,
  UserProfileUpdateFailure,
  UserProfileUpdateSuccess,
  UserChangePasswordSuccess,
  UserChangePasswordFailure,
  UserActiveDeactiveaccSuccess,
  UserActiveDeactiveaccFailure,
  selectedCategoriesSuccess,
  selectedCategoriesFailure,
  termsConditionSuccess,
  termsConditionFailure,
  privacyPolicySuccess,
  privacyPolicyFailure,
} from '../reducer/ProfileReducer';
let getItem = state => state.AuthReducer;
//
export function* ExpertprofileDetailSaga(action) {
  let items = yield select(getItem);
  console.log('token', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  console.log('token++++++', items.token);
  try {
    let response = yield call(
      getApi,
      'expert-profile',

      header,
    );
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(ExpertProfileDetailSuccess(response?.data));
      // showErrorAlert(response?.data?.message);
    } else {
      yield put(ExpertProfileDetailFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(ExpertProfileDetailFailure(error));
    // showErrorAlert(response?.data?.message);
  }
}

//UpdateExpertProfile

export function* UpdateExpertProfileSaga(action) {
  let items = yield select(getItem);
  console.log('sssssssss', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.token,
  };
  console.log('token++++++', items.token);
  try {
    let response = yield call(
      postApi,
      'expert-edit-profile',
      action.payload,
      header,
    );
    console.log('Profile detail response::::::  sssssssss', response);
    if (response?.data?.status == 200) {
      yield put(ExpertProfileUpdateSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(ExpertProfileUpdateFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error: sssssssss', error);
    yield put(ExpertProfileUpdateFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}
//slotCreate
export function* slotCreateSaga(action) {
  let items = yield select(getItem);
  console.log('token', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(postApi, 'time-slots', action.payload, header);
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(SlotCreateSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(SlotCreateFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(SlotCreateFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}

//DateWiseSlot
export function* DateWiseSlotSaga(action) {
  let items = yield select(getItem);
  console.log('token', items.token);
  let header = {
    Accept: 'application/json',
    // contenttype: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.token,
  };
  console.log('token++++++', items.token);
  try {
    let response = yield call(
      postApi,
      'date-wise-time',
      action.payload,
      header,
    );
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(datewiseSlotSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(datewiseSlotFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(datewiseSlotFailure(error));
    showErrorAlert(response?.data?.message);
  }
}

export function* fetchAllCatUserSaga(action) {
  let items = yield select(getItem);
  console.log('tokentokentokentoken', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, 'all-categories', header);

    if (response?.data?.status === 200) {
      yield put(fetchAllCatUserSuccess(response?.data));
    } else {
      yield put(fetchAllCatUserFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(fetchAllCatUserFailure(error));
    // showErrorAlert(response?.data?.message);
  }
}

//forgotPassword
export function* createUserCatSaga(action) {
  let items = yield select(getItem);

  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(
      postApi,
      'user-interested-category',
      action.payload,
      header,
    );
    console.log('okkkkk', response);

    if (response?.data?.status === 200) {
      yield put(createUserCatSuccess(response?.data));
    } else {
      yield put(createUserCatFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(createUserCatFailure(error));
    // showErrorAlert(response?.data?.message);
  }
}

//fetch all experts
export function* fetchAllExpertSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, 'experts', header);

    if (response?.data?.status === 200) {
      yield put(fetchAllExpertSuccess(response?.data));
    } else {
      yield put(fetchAllExpertFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(fetchAllExpertFailure(error));
    // showErrorAlert(response?.data?.message);
  }
}

//fetch experts details
export function* fetchExpertDetailsSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, `expert/${action.payload}`, header);

    if (response?.data?.status === 200) {
      yield put(fetchExpertDetailsSuccess(response?.data));
    } else {
      yield put(fetchExpertDetailsFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(fetchExpertDetailsFailure(error));
    // showErrorAlert(response?.data?.message);
  }
}

//fetch time slot respective of that user
export function* fetchTimeSlotSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, `all-timeslot/${action.payload}`, header);

    if (response?.data?.status === 200) {
      yield put(fetchTimeSlotSuccess(response?.data));
    } else {
      yield put(fetchTimeSlotFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(fetchTimeSlotFailure(error));
    // showErrorAlert(response?.data?.message);
  }
}
//esit user data get
export function* userDetailsFetchSaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };
  try {
    let response = yield call(getApi, 'user-profile', header);

    if (response?.data?.status === 200) {
      yield put(userDetailsFetchSuccess(response?.data));
    } else {
      yield put(userDetailsFetchFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(userDetailsFetchFailure(error));
    // showErrorAlert(response?.data?.message);
  }
}

//schedule call management
export function* scheduleCallManagementSaga(action) {
  let items = yield select(getItem);
  console.log('token', items.token);
  let header = {
    Accept: 'application/json',
    //contenttype: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.token,
  };
  console.log('token++++++', items.token);
  try {
    let response = yield call(postApi, 'schedule-call', action.payload, header);
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(scheduleCallManagementSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(scheduleCallManagementFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address error:', error);
    yield put(scheduleCallManagementFailure(error));
    showErrorAlert(response?.data?.message);
  }
}

//expert wise time slot
export function* expertWiseTimeSloSaga(action) {
  let items = yield select(getItem);
  console.log('token', items.token);
  let header = {
    Accept: 'application/json',
    // contenttype: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(
      postApi,
      'expert-time-slots',
      action.payload,
      header,
    );
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(expertWiseTimeSlotSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(expertWiseTimeSlotFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(expertWiseTimeSlotFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}

//ExpertSchduleData
export function* ExpertSchduleDataSaga(action) {
  let items = yield select(getItem);
  console.log('token', items.token);
  let header = {
    Accept: 'application/json',
    // contenttype: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(
      postApi,
      'get-schedule-call',
      action.payload,
      header,
    );
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(ExpertSchduleDataSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(ExpertSchduleDataFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(ExpertSchduleDataFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}
//AllupcommingCallListing
export function* AllupcommingCallListingSaga(action) {
  let items = yield select(getItem);
  console.log('tokensssss', items.token);
  let header = {
    Accept: 'application/json',
    // contenttype: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(getApi, 'all-upcoming-call', header);
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(AllupcommingCallListingSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(AllupcommingCallListingFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(AllupcommingCallListingFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}

//UseProfileUpdate
export function* UseProfileUpdateSaga(action) {
  let items = yield select(getItem);
  console.log('tokensssss', items.token);
  let header = {
    Accept: 'application/json',
    // contenttype: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(postApi, 'user-update', action.payload, header);
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(UserProfileUpdateSuccess(response?.data));
      showErrorAlert(response?.data?.message);
    } else {
      yield put(UserProfileUpdateFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(UserProfileUpdateFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}
//UserChangePassword
export function* UserChangePasswordSaga(action) {
  let items = yield select(getItem);
  console.log('tokensssss', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(
      postApi,
      'user-update-password',
      action.payload,
      header,
    );
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(UserChangePasswordSuccess(response?.data));
      // showErrorAlert(response?.data?.message);
    } else {
      yield put(UserChangePasswordFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(UserChangePasswordFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}
//userActiveDeactiveAcc
export function* UserActiveDeactiveAccSaga(action) {
  let items = yield select(getItem);
  console.log('tokensssss', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    // contenttype: 'multipart/form-data',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(
      postApi,
      'user-deactivate',
      action.payload,
      header,
    );
    console.log('Profile detail response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(UserActiveDeactiveaccSuccess(response?.data));
      // showErrorAlert(response?.data?.message);
    } else {
      yield put(UserActiveDeactiveaccFailure(response?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(UserActiveDeactiveaccFailure(error));
    showErrorAlert(error?.response?.data?.message);
  }
}

//selected categories
export function* selectedCategoriesSaga(action) {
  let items = yield select(getItem);
  console.log('tokensssss', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(
      getApi,
      'selected-categories',
      // action.payload,
      header,
    );
    console.log('selected-categories response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(selectedCategoriesSuccess(response?.data?.data));
      // showErrorAlert(response?.data?.message);
    } else {
      yield put(selectedCategoriesFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(selectedCategoriesFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

///terms and condition
export function* termsConditionSaga(action) {
  let items = yield select(getItem);
  console.log('tokensssss', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(
      getApi,
      'terms-and-condition',
      // action.payload,
      header,
    );
    console.log('terms-and-condition response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(termsConditionSuccess(response?.data?.data));
      // showErrorAlert(response?.data?.message);
    } else {
      yield put(termsConditionFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(termsConditionFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

///privacy policy
export function* privacyPolicySaga(action) {
  let items = yield select(getItem);
  console.log('tokensssss', items.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.token,
  };

  try {
    let response = yield call(
      getApi,
      'privacy-policy',
      // action.payload,
      header,
    );
    console.log('privacy Policy response:::::: ', response);
    if (response?.data?.status == 200) {
      yield put(privacyPolicySuccess(response?.data?.data));
      // showErrorAlert(response?.data?.message);
    } else {
      yield put(privacyPolicyFailure(response?.data));
      // showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    console.log('add address errorll:', error);
    yield put(privacyPolicyFailure(error));
    // showErrorAlert(error?.response?.data?.message);
  }
}

const watchFunction = [
  (function* () {yield takeLatest('Profile/UserActiveDeactiveaccRequest',UserActiveDeactiveAccSaga,);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/UserChangePasswordRequest',
      UserChangePasswordSaga,
    );
  })(),
  (function* () {
    yield takeLatest('Profile/UserProfileUpdateRequest', UseProfileUpdateSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/ExpertSchduleDataRequest', ExpertSchduleDataSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/AllupcommingCallListingRequest',
      AllupcommingCallListingSaga,
    );
  })(),
  (function* () {
    yield takeLatest('Profile/datewiseSlotRequest', DateWiseSlotSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/SlotCreateRequest', slotCreateSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/ExpertProfileUpdateRequest',
      UpdateExpertProfileSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Profile/ExpertProfileDetailRequest',
      ExpertprofileDetailSaga,
    );
  })(),
  (function* () {
    yield takeLatest('Profile/fetchAllCatUserRequest', fetchAllCatUserSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/createUserCatRequest', createUserCatSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/fetchAllExpertRequest', fetchAllExpertSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/fetchExpertDetailsRequest',
      fetchExpertDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest('Profile/fetchTimeSlotRequest', fetchTimeSlotSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/userDetailsFetchRequest', userDetailsFetchSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Profile/scheduleCallManagementRequest',
      scheduleCallManagementSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Profile/expertWiseTimeSlotRequest',
      expertWiseTimeSloSaga,
    );
  })(),
  (function* () {
    yield takeLatest('Profile/selectedCategoriesRequest', selectedCategoriesSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/termsConditionRequest', termsConditionSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/privacyPolicyRequest', privacyPolicySaga);
  })(),
];

export default watchFunction;
