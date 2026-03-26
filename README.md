# AgentFlow

AI Agent 工作流平台 — 角色模型中心 + Skill 技能市场 + MCP 配置 + 可视化工作流设计器

## 项目结构

```
agentflow/
├── frontend/          # Next.js 14 前端 (App Router + TypeScript + Tailwind)
├── backend/           # Node.js + Fastify API 服务 + Prisma ORM
├── ai-engine/         # Python FastAPI AI 执行层 (LangChain / LangGraph)
├── packages/
│   └── shared-types/  # 前后端共享 TypeScript 类型
├── docker-compose.yml # 基础设施 (PostgreSQL + Redis + MinIO)
└── turbo.json         # Monorepo 配置 (Turborepo)
```

## 快速开始

### 1. 启动基础设施

```bash
docker compose up -d
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 初始化数据库

```bash
cd backend
pnpm db:generate
pnpm db:migrate
```

### 4. 启动开发服务

```bash
# 根目录一键启动前端 + 后端
pnpm dev

# 单独启动 AI 引擎（Python >= 3.8）
cd ai-engine
pip install -r requirements.txt
PYTHONPATH=. uvicorn app.main:app --reload --port 8000

# 可选：接入 LangChain / LangGraph / MCP（需 Python >= 3.10）
# pip install -r requirements-ai.txt
```

## 服务端口

| 服务 | 地址 |
|---|---|
| 前端 | http://localhost:3000 |
| 后端 API | http://localhost:3101 |
| API 文档 | http://localhost:3101/docs |
| AI 引擎 | http://localhost:8000 |
| AI 引擎文档 | http://localhost:8000/docs |
| MinIO 控制台 | http://localhost:9001 |

## 技术栈

- **前端**: Next.js 14 · TypeScript · TailwindCSS · ReactFlow · Zustand · React Query
- **后端**: Node.js · Fastify · Prisma · PostgreSQL · Redis
- **AI 层**: Python · FastAPI · LangChain · LangGraph · MCP
- **存储**: PostgreSQL (pgvector) · Redis · MinIO
