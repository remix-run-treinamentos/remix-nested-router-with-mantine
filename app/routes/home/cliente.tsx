import { Grid, List, ScrollArea } from "@mantine/core";
import { Cliente } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/db.server";

interface LoaderData {
  clientes: Pick<Cliente, "id" | "nome" | "dataNascimento">[];
}

export const loader: LoaderFunction = async () => {
  const clientes = await prisma.cliente.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return json<LoaderData>({ clientes });
};

export default function clientePage() {
  const { clientes } = useLoaderData<LoaderData>() as LoaderData;
  return (
    <>
      <Grid justify="space-between">
        <Grid.Col span={3} style={{ minHeight: 120 }}>
          <ScrollArea style={{ height: 250 }} type="always" offsetScrollbars>
            <List>
              {clientes.map((cliente) => (
                <List.Item key={cliente.id}>
                  <Link to={`${cliente.id}`}>
                    {cliente.nome} - {cliente.dataNascimento}
                  </Link>
                </List.Item>
              ))}
            </List>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col span={3} style={{ minHeight: 80 }}>
          <Outlet />
        </Grid.Col>
      </Grid>
    </>
  );
}
