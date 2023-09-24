import React from 'react';

import { connect, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import tw from '../../../tailwind';

import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';
import AbstractButton from '../../components/widget/AbstractButton';
import * as actions from '../../redux/constants/action';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function VerifiedScreen({ status, navigation }) {
  const dispatch = useDispatch();

  const handleVerified = () => {
    dispatch({
      type: actions.CLEAN_LOGIN_STATUS,
    });
  };
  const { t, i18n } = useTranslation();

  return (
    <AuthScreen isLoading={status.is_loading}>
      <View style={tw`w-full h-30 justify-center`}>
        <AbstractText style={tw`text-center`}>{t('header.verified')}</AbstractText>
      </View>
      <AbstractButton header={t('action.goto-login')} onPress={handleVerified} />
    </AuthScreen>
  );
}

VerifiedScreen.propTypes = {
  status: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(VerifiedScreen);
