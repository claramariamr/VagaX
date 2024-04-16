function entrar() {
    window.location.href = "http://127.0.0.1:5500/tela%20estacionamento/index.html";
}
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    console.log("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    console.log("active");
});