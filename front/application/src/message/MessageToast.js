import React, { useEffect } from 'react';

import Toast from 'react-native-toast-message';
import { connect, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';

import * as actions from '../redux/actions';
import tw from '../../tailwind';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

const toastConfig = {
  infoToast: ({ text1, props }) => (
    <View
      style={tw`ml-2 mr-2 mt-3 mb-3 p-3 bg-gray-50 opacity-90 rounded-lg overflow-hidden items-center self-stretch`}
    >
      <Text style={tw`m-2 pl-2 text-gray-500 font-bold`}>{text1}</Text>
    </View>
  ),
  errorToast: ({ text1, props }) => (
    <View
      style={tw`ml-2 mr-2 mt-3 mb-3 p-3 bg-gray-50 opacity-90 rounded-lg overflow-hidden items-center self-stretch`}
    >
      <Text style={tw`m-2 pl-2 text-red-500 font-bold`}>{text1}</Text>
    </View>
  ),
};

function MessageToast({ message }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (message.error) {
      if (message.error) {
        Toast.show({
          type: 'errorToast',
          text1: message.error,
          visibilityTime: 3000,
        });
        dispatch({ type: actions.MESSAGE_CLEAN });
      } else {
        Toast.hide();
      }
    }
  }, [dispatch, message]);

  return <Toast config={toastConfig} />;
}

MessageToast.propTypes = {
  message: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps)(MessageToast);
