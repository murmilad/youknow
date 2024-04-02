import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import tw from '../../../tailwind';

const PropTypes = require('prop-types');

function LessonRowProgress({ percent, color, isSelected }) {
  const translation = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 100];
  const outputRange = ['0%', '100%'];

  useEffect(() => {
    if (percent) {
      translation.setValue(0);
      Animated.timing(translation, {
        toValue: percent,
        duration: isSelected ? 0 : 200,
      }).start();
    }
  }, [percent, isSelected, translation]);

  const animStyle = {
    width: translation.interpolate({ inputRange, outputRange }),
  };

  return <Animated.View style={[tw`absolute h-full ${color} w-full opacity-35`, animStyle]} />;
}

LessonRowProgress.propTypes = {
  percent: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default LessonRowProgress;
