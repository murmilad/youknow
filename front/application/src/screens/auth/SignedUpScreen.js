import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

function SignedUp({ status }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  return (
    <AuthScreen>
      <AbstractText>{t('header.signed-up')}</AbstractText>
    </AuthScreen>
  );
}

const mapStateToProps = (state) => ({
  status: state.status,
});

export default SignedUpScreen = connect(mapStateToProps)(SignedUp);
