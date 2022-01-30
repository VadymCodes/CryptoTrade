import { Switch, Redirect, Route } from "react-router-dom";
import MasterLayout from "./layout";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Login from "./pages/Login";

function App() {
  return (
    <MasterLayout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact component={Home} />
        <Route path="/trade" exact component={Trade} />
        <Route path="*" component={Login} />
      </Switch>
    </MasterLayout>
  );
}

export default App;
