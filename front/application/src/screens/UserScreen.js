import React from 'react';

import { connect, useDispatch } from 'react-redux';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import tw from '../../tailwind';

import FormFieldText from '../components/formik/field/FormFieldText';
import FormFieldSubmitButton from '../components/formik/field/FormFieldSubmitButton';
import FormBody from '../components/formik/FormBody';
import * as actions from '../redux/actions';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function UserScreen({ user, status }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

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
        <View
          style={tw`mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          {user.email}
        </View>
        <FormFieldText name="server" header={t('field.server')} />
        <FormFieldText name="port" header={t('field.port')} />
        <FormFieldSubmitButton header={t('action.connect')} />
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
