import '../styles.scss'
import React from 'react';
export default function Botao({ name, funcao, color }) {
    
    return (
        <button onClick={funcao} style={{ backgroundColor: color }}>{name}</button>
    )
} 