import React, { ReactPropTypes } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

Screen.propTypes = {
  style: ReactPropTypes.object.isRequired,
  children: ReactPropTypes.object.isRequired,
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
