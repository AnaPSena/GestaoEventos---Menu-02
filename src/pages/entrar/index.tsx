export default function Login() {
  return (
    <>
      <div className="page-container">
        <h1>Gestão de Eventos</h1>
        <form>
          <h3>Login</h3>
          <input type="text" placeholder="E-mail" id="Login" />
          <input type="password" placeholder="Senha" id="Senha" />
          <button type="submit" className="entrar" value="Entrar">Entrar</button>
        </form>
      </div>
    </>
  );
}
