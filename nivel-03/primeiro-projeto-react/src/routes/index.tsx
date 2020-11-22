import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../Dashboard';
import Repository from '../Repository';



const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repository/:repository+" exact component={Repository}/>
    </Switch>
  );
}

export default routes;