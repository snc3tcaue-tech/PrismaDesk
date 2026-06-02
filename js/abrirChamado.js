async function abrirChamado() {

    const categoria =
        document.getElementById("categoria").value;

    const prioridade =
        document.getElementById("prioridade").value;

    const titulo =
        document.getElementById("titulo").value;

    const descricao =
        document.getElementById("descricao").value;

    try {

        const res = await fetch(
            `${API_URL}/chamados`,
            {
                method: "POST",

                headers: {
                    ...getHeaders(),
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    categoria,
                    prioridade,
                    titulo,
                    descricao
                })
            }
        );

        const texto = await res.text();

        console.log("STATUS:", res.status);
        console.log("RESPOSTA:", texto);

        if (!res.ok) {

            alert(
                "Erro ao criar chamado.\n\nVeja o console (F12)."
            );

            return;
        }

        alert("Chamado criado com sucesso!");

        window.location.href =
            "clientes.html";

    } catch (err) {

        console.error(err);

        alert(
            "Erro de conexão com o servidor."
        );
    }
}