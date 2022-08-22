import { CSSProperties, FC, ReactNode } from 'react'
import { useStyles } from './styles';


interface Props {
  onClick?: () => void;
  children: ReactNode;
  style?: CSSProperties;
}

export const Icon: FC<Props> = ({ children, onClick, style }) => {
  const classes = useStyles();

  return (
    <div className={classes.icon} style={style} onClick={onClick}>
      {children}
    </div>
  );
};