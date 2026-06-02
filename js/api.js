const API_URL = "http://localhost:3000";

function getToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`
    };
}

async function getChamados() {

    const res = await fetch(
        `${API_URL}/chamados`,
        {
            headers: getHeaders()
        }
    );

    return await res.json();
}

async function getMeusChamados() {

    const res = await fetch(
        `${API_URL}/chamados/meus`,
        {
            headers: getHeaders()
        }
    );

    return await res.json();
}

async function getClientes() {

    const res = await fetch(
        `${API_URL}/clientes`,
        {
            headers: getHeaders()
        }
    );

    return await res.json();
}

async function getTecnicos() {

    const res = await fetch(
        `${API_URL}/tecnicos`,
        {
            headers: getHeaders()
        }
    );

    return await res.json();
}

async function criarTecnico(
    nome_tec,
    id_especialidade
) {

    const res = await fetch(
        `${API_URL}/tecnicos`,
        {
            method: "POST",

            headers: {
                ...getHeaders(),
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome_tec,
                id_especialidade
            })
        }
    );

    return await res.json();
}

async function editarTecnico(
    id,
    nome_tec,
    id_especialidade
) {

    const res = await fetch(
        `${API_URL}/tecnicos/${id}`,
        {
            method: "PUT",

            headers: {
                ...getHeaders(),
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome_tec,
                id_especialidade
            })
        }
    );

    return await res.json();
}

async function excluirTecnico(id) {

    const res = await fetch(
        `${API_URL}/tecnicos/${id}`,
        {
            method: "DELETE",
            headers: getHeaders()
        }
    );

    return await res.json();
}