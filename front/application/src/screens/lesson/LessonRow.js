import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import tw from '../../../tailwind';
// eslint-disable-next-line import/no-named-default
import { default as Bubbles } from '../../assets/background/bubbles.svg';
import LessonRowProgress from './LessonRowProgress';

const PropTypes = require('prop-types');

function LessonRow({ percent, name, style, onSelectLesson, progressColor }) {
  return (
    <TouchableOpacity
      style={tw`p-3`}
      onPress={() => {
        onSelectLesson();
      }}
    >
      <View style={tw`m-1 rounded-2 overflow-hidden h-20`}>
        <View style={tw`inset-x-0 top-0 z-50 text-left bg-white  `}>
          <Bubbles width="250%" height="250%" style={tw`left--30 top--30 text-[${style}]`} />
          <LessonRowProgress percent={percent} color={progressColor} />
          <View style={tw`ml-1 h-20 w-full absolute text-left justify-center flex-1`}>
            <Text style={tw`text-3xl font-bold text-gray-600`}>{name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

LessonRow.propTypes = {
  percent: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  progressColor: PropTypes.string.isRequired,
  onSelectLesson: PropTypes.func.isRequired,
};

export default LessonRow;
