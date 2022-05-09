import { Aside, Grid, Text, List, MediaQuery, ScrollArea } from "@mantine/core";
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
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          <ScrollArea>
            <div style={{ width: 600 }}>
              <List>
                {clientes.map((cliente) => (
                  <List.Item key={cliente.id}>
                    <Link to={`${cliente.id}`}>
                      {cliente.nome} - {cliente.dataNascimento}
                    </Link>
                  </List.Item>
                ))}
              </List>
            </div>
          </ScrollArea>
        </Aside>
      </MediaQuery>

      <Outlet />
    </>
  );
}
