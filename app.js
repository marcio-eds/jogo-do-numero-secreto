let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAlearotio();
let tentativas = 1;

function alterarTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    alterarTextoNaTela('h1', 'Jogo do número secreto!');
    alterarTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativas}!`;
        alterarTextoNaTela('h1', 'Você acertou! Parabéns!');
        alterarTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            alterarTextoNaTela('p', 'O número secreto é menor!');
        }else{
            alterarTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }

}

function gerarNumeroAlearotio() {
    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAlearotio();
    }else{
        listaDeNumerosSorteados.push(numeroSorteado);
        console.log(listaDeNumerosSorteados);
        return numeroSorteado;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAlearotio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}