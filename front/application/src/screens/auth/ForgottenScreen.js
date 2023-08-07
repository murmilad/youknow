import React, { ReactPropTypes } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';

function ForgottenScreen({ status }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  return (
    <AuthScreen>
      <AbstractText>{t('header.email-sent')}</AbstractText>
    </AuthScreen>
  );
}

ForgottenScreen.propTypes = {
  status: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(ForgottenScreen);
