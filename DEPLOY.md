# �배 Guias de Deploy - IA Entrevistador

## 🚀 Opção 1: Vercel (Recomendado - Mais Fácil)

### Passos:

1. **Acesse o Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com GitHub

2. **Conecte seu repositório**
   - Clique em "New Project"
   - Selecione `ia-entrevistador`
   - Clique em "Import"

3. **Configure o projeto**
   - Framework Preset: **Other** (site estático)
   - Root Directory: `.` (raiz)
   - Build Command: `echo 'Build complete'`
   - Output Directory: `.`

4. **Deploy**
   - Clique em "Deploy"
   - Pronto! Seu site estará em `ia-entrevistador-[seu-usuario].vercel.app`

### Atualizar automaticamente
- Sempre que você fazer push na branch `main`, o Vercel redeploya automaticamente!

---

## 🌐 Opção 2: GitHub Pages

### Passos:

1. **Configure GitHub Pages**
   - Vá em Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / folder: `/ (root)`
   - Clique em Save

2. **Ative GitHub Actions** (opcional)
   - O workflow em `.github/workflows/deploy.yml` já está pronto
   - Ele dispara automaticamente em push para `main`

3. **Acesse seu site**
   - URL: `https://abdoulrl2028-cloud-Dev.github.io/ia-entrevistador`

---

## 🏠 Opção 3: Netlify

### Passos:

1. **Acesse Netlify**
   - Vá para [netlify.com](https://netlify.com)
   - Faça login com GitHub

2. **Crie novo site**
   - Clique em "Add new site"
   - Selecione "Import an existing project"
   - Escolha seu repositório `ia-entrevistador`

3. **Configure**
   - Build command: deixe em branco
   - Publish directory: `.`

4. **Deploy**
   - Clique em "Deploy site"
   - Pronto! Seu site estará em deploy.netlify.app

---

## 💻 Opção 4: Deploy Local (Desenvolvimento)

### Usando Python:
```bash
cd ia-entrevistador
python3 -m http.server 8000
```
Acesse: `http://localhost:8000`

### Usando Node.js:
```bash
npm install -g http-server
http-server
```

---

## 📋 Checklist de Deploy

- [ ] Todos os arquivos foram commitados
- [ ] Não há erros no console do navegador
- [ ] Arquivo `perguntas/perguntas.json` está presente
- [ ] Logo `assets/logo.png` está carregando
- [ ] CSS e JavaScript estão carregando corretamente
- [ ] Responde bem em dispositivos móveis

---

## 🔍 Verificar Status

### Vercel
```bash
vercel status
vercel list
```

### GitHub Pages
Acesse: `https://github.com/abdoulrl2028-cloud-Dev/ia-entrevistador/deployments`

---

## 🆘 Troubleshooting

### JSON não carrega
- Verifique se `perguntas/perguntas.json` existe
- Verifique CORS no navegador (console > Network)
- Certifique-se de que o servidor está rodando

### Estilos não aparecem
- Limpe cache do navegador (Ctrl+Shift+Delete)
- Verifique se `style.css` está na raiz

### JavaScript não funciona
- Abra DevTools (F12)
- Verifique console por erros
- Confirme que `script.js` está carregado

---

## 📊 Monitoramento Pós-Deploy

### Vercel Analytics
- Dashboard em vercel.com
- Dados de performance e visitantes

### Google Analytics (opcional)
- Adicione ao `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎯 Próximos Passos

Após fazer deploy:

1. **Teste a aplicação** em produção
2. **Compartilhe o link** com amigos/colegas
3. **Colete feedback** sobre funcionalidade
4. **Implemente melhorias** conforme necessário
5. **Considere adicionar**:
   - Login de usuários
   - Integração com API de IA (OpenAI/Gemini)
   - Banco de dados (Firebase/Supabase)
   - Mais perguntas

---

## 📞 Suporte

Para problemas:
1. Verifique [GitHub Issues](https://github.com/abdoulrl2028-cloud-Dev/ia-entrevistador/issues)
2. Abra uma nova issue se necessário
3. Envie um pull request com sugestões

---

**Última atualização**: Dezembro de 2025
