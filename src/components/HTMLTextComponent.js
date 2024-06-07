import React from 'react';
import {View, StyleSheet} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Colors } from '../themes/Colors';
import normalize from '../utils/helpers/dimen';
import { Fonts } from '../themes/ImagePath';

const HTMLTextComponent = props => {
  const {htmlContent} = props;
  // console.log(typeof htmlContent, 'htmlContent');

  // const htmlText = htmlContent && htmlContent.replace(/(<\/.+>)(\s+)(<)/g, '');
  return (
    <View>
      {htmlContent && (
        <HTMLView
          addLineBreaks={false}
          value={htmlContent}
          stylesheet={styles}
          //onLinkPress={url => openInAppLink(url)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  p: {
    fontFamily: Fonts.Roboto_Regular,
    fontSize: normalize(13),
    color: Colors.black,
    marginTop: normalize(5),
    lineHeight: normalize(23),
  },
  div: {
    fontFamily: Fonts.Roboto_Medium,
    fontSize: 14,
    color: Colors.black,
  },
  strong: {
    fontFamily: Fonts.Roboto_Medium,
    fontSize: 14,
    color: Colors.black,
  },
  a: {
    fontFamily: Fonts.Roboto_Medium,
    fontSize: 14,
    color: Colors.black,
    textDecorationLine: 'underline',
  },
  li: {
    fontFamily: Fonts.Roboto_Medium,
    fontSize: 14,
    color: Colors.black,
  },
});
export default HTMLTextComponent;
