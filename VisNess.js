function renderizarLista(filtro = '', tipo = '') {
  const lista = JSON.parse(localStorage.getItem('necessidades')) || [];
  const container = document.getElementById('listaNecessidades');
  container.innerHTML = '';

  const filtrado = lista.filter(item =>
    (item.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    item.descricao.toLowerCase().includes(filtro.toLowerCase())) &&
    (tipo === '' || item.tipoAjuda === tipo)
  );

  filtrado.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('necessidade-card');
    card.innerHTML = `
      <h3>${item.titulo}</h3>
      <p><strong>Instituição:</strong> ${item.instituicao}</p>
      <p><strong>Tipo:</strong> ${item.tipoAjuda}</p>
      <p>${item.descricao}</p>
      <p><strong>Contato:</strong> ${item.contato}</p>
      <p><strong>Endereço:</strong> ${item.rua}, ${item.bairro} - ${item.cidade}/${item.estado}</p>
      <button class="btn-excluir" data-index="${index}">Excluir</button>
    `;
    container.appendChild(card);
  });

  // Adiciona evento de clique aos botões de exclusão
  document.querySelectorAll('.btn-excluir').forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      excluirItem(index, filtro, tipo);
    });
  });
}

function excluirItem(index, filtro, tipo) {
  const lista = JSON.parse(localStorage.getItem('necessidades')) || [];
  lista.splice(index, 1);
  localStorage.setItem('necessidades', JSON.stringify(lista));
  renderizarLista(filtro, tipo); // re-renderiza mantendo os filtros atuais
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderizarLista();

  document.getElementById('busca').addEventListener('input', (e) => {
    const filtro = e.target.value;
    const tipo = document.getElementById('filtroTipo').value;
    renderizarLista(filtro, tipo);
  });

  document.getElementById('filtroTipo').addEventListener('change', () => {
    const filtro = document.getElementById('busca').value;
    const tipo = document.getElementById('filtroTipo').value;
    renderizarLista(filtro, tipo);
  });
});
