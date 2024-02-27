import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import tw from '../../../tailwind';
// eslint-disable-next-line import/no-named-default
import { default as Bubbles } from '../../assets/background/bubbles.svg';

const PropTypes = require('prop-types');

function LessonRow({ name, style, onSelectLesson }) {
  return (
    <TouchableOpacity
      style={tw`p-3`}
      onPress={() => {
        onSelectLesson();
      }}
    >
      <View style={tw`m-1 rounded-2 overflow-hidden h-30`}>
        <Text style={tw`text-lg`}>{name}</Text>
        <Bubbles width="100%" height="100%" style={tw`text-[${style}]`} />
      </View>
    </TouchableOpacity>
  );
  // style={tw`text-[${style}]`}
}

LessonRow.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  onSelectLesson: PropTypes.func.isRequired,
};

export default LessonRow;
