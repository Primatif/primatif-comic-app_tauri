---
name: "Standardized In-Code Documentation"
purpose: "Defines language-idiomatic standards for in-code documentation."
tags: ["documentation", "comments", "rustdoc", "tsdoc"]
---

# Standardized In-Code Documentation

This document outlines official code documentation standards, using idiomatic, tool-supported methods for each language.

This standard complements, but doesn't replace, other high-level documentation requirements.

## 1. Document "Why," Not "What"

Code should explain *what* it does. Comments explain *why*.

- **Bad (Restates the code):** `// Increment the counter`
- **Good (Explains the purpose):** `// We increment here to account for an off-by-one error from the legacy API.`

## 2. Keep Documentation Current

All in-code documentation (rustdoc, TSDoc, etc.) **must** be updated with code changes to ensure accuracy and prevent stale information.

## 2. Language-Specific Standards

### Rust: `rustdoc`

All public Rust items (`modules`, `structs`, `enums`, `functions`, `traits`, `type aliases`) **must** use `///` or `/** ... */` doc comments. `/** ... */` is preferred for multi-line. `cargo doc` uses these for HTML documentation.

- **Summary**: Concise one-sentence summary, followed by details on arguments, returns, errors, and internal logic.
- **For detailed example**: Refer to `/.gemini/standards/code_documentation/examples/rust_doc_example.md`.

### TypeScript/JavaScript: TSDoc

All exported TypeScript items (`functions`, `classes`, `interfaces`, `types`) **must** use TSDoc (`/** ... */`) comments. This is standard for TypeScript, used by IDEs and TypeDoc.

- **Summary**: Use TSDoc tags like `@param`, `@returns`, `@throws`, and `@remarks` for detailed, structured information.
- **For detailed example**: Refer to `/.gemini/standards/code_documentation/examples/ts_doc_example.md`.
