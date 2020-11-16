import React from 'react';
import store from './app/store'
import {Provider} from 'react-redux'
import Page from "./Page"

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Page />
      </Provider>
    </div>
  );
}

export default App;
