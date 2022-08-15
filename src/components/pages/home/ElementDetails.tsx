import { Paper } from '@mui/material'
import { useStyles } from './styles'

export const ElementDetails = () => {
  const classes = useStyles();

  return <Paper className={classes.sidebar} />
}