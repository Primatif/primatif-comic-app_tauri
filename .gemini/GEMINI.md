---
name: "Project Constitution and AI Core Directives"
purpose: "Defines the foundational principles, scope, and top-level operational rules for the AI within this project. This is the primary entry point for all context."
modification_date: "2025-07-21"
tags: ["root", "core", "project-guidelines", "index"]
---

# AI Constitution & Core Directives

This document sets the foundational rules for AI interaction within this project. All other `GEMINI.md` files build upon and must cohere with the principles defined here.

## 1. Project Overview

- **Project Name**: To be defined.
- **Purpose**: To be defined.
- **Primary Technologies**: To be defined.

## 2. AI Core Directives

These are the fundamental principles governing all AI actions.

1.  **Primacy of Specificity**: The instructions in the most specific `GEMINI.md` file for a given task take precedence. A rule in `/.gemini/standards/golang/GEMINI.md` will always override a conflicting general rule in `/.gemini/standards/GEMINI.md` or this root file.

2.  **Systematic Discovery Protocol**: To ensure token efficiency, do not read files arbitrarily. When seeking context, follow this path:
    a. Start with this root file (`/.gemini/GEMINI.md`).
    b. Consult the **Context Directory Index** (Section 3) to find the correct category (e.g., `standards/`).
    c. Read the `GEMINI.md` file within that category directory (e.g., `/.gemini/standards/GEMINI.md`). This is an index file.
    d. From the index, identify the correct topic file (e.g., `/.gemini/standards/golang/GEMINI.md`) and read it for the specific, final instructions.

3.  **Adherence to Standards**: All code, documentation, and other artifacts generated or modified must strictly adhere to the guidelines defined in the relevant `GEMINI.md` topic files.

4.  **Mimicry of Style**: In the absence of an explicit standard, mimic the style, structure, and conventions of existing, high-quality code and documentation within the project.

5.  **Proactive, but Cautious Execution**: Fulfill requests thoroughly and anticipate logical next steps. However, for any action that is ambiguous, destructive, or outside the clear scope of a request, you must seek clarification before proceeding.

6.  **Metadata Mandate**: All `GEMINI.md` files **must** begin with the specified YAML frontmatter (metadata). This is non-negotiable.

7.  **Principle of Hierarchical Normalization**: To maintain context efficiency, standards and guidelines must be defined at the highest possible level of the `.gemini/` hierarchy. Cross-cutting principles that apply to multiple areas (e.g., general testing strategies) should reside in a parent `GEMINI.md` file, while specific implementations belong in child files. Proactively refactor and reorganize the `.gemini/` directory structure as the project evolves to uphold this principle.

## 3. Context Directory Index

This table serves as the top-level index for all project context. Use it to navigate to the correct category for any given task.

| Category Directory | Purpose & Scope                                                                |
| :----------------- | :----------------------------------------------------------------------------- |
| `standards/`       | Contains all coding, documentation, and operational standards for the project. |
| `documentation/`   | (Example) Defines rules and structure for user and developer documentation.    |
| `workflows/`       | (Example) Describes common developer workflows, like debugging or releases.    |
