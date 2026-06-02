const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {

        const {
            nome,
            telefone,
            email,
            senha
        } = req.body;

        const [existe] = await db.query(
            "SELECT * FROM clientes WHERE email = ?",
            [email]
        );

        if (existe.length > 0) {
            return res.status(400).json({
                msg: "E-mail já cadastrado"
            });
        }

        const hash = await bcrypt.hash(
            senha,
            10
        );

        await db.query(
            `INSERT INTO clientes
            (nome, telefone, email, senha)
            VALUES (?, ?, ?, ?)`,
            [nome, telefone, email, hash]
        );

        res.status(201).json({
            msg: "Cliente cadastrado com sucesso"
        });

    } catch (err) {

        res.status(500).json({
            erro: err.message
        });

    }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM clientes WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        msg: "Usuário não encontrado"
      });
    }

    const user = rows[0];

    let valid = false;

    if (user.senha.startsWith("$2b$")) {
      valid = await bcrypt.compare(senha, user.senha);
    } else {
      valid = senha === user.senha;
    }

    if (!valid) {
      return res.status(401).json({
        msg: "Senha inválida"
      });
    }

  const token = jwt.sign(
  {
    id: user.id_cliente,
    email: user.email,

    isAdmin:
      user.email === "admin@prismadesk.com"
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

    res.json({
  token,
  nome: user.nome
});
  } catch (err) {
    res.status(500).json(err);
  }
};