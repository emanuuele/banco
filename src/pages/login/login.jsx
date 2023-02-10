import './styles.scss';
import { Link } from 'react-router-dom';

function Login() {

    return (
        <div className='middle' style={{ backgroundColor: '#fff' }}>
            <div className="text">
                <h1 className='h1'>Login</h1>
            </div>
            <p className='p'>Acesse seu banco</p>
            <input type="number" placeholder='Digite seu CPF:' />
            <input type="password" placeholder='Senha:' />


            <Link to='/' className='login-button' style={{ textDecoration: 'none' }}> Entrar</Link>
        </div>
    )
}
export default Login;