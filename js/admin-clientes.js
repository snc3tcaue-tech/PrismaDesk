async function carregarClientes() {

    const lista =
        document.getElementById(
            "lista-clientes"
        );

    const contador =
        document.getElementById(
            "total-clientes"
        );

    try {

        const clientes =
            await getClientes();

        lista.innerHTML = "";

        contador.textContent =
            `${clientes.length} clientes cadastrados`;

        clientes.forEach(cliente => {

            lista.innerHTML += `

                <div class="card">

                    <h3>
                        ${cliente.nome}
                    </h3>

                    <p>
                        Email:
                        ${cliente.email}
                    </p>

                    <p>
                        Telefone:
                        ${cliente.telefone || "-"}
                    </p>

                    <p>
                        Chamados:
                        ${cliente.total_chamados || 0}
                    </p>

                    <button onclick="editarCliente(${cliente.id_cliente}, '${cliente.nome}', '${cliente.telefone || ""}', '${cliente.email}')">
                        Editar
                    </button>

                    <button onclick="confirmarExclusao(${cliente.id_cliente})">
                        Excluir
                    </button>

                </div>

            `;
        });

    } catch (err) {

        console.log(err);

    }
}

async function confirmarExclusao(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este cliente?"
    );

    if (!confirmar) {
        return;
    }

    const res = await fetch(
        `${API_URL}/clientes/${id}`,
        {
            method: "DELETE",
            headers: getHeaders()
        }
    );

    const data =
        await res.json();

    alert(data.msg);

    carregarClientes();
}

async function editarCliente(
    id,
    nomeAtual,
    telefoneAtual,
    emailAtual
) {

    const nome =
        prompt(
            "Nome:",
            nomeAtual
        );

    if (!nome) return;

    const telefone =
        prompt(
            "Telefone:",
            telefoneAtual
        );

    const email =
        prompt(
            "Email:",
            emailAtual
        );

    if (!email) return;

    const res = await fetch(
        `${API_URL}/clientes/${id}`,
        {
            method: "PUT",

            headers: {
                ...getHeaders(),
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                nome,
                telefone,
                email
            })
        }
    );

    const data =
        await res.json();

    alert(
        data.msg ||
        "Cliente atualizado"
    );

    carregarClientes();
}

carregarClientes();