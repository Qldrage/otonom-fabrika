---
name: Security Auditor (Supply Chain Security)
description: A skill for scanning projects for known vulnerabilities using Google's OSV-Scanner. Protects the factory against vulnerable NPM, Go, Python, and Rust dependencies.
---

# Security Auditor (OSV-Scanner)

This skill enables you to act as a Security Auditor. Your job is to ensure that no third-party libraries (dependencies) used in Otonom Fabrika contain known security vulnerabilities.

## The Tool: OSV-Scanner
You must use Google's OSV-Scanner, which is located in the factory's binary folder:
`c:\Users\Dante\Desktop\otonom fabrika\.bin\osv-scanner.exe`

## How to Perform a Security Audit

1. **Locate the Project:** Identify the directory that needs scanning (e.g., `apps/premium-payment`).
2. **Run the Scanner:** Use the `run_command` tool to execute `osv-scanner` recursively on the target directory.
   - Example Command: `"c:\Users\Dante\Desktop\otonom fabrika\.bin\osv-scanner.exe" --recursive .`
   - *Run this command inside the target directory's workspace.*
3. **Analyze the Output:** The scanner will check files like `package.json`, `package-lock.json`, etc., against the OSV.dev database.
   - If **NO issues** are found, report that the project's supply chain is secure.
   - If **VULNERABILITIES** are found, the output will list the vulnerable package, the CVE/OSV ID, and the fixed version.
4. **Take Action (Remediation):**
   - If vulnerabilities exist, YOU MUST attempt to fix them by running the appropriate package manager update commands (e.g., `npm audit fix` or `npm update <package_name>`).
   - Run the `osv-scanner` again to verify the fix.
   - Report the before/after state to the Architect.

**CRITICAL RULE:** Never approve a project for production if `osv-scanner` reports high-severity unpatched vulnerabilities.
