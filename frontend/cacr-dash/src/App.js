import "./CSS/App.css";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import Statuses from "./components/Statuses";
import Programs from "./components/Programs";
import Details from "./components/Details";
import Admin from "./components/Admin";
import { useState } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GraphsAdmin from "./components/GraphsAdmin";


function App() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    Axios.post("http://localhost:5000/api/users/login", {
      email: details.email,
      password: details.password
    }).then((res) => {
      console.log(res.data);
    });
  };

  const Logout = () => {
    console.log("Logged out.");
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact render={(props) => <Programs />} />
          <Route
            path="/cacr"
            component={() => {
              window.location.href = "http://www.ngocacr.com/";
              return null;
            }}
          />
          <Route path="/admin/login" render={(props) => <SignIn Login={Login} />} />
          <Route path="/programs" exact render={(props) => <Programs />} />
          <Route path="/programs/status/:id" render={(props) => <Statuses />} />
          <Route path="/programs/details/:id" render={(props) => <Details />} />
          <Route path="/admin/programs/" exact render={(props) => <Admin />} />
          <Route path="/admin/programs/graphs" exact render={(props) => <GraphsAdmin />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
