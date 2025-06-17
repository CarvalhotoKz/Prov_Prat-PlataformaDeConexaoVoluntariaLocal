'use strict'; // Modo restrito

// verifica se o CEP é válido
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFormulario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;

    if(cepValido(cep.value)){
        const dados  = await fetch(url);
        const addres = await dados.json();

        // hasOwnProperty retorna um valor booleano indicando se o objetivo pussui a propriedade especifica no parenteses
        if(addres.hasOwnProperty('erro')){
            alert("CEP não encontrado"); 
        } else{
            preencherFormulario(addres);
        }
    } else {
         alert ("CEP incorreto, tente novamente");
    }
}

const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('estado').value = endereco.estado;
}

const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('estado').value = '';
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

// Função para criar listagem

function renderizarLista(filtro = '', tipo = '') {
    const lista = JSON.parse(localStorage.getItem('necessidades')) || [];
    const container = document.getElementById('listaNecessidades');
    container.innerHTML = '';
  
    const filtrado = lista.filter(item =>
      (item.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      item.descricao.toLowerCase().includes(filtro.toLowerCase())) &&
      (tipo === '' || item.tipoAjuda === tipo)
    );
  
    filtrado.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${item.titulo}</h3>
        <p><strong>Instituição:</strong> ${item.instituicao}</p>
        <p><strong>Tipo:</strong> ${item.tipoAjuda}</p>
        <p>${item.descricao}</p>
        <p><strong>Contato:</strong> ${item.contato}</p>
        <p><strong>Endereço:</strong> ${item.rua}, ${item.bairro} - ${item.cidade}/${item.estado}</p>
      `;
      container.appendChild(card);
    });
  }
  
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