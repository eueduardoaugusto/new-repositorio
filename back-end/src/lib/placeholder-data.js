const users = [
  {
    name: "Administrador",
    email: "admin@petshop.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Proprietário",
    email: "proprietario@petshop.com",
    password: "proprietario123",
    role: "proprietario",
  },
  {
    name: "Carla Funcionária",
    email: "carla.vendas@petshop.com",
    password: "senhaFuncionarioSegura",
    role: "funcionario",
  },
];

const clients = [
  {
    nome: "João Silva",
    cpf: "123.456.789-00",
    cep: "01001-000",
    logadouro: "Praça da Sé",
    endereco: "Sé",
    numero: "100",
    complemento: "Apto 51",
    cidade: "São Paulo",
    estado: "SP",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
  },
  {
    nome: "Maria Oliveira",
    cpf: "987.654.321-11",
    cep: "70002-900",
    logadouro: "Eixo Monumental",
    endereco: "Zona Cívico-Administrativa",
    numero: "S/N",
    complemento: "Palácio X",
    cidade: "Brasília",
    estado: "DF",
    email: "maria.olivera@dominio.com",
    telefone: "(61) 91234-5678",
  },
  {
    nome: "Pedro Souza",
    cpf: "123.726.789-00",
    cep: "60165-090",
    logadouro: "Av. Beira Mar",
    endereco: "Meireles",
    numero: "3200",
    complemento: "Bloco B, Sala 101",
    cidade: "Fortaleza",
    estado: "CE",
    email: "p.souza@provedor.com",
    telefone: "(85) 99887-7665",
  },
];

const pets = [
  {
    client_id: 1,
    pet_name: "Thor",
    pet_specie: "Cachorro",
    pet_race: "Labrador",
    pet_age: 3,
    observation: "Muito amigável e agitado.",
  },
  {
    client_id: 2,
    pet_name: "Mimi",
    pet_specie: "Gato",
    pet_race: "Siamês",
    pet_age: 2,
    observation: "Gosta de ficar no colo.",
  },
  {
    client_id: 3,
    pet_name: "Bob",
    pet_specie: "Cachorro",
    pet_race: "Vira-lata",
    pet_age: 5,
    observation: "Calmo e obediente.",
  },
];

const products = [
  {
    codigo: "RPD-001KG",
    nome: "Ração Premium para Cães Adultos",
    tamanho: "10KG",
    setor: "Caes",
    grupo: "Racao",
    id_fornecedor: 4,
    quantidade: 50,
    preco: 129.9,
  },
  {
    codigo: "SHP-ANTIPUL",
    nome: "Shampoo Antisséptico para Cães e Gatos",
    tamanho: "500ml",
    setor: "Higiene",
    grupo: "Higiene",
    id_fornecedor: 5,
    quantidade: 120,
    preco: 45.5,
  },
  {
    codigo: "MORD-CORD-G",
    nome: "Brinquedo Corda Mordedor G",
    tamanho: "Grande",
    setor: "Acessorios",
    grupo: "Brinquedo",
    id_fornecedor: 6,
    quantidade: 85,
    preco: 35.0,
  },
];

const suppliers = [
  {
    name: "Pet Food Master S.A.",
    cnpj: "01.234.567/0001-89",
    phone: "(11) 5555-1234",
    email: "contato@petfoodmaster.com.br",
    address: "Av. Rações, 1000, São Paulo/SP",
  },
  {
    name: "VetCare Pharma Ltda.",
    cnpj: "98.765.432/0001-10",
    phone: "(21) 4444-5678",
    email: "vendas@vetcarepharma.com",
    address: "Rua da Saúde, 50, Rio de Janeiro/RJ",
  },
  {
    name: "Acessórios Pata Feliz",
    cnpj: "12.345.678/0001-99",
    phone: "(31) 3333-9012",
    email: "acessorios@patafeliz.com.br",
    address: "Al. Brinquedos, 300, Belo Horizonte/MG",
  },
];

export { users, clients, products, pets, suppliers };
