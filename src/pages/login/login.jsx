import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { clients } from '../../clients.js'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TestaCPF, validarCNPJ } from '../../fungeng';

function Login() {
    const navigate = useNavigate()

    const [cpf, setCpf] = useState(0)
    const [password, setPassword] = useState(null)

    function verifyLogin() {
        const validacao = cpf.length <= 11 ? TestaCPF(cpf) : validarCNPJ(cpf)

        if (validacao == true) {
            let userNotFound = true;

            clients.forEach(element => {
                if (element.login == cpf && element.senha == password) {
                    userNotFound = false
                }
            });

            if (userNotFound) return toast.error('login invalido')
            else {
                navigate(`/${cpf}`)
                toast.success('Bem vindo')
            }
        }
    }

    return (
        <div className='middle' style={{ backgroundColor: '#fff' }}>
            <div className="text">
                <h1 className='h1'>Login</h1>
            </div>
            <p className='p'>Acesse seu banco</p>
            <form>
                <input type="number"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    placeholder='Digite seu CPF:' />

                <input type="password" placeholder='Senha:'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='login-button' onClick={(e) => {
                    e.preventDefault()

                    verifyLogin()
                }}>Entrar</button>
            </form>
        </div>
    )
}

export default Login;