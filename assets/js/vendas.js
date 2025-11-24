const salesTable = document.querySelector("#salesList");

const formMonitor = document.querySelector("#form_monitor");
const formTransmission = document.querySelector("#form_transmission");
const searchBtns = Array.from(document.querySelectorAll(".btn-salvar"));

const filterConfigurations = [
  { form: formTransmission, startIdx: 0, endIdx: 1, type: "budget" },
  { form: formMonitor, startIdx: 0, endIdx: 1, type: "rps" },
];

function checkIfExistsInputValue(inputs) {
  return inputs[0].value.trim() !== "" || inputs[1].value.trim() !== "";
}

async function getAllSales(filters = "") {
  try {
    const url = `http://localhost:8080/api/sales/${filters}`;

    const requestSales = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (requestSales.status === 404) {
      renderAllSales([]);
      console.warn("Nenhuma venda encontrada para os filtros aplicados.");
      return;
    }

    if (!requestSales.ok) {
      throw new Error(`Erro HTTP: ${requestSales.status}`);
    }

    const resposeSalesData = await requestSales.json();
    renderAllSales(resposeSalesData);
  } catch (error) {
    console.error("Erro na busca de vendas:", error.message);
    alert("Erro ao conectar com a API ou buscar dados.");
  }
}

searchBtns.forEach((btn, i) => {
  const config = filterConfigurations[i];

  const inputs = Array.from(config.form.querySelectorAll("input"));

  btn.addEventListener("click", async function (e) {
    e.preventDefault();

    if (!checkIfExistsInputValue(inputs)) {
      alert("Por favor, preencha pelo menos um dos campos de filtro.");
      return;
    }

    const startValue = inputs[config.startIdx].value;
    const endValue = inputs[config.endIdx].value;

    let filters;
    if (config.type === "rps") {
      filters = `filter/rps-numbers?startRPS=${startValue}&endRPS=${endValue}`;
    } else if (config.type === "budget") {
      filters = `filter/budget-numbers?startBudget=${startValue}&endBudget=${endValue}`;
    }

    await getAllSales(filters);
  });
});

async function renderAllSales(sales) {
  try {
    salesTable.innerHTML = "";
    sales.forEach(
      ({
        status,
        Client,
        Invoice,
        Budget,
        totalValue,
        type,
        installments,
        issueDate,
      }) => {
        const tr = document.createElement("tr");

        const rps = Invoice?.rpsNumber ?? "-";
        const nfse = Invoice?.nfseNumber ?? "-";
        const budgetNum = Budget?.budgetNumber ?? "-";
        const clienteNome = Client?.nome ?? "N/A";
        const statusColorKey = status?.colorKey ?? "default";
        const formattedDate = issueDate
          ? new Date(issueDate).toLocaleDateString("pt-BR")
          : "-";

        tr.innerHTML = `
                        <td>Ações</td>
                        <td>${statusColorKey}</td>
                        <td>${budgetNum}</td>
                        <td>${rps}</td> 
                        <td>${nfse}</td>
                        <td>${clienteNome}</td>
                        <td>${totalValue ?? "-"}</td>
                        <td>${type}</td>
                        <td>${installments ?? "-"}</td>
                        <td>${formattedDate}</td>
                        `;
        salesTable.appendChild(tr);
      },
    );
  } catch (error) {
    console.error("Erro ao renderizar vendas:", error);
  }
}

getAllSales();
