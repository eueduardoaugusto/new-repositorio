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
    await fetch("http://localhost:8080/api/sale/transmit", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        rpsInicio: popupInputs[0].value,
        rpsFim: popupInputs[1].value,
      }),
    });
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
    await fetch("http://localhost:8080/api/sale/monitor", {
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
  } catch (error) {
    console.error("Erro:", error.message);
    alert("Erro ao conectar com a API.");
  }
}

btnsSave[0].addEventListener("click", handleTransmitir);
btnsSave[1].addEventListener("click", handleMonitorar);
