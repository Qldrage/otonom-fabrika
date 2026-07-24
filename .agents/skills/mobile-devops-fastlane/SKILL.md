---
name: Mobile DevOps and Deployment (Fastlane)
description: A specialized SRE/DevOps skill allowing agents to automate the tedious process of building, signing, and releasing iOS and Android applications to the App Store and Google Play using Fastlane.
---

# Mobile DevOps and Deployment (Fastlane)

Otonom Fabrika agents must not rely on manual GUI tools (like Xcode or Android Studio) for deployment. All mobile deployments must be 100% automated and autonomous.

## The Tooling: fastlane/fastlane

Fastlane is the easiest way to automate building and releasing iOS and Android apps. It handles all tedious tasks, like generating screenshots, dealing with provisioning profiles, and releasing the application.

## Implementation Protocol (For SRE / DevOps Agents)

1. **No GUI Operations:**
   - When requested to publish a mobile application, do NOT ask the user to open Xcode to archive the project manually.
2. **Setup Fastlane:**
   - Ensure Ruby is installed in the environment.
   - Initialize fastlane in the mobile project root (e.g., inside the `ios` or `android` folder of a React Native app).
3. **Configure the Fastfile:**
   - Write a declarative `Fastfile` using Ruby syntax defining the lanes (e.g., `lane :beta do ... end`, `lane :release do ... end`).
   - Use `match` (or `cert`/`sigh`) for fully automated iOS code signing using a private git repository for certificates.
   - Use `gym` to build the iOS app automatically.
   - Use `deliver` or `supply` to upload the compiled binary, metadata, and screenshots to App Store Connect / Google Play Console.
4. **Autonomous Execution:**
   - Trigger the deployment purely via CLI: `fastlane release`
   - In advanced setups, integrate the `fastlane` execution into GitHub Actions (CI/CD) so that the app deploys automatically upon a merge to the `main` branch.

**CRITICAL RULE:** Mobile deployment must be a single-command operation. If a human needs to click a button in a portal to submit the app, the DevOps automation has failed.
