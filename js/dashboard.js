const dashboard = {

    chamadosAbertos: 5,
    chamadosFechados: 12,
    clientes: 8,
    tecnicosDisponiveis: 3
};

function carregarDashboard(){

    const container =
        document.getElementById("dashboard");

    container.innerHTML = `

        <div class="card">

            <h3>Chamados Abertos</h3>
            <p>${dashboard.chamadosAbertos}</p>

        </div>

        <div class="card">

            <h3>Chamados Fechados</h3>
            <p>${dashboard.chamadosFechados}</p>

        </div>

        <div class="card">

            <h3>Clientes</h3>
            <p>${dashboard.clientes}</p>

        </div>

        <div class="card">

            <h3>Técnicos Disponíveis</h3>
            <p>${dashboard.tecnicosDisponiveis}</p>

        </div>

    `;
}

carregarDashboard();
