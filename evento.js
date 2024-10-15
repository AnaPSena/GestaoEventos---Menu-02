// Selecionar os elementos do formulário
const tipoEvento = document.getElementById('tipoEvento');
const cursoResponsavel = document.getElementById('cursoResponsavel');
const setorResponsavel = document.getElementById('setorResponsavel');
const outroCursoTitulo = document.getElementById('outroCursoTitulo');
const outroCursoOpcoes = document.getElementById('outroCursoOpcoes');
const outroCursoSim = document.getElementById('outroCursoSim');
const outroCursoNao = document.getElementById('outroCursoNao');
const campoOutroCurso = document.getElementById('campoOutroCurso');

// Mostrar campos com base no tipo de evento selecionado
tipoEvento.addEventListener('change', function() {
    if (tipoEvento.value === 'graduacao') {
        cursoResponsavel.style.display = 'block';    // Mostrar seleção de curso
        setorResponsavel.style.display = 'none';     // Ocultar seleção de setor
        outroCursoTitulo.style.display = 'block';    // Mostrar "Outro curso/unidade participante"
        outroCursoOpcoes.style.display = 'block';    // Mostrar opções Sim/Não
    } else if (tipoEvento.value === 'institucional') {
        setorResponsavel.style.display = 'block';    // Mostrar seleção de setor
        cursoResponsavel.style.display = 'none';     // Ocultar seleção de curso
        outroCursoTitulo.style.display = 'none';     // Ocultar "Outro curso/unidade participante"
        outroCursoOpcoes.style.display = 'none';     // Ocultar opções Sim/Não
        campoOutroCurso.style.display = 'none';      // Ocultar campo de texto de "Outro curso"
    }
});

// Mostrar/ocultar campo de texto com base na seleção de Sim/Não
outroCursoSim.addEventListener('change', function() {
    if (outroCursoSim.checked) {
        campoOutroCurso.style.display = 'block'; // Mostrar o campo de texto
    }
});

outroCursoNao.addEventListener('change', function() {
    if (outroCursoNao.checked) {
        campoOutroCurso.style.display = 'none'; // Ocultar o campo de texto
    }
});

// Selecionar o botão de adicionar palestra
const addPalestraButton = document.getElementById('addPalestra');
const palestrasContainer = document.getElementById('palestrasContainer');

// Função para adicionar uma nova palestra
addPalestraButton.addEventListener('click', function() {
    const novaPalestra = document.createElement('div');
    novaPalestra.classList.add('palestra');
    novaPalestra.innerHTML = `
        <p>Nome da Palestra: <input type="text" name="palestra[]" class="palestra-nome"></p>
        <div class="date-container">
            <p>Data de Início: <input type="date" name="dataInicio[]" class="data-inicio"></p>
            <p>Data de Fim: <input type="date" name="dataFim[]" class="data-fim"></p>
            <p>Horário de Início: <input type="time" name="horarioInicio[]" class="horario-inicio"></p>
            <p>Horário de Fim: <input type="time" name="horarioFim[]" class="horario-fim"></p>
        </div>
        <button type="button" class="remove-palestra">Excluir Campo</button>
    `;
    palestrasContainer.appendChild(novaPalestra);
});

// Delegação de eventos para remover palestras
palestrasContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-palestra')) {
        const palestra = e.target.parentElement;
        palestrasContainer.removeChild(palestra);
    }
});
