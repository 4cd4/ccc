<a name="readme-top"></a>

<h1 align="center">VaultMind</h1>

<p align="center">
    <b>A local-first AI document analyst for consulting firms.</b><br />
    Chat with your client documents, use AI Agents — all running privately on your infrastructure.
</p>

<p align="center">
  <a href="https://github.com/4cd4/ccc/blob/master/LICENSE" target="_blank">
      <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=white" alt="License">
  </a> |
  <a href="https://github.com/4cd4/ccc/wiki" target="_blank">
    Docs
  </a> |
  <a href="mailto:support@vaultmind.app">
    Support
  </a>
</p>

---

A full-stack, privacy-first application that enables consulting teams to turn any document, resource, or piece of content into context that any LLM can use as a reference during chatting. VaultMind defaults to **Ollama** and local models so that sensitive client data never leaves your infrastructure.

### Product Overview

VaultMind is a full-stack application where you can use local open-source LLMs (via Ollama, LM Studio, KoboldCPP, and more) or compatible cloud LLMs to build a private ChatGPT with no compromises that you can run entirely on-premises.

VaultMind organises your documents into objects called `clients`. A Client functions like a thread, but with the addition of containerisation of your documents. Clients can share documents, but they do not talk to each other so you can keep your context for each client clean.

## Features

- **Local-first by default** — Ollama pre-selected, telemetry disabled, no cloud dependencies
- **Full MCP-compatibility** for tool integrations
- **No-code AI Agent builder** with customisable agent flows
- 🖼️ **Multi-modal support** (both closed and open-source LLMs)
- **Custom AI Agents** that can browse the web, run code, and more
- 👤 Multi-user instance support and permissioning _(Docker version only)_
- 📖 Multiple document type support (PDF, TXT, DOCX, etc)
- Simple chat UI with Drag-n-Drop functionality and clear citations
- Built-in cost & time-saving measures for managing very large documents
- Full Developer API for custom integrations

### Supported LLMs, Embedders, and Vector Databases

**Large Language Models (LLMs):**

- [Ollama (chat models)](https://ollama.ai/) _(recommended)_
- [LM Studio (all models)](https://lmstudio.ai)
- [LocalAI (all models)](https://localai.io/)
- [KoboldCPP](https://github.com/LostRuins/koboldcpp)
- [Text Generation Web UI](https://github.com/oobabooga/text-generation-webui)
- [Docker Model Runner](https://docs.docker.com/ai/model-runner/)
- [Lemonade by AMD](https://lemonade-server.ai)
- [NVIDIA NIM (chat models)](https://build.nvidia.com/explore/discover)
- [Dell Pro AI Studio](https://www.dell.com/en-us/lp/ai-pcs)
- [Microsoft Foundry Local](https://github.com/microsoft/Foundry-Local)
- [PrivateModeAI (chat models)](https://privatemode.ai/)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [OpenAI (Generic)](https://openai.com) — for any OpenAI-compatible endpoint

**Embedder models:**

- VaultMind Native Embedder (default — runs locally, no API needed)
- [Ollama (all)](https://ollama.ai/)
- [LM Studio (all)](https://lmstudio.ai)
- [LocalAI (all)](https://localai.io/)
- [OpenAI](https://openai.com)
- [Cohere](https://cohere.com/)

**Audio Transcription models:**

- VaultMind Built-in (default)
- [OpenAI](https://openai.com/)

**TTS (text-to-speech) support:**

- Native Browser Built-in (default)
- [PiperTTSLocal - runs in browser](https://github.com/rhasspy/piper)
- [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech/voice-options)
- [ElevenLabs](https://elevenlabs.io/)
- Any OpenAI Compatible TTS service

**STT (speech-to-text) support:**

- Native Browser Built-in (default)

**Vector Databases:**

- [LanceDB](https://github.com/lancedb/lancedb) (default — local, embedded, zero-config)
- [PGVector](https://github.com/pgvector/pgvector)
- [Chroma & ChromaCloud](https://trychroma.com)
- [Weaviate](https://weaviate.io)
- [Qdrant](https://qdrant.tech)
- [Milvus](https://milvus.io)
- [Pinecone](https://pinecone.io)
- [Astra DB](https://www.datastax.com/products/datastax-astra)
- [Zilliz](https://zilliz.com)

### Technical Overview

This monorepo consists of four main sections:

- `frontend`: A ViteJS + React frontend for managing all your content the LLM can use.
- `server`: A NodeJS Express server to handle all the interactions and do all the vectorDB management and LLM interactions.
- `collector`: NodeJS Express server that processes and parses documents from the UI.
- `docker`: Docker instructions and build process + information for building from source.

## 🛳 Self-Hosting

### Docker (Recommended)

```bash
docker pull ghcr.io/4cd4/ccc:latest
docker run -d -p 3001:3001 \
  --cap-add SYS_ADMIN \
  -v ${STORAGE_LOCATION:-.}/anythingllm:/app/server/storage \
  -v ${STORAGE_LOCATION:-.}/collector:/app/collector/hotdir \
  ghcr.io/4cd4/ccc:latest
```

See [`docker/HOW_TO_USE_DOCKER.md`](./docker/HOW_TO_USE_DOCKER.md) for full instructions.

[Or set up a production VaultMind instance without Docker →](./BARE_METAL.md)

## How to setup for development

- `yarn setup` to fill in the required `.env` files you'll need in each of the application sections (from root of repo).
  - Go fill those out before proceeding. Ensure `server/.env.development` is filled or else things won't work right.
- `yarn dev:server` to boot the server locally (from root of repo).
- `yarn dev:frontend` to boot the frontend locally (from root of repo).
- `yarn dev:collector` to then run the document collector (from root of repo).

[Learn about documents](./server/storage/documents/DOCUMENTS.md)

[Learn about vector caching](./server/storage/vector-cache/VECTOR_CACHE.md)

## Telemetry & Privacy

VaultMind ships with **telemetry disabled by default**. We believe your data is yours.

If you choose to enable anonymous telemetry (via `DISABLE_TELEMETRY=false`), it collects only non-identifying usage events (install type, LLM provider, basic feature usage). No IP addresses, document content, or chat data is ever collected.

You can verify these claims by searching for `Telemetry.sendTelemetry` in the source code. The telemetry provider is [PostHog](https://posthog.com/) — an open-source telemetry service.

## 👋 Contributing

- [Contributing to VaultMind](./CONTRIBUTING.md)

## Acknowledgements

VaultMind is a customised fork of [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) by Mintplex Labs Inc. We're grateful to the AnythingLLM team and community for building such a solid foundation.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

Copyright © 2026 4cd4. <br />
This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-222628?style=flat-square
[docker-btn]: ./images/deployBtns/docker.png
[docker-deploy]: ./docker/HOW_TO_USE_DOCKER.md
