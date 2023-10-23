import React, { useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import tw from '../../../tailwind';
import AuthScreen from '../../components/AuthScreen';
import AbstractText from '../../components/widget/AbstractText';
import * as actions from '../../redux/constants/action';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function OAuthScreen({ status, route }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: actions.OAUTH,
      payload: {
        params: route.params,
      },
    });
  }, [dispatch, route]);

  //https://youknow.app/api/sessions/oauth/github?code=0f6f6903eb2121765a9c&state=6Ef4Ee8XHHerbktBAMkZ6g
  //https://youknow.app/api/sessions/oauth/google?state=y2AkWebTnv2Ft_uRWaAO9g&code=4%2F0AfJohXkbUqYYoO5y0vVrFnjO0v1oOelYwEyrBT0IyspTjRwjmI78t_ok7hpygNUlxn4x8w&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=none
  return (
    <AuthScreen isLoading={status.is_loading}>
      <View style={tw`w-full h-30 justify-center`}>
        <AbstractText style={tw`text-center`}>
          {t('header.logging-in') + ' ' + Object.keys(route.params)}{' '}
        </AbstractText>
      </View>
    </AuthScreen>
  );
}
OAuthScreen.propTypes = {
  status: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(OAuthScreen);
