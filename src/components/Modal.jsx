import Modal from 'react-modal';
export default function Modal(funcao) {
    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{funcao}</h2>
            <button onClick={closeModal}>close</button>
            <div>Digite o valor: </div>
            <input value={valor} onChange={e => setValor(e.target.value)} placeholder='Digite o valor: ' />
            <button onClick={funcao}>Enviar</button>
        </Modal>
    )
}