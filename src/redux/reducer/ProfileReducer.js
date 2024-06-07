import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  ExpertProfileDetailRes: {},
  ExpertProfileUpdateRes: {},
  SlotCreateRes: {},
  datewiseSlotRes: {},
  status: {},
  fetchAllCatUserResponse: {},
  createUserCatResponse: {},
  fetchAllExpertResponse: {},
  fetchExpertDetailsResponse: {},
  fetchTimeSlotResponse: {}, //
  userDetailsFetchResponse: {},
  scheduleCallManagementResponse: {}, //
  expertWiseTimeSlotResponse: {}, //
  ExpertSchduleDataResponse:{},
  showCategoryList:false,
  AllupcommingCallListingRes:{},
  UserProfileUpdateRes:{},
  UserChangePasswordRes:{},
  UserActiveDeactiveaccRes:{},
  termsConditionResponse:{},
  privacyPolicyResponse:{},
};
const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    //ExpertProfile
    ExpertProfileDetailRequest(state, action) {
      state.status = action.type;
    },
    ExpertProfileDetailSuccess(state, action) {
      state.ExpertProfileDetailRes = action.payload;
      state.status = action.type;
    },
    ExpertProfileDetailFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //ExpertProfileUpdate
    ExpertProfileUpdateRequest(state, action) {
      state.status = action.type;
    },
    ExpertProfileUpdateSuccess(state, action) {
      state.ExpertProfileUpdateRes = action.payload;
      state.status = action.type;
    },
    ExpertProfileUpdateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //SlotCreate
    SlotCreateRequest(state, action) {
      state.status = action.type;
    },
    SlotCreateSuccess(state, action) {
      state.SlotCreateRes = action.payload;
      state.status = action.type;
    },
    SlotCreateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //datewiseSlot
    datewiseSlotRequest(state, action) {
      state.status = action.type;
    },
    datewiseSlotSuccess(state, action) {
      state.datewiseSlotRes = action.payload;
      state.status = action.type;
    },
    datewiseSlotFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //fetch all category user
    fetchAllCatUserRequest(state, action) {
      state.status = action.type;
    },
    fetchAllCatUserSuccess(state, action) {
      state.fetchAllCatUserResponse = action.payload;
      state.status = action.type;
      
    },
    fetchAllCatUserFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //create user categories after select
    createUserCatRequest(state, action) {
      state.status = action.type;
    },
    createUserCatSuccess(state, action) {
      state.createUserCatResponse = action.payload;
      state.status = action.type;
    },
    createUserCatFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //fetch all experts
    fetchAllExpertRequest(state, action) {
      state.status = action.type;
    },
    fetchAllExpertSuccess(state, action) {
      state.fetchAllExpertResponse = action.payload;
      state.status = action.type;
    },
    fetchAllExpertFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //fetch experts details
    fetchExpertDetailsRequest(state, action) {
      state.status = action.type;
    },
    fetchExpertDetailsSuccess(state, action) {
      state.fetchExpertDetailsResponse = action.payload;
      state.status = action.type;
    },
    fetchExpertDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //fetch time slot respective of that user
    fetchTimeSlotRequest(state, action) {
      state.status = action.type;
    },
    fetchTimeSlotSuccess(state, action) {
      state.fetchTimeSlotResponse = action.payload;
      state.status = action.type;
    },
    fetchTimeSlotFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

     //esit user data get
     userDetailsFetchRequest(state, action) {
      state.status = action.type;
    },
    userDetailsFetchSuccess(state, action) {
      state.userDetailsFetchResponse = action.payload;
      state.status = action.type;
    },
    userDetailsFetchFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

      //schedule call management 
      scheduleCallManagementRequest(state, action) {
        state.status = action.type;
      },
      scheduleCallManagementSuccess(state, action) {
        state.scheduleCallManagementResponse = action.payload;
        state.status = action.type;
      },
      scheduleCallManagementFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },

       //expert wise time slot
       expertWiseTimeSlotRequest(state, action) {
        state.status = action.type;
      },
      expertWiseTimeSlotSuccess(state, action) {
        state.expertWiseTimeSlotResponse = action.payload;
        state.status = action.type;
      },
      expertWiseTimeSlotFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },
      //ExpertSchduleData
      ExpertSchduleDataRequest(state, action) {
        state.status = action.type;
      },
      ExpertSchduleDataSuccess(state, action) {
        state.ExpertSchduleDataResponse = action.payload;
        state.status = action.type;
      },
      ExpertSchduleDataFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },
      
      //AllupcommingCallListing
      AllupcommingCallListingRequest(state, action) {
        state.status = action.type;
      },
      AllupcommingCallListingSuccess(state, action) {
        state.AllupcommingCallListingRes = action.payload;
        state.status = action.type;
      },
      AllupcommingCallListingFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },
      //UserProfileUpdate
      UserProfileUpdateRequest(state, action) {
        state.status = action.type;
      },
      UserProfileUpdateSuccess(state, action) {
        state.UserProfileUpdateRes = action.payload;
        state.status = action.type;
      },
      UserProfileUpdateFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },
      //UserChangePassword
      UserChangePasswordRequest(state, action) {
        state.status = action.type;
      },
      UserChangePasswordSuccess(state, action) {
        state.UserChangePasswordRes = action.payload;
        state.status = action.type;
      },
      UserChangePasswordFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },
      //UserActiveDeactiveacc
      UserActiveDeactiveaccRequest(state, action) {
        state.status = action.type;
      },
      UserActiveDeactiveaccSuccess(state, action) {
        state.UserActiveDeactiveaccRes = action.payload;
        state.status = action.type;
      },
      UserActiveDeactiveaccFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },

      ///selected categories
      selectedCategoriesRequest(state, action) {
        state.status = action.type;
      },
      selectedCategoriesSuccess(state, action) {
        state.showCategoryList = true
        // state.selectedCategoriesRes = action.payload;
        state.status = action.type;
      },
      selectedCategoriesFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },

       ///terms and conditions
       termsConditionRequest(state, action) {
        state.status = action.type;
      },
      termsConditionSuccess(state, action) {
        state.termsConditionResponse = action.payload;
        state.status = action.type;
      },
      termsConditionFailure(state, action) {
        state.error = action.error;
        state.status = action.type;
      },

       //privacy policy
    privacyPolicyRequest(state, action) {
      state.status = action.type;
    },
    privacyPolicySuccess(state, action) {
      state.privacyPolicyResponse = action.payload;
      state.status = action.type;
    },
    privacyPolicyFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

  },
});
export const {
  UserActiveDeactiveaccRequest,
UserActiveDeactiveaccSuccess,
UserActiveDeactiveaccFailure,
  UserChangePasswordRequest,
UserChangePasswordSuccess,
UserChangePasswordFailure,
  UserProfileUpdateRequest,
UserProfileUpdateSuccess,
UserProfileUpdateFailure,
  AllupcommingCallListingRequest,
  AllupcommingCallListingSuccess,
  AllupcommingCallListingFailure,
  ExpertSchduleDataRequest,
ExpertSchduleDataSuccess,
ExpertSchduleDataFailure,
  fetchAllCatUserRequest,
  fetchAllCatUserSuccess,
  fetchAllCatUserFailure,
  createUserCatRequest,
  createUserCatSuccess,
  createUserCatFailure,
  fetchAllExpertRequest,
  fetchAllExpertSuccess,
  fetchAllExpertFailure,
  fetchExpertDetailsRequest,
  fetchExpertDetailsSuccess,
  fetchExpertDetailsFailure,
  fetchTimeSlotRequest,
  fetchTimeSlotSuccess,
  fetchTimeSlotFailure,
  datewiseSlotRequest,
  datewiseSlotSuccess,
  datewiseSlotFailure,
  SlotCreateRequest,
  SlotCreateSuccess,
  SlotCreateFailure,
  ExpertProfileDetailRequest,
  ExpertProfileDetailSuccess,
  ExpertProfileDetailFailure,
  ExpertProfileUpdateRequest,
  ExpertProfileUpdateSuccess,
  ExpertProfileUpdateFailure,
  userDetailsFetchRequest,
userDetailsFetchSuccess,
userDetailsFetchFailure,

scheduleCallManagementRequest,
scheduleCallManagementSuccess,
scheduleCallManagementFailure,

expertWiseTimeSlotRequest,
expertWiseTimeSlotSuccess,
expertWiseTimeSlotFailure,

selectedCategoriesRequest,
selectedCategoriesSuccess,
selectedCategoriesFailure,

termsConditionRequest,
termsConditionSuccess,
termsConditionFailure,

privacyPolicyRequest,
privacyPolicySuccess,
privacyPolicyFailure,

} = ProfileSlice.actions;
export default ProfileSlice.reducer;
