async function carregarMeusChamados() {

    const lista =
        document.getElementById(
            "lista-chamados"
        );

    const contador =
        document.getElementById(
            "total-chamados"
        );

    try {

        const chamados =
            await getMeusChamados();

        if (!Array.isArray(chamados)) {

            console.log(chamados);

            contador.textContent =
                "Erro ao carregar";

            return;
        }

        lista.innerHTML = "";

        contador.textContent =
            `${chamados.length} chamados encontrados`;

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

                    <div class="footer-card">

                        <span>
                            ${new Date(
                                chamado.data_abertura
                            ).toLocaleDateString("pt-BR")}
                        </span>

                        <span>
                            ${chamado.prioridade}
                        </span>

                    </div>

                </div>

            `;
        });

    } catch (err) {

        console.log(err);

    }
}

carregarMeusChamados();