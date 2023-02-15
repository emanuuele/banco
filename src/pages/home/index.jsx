import React, { useEffect, useState } from 'react';
import { formatToBRL } from 'brazilian-values';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import { AiFillEye, AiFillEyeInvisible, AiOutlineLogout } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { clients } from '../../clients.js'
// import {cpf} from '../login/login'
import { verificarTipoValor } from '../../fungeng';
import Botao from '../../components/Botao';

import axios from 'axios'

import { useParams } from 'react-router-dom';


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

const Home = () => {
    let { cpf } = useParams();
    const user = clients.filter(login => login.login == cpf)

    const [saldo, setSaldo] = useState(Number(user.saldo));
    const [valor, setValor] = useState(0);
    const [humor, setHumor] = useState('😭');
    const [modalDepositIsOpen, setModalDepositIsOpen] = React.useState(false);
    const [modalWithdrawIsOpen, setModalWithdrawIsOpen] = React.useState(false);
    const [modalExtractIsOpen, setModalExtractIsOpen] = React.useState(false);
    const [eyeOpened, setEyeOpened] = useState(true)
    const [extract, setExtract] = useState(user.movimentacoes)

    function addToExtract(action, valor) {
        setExtract(() => {
            const newExtract = [...extract]
            let dateString = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`

            newExtract.unshift({ tipo: action, data: dateString, valor: valor })

            return newExtract
        })
    }

    React.useEffect(() => {
        setSaldo(user[0].saldo)
        setExtract(user[0].movimentacoes)
    }, [])

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
        // const deposit = user.movimentacoes.unshift({tipo: 'D', data:`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`, valor: valor})
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
        console.log(saldo)
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
            closeModal('withdraw');
        }
    }
    function withdrawAll() {
        setSaldo(0);
        setValor(null);
        addToExtract("Saque", saldo)

        toast.success('Saque confirmado!');
        closeModal('withdraw');
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

    const valueBiggerZero = extract?.filter(valor => valor.valor > 0)

    useEffect(() => {
        saldoAlto();

        localStorage.setItem('saldo', saldo);
    }, [saldo]);

    return (
        <div className='App'>
            <h1>{user.map((item) => {
                return (
                    <div>{item.name} : {humor} </div>
                )
            })}</h1>
            <Link to='/Login' style={{ marginLeft: '90%', backgroundColor: 'transparent', color: 'black' }}> <AiOutlineLogout size={'1.5rem'} /></Link>
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
                        <button onClick={() => closeModal('withdraw')} className='close'>x</button>
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
                            <button className='button' onClick={() => withdrawAll()}>Sacar {formatToBRL(saldo)}</button>
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
                        {valueBiggerZero?.map((item) => {
                            return (
                                <div>

                                    <table>
                                        <tr>
                                            <td>{formatToBRL(item.valor)}</td><td>{item.tipo == 'D' ? 'Deposito' : 'Saque'}</td><td>{item.data}</td>
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
