document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastro-cliente");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // PEGANDO OS CAMPOS
    const dados = {
      nome: document.getElementById("nome").value,
      cpf: document.getElementById("cpf").value,
      cep: document.getElementById("cep").value,
      logradouro: document.getElementById("logradouro").value,
      endereco: document.getElementById("endereco").value,
      numero: document.getElementById("numero").value,
      complemento: document.getElementById("complemento").value,
      cidade: document.getElementById("cidade").value,
      estado: document.getElementById("estado").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      pet_nome: document.getElementById("nome_pet").value,
      pet_especie: document.getElementById("especie").value,
      pet_raca: document.getElementById("raca").value,
      pet_idade: document.getElementById("idade").value,
    };

    try {
      const response = await fetch("http://localhost:3005/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        alert("Erro ao cadastrar: " + result.message);
        return;
      }

      alert("Cliente cadastrado com sucesso!");
      form.reset(); // limpar os campos
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com a API.");
    }
  });
});
