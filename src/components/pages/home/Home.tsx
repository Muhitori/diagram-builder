import { Grid } from '@mui/material';
import { Diagram } from './Diagram';
import { ElementDetails } from './ElementDetails';
import { useStyles } from './styles';
import { Toolbar } from './Toolbar';

export const Home = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={3} md={3} lg={3}>
        <Toolbar />
      </Grid>
      <Grid item sm={7} md={7} lg={7}>
        <Diagram />
      </Grid>
      <Grid item sm={2} md={2} lg={2}>
        <ElementDetails />
      </Grid>
    </Grid>
  );
}