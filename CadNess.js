// Salva Listagens
document.getElementById('formCadastro').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const necessidade = {
      instituicao: document.getElementById('nomeInstituicao').value,
      tipoAjuda: document.getElementById('categoria').value,
      titulo: document.getElementById('tituloDaAjuda').value,
      descricao: document.getElementById('descricaoDetalhada').value,
      cep: document.getElementById('cep').value,
      rua: document.getElementById('rua').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value,
      contato: document.getElementById('contato').value
    };
  
    const lista = JSON.parse(localStorage.getItem('necessidades')) || [];
    lista.push(necessidade);
    localStorage.setItem('necessidades', JSON.stringify(lista));
  
    alert('Necessidade cadastrada com sucesso!');
    document.getElementById('formCadastro').reset();
  });