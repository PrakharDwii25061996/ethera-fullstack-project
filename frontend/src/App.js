import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';
// import LoginForm from './LoginForm';

function App() {
  const isLoggedIn = localStorage.getItem("is_superuser");

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard /> : <LoginForm />}
    </div>
  );
}

export default App;
