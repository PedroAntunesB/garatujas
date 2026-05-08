# API Comentada
```typescript 
import todo from "./core.ts";

const server = Bun.serve({
  port: 3000, // Porta que vai rodar a aplicação

  routes: { // onde vai ficar cada rota
    "/": new Response(Bun.file("./public/index.html")), // retorna o index html na rota principal

    "/api/todo": { // pega os itens e retorna como response em json
      GET: async () => {
        const items = await todo.getItems()
        return Response.json(items)
      },

      POST: async (req) => { // pega a requisição e adiciona o item na lista
        const data = await req.json() as any;
        const item = data.item || null;
        if (!item)
          return Response.json('Por favor, forneça um item para adicionar.', { status: 400 });
        await todo.addItem(item); // adiciona os itens na lista
        return Response.json(data); 
      },
    },

    "/api/todo/:index": { 
      PUT: async (req) => {
        const index = parseInt(req.params.index);
        if (isNaN(index))
          return Response.json('Índice inválido. um número inteiro é esperado.', { status: 400 });
        const data = await req.json() as any;
        const newItem = data.newItem || null;
        if (!newItem)
          return Response.json('Por favor, forneça um novo item para atualizar.', { status: 400 });
        try {
          await todo.updateItem(index, newItem);
          return Response.json(`Item no índice ${index} atualizado para "${newItem}".`);
        } catch (error: any) {
          return Response.json(error.message, { status: 400 }); // mensagem de erro caso dê errado
        }
      },

      DELETE: async (req) => { // deleta o item da lista
        const index = parseInt(req.params.index);
        if (isNaN(index))
          return Response.json('Índice inválido.', { status: 400 });
        try {
          await todo.removeItem(index);
          return Response.json(`Item no índice ${index} removido com sucesso.`);
        } catch (error: any) {
          return Response.json(error.message, { status: 400 });
        }
      },
    },

    // EXEMPLO BÁSICO

    "/api/exemplo": {
      GET: () => {
        return new Response(`Esse é o exemplo: ${Date.now()}`)
      },

      POST: async (req) => {
        const data = await req.json() as any;
        data.recebidoEm = new Date().toLocaleDateString("pt-BR");
        return Response.json(data);
      },
    },

    "/api/exemplo/:id": {
      PUT: async (req, params) => { // coloca o ID aos dados recebidos e marca a data de recebimento.
        const { id } = req.params;
        const data = await req.json() as any;
        data.id = id;
        data.recebidoEm = new Date().toLocaleDateString("pt-BR");
        return Response.json(data);
      },

      PATCH: async (req, params) => { // recebe os dados, identifica o que mudou e coloca a data da atualização.
        const { id } = req.params;
        const data = await req.json() as any;
        data.chavesAtualizadas = Object.keys(data);
        data.id = id;
        data.atualizadoEm = new Date().toLocaleDateString("pt-BR"); // pega a data no formato pt-br
        return Response.json(data);
      },

      DELETE: (req, params) => { // deleta kk
        const { id } = req.params;
        return new Response(`Recurso com id ${id} deletado`, { status: 200 });
      }
    }
    // FIM DO EXEMPLO BÁSICO
  },

  async fetch(req) { // caso não encontre a rota solicitada
    return new Response(`Not Found`, { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`); // roda o servidor
```

# Core Comentado
```typescript
const jsonFilePath = __dirname + '/data.temp.json';
const list: string[] = await loadFromFile();


async function loadFromFile() { // carrega os dados do json
  try {
    const file = Bun.file(jsonFilePath);
    const content = await file.text();
    return JSON.parse(content) as string[];
  } catch (error: any) {
    if (error.code === 'ENOENT')
      return [];
    throw error;
  }
}


async function saveToFile() { // salva os dados no arquivo json
  try {
    await Bun.write(jsonFilePath, JSON.stringify(list));
  } catch (error: any) {
   throw new Error("Erro ao salvar os dados no arquivo: " + error.message);
  }
}


async function addItem(item: string) { // adiciona o item passado como parametro
  list.push(item);
  await saveToFile();
}


async function getItems() { // retorna a lista
  return list;
}


async function updateItem(index: number, newItem: string) { // modifica o item na lista com base no index
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");
  list[index] = newItem;
  await saveToFile();
}


async function removeItem(index: number) { // remove o item da lista com base no index
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");
  list.splice(index, 1);
  await saveToFile();
}


export default { addItem, getItems, updateItem, removeItem }; // exporta as funções
```