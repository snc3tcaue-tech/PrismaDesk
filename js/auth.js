function mostrarCadastro() {

    document
        .getElementById("loginForm")
        .classList.add("hidden");

    document
        .getElementById("cadastroForm")
        .classList.remove("hidden");
}

function mostrarLogin() {

    document
        .getElementById("cadastroForm")
        .classList.add("hidden");

    document
        .getElementById("loginForm")
        .classList.remove("hidden");
}

async function login() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const senha =
        document.getElementById(
            "loginSenha"
        ).value;

    try {

        const res = await fetch(
            "http://localhost:3000/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );

        const data =
            await res.json();

        if (!res.ok) {
            return alert(data.msg);
        }

        localStorage.setItem(
            "token",
            data.token
        );

       const payload = JSON.parse(
    atob(data.token.split(".")[1])
);

if (payload.isAdmin) {

    window.location.href =
        "dashboard.html";

} else {

    window.location.href =
        "clientes.html";
}

    } catch {

        alert(
            "Erro ao conectar com servidor"
        );
    }
}

async function cadastrar() {

    const nome =
        document.getElementById(
            "nome"
        ).value;

    const telefone =
        document.getElementById(
            "telefone"
        ).value;

    const email =
        document.getElementById(
            "cadastroEmail"
        ).value;

    const senha =
        document.getElementById(
            "cadastroSenha"
        ).value;

    try {

        const res = await fetch(
            "http://localhost:3000/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    nome,
                    telefone,
                    email,
                    senha
                })
            }
        );

        const data =
            await res.json();

        alert(data.msg);

        mostrarLogin();

    } catch {

        alert(
            "Erro ao cadastrar"
        );
    }
}