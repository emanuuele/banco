import "./styles.scss";
import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
function Login() {
  const [cpfLogin, setCPFLogin] = useState(0);
  const [passwordLogin, setPasswordLogin] = useState("");

  const clients = [
    {
        nome: "emanuele",
        cpf: 11111111111,
        senha:"1234",
        saldo: 548655,
        movimentacao: "withdraw",
        valor: 155
    },
    {
        nome: "augusto",
        cpf: 22222222222,
        senha: "5678",
        saldo: 451515143,
        movimentacao: "deposit",
        valor: 455
    },
    {
        nome: "leticia",
        cpf: 33333333333,
        senha:"9101",
        saldo: 4876258,
        movimentacao: "withdraw",
        valor: 456
    },
    {
        nome: "jânio",
        cpf: 55555555555,
        senha:"9999",
        saldo: 100000000000000000,
        movimentacao: "deposit",
        valor: 1000000000000000000000000
    }
];

  function verifyLogin() {
    console.log(cpfLogin)
    console.log()
    clients.forEach((user)=>{
        if(user.cpf==Number(cpfLogin) && user.senha==Number(passwordLogin)){
            window.location.href="http://localhost:3000/"
        } 
        
    }) 
  }

  return (
    <div className="middle" style={{ backgroundColor: "#fff" }}>
      <div className="text">
        <h1 className="h1">Login</h1>
      </div>
      <p className="p">Acesse seu banco</p>
      
        <input
          value={cpfLogin}
          onChange={(e) => setCPFLogin(e.target.value)}
          type="number"
          placeholder="Digite seu CPF:"
        />
        <input
        value={passwordLogin}
        onChange={(e) => setPasswordLogin(e.target.value)}
        type="password" placeholder="Senha:" />


        <button 
        onClick={()=>verifyLogin()}
        className="login-button">
          Entrar
        </button>
        
      
    </div>
  );
}
export default Login;
