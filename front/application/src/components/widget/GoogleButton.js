import React, { ReactPropTypes } from 'react';
import { ReactComponent as GoogleIcon } from '../../assets/google.svg';
import AbstractButton from './AbstractButton';
import tw from '../../../tailwind';

function GoogleButton({ handleSubmit }) {
  return (
    <AbstractButton onPress={handleSubmit}>
      <GoogleIcon style={tw`text-white`} />
    </AbstractButton>
  );
}

GoogleButton.propTypes = {
  handleSubmit: ReactPropTypes.func.isRequired,
};

export default GoogleButton;
