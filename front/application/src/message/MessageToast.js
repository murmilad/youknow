import React, { useEffect, ReactPropTypes } from 'react';
import Toast from 'react-native-toast-message';
import { connect, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';

import * as actions from '../redux/actions';
import tw from '../../tailwind';

const toastConfig = {
  infoToast: ({ text1, props }) => (
    <View
      style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone_trans-200 rounded-8 overflow-hidden items-center self-stretch`}
    >
      <Text style={tw`m-2 pl-2 text-stone-500 font-bold text-normal`}>{text1}</Text>
    </View>
  ),
  errorToast: ({ text1, props }) => (
    <View
      style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone_trans-200 rounded-8 overflow-hidden items-center self-stretch`}
    >
      <Text style={tw`m-2 pl-2 text-red-500 font-bold text-normal`}>{text1}</Text>
    </View>
  ),
};

function MessageToast({ message }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert && Object.keys(alert).length > 0) {
      if (alert.err) {
        Toast.show({
          type: 'errorToast',
          text1: alert.err,
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
  message: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  message: state.message,
});

export default connect(mapStateToProps)(MessageToast);
