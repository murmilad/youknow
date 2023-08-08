import React from 'react';

import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function SignedUpScreen({ status }) {
  const { t, i18n } = useTranslation();

  return (
    <AuthScreen>
      <AbstractText>{t('header.signed-up')}</AbstractText>
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
