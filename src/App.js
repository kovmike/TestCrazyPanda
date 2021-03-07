import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { STMLessPage, STMEffectorPage } from "./pages/";
import "./App.css";

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/less">STMLess</Link>
          </li>
          <li>
            <Link to="/effector">Effector</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/less">
          <STMLessPage />
        </Route>
        <Route path="/effector">
          <STMEffectorPage />
        </Route>
      </Switch>
    </Router>
  );
};

export { App };
