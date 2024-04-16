const veiculos = []; // Lista de veículos cadastrados
const horariosEntrada = {}; // Dicionário para armazenar horários de entrada dos veículos

const MAX_VEICULOS = 2; // Definindo o número máximo de veículos permitidos

function cadastrarVeiculo() {
    if (veiculos.length >= MAX_VEICULOS) {
        exibirResultado("O estacionamento está lotado. Não é possível cadastrar mais veículos.");
        return;
    }

    const placaVeiculo = document.getElementById("placaVeiculo").value;

    // Expressão regular para validar a placa no formato correto (3 letras seguidas por 4 números)
    const placaRegex = /^[A-Za-z]{3}\d{4}$/;

    if (!placaRegex.test(placaVeiculo)) {
        exibirResultado("Por favor, insira uma placa válida no formato AAA1111.");
        return;
    }

    const horarioEntrada = new Date(); // Obtém o horário de entrada atual
    horariosEntrada[placaVeiculo] = horarioEntrada;

    veiculos.push({ placa: placaVeiculo, horarioEntrada });
    exibirResultado(`O veículo com a placa ${placaVeiculo} foi cadastrado com sucesso às ${formatarHorario(horarioEntrada)}.`);

    // Esconder o campo de placa após cadastrar
    togglePlacaInput();
}

// Função para remover um veículo
function removerVeiculo() {
    const placaRemover = document.getElementById("placaRemover").value;

    if (placaRemover.trim() === "") {
        exibirResultado("Por favor, insira a placa do veículo para remover.");
        return;
    }

    const veiculo = veiculos.find(v => v.placa === placaRemover);
    if (veiculo) {
        const horarioSaida = new Date(); // Obtém o horário de saída atual

        const horasEstacionado = calcularHorasEstacionado(veiculo.horarioEntrada, horarioSaida);
        const valorTotal = calcularValorTotal(horasEstacionado);

        // Remove o veículo da lista
        const index = veiculos.indexOf(veiculo);
        if (index !== -1) {
            veiculos.splice(index, 1);
        }

        exibirResultado(`O veículo com a placa ${placaRemover} foi removido às ${formatarHorario(horarioSaida)}. O preço total é R$ ${valorTotal.toFixed(2)}.`);
    } else {
        exibirResultado("Veículo não encontrado. Verifique a placa e tente novamente.");
    }
}

// Função para listar os veículos
function listarVeiculos() {
    const listaVeiculosElement = document.getElementById("listaVeiculos");

    if (veiculos.length > 0) {
        listaVeiculosElement.innerHTML = "<strong>VEÍCULOS ESTACIONADOS<br><br></strong>";
        veiculos.forEach(veiculo => {
            const horarioEntrada = formatarHorario(veiculo.horarioEntrada);
            listaVeiculosElement.innerHTML += `Placa do veículo: ${veiculo.placa} | Horário de entrada: ${horarioEntrada}<br>`;
        });
    }
}

// Função para atualizar a lista de veículos
function atualizarListaVeiculos() {
    const listaVeiculosElement = document.getElementById("veiculosList");

    if (veiculos.length > 0) {
        listaVeiculosElement.innerHTML = "<strong>Veículos estacionados:</strong><br>";
        veiculos.forEach(veiculo => {
            const horarioEntrada = formatarHorario(veiculo.horarioEntrada);
            listaVeiculosElement.innerHTML += `<li class="veiculo-item">${veiculo.placa} (Entrada: ${horarioEntrada})</li>`;
        });
    } else {
        listaVeiculosElement.innerHTML = "<strong>Não há veículos cadastrados no momento.</strong>";
    }

}
atualizarListaVeiculos();

// Função para encerrar o estacionamento
function encerrarEstacionamento() {
    // Limpar a lista de veículos
    veiculos.length = 0;

    // Limpar o dicionário de horários de entrada
    for (const veiculo of Object.keys(horariosEntrada)) {
        delete horariosEntrada[veiculo];
    }

    // Limpar os campos de entrada
    document.getElementById("placaVeiculo").value = "";
    document.getElementById("placaRemover").value = "";

    // Atualizar a lista de veículos (para garantir que ela esteja vazia)
    atualizarListaVeiculos();

}

// Função para exibir mensagens de resultado
function exibirResultado(mensagem) {
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = mensagem;
    resultadoElement.style.display = "block";
}

// Função para formatar o horário
function formatarHorario(data) {
    const options = { hour: "numeric", minute: "numeric" };
    return data.toLocaleTimeString([], options);
}

// Função para calcular as horas estacionadas
function calcularHorasEstacionado(horarioEntrada, horarioSaida) {
    const diffMilissegundos = horarioSaida - horarioEntrada;
    const diffHoras = diffMilissegundos / (1000 * 60 * 60);
    return diffHoras;
}

// Função para calcular o valor total
function calcularValorTotal(horasEstacionado) {
    const precoInicial = 10; // Preço inicial fixo
    const precoPorHora = 5; // Preço por hora fixo

    return precoInicial + precoPorHora * horasEstacionado;
}