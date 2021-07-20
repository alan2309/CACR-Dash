import './App.css';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import {useState} from 'react';
import Axios from 'axios';

function App() {

  const [user,setUser] = useState({email:'',password:''});
  const [error,setError] = useState('');

  const Login = details => {
    Axios.post('http://localhost:5000/api/users/login',{
       email:details.email,
       password:details.password
     }).then(res => {
       console.log(res.data)
     })
  }

  const Logout = () =>{
    console.log('Logged out.')
  }

  return (
    <div className="App">
      <Navbar/>
      <SignIn Login={Login} error={error}/>
    </div>
  );
}

export default App;
