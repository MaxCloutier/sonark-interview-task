import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import CustomerPage from "./views/CustomerPage";
import Login from "./views/Login";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import { Grommet, Box, Header, Button } from "grommet";
import { Logout } from "grommet-icons";
import { removeToken } from "./utils/common";
import { getToken } from "./utils/axios";

const App = () => {
  return (
    <Grommet>
      {getToken() && (
        <Header justify="end" flex={true} background="brand">
          <Button
            onClick={() => removeToken()}
            icon={<Logout />}
            hoverIndicator
          />
        </Header>
      )}
      <Box className="main-wrapper" pad="large">
        <Router>
          <Switch>
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/customer/:id" component={CustomerPage} />
            <PrivateRoute path="/" component={HomePage} />
          </Switch>
        </Router>
      </Box>
    </Grommet>
  );
};

export default App;
