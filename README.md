# 👕 StyloAI - Seu Closet Inteligente

![Ne]()js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css)

Aplicação Fullstack desenvolvida com Next.js 16 (App Router) para criação, visualização e gerenciamento de looks personalizados com sistema de API de clima influenciando as sugestões de looks.

O projeto implementa um CRUD completo com persistência em banco de dados, armazenamento físico de arquivos no servidor, otimização automática de imagens e consumo de API externa

---

## 🚀 Tecnologias Utilizadas

- Next.js 16 (App Router)
- React
- TypeScript
- Prisma ORM
- PostgreSQL / Supabase
- TailwindCSS
- next/image (otimização automática)
- Framer Motion
- Sonner (toast notifications)

---

## 📦 Funcionalidades Implementadas

### ✅ Criação de Look
- Cadastro de nome
- Cadastro de clima (API OpenWeather)
- Cadastro de ocasião
- Upload real de imagem (PNG ou JPEG)
- Validação de tipo de arquivo
- Salvamento físico em `/public/uploads`
- Persistência no banco via Prisma

### ✅ Listagem de Looks (Dashboard)
- Renderização otimizada com `next/image`
- Lazy loading automático
- Conversão automática para WebP/AVIF
- Responsividade com `sizes`
- Ordenação por data de criação

### ✅ Deleção de Look
- Remove registro do banco
- Remove arquivo físico do servidor
- Atualização automática da interface

### ✅ Tratamento de Erros
- Validação de campos obrigatórios
- Validação de tipo de imagem
- Respostas HTTP apropriadas
- Tratamento de exceções na API

---

## 🧠 Arquitetura do Upload

Fluxo implementado:

Input File → FormData → API Route → File System (/public/uploads) → Prisma → Renderização com next/image

### Backend
- Uso de `req.formData()`
- Conversão com `arrayBuffer()` + `Buffer.from`
- Criação automática da pasta de upload
- Remoção física do arquivo ao deletar registro

### Frontend
- Envio via `FormData`
- Uso de `next/image` para otimização automática
- Lazy loading
- Prevenção de layout shift

---

## 📁 Estrutura do Projeto

```
src/
 ├── app/
 │    ├── dashboard/
 │    ├── api/
 │         └── looks/
 │
 ├── components/

public/
 ├── uploads/
```

---

## ⚙️ Como Rodar o Projeto

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Configurar banco de dados
Configure o arquivo `.env` com sua DATABASE_URL.

### 3️⃣ Rodar migrations
```bash
npx prisma migrate dev
```

### 4️⃣ Iniciar o projeto
```bash
npm run dev
```

Acesse:
```
http://localhost:3000
```

---

## 📸 Otimização de Imagem

O projeto utiliza `next/image` com:

- Lazy loading automático
- Redimensionamento inteligente
- Conversão automática para WebP/AVIF
- Responsividade via `sizes`
- Melhor desempenho em métricas como LCP

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com foco em:

- Implementação de CRUD completo
- Manipulação de arquivos no servidor
- Integração com ORM (Prisma)
- Boas práticas com Next.js App Router
- Estruturação profissional para portfólio
- Organização de código e arquitetura escalável

---

## 🔮 Próximas Melhorias

- Preview da imagem antes do upload
- Paginação com cursor no Prisma
- Upload para Cloudinary ou S3
- Autenticação de usuários
- Deploy em ambiente de produção
- Soft delete
- Confirmação de exclusão com modal customizado

---

## 👨‍💻 Autor

Desenvolvido por Paulo Sérgio  
