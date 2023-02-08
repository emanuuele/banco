import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import Home from './pages/home/index.jsx';


function App() {
	return (
		<div className='App'>
			<Home />
			<ToastContainer />
		</div>
	);
}

export default App;
