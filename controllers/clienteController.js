const db = require("../config/db");

exports.getAll = async (req, res) => {
  try {

    const [rows] = await db.query(`
      SELECT
        c.id_cliente,
        c.nome,
        c.telefone,
        c.email,
        COUNT(ch.id_chamado) AS total_chamados
      FROM clientes c
      LEFT JOIN chamados ch
        ON c.id_cliente = ch.id_cliente
      GROUP BY
        c.id_cliente,
        c.nome,
        c.telefone,
        c.email
      ORDER BY c.nome
    `);

    res.json(rows);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id_cliente, nome, telefone, email FROM clientes WHERE id_cliente = ?",
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { nome, telefone, email } = req.body;

    await db.query(
      `UPDATE clientes
       SET nome = ?, telefone = ?, email = ?
       WHERE id_cliente = ?`,
      [nome, telefone, email, req.params.id]
    );

    res.json({
      msg: "Cliente atualizado"
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM clientes WHERE id_cliente = ?",
      [req.params.id]
    );

    res.json({
      msg: "Cliente removido"
    });
  } catch (err) {
    res.status(500).json(err);
  }
};