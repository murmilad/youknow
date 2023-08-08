import React from 'react';

import { ReactComponent as GithubIcon } from '../../assets/github.svg';
import AbstractButton from './AbstractButton';
import tw from '../../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function GithubButton({ handleSubmit }) {
  return (
    <AbstractButton onPress={handleSubmit}>
      <GithubIcon style={tw`text-white`} />
    </AbstractButton>
  );
}

GithubButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default GithubButton;
