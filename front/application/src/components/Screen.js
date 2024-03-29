import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function Screen({ children }) {
  return (
    <SafeAreaView style={[styles.screen]}>
      <View style={[styles.view]}>{children}</View>
    </SafeAreaView>
  );
}

Screen.propTypes = {
  children: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
