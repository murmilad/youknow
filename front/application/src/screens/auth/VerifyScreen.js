import React from 'react';

import { connect, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import tw from '../../../tailwind';

import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';
import AbstractButton from '../../components/widget/AbstractButton';
import * as actions from '../../redux/actions';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function VerifyScreen({ status, route }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const handleVerify = () => {
    dispatch({
      type: actions.VERIFY,
      payload: {
        verifyHash: route.params.verifyHash,
      },
    });
  };

  return (
    <AuthScreen isLoading={status.is_loading}>
      <View style={tw`w-full h-30 justify-center`}>
        <AbstractText style={tw`text-center`}>{t('header.verify')}</AbstractText>
      </View>
      <AbstractButton header={t('action.verify')} onPress={handleVerify} />
    </AuthScreen>
  );
}

VerifyScreen.propTypes = {
  status: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(VerifyScreen);
