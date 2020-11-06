import { Box, Grid, grommet, Grommet, ResponsiveContext } from "grommet";
import React, { useContext } from "react";
import "./App.css";
import Customers from "./components/Customers";

const App = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Grommet theme={grommet}>
      <Box pad="large">
        <Grid columns={size !== "small" ? "small" : "100%"} gap="small">
          <Customers />
        </Grid>
      </Box>
    </Grommet>
  );
};

export default App;
