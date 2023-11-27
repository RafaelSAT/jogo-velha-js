let tabuleiro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let player = '';
let aviso = '';
let jogando = false;

reset();

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(jogando && tabuleiro[item] === ''){
        tabuleiro[item] = player;
        renderizarTabuleiro();
        mudarJogador();
    }
}

function reset(){
    aviso = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    for(let i in tabuleiro){
        tabuleiro[i] = '';
    }

    jogando = true;

    renderizarTabuleiro();
    renderizarInfo();
}

function renderizarTabuleiro(){
    for(let i in tabuleiro){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = tabuleiro[i];
    }

    checarTabuleiro();
}

function renderizarInfo(){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = aviso;
}

function mudarJogador(){
    player = (player === 'x') ? 'o': 'x';
    renderizarInfo();
}

function checarTabuleiro(){
    if(quemGanhou('x')){
        aviso = 'O "x" venceu';
        jogando = false;
    } else if(quemGanhou('o')){
        aviso = 'O "o" venceu';
        jogando = false;
    } else if(completo()){
        aviso = 'Deu empate';
        jogando = false;
    }
}

function quemGanhou(player){
    let possibilidades = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in possibilidades){
        let pArray = possibilidades[w].split(',');
        let ganhou = pArray.every((opcao) => {
            return (tabuleiro[opcao] === player);
        });
        if(ganhou){
            return true;
        }
    }

    return false
}

function completo(){
    for(let i in tabuleiro){
        if(tabuleiro[i] === ''){
            return false;
        }
    }

    return true;
}