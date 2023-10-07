import React from 'react';
import { View } from 'react-native';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';

import tw from '../../../tailwind';
import AbstractButton from '../../components/widget/AbstractButton';
import * as actions from '../../redux/constants/action';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function ResettedScreen({ status }) {
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
        <AbstractText style={tw`text-center`}>{t('header.reseted')}</AbstractText>
      </View>
      <AbstractButton header={t('action.goto-login')} onPress={handleResetted} />
    </AuthScreen>
  );
}

ResettedScreen.propTypes = {
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(ResettedScreen);
