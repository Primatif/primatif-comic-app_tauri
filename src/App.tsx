import { MainPage } from './pages/MainPage';
import './styles/themes.css';
import './App.css';

/**
 * The main application component for the Primatif Comics app.
 * Now serves as a simple container that renders the MainPage component.
 * The layout has been extracted to a reusable ThreeColumnLayout component.
 */
function App() {
  return <MainPage />;
}

export default App;
