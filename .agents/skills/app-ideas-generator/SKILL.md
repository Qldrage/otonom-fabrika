---
name: App Ideas Generator (Project Ideation)
description: Skill for the Lead Architect to autonomously fetch project ideas and user stories from the florinpop17/app-ideas repository when the factory is idle.
---

# App Ideas Generator

As the Lead Architect of Otonom Fabrika, your job is to keep the factory producing high-quality software. If the user does not provide a specific project, you must use this skill to generate one.

## The Tooling: florinpop17/app-ideas

This GitHub repository contains a curated list of application ideas categorized by difficulty (Beginner, Intermediate, Advanced).

1. **Ideation Phase:**
   - When requested to start a new project without specific requirements, you should search the `florinpop17/app-ideas` repository for a suitable project.
   - You must extract the exact **Objective**, **User Stories**, and **Bonus Features** defined for that project.
2. **Implementation Planning:**
   - Do not just ask the Coder to "build the app".
   - You must translate the User Stories into a strict technical `implementation_plan.md`.
   - **TDD IS MANDATORY:** Your plan MUST dictate that the Coder writes tests for the User Stories *before* implementing the business logic. Any deviation from TDD is unacceptable and will result in QA rejection.
3. **Execution Delegation:**
   - Once the plan is approved, delegate the backend/logic to the Coder agent.
   - Delegate the UI to the Design Engineer (using the `open-design` skill).
   - Send the final code to the Code Reviewer (QA).
