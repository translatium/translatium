/* global Windows */
import { UPDATE_SETTING } from '../constants/actions';

const defaultState = {
  inputLang: 'en',
  outputLang: 'zh',
  theme: 'light',
  primaryColorId: 'green',
  chinaMode: false,
  preferredProvider: 'google',
  realtime: true,
  bigTextFontSize: 50,
  recentLanguages: ['en', 'zh'],
  preventingScreenLock: false,
  launchTime: 0,
  translateWhenPressingEnter: true,
};

const getInitialValue = (name) => {
  const localValue = Windows.Storage.ApplicationData.current.localSettings.values[name];
  if (typeof localValue === 'undefined' || localValue === 'default') {
    return defaultState[name];
  }
  try {
    return JSON.parse(localValue);
  } catch (err) {
    Windows.Storage.ApplicationData.current.localSettings.values.clear();
    Windows.Storage.ApplicationData.current.roamingSettings.values.clear();
    return defaultState[name];
  }
};

const initialState = {};
Object.keys(defaultState).forEach(key => {
  initialState[key] = getInitialValue(key);
});

const settings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTING: {
      const { name, value } = action;
      const newState = {};
      newState[name] = action.value;
      Windows.Storage.ApplicationData.current.localSettings.values[name]
        = JSON.stringify(value);
      return Object.assign({}, state, newState);
    }
    default:
      return state;
  }
};

export default settings;