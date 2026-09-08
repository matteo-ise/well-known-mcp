# well-known-mcp

<div align="center">
  <img src="https://img.shields.io/badge/Agentic-Commerce-19C332?style=for-the-badge" alt="Agentic Commerce" />
  <img src="https://img.shields.io/badge/Status-Pioneer-white?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
</div>

> [!NOTE]
> **Proof of Concept & Infrastructure Blueprint**
> This repository is part of a conceptual infrastructure for Agentic Commerce. It serves as a **Proof of Concept (PoC)** and framework blueprint. The code is experimental and intended as a starting point for developers to build their own M2M and agent systems. It is not yet a production-ready release.

The agent economy requires a standardized discovery protocol. Agents need to find out if a domain offers Model Context Protocol (MCP) endpoints, what tools are available, and how authentication is handled. This repository is the reference implementation for discovery via `/.well-known/mcp.json`.

## Why Agent Discovery
When agents interact autonomously, they need standardized interfaces. `well-known-mcp` bridges the gap between web presence and agentic interaction.

## Packages
1. **@well-known-mcp/validator:** Validates `mcp.json` against the official JSON Schema.
2. **@well-known-mcp/generator:** Interactive CLI for standard-compliant `mcp.json` generation.
3. **@well-known-mcp/middleware:** Express/Hono Middleware for Node.js.
