import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  token: null,
  isLoading: true,
  error: {},
  signUpResponse: {},
  signinResponse: {},
  CountryListResponse: {},
  categoryListResponse: {},
  LanguageListResponse: {},
  forgotpasswordResponse: {},
  otpResponse: {},
  ResetPasswordResponse: {},
  ResendOtpResponse: {},
  onboardingScreenResponse: {},
  UserSignUpResponse: {},
  logoutResponse:null,
  userType: '',
  DataStoreResponse: {},
  
  StoreHere:{
    country:{},
    companyName:{},
address:{},
language:{},
category:{},
dateDOB:{},
  }
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    //getToken
    getTokenRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getTokenSuccess(state, action) {
      state.isLoading = false;
      state.token = action.payload;
      state.status = action.type;
    },
    setUserTypeSuccess(state, action) {
      state.isLoading = false;
      state.userType = action.payload;
      state.status = action.type;
    },
    getTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    //SignUp
    signUpRequest(state, action) {
      state.status = action.type;
    },
    signUpSuccess(state, action) {
      // state.showCategoryList = true;
      state.signUpResponse = action.payload;
      state.status = action.type;
      
    },
    signUpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //SignIn
    signinRequest(state, action) {
      state.status = action.type;
    },
    signinSuccess(state, action) {
      state.signinResponse = action.payload;
      state.status = action.type;
    },
    signinFailure(state, action) {
      state.error = action.error;

      state.status = action.type;
    },
    //countryName
    CountryListRequest(state, action) {
      state.status = action.type;
    },
    CountryListSuccess(state, action) {
      state.CountryListResponse = action.payload;
      state.status = action.type;
    },
    CountryListFailure(state, action) {
      state.error = action.error;

      state.status = action.type;
    },
    //categoryList
    categoryListRequest(state, action) {
      state.status = action.type;
    },
    categoryListtSuccess(state, action) {
      state.categoryListResponse = action.payload;
      state.status = action.type;
    },
    categoryListFailure(state, action) {
      state.error = action.error;

      state.status = action.type;
    },
    //LanguageList
    LanguageListRequest(state, action) {
      state.status = action.type;
    },
    LanguageListtSuccess(state, action) {
      state.LanguageListResponse = action.payload;
      state.status = action.type;
    },
    LanguageListFailure(state, action) {
      state.error = action.error;

      state.status = action.type;
    },

    forgotpasswordRequest(state, action) {
      state.status = action.type;
    },
    forgotpasswordSuccess(state, action) {
      state.forgotpasswordResponse = action.payload;
      state.status = action.type;
    },
    forgotpasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //   //Otp Screen
    otpRequest(state, action) {
      state.status = action.type;
    },
    otpSuccess(state, action) {
      state.otpResponse = action.payload;
      state.status = action.type;
    },
    otpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //ResetPassword
    ResetPasswordRequest(state, action) {
      state.status = action.type;
    },
    ResetPasswordSuccess(state, action) {
      state.ResetPasswordResponse = action.payload;
      state.status = action.type;
    },
    ResetPasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //onboardingScreen
    onboardingScreenRequest(state, action) {
      state.status = action.type;
    },
    onboardingScreenSuccess(state, action) {
      state.onboardingScreenResponse = action.payload;
      state.status = action.type;
    },
    onboardingScreenFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //UserSignUp
    UserSignUpRequest(state, action) {
      state.status = action.type;
    },
    UserSignUpSuccess(state, action) {
      state.UserSignUpResponse = action.payload;
      state.status = action.type;
    },
    UserSignUpFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //logout
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.logoutResponse = action.payload;
      state.status = action.type;
    },
    logoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    ////////Store data //////////////
    DataStoreRequest(state, action) {
      state.status = action.type;
    },
    DataStoreSuccess(state, action) {
      state.DataStoreResponse = action.payload;
      state.status = action.type;
    },
    DataStoreFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },



    storeCountry(state,action){
      state.StoreHere.country=action.payload
    },
    setCompanyName(state,action){
      state.StoreHere.companyName=action.payload
    },
    setAddress(state,action){
      state.StoreHere.address=action.payload
    },
    storeLanguage(state,action){
      state.StoreHere.language=action.payload
    },
    storeCategory(state,action){
      state.StoreHere.category=action.payload
    },
    setDateDOB(state,action){
      state.StoreHere.dateDOB=action.payload
    },
  },
});

export const {
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  UserSignUpRequest,
  UserSignUpSuccess,
  UserSignUpFailure,
  onboardingScreenRequest,
  onboardingScreenSuccess,
  onboardingScreenFailure,
  forgotpasswordRequest,
  forgotpasswordSuccess,
  forgotpasswordFailure,
  otpRequest,
  otpSuccess,
  otpFailure,
  ResetPasswordRequest,
  ResetPasswordSuccess,
  ResetPasswordFailure,
  ResendOtpRequest,
  ResendOtpSuccess,
  ResendOtpFailure,
  LanguageListRequest,
  LanguageListtSuccess,
  LanguageListFailure,
  categoryListRequest,
  categoryListtSuccess,
  categoryListFailure,
  CountryListRequest,
  CountryListSuccess,
  CountryListFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signinRequest,
  signinSuccess,
  signinFailure,
  getTokenRequest,
  getTokenSuccess,
  setUserTypeSuccess,
  getTokenFailure,
  DataStoreRequest,
  DataStoreFailure,
  DataStoreSuccess,
  storeCountry,
  setCompanyName,
  setAddress,
  storeLanguage,
  storeCategory,
  setDateDOB,
} = AuthSlice.actions;

export default AuthSlice.reducer;
