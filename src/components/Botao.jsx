import '../styles.scss'

export default function Botao({ name, funcao, color }) {
    return (
        <button onClick={funcao} style={{ backgroundColor: color }}>{name}</button>
    )
} 