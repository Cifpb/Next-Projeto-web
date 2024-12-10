import style from "./page.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";

export default function Reset() {
  return (
    <div>
      <Header />
      <div>
        <div className={style.pag_red}>
          <div className={style.elem_red}>
            <div className={style.form_redefinir}>
              <h2 className={style.texto_principal}>REDEFINIR SENHA</h2>
              <p className={style.texto2}>
                Informe um email e enviaremos um link <br /> para recuperar sua senha.
              </p>
              <form action="login" method="post">
                <div className={style.formulario_email}>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    id="email"
                    maxLength={50}
                    placeholder="E-mail"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className={style.formulario_grupo}>
                  <center>
                    <input type="submit" value="Enviar Link" />
                  </center>
                </div>
              </form>
              <div className={style.voltar_link}>
                <a href="/login">Voltar ao Login</a>
              </div>
            </div>
          </div>
          <div className={style.desbo_rodape} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
