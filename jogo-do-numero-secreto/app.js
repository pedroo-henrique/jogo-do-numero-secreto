let listaDeNumerosEscolhidos = []; 
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

function verificarChute() {
    let chute = Number(document.querySelector('input').value);

    if(chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemPosAcerto = `Você acertou o número secreto! com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemPosAcerto);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (numeroSecreto < chute) {
        exibirTextoNaTela('p',`O número secreto é menor que (${chute})`)
    } else if (numeroSecreto > chute) {
        exibirTextoNaTela('p',`O número secreto é maior que (${chute})`)
    } tentativas++;
    limparCampo();

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeNumerosSorteados = listaDeNumerosEscolhidos.length;
    if (quantidadeDeNumerosSorteados === numeroMaximo) {
        listaDeNumerosEscolhidos = [];
    }
    
    if(listaDeNumerosEscolhidos.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosEscolhidos.push(numeroEscolhido);
        console.log(listaDeNumerosEscolhidos);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}