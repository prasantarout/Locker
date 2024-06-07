/**
 * @format
 */
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
LogBox.ignoreAllLogs();


const lockedinllc=()=>{
    return(
        <Provider store={Store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => lockedinllc);
