import React, { ReactPropTypes } from 'react';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';

function SignedUpScreen({ status }) {
  const { t, i18n } = useTranslation();

  return (
    <AuthScreen>
      <AbstractText>{t('header.signed-up')}</AbstractText>
    </AuthScreen>
  );
}
SignedUpScreen.propTypes = {
  status: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(SignedUpScreen);
