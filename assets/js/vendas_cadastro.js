const API_BASE_URL = "http://localhost:8080";

document.getElementById("clientId").addEventListener("blur", fetchClientName);
document.getElementById("clientId").addEventListener("change", fetchClientName);

let addedItems = [];
let addedParcels = [];
let totalSaleValue = 0.0;

const LOGGED_IN_USER_ID = 3;

document
  .querySelector(".btn-add-item")
  .addEventListener("click", addItemToSale);

document
  .getElementById("inputBarcode")
  .addEventListener("change", fetchProductDetails);

["inputQuantity", "inputUnitPrice", "inputDiscount"].forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("input", calculateInputFinalPrice);
});

async function fetchClientName() {
  const clientIdInput = document.getElementById("clientId");
  const clientId = clientIdInput.value;
  const displayElement = document.getElementById("clientNameDisplay");

  displayElement.value = "Carregando...";

  if (!clientId || isNaN(clientId)) {
    displayElement.value = "Nenhum cliente selecionado.";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/clientes/${clientId}`, {
      credentials: "include",
    });

    if (response.ok) {
      const client = await response.json();

      if (client && client.nome) {
        displayElement.value = client.nome;
      } else {
        displayElement.value = `Cliente ID ${clientId} encontrado, mas sem nome.`;
      }
    } else if (response.status === 404) {
      displayElement.value = `Cliente ID ${clientId} não encontrado.`;
    } else {
      displayElement.value = `Erro ao buscar cliente: ${response.statusText}`;
    }
  } catch (error) {
    console.error("Erro de rede ao buscar cliente:", error);
    displayElement.value = "Erro de conexão com o servidor de clientes.";
  }
}

async function fetchProductDetails() {
  const barcode = document.getElementById("inputBarcode").value;
  const inputDescription = document.getElementById("inputDescription");
  const inputUnitPrice = document.getElementById("inputUnitPrice");
  const inputRow = document.getElementById("inputRow");

  inputDescription.value = "Buscando...";
  inputUnitPrice.value = 0;
  inputRow.dataset.productId = "";

  if (!barcode) {
    inputDescription.value = "Nenhum código de barras inserido.";
    return;
  }

  try {
    const url = `${API_BASE_URL}/api/produtos/barcode/${barcode}`;

    const response = await fetch(url, { credentials: "include" });

    if (response.ok) {
      const product = await response.json();

      const productData = Array.isArray(product) ? product[0] : product;

      if (productData && productData.id_produto) {
        inputRow.dataset.productId = productData.id_produto;
        inputDescription.value = productData.nome;
        inputUnitPrice.value = parseFloat(productData.preco).toFixed(2);

        calculateInputFinalPrice();
      } else {
        inputDescription.value = `Produto (Cód: ${barcode}) não encontrado.`;
      }
    } else if (response.status === 404) {
      inputDescription.value = `Produto (Cód: ${barcode}) não encontrado.`;
    } else {
      inputDescription.value = `Erro de busca: ${response.statusText}`;
    }
  } catch (error) {
    console.error("Erro de rede ao buscar produto:", error);
    inputDescription.value = "Erro de conexão com a API de produtos.";
  }
}

function calculateInputFinalPrice() {
  const quantity =
    parseFloat(document.getElementById("inputQuantity").value) || 0;
  const unitPrice =
    parseFloat(document.getElementById("inputUnitPrice").value) || 0;
  const discount =
    parseFloat(document.getElementById("inputDiscount").value) || 0;

  let finalPrice = quantity * unitPrice - discount;

  if (finalPrice < 0) {
    finalPrice = 0;
  }

  document.getElementById("inputFinalPrice").value = finalPrice.toFixed(2);
}

function addItemToSale() {
  const quantity = parseFloat(document.getElementById("inputQuantity").value);
  const unitPrice = parseFloat(document.getElementById("inputUnitPrice").value);
  const discount = parseFloat(document.getElementById("inputDiscount").value);
  const finalPrice = parseFloat(
    document.getElementById("inputFinalPrice").value,
  );

  const description = document.getElementById("inputDescription").value;
  const productId = document.getElementById("inputRow").dataset.productId;
  const barcode = document.getElementById("inputBarcode").value;

  if (!productId || !description || quantity <= 0 || unitPrice <= 0) {
    alert("Preencha o produto (Código e Preço) e a Quantidade.");
    return;
  }

  const newItem = {
    productId: parseInt(productId),
    quantity: quantity,
    unitPrice: unitPrice,
    discount: discount,
    finalPrice: finalPrice,
    description: description,
    barcode: barcode,
  };

  addedItems.push(newItem);
  totalSaleValue += finalPrice;
  console.log("Total da Venda ATUALIZADO:", totalSaleValue);

  updateTotalValueDisplay();
  renderItemsList();
  document.getElementById("inputBarcode").value = "";
  document.getElementById("inputDescription").value = "";
  document.getElementById("inputQuantity").value = 1;
  document.getElementById("inputUnitPrice").value = 0.0;
  document.getElementById("inputDiscount").value = 0.0;
  document.getElementById("inputFinalPrice").value = 0.0;
  document.getElementById("inputRow").dataset.productId = "";
}

function removeItemFromSale(index) {
  const item = addedItems[index];
  totalSaleValue -= item.finalPrice;
  addedItems.splice(index, 1);

  updateTotalValueDisplay();
  renderItemsList();
  addedParcels = [];
  renderParcelsList(addedParcels);
}

function renderItemsList() {
  const itemsListBody = document.getElementById("itemsList");
  itemsListBody.innerHTML = "";

  addedItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.barcode}</td>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>R$ ${item.unitPrice.toFixed(2)}</td>
            <td>R$ ${item.discount.toFixed(2)}</td>
            <td>R$ ${item.finalPrice.toFixed(2)}</td>
            <td><button type="button" class="btn-remove-item" data-index="${index}">Remover</button></td>
        `;
    itemsListBody.appendChild(row);
  });
  document.querySelectorAll(".btn-remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      removeItemFromSale(parseInt(this.dataset.index));
    });
  });
}

function updateTotalValueDisplay() {
  document.getElementById(
    "totalValueDisplay",
  ).textContent = `R$ ${totalSaleValue.toFixed(2).replace(".", ",")}`;
  document.getElementById("totalValueInput").value = totalSaleValue.toFixed(2);
}

function openPaymentModal() {
  console.log("Total da Venda ao Abrir Modal:", totalSaleValue);
  if (totalSaleValue <= 0) {
    alert("Adicione itens à venda antes de adicionar um pagamento.");
    return;
  }
  const currentInstallments =
    parseInt(document.getElementById("installmentsCount").value) || 1;
  const suggestedValue = (totalSaleValue / currentInstallments).toFixed(2);
  document.getElementById(
    "parcelValue",
  ).placeholder = `Será calculado ou digitado (Total: R$ ${totalSaleValue
    .toFixed(2)
    .replace(".", ",")}) - Sugerido: R$ ${suggestedValue.replace(".", ",")}`;

  document.getElementById("popupPagamento").style.display = "flex";
}

function closePaymentModal() {
  document.getElementById("popupPagamento").style.display = "none";
}

document
  .getElementById("paymentForm")
  .addEventListener("submit", handlePaymentSubmission);

function handlePaymentSubmission(e) {
  e.preventDefault();

  const totalValue = totalSaleValue;
  const method = document.getElementById("paymentMethod").value;
  const installmentsCount = parseInt(
    document.getElementById("installmentsCount").value,
  );
  let parcelValueInput = parseFloat(
    document.getElementById("parcelValue").value,
  );

  let parcelValue =
    isNaN(parcelValueInput) || parcelValueInput === 0
      ? totalValue / installmentsCount
      : parcelValueInput;

  if (totalValue <= 0) {
    alert("O valor total da venda deve ser maior que zero.");
    return;
  }
  if (installmentsCount <= 0) {
    alert("O número de parcelas deve ser no mínimo 1.");
    return;
  }

  addedParcels = [];
  let totalAssigned = 0;

  for (let i = 1; i <= installmentsCount; i++) {
    let currentParcelValue = parcelValue;

    if (i === installmentsCount) {
      const remaining = totalValue - totalAssigned;
      currentParcelValue = parseFloat(remaining.toFixed(2));
    }

    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + i);
    const formattedDueDate = dueDate.toISOString().split("T")[0];

    const parcel = {
      method: method,
      parcelNumber: i,
      parcelValue: parseFloat(currentParcelValue.toFixed(2)),
      dueDate: formattedDueDate,
    };

    addedParcels.push(parcel);
    totalAssigned += parcel.parcelValue;
  }

  renderParcelsList(addedParcels);
  closePaymentModal();
}

function renderParcelsList(parcels) {
  const parcelsListUl = document.getElementById("parcelsList");
  parcelsListUl.innerHTML = "";

  if (parcels.length === 0) {
    parcelsListUl.innerHTML = "<li>Nenhuma parcela adicionada.</li>";
    return;
  }

  let totalParcelsValue = 0;
  parcels.forEach((parcel) => {
    totalParcelsValue += parcel.parcelValue;
    const li = document.createElement("li");
    li.textContent = `P. ${parcel.parcelNumber} (${
      parcel.method
    }): R$ ${parcel.parcelValue.toFixed(2).replace(".", ",")} (Vencimento: ${
      parcel.dueDate
    })`;
    parcelsListUl.appendChild(li);
  });

  const totalLi = document.createElement("li");
  totalLi.innerHTML = `<br><strong>Total Parcelado: R$ ${totalParcelsValue
    .toFixed(2)
    .replace(".", ",")}</strong>`;
  parcelsListUl.appendChild(totalLi);
}

document
  .getElementById("saleForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (addedItems.length === 0) {
      alert("Adicione pelo menos um item à venda.");
      return;
    }

    if (addedParcels.length === 0) {
      alert(
        "Adicione as informações de pagamento/parcelamento (clique em '+ Pagamento').",
      );
      return;
    }

    const saleData = {
      budgetId: document.getElementById("budgetId").value || null,
      inteiro,
      clientId: parseInt(document.getElementById("clientId").value) || null,
      userId: LOGGED_IN_USER_ID,
      totalValue: totalSaleValue,
      issueDate: new Date().toISOString(),
      type: addedItems.some(
        (item) =>
          item.description &&
          item.description.toLowerCase().includes("servico"),
      )
        ? "Servico"
        : "Produto",
      installments: addedParcels.length,
    };

    const payload = {
      budgetId: saleData.budgetId,
      clientId: saleData.clientId,
      userId: saleData.userId,
      totalValue: saleData.totalValue,
      issueDate: saleData.issueDate,
      type: saleData.type,
      installments: saleData.installments,

      items: addedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        finalPrice: item.finalPrice,
      })),

      payment_parcels: addedParcels,
    };

    console.log("Payload para o Backend:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}/api/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        try {
          if (
            response.status !== 204 &&
            response.headers.get("content-type") &&
            response.headers.get("content-type").indexOf("application/json") !==
              -1
          ) {
            await response.json();
          }
        } catch (e) {
          console.warn(
            "Resposta OK, mas JSON vazio ou malformado (ignorando).",
          );
        }
        alert("Venda registrada e parcelas criadas com sucesso!");
        window.location.href = "vendas.html";
      } else {
        let error = { message: response.statusText };
        try {
          error = await response.json();
        } catch (e) {
          console.warn("Resposta de erro não é JSON:", response.statusText);
        }
        alert(
          `Erro ao registrar venda: ${error.message || response.statusText}`,
        );
      }
    } catch (error) {
      console.error("Erro na submissão da venda:", error);
      alert("Ocorreu um erro de rede ou servidor.");
    }
  });
