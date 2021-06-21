import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import CreateSession from "./pages/CreateSession";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SessionHistory from "./pages/SessionHistory";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";

// create a context for logged in user
export const UserContext = createContext();

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loggedInUser, setLoggedInUser] = useState(user || null);

  return (
    <div className="App">
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={
                loggedInUser && loggedInUser.email ? CreateSession : Login
              }
            />
            {!loggedInUser && <Route exact path="/signup" component={Signup} />}
            <PrivateRoute
              exact
              path="/:sessionName/:id"
              children={<Dashboard />}
            />
            <PrivateRoute path="/session" children={<CreateSession />} />
            <PrivateRoute path="/profile" children={<UserProfile />} />
            <PrivateRoute
              path="/session_history"
              children={<SessionHistory />}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
