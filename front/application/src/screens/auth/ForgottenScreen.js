import React from 'react';
import { View } from 'react-native';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';

import tw from '../../../tailwind';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function ForgottenScreen({ status }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  return (
    <AuthScreen isLoading={false}>
      <View style={tw`w-full h-30 justify-center`}>
        <AbstractText style={tw`text-center`}>{t('header.email-sent')}</AbstractText>
      </View>
    </AuthScreen>
  );
}

ForgottenScreen.propTypes = {
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(ForgottenScreen);
