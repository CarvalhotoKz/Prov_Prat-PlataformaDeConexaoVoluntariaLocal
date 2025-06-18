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

  // Valida os Campos
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formCadastro');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const campos = [
            'nomeInstituicao', 'categoria', 'tituloDaAjuda', 'descricaoDetalhada',
            'cep', 'cidade', 'rua', 'bairro', 'estado', 'contato'
        ];

        for (let id of campos) {
            const el = document.getElementById(id);
            if (!el.value.trim()) {
                alert(`Por favor, preencha o campo: ${el.previousElementSibling.innerText}`);
                el.focus();
                return;
            }
        }

        const cep = document.getElementById('cep').value.trim();
        const telefone = document.getElementById('contato').value.trim();
        const cepValido = /^\d{8}$/.test(cep);
        const telefoneValido = /^\(\d{2}\)\d{5}-\d{4}$/.test(telefone);

        if (!cepValido) {
            alert('CEP inválido. Digite exatamente 8 números.');
            document.getElementById('cep').focus();
            return;
        }

        if (!telefoneValido) {
            alert('Formato de telefone inválido. Use o formato (DDD)00000-0000.');
            document.getElementById('contato').focus();
            return;
        }

        alert('Cadastro realizado com sucesso!');
        form.submit(); 
    });
});
