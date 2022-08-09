import { Provider } from 'react-redux';
import { store } from 'src/store';

export const App = () => {
  return (
    <Provider store={store}>
      <div />
    </Provider>
  );
};


