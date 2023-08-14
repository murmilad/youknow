import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';
import AbstractButton from '../../components/widget/AbstractButton';
import * as actions from '../../redux/actions';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function VerifyScreen({ status, navigation }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const handleVerify = () => {
    dispatch({
      type: actions.VERIFY,
      payload: {
        reset: {
          verifyHash: navigation.getParam('verifyHash'),
        },
      },
    });
  };

  return (
    <AuthScreen isLoading={status.is_loading}>
      <AbstractText>{t('header.verify')}</AbstractText>
      <AbstractButton header={t('action.verify')} onPress={handleVerify} />
    </AuthScreen>
  );
}

VerifyScreen.propTypes = {
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(VerifyScreen);
