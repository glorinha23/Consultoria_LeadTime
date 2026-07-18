const btnCTA = document.getElementById('btnCTA');
btnCTA.addEventListener('click', () => {
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
});

const inputCep = document.getElementById('cep');
const inputEndereco = document.getElementById('endereco');
const cepErro = document.getElementById('cepErro');

inputCep.addEventListener('blur', () => {
    const cep = inputCep.value.replace(/\D/g, '');
    cepErro.textContent = '';
    
    if (cep.length === 8) {
        inputEndereco.value = "Buscando endereço...";
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    cepErro.textContent = "CEP não encontrado.";
                    inputEndereco.value = "";
                } else {
                    inputEndereco.value = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
                }
            })
            .catch(error => {
                cepErro.textContent = "Erro ao conectar com o serviço de CEP.";
                inputEndereco.value = "";
                console.error("Erro na API ViaCep:", error);
            });
    } else if (cep.length > 0) {
        cepErro.textContent = "O CEP deve conter 8 dígitos.";
        inputEndereco.value = "";
    }
});

const formContato = document.getElementById('formContato');
const mensagemSucesso = document.getElementById('mensagemSucesso');

formContato.addEventListener('submit', (event) => {
    event.preventDefault();
    const nomeUsuario = document.getElementById('nome').value;
    formContato.classList.add('hidden');
    
    mensagemSucesso.innerHTML = `Obrigado pelo contato, <strong>${nomeUsuario}</strong>!<br>Sua mensagem foi enviada com sucesso. Retornaremos em breve.`;
    mensagemSucesso.classList.remove('hidden');
});