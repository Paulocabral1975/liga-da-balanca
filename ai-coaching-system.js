// Sistema de IA para Coaching e Interações Inteligentes
// Liga da Balança - Módulo de Inteligência Artificial

class AICoachingSystem {
    constructor() {
        this.participants = [];
        this.weightRecords = [];
        this.challenges = [];
        this.insights = [];
        this.notifications = [];
        this.learningData = {
            patterns: {},
            preferences: {},
            effectiveness: {}
        };
    }

    // ==================== ANÁLISE INTELIGENTE DE DADOS ====================

    analyzeParticipantProgress(participantId) {
        const participant = this.participants.find(p => p.id === participantId);
        if (!participant) return null;

        const records = this.getParticipantWeightRecords(participantId);
        const analysis = {
            participantId,
            name: participant.name,
            currentStatus: this.getCurrentStatus(participant, records),
            trends: this.analyzeTrends(records),
            predictions: this.generatePredictions(participant, records),
            recommendations: this.generateRecommendations(participant, records),
            riskFactors: this.identifyRiskFactors(participant, records),
            achievements: this.identifyAchievements(participant, records),
            motivationLevel: this.assessMotivationLevel(participant, records)
        };

        return analysis;
    }

    getCurrentStatus(participant, records) {
        if (records.length === 0) return 'iniciante';
        
        const recentRecords = records.slice(-2);
        if (recentRecords.length < 2) return 'em_progresso';
        
        const weightChange = recentRecords[1].weight - recentRecords[0].weight;
        const percentageChange = (weightChange / recentRecords[0].weight) * 100;
        
        if (percentageChange < -1) return 'excelente_progresso';
        if (percentageChange < -0.5) return 'bom_progresso';
        if (percentageChange < 0.5) return 'estagnado';
        return 'regressao';
    }

    analyzeTrends(records) {
        if (records.length < 2) return { trend: 'insuficiente_dados', confidence: 0 };
        
        const weights = records.map(r => r.weight);
        const dates = records.map(r => new Date(r.date));
        
        // Calcular tendência linear
        const n = weights.length;
        const sumX = dates.reduce((sum, date, i) => sum + i, 0);
        const sumY = weights.reduce((sum, weight) => sum + weight, 0);
        const sumXY = weights.reduce((sum, weight, i) => sum + (i * weight), 0);
        const sumXX = weights.reduce((sum, weight, i) => sum + (i * i), 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const avgWeight = sumY / n;
        const trendPercentage = (slope / avgWeight) * 100;
        
        let trend = 'estavel';
        if (trendPercentage < -0.5) trend = 'perdendo_peso';
        else if (trendPercentage > 0.5) trend = 'ganhando_peso';
        
        return {
            trend,
            percentage: Math.abs(trendPercentage),
            confidence: Math.min(0.9, records.length / 10),
            consistency: this.calculateConsistency(weights)
        };
    }

    calculateConsistency(weights) {
        if (weights.length < 2) return 0;
        
        const changes = [];
        for (let i = 1; i < weights.length; i++) {
            changes.push(weights[i] - weights[i-1]);
        }
        
        const avgChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
        const variance = changes.reduce((sum, change) => sum + Math.pow(change - avgChange, 2), 0) / changes.length;
        const stdDev = Math.sqrt(variance);
        
        return Math.max(0, 1 - (stdDev / Math.abs(avgChange || 1)));
    }

    generatePredictions(participant, records) {
        if (records.length < 2) return { prediction: 'insuficiente_dados', confidence: 0 };
        
        const trend = this.analyzeTrends(records);
        const currentWeight = records[records.length - 1].weight;
        const daysRemaining = this.getDaysRemaining();
        
        let predictedWeight = currentWeight;
        let confidence = trend.confidence;
        
        if (trend.trend === 'perdendo_peso') {
            const dailyLoss = (trend.percentage / 100) * currentWeight;
            predictedWeight = currentWeight - (dailyLoss * daysRemaining);
        } else if (trend.trend === 'ganhando_peso') {
            const dailyGain = (trend.percentage / 100) * currentWeight;
            predictedWeight = currentWeight + (dailyGain * daysRemaining);
        }
        
        const targetWeight = participant.targetWeight || (participant.initialWeight * 0.9);
        const probabilityOfReachingTarget = this.calculateTargetProbability(currentWeight, predictedWeight, targetWeight);
        
        return {
            predictedWeight: Math.max(0, predictedWeight),
            probabilityOfReachingTarget,
            confidence,
            recommendation: this.getPredictionRecommendation(probabilityOfReachingTarget, trend)
        };
    }

    calculateTargetProbability(currentWeight, predictedWeight, targetWeight) {
        if (!targetWeight) return 0;
        
        const distanceToTarget = Math.abs(targetWeight - currentWeight);
        const predictedDistance = Math.abs(targetWeight - predictedWeight);
        
        if (predictedDistance < distanceToTarget) {
            return Math.min(0.95, 0.5 + (distanceToTarget - predictedDistance) / distanceToTarget * 0.4);
        }
        
        return Math.max(0.05, 0.5 - (predictedDistance - distanceToTarget) / distanceToTarget * 0.4);
    }

    generateRecommendations(participant, records) {
        const recommendations = [];
        const status = this.getCurrentStatus(participant, records);
        const trend = this.analyzeTrends(records);
        
        // Recomendações baseadas no status atual
        switch (status) {
            case 'excelente_progresso':
                recommendations.push({
                    type: 'motivation',
                    priority: 'high',
                    message: 'Parabéns! Seu progresso está excelente. Continue mantendo o ritmo!',
                    action: 'maintain_current_approach'
                });
                break;
            case 'bom_progresso':
                recommendations.push({
                    type: 'optimization',
                    priority: 'medium',
                    message: 'Bom progresso! Considere intensificar um pouco os exercícios para acelerar ainda mais.',
                    action: 'increase_activity'
                });
                break;
            case 'estagnado':
                recommendations.push({
                    type: 'adjustment',
                    priority: 'high',
                    message: 'Parece que você está estagnado. Que tal revisar sua dieta ou tentar novos exercícios?',
                    action: 'change_approach'
                });
                break;
            case 'regressao':
                recommendations.push({
                    type: 'support',
                    priority: 'urgent',
                    message: 'Notamos uma regressão. Vamos trabalhar juntos para reverter isso!',
                    action: 'seek_support'
                });
                break;
        }
        
        // Recomendações baseadas na tendência
        if (trend.consistency < 0.5) {
            recommendations.push({
                type: 'consistency',
                priority: 'medium',
                message: 'Tente manter uma rotina mais consistente para melhores resultados.',
                action: 'improve_consistency'
            });
        }
        
        // Recomendações baseadas no tempo
        const daysInCompetition = this.getDaysInCompetition();
        if (daysInCompetition > 14 && records.length < 2) {
            recommendations.push({
                type: 'engagement',
                priority: 'high',
                message: 'Você está há mais de 2 semanas na competição. Que tal registrar uma nova pesagem?',
                action: 'record_weight'
            });
        }
        
        return recommendations;
    }

    identifyRiskFactors(participant, records) {
        const riskFactors = [];
        
        // Risco de abandono
        const daysSinceLastWeighing = this.getDaysSinceLastWeighing(records);
        if (daysSinceLastWeighing > 7) {
            riskFactors.push({
                type: 'abandonment_risk',
                severity: 'high',
                message: 'Há mais de uma semana sem pesagem. Risco de abandono detectado.',
                suggestion: 'Enviar mensagem motivacional personalizada'
            });
        }
        
        // Risco de regressão
        const recentTrend = this.analyzeTrends(records.slice(-3));
        if (recentTrend.trend === 'ganhando_peso' && recentTrend.confidence > 0.7) {
            riskFactors.push({
                type: 'regression_risk',
                severity: 'medium',
                message: 'Tendência de ganho de peso detectada.',
                suggestion: 'Oferecer suporte adicional e revisão do plano'
            });
        }
        
        // Risco de desmotivação
        const progress = this.calculateProgress(participant, records);
        if (progress < 0.1 && records.length > 1) {
            riskFactors.push({
                type: 'demotivation_risk',
                severity: 'medium',
                message: 'Progresso abaixo do esperado pode causar desmotivação.',
                suggestion: 'Ajustar expectativas e oferecer suporte'
            });
        }
        
        return riskFactors;
    }

    identifyAchievements(participant, records) {
        const achievements = [];
        
        // Primeira pesagem
        if (records.length === 1) {
            achievements.push({
                type: 'first_weighing',
                title: 'Primeiro Passo',
                description: 'Parabéns pela primeira pesagem!',
                points: 10
            });
        }
        
        // Perda de peso significativa
        const totalLoss = participant.initialWeight - participant.currentWeight;
        const lossPercentage = (totalLoss / participant.initialWeight) * 100;
        
        if (lossPercentage >= 5) {
            achievements.push({
                type: 'significant_loss',
                title: '5% de Perda',
                description: 'Incrível! Você perdeu 5% do seu peso inicial!',
                points: 50
            });
        }
        
        if (lossPercentage >= 10) {
            achievements.push({
                type: 'major_loss',
                title: '10% de Perda',
                description: 'Fantástico! Você perdeu 10% do seu peso inicial!',
                points: 100
            });
        }
        
        // Consistência
        const trend = this.analyzeTrends(records);
        if (trend.consistency > 0.8) {
            achievements.push({
                type: 'consistency',
                title: 'Mestre da Consistência',
                description: 'Sua consistência é impressionante!',
                points: 30
            });
        }
        
        return achievements;
    }

    assessMotivationLevel(participant, records) {
        let motivationScore = 50; // Base score
        
        // Fator: Frequência de pesagens
        const daysInCompetition = this.getDaysInCompetition();
        const weighingFrequency = records.length / Math.max(1, daysInCompetition / 7);
        motivationScore += weighingFrequency * 20;
        
        // Fator: Progresso
        const progress = this.calculateProgress(participant, records);
        motivationScore += progress * 30;
        
        // Fator: Consistência
        const trend = this.analyzeTrends(records);
        motivationScore += trend.consistency * 20;
        
        // Fator: Tempo desde última pesagem
        const daysSinceLastWeighing = this.getDaysSinceLastWeighing(records);
        motivationScore -= daysSinceLastWeighing * 5;
        
        return Math.max(0, Math.min(100, motivationScore));
    }

    // ==================== SISTEMA DE DESAFIOS DINÂMICOS ====================

    generateDynamicChallenges() {
        const challenges = [];
        const participants = this.participants;
        
        // Desafio individual baseado no progresso
        participants.forEach(participant => {
            const analysis = this.analyzeParticipantProgress(participant.id);
            const challenge = this.createPersonalizedChallenge(participant, analysis);
            if (challenge) challenges.push(challenge);
        });
        
        // Desafios em grupo
        const groupChallenges = this.createGroupChallenges(participants);
        challenges.push(...groupChallenges);
        
        // Desafios de departamento
        const departmentChallenges = this.createDepartmentChallenges(participants);
        challenges.push(...departmentChallenges);
        
        return challenges;
    }

    createPersonalizedChallenge(participant, analysis) {
        const challengeTypes = [
            'weight_loss_goal',
            'consistency_challenge',
            'motivation_boost',
            'habit_formation'
        ];
        
        let challengeType = 'weight_loss_goal';
        let difficulty = 'medium';
        let description = '';
        let points = 50;
        
        // Escolher tipo baseado na análise
        if (analysis.motivationLevel < 40) {
            challengeType = 'motivation_boost';
            description = 'Complete 3 pesagens esta semana para ganhar pontos extras!';
            points = 75;
        } else if (analysis.trends.consistency < 0.5) {
            challengeType = 'consistency_challenge';
            description = 'Mantenha uma rotina de pesagem consistente por 2 semanas!';
            points = 100;
        } else if (analysis.currentStatus === 'estagnado') {
            challengeType = 'habit_formation';
            description = 'Tente uma nova atividade física esta semana!';
            points = 60;
        } else {
            const targetLoss = Math.max(1, analysis.predictions.predictedWeight - participant.currentWeight);
            description = `Tente perder ${targetLoss.toFixed(1)}kg esta semana!`;
            points = Math.round(targetLoss * 20);
        }
        
        return {
            id: `challenge_${participant.id}_${Date.now()}`,
            participantId: participant.id,
            type: challengeType,
            difficulty,
            description,
            points,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            requirements: this.getChallengeRequirements(challengeType),
            rewards: this.getChallengeRewards(points)
        };
    }

    createGroupChallenges(participants) {
        const challenges = [];
        
        // Desafio de perda total de peso
        const totalWeightLoss = participants.reduce((sum, p) => {
            const records = this.getParticipantWeightRecords(p.id);
            if (records.length > 0) {
                return sum + (p.initialWeight - records[records.length - 1].weight);
            }
            return sum;
        }, 0);
        
        challenges.push({
            id: `group_total_loss_${Date.now()}`,
            type: 'group_total_loss',
            title: 'Desafio do Peso Total',
            description: `Meta do grupo: perder ${(totalWeightLoss * 1.2).toFixed(1)}kg esta semana!`,
            participants: participants.map(p => p.id),
            points: Math.round(totalWeightLoss * 10),
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            requirements: {
                totalWeightLoss: totalWeightLoss * 1.2,
                minimumParticipants: Math.max(2, Math.floor(participants.length * 0.5))
            }
        });
        
        return challenges;
    }

    createDepartmentChallenges(participants) {
        const challenges = [];
        const departments = [...new Set(participants.map(p => p.department))];
        
        departments.forEach(dept => {
            const deptParticipants = participants.filter(p => p.department === dept);
            if (deptParticipants.length < 2) return;
            
            const avgProgress = deptParticipants.reduce((sum, p) => {
                const analysis = this.analyzeParticipantProgress(p.id);
                return sum + analysis.predictions.probabilityOfReachingTarget;
            }, 0) / deptParticipants.length;
            
            challenges.push({
                id: `dept_${dept}_${Date.now()}`,
                type: 'department_competition',
                title: `Desafio do ${dept}`,
                description: `Qual departamento terá a maior perda de peso percentual?`,
                participants: deptParticipants.map(p => p.id),
                points: 200,
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'active',
                requirements: {
                    department: dept,
                    metric: 'percentage_loss'
                }
            });
        });
        
        return challenges;
    }

    // ==================== SISTEMA DE NOTIFICAÇÕES INTELIGENTES ====================

    generateSmartNotifications() {
        const notifications = [];
        
        this.participants.forEach(participant => {
            const analysis = this.analyzeParticipantProgress(participant.id);
            const participantNotifications = this.createPersonalizedNotifications(participant, analysis);
            notifications.push(...participantNotifications);
        });
        
        return notifications;
    }

    createPersonalizedNotifications(participant, analysis) {
        const notifications = [];
        const now = new Date();
        
        // Notificação de pesagem atrasada
        const daysSinceLastWeighing = this.getDaysSinceLastWeighing(this.getParticipantWeightRecords(participant.id));
        if (daysSinceLastWeighing > 3) {
            notifications.push({
                id: `notification_${participant.id}_weighing_${Date.now()}`,
                participantId: participant.id,
                type: 'weighing_reminder',
                priority: 'medium',
                title: 'Hora da Pesagem!',
                message: this.generateWeighingReminderMessage(participant, analysis),
                scheduledTime: now.toISOString(),
                status: 'pending'
            });
        }
        
        // Notificação de conquista
        if (analysis.achievements.length > 0) {
            analysis.achievements.forEach(achievement => {
                notifications.push({
                    id: `notification_${participant.id}_achievement_${Date.now()}`,
                    participantId: participant.id,
                    type: 'achievement',
                    priority: 'high',
                    title: `🏆 ${achievement.title}`,
                    message: achievement.description,
                    scheduledTime: now.toISOString(),
                    status: 'pending',
                    data: { achievement }
                });
            });
        }
        
        // Notificação de risco
        if (analysis.riskFactors.length > 0) {
            analysis.riskFactors.forEach(risk => {
                notifications.push({
                    id: `notification_${participant.id}_risk_${Date.now()}`,
                    participantId: participant.id,
                    type: 'risk_alert',
                    priority: risk.severity === 'urgent' ? 'urgent' : 'medium',
                    title: 'Atenção Especial',
                    message: risk.message,
                    scheduledTime: now.toISOString(),
                    status: 'pending',
                    data: { risk }
                });
            });
        }
        
        // Notificação motivacional
        if (analysis.motivationLevel < 60) {
            notifications.push({
                id: `notification_${participant.id}_motivation_${Date.now()}`,
                participantId: participant.id,
                type: 'motivation',
                priority: 'low',
                title: 'Você consegue!',
                message: this.generateMotivationalMessage(participant, analysis),
                scheduledTime: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 horas depois
                status: 'pending'
            });
        }
        
        return notifications;
    }

    generateWeighingReminderMessage(participant, analysis) {
        const messages = [
            `Oi ${participant.name}! Que tal registrar uma nova pesagem? Seu progresso está ${analysis.currentStatus === 'excelente_progresso' ? 'excelente' : 'bom'}!`,
            `${participant.name}, está na hora de ver como você está indo! Cada pesagem é um passo em direção ao seu objetivo.`,
            `Vamos lá, ${participant.name}! Uma nova pesagem pode trazer boas surpresas. Você está no caminho certo!`
        ];
        
        return messages[Math.floor(Math.random() * messages.length)];
    }

    generateMotivationalMessage(participant, analysis) {
        const messages = [
            `Lembre-se, ${participant.name}, cada pequeno progresso conta! Você já perdeu ${(participant.initialWeight - participant.currentWeight).toFixed(1)}kg!`,
            `${participant.name}, a jornada para a saúde é uma maratona, não uma corrida. Continue firme!`,
            `Você é mais forte do que pensa, ${participant.name}! Cada dia é uma nova oportunidade de se superar.`
        ];
        
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // ==================== FUNÇÕES AUXILIARES ====================

    getParticipantWeightRecords(participantId) {
        return this.weightRecords
            .filter(record => record.participantId === participantId)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    getDaysRemaining() {
        // Assumindo competição de 30 dias
        const competitionStart = new Date();
        const competitionEnd = new Date(competitionStart.getTime() + 30 * 24 * 60 * 60 * 1000);
        const now = new Date();
        return Math.max(0, Math.ceil((competitionEnd - now) / (1000 * 60 * 60 * 24)));
    }

    getDaysInCompetition() {
        const competitionStart = new Date();
        const now = new Date();
        return Math.ceil((now - competitionStart) / (1000 * 60 * 60 * 24));
    }

    getDaysSinceLastWeighing(records) {
        if (records.length === 0) return 999;
        const lastWeighing = new Date(records[records.length - 1].date);
        const now = new Date();
        return Math.ceil((now - lastWeighing) / (1000 * 60 * 60 * 24));
    }

    calculateProgress(participant, records) {
        if (records.length === 0) return 0;
        const totalLoss = participant.initialWeight - participant.currentWeight;
        const targetLoss = participant.targetWeight ? 
            participant.initialWeight - participant.targetWeight : 
            participant.initialWeight * 0.1; // 10% por padrão
        
        return Math.min(1, totalLoss / targetLoss);
    }

    getPredictionRecommendation(probability, trend) {
        if (probability > 0.8) return 'continue_current_approach';
        if (probability > 0.5) return 'minor_adjustments_needed';
        if (probability > 0.3) return 'significant_changes_required';
        return 'major_overhaul_needed';
    }

    getChallengeRequirements(type) {
        const requirements = {
            'weight_loss_goal': { minWeightLoss: 0.5, timeframe: '1 week' },
            'consistency_challenge': { minWeighings: 2, timeframe: '2 weeks' },
            'motivation_boost': { minWeighings: 3, timeframe: '1 week' },
            'habit_formation': { newActivity: true, timeframe: '1 week' }
        };
        
        return requirements[type] || {};
    }

    getChallengeRewards(points) {
        return {
            points,
            badge: points > 100 ? 'gold' : points > 50 ? 'silver' : 'bronze',
            title: points > 100 ? 'Desafio Épico' : points > 50 ? 'Desafio Difícil' : 'Desafio Regular'
        };
    }

    // ==================== INTEGRAÇÃO COM SISTEMA EXISTENTE ====================

    updateData(participants, weightRecords) {
        this.participants = participants;
        this.weightRecords = weightRecords;
    }

    getAIInsights() {
        const insights = {
            totalParticipants: this.participants.length,
            activeChallenges: this.challenges.filter(c => c.status === 'active').length,
            pendingNotifications: this.notifications.filter(n => n.status === 'pending').length,
            averageMotivation: this.calculateAverageMotivation(),
            topPerformers: this.getTopPerformers(),
            riskParticipants: this.getRiskParticipants(),
            recommendations: this.getSystemRecommendations()
        };
        
        return insights;
    }

    calculateAverageMotivation() {
        if (this.participants.length === 0) return 0;
        
        const totalMotivation = this.participants.reduce((sum, participant) => {
            const analysis = this.analyzeParticipantProgress(participant.id);
            return sum + analysis.motivationLevel;
        }, 0);
        
        return totalMotivation / this.participants.length;
    }

    getTopPerformers() {
        return this.participants
            .map(participant => {
                const analysis = this.analyzeParticipantProgress(participant.id);
                return {
                    ...participant,
                    motivationLevel: analysis.motivationLevel,
                    progress: this.calculateProgress(participant, this.getParticipantWeightRecords(participant.id))
                };
            })
            .sort((a, b) => b.motivationLevel - a.motivationLevel)
            .slice(0, 3);
    }

    getRiskParticipants() {
        return this.participants
            .map(participant => {
                const analysis = this.analyzeParticipantProgress(participant.id);
                return {
                    ...participant,
                    riskFactors: analysis.riskFactors,
                    motivationLevel: analysis.motivationLevel
                };
            })
            .filter(participant => participant.riskFactors.length > 0 || participant.motivationLevel < 40)
            .sort((a, b) => a.motivationLevel - b.motivationLevel);
    }

    getSystemRecommendations() {
        const recommendations = [];
        const insights = this.getAIInsights();
        
        if (insights.averageMotivation < 50) {
            recommendations.push({
                type: 'system_wide',
                priority: 'high',
                message: 'Motivação geral baixa. Considere criar desafios motivacionais.',
                action: 'create_motivation_challenges'
            });
        }
        
        if (insights.riskParticipants.length > insights.totalParticipants * 0.3) {
            recommendations.push({
                type: 'system_wide',
                priority: 'medium',
                message: 'Muitos participantes em risco. Ative sistema de suporte.',
                action: 'activate_support_system'
            });
        }
        
        return recommendations;
    }
}

// Exportar para uso global
window.AICoachingSystem = AICoachingSystem;

