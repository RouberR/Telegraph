import React from 'react';

import RootNavigator from './src/router';
import {Provider} from 'react-redux';
import {store} from './src/store';

import {ThemeProvider} from './src/utils/theme/ThemeContext';

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
