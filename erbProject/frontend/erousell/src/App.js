import './App.scss';
import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
