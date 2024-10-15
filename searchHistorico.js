// Função de pesquisa no histórico
document.getElementById('historicoSearchInput').addEventListener('input', function() {
    searchHistorico();
});

document.getElementById('historicoDateInput').addEventListener('input', function() {
    searchHistorico();
});

function searchHistorico() {
    const searchValue = document.getElementById('historicoSearchInput').value.toLowerCase();
    const searchDate = document.getElementById('historicoDateInput').value;
    const table = document.getElementById('historicoTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const nomeAlunoCell = row.getElementsByTagName('td')[0];
        const numeroTurmaCell = row.getElementsByTagName('td')[1];
        const nomeLivroCell = row.getElementsByTagName('td')[3];
        const dataEntregaCell = row.getElementsByTagName('td')[5];
        if (nomeAlunoCell && numeroTurmaCell && nomeLivroCell && dataEntregaCell) {
            const alunoText = nomeAlunoCell.textContent.toLowerCase();
            const turmaText = numeroTurmaCell.textContent.toLowerCase();
            const livroText = nomeLivroCell.textContent.toLowerCase();
            const dataText = dataEntregaCell.textContent;
            if ((alunoText.includes(searchValue) || turmaText.includes(searchValue) || livroText.includes(searchValue)) &&
                (searchDate === '' || dataText.includes(searchDate))) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Função para apagar todo o histórico
document.getElementById('clearHistoricoButton').addEventListener('click', function() {
    if (confirm('Você tem certeza que deseja apagar todo o histórico?')) {
        localStorage.removeItem('historico');
        const tableBody = document.getElementById('historicoTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Remove todas as linhas do corpo da tabela
    }
});

window.onload = function() {
    loadFromLocalStorage();
    loadHistoricoFromLocalStorage();
    sortTableByDate();
    highlightOverdue();
};
