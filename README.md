# garatujas

## Coisas para lembrar:

Instalação do Bun: 
- Abra o PowerShell
- Execute o comando:
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```
- Feche e abra o terminal novamente

Como fazer um servidor no Bun: 

```javascript
Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Ola Mundo!");
  },
});

console.log("Servidor rodando em http://localhost:3000");
```