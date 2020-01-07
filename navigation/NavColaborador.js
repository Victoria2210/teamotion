import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { FontAwesome } from '@expo/vector-icons';

import SeleccionarEmocionScreen from '../screens/SeleccionarEmocionScreen';
import SeleccionarTareaScreen from '../screens/SeleccionarTareasScreen';
import HomePages from '../screens/HomePage';
import PerfilScreen from '../screens/PerfilScreen';
import TareasScreen from '../screens/TareasScreen';
import AutenticacionScreen from '../screens/AutenticacionScreen';

import React from 'react';
import { View } from "react-native";

import colores from '../constants/colores';

const AutenticarStack = createStackNavigator({
    Autenticar:{
        screen: AutenticacionScreen,
        navigationOptions: {
            header: null
        }
    }
});

const HomeStack = createStackNavigator({
    HomePage: {
        screen: HomePages,
        navigationOptions: {
            header: null
        }
    }
});

const EmocionSelect = createStackNavigator({
    SeleccionarEmocionScreen: {
        screen: SeleccionarEmocionScreen,
        navigationOptions: { header: null }
    },
    SeleccionarTareaScreen: {
        screen: SeleccionarTareaScreen,
        navigationOptions: {
            header: null
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'rgba(255,255,255,0.8)',
        activeBackgroundColor: colores.primario,
        inactiveBackgroundColor: colores.primario,
    }
});

const MiPerfil = createMaterialTopTabNavigator({
    Perfil: PerfilScreen,
    Metas: {
        screen: TareasScreen,
        navigationOptions: {
            tabBarLabel: 'Mis Metas'
        }
    }
}, {
    tabBarOptions: {
        style: {
            backgroundColor: colores.secundario,
            paddingTop: 25
        },
        labelStyle: {
            color: colores.letras,
            fontWeight: 'bold',
        },
        indicatorStyle: {
            backgroundColor: colores.letras
        }
    }
});

const tabNav = createBottomTabNavigator({
    Home: HomeStack,
    Daily: {
        screen: EmocionSelect,
        navigationOptions: {
            tabBarVisible: false,
            tabBarIcon: ({ tintColor }) => (
                <View
                    style={{
                        position: 'absolute',
                        bottom: -13,
                        height: 90,
                        width: 90,
                        borderRadius: 58,
                        backgroundColor: colores.primario,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <FontAwesome
                        name="plus"
                        size={45}
                        color={tintColor}
                        style={{
                            alignContent: 'center'
                        }}
                    />
                </View>

            ),
        },
    },
    miPerfil: {
        screen: MiPerfil,
        navigationOptions: {
            tabBarLabel: 'Mi Perfil'
        }
    },

}, {
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'rgba(255,255,255,0.7)',
        activeBackgroundColor: colores.primario,
        inactiveBackgroundColor: colores.primario,
        style: {
            borderTopColor: colores.secundario,
            height: 65,
            borderTopWidth: 15,
            borderBottomColor: colores.primario,
            borderBottomWidth: 0
        },
        labelStyle: {
            fontSize: 12,
            marginBottom: 6
        }
    }
});


const mainNav = createSwitchNavigator({
    Login: AutenticarStack,
    Menu:tabNav,
});

const NavColaborador = createAppContainer(mainNav);
export default NavColaborador;