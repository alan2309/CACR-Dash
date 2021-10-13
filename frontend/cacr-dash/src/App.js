import "./CSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Statuses from "./components/Statuses";
import Programs from "./components/Programs";
import Details from "./components/Details";
import Admin from "./components/Admin";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BarGraphAdmin from "./components/BarGraphAdmin";
import PieChartAdmin from "./components/PieChartAdmin";
import ProgressBarAdmin from "./components/ProgressBarAdmin";
import EditTitle from "./components/EditTitle";
import PrivateRoute from "./routing/PrivateRoute";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLogged(true);
    }
  }, []);

  const Login = (details) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios
      .post(
        "http://localhost:5000/api/users/login",
        {
          email: details.email,
          password: details.password
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        setIsLogged(true);
      });
  };

  const Logout = () => {
    localStorage.removeItem("authToken");
    setIsLogged(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar Logout={Logout} isLogged={isLogged} />
        <Switch>
          <Route path="/" exact render={(props) => <Programs />} />
          <Route
            path="/cacr"
            component={() => {
              window.location.href = "http://www.ngocacr.com/";
              return null;
            }}
          />
          <Route path="/programs" exact render={(props) => <Programs />} />
          <Route
            path="/admin/login"
            render={({ history }) => <SignIn Login={Login} history={history} />}
          />
          <Route path="/programs/status/:id" render={(props) => <Statuses />} />
          <Route path="/programs/details/:id" render={(props) => <Details />} />
          <PrivateRoute
            path="/admin/programs/"
            exact
            component={(props) => <Admin />}
          />
          <PrivateRoute
            path="/admin/programs/:id/graphs"
            exact
            component={(props) => <BarGraphAdmin />}
          />
          <PrivateRoute
            path="/admin/programs/:id/PieChart"
            exact
            component={(props) => <PieChartAdmin />}
          />
          <PrivateRoute
            path="/admin/programs/:id/Progress"
            exact
            component={(props) => <ProgressBarAdmin />}
          />
          <PrivateRoute
            path="/admin/programs/:id/edit"
            exact
            component={(props) => <EditTitle />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
