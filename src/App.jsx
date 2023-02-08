import Botao from './components/Botao.jsx';
import { formatToBRL } from 'brazilian-values';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';
import { useEffect, useState } from 'react';
import { verificarTipoValor } from './fungeng';

function App() {
	const [saldo, setSaldo] = useState(Number(localStorage.getItem('saldo')) || 0);
	const [valor, setValor] = useState(0);
	const [humor, setHumor] = useState('😭');
	const [exibirSaldo, setExibirSaldo] = useState(true);

	function depositar() {
		verificarTipoValor(valor);
		setSaldo(saldo + Number(valor));
		setValor(0);
	}
	useEffect(()=>{
		localStorage.setItem('saldo', saldo)
	},[saldo])

	

	function sacar() {
		verificarTipoValor(valor);
		if (Number(valor) > saldo) {
			toast.error('Saldo insuficiente');
		} else {
			setSaldo(saldo - Number(valor));
			setValor(0);
		}
	}
	function saldoAlto() {
		if (saldo >= 1000) {
			setHumor('😁');
		} else if (saldo < 1000 && saldo > 0) {
			setHumor('😶');
		} else {
			setHumor('😭');
		}
	}
	useEffect(() => {
		saldoAlto();
	}, [saldo]);
	return (
		<div className='App'>
			<h1>Meu banco: {humor} </h1>
			<div className='tela'>
				<input value={valor} onChange={e => setValor(e.target.value)} placeholder='Digite o valor: ' />
				<Botao name='Depositar' funcao={depositar} color='green' />
				<Botao name='Sacar' funcao={sacar} color='red' />
				{exibirSaldo && <span>Saldo: {formatToBRL(saldo)}</span>}
				<Botao
					color='black'
					name={`${exibirSaldo ? 'Esconder' : 'Exibir'} saldo`}
					funcao={() => {
						setExibirSaldo(!exibirSaldo);
					}}
				/>
			</div>
			<ToastContainer />
		</div>
	);
}

export default App;
