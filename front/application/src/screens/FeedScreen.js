import React, { useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl } from 'react-native';
import LessonRow from './lesson/LessonRow';
import * as actions from '../redux/constants/action';
import LoadingScreen from '../components/LoadingScreen';
import tw from '../../tailwind';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FeedScreen({ status, lesson }) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
  }, []);
  useEffect(() => {
    console.log(`[HERE] Lessons: ${JSON.stringify(lesson.lessons)}`);
  }, [lesson.lessons]);
  const renderLesson = ({ item }) => <LessonRow {...item} onSelectLesson={(item, index) => {}} />;
  const onRefresh = () => {
    dispatch({ type: actions.GET_LESSONS });
  };
  return (
    <LoadingScreen isLoading={status.is_loading}>
      <FlatList
        data={lesson.lessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
        refreshing={status.is_loading}
        refreshControl={
          <RefreshControl
            colors={[tw.color('blue-500')]}
            refreshing={status.is_loading}
            progressViewOffset={status.is_loading ? -200 : 0}
            onRefresh={() => {
              console.log(`[HERE] PULL`);
              onRefresh();
            }}
          />
        }
      />
    </LoadingScreen>
  );
}

FeedScreen.propTypes = {
  status: PropTypes.object.isRequired,
  lesson: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  lesson: state.lesson,
});

export default connect(mapStateToProps)(FeedScreen);
