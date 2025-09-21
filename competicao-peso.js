// Sistema de Competição de Perda de Peso
// Armazena dados no localStorage do navegador

// Dados da aplicação
let participants = JSON.parse(localStorage.getItem('weightCompetitionParticipants')) || [];
let weightRecords = JSON.parse(localStorage.getItem('weightCompetitionRecords')) || [];
let competitionStartDate = localStorage.getItem('weightCompetitionStartDate') || new Date().toISOString();

// Elementos do DOM
const addParticipantBtn = document.getElementById('addParticipantBtn');
const addWeightBtn = document.getElementById('addWeightBtn');
const viewStatsBtn = document.getElementById('viewStatsBtn');
const toggleViewBtn = document.getElementById('toggleView');
const viewWeightHistoryBtn = document.getElementById('viewWeightHistory');

// Modais
const participantModal = document.getElementById('participantModal');
const weightModal = document.getElementById('weightModal');
const statsModal = document.getElementById('statsModal');
const historyModal = document.getElementById('historyModal');

// Formulários
const participantForm = document.getElementById('participantForm');
const weightForm = document.getElementById('weightForm');

// Elementos de exibição
const leaderboard = document.getElementById('leaderboard');
const participantsList = document.getElementById('participantsList');
const totalParticipantsEl = document.getElementById('totalParticipants');
const competitionDurationEl = document.getElementById('competitionDuration');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateDisplay();
    updateCompetitionInfo();
});

// Configurar event listeners
function setupEventListeners() {
    // Botões principais
    addParticipantBtn.addEventListener('click', openParticipantModal);
    addWeightBtn.addEventListener('click', openWeightModal);
    viewStatsBtn.addEventListener('click', openStatsModal);
    toggleViewBtn.addEventListener('click', toggleParticipantsView);
    viewWeightHistoryBtn.addEventListener('click', openHistoryModal);

    // Modais
    setupModalListeners();
    
    // Formulários
    participantForm.addEventListener('submit', handleParticipantSubmit);
    weightForm.addEventListener('submit', handleWeightSubmit);
    
    // Configurar data padrão
    document.getElementById('weightDate').value = new Date().toISOString().split('T')[0];
}

// Configurar listeners dos modais
function setupModalListeners() {
    // Modal de participante
    document.getElementById('closeParticipantModal').addEventListener('click', closeParticipantModal);
    document.getElementById('cancelParticipant').addEventListener('click', closeParticipantModal);
    
    // Modal de peso
    document.getElementById('closeWeightModal').addEventListener('click', closeWeightModal);
    document.getElementById('cancelWeight').addEventListener('click', closeWeightModal);
    
    // Modal de estatísticas
    document.getElementById('closeStatsModal').addEventListener('click', closeStatsModal);
    
    // Modal de histórico
    document.getElementById('closeHistoryModal').addEventListener('click', closeHistoryModal);
    document.getElementById('exportHistory').addEventListener('click', exportHistoryData);
    document.getElementById('historyParticipantFilter').addEventListener('change', filterHistory);
    
    // Fechar modais clicando fora
    [participantModal, weightModal, statsModal, historyModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Fechar modais com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// ==================== GERENCIAMENTO DE PARTICIPANTES ====================

// Abrir modal de participante
function openParticipantModal() {
    participantModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    participantForm.reset();
}

// Fechar modal de participante
function closeParticipantModal() {
    participantModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Processar cadastro de participante
function handleParticipantSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(participantForm);
    const newParticipant = {
        id: Date.now().toString(),
        name: formData.get('name').trim(),
        initialWeight: parseFloat(formData.get('initialWeight')),
        targetWeight: formData.get('targetWeight') ? parseFloat(formData.get('targetWeight')) : null,
        department: formData.get('department').trim() || 'Não informado',
        joinDate: new Date().toISOString(),
        currentWeight: parseFloat(formData.get('initialWeight'))
    };
    
    participants.push(newParticipant);
    saveData();
    updateDisplay();
    closeParticipantModal();
    
    showNotification('Participante adicionado com sucesso!', 'success');
}

// ==================== GERENCIAMENTO DE PESAGENS ====================

// Abrir modal de peso
function openWeightModal() {
    if (participants.length === 0) {
        showNotification('Adicione participantes antes de registrar pesagens!', 'warning');
        return;
    }
    
    weightModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    weightForm.reset();
    updateWeightParticipantSelect();
    document.getElementById('weightDate').value = new Date().toISOString().split('T')[0];
}

// Fechar modal de peso
function closeWeightModal() {
    weightModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Atualizar select de participantes
function updateWeightParticipantSelect() {
    const select = document.getElementById('weightParticipant');
    select.innerHTML = '<option value="">Selecione um participante</option>';
    
    participants.forEach(participant => {
        const option = document.createElement('option');
        option.value = participant.id;
        option.textContent = `${participant.name} (${participant.currentWeight}kg)`;
        select.appendChild(option);
    });
}

// Processar registro de peso
function handleWeightSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(weightForm);
    const participantId = formData.get('participantId');
    const currentWeight = parseFloat(formData.get('currentWeight'));
    const weightDate = formData.get('weightDate');
    const notes = formData.get('notes').trim();
    
    // Encontrar participante
    const participant = participants.find(p => p.id === participantId);
    if (!participant) {
        showNotification('Participante não encontrado!', 'error');
        return;
    }
    
    // Verificar se já tem 3 pesagens
    const participantRecords = getParticipantWeightRecords(participantId);
    if (participantRecords.length >= 3) {
        showNotification('Este participante já possui 3 pesagens registradas!', 'warning');
        return;
    }
    
    // Criar registro de peso
    const weightRecord = {
        id: Date.now().toString(),
        participantId: participantId,
        weight: currentWeight,
        date: weightDate,
        notes: notes,
        timestamp: new Date().toISOString(),
        weighingNumber: participantRecords.length + 1
    };
    
    weightRecords.push(weightRecord);
    
    // Atualizar peso atual do participante (sempre o mais recente)
    participant.currentWeight = currentWeight;
    
    saveData();
    updateDisplay();
    closeWeightModal();
    
    const weighingNumber = participantRecords.length + 1;
    showNotification(`Peso ${weighingNumber}/3 registrado com sucesso!`, 'success');
}

// ==================== CÁLCULOS E ESTATÍSTICAS ====================

// Obter registros de peso de um participante
function getParticipantWeightRecords(participantId) {
    return weightRecords
        .filter(record => record.participantId === participantId)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Calcular porcentagem de perda de peso baseada na 3ª pesagem
function calculateWeightLossPercentage(participant) {
    const participantRecords = getParticipantWeightRecords(participant.id);
    
    if (participantRecords.length === 0) {
        return 0;
    }
    
    // Usar a última pesagem (3ª pesagem se disponível)
    const lastRecord = participantRecords[participantRecords.length - 1];
    const initialWeight = participant.initialWeight;
    const finalWeight = lastRecord.weight;
    const weightLost = initialWeight - finalWeight;
    const percentage = (weightLost / initialWeight) * 100;
    return Math.max(0, percentage); // Não pode ser negativo
}

// Calcular peso perdido em kg
function calculateWeightLost(participant) {
    return Math.max(0, participant.initialWeight - participant.currentWeight);
}

// Obter ranking dos participantes
function getRanking() {
    return participants
        .map(participant => ({
            ...participant,
            weightLossPercentage: calculateWeightLossPercentage(participant),
            weightLost: calculateWeightLost(participant)
        }))
        .sort((a, b) => b.weightLossPercentage - a.weightLossPercentage);
}

// Calcular estatísticas gerais
function calculateStats() {
    const ranking = getRanking();
    const totalWeightLost = ranking.reduce((sum, p) => sum + p.weightLost, 0);
    const bestPercentage = ranking.length > 0 ? ranking[0].weightLossPercentage : 0;
    const competitionDays = Math.ceil((new Date() - new Date(competitionStartDate)) / (1000 * 60 * 60 * 24));
    
    return {
        totalParticipants: participants.length,
        totalWeightLost: totalWeightLost,
        bestPercentage: bestPercentage,
        competitionDays: competitionDays
    };
}

// ==================== EXIBIÇÃO DE DADOS ====================

// Atualizar toda a exibição
function updateDisplay() {
    updateLeaderboard();
    updateParticipantsList();
    updateCompetitionInfo();
}

// Atualizar leaderboard
function updateLeaderboard() {
    const ranking = getRanking();
    
    if (ranking.length === 0) {
        leaderboard.innerHTML = `
            <div class="no-participants">
                <i class="fas fa-users"></i>
                <h3>Nenhum participante ainda</h3>
                <p>Adicione participantes para começar a competição!</p>
            </div>
        `;
        return;
    }
    
    leaderboard.innerHTML = ranking.map((participant, index) => {
        const rankClass = index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : '';
        const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1);
        
        return `
            <div class="leaderboard-item ${rankClass}">
                <div class="rank ${rankClass}">${rankIcon}</div>
                <div class="participant-info">
                    <div class="participant-name">${participant.name}</div>
                    <div class="participant-details">
                        <span><i class="fas fa-building"></i> ${participant.department}</span>
                        <span><i class="fas fa-weight-hanging"></i> ${participant.initialWeight}kg → ${participant.currentWeight}kg</span>
                    </div>
                </div>
                <div class="weight-stats">
                    <div class="percentage">${participant.weightLossPercentage.toFixed(1)}%</div>
                    <div class="weight-change">-${participant.weightLost.toFixed(1)} kg</div>
                </div>
            </div>
        `;
    }).join('');
}

// Atualizar lista de participantes
function updateParticipantsList() {
    if (participants.length === 0) {
        participantsList.innerHTML = '<p>Nenhum participante cadastrado.</p>';
        return;
    }
    
    participantsList.innerHTML = participants.map(participant => {
        const weightLossPercentage = calculateWeightLossPercentage(participant);
        const weightLost = calculateWeightLost(participant);
        const progressPercentage = Math.min(100, weightLossPercentage);
        const participantRecords = getParticipantWeightRecords(participant.id);
        const completedWeighings = participantRecords.length;
        
        return `
            <div class="participant-card">
                <div class="participant-card-header">
                    <div class="participant-name-card">${participant.name}</div>
                    <div class="department">${participant.department}</div>
                </div>
                
                <div class="participant-stats">
                    <div class="stat-item">
                        <div class="stat-label">Peso Inicial</div>
                        <div class="stat-value">${participant.initialWeight}kg</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Peso Atual</div>
                        <div class="stat-value">${participant.currentWeight}kg</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Perda de Peso</div>
                        <div class="stat-value">${weightLost.toFixed(1)}kg</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Porcentagem</div>
                        <div class="stat-value">${weightLossPercentage.toFixed(1)}%</div>
                    </div>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
                
                <div class="weight-indicator">
                    <div class="weight-dot ${completedWeighings >= 1 ? 'completed' : ''}"></div>
                    <div class="weight-dot ${completedWeighings >= 2 ? 'completed' : completedWeighings === 1 ? 'current' : ''}"></div>
                    <div class="weight-dot ${completedWeighings >= 3 ? 'completed' : completedWeighings === 2 ? 'current' : ''}"></div>
                </div>
                
                <div class="weighing-status">
                    <small>Pesagens: ${completedWeighings}/3</small>
                </div>
                
                ${participant.targetWeight ? `
                    <div class="target-info">
                        <small>Meta: ${participant.targetWeight}kg</small>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Atualizar informações da competição
function updateCompetitionInfo() {
    const stats = calculateStats();
    totalParticipantsEl.textContent = `${stats.totalParticipants} participantes`;
    competitionDurationEl.textContent = `Duração: ${stats.competitionDays} dias`;
}

// ==================== MODAL DE ESTATÍSTICAS ====================

// Abrir modal de estatísticas
function openStatsModal() {
    if (participants.length === 0) {
        showNotification('Adicione participantes para ver estatísticas!', 'warning');
        return;
    }
    
    statsModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateStatsDisplay();
}

// Fechar modal de estatísticas
function closeStatsModal() {
    statsModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// ==================== MODAL DE HISTÓRICO ====================

// Abrir modal de histórico
function openHistoryModal() {
    if (weightRecords.length === 0) {
        showNotification('Nenhuma pesagem registrada ainda!', 'warning');
        return;
    }
    
    historyModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateHistoryDisplay();
    updateHistoryParticipantFilter();
}

// Fechar modal de histórico
function closeHistoryModal() {
    historyModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Atualizar filtro de participantes no histórico
function updateHistoryParticipantFilter() {
    const select = document.getElementById('historyParticipantFilter');
    select.innerHTML = '<option value="">Todos os participantes</option>';
    
    participants.forEach(participant => {
        const option = document.createElement('option');
        option.value = participant.id;
        option.textContent = participant.name;
        select.appendChild(option);
    });
}

// Atualizar exibição do histórico
function updateHistoryDisplay() {
    const selectedParticipantId = document.getElementById('historyParticipantFilter').value;
    let filteredRecords = [...weightRecords];
    
    if (selectedParticipantId) {
        filteredRecords = filteredRecords.filter(record => record.participantId === selectedParticipantId);
    }
    
    // Ordenar por data (mais recente primeiro)
    filteredRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filteredRecords.length === 0) {
        document.getElementById('historyList').innerHTML = `
            <div class="no-participants">
                <i class="fas fa-history"></i>
                <h3>Nenhum registro encontrado</h3>
                <p>Filtre por participante ou registre novas pesagens.</p>
            </div>
        `;
        return;
    }
    
    document.getElementById('historyList').innerHTML = filteredRecords.map(record => {
        const participant = participants.find(p => p.id === record.participantId);
        const participantRecords = getParticipantWeightRecords(record.participantId);
        const recordIndex = participantRecords.findIndex(r => r.id === record.id);
        
        return `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-participant">${participant ? participant.name : 'Participante não encontrado'}</div>
                    <div class="history-date">${new Date(record.date).toLocaleDateString('pt-BR')}</div>
                </div>
                
                <div class="history-details">
                    <div class="history-detail">
                        <div class="history-detail-label">Pesagem</div>
                        <div class="history-detail-value">${record.weighingNumber || (recordIndex + 1)}/3</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Peso</div>
                        <div class="history-detail-value">${record.weight}kg</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Perda desde início</div>
                        <div class="history-detail-value">${(participant.initialWeight - record.weight).toFixed(1)}kg</div>
                    </div>
                    <div class="history-detail">
                        <div class="history-detail-label">Porcentagem</div>
                        <div class="history-detail-value">${(((participant.initialWeight - record.weight) / participant.initialWeight) * 100).toFixed(1)}%</div>
                    </div>
                </div>
                
                ${record.notes ? `
                    <div class="history-notes">
                        <strong>Observações:</strong> ${record.notes}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Filtrar histórico por participante
function filterHistory() {
    updateHistoryDisplay();
}

// Exportar dados do histórico
function exportHistoryData() {
    const data = {
        participants: participants,
        weightRecords: weightRecords,
        competitionStartDate: competitionStartDate,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `competicao-peso-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('Dados exportados com sucesso!', 'success');
}

// Atualizar exibição das estatísticas
function updateStatsDisplay() {
    const stats = calculateStats();
    
    document.getElementById('totalParticipantsStat').textContent = stats.totalParticipants;
    document.getElementById('bestPercentage').textContent = `${stats.bestPercentage.toFixed(1)}%`;
    document.getElementById('totalWeightLost').textContent = `${stats.totalWeightLost.toFixed(1)} kg`;
    document.getElementById('competitionDays').textContent = stats.competitionDays;
}

// ==================== FUNCIONALIDADES AUXILIARES ====================

// Alternar visualização da lista de participantes
function toggleParticipantsView() {
    participantsList.classList.toggle('hidden');
    const icon = toggleViewBtn.querySelector('i');
    const text = toggleViewBtn.querySelector('span') || toggleViewBtn;
    
    if (participantsList.classList.contains('hidden')) {
        icon.className = 'fas fa-list';
        toggleViewBtn.innerHTML = '<i class="fas fa-list"></i> Ver Lista';
    } else {
        icon.className = 'fas fa-eye-slash';
        toggleViewBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Lista';
    }
}

// Fechar todos os modais
function closeAllModals() {
    [participantModal, weightModal, statsModal, historyModal].forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = 'auto';
}

// Salvar dados no localStorage
function saveData() {
    localStorage.setItem('weightCompetitionParticipants', JSON.stringify(participants));
    localStorage.setItem('weightCompetitionRecords', JSON.stringify(weightRecords));
    localStorage.setItem('weightCompetitionStartDate', competitionStartDate);
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Adicionar estilos de animação para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Log de inicialização
console.log('Sistema de Competição de Perda de Peso carregado!');
console.log(`${participants.length} participantes cadastrados.`);
