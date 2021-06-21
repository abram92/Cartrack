import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import Maps from './screens/Maps';
import AirplaneDetail from './screens/airplaneDetail';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

function App() {
  return (
    <div className="App">
      <Router forceRefresh={false} history={history} >
      <Switch>
            <Route path={"/"} exact component={Maps} />
            <Route path={"/airplaneDetail"} exact component={AirplaneDetail} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
