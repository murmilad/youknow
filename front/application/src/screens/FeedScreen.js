import React from 'react';

import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AbstractText from '../components/widget/AbstractText';
import Screen from '../components/Screen';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FeedScreen({ status }) {
  const { t, i18n } = useTranslation();

  return (
    <Screen>
      <AbstractText>{t('header.application')}</AbstractText>
    </Screen>
  );
}

FeedScreen.propTypes = {
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(FeedScreen);
