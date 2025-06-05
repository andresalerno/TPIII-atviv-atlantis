"use client";

import * as React from "react";
import { clientesMock, Cliente } from "../lib/mocks/cliente"; // ajuste o caminho
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { empresasMock, TipoAcomodacao } from "@/lib/mocks/empresa";
import { tiposAcomodacaoMock } from "@/lib/mocks/acomodacao";

type ClientesTableProps = {
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
};

export function ClientesTable({ clientes, setClientes }: ClientesTableProps) {
  const [selectedCliente, setSelectedCliente] = React.useState<Cliente | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dialogMode, setDialogMode] = React.useState<"view" | "edit" | "add">("view");
  
  // Modal de reserva
  const [isReservaModalOpen, setIsReservaModalOpen] = React.useState(false);
  const [clienteSelecionadoId, setClienteSelecionadoId] = React.useState<number | "">("");
  const [empresaSelecionadaId, setEmpresaSelecionadaId] = React.useState<number | "">("");
  const [tipoAcomodacaoSelecionado, setTipoAcomodacaoSelecionado] = React.useState<TipoAcomodacao | "">("");
  const [quantidadeReserva, setQuantidadeReserva] = React.useState<number>(1);

  // Abrir diálogo e setar cliente e modo
  const openDialog = (cliente: Cliente | null, mode: "view" | "edit" | "add") => {
    if (mode === "add") {
      // Para adicionar cliente, cria objeto vazio inicial para edição
      setSelectedCliente({
        id: Date.now(),
        nome: "",
        nomeSocial: "",
        dataNascimento: new Date(),
        dataCadastro: new Date(),
        telefones: [],
        enderecos: [],
        documentos: [],
        dependentes: [],
        titular: null,
      });
    } else {
      setSelectedCliente(cliente);
    }
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  // Fechar diálogo
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedCliente(null);
  };

  // Excluir cliente (mock)
  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esse cliente?")) {
      setClientes((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Função para abrir o modal de reserva
  const openReservaModal = (clienteId: number) => {
    setClienteSelecionadoId(clienteId);
    setIsReservaModalOpen(true);
  };

  // Fechar o modal de reserva
  const closeReservaModal = () => {
    setIsReservaModalOpen(false);
  };

  // Função para tentar realizar a reserva
  const tentarReservar = (clienteId: number, empresaId: number, tipoAcomodacao: TipoAcomodacao, quantidadeDesejada: number) => {
    const empresa = empresasMock.find((e) => e.id === empresaId);
    if (!empresa) {
      alert("Empresa não encontrada");
      return false;
    }

  const acomodacao = empresa.acomodacoes?.find((a) => a.tipo === tipoAcomodacao);
    if (!acomodacao) {
      alert("Tipo de acomodação não disponível nessa empresa");
      return false;
    }
  
    if (acomodacao.quantidade < quantidadeDesejada) {
      alert(`Quantidade insuficiente. Disponível: ${acomodacao.quantidade}`);
      return false;
    }

    // Atualiza a quantidade disponível da acomodação na empresa
    const empresaAtualizada = {
      ...empresa,
      acomodacoes: empresa.acomodacoes
        ? empresa.acomodacoes.map((a) =>
            a.tipo === tipoAcomodacao
              ? { ...a, quantidade: a.quantidade - quantidadeDesejada }
              : a
          )
        : [],
    };

  // Atualizar empresas com a quantidade reduzida
    const updatedEmpresas = empresasMock.map((e) => (e.id === empresaAtualizada.id ? empresaAtualizada : e));

    // Registra a reserva
    alert("Reserva efetuada com sucesso!");
    return true;
  };

  const handleConfirmReserva = () => {
    if (
      clienteSelecionadoId === "" ||
      empresaSelecionadaId === "" ||
      tipoAcomodacaoSelecionado === "" ||
      quantidadeReserva < 1
    ) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const sucesso = tentarReservar(
      clienteSelecionadoId as number,
      empresaSelecionadaId as number,
      tipoAcomodacaoSelecionado as TipoAcomodacao,
      quantidadeReserva
    );
    if (sucesso) {
      closeReservaModal();
    }
  };

  const handleSave = () => {
    if (!selectedCliente) return;

    if (dialogMode === "edit") {
      setClientes((prev) =>
        prev.map((c) => (c.id === selectedCliente.id ? selectedCliente : c))
      );
    } else if (dialogMode === "add") {
      setClientes((prev) => [...prev, selectedCliente]);
    }
    closeDialog();
  };

  // Render dos dados completos (view)
  const renderClienteDetails = (cliente: Cliente | null) => {
    if (!cliente) return null;
    return (
      <div>
        <p><b>Nome:</b> {cliente.nome}</p>
        <p><b>Nome Social:</b> {cliente.nomeSocial}</p>
        <p><b>Data de Nascimento:</b> {cliente.dataNascimento.toLocaleDateString()}</p>
        <p><b>Data de Cadastro:</b> {cliente.dataCadastro.toLocaleDateString()}</p>
        <p><b>Telefones:</b></p>
        <ul>
          {cliente.telefones.map((t) => (
            <li key={t.id}>{t.ddd} {t.numero}</li>
          ))}
        </ul>
        <p><b>Endereços:</b></p>
        <ul>
          {cliente.enderecos.map((e) => (
            <li key={e.id}>{e.rua}, {e.bairro}, {e.cidade} - {e.estado} - {e.pais} ({e.codigoPostal})</li>
          ))}
        </ul>
        <p><b>Documentos:</b></p>
        <ul>
          {cliente.documentos.map((d) => (
            <li key={d.id}>{d.tipo}: {d.numero} (Expedido: {d.dataExpedicao.toLocaleDateString()})</li>
          ))}
        </ul>
        <p><b>Dependentes:</b> {cliente.dependentes.length}</p>
        <p><b>Titular:</b> {cliente.titular ? cliente.titular.nome : "Nenhum"}</p>
      </div>
    );
  };

  // Formulário de Edição
  const renderClienteForm = () => {
    if (!selectedCliente) return null;
    return (
      <form>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={selectedCliente.nome}
            onChange={(e) =>
              setSelectedCliente({ ...selectedCliente, nome: e.target.value })
            }
          />
        </div>
        <div>
          <label>Nome Social:</label>
          <input
            type="text"
            value={selectedCliente.nomeSocial}
            onChange={(e) =>
              setSelectedCliente({ ...selectedCliente, nomeSocial: e.target.value })
            }
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={selectedCliente.dataNascimento.toLocaleDateString("en-CA")}
            onChange={(e) =>
              setSelectedCliente({ ...selectedCliente, dataNascimento: new Date(e.target.value) })
            }
          />
        </div>
        {/* Adicione outros campos conforme necessário */}
      </form>
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Clientes</h2>
        <Button onClick={() => openDialog(null, "add")}>Adicionar Cliente</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Nome Social</TableHead>
            <TableHead>Data Nascimento</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.nome}</TableCell>
              <TableCell>{cliente.nomeSocial}</TableCell>
              <TableCell>{cliente.dataNascimento.toLocaleDateString()}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button size="sm" variant="outline" onClick={() => openDialog(cliente, "view")}>
                  Visualizar
                </Button>
                <Button size="sm" variant="outline" onClick={() => openDialog(cliente, "edit")}>
                  Editar
                </Button>
                <Button size="sm" variant="outline" onClick={() => openReservaModal(cliente.id)}>Reservar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(cliente.id)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de cliente */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "view" && "Visualizar Cliente"}
              {dialogMode === "edit" && "Editar Cliente"}
              {dialogMode === "add" && "Adicionar Cliente"}
            </DialogTitle>
          </DialogHeader>
          <div>
            {dialogMode === "view" && renderClienteDetails(selectedCliente)}
            {dialogMode !== "view" && renderClienteForm()}
          </div>
          <DialogFooter>
            <Button onClick={closeDialog}>Fechar</Button>
            {(dialogMode === "edit" || dialogMode === "add") && (
              <Button onClick={handleSave}>Salvar</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de reserva */}
      <Dialog open={isReservaModalOpen} onOpenChange={setIsReservaModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reservar Acomodação</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <label>Cliente:</label>
              <select
                className="w-full border rounded p-2"
                value={clienteSelecionadoId}
                onChange={(e) => setClienteSelecionadoId(Number(e.target.value))}
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Empresa:</label>
              <select
                className="w-full border rounded p-2"
                value={empresaSelecionadaId}
                onChange={(e) => setEmpresaSelecionadaId(Number(e.target.value))}
              >
                <option value="">Selecione uma empresa</option>
                {empresasMock.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Tipo de Acomodação:</label>
              <select
                className="w-full border rounded p-2"
                value={tipoAcomodacaoSelecionado}
                onChange={(e) => setTipoAcomodacaoSelecionado(e.target.value as TipoAcomodacao)}
              >
                <option value="">Selecione um tipo</option>
                {tiposAcomodacaoMock.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Quantidade:</label>
              <input
                type="number"
                min={1}
                className="w-full border rounded p-2"
                value={quantidadeReserva}
                onChange={(e) => setQuantidadeReserva(Number(e.target.value))}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={closeReservaModal}>Cancelar</Button>
              <Button onClick={handleConfirmReserva}>Confirmar Reserva</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
