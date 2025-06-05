"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { TipoAcomodacao, tiposAcomodacaoMock } from "@/lib/mocks/acomodacao";

export function TiposAcomodacaoTable() {
  const [tipos, setTipos] = React.useState<TipoAcomodacao[]>(tiposAcomodacaoMock);
  const [selectedTipo, setSelectedTipo] = React.useState<TipoAcomodacao | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<"view" | "edit" | "add">("view");
  const [newTipoName, setNewTipoName] = React.useState("");

  const openDialog = (tipo: TipoAcomodacao | null, mode: "view" | "edit" | "add") => {
    setSelectedTipo(tipo);
    setDialogMode(mode);
    setNewTipoName(tipo || "");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedTipo(null);
    setNewTipoName("");
  };

  const handleSave = () => {
    if (dialogMode === "add" && newTipoName.trim()) {
      if (!tipos.includes(newTipoName as TipoAcomodacao)) {
        setTipos((prev) => [...prev, newTipoName as TipoAcomodacao]);
      } else {
        alert("Tipo já existe!");
      }
    } else if (dialogMode === "edit" && selectedTipo && newTipoName.trim()) {
      setTipos((prev) =>
        prev.map((tipo) => (tipo === selectedTipo ? (newTipoName as TipoAcomodacao) : tipo))
      );
    }
    closeDialog();
  };

  const handleDelete = (tipo: TipoAcomodacao) => {
    if (confirm(`Deseja excluir o tipo '${tipo}'?`)) {
      setTipos((prev) => prev.filter((t) => t !== tipo));
      if (selectedTipo === tipo) closeDialog();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tipos de Acomodação</h2>
        <Button onClick={() => openDialog(null, "add")}>Adicionar Tipo</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Tipo</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tipos.map((tipo) => (
            <TableRow key={tipo}>
              <TableCell>{tipo}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openDialog(tipo, "view")}
                >
                  Visualizar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openDialog(tipo, "edit")}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(tipo)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "view" && "Visualizar Tipo de Acomodação"}
              {dialogMode === "edit" && "Editar Tipo de Acomodação"}
              {dialogMode === "add" && "Adicionar Tipo de Acomodação"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            {(dialogMode === "edit" || dialogMode === "add") && (
              <input
                type="text"
                value={newTipoName}
                onChange={(e) => setNewTipoName(e.target.value)}
                className="w-full border rounded px-2 py-1"
                placeholder="Nome do tipo de acomodação"
              />
            )}
            {dialogMode === "view" && selectedTipo && (
              <p className="p-2">{selectedTipo}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Fechar
            </Button>
            {(dialogMode === "edit" || dialogMode === "add") && (
              <Button onClick={handleSave}>Salvar</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
