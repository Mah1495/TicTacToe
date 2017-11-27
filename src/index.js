import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Routes from './routes'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
import { RelayNetworkLayer, urlMiddleware, applyRouterMiddleware } from 'react-relay-network-layer'
import { relayApi } from './config/endpoint'
import auth from './utils/auth'

window.React = React

const createHeaders = () => {
    let token = auth.getToken();
    if (token) {
        return {
            Authorization: `Bearer ${token}`
        }
    } else {
        return {}
    }
}

var token = auth.getToken();

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(relayApi, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
);


// Relay.injectNetworkLayer(
//     new Relay.DefaultNetworkLayer(relayApi, {
//         headers: createHeaders()
//     })
// );
// Relay.injectNetworkLayer(
//     new RelayNetworkLayer([
//         urlMiddleware({
//             url: (req) => relayApi
//         }),
//         next => req => {
//             req.headers = {
//                 ...req.headers,
//                 ...createHeaders()
//             }
//             return next(req);
//         },
//     ], { disableBatchQuery: true })
// )

ReactDOM.render(<Router
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
    routes={Routes} />
    , document.getElementById('root'));
