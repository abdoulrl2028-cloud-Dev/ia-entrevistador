#!/bin/bash

# 🧪 Script de Teste - IA Entrevistador
# Valida a estrutura e funcionamento básico do projeto

echo "═════════════════════════════════════════════════════"
echo "🧪 TESTE DO PROJETO IA ENTREVISTADOR"
echo "═════════════════════════════════════════════════════"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

TESTS_PASSED=0
TESTS_FAILED=0

# Função auxiliar para testes
test_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗${NC} $description"
        echo "  Arquivo não encontrado: $file"
        ((TESTS_FAILED++))
    fi
}

# Função auxiliar para diretórios
test_dir() {
    local dir=$1
    local description=$2
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $description"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗${NC} $description"
        echo "  Diretório não encontrado: $dir"
        ((TESTS_FAILED++))
    fi
}

echo "📁 Verificando estrutura de arquivos..."
echo ""

test_file "index.html" "Arquivo index.html existe"
test_file "style.css" "Arquivo style.css existe"
test_file "script.js" "Arquivo script.js existe"
test_file "README.md" "Arquivo README.md existe"
test_file "package.json" "Arquivo package.json existe"
test_file "vercel.json" "Arquivo vercel.json existe"
test_file "DEPLOY.md" "Arquivo DEPLOY.md existe"

echo ""

test_dir "assets" "Diretório assets existe"
test_dir "perguntas" "Diretório perguntas existe"

echo ""

test_file "assets/logo.png" "Logo PNG existe"
test_file "perguntas/perguntas.json" "Arquivo de perguntas JSON existe"

echo ""
echo "📋 Verificando conteúdo dos arquivos..."
echo ""

# Verificar HTML
if grep -q "<title>IA Entrevistador" index.html; then
    echo -e "${GREEN}✓${NC} HTML tem título correto"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗${NC} HTML sem título correto"
    ((TESTS_FAILED++))
fi

# Verificar CSS
if grep -q "var(--primary-color)" style.css; then
    echo -e "${GREEN}✓${NC} CSS tem variáveis customizadas"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗${NC} CSS sem variáveis customizadas"
    ((TESTS_FAILED++))
fi

# Verificar JavaScript
if grep -q "class IAEntrevistador" script.js; then
    echo -e "${GREEN}✓${NC} JavaScript tem classe principal"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗${NC} JavaScript sem classe principal"
    ((TESTS_FAILED++))
fi

# Verificar JSON
if grep -q '"perguntas"' perguntas/perguntas.json; then
    echo -e "${GREEN}✓${NC} JSON tem estrutura correta"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗${NC} JSON com estrutura incorreta"
    ((TESTS_FAILED++))
fi

# Contar perguntas
PERGUNTA_COUNT=$(grep -o '"id":' perguntas/perguntas.json | wc -l)
echo -e "${GREEN}✓${NC} Total de perguntas: $PERGUNTA_COUNT"
((TESTS_PASSED++))

echo ""
echo "═════════════════════════════════════════════════════"
echo "📊 RESULTADO DOS TESTES"
echo "═════════════════════════════════════════════════════"
echo -e "Testes passados:  ${GREEN}$TESTS_PASSED${NC}"
echo -e "Testes falhados:  ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ TODOS OS TESTES PASSARAM!${NC}"
    echo ""
    echo "🚀 Para iniciar o servidor, execute:"
    echo "   python3 -m http.server 8000"
    echo ""
    echo "📱 Acesse: http://localhost:8000"
    exit 0
else
    echo -e "${RED}✗ ALGUNS TESTES FALHARAM${NC}"
    echo ""
    echo "Verifique os erros acima e tente novamente."
    exit 1
fi
