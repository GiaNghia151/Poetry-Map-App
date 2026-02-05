import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './components/Auth';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-root">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;