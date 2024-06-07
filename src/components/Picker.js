import React from 'react';
import {FlatList, SafeAreaView, View, Platform} from 'react-native';
import PropTypes from 'prop-types';

import Modal from 'react-native-modal';
import normalize from '../utils/helpers/dimen'
export default function Picker(props) {
  function onBackdropPress() {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  }

  return (
    <SafeAreaView>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        style={{width: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={500}
        onBackButtonPress={() => onBackdropPress()}
        onBackdropPress={() => onBackdropPress()}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ddd',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: props.backgroundColor,
            borderRadius: normalize(7),
            borderWidth: normalize(2),
            overflow: 'hidden',
            borderColor: props.backgroundColor,
            maxHeight: normalize(200),
            paddingLeft: props.paddingLeft,
            paddingBottom: Platform.OS == 'ios' ? normalize(16) : 0,
          }}>
          <FlatList
            data={props.dataList}
            contentContainerStyle={[
              Platform.OS == 'ios' ? {paddingBottom: normalize(15)} : null,
            ]}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={props.renderData}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

Picker.propTypes = {
  dataList: PropTypes.array,
  modalVisible: PropTypes.bool,
  renderData: PropTypes.func,
  onBackdropPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  paddingLeft: PropTypes.number,
};

Picker.defaultProps = {
  dataList: [],
  modalVisible: false,
  renderData: null,
  onBackdropPress: null,
  backgroundColor: 'white',
  height: normalize(400),
  paddingLeft: normalize(20),
};
