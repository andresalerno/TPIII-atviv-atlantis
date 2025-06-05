"use client";

import * as React from "react";
import { Empresa } from "../lib/mocks/empresa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { tiposAcomodacaoMock } from "@/lib/mocks/acomodacao";


type EmpresasTableProps = {
  empresas: Empresa[];
  onEditClick: (empresa: Empresa) => void;
  onViewClick: (empresa: Empresa) => void;
  onDeleteClick: (id: number) => void;
  onAddClick: () => void;
  onAssociateClick: (empresa: Empresa) => void;
};

export function EmpresasTable({
  empresas,
  onEditClick,
  onViewClick,
  onDeleteClick,
  onAddClick,
  onAssociateClick,
}: EmpresasTableProps) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Empresas</h2>
        <Button onClick={onAddClick}>Adicionar Empresa</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {empresas.map((empresa) => (
            <TableRow key={empresa.id}>
              <TableCell>{empresa.nome}</TableCell>
              <TableCell>{empresa.tipo}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewClick(empresa)}
                >
                  Visualizar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEditClick(empresa)}
                >
                  Editar
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAssociateClick(empresa)}
                    >
                    Associar Acomodação
                    </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDeleteClick(empresa.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
