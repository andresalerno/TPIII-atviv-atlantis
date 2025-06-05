const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false);
const [selectedAccommodationType, setSelectedAccommodationType] = useState<TipoAcomodacao | "">("");
const [selectedAccommodationQuantity, setSelectedAccommodationQuantity] = useState<number>(1);

function openAssociateModal(empresa: Empresa) {
  setEmpresaParaAssociar(empresa);
  setSelectedAccommodationType("");
  setSelectedAccommodationQuantity(1);
  setIsAssociateModalOpen(true);
}

function handleAssociateSave() {
  if (!empresaParaAssociar || !selectedAccommodationType || selectedAccommodationQuantity < 1) {
    alert("Selecione o tipo de acomodação e quantidade válidos");
    return;
  }
  // Atualiza a empresa adicionando a acomodação
  const empresaAtualizada = {
    ...empresaParaAssociar,
    acomodacoes: [
      ...(empresaParaAssociar.acomodacoes || []),
      { tipo: selectedAccommodationType, quantidade: selectedAccommodationQuantity }
    ],
  };
  setEmpresas((prev) =>
    prev.map((e) => (e.id === empresaAtualizada.id ? empresaAtualizada : e))
  );
  setIsAssociateModalOpen(false);
}
