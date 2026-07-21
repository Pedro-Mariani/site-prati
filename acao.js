// Botão "conheça meu trabalho" leva para a página de projetos
const botaoConheca = document.getElementById("botao-conheca");
if (botaoConheca) {
    botaoConheca.addEventListener("click", function() {
        window.location.href = "projetos.html";
    });
}


// Formulário de contato
const formContato = document.getElementById("contato");
if (formContato) {
    formContato.addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Obrigado por enviar o formulário!");
    });
}


// Frase do dia
async function buscarCitacao() {
    const resposta = await fetch("https://raw.githubusercontent.com/devmatheusguerra/frasesJSON/main/frases.json");
    const dados = await resposta.json();
    const indiceAleatorio = Math.floor(Math.random() * dados.length);
    const citacaoEscolhida = dados[indiceAleatorio];

    document.getElementById("citacao").innerHTML = citacaoEscolhida.frase;
    document.getElementById("autor-citacao").innerHTML = "— " + citacaoEscolhida.autor;
}

if (document.getElementById("citacao")) {
    buscarCitacao();
    setInterval(buscarCitacao, 28800000);
}


// Clima com geolocalização
function buscarClima() {
    navigator.geolocation.getCurrentPosition(async function(posicao) {
        const lat = posicao.coords.latitude;
        const lon = posicao.coords.longitude;

        const respostaClima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const dadosClima = await respostaClima.json();
        const temperatura = dadosClima.current_weather.temperature;
        const codigoTempo = dadosClima.current_weather.weathercode;

        const respostaCidade = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`);
        const dadosCidade = await respostaCidade.json();
        const cidade = dadosCidade.city || dadosCidade.locality;
        const estado = dadosCidade.principalSubdivisionCode ? dadosCidade.principalSubdivisionCode.split("-")[1] : "";

        const condicoes = {
            0: "Céu limpo", 1: "Poucas nuvens", 2: "Parcialmente nublado", 3: "Nublado",
            45: "Neblina", 48: "Neblina", 51: "Garoa leve", 61: "Chuvoso", 63: "Chuvoso",
            65: "Chuva forte", 71: "Neve", 80: "Pancadas de chuva", 95: "Tempestade"
        };
        const condicao = condicoes[codigoTempo] || "Tempo variável";

        document.getElementById("cidade-clima").innerHTML = cidade + (estado ? ", " + estado : "");
        document.getElementById("temperatura-clima").innerHTML = Math.round(temperatura) + "°";
        document.getElementById("condicao-clima").innerHTML = condicao;
    });
}

if (document.getElementById("card-clima")) {
    buscarClima();
}