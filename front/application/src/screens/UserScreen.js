import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import Screen from '../components/Screen';

import FormFieldText from '../components/formik/field/FormFieldText';
import FormFieldSubmitButton from '../components/formik/field/FormFieldSubmitButton';
import FormBody from '../components/formik/FormBody';
import * as actions from '../redux/constants/action';
import AbstractButton from '../components/widget/AbstractButton';
import FormText from '../components/widget/FormText';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function UserScreen({ user, status }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch({
      type: actions.LOG_OUT,
    });
  };

  const validationSchema = Yup.object().shape({
    server: Yup.string().required().label(t('field.server')),
    port: Yup.number().required().label(t('field.port')),
  });

  return (
    <Screen>
      <FormBody
        initialValues={{
          server: status.server ? status.server : 'https://youknow.app',
          port: status.port ? status.port : '443',
        }}
        onSubmit={(values) => {
          dispatch({
            type: actions.CONNECT_AND_SET_PARAMS,
            payload: {
              server: values.server,
              port: values.port,
            },
          });
        }}
        validationSchema={validationSchema}
      >
        <FormFieldText name="server" header={t('field.server')} />
        <FormFieldText name="port" header={t('field.port')} />
        <FormFieldSubmitButton header={t('action.connect')} />
        <FormText>
          {user.user?.name}
          {user.user?.provider ? ` (${user.user?.provider})` : ''}
        </FormText>
        <FormText>{user.user?.email}</FormText>
        <AbstractButton header={t('action.logout')} onPress={handleLogout} />
      </FormBody>
    </Screen>
  );
}
UserScreen.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  status: state.status,
});

export default connect(mapStateToProps)(UserScreen);
