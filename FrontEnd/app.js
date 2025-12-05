console.log("App.js funcionando");


const API_BASE = "http://localhost:3000";

async function carregar() {
    // Ajuste na rota de leitura
    const res = await fetch(`${API_BASE}/lerveiculos`);
    const dados = await res.json();

    const tabela = document.getElementById("tabela");

    tabela.innerHTML = "";
    console.log(dados);

    dados.forEach((carro) => {
        tabela.innerHTML += `
        <tr>
            <td>${carro.id}</td>
            <td>${carro.placa}</td>
            <td>${carro.modelo}</td>
            <td>${carro.pago ? "✅Sim" : "❌ Não"}</td>
            <td>
                <button onclick="pagar(${carro.id}, ${carro.pago})">
                    ${carro.pago ? '<span style="color:blue">Cancelar</span>' : '<span style="color:green">Pagar</span>'}
                </button>
            </td>
        </tr>
        `;
    });
}

async function pagar(id, pagoAtual) {
    console.log("ID:", id, "Pago Atual:", pagoAtual);

    await fetch(`${API_BASE}/atualizarpagamento/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pago: !pagoAtual
        })
    });

    carregar();
}

//Ao abrir a pagina, chama a função carregar
carregar();