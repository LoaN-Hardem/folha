# 🛠️ Guia de Contribuição para Este Projeto

Bem-vindo! Para manter um código organizado, limpo e escalável, siga as instruções abaixo ao contribuir com este projeto.

---

## 📦 Estrutura de Commits

Utilize o padrão:


### Tipos suportados:

| Tipo      | Quando usar                                      |
|-----------|--------------------------------------------------|
| `init`    | Inicialização do projeto                         |
| `feat`    | Nova funcionalidade ou seção                     |
| `fix`     | Correção de bug ou erro                          |
| `style`   | Ajustes visuais/CSS (sem alterar lógica)         |
| `refactor`| Refatoração de código (sem mudar funcionalidade) |
| `docs`    | Atualizações de documentação                     |
| `test`    | Adição/modificação de testes                     |
| `build`   | Configurações de build, dependências             |
| `chore`   | Tarefas internas (limpezas, updates menores)     |

### Exemplos:

- `feat: adiciona seção de portfólio`
- `fix: corrige padding da header no mobile`
- `style: ajusta paleta de cores`
- `docs: atualiza README com instruções de deploy`

---

## 🏷️ Versionamento (Tags)

Utilize o formato: `v<major>.<minor>.<patch>`

- **v1.0.0** → Site pronto para publicação
- **v0.3.0** → Nova seção ou funcionalidade
- **v0.3.1** → Pequenas correções ou ajustes

### Como criar e enviar uma tag:

```bash
git tag -a v0.3.0 -m "Adiciona seção de serviços"
git push origin v0.3.0

# ou 

git push origin --tags
# isso envia todas as tags pendentes