import "./redefinir.css";
import Header from "../header/header";
import Footer from "../footer/footer";

export default function Reset() {

    return(
    <div>
     <Header/>
      <div className="Reset">
        <div className="pag-login">
          <div className="elem-login">
            <div className="form-redefinir">
              <h2 className="texto-principal">REDEFINIR SENHA</h2>
              <p className="texto2">
                Informe um email e enviaremos um link <br /> para recuperar sua senha.
              </p>
              <form action="login" method="post">
                <div className="formulario-email">
                  <label htmlFor="email"></label>
                  <input type="email" id="email" maxLength={50} placeholder="E-mail" required autoComplete="off" />
                </div>
                <div className="formulario-grupo">
                  <center> <input type="submit" defaultValue="Enviar Link" /> </center>
                </div>
              </form>
              <div className="voltar-link">
                <a href="/login">Voltar ao Login</a>
              </div>
            </div>
          </div>
          <div className="desbo-rodape" />
        </div>
      </div>
      <Footer/>
      </div>
    );
  }