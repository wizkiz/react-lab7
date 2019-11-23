import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MyComponent from './MyComponent';
import SuccessComponent from './SuccessComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={MyComponent} />
        <Route path="/success" component={SuccessComponent} />
      </BrowserRouter>
    </div>
  );
}

export default App;
