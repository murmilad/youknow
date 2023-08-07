import React, { ReactPropTypes } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';
import AbstractButton from '../../components/widget/AbstractButton';
import * as actions from '../../redux/actions';

function VerifyScreen({ status }) {
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
    <AuthScreen>
      <AbstractText>{t('header.verify')}</AbstractText>
      <AbstractButton header={t('action.verify')} onPress={handleVerify} />
    </AuthScreen>
  );
}

VerifyScreen.propTypes = {
  status: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(VerifyScreen);
