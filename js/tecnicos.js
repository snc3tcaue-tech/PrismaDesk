async function carregarTecnicos() {

    const lista =
        document.getElementById(
            "lista-tecnicos"
        );

    const contador =
        document.getElementById(
            "total-tecnicos"
        );

    const tecnicos =
        await getTecnicos();

    lista.innerHTML = "";

    contador.textContent =
        `${tecnicos.length} técnicos cadastrados`;

    tecnicos.forEach(tec => {

        lista.innerHTML += `

            <div class="card">

                <h3>
                    ${tec.nome_tec}
                </h3>

                <p>
                    Especialidade:
                    ${tec.especialidade || "Não definida"}
                </p>

                <br>

                <button
                    onclick="editar(${tec.id_tecnico})"
                >
                    Editar
                </button>

                <button
                    onclick="remover(${tec.id_tecnico})"
                >
                    Excluir
                </button>

            </div>

        `;
    });
}

async function adicionar() {

    const nome =
        prompt("Nome do técnico:");

    if (!nome) return;

    const especialidade =
        prompt(
            "Especialidade:\n\n1 Hardware\n2 Impressoras\n3 Software\n4 Redes\n5 Servidores\n6 Suporte"
        );

    await criarTecnico(
        nome,
        especialidade
    );

    carregarTecnicos();
}

async function editar(id) {

    const nome =
        prompt("Novo nome:");

    if (!nome) return;

    const especialidade =
        prompt(
            "Especialidade:\n\n1 Hardware\n2 Impressoras\n3 Software\n4 Redes\n5 Servidores\n6 Suporte"
        );

    await editarTecnico(
        id,
        nome,
        especialidade
    );

    carregarTecnicos();
}

async function remover(id) {

    if (
        !confirm(
            "Excluir técnico?"
        )
    ) {
        return;
    }

    await excluirTecnico(id);

    carregarTecnicos();
}

carregarTecnicos();