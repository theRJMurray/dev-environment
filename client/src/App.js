import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout, loadUser } from './actions/authActions'

const button_styles = {
    border: 0,
    borderRadius: '0.25rem',
    background: '#1E88E5',
    color: 'white',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
  }

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth)

	useEffect(() => {
		if (auth.token) {
			dispatch(loadUser());
		}
		// eslint-disable-next-line
	}, [])

	return <div>
		<div style={{width: '100%', height: 80, background: '#519171'}}>
			
			{auth.isAuthenticated ? <button style={button_styles} onClick={() => dispatch(logout())} >Logout</button> : 
			<div>
				<button style={button_styles} onClick={() => navigate("/login")} >Login</button>
				<button style={button_styles} onClick={() => navigate("/register")} >Register</button>
			</div>}
		</div>
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/login" element={<Login />}/>
			<Route path="/register" element={<Register/>} />
			{auth.isAuthenticated ? <Route path="/dashboard" element={<Dashboard />} /> : <Route exact path="/" element={<Home />} />}
		</Routes>
	</div>
}

export default App;