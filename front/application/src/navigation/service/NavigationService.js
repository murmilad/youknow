import { CommonActions, StackActions } from '@react-navigation/native';

const config = {};
export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}
export function navigate(routeName, params) {
  if (config.navigator && routeName) {
    config.navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      })
    );
  }
}
export function replace(routeName, params) {
  if (config.navigator && routeName) {
    config.navigator.dispatch(StackActions.replace(routeName, params));
  }
}
export function goBack() {
  if (config.navigator) {
    config.navigator.dispatch(CommonActions.goBack());
  }
}
