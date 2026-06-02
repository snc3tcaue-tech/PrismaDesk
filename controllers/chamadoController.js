const db = require("../config/db");

// CREATE CHAMADO
exports.create = async (req, res) => {

    try {

        const {
            categoria,
            prioridade,
            titulo,
            descricao
        } = req.body;

        const id_cliente = req.user.id;

        if (
            !categoria ||
            !prioridade ||
            !titulo ||
            !descricao
        ) {
            return res.status(400).json({
                msg: "Preencha todos os campos"
            });
        }

        const [result] = await db.query(
            `
            INSERT INTO chamados
            (
                id_cliente,
                categoria,
                prioridade,
                titulo,
                descricao,
                status_chamado
            )
            VALUES
            (?, ?, ?, ?, ?, 'aberto')
            `,
            [
                id_cliente,
                categoria,
                prioridade,
                titulo,
                descricao
            ]
        );

        try {

            await db.query(
                `
                INSERT INTO historico_chamados
                (
                    id_chamado,
                    descricao
                )
                VALUES
                (?, ?)
                `,
                [
                    result.insertId,
                    "Chamado criado"
                ]
            );

        } catch (e) {

            console.log(
                "Histórico não criado:",
                e.message
            );

        }

        res.status(201).json({
            msg: "Chamado criado com sucesso"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            msg: err.message
        });

    }
};


// GET TODOS
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                c.id_chamado,
                cli.nome AS cliente,
                t.nome_tec AS tecnico,
                c.categoria,
                c.prioridade,
                c.titulo,
                c.descricao,
                c.status_chamado,
                c.data_abertura,
                c.data_fechamento
            FROM chamados c
            JOIN clientes cli ON c.id_cliente = cli.id_cliente
            LEFT JOIN tecnicos t ON c.id_tecnico = t.id_tecnico
            ORDER BY c.id_chamado DESC
        `);

        res.json(rows);

    } catch (err) {
        res.status(500).json({ msg: "Erro ao buscar chamados" });
    }
};


// UPDATE STATUS
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        await db.query(
            `UPDATE chamados
             SET status_chamado = ?
             WHERE id_chamado = ?`,
            [status, req.params.id]
        );

        await db.query(
            `INSERT INTO historico_chamados (id_chamado, descricao)
             VALUES (?, ?)`,
            [req.params.id, `Status alterado para ${status}`]
        );

        if (status === "fechado") {
            await db.query(
                `UPDATE chamados
                 SET data_fechamento = NOW()
                 WHERE id_chamado = ?`,
                [req.params.id]
            );
        }

        res.json({ msg: "Status atualizado" });

    } catch (err) {
        res.status(500).json({ msg: "Erro ao atualizar status" });
    }
};


// HISTÓRICO
exports.getHistorico = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT * FROM historico_chamados WHERE id_chamado = ?`,
            [req.params.id]
        );

        res.json(rows);

    } catch (err) {
        res.status(500).json({ msg: "Erro ao buscar histórico" });
    }
};


// MEUS CHAMADOS
exports.getMeusChamados = async (req, res) => {
    try {
        const id_cliente = req.user.id;

        const [rows] = await db.query(`
            SELECT
                c.id_chamado,
                cli.nome AS cliente,
                t.nome_tec AS tecnico,
                c.categoria,
                c.prioridade,
                c.titulo,
                c.descricao,
                c.status_chamado,
                c.data_abertura,
                c.data_fechamento
            FROM chamados c
            JOIN clientes cli ON c.id_cliente = cli.id_cliente
            LEFT JOIN tecnicos t ON c.id_tecnico = t.id_tecnico
            WHERE c.id_cliente = ?
            ORDER BY c.id_chamado DESC
        `, [id_cliente]);

        res.json(rows);

    } catch (err) {
        res.status(500).json({ msg: "Erro ao buscar chamados do cliente" });
    }
};