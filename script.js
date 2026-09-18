let descricao = document.getElementById("descricao");

let valor = document.getElementById("valor");

let tipo = document.getElementById("tipo");

let botao = document.getElementById("adicionar");

let listaTransacoes = document.getElementById("lista-transacoes");

let transacoesSalvas = JSON.parse(localStorage.getItem("transacoes")) || [];





function atualizarCards() {

    let receitas = 0;

    let despesas = 0;

    let transacoes = document.querySelectorAll(".valor");

    transacoes.forEach(function(transacao) {

        let valor = Number(
            transacao.textContent
                .replace("+ R$ ", "")
                .replace("- R$ ", "")
        );

        if (transacao.classList.contains("entrada")) {

            receitas = receitas + valor;

        }

        if (transacao.classList.contains("saida")) {

            despesas = despesas + valor;

        }

    });

    let economia = receitas - despesas;

    document.getElementById("receitas").textContent = `R$ ${receitas}`;

    document.getElementById("despesas").textContent = `R$ ${despesas}`;

    document.getElementById("economia").textContent = `R$ ${economia}`;

    document.getElementById("saldo").textContent = `R$ ${economia}`;

}





function mostrarTransacao(transacao) {

    let novaTransacaoElemento = document.createElement("article");

    novaTransacaoElemento.classList.add("transcao");



    let titulo = document.createElement("h3");

    titulo.textContent = transacao.nome;

    novaTransacaoElemento.appendChild(titulo);



    let valorElemento = document.createElement("p");

    valorElemento.classList.add("valor");

    valorElemento.textContent =
        `${transacao.tipo === "entrada" ? "+" : "-"} R$ ${transacao.valor}`;



    if (transacao.tipo === "entrada") {

        valorElemento.classList.add("entrada");

    } else {

        valorElemento.classList.add("saida");

    }



    novaTransacaoElemento.appendChild(valorElemento);



    let botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.classList.add("excluir");

    novaTransacaoElemento.appendChild(botaoExcluir);



    botaoExcluir.addEventListener("click", function() {

        novaTransacaoElemento.remove();

        transacoesSalvas = transacoesSalvas.filter(function(item) {

            return item !== transacao;

        });

        localStorage.setItem(
            "transacoes",
            JSON.stringify(transacoesSalvas)
        );

        atualizarCards();

    });



    listaTransacoes.appendChild(novaTransacaoElemento);

}





transacoesSalvas.forEach(function(transacao) {

    mostrarTransacao(transacao);

});





botao.addEventListener("click", function() {

    console.log("CLIQUE FUNCIONOU");



    let nome = descricao.value.toUpperCase();

    let valorTransacao = Number(valor.value);

    let tipoTransacao = tipo.value;



    let novaTransacao = {

        nome: nome,

        valor: valorTransacao,

        tipo: tipoTransacao

    };



    transacoesSalvas.push(novaTransacao);



    localStorage.setItem(
        "transacoes",
        JSON.stringify(transacoesSalvas)
    );



    mostrarTransacao(novaTransacao);



    atualizarCards();



    descricao.value = "";

    valor.value = "";

    tipo.value = "entrada";

});