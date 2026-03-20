
function Venda(id, vendedor, valor, data) {
    this.id = id;
    this.vendedor = vendedor;
    this.valor = valor;
    this.desconto = valor * 0.10;
    this.valorFinal = valor - this.desconto;
    this.data = data;
}

// 
let vendas = [];
let idCounter = 1;


const form = document.getElementById('venda-form');
const inputVendedor = document.getElementById('vendedor');
const inputValor = document.getElementById('valor');
const tableBody = document.getElementById('vendas-table-body');
const btnRemoverUltimo = document.getElementById('btn-remover-ultimo');
const btnLimparTudo = document.getElementById('btn-limpar-tudo');


const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};


const formatDate = (date) => {
    return date.toLocaleString('pt-BR');
};

function renderTable() {
    tableBody.innerHTML = '';

    vendas.forEach(venda => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.vendedor}</td>
            <td>${formatCurrency(venda.valor)}</td>
            <td>${formatCurrency(venda.desconto)}</td>
            <td><strong>${formatCurrency(venda.valorFinal)}</strong></td>
            <td>${formatDate(venda.data)}</td>
            <td>
                <button class="btn-remove-row" onclick="removerVenda(${venda.id})">Remover</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}


function cadastrarVenda(event) {
    event.preventDefault();

    const nome = inputVendedor.value.trim();
    const valorRaw = inputValor.value;

    if (!nome || !valorRaw) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const valor = parseFloat(valorRaw);
    if (isNaN(valor) || valor <= 0) {
        alert('Por favor, insira um valor de venda válido!');
        return;
    }

    
    const novaVenda = new Venda(idCounter++, nome, valor, new Date());
    
    
    vendas.push(novaVenda);

    
    form.reset();
    inputVendedor.focus();

    
    renderTable();
}

 
function removerVenda(id) {
    vendas = vendas.filter(venda => venda.id !== id);
    renderTable();
}

function removerUltimo() {
    if (vendas.length === 0) {
        alert('Nenhuma venda para remover!');
        return;
    }
    vendas.pop();
    renderTable();
}

function limparTudo() {
    if (vendas.length === 0) {
        alert('A lista já está vazia!');
        return;
    }
    
    if (confirm('Tem certeza que deseja remover todas as vendas?')) {
        vendas = [];
        idCounter = 1; 
        renderTable();
    }
}


form.addEventListener('submit', cadastrarVenda);
btnRemoverUltimo.addEventListener('click', removerUltimo);
btnLimparTudo.addEventListener('click', limparTudo);
