import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import PrivateRoute from "./Routing/PrivateRoute";
import store from "./Redux/Store";
import setAuthToken from "./Redux/Auth/setAuthToken";
import { loadUser } from "./Redux/Auth/authActions";
import Alert from "./Components/Alert";
import Dashboard from "./Components/Dashboard";
import CreateProfile from "./Components/CreateProfile";
import EditProfile from "./Components/EditProfile";
import AddExperience from "./Components/AddExperience";
import AddEducation from "./Components/AddEducation";
import Profiles from "./Components/Profiles";
import Profile from "./Components/Profile";
import Posts from "./Components/Posts";
import Post from "./Components/Post";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Alert />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/edit-profile"
              component={EditProfile}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            ></PrivateRoute>
            <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
            <PrivateRoute
              exact
              path="/posts/:id"
              component={Post}
            ></PrivateRoute>
            <Route exact path="/profiles" component={Profiles}></Route>
            <Route exact path="/profile/:userid" component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
