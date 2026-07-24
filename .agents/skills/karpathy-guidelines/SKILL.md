---
name: Karpathy Guidelines
description: Strict behavioral constraints to reduce common LLM coding mistakes (over-engineering, hallucination, unnecessary refactoring). Derived from Andrej Karpathy's recommendations.
---

# Karpathy Guidelines

These rules are absolute behavioral constraints for all AI Agents (especially Qwen / Coder) operating within Otonom Fabrika. They are designed to prevent AI systems from acting like "blind autocomplete machines" and force them to act like disciplined Senior Engineers.

## 1. Think Before Coding (Tahmin Etme, Sor)
**Don't assume. Don't hide confusion. Surface tradeoffs.**
- Before implementing anything, state your assumptions explicitly.
- If multiple interpretations of a task exist, present them. DO NOT pick one silently.
- If a simpler approach exists, propose it first. Push back against the user or the Architect when warranted.
- If something is unclear or underspecified, STOP. Do not guess. Ask for clarification.

## 2. Simplicity First (Sıfır Aşırı-Mühendislik)
**Minimum code that solves the problem. Nothing speculative.**
- Write NO features beyond what was strictly asked.
- NO abstractions for single-use code. Do not build abstract factory classes or complex interfaces if a simple function suffices.
- NO "flexibility" or "configurability" that wasn't requested.
- Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, rewrite and simplify it.

## 3. Surgical Changes (Cerrahi Müdahale)
**Touch only what you must. Clean up only your own mess.**
- When editing existing code, DO NOT "improve" adjacent code, comments, or formatting just because you are there.
- DO NOT refactor things that aren't broken unless explicitly told to do so.
- Match existing style perfectly, even if you prefer a different style.

## 4. Define Verifiable Success Criteria
**Know when you are done.**
- Before starting a multi-step task, define what success looks like.
- Do not enter endless iteration loops. If it passes the test, stop coding.

> **Factory Directive:** Any agent caught violating these guidelines (e.g., rewriting an entire file just to fix a 1-line typo, or adding unrequested UI themes) will be flagged for non-compliance.
