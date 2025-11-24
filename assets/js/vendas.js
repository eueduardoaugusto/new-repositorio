const popupInputs = Array.from(
  document.querySelectorAll(".popup-box input[type='text']"),
);
const btnsSave = Array.from(document.querySelectorAll(".btn-salvar"));

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

(async function getAllSales() {
  try {
    const requestSales = await fetch("http://localhost:8080/api/sale", {
      method: "GET",
      credentials: "include",
    });

    const resposeSalesData = await requestSales.json();

    console.log(resposeSalesData.sales);
  } catch (error) {
    console.error("Erro:", error.message);
    alert("Erro ao conectar com a API.");
  }
})();

btnsSave[0].addEventListener("click", handleTransmitir);
btnsSave[1].addEventListener("click", handleMonitorar);
