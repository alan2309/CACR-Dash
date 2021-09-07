import "./CSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Statuses from "./components/Statuses";
import Programs from "./components/Programs";
import Details from "./components/Details";
import Admin from "./components/Admin";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BarGraphAdmin from "./components/BarGraphAdmin";
import PieChartAdmin from "./components/PieChartAdmin";
import ProgressBarAdmin from "./components/ProgressBarAdmin";
import EditTitle from "./components/EditTitle";
import PrivateRoute from "./routing/PrivateRoute";
import PrivateScreen from "./components/PrivateScreen";

function App() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "http://localhost:5000/api/users/login",
        {
          email: details.email,
          password: details.password,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
      });
  };

  const Logout = () => {
    console.log("Logged out.");
  };

  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <PrivateRoute exact path="/private" component={PrivateScreen} />
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
          <Route path="/admin/programs/" exact render={(props) => <Admin />} />
          <Route
            path="/admin/programs/:id/graphs"
            exact
            render={(props) => <BarGraphAdmin />}
          />
          <Route
            path="/admin/programs/:id/PieChart"
            exact
            render={(props) => <PieChartAdmin />}
          />
          <Route
            path="/admin/programs/:id/Progress"
            exact
            render={(props) => <ProgressBarAdmin />}
          />
          <Route
            path="/admin/programs/:id/edit"
            exact
            render={(props) => <EditTitle />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
