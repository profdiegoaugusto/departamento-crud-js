const tbody = document.querySelector("tbody");

/**
 * Carrega uma tabela HTML com dados de departamentos armazenados no localStorage.
 * Cada linha da tabela representa um departamento e inclui botões de ação para visualizar, editar e excluir.
 */
function carregarTabela() {

    // Obter a lista de departamentos do localStorage; se não houver dados, usar um array vazio
    let departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];

    for (let i = 0; i < departamentos.length; i++) {
        
        const departamento = departamentos[i];

        // Criar uma nova linha (<tr>) para representar o departamento
        let tr = document.createElement("tr");
        tr.id = `departamento-${departamento.id}`;

        // Obter os valores das propriedades do departamento como um array
        const celulas = Object.values(departamento);

        // Criar células (<td>) para cada valor do departamento e adicionar à linha (<tr>)
        for (let j = 0; j < celulas.length; j++) {
            
            const td = document.createElement("td");
            td.innerText = celulas[j];
            tr.appendChild(td);
    
        }

        // Criar célula de ação (<td>) contendo os botões de visualizar, editar e excluir
        let tdAcao = criarBotoesAcao();
        tr.appendChild(tdAcao);

        // Adicionar a linha (<tr>) à tabela (<tbody>)
        tbody.appendChild(tr);   
    }
}

/**
 * Cria e retorna um elemento de botão (<button>) com o rótulo especificado.
 * @param {string} rotulo O rótulo (texto) a ser exibido no botão.
 * @returns {HTMLButtonElement} O elemento de botão criado.
 */
function criarBotao(rotulo) {

    // Criar um novo elemento de botão
    const botao = document.createElement("button");

    // Definir o tipo do botão como "button" (botão padrão)
    botao.type = "button";

    // Definir o texto interno do botão com o rótulo especificado
    botao.innerText = rotulo;

    return botao; 
}

/**
 * Cria e retorna uma célula (<td>) contendo botões de ação para visualizar, editar e excluir.
 * Os botões estão configurados para redirecionar para páginas específicas ao serem clicados.
 * @returns {HTMLTableCellElement} A célula (<td>) contendo os botões de ação.
 */
function criarBotoesAcao() {

    // Criar uma nova célula (<td>) para conter os botões de ação
    const td = document.createElement("td");

    // Criar os botões de ação: Visualizar, Editar e Excluir
    const visualizarButton = criarBotao("Visualizar");
    const editarButton = criarBotao("Editar");
    const excluirButton = criarBotao("Excluir");

    // Adicionar evento de clique ao botão "Visualizar" para redirecionar para visualizar-departamento.html
    visualizarButton.addEventListener("click", (event) => {

        const linha = event.target.parentElement.parentElement;
        const celulas = linha.childNodes;
        let id = parseInt(celulas[0].innerText);

        sessionStorage.setItem("idDepartamento", id);

        window.location.href = "visualizar-departamento.html";
    });

    // Adicionar evento de clique ao botão "Editar" para redirecionar para editar-departamento.html
    editarButton.addEventListener("click", (event) => {

        const linha = event.target.parentElement.parentElement;
        const celulas = linha.childNodes;
        let id = parseInt(celulas[0].innerText);
        
        sessionStorage.setItem("idDepartamento", id);

        window.location.href = "editar-departamento.html";
    });

    // Adicionar evento de clique ao botão "Excluir"
    excluirButton.addEventListener("click", (event) => {

    });

    // Adicionar os botões criados à célula (<td>)
    td.appendChild(visualizarButton);
    td.appendChild(editarButton);
    td.appendChild(excluirButton);

    return td;
}

window.addEventListener("load", () => {
    carregarTabela();
});
