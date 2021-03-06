import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavColaborador from './navigation/NavColaborador';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import emocionesReducer from "./store/reducers/emociones";
import personaReducer from "./store/reducers/personas";
import dailyReducer from "./store/reducers/daily";
import tareasReducer from "./store/reducers/tareas";
import equiposReducer from "./store/reducers/equipos";
import personasEquiposReducer from "./store/reducers/personasEquipos";

const rootReducer = combineReducers({
  emociones: emocionesReducer,
  personas: personaReducer,
  tareas: tareasReducer,
  equipos: equiposReducer,
  personasEquipos: personasEquiposReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}><NavColaborador/></Provider>
  );
  
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFED70',
    height: 60,
    width: '100%'
  }
});