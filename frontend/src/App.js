import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
// import LoginForm from './LoginForm';
// import LoginForm from './LoginForm';

function App() {
  // const isLoggedIn = localStorage.getItem("is_superuser");
  // {isLoggedIn ?  : <LoginForm />}
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
