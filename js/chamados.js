const chamados = [

    {
        categoria: "Hardware",
        status: "Em andamento",
        titulo: "Computador não liga",
        descricao: "Meu computador não está iniciando corretamente.",
        cliente: "Fernanda Lima",
        data: "28/05/26",
        prioridade: "Alta"
    },

    {
        categoria: "Redes",
        status: "Aberto",
        titulo: "Internet lenta",
        descricao: "A conexão está muito lenta no escritório.",
        cliente: "Rafael Souza",
        data: "27/05/26",
        prioridade: "Média"
    },

    {
        categoria: "Software",
        status: "Fechado",
        titulo: "Erro no sistema",
        descricao: "Sistema apresentando falha ao abrir.",
        cliente: "Carlos Mendes",
        data: "25/05/26",
        prioridade: "Baixa"
    }

];

async function carregarChamados(){

    const lista =
        document.getElementById("lista-chamados");

    const contador =
        document.getElementById("total-chamados");

    const chamados =
        await getChamados();

    lista.innerHTML = "";

    contador.textContent =
        `${chamados.length} registros`;

chamados.forEach(chamado => {

    lista.innerHTML += `

        <div class="card">

            <div class="card-header">

                <span>
                    ${chamado.categoria}
                </span>

                <span>
                    ${chamado.status_chamado}
                </span>

            </div>

            <h3>
                ${chamado.titulo}
            </h3>

            <p>
                ${chamado.descricao}
            </p>

            <div class="info">

                <span>
                    ${chamado.cliente}
                </span>

            </div>

            <div class="footer-card">

                <span>

                ${
                    new Date(
                        chamado.data_abertura
                    ).toLocaleDateString("pt-BR")
                }

                </span>

                <span>
                    ${chamado.prioridade}
                </span>

            </div>

        </div>

    `;
});
}

carregarChamados();