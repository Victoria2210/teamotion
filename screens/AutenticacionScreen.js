
import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ImageBackground,
    Image
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { FontAwesome } from '@expo/vector-icons';
import colores from '../constants/colores';
import textos from '../constants/textos';
import Input from '../components/Input';
import { useDispatch, useSelector } from "react-redux";
import * as tareasAction from "../store/actions/tareas";
import * as personasAction from "../store/actions/personas";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,

        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AutenticacionScreen = props => {
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [auth, setAuth] = useState(false);
    const [placeholderCorreo, setPlaceholderCorreo] = useState('CORREO');
    const [placeholderClave, setPlaceholderClave] = useState('CLAVE');
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            correo: '',
            clave: ''
        },
        inputValidities: {
            correo: false,
            clave: false
        },
        formIsValid: false
    });

    const personas = useSelector(estado => estado.personas.personas);

    useEffect(() => {
        if (error) {
            setShowAlert(true)
        }
        if (auth) {
            if (personas.length > 0) {

                if (personas[0].idRol === 1) {
                    let traer =tareasAction.obtenerTareas();
                    try {
                        dispatch(traer);
                    } catch (err) {
                    }
                    props.navigation.navigate('MenuLider', { personaAuth: personas[0] });
                } else if (personas[0].idRol === 2) {
                    props.navigation.navigate('Menu', { personaAuth: personas[0] });
                    let traer = tareasAction.obtenerPorID(personas[0].id);
                    try {
                        dispatch(traer);
                    } catch (err) {
                    }
                }
            }
        }
    }, [
        error, auth
    ]);

    const logear = async () => {
        let accion;
        accion = personasAction.autenticarPersona(formState.inputValues.correo, formState.inputValues.clave);

        setError(null);
        setIsLoading(true);
        try {
            await dispatch(accion);
            setAuth(true);

        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };


    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <View style={styles.screen}>

            <View style={styles.card}>
                <ScrollView>
                    <View style={styles.titleContainer}>
                        <Text style={styles.superTitle}>HOLA</Text>
                        <Text style={styles.text}>TE ESTÁBAMOS ESPERANDO</Text>
                    </View>
                    <View style={styles.formControl}>
                        <Input
                            id="correo"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            minLength={1}
                            placeholder={placeholderCorreo}
                            placeholderTextColor="white"
                            onFocus={() => { setPlaceholderCorreo('') }}
                            errorText="Ingrese un correo valido"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="clave"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={1}
                            autoCapitalize="none"
                            placeholder={placeholderClave}
                            onFocus={() => { setPlaceholderClave('') }}
                            placeholderTextColor="white"
                            errorText="Ingrese una clave valida"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        {isLoading ? (
                            <TouchableOpacity title="Login" style={styles.buttonViewLoading}>
                                <ActivityIndicator size="small" color={'white'} />
                            </TouchableOpacity>

                        ) : (
                                <TouchableOpacity title="Login" onPress={logear} style={styles.buttonView}>
                                    <Image style={styles.icono} source={require('../assets/img/icono_check_login.png')} />

                                </TouchableOpacity>
                            )
                        }


                    </View>
                </ScrollView>
            </View>

            <ImageBackground source={require('../assets/img/curvas_1.png')} style={styles.img} />

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Datos invalidos"
                message="Los datos ingresados no son validos, vuelva a ingresarlos nuevamente"
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                cancelText={'Cancelar'}
                confirmText={'OK'}
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false)
                }}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}

                contentContainerStyle={{ backgroundColor: colores.primario, borderRadius: 20, width: '80%' }}
                titleStyle={{ color: 'white', textTransform: 'uppercase', fontFamily: 'open-sans-bold' }}
                messageStyle={{ color: 'white', fontFamily: 'open-sans' }}
                confirmButtonStyle={{
                    width: 45, height: 45, borderRadius: 30, justifyContent: 'center',
                    alignItems: 'center', backgroundColor: '#04D9D9', marginLeft: 20,
                }}

            />
        </View>
    );
};
/*
<FontAwesome name='check'
                        size={20}
                        color={'white'}
                        style={{
                            alignContent: 'center'
                        }} />
*/
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    card: {
        minWidth: 300,
        maxWidth: 800,
        maxHeight: 400,
    },
    formControl: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    superTitle: {
        color: colores.letras,
        fontSize: textos.superTitle,
        fontFamily: 'open-sans-bold'
    },
    text: {
        color: colores.letras,
        fontSize: textos.subtitulo,
        textAlign: textos.alignTexto,
        fontFamily: 'open-sans-bold'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    buttonView: {
        height: 55,
        width: 55,
        marginTop: 80,
        borderRadius: 58,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonViewLoading: {
        height: 55,
        width: 55,
        marginTop: 80,
        borderRadius: 58,
        backgroundColor: colores.secundario,
        justifyContent: 'center',
        alignItems: 'center',
    },
    foot: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center'
    },
    img: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        height: 175,
        width: '100%',
        justifyContent: 'center',
    },
    icono: {
        height: 55,
        width: 55,
    }
});

export default AutenticacionScreen;