import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import routes from './routes';
import store from './store';
import './index.css';

const App = () => (
    <MuiThemeProvider>
        <Provider store={store}>
            <div>
                <Router history={history} routes={routes} />
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-left"
                    getState={(state) => state.toastr}
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                    closeOnToastrClick/>
            </div>
        </Provider>
    </MuiThemeProvider>
);


const root = document.getElementById('root');
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <App />,
    root);
registerServiceWorker();
