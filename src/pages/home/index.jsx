import React, { useEffect, useState } from 'react';
import { verificarTipoValor } from '../../fungeng.js';
import Botao from '../../components/Botao.jsx';
import { formatToBRL } from 'brazilian-values';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';

function Home() {
	const [saldo, setSaldo] = useState(Number(localStorage.getItem('saldo')) || 0);
	const [valor, setValor] = useState(0);
	const [humor, setHumor] = useState('😭');
	const [exibirSaldo, setExibirSaldo] = useState(true);

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

	useEffect(() => {
		localStorage.setItem('saldo', saldo);
	}, []);

	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModalWithdraw() {
		setIsOpen(true);
		withdraw();
	}
	function openModalDeposit() {
		setIsOpen(true);
		deposit();
	}

	function deposit() {
		if (verificarTipoValor(valor) == false) return;

		setSaldo(saldo + Number(valor));
		setValor(0);
	}
	function withdraw() {
		if (verificarTipoValor(valor) == false) return;

		if (Number(valor) > saldo) {
			toast.error('Saldo insuficiente');
		} else {
			setSaldo(saldo - Number(valor));
			setValor(0);
		}
	}

	function afterOpenModal() {
		subtitle.style.color = '#f00';
	}

	function closeModal() {
		setIsOpen(false);
	}
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	return (
		<div className='App'>
			<h1>Meu banco: {humor} </h1>
			<div className='tela'>
				<Botao name='Depositar' funcao={openModalDeposit} color='green' />
				<Botao name='Sacar' funcao={openModalWithdraw} color='red' />

				<Modal
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel='Example Modal'
				>
					<h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
					<button onClick={closeModal}>close</button>
					<div>Digite o valor: </div>
					<input value={valor} onChange={e => setValor(e.target.value)} placeholder='Digite o valor: ' />
					<button onClick={() => deposit()}>Enviar</button>
				</Modal>
				<Modal
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel='Example Modal'
				>
					<h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
					<button onClick={closeModal}>close</button>
					<div>Digite o valor: </div>
					<input value={valor} onChange={e => setValor(e.target.value)} placeholder='Digite o valor: ' />
					<button onClick={() => withdraw()}>Enviar</button>
				</Modal>
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
export default Home;
