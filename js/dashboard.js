let graficoPizza;
let graficoBarras;

async function carregarDashboard() {

    try {

        const response = await fetch(
            "http://localhost:3000/dashboard"
        );

        const data = await response.json();

        document.getElementById(
            "chamados-abertos"
        ).textContent = data.chamadosAbertos;

        document.getElementById(
            "chamados-fechados"
        ).textContent = data.chamadosFechados;

        document.getElementById(
            "clientes-total"
        ).textContent = data.clientes;

        document.getElementById(
            "tecnicos-total"
        ).textContent = data.tecnicos;

        renderizarGraficoPizza(data.status);
        renderizarGraficoBarras(data.categorias);

    } catch (erro) {

        console.error(
            "Erro ao carregar dashboard:",
            erro
        );
    }
}

function renderizarGraficoPizza(status) {

    if (graficoPizza) {
        graficoPizza.destroy();
    }

    const ctx = document
        .getElementById("graficoPizza")
        .getContext("2d");

    graficoPizza = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Abertos",
                "Em andamento",
                "Fechados"
            ],

            datasets: [{
                data: [
                    status.aberto || 0,
                    status.emAndamento || 0,
                    status.fechado || 0
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }

    });
}

function renderizarGraficoBarras(categorias) {

    if (graficoBarras) {
        graficoBarras.destroy();
    }

    const ctx = document
        .getElementById("graficoBarras")
        .getContext("2d");

    graficoBarras = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Hardware",
                "Software",
                "Redes",
                "Impressoras",
                "Servidores",
                "Suporte"
            ],

            datasets: [{
                label: "Categorias",

                data: [
                    categorias.hardware || 0,
                    categorias.software || 0,
                    categorias.redes || 0,
                    categorias.impressoras || 0,
                    categorias.servidores || 0,
                    categorias.suporte || 0
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false
        }

    });
}

document.addEventListener(
    "DOMContentLoaded",
    carregarDashboard
);