import { FC, ReactNode } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Header } from './Header';

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Router>
        <Header />
        {children}
      </Router>
    </>
  );
};