const db = require("../config/db");

exports.getAll = async (req, res) => {
    try {

        const [rows] = await db.query(`
            SELECT
                t.id_tecnico,
                t.nome_tec,
                e.nome AS especialidade
            FROM tecnicos t
            LEFT JOIN tec_especialidade te
                ON t.id_tecnico = te.id_tecnico
            LEFT JOIN especialidades e
                ON te.id_especialidade = e.id_especialidade
            ORDER BY t.id_tecnico
        `);

        res.json(rows);

    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = async (req, res) => {

    try {

        const {
            nome_tec,
            id_especialidade
        } = req.body;

        const [result] = await db.query(
            `
            INSERT INTO tecnicos(nome_tec)
            VALUES(?)
            `,
            [nome_tec]
        );

        if (id_especialidade) {

            await db.query(
                `
                INSERT INTO tec_especialidade
                (id_tecnico,id_especialidade)
                VALUES (?,?)
                `,
                [
                    result.insertId,
                    id_especialidade
                ]
            );
        }

        res.status(201).json({
            msg: "Técnico cadastrado"
        });

    } catch (err) {
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {

    try {

        const {
            nome_tec,
            id_especialidade
        } = req.body;

        const id = req.params.id;

        await db.query(
            `
            UPDATE tecnicos
            SET nome_tec = ?
            WHERE id_tecnico = ?
            `,
            [nome_tec, id]
        );

        await db.query(
            `
            DELETE FROM tec_especialidade
            WHERE id_tecnico = ?
            `,
            [id]
        );

        if (id_especialidade) {

            await db.query(
                `
                INSERT INTO tec_especialidade
                (id_tecnico,id_especialidade)
                VALUES (?,?)
                `,
                [
                    id,
                    id_especialidade
                ]
            );
        }

        res.json({
            msg: "Técnico atualizado"
        });

    } catch (err) {
        res.status(500).json(err);
    }
};

exports.remove = async (req, res) => {

    try {

        await db.query(
            `
            DELETE FROM tecnicos
            WHERE id_tecnico = ?
            `,
            [req.params.id]
        );

        res.json({
            msg: "Técnico removido"
        });

    } catch (err) {
        res.status(500).json(err);
    }
};