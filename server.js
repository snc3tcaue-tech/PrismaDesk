require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const tecnicoRoutes = require("./routes/tecnicoRoutes");
const chamadoRoutes = require("./routes/chamadoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/clientes", clienteRoutes);
app.use("/tecnicos", tecnicoRoutes);
app.use("/chamados", chamadoRoutes);

app.get("/", (req, res) => {
  res.json({
    msg: "API PrismaDesk funcionando"
  });
});

app.get("/dashboard", async (req, res) => {

    try {

        const db = require("./config/db");

        const [[abertos]] = await db.query(
            "SELECT COUNT(*) total FROM chamados WHERE status_chamado='aberto'"
        );

        const [[fechados]] = await db.query(
            "SELECT COUNT(*) total FROM chamados WHERE status_chamado='fechado'"
        );

        const [[andamento]] = await db.query(
            "SELECT COUNT(*) total FROM chamados WHERE status_chamado='em andamento'"
        );

        const [[clientes]] = await db.query(
            "SELECT COUNT(*) total FROM clientes"
        );

        const [[tecnicos]] = await db.query(
            "SELECT COUNT(*) total FROM tecnicos"
        );

        const [categoriasDB] = await db.query(`
            SELECT categoria, COUNT(*) total
            FROM chamados
            GROUP BY categoria
        `);

        const categorias = {
            hardware: 0,
            software: 0,
            redes: 0,
            impressoras: 0,
            servidores: 0,
            suporte: 0
        };

        categoriasDB.forEach(item => {
            categorias[item.categoria] = item.total;
        });

        res.json({

            chamadosAbertos: abertos.total,

            chamadosFechados: fechados.total,

            clientes: clientes.total,

            tecnicos: tecnicos.total,

            status: {
                aberto: abertos.total,
                emAndamento: andamento.total,
                fechado: fechados.total
            },

            categorias

        });

    } catch (err) {

        console.error(err);
        res.status(500).json(err);

    }

});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});