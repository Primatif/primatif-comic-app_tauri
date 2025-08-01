---
name: "Project Constitution and AI Core Directives"
purpose: "Primary entry point for all context."
tags: ["root", "core", "project-guidelines", "index"]
---

# AI Constitution & Core Directives

This document sets foundational rules for AI interaction. All other `GEMINI.md` files build upon and cohere with these principles.

## 1. Project Overview

- **Project Name**: Primatif Comics
- **Purpose**: Create a comic panel creator application. Users generate pages/collections with panels, vector objects, and perspective grids. Pages can be exported.
- **Primary Technologies**: Tauri 2.0, Rust, SolidJS, PixiJS (V8), Web Assembly, WebGPU, SQLite, Vite, Bun, GeminiCL

## 2. AI Core Directives

Fundamental principles governing all AI actions:

1. **Primacy of Specificity**: Instructions in the most specific `GEMINI.md` file for a task take precedence. E.g., `/.gemini/standards/golang/GEMINI.md` overrides `/.gemini/standards/GEMINI.md` or this root file.

2. **Systematic Discovery Protocol**: For token efficiency, avoid arbitrary file reads. When seeking context, follow this path:
    a. Start with this root file (`/.gemini/GEMINI.md`).
    b. Consult **Context Directory Index** (Section 3) for the correct category (e.g., `standards/`).
    c. Read the `GEMINI.md` index file within that category (e.g., `/.gemini/standards/GEMINI.md`).
    d. From the index, identify and read the specific topic file (e.g., `/.gemini/standards/golang/GEMINI.md`).

3. **Adherence to Standards**: All generated/modified artifacts must strictly adhere to guidelines in relevant `GEMINI.md` topic files.

4. **Mimicry of Style**: Absent explicit standards, mimic existing high-quality code/documentation style, structure, and conventions.

5. **Proactive, but Cautious Execution**: Fulfill requests thoroughly; anticipate logical next steps. Seek clarification for ambiguous, destructive, or out-of-scope actions before proceeding.

6. **Metadata Mandate**: All `GEMINI.md` files **must** begin with the following YAML frontmatter (metadata) fields: `name`, `purpose`, and `tags`. This is non-negotiable.

7. **Principle of Hierarchical Normalization**: For context efficiency, define standards/guidelines at the highest `.gemini/` hierarchy level. Cross-cutting principles belong in parent `GEMINI.md` files; specific implementations in children. Proactively refactor `.gemini/` to uphold this.

## 3. Context Directory Index

Top-level index for project context. Use to navigate to the correct category.

| Category Directory | Purpose & Scope                                                                |
| :----------------- | :----------------------------------------------------------------------------- |
| `standards/`       | Contains all coding, documentation, and operational standards.                 |
| `documentation/`   | Defines rules and structure for user and developer documentation.              |
| `workflows/`       | Describes common developer workflows (debugging, releases).                    |