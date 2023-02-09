import React, { useEffect, useState } from 'react';
import { formatToBRL } from 'brazilian-values';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';

import { verificarTipoValor } from '../../fungeng';
import Botao from '../../components/Botao';

import './styles.scss';

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

function Home() {
	const [saldo, setSaldo] = useState(Number(localStorage.getItem('saldo')) || 0);
	const [valor, setValor] = useState(null);
	const [humor, setHumor] = useState('😭');
	const [exibirSaldo, setExibirSaldo] = useState(true);
	const [modalDepositIsOpen, setModalDepositIsOpen] = React.useState(false);
	const [modalWithdrawIsOpen, setModalWithdrawIsOpen] = React.useState(false);

	function saldoAlto() {
		if (saldo >= 1000) {
			setHumor('😁');
		} else if (saldo < 1000 && saldo > 0) {
			setHumor('😶');
		} else {
			setHumor('😭');
		}
	}

	let subtitle;

	function deposit() {
		if (!valor) {
			toast.error('Entre com um valor para depósito');
			return;
		}

		if (verificarTipoValor(valor) == false) return;

		setSaldo(saldo + Number(valor));
		setValor(null);

		toast.success('Depósito confirmado!');
		closeModal('deposit');
	}

	function withdraw() {
		if (!valor) {
			toast.error('Entre com um valor para saque');
			return;
		}

		if (verificarTipoValor(valor) == false) return;

		if (Number(valor) > saldo) {
			toast.error('Saldo insuficiente');
		} else {
			setSaldo(saldo - Number(valor));
			setValor(null);

			toast.success('Depósito confirmado!');
			closeModal('deposit');
		}
	}

	function afterOpenModal() {
		subtitle.style.color = '#f00';
	}

	function closeModal(modaType) {
		modaType == 'deposit' ? setModalDepositIsOpen(false) : setModalWithdrawIsOpen(false);
	}

	useEffect(() => {
		saldoAlto();
	}, [saldo]);

	useEffect(() => {
		localStorage.setItem('saldo', saldo);
	}, []);

	return (
		<div className='App'>
			<h1>Meu banco: {humor} </h1>
			<div className='tela'>
				<Botao name='Depositar' funcao={() => setModalDepositIsOpen(true)} color='green' />
				<Botao name='Sacar' funcao={() => setModalWithdrawIsOpen(true)} color='red' />

				<Modal
					isOpen={modalDepositIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={() => closeModal('deposit')}
					style={customStyles}
					contentLabel='Example Modal'
				>
					<div className='content'>
						<h2>Digite um valor de Depósito</h2>
						<div>Digite o valor: </div>
						<div className='content-actions'>
							<input
								autoFocus
								value={valor}
								onChange={e => setValor(e.target.value)}
								placeholder='Digite o valor: '
								type='number'
							/>
							<button className='button' onClick={() => deposit()}>
								Depositar
							</button>
							<button onClick={() => closeModal('deposit')}>X</button>
						</div>
					</div>
				</Modal>

				<Modal
					isOpen={modalWithdrawIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={() => closeModal('withdraw')}
					style={customStyles}
					contentLabel='Example Modal'
				>
					<div className='content'>
						<h2>Digite um Saque</h2>
						<div>Digite o valor: </div>
						<div className='content-actions'>
							<input
								autoFocus
								value={valor}
								onChange={e => setValor(e.target.value)}
								placeholder='Digite o valor: '
								type='number'
							/>
							<button className='button' onClick={() => withdraw()}>
								Sacar
							</button>
							<button onClick={() => closeModal('withdraw')}>X</button>
						</div>
					</div>
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
