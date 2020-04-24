import { NavigationActions } from 'react-navigation';

let _navigator : any;
let navigation = {};

function setTopLevelNavigator(navigatorRef :any) {
  _navigator = navigatorRef;
}

function setNavigation(nav :Object){
  navigation = nav
}


function navigate(routeName :string, params :any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}


// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  navigation,
  setNavigation,
  _navigator
};