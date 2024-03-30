// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import * as actions from './constants/action';
import * as loginStatus from './constants/loginStatus';

const merge = (prev, next) => ({ ...prev, ...next });

// eslint-disable-next-line default-param-last
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return merge(state, { user: action.payload.user });
    case actions.SET_MAY_FORGET_PASSWORD:
      return merge(state, { may_forget: action.payload.may_forget });
    case actions.SET_TOKEN:
      return merge(state, {
        login_status: loginStatus.LOGIN_STATUS_LOGGED_IN,
        token: action.payload.token,
      });
    case actions.REMOVE_TOKEN:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line default-param-last
const lessonReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_LESSONS:
      return merge(state, { lessons: action.payload.lessons });
    case actions.CLEAN_LESSONS:
      //      return merge(state, {
      //        lessons: state.lessons.map((lesson) =>
      //          merge(lesson, { priority_percent: 0, progress_percent: 0 })
      //        ),
      //      });
      return merge(state, {
        lessons: [],
      });
    case actions.SELECT_LESSON_PRIORITY:
      return merge(state, {
        lessons: state.lessons.map((lesson) =>
          merge(lesson, { priority_selected: lesson.id === action.payload.id })
        ),
      });
    case actions.CLEAN_SELECTION_LESSON_PRIORITY:
      return merge(state, {
        lessons: state.lessons.map((lesson) => merge(lesson, { priority_selected: false })),
      });
    default:
      return state;
  }
};
// eslint-disable-next-line default-param-last
const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.MESSAGE_START:
      return { ...state, loading: true };
    case actions.MESSAGE_SUCCESS:
      return { ...state, loading: false };
    case actions.MESSAGE_ERROR:
      return { ...state, loading: false, error: action.payload.message };
    case actions.MESSAGE_CLEAN:
      return {};
    default:
      return state;
  }
};

// eslint-disable-next-line default-param-last
const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_LOADING:
      return merge(state, { is_loading: action.payload.loading });
    case actions.SET_CONNECTED:
      return merge(state, { connected: true });
    case actions.SET_DISCONNECTED:
      return merge(state, { connected: false });
    case actions.SET_CONNECTION_PARAMS:
      return merge(state, { server: action.payload.server, port: action.payload.port });
    default:
      return state;
  }
};

const reducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  status: statusReducer,
  lesson: lessonReducer,
});

export default reducer;
