import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
  Image,
} from 'react-native';
import normalize from '../utils/helpers/dimen';
import {Colors} from '../themes/Colors';
import {Fonts, Icons} from '../themes/ImagePath';
export default class Accrodian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          ref={this.accordian}
          style={[
            styles.row,
            {
              borderBottomLeftRadius: this.state.expanded ? 0 : 10,
              borderBottomRightRadius: this.state.expanded ? 0 : 10,
            },
          ]}
          onPress={() => this.toggleExpand()}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              fontFamilyL: Fonts.Poppins_Light,
              lineHeight: 21,
              color: '#000000',
            }}>
            {this.props.title}
          </Text>
          <Image
            source={this.state.expanded ? Icons.minus : Icons.plus}
            style={{width: 10, height: 10, resizeMode: 'contain', color: Colors.lightGrey}}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={styles.child}>
           {Platform.OS=='ios'? <View
            style={{height:1,backgroundColor:'rgba(0, 0, 0, 0.08)',bottom:17}}
            />:null}
            <Text style={{left: 12,color:'black'}}>{this.props.data}</Text>
          </View>
        )}
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightGrey,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:normalize(50),
    width:normalize(280),
    marginHorizontal:1,
    paddingLeft:normalize(18),
    paddingRight:normalize(16),
    margin:normalize(3),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    elevation: 3,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  parentHr: {
    height: 1,
    color: Colors.white,
    width: '50%',
  },
  child: {
    padding:normalize(10),
    // width:normalize(320),
    paddingLeft:normalize(10),
    // paddingRight: 18,
    margin: 4,
    elevation: 3,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    // left: 5,
    backgroundColor: '#FFFFFF',
    bottom: normalize(8),
    borderBottomLeftRadius: 10,
    width:normalize(280),
    marginHorizontal:1,
    borderBottomRightRadius: 10,
  },
});
