import React, { ReactPropTypes } from 'react';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';

function ResettedScreen({ status }) {
  const { t, i18n } = useTranslation();

  return (
    <AuthScreen>
      <AbstractText>{t('header.reseted')}</AbstractText>
    </AuthScreen>
  );
}

ResettedScreen.propTypes = {
  status: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(ResettedScreen);
