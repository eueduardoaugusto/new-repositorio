const popupInputs = Array.from(
  document.querySelectorAll(".popup-box input[type='text']"),
);
const btnsSave = Array.from(document.querySelectorAll(".btn-salvar"));
const salesTable = document.querySelector("#salesList");

async function handleTransmitir(e) {
  e.preventDefault();

  if (!popupInputs[0].value || !popupInputs[1].value) {
    return;
  }

  try {
    const requestTransmit = await fetch(
      "http://localhost:8080/api/sale/transmit",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          orcamentoInicio: popupInputs[0].value,
          orcamentoFim: popupInputs[1].value,
        }),
      },
    );
    const dataTransmit = await requestTransmit.json();
  } catch (error) {
    console.error("Erro:", error.message);
    alert("Erro ao conectar com a API.");
  }
}

async function handleMonitorar(e) {
  e.preventDefault();

  if (!popupInputs[2].value || !popupInputs[3].value) {
    return;
  }

  try {
    const request = await fetch("http://localhost:8080/api/sale/monitor", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        rpsInicio: popupInputs[2].value,
        rpsFim: popupInputs[3].value,
      }),
    });

    const response = await request.json();
    alert(response.message);
  } catch (error) {
    console.error("Erro:", error.message);
    alert("Erro ao conectar com a API.");
  }
}

async function getAllSales() {
  try {
    const requestSales = await fetch("http://localhost:8080/api/sales", {
      method: "GET",
      credentials: "include",
    });

    const resposeSalesData = await requestSales.json();
    renderAllSales(resposeSalesData);
  } catch (error) {
    console.error("Erro:", error.message);
    alert("Erro ao conectar com a API.");
  }
}

async function renderAllSales(sales) {
  try {
    salesTable.innerHTML = "";

    sales.forEach(
      ({
        status,
        Cliente,
        Invoice,
        Budget,
        type,
        issueDate,
        PaymentParcels,
      }) => {
        const tr = document.createElement("tr");
        console.log(sales);
        const rps = Invoice?.rpsNumber ?? "-";
        const nfse = Invoice?.nfseNumber ?? "-";
        const budgetNum = Budget?.budgetNumber ?? "-";

        // Verifica se há pelo menos uma parcela para evitar erro de índice [0]
        const parcelaValor = PaymentParcels?.[0]?.parcelValue ?? "-";
        const clienteNome = Cliente?.nome ?? "N/A";
        const statusColorKey = status?.colorKey ?? "default";

        tr.innerHTML = `
        <td>Ações</td>
         <td>${statusColorKey}</td>
        <td>${budgetNum}</td>
        <td>${rps}</td> 
        <td>${nfse}</td>
        <td>${clienteNome}</td>
        <td> - </td>
        <td>${type}</td>
        <td>${parcelaValor}</td>
        <td>${issueDate.slice(0, 10)}</td>
       `;

        //         <td>${rps}</td>
        //         <td>${nfse}</td>
        //         <td>${"ainda não"}</td>
        //         <td>${parcelaValor}</td>
        //   responseSaleData[0].status { text": "Faturado", "colorKey": "info" }
        salesTable.appendChild(tr);
      },
    );
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
}
getAllSales();
btnsSave[0].addEventListener("click", handleTransmitir);
btnsSave[1].addEventListener("click", handleMonitorar);
