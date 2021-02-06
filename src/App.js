import './App.css';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import VideoPage from './pages/VideoPage'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route path = "/" exact component = {LoginPage} />
      <Route path = "/signup" exact component = {SignUpPage} />
      {/* <Route path = "/videopage" exact component = {VideoPage} /> */}
      <Route path = "/home" exact component = {HomePage} />
    </BrowserRouter>
  );
}

export default App;
