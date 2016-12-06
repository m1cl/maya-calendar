import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DashboardComponent from './components/DashboardComponent';

// Needed for onTouchTap
// // http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <DashboardComponent />
    </MuiThemeProvider>
);
function run(){
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
const loadedStates = ['complete', 'loaded', 'interactive'];

if(loadedStates.includes(document.readyState) && document.body) {
    run();
}else {
    window.addEventListener('DOMContentLoaded', run, false);
}
