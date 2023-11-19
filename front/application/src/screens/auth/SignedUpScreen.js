import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import tw from '../../../tailwind';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function SignedUpScreen({ status }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  return (
    <AuthScreen isLoading={false}>
      <View style={tw`w-full h-30 justify-center`}>
        <AbstractText style={tw`text-center`}>{t('header.signed-up')}</AbstractText>
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
