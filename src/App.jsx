import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import Home from './pages/home/index.jsx';
import /* Routes, */ { router } from './routes'
import { RouterProvider } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<ToastContainer />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
