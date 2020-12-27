import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Details from "./components/Details/Details";
import useStyles from "./App.style";
import Main from "./components/Main/Main";
import { ExpenseContext } from "./context/context";

const App = () => {
  const classes = useStyles();
  const globalState = useContext(ExpenseContext);

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} md={4}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} md={3}>
          <Main />
        </Grid>
        <Grid item xs={12} md={4}>
          <Details title="Expense" />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
