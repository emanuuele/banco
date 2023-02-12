import "./styles.scss";
import { Link } from "react-router-dom";
import { clients } from "../../clients";
import { useState } from "react";
import { toast } from "react-toastify";
function Login() {
  const [cpf, setCPF] = useState(0);
  const [password, setPassword] = useState("");
  function verifyLogin() {
    let cpflogin = document.querySelector("#cpf-login");
    let passwordLogin = document.querySelector("#password-login");
    setCPF(cpflogin);
    setPassword(passwordLogin);
    console.log(cpf);
    console.log(password);
  }

  /* function verifyLogin() {
    for(let i = 0; i<clients.length; i++){
        if(clients.cpf==cpf && clients.password == password){
            toast.success("acesso confirmado")
        }else{
            toast.error("login invalido")
        }
    }
  } */

  return (
    <div className="middle" style={{ backgroundColor: "#fff" }}>
      <div className="text">
        <h1 className="h1">Login</h1>
      </div>
      <p className="p">Acesse seu banco</p>
      <form >
        <input id="cpf-login" type="number" placeholder="Digite seu CPF:" />
        <input id="password-login" type="password-login" placeholder="Senha:" />
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}
export default Login;
