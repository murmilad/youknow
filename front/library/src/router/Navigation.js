const navigation = {};

export function setNavigation(nav) {
  navigation.navigate = nav;
}

export function navigate(path) {
  navigation.navigate(path);
}
