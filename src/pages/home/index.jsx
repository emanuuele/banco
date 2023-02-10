import React, { useEffect, useState } from 'react';
import { formatToBRL } from 'brazilian-values';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

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
    const [modalDepositIsOpen, setModalDepositIsOpen] = React.useState(false);
    const [modalWithdrawIsOpen, setModalWithdrawIsOpen] = React.useState(false);
    const [modalExtractIsOpen, setModalExtractIsOpen] = React.useState(false);
    const [eyeOpened, setEyeOpened] = useState(true)
    const [extract, setExtract] = useState([{ action: null, date: null, valor: null }])

    const user = {
        name: "Emanuele"
    }

    function addToExtract(action, valor) {
        setExtract(() => {
            const newExtract = [...extract]
            let dateString = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`

            newExtract.unshift({ action: action, date: dateString, valor: valor })

            return newExtract
        })
    }

    console.log(extract)


    function saldoAlto() {
        if (saldo >= 1000) {
            setHumor('😁');
        } else if (saldo < 1000 && saldo > 0) {
            setHumor('😶');
        } else {
            setHumor('😭');
        }
    }

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
        addToExtract("Deposito", valor)
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
            addToExtract("Saque", valor)

            toast.success('Saque confirmado!');
            closeModal('Saque');
        }
    }

    function afterOpenModal() {
        //subtitle.style.color = '#f00';
    }

    function closeModal(modaType) {

        if (modaType == 'deposit') {
            setModalDepositIsOpen(false)
        }
        else if (modaType == 'withdraw') {
            setModalWithdrawIsOpen(false)
        } else {
            setModalExtractIsOpen(false)
        }
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
                <Botao name='Extrato' funcao={() => setModalExtractIsOpen(true)} color='black' />

                {eyeOpened && <>Saldo: {formatToBRL(saldo)}</>}

                <button style={{ color: 'black' }} onClick={() => {
                    setEyeOpened(!eyeOpened)
                }}>{eyeOpened ? <AiFillEye size={'1.5rem'} /> : <AiFillEyeInvisible size={'1.5rem'} />}</button>

                <Modal
                    isOpen={modalDepositIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={() => closeModal('deposit')}
                    contentLabel='Example Modal'
                    style={customStyles}
                >
                    <div className='content'>
                        <button onClick={() => closeModal('deposit')} className='close'>X</button>
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
                        <button onClick={() => closeModal('withdraw')} className='close'>X</button>
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
                        </div>
                    </div>
                </Modal>

                <Modal
                    isOpen={modalExtractIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={() => closeModal('extract')}
                    contentLabel='Example Modal'
                    style={customStyles}
                ><button onClick={() => closeModal('extract')} className='close'>X</button>
                    <table>
                        <tr>
                            <th>Valor</th><th>Tipo</th><th>Data</th>
                        </tr>
                    </table>
                    <div className='content'>
                        {extract.map((item) => {
                            return (
                                <div>

                                    <table>
                                        <tr>
                                            <td>{item.valor}</td><td>{item.action}</td><td>{item.date}</td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        })}

                    </div>
                </Modal>
            </div>
            <ToastContainer />
        </div>
    );
}
export default Home;
