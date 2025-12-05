const express = require("express")
const cors = require("cors")
const porta = 3000

const app = express()
app.use(express.json())
app.use(cors())

let VEICULOS = [
    {
        id: 1,
        placa: "ABC-1234",
        modelo: "sedan",
        hora_entrada: new Date().toISOString(),
        pago: true
    },
    {
        id: 2,
        placa: "DEF-4321",
        modelo: "SUV",
        hora_entrada: new Date().toISOString(),
        pago: true
    },
    {
        id: 3,
        placa: "GHI-5678",
        modelo: "hatch",
        hora_entrada: new Date().toISOString(),
        pago: false
    },
    {
        id: 4,
        placa: "JKL-8765",
        modelo: "caminhonete",
        hora_entrada: new Date().toISOString(),
        pago: true
    },
    {
        id: 5,
        placa: "MNO-9012",
        modelo: "moto",
        hora_entrada: new Date().toISOString(),
        pago: false
    }
];

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello" })
})

app.get("/lerveiculos", (req, res) => {
    res.status(200).json(VEICULOS)
})

app.get("/lerveiculos/:id", (req, res) => {
    const id = Number(req.params.id)
    const meuCarro = VEICULOS.find(meuCarro => meuCarro.id === id)
    console.log(meuCarro)
    res.status(200).json(meuCarro)
})

app.patch("/atualizarpagamento/:id", (req, res) => {
    const veiculo = VEICULOS.find(x => x.id === Number(req.params.id));
    console.log(veiculo)
    if (!veiculo) return res.status(404).json({ erro: "Não achei" })

    const { pago } = req.body;

    if (pago !== undefined) veiculo.pago = pago;

    res.json(veiculo)
})


app.listen(porta, () => {
    console.log(`console rodando no http://localhost:${porta}`)
})