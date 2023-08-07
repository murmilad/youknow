import React, { ReactPropTypes } from 'react';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AbstractText from '../components/widget/AbstractText';
import Screen from '../components/Screen';

function FeedScreen({ status }) {
  const { t, i18n } = useTranslation();

  return (
    <Screen>
      <AbstractText>{t('header.application')}</AbstractText>
    </Screen>
  );
}

FeedScreen.propTypes = {
  status: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(FeedScreen);
