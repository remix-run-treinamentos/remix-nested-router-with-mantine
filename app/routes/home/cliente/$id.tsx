import type { Cliente } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/db.server";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

interface LoaderData {
  cliente: Pick<Cliente, "id" | "nome" | "dataNascimento">;
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "id is required");

  const cliente = await prisma.cliente.findUnique({
    where: { id: Number(params.id) },
  });

  if (!cliente) {
    throw new Response(`Cliente id: ${params.id} Not Found`, {
      status: 404,
    });
  }

  return json<LoaderData>({ cliente });
};

export default function viewClientPage() {
  const { cliente } = useLoaderData<LoaderData>() as LoaderData;
  return <div>{cliente.nome}</div>;
}
