function salvarCadastro(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const usuario = { nome, email, senha };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = "login.html"; 
}

function validarLogin(event) {
    event.preventDefault();
    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioSalvo && emailDigitado === usuarioSalvo.email && senhaDigitada === usuarioSalvo.senha) {
        alert("Login bem sucedido!");
        window.location.href = "Central.html"; 
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

