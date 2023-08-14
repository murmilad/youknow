import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function ForgottenScreen({ status }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  return (
    <AuthScreen isLoading={false}>
      <AbstractText>{t('header.email-sent')}</AbstractText>
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
