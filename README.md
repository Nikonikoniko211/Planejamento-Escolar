# School Planner

O School Planner é um aplicativo web para organizar tarefas escolares e datas importantes. Cadastre provas, trabalhos, eventos ou dias livres, visualize-os em um calendário, marque atividades como concluídas e acompanhe os próximos compromissos.

## Funcionalidades

- Adicionar e excluir atividades.
- Marcar atividades como concluídas ou pendentes.
- Consultar as atividades em um calendário mensal e selecionar uma data ao criar uma atividade.
- Ver os próximos compromissos e trabalhos atrasados.
- Armazenar as atividades no MongoDB.

## Estrutura do projeto

| Pasta | Descrição |
| --- | --- |
| `school-planner/` | Aplicativo web em Angular |
| `SchoolPlanner.api/` | API em ASP.NET Core e modelo de dados do MongoDB |

## Requisitos

- [Node.js](https://nodejs.org/) e npm
- [SDK do .NET 10](https://dotnet.microsoft.com/download/dotnet/10.0)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community), em execução local no endereço padrão `mongodb://localhost:27017`

Ao salvar a primeira atividade, a API cria o banco de dados `schoolplanner` e a coleção `entries` no MongoDB. Não é necessário configurar o banco nem inserir dados iniciais.

## Executar localmente

Clone o repositório:

```bash
git clone https://github.com/Nikonikoniko211/school-planner.git
cd school-planner
```

Inicie o MongoDB e mantenha-o em execução. Em seguida, abra dois terminais na pasta raiz do repositório para iniciar a API e o aplicativo web.

**Terminal 1 — API**

```bash
dotnet run --project SchoolPlanner.api/SchoolPlanner.api.csproj
```

A API ficará disponível em `http://localhost:5288`.

**Terminal 2 — Aplicativo Angular**

```bash
cd school-planner
npm ci
npm start
```

Abra [http://localhost:4200](http://localhost:4200) no navegador.

O servidor de desenvolvimento do Angular está configurado para usar a API em `http://localhost:5288`. A API aceita requisições do navegador vindas de `http://localhost:4200`. Se algum desses endereços for alterado, atualize a configuração correspondente da API ou do frontend.

## Visão geral da API

A API armazena atividades com título, tipo, data, matéria e observações opcionais, além do status de conclusão. Os tipos disponíveis são `Test` (prova), `Assignment` (trabalho), `Event` (evento) e `DayOff` (dia livre).

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/entries` | Lista as atividades em ordem de data |
| `POST` | `/entries` | Cria uma atividade |
| `PUT` | `/entries/{id}` | Atualiza uma atividade |
| `DELETE` | `/entries/{id}` | Exclui uma atividade |

Exemplo de requisição para criar uma atividade:

```bash
curl -X POST http://localhost:5288/entries \
  -H "Content-Type: application/json" \
  -d '{"title":"Prova de biologia","type":"Test","date":"2026-11-12T00:00:00","subject":"Biologia","isDone":false,"notes":null}'
```

## Compilar e testar

Execute estes comandos a partir da pasta `school-planner/`:

```bash
npm run build
npm test
```

Para compilar a API, execute este comando na raiz do repositório:

```bash
dotnet build SchoolPlanner.api/SchoolPlanner.api.csproj
```

## Tecnologias

- Angular 19 e TypeScript
- ASP.NET Core com .NET 10
- MongoDB
