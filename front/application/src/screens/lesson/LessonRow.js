import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import tw from '../../../tailwind';
// eslint-disable-next-line import/no-named-default
import { default as Bubbles } from '../../assets/background/bubbles.svg';
import LessonRowProgress from './LessonRowProgress';

const PropTypes = require('prop-types');

function LessonRow({ percent, name, style, onSelectLesson, progressColor, selected, setSelected }) {
  const lessonRef = useRef(null);
  const [selectedStyle, setSelectedStyle] = useState({ margin: 'm-2', height: 'h-20' });
  const [lessonX, setLessonX] = useState();
  const [lessonWidth, setLessonWidth] = useState();
  const [lessonPercent, setLessonPercent] = useState(percent);

  useEffect(() => {
    if (selected) {
      setSelectedStyle({ margin: 'm-1', height: 'h-24' });
    } else {
      setSelectedStyle({ margin: 'm-2', height: 'h-20' });
    }
  }, [selected]);

  const onLongPress = () => {
    setSelected(true);
  };

  const onPressOut = () => {
    setSelected(false);
  };

  return (
    <TouchableOpacity
      style={tw`p-3`}
      onPress={onSelectLesson}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
    >
      <View
        onLayout={(event) => {
          setLessonX(event.nativeEvent.layout.x);
          setLessonWidth(event.nativeEvent.layout.width);
        }}
        onTouchMove={(event) => {
          if (selected) {
            setLessonPercent(((event.nativeEvent?.pageX - lessonX) / lessonWidth) * 100);
          }
        }}
        style={tw`${selectedStyle.height} ${selectedStyle.margin} rounded-2 overflow-hidden`}
      >
        <View style={tw`inset-x-0 top-0 z-50 text-left bg-white  `}>
          <Bubbles width="250%" height="250%" style={tw`left--30 top--30 text-[${style}]`} />
          <LessonRowProgress percent={lessonPercent} color={progressColor} />
          <View
            style={tw`ml-1 ${selectedStyle.height} w-full absolute text-left justify-center flex-1`}
          >
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
  selected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default LessonRow;
