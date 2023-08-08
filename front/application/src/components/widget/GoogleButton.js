import React from 'react';

import { ReactComponent as GoogleIcon } from '../../assets/google.svg';
import AbstractButton from './AbstractButton';
import tw from '../../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function GoogleButton({ handleSubmit }) {
  return (
    <AbstractButton onPress={handleSubmit}>
      <GoogleIcon style={tw`text-white`} />
    </AbstractButton>
  );
}

GoogleButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default GoogleButton;
