import React from 'react';

import RootNavigator from './src/router';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {ThemeProvider} from './src/utils/theme/ThemeContext';
import './src/lang/i18n';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
