import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreatePinPage from '../pages/CreatePinPage';
import ShowPinPage from '../pages/ShowPinPage';
import ShowCityPage from '../pages/ShowCityPage';
import CreateCityShowPage from '../pages/CreateCityShowPage';

function Routes() {
    return (
        <Switch>
            <Route exact path='/pins' component={CreatePinPage} />
            <Route exact path='/pins/:id' component={ShowPinPage} />
            {/* <Route exact path='/cities/:id' component={ShowCityPage} /> */}
            <Route path='/cities/:id' render={(props) => <ShowCityPage {...props} />} />
            <Route exact path='/cities/new' component={CreateCityShowPage} />
        </Switch>
    )
}

export default Routes;