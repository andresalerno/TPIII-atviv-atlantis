"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger, Separator } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";

import { ClientesTable } from "@/components/app-table-cliente";
import { EmpresasTable } from "@/components/app-table-empresa";
import { Empresa, empresasMock, Reserva, TipoAcomodacao } from "@/lib/mocks/empresa";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TiposAcomodacaoTable } from "@/components/app-table-acomodacao";
import { tiposAcomodacaoMock } from "@/lib/mocks/acomodacao";
import { Cliente, clientesMock } from "@/lib/mocks/cliente";


export default function Page() {
  const [activeTab, setActiveTab] = useState<
    "clientes" | "empresas" | "listar-acomodacao" | "reservar"
  >("clientes");

  // Estado agora no pai!
  const [empresas, setEmpresas] = useState<Empresa[]>(empresasMock);
  const [clientes, setClientes] = useState<Cliente[]>(clientesMock);
  const [reservas, setReservas] = useState<Reserva[]>([]); // Lista de reservas feitas
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "edit" | "add">("view");
  const [empresaParaAssociar, setEmpresaParaAssociar] = useState<Empresa | null>(null);

  // Estados para modal de reserva
  const [isReservaModalOpen, setIsReservaModalOpen] = useState(false);
  const [clienteSelecionadoId, setClienteSelecionadoId] = useState<number | "">("");
  const [empresaSelecionadaId, setEmpresaSelecionadaId] = useState<number | "">("");
  const [tipoAcomodacaoSelecionado, setTipoAcomodacaoSelecionado] = useState<TipoAcomodacao | "">("");
  const [quantidadeReserva, setQuantidadeReserva] = useState<number>(1);

  // Função tentar reservar acomodação
  function tentarReservar(
    clienteId: number,
    empresaId: number,
    tipoAcomodacao: TipoAcomodacao,
    quantidadeDesejada: number
  ) {
    const empresa = empresas.find(e => e.id === empresaId);
    if (!empresa) {
      alert("Empresa não encontrada");
      return false;
    }

    const acomodacao = empresa.acomodacoes?.find(a => a.tipo === tipoAcomodacao);
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
      acomodacoes: (empresa.acomodacoes ?? []).map(a =>
        a.tipo === tipoAcomodacao
          ? { ...a, quantidade: a.quantidade - quantidadeDesejada }
          : a
      ),
    };

    setEmpresas(prev => prev.map(e => (e.id === empresaAtualizada.id ? empresaAtualizada : e)));

    // Registra a reserva
    setReservas(prev => [...prev, { clienteId, empresaId, tipoAcomodacao, quantidade: quantidadeDesejada }]);

    alert("Reserva efetuada com sucesso!");
    return true;
  }

  const openReservaModal = () => {
    setClienteSelecionadoId("");
    setEmpresaSelecionadaId("");
    setTipoAcomodacaoSelecionado("");
    setQuantidadeReserva(1);
    setIsReservaModalOpen(true);
  };

  const closeReservaModal = () => {
    setIsReservaModalOpen(false);
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

  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false);
  const [selectedAccommodationType, setSelectedAccommodationType] = useState<
    TipoAcomodacao | ""
  >("");
  const [selectedAccommodationQuantity, setSelectedAccommodationQuantity] =
    useState<number>(1);

  const openModal = (empresa: Empresa | null, mode: "view" | "edit" | "add") => {
    if (empresa) {
      setSelectedEmpresa({ ...empresa }); // clona para evitar mutação direta
    } else {
      setSelectedEmpresa({ id: Date.now(), nome: "", tipo: "hotel" }); // novo objeto para adição
    }
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setIsDialogOpen(false);
    setSelectedEmpresa(null);
  };

  // Função que atualiza a lista com a empresa editada ou adicionada
  const handleSave = () => {
    if (!selectedEmpresa) return;

    if (dialogMode === "edit") {
      setEmpresas((prev) =>
        prev.map((e) => (e.id === selectedEmpresa.id ? selectedEmpresa : e))
      );
    } else if (dialogMode === "add") {
      setEmpresas((prev) => [...prev, selectedEmpresa]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir essa empresa?")) {
      setEmpresas((prev) => prev.filter((e) => e.id !== id));
      // Fechar modal caso esteja editando a empresa excluída
      if (selectedEmpresa?.id === id) closeModal();
    }
  };

  // Abrir modal para associar acomodação
  const openAssociateModal = (empresa: Empresa) => {
    setEmpresaParaAssociar(empresa);
    setSelectedAccommodationType("");
    setSelectedAccommodationQuantity(1);
    setIsAssociateModalOpen(true);
  };

  const closeAssociateModal = () => {
    setIsAssociateModalOpen(false);
    setEmpresaParaAssociar(null);
  };

  // Salvar associação de acomodação na empresa
  const handleAssociateSave = () => {
    if (
      !empresaParaAssociar ||
      !selectedAccommodationType ||
      selectedAccommodationQuantity < 1
    ) {
      alert("Por favor, selecione o tipo de acomodação e a quantidade.");
      return;
    }

  const empresaAtualizada = {
      ...empresaParaAssociar,
      acomodacoes: [
        ...(empresaParaAssociar.acomodacoes || []),
        {
          tipo: selectedAccommodationType,
          quantidade: selectedAccommodationQuantity,
        },
      ],
    };

    setEmpresas((prev) =>
      prev.map((e) => (e.id === empresaAtualizada.id ? empresaAtualizada : e))
    );

    closeAssociateModal();
  };

  const handleChangeTab = (tab: string) => {
  if (
    tab === "clientes" || 
    tab === "empresas" || 
    tab === "listar-acomodacao" ||
    tab === "reservar"
  ) {
    setActiveTab(tab);
  }
};


  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} onChangeTab={handleChangeTab} />
      
      <SidebarInset className="p-4">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b mb-4">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  {/* <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink> */}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {/* <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main>
          {activeTab === "clientes" && <ClientesTable clientes={clientes} setClientes={setClientes} />}
          {activeTab === "empresas" && (
            <EmpresasTable 
              empresas={empresas} 
              onEditClick={(empresa) => openModal(empresa, "edit")} 
              onViewClick={(empresa) => openModal(empresa, "view")} 
              onDeleteClick={handleDelete}
              onAddClick={() => openModal(null, "add")}
              onAssociateClick={openAssociateModal} // Botão para associar acomodação
            />
          )}
          {activeTab === "listar-acomodacao" && <TiposAcomodacaoTable />}
          {activeTab === "reservar" && (
            <div>
              <Button onClick={openReservaModal} className="mb-4">
                Nova Reserva
              </Button>
            </div>
          )}
        </main>

        
        {/* Modal único para todas as ações */}
        {selectedEmpresa && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {dialogMode === "view" && "Visualizar Empresa"}
                  {dialogMode === "edit" && "Editar Empresa"}
                  {dialogMode === "add" && "Adicionar Empresa"}
                </DialogTitle>
              </DialogHeader>

              <div>
                {(dialogMode === "edit" || dialogMode === "add") && (
                  <form>
                    <div>
                      <label>Nome:</label>
                      <input
                        type="text"
                        value={selectedEmpresa.nome}
                        onChange={(e) =>
                          setSelectedEmpresa({ ...selectedEmpresa, nome: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label>Tipo:</label>
                      <select
                        value={selectedEmpresa.tipo}
                        onChange={(e) =>
                          setSelectedEmpresa({ ...selectedEmpresa, tipo: e.target.value as Empresa["tipo"] })
                        }
                      >
                        <option value="hotel">Hotel</option>
                        <option value="pousada">Pousada</option>
                        <option value="resort">Resort</option>
                      </select>
                    </div>
                  </form>
                )}

                {dialogMode === "view" && (
                  <div>
                    <p><strong>Nome:</strong> {selectedEmpresa.nome}</p>
                    <p><strong>Tipo:</strong> {selectedEmpresa.tipo}</p>
                    <p><strong>Acomodações:</strong></p>
                    <ul>
                      {selectedEmpresa.acomodacoes && selectedEmpresa.acomodacoes.length > 0 ? (
                        selectedEmpresa.acomodacoes.map((acom, index) => (
                          <li key={index}>
                            {acom.tipo} - {acom.quantidade} unidades
                          </li>
                        ))
                      ) : (
                        <li>Sem acomodações associadas</li>
                      )}
                    </ul>
                  </div>
                )}

              </div>

              <DialogFooter>
                <Button variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
                {(dialogMode === "edit" || dialogMode === "add") && (
                  <Button onClick={handleSave}>Salvar</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      {/* Modal para associar acomodação */}
        {empresaParaAssociar && (
          <Dialog open={isAssociateModalOpen} onOpenChange={setIsAssociateModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Associar Acomodação à Empresa</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <p>
                  <strong>Empresa:</strong> {empresaParaAssociar.nome}
                </p>
                <div>
                  <label>Tipo de Acomodação</label>
                  <select
                    value={selectedAccommodationType}
                    onChange={(e) =>
                      setSelectedAccommodationType(e.target.value as TipoAcomodacao)
                    }
                  >
                    <option value="">Selecione</option>
                    {tiposAcomodacaoMock.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 w-full max-w-xs">
                  <label className="whitespace-nowrap">Quantidade:</label>
                  <input
                    type="number"
                    min={1}
                    value={selectedAccommodationQuantity}
                    onChange={(e) => setSelectedAccommodationQuantity(Number(e.target.value))}
                    className="flex-grow border rounded px-2 py-1"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={closeAssociateModal}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAssociateSave}>Salvar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

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
                  {empresas.map((e) => (
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
                <Button variant="outline" onClick={closeReservaModal}>
                  Cancelar
                </Button>
                <Button onClick={handleConfirmReserva}>Confirmar Reserva</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
