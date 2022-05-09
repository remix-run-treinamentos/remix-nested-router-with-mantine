import {
  Cliente,
  PrismaClient,
  Produto,
  Venda,
  VendaItem,
} from "@prisma/client";
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const totalClientes = 100;
const totalProdutos = 100;
const totalVendas = 100;
const totalItens = totalVendas * 10;

async function seed() {
  await addClientes();
  await addProdutos();
  await addVendas();
  await addVendasItens();
  console.log(`Database has been seeded. 🌱`);
}

async function addClientes() {
  console.log(`Seeding Clientes...🌱`);
  const fakerCliente = (): Pick<Cliente, "nome" | "dataNascimento"> => ({
    nome: faker.name.firstName() + " " + faker.name.lastName(),
    dataNascimento: faker.date.between(
      new Date("1990-01-01"),
      new Date("2000-01-01")
    ),
  });

  for (let i = 0; i < totalClientes; i++) {
    await prisma.cliente.create({ data: fakerCliente() });
  }
}

async function addProdutos() {
  console.log(`Seeding Produtos...🌱`);
  const fakerProduto = (): Pick<Produto, "nome" | "preco" | "estoque"> => ({
    nome: faker.commerce.productName(),
    preco: parseFloat(faker.finance.amount(1, 200, 2)),
    estoque: faker.datatype.number({ min: 0, max: 100 }),
  });

  for (let i = 0; i < totalProdutos; i++) {
    await prisma.produto.create({ data: fakerProduto() });
  }
}

async function addVendas() {
  console.log(`Seeding Vendas...🌱`);
  const fakerVendas = (): Pick<
    Venda,
    "dataDaVenda" | "valorTotal" | "valorDesconto" | "valorFinal" | "clienteId"
  > => ({
    dataDaVenda: faker.date.between(
      new Date("2019-01-01"),
      new Date("2022-01-01")
    ),
    valorTotal: parseFloat(faker.finance.amount(100, 200, 2)),
    valorDesconto: parseFloat(faker.finance.amount(0, 10, 2)),
    valorFinal: parseFloat(faker.finance.amount(100, 200, 2)),
    clienteId: faker.datatype.number({ min: 1, max: totalClientes }),
  });
  for (let i = 0; i < totalVendas; i++) {
    await prisma.venda.create({ data: fakerVendas() });
  }
}

async function addVendasItens() {
  console.log(`Seeding Vendas Itens...🌱`);
  const fakerVendasItens = (): Pick<
    VendaItem,
    | "quantidade"
    | "produtoId"
    | "vendaId"
    | "valorUnitario"
    | "valorTotal"
    | "desconto"
  > => ({
    quantidade: faker.datatype.number({ min: 1, max: 10 }),
    produtoId: faker.datatype.number({ min: 1, max: totalProdutos }),
    vendaId: faker.datatype.number({ min: 1, max: totalVendas }),
    valorUnitario: parseFloat(faker.finance.amount(1, 200, 2)),
    desconto: parseFloat(faker.finance.amount(0, 50, 2)),
    valorTotal: parseFloat(faker.finance.amount(1, 200, 2)),
  });
  for (let i = 0; i < totalItens; i++) {
    await prisma.vendaItem.create({ data: fakerVendasItens() });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
