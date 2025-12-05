/* ============================================
   IA ENTREVISTADOR - JAVASCRIPT
   ============================================ */

class IAEntrevistador {
    constructor() {
        // Estado da aplicação
        this.estado = 'menu'; // menu, entrevista, feedback, resultados
        this.nivelAtual = null;
        this.perguntasCarregadas = [];
        this.perguntasAtual = null;
        this.indexPerguntaAtual = 0;
        this.respostasUsuario = [];
        this.pontosObtidos = 0;
        this.estatisticas = this.carregarEstatisticas();

        // Elementos DOM
        this.menuPrincipal = document.getElementById('menu-principal');
        this.entrevistaSection = document.getElementById('entrevista-section');
        this.feedbackSection = document.getElementById('feedback-section');
        this.resultadosSection = document.getElementById('resultados-section');

        this.init();
    }

    init() {
        this.carregarPerguntas();
        this.configurarEventos();
        this.atualizarEstatisticas();
    }

    carregarEstatisticas() {
        const stats = localStorage.getItem('ia-entrevistador-stats');
        return stats ? JSON.parse(stats) : {
            totalPerguntas: 0,
            pontosTotais: 0,
            perguntasCorretas: 0
        };
    }

    salvarEstatisticas() {
        localStorage.setItem('ia-entrevistador-stats', JSON.stringify(this.estatisticas));
    }

    async carregarPerguntas() {
        try {
            const response = await fetch('perguntas/perguntas.json');
            const data = await response.json();
            console.log('Perguntas carregadas com sucesso:', data);
        } catch (error) {
            console.error('Erro ao carregar perguntas:', error);
            this.exibirNotificacao('Erro ao carregar perguntas', 'error');
        }
    }

    configurarEventos() {
        // Botões de dificuldade
        document.querySelectorAll('[data-level]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.iniciarEntrevista(e.target.closest('[data-level]').dataset.level);
            });
        });

        // Botões de entrevista
        document.getElementById('enviar-resposta').addEventListener('click', () => {
            this.enviarResposta();
        });

        document.getElementById('pular-pergunta').addEventListener('click', () => {
            this.pularPergunta();
        });

        document.getElementById('sair-entrevista').addEventListener('click', () => {
            if (confirm('Tem certeza que deseja sair? Seu progresso será perdido.')) {
                this.voltarMenu();
            }
        });

        // Próxima pergunta
        document.getElementById('proxima-pergunta').addEventListener('click', () => {
            this.proximaPergunta();
        });

        // Novo teste
        document.getElementById('novo-teste').addEventListener('click', () => {
            this.voltarMenu();
        });

        // Enter para enviar resposta (Ctrl+Enter)
        document.getElementById('resposta-input').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.enviarResposta();
            }
        });
    }

    iniciarEntrevista(nivel) {
        this.nivelAtual = nivel;
        this.perguntasAtual = this.gerarPerguntas(nivel, 10);
        this.indexPerguntaAtual = 0;
        this.respostasUsuario = [];
        this.pontosObtidos = 0;

        this.mudarEstado('entrevista');
        this.carregarPergunta(0);
    }

    gerarPerguntas(nivel, quantidade) {
        const todasAsPerguntas = this.obterTodasAsPerguntas();
        const perguntasNivel = todasAsPerguntas.filter(p => p.dificuldade === nivel);
        
        // Embaralhar e pegar quantidade desejada
        return perguntasNivel.sort(() => Math.random() - 0.5).slice(0, quantidade);
    }

    obterTodasAsPerguntas() {
        // Dados de exemplo - em produção viriam do JSON
        const perguntas = [
            {
                id: 1,
                categoria: 'Programação Básica',
                dificuldade: 'basico',
                pergunta: 'O que é uma variável em programação?',
                resposta: 'Uma variável é um espaço na memória do computador que armazena um valor. Ela tem um nome único que a identifica e pode ser usada para guardar dados de diferentes tipos.',
                dicas: ['Mencione que é um container de dados', 'Explique sobre identificadores'],
                pontos: 10
            },
            {
                id: 2,
                categoria: 'Programação Básica',
                dificuldade: 'basico',
                pergunta: 'Qual é a diferença entre compilação e interpretação?',
                resposta: 'Compilação: código é traduzido para linguagem de máquina antes da execução. Interpretação: código é traduzido durante a execução, linha por linha.',
                dicas: ['Fale sobre timing da tradução', 'Cite exemplos de linguagens compiladas e interpretadas'],
                pontos: 10
            },
            {
                id: 3,
                categoria: 'Programação Básica',
                dificuldade: 'basico',
                pergunta: 'O que é um algoritmo?',
                resposta: 'Um algoritmo é um conjunto de passos bem definidos para resolver um problema ou realizar uma tarefa. Deve ter entrada, processamento e saída.',
                dicas: ['Mencione sequência de passos', 'Dê exemplos do dia a dia'],
                pontos: 10
            },
            {
                id: 4,
                categoria: 'Estruturas de Dados',
                dificuldade: 'basico',
                pergunta: 'O que é um array (vetor)?',
                resposta: 'Um array é uma estrutura de dados que armazena múltiplos elementos do mesmo tipo em posições contíguas da memória, acessíveis por índices.',
                dicas: ['Explique sobre índices', 'Mencione tamanho fixo ou dinâmico'],
                pontos: 10
            },
            {
                id: 5,
                categoria: 'Lógica de Programação',
                dificuldade: 'basico',
                pergunta: 'O que é uma condição if-else?',
                resposta: 'É uma estrutura de controle que permite executar diferentes blocos de código baseado em uma condição. Se verdadeira, executa o bloco if; senão, executa o else.',
                dicas: ['Mencione expressões booleanas', 'Explique fluxo de controle'],
                pontos: 10
            },
            {
                id: 6,
                categoria: 'Estruturas de Dados',
                dificuldade: 'intermediario',
                pergunta: 'Explique como funciona uma pilha (stack)?',
                resposta: 'Uma pilha é uma estrutura LIFO (Last In, First Out). Elementos são inseridos e removidos pelo topo. Operações principais: push (inserir) e pop (remover).',
                dicas: ['Use exemplo de pratos em uma pilha', 'Fale sobre LIFO'],
                pontos: 15
            },
            {
                id: 7,
                categoria: 'Estruturas de Dados',
                dificuldade: 'intermediario',
                pergunta: 'O que é uma fila (queue) e como difere de uma pilha?',
                resposta: 'Uma fila é FIFO (First In, First Out). Primeiro que entra é primeiro que sai. Operações: enqueue (inserir) e dequeue (remover). Diferencia de pilha pela ordem de remoção.',
                dicas: ['Compare com filas do mundo real', 'Mencione FIFO vs LIFO'],
                pontos: 15
            },
            {
                id: 8,
                categoria: 'Algoritmos',
                dificuldade: 'intermediario',
                pergunta: 'Qual é a diferença entre busca linear e busca binária?',
                resposta: 'Linear: verifica cada elemento (O(n)). Binária: divide o espaço pela metade repetidamente (O(log n)). Binária é mais rápida mas requer dados ordenados.',
                dicas: ['Mencione complexidade', 'Explique pré-requisitos'],
                pontos: 15
            },
            {
                id: 9,
                categoria: 'Algoritmos',
                dificuldade: 'intermediario',
                pergunta: 'O que é recursão? Dê um exemplo.',
                resposta: 'Recursão é quando uma função chama a si mesma. Deve ter caso base (parada) e caso recursivo. Exemplo: fatorial - fatorial(n) = n * fatorial(n-1).',
                dicas: ['Mencione caso base', 'Cite exemplos reais como Fibonacci'],
                pontos: 15
            },
            {
                id: 10,
                categoria: 'Paradigmas',
                dificuldade: 'avancado',
                pergunta: 'Explique os princípios SOLID de design de software.',
                resposta: 'SOLID: S-Single Responsibility, O-Open/Closed, L-Liskov Substitution, I-Interface Segregation, D-Dependency Inversion. Princípios para código limpo e manutenível.',
                dicas: ['Explique cada princípio brevemente', 'Dê exemplos de violação'],
                pontos: 20
            },
            {
                id: 11,
                categoria: 'Design Patterns',
                dificuldade: 'avancado',
                pergunta: 'O que é o padrão Singleton? Quando usar?',
                resposta: 'Singleton garante que uma classe tenha apenas uma instância. Usar quando precisa de um ponto único de acesso. Exemplo: Logger, Database Connection.',
                dicas: ['Explique problema que resolve', 'Cite exemplos de uso'],
                pontos: 20
            },
            {
                id: 12,
                categoria: 'Otimização',
                dificuldade: 'avancado',
                pergunta: 'Como você otimizaria uma aplicação lenta?',
                resposta: 'Etapas: 1) Perfil para identificar gargalos 2) Otimize algoritmos 3) Cache 4) Paralelização 5) Otimizações de memória 6) Teste resultados.',
                dicas: ['Mencione ferramentas de profiling', 'Fale sobre trade-offs'],
                pontos: 20
            }
        ];

        return perguntas;
    }

    carregarPergunta(index) {
        if (index >= this.perguntasAtual.length) {
            this.finalizarEntrevista();
            return;
        }

        this.indexPerguntaAtual = index;
        const pergunta = this.perguntasAtual[index];

        // Atualizar elementos da tela
        document.getElementById('pergunta-titulo').textContent = pergunta.pergunta;
        document.getElementById('pergunta-descricao').textContent = pergunta.categoria;
        document.getElementById('difficulty-badge').textContent = 
            pergunta.dificuldade.charAt(0).toUpperCase() + pergunta.dificuldade.slice(1);
        document.getElementById('category-badge').textContent = pergunta.categoria;

        // Atualizar progress bar
        const progresso = ((index + 1) / this.perguntasAtual.length) * 100;
        document.getElementById('progress-fill').style.width = progresso + '%';
        document.getElementById('progress-text').textContent = 
            `${index + 1}/${this.perguntasAtual.length}`;

        // Limpar resposta anterior
        document.getElementById('resposta-input').value = '';
        document.getElementById('resposta-input').focus();
    }

    enviarResposta() {
        const resposta = document.getElementById('resposta-input').value.trim();

        if (!resposta) {
            this.exibirNotificacao('Por favor, digite uma resposta!', 'warning');
            return;
        }

        const perguntaAtual = this.perguntasAtual[this.indexPerguntaAtual];
        const pontos = this.avaliarResposta(resposta, perguntaAtual);

        this.respostasUsuario.push({
            pergunta: perguntaAtual.pergunta,
            resposta: resposta,
            respostaEsperada: perguntaAtual.resposta,
            pontos: pontos,
            dicas: perguntaAtual.dicas,
            perguntaObj: perguntaAtual
        });

        this.pontosObtidos += pontos;

        // Mostrar feedback
        this.exibirFeedback(pontos, perguntaAtual);
    }

    avaliarResposta(resposta, pergunta) {
        // Simular avaliação por IA
        const palavrasChave = pergunta.resposta.toLowerCase().split(' ');
        const respostaBaixa = resposta.toLowerCase();
        
        let palavrasEncontradas = 0;
        for (let palavra of palavrasChave) {
            if (respostaBaixa.includes(palavra) && palavra.length > 3) {
                palavrasEncontradas++;
            }
        }

        const percentual = (palavrasEncontradas / palavrasChave.length) * 100;
        
        if (percentual >= 70) {
            return pergunta.pontos;
        } else if (percentual >= 40) {
            return Math.ceil(pergunta.pontos / 2);
        } else {
            return 0;
        }
    }

    exibirFeedback(pontos, pergunta) {
        this.mudarEstado('feedback');

        const percentual = (pontos / pergunta.pontos) * 100;
        document.getElementById('score-percentage').textContent = Math.round(percentual) + '%';
        document.getElementById('pontos-obtidos').textContent = 
            `${pontos}/${pergunta.pontos} pontos`;

        // Mensagem de feedback
        let mensagem = '';
        if (percentual === 100) {
            mensagem = '🎉 Excelente! Resposta perfeita!';
        } else if (percentual >= 70) {
            mensagem = '✅ Muito bom! Resposta completa.';
        } else if (percentual >= 40) {
            mensagem = '⚠️ Resposta parcial. Há pontos importantes.';
        } else {
            mensagem = '❌ Resposta incompleta. Revise o conceito.';
        }
        document.getElementById('feedback-message').textContent = mensagem;

        // Resposta esperada
        document.getElementById('resposta-esperada').textContent = pergunta.resposta;

        // Dicas
        const dicasHtml = pergunta.dicas
            .map(dica => `<li>${dica}</li>`)
            .join('');
        document.getElementById('dicas-lista').innerHTML = dicasHtml;

        // Mudar cor do círculo de score
        const scoreCircle = document.getElementById('score-circle');
        if (percentual === 100) {
            scoreCircle.style.background = 
                'linear-gradient(135deg, #2ecc71, #27ae60)';
        } else if (percentual >= 70) {
            scoreCircle.style.background = 
                'linear-gradient(135deg, #3498db, #2980b9)';
        } else if (percentual >= 40) {
            scoreCircle.style.background = 
                'linear-gradient(135deg, #f39c12, #e67e22)';
        } else {
            scoreCircle.style.background = 
                'linear-gradient(135deg, #e74c3c, #c0392b)';
        }
    }

    proximaPergunta() {
        this.mudarEstado('entrevista');
        this.carregarPergunta(this.indexPerguntaAtual + 1);
    }

    pularPergunta() {
        const pergunta = this.perguntasAtual[this.indexPerguntaAtual];
        this.respostasUsuario.push({
            pergunta: pergunta.pergunta,
            resposta: '[Pulada]',
            respostaEsperada: pergunta.resposta,
            pontos: 0,
            dicas: pergunta.dicas,
            perguntaObj: pergunta
        });

        this.proximaPergunta();
    }

    finalizarEntrevista() {
        // Atualizar estatísticas
        const acertos = this.respostasUsuario.filter(r => r.pontos > 0).length;
        this.estatisticas.totalPerguntas += this.perguntasAtual.length;
        this.estatisticas.pontosTotais += this.pontosObtidos;
        this.estatisticas.perguntasCorretas += acertos;
        this.salvarEstatisticas();

        // Exibir resultados
        this.exibirResultados(acertos);
    }

    exibirResultados(acertos) {
        this.mudarEstado('resultados');

        const total = this.perguntasAtual.length;
        const taxa = (acertos / total) * 100;

        document.getElementById('resultado-score').textContent = this.pontosObtidos;
        document.getElementById('resultado-acertos').textContent = acertos;
        document.getElementById('resultado-taxa').textContent = Math.round(taxa) + '%';

        // Mensagem personalizada
        let mensagem = '';
        if (taxa >= 90) {
            mensagem = '🌟 Parabéns! Você é um expert! Continue assim!';
        } else if (taxa >= 70) {
            mensagem = '🎉 Excelente! Você está no caminho certo!';
        } else if (taxa >= 50) {
            mensagem = '👍 Bom! Mas há espaço para melhorias.';
        } else {
            mensagem = '💪 Continue estudando e practicando!';
        }
        document.getElementById('resultado-mensagem').textContent = mensagem;

        // Análise de categorias
        this.exibirAnaliseCategorias();

        // Atualizar estatísticas do menu
        this.atualizarEstatisticas();
    }

    exibirAnaliseCategorias() {
        const categoriasMap = {};

        this.respostasUsuario.forEach(resposta => {
            const categoria = resposta.perguntaObj.categoria;
            if (!categoriasMap[categoria]) {
                categoriasMap[categoria] = { total: 0, acertos: 0 };
            }
            categoriasMap[categoria].total++;
            if (resposta.pontos > 0) {
                categoriasMap[categoria].acertos++;
            }
        });

        const html = Object.entries(categoriasMap)
            .map(([categoria, dados]) => {
                const taxa = (dados.acertos / dados.total) * 100;
                return `
                    <div class="feedback-item">
                        <h3>${categoria}</h3>
                        <p>${dados.acertos}/${dados.total} acertos (${Math.round(taxa)}%)</p>
                    </div>
                `;
            })
            .join('');

        document.getElementById('categorias-analise').innerHTML = html;
    }

    voltarMenu() {
        this.nivelAtual = null;
        this.perguntasAtual = [];
        this.indexPerguntaAtual = 0;
        this.respostasUsuario = [];
        this.pontosObtidos = 0;

        this.mudarEstado('menu');
    }

    mudarEstado(novoEstado) {
        this.estado = novoEstado;

        // Ocultar todas as seções
        this.menuPrincipal.classList.add('hidden');
        this.entrevistaSection.classList.add('hidden');
        this.feedbackSection.classList.add('hidden');
        this.resultadosSection.classList.add('hidden');

        // Mostrar seção apropriada
        switch (novoEstado) {
            case 'menu':
                this.menuPrincipal.classList.remove('hidden');
                break;
            case 'entrevista':
                this.entrevistaSection.classList.remove('hidden');
                break;
            case 'feedback':
                this.feedbackSection.classList.remove('hidden');
                break;
            case 'resultados':
                this.resultadosSection.classList.remove('hidden');
                break;
        }
    }

    atualizarEstatisticas() {
        document.getElementById('total-perguntas').textContent = 
            this.estatisticas.totalPerguntas;
        document.getElementById('pontos-totais').textContent = 
            this.estatisticas.pontosTotais;
        
        if (this.estatisticas.totalPerguntas > 0) {
            const taxa = (this.estatisticas.perguntasCorretas / this.estatisticas.totalPerguntas) * 100;
            document.getElementById('taxa-acerto').textContent = 
                Math.round(taxa) + '%';
        }
    }

    exibirNotificacao(mensagem, tipo = 'info') {
        // Criar elemento de notificação
        const notificacao = document.createElement('div');
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${tipo === 'error' ? '#e74c3c' : tipo === 'warning' ? '#f39c12' : '#3498db'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-in-out;
        `;
        notificacao.textContent = mensagem;

        document.body.appendChild(notificacao);

        // Remover após 3 segundos
        setTimeout(() => {
            notificacao.style.animation = 'slideOut 0.3s ease-in-out';
            setTimeout(() => notificacao.remove(), 300);
        }, 3000);
    }
}

// Inicializar aplicação quando DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    const app = new IAEntrevistador();
    window.app = app; // Para debug
});
