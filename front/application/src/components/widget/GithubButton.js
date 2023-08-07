import React, { ReactPropTypes } from 'react';
import { ReactComponent as GithubIcon } from '../../assets/github.svg';
import AbstractButton from './AbstractButton';
import tw from '../../../tailwind';

function GithubButton({ handleSubmit }) {
  return (
    <AbstractButton onPress={handleSubmit}>
      <GithubIcon style={tw`text-white`} />
    </AbstractButton>
  );
}

GithubButton.propTypes = {
  handleSubmit: ReactPropTypes.func.isRequired,
};

export default GithubButton;
