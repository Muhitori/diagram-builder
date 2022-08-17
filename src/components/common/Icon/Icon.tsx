import { FC, ReactNode } from 'react'
import { useStyles } from './styles';


interface Props {
  onClick?: () => void;
  children: ReactNode;
}

export const Icon: FC<Props> = ({ children, onClick }) => {
  const classes = useStyles();

  return <div className={classes.icon} onClick={onClick}>{children}</div>;
};