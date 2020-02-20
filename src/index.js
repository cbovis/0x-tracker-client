import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import ms from 'ms';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import AutoReload from './util/auto-reload';

OfflinePluginRuntime.install({
  onUpdateReady: () => {
    console.log('[SW]: Update ready');
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: () => {
    console.log('[SW]: Update applied');
    window.location.reload();
  },
});

ReactDOM.render(<App />, document.getElementById('root'));

AutoReload.start(ms(process.env.REACT_APP_AUTO_RELOAD_INTERVAL));
