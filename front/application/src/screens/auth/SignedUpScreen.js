import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import tw from '../../../tailwind';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';
import AbstractButton from '../../components/widget/AbstractButton';
import * as actions from '../../redux/constants/action';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function SignedUpScreen({ status }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const handleResetted = () => {
    dispatch({
      type: actions.CLEAN_LOGIN_STATUS,
    });
  };

  return (
    <AuthScreen isLoading={false}>
      <View style={tw`w-full h-30 justify-center`}>
        <AbstractText style={tw`text-center`}>{t('header.signed-up')}</AbstractText>
        <AbstractButton header={t('action.goto-login')} onPress={handleResetted} />
      </View>
    </AuthScreen>
  );
}
SignedUpScreen.propTypes = {
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(SignedUpScreen);
