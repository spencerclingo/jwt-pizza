# Penetration Test Report

**Peer 1:** Spencer Clingo (pizza.pizza-spencer.click)
**Peer 2:** German Rios-Lazo (pizza.germanrl.click)

## Self Attack

**Attacker:** Peer 1
**Target:** pizza.pizza-spencer.click

### Attack 1: Default Admin Login

-   **Date:** December 9, 2025
-   **Classification:** Identification and Authentication Failures
-   **Severity:** 0 - Unsuccessful
-   **Description:** Attempted to login with default system admin username and password. The system correctly rejected the default credentials.
-   **Corrections:** Default accounts were previously removed/secured.

### Attack 2: Password Change

-   **Date:** December 9, 2025
-   **Classification:** Broken Access Control
-   **Severity:** 0 - Unsuccessful
-   **Description:** Attempted to login with a diner account default password. Access was denied.
-   **Corrections:** Default accounts were previously removed/secured.

### Attack 3: Admin Login Bypass (HTML Edit)

-   **Date:** December 9, 2025
-   **Classification:** Broken Access Control
-   **Severity:** 0 - Unsuccessful
-   **Description:** Attempted to login to admin account with no password by editing the HTML form to bypass client-side checks. Server rejected the empty password.
-   **Corrections:** Server-side validation handles missing password fields correctly.

### Attack 4: SQL Injection (Name Parameter)

-   **Date:** December 9, 2025
-   **Classification:** Injection
-   **Severity:** 0 - Unsuccessful
-   **Description:** Attempted to update all passwords by injecting a SQL query into the name parameter of a user update request. The attack failed to alter the database.
-   **Corrections:** Input sanitization prevents SQL injection in the User PUT endpoint.

## Self Attack

**Attacker:** Peer 2
**Target:** pizza.germanrl.click

### Attack 1:

---

## Peer Attack

**Attacker:** Peer 1
**Target:** pizza.germanrl.click

### Attack 1: Default Admin Login

-   **Date:** December 9, 2025
-   **Classification:** Security Misconfiguration
-   **Severity:** 3 - High
-   **Description:** Login with default admin username and password was successful. This granted full administrative access, allowing the attacker to do anything an admin can do.
-   **Corrections:** Change default admin credentials immediately upon deployment.

### Attack 2: Password Change

-   **Date:** December 9, 2025
-   **Classification:** Broken Access Control
-   **Severity:** 2 - Medium
-   **Description:** Logged in with a default diner account and successfully changed a the user's password, locking the original account owner out of the account. If payment information were stored in accounts, that would also be compromised.
-   **Corrections:** Verify that the user requesting the change matches the ID of the user being modified in the backend service.

### Attack 3: Admin Login Bypass (HTML Edit)

-   **Date:** December 9, 2025
-   **Classification:** Broken Access Control
-   **Severity:** 3 - High
-   **Description:** Successfully logged into the admin account without a password by editing the HTML input field. This provides free access to any account as long as you know the email.
-   **Corrections:** Implement strict server-side validation to ensure password fields are not empty, regardless of client-side HTML state.

### Attack 4: SQL Injection (User ID)

-   **Date:** December 9, 2025
-   **Classification:** Injection
-   **Severity:** 0 - Unsuccessful
-   **Description:** Attempted to update all users with a SQL injection attack in the `userId`. The attack failed as it was blocked by the original code.
-   **Corrections:** None needed (Attack blocked).

### Attack 5: SQL Injection (Franchise Request)

-   **Date:** December 9, 2025
-   **Classification:** Injection
-   **Severity:** 0 - Unsuccessful
-   **Description:** Attempted SQL injection into `getFranchises` request. Failed because Node.js MySQL driver automatically rejects multi-query (stacked) queries.
-   **Corrections:** None needed (Attack blocked).

### Attack 6: SQL Injection (Name Parameter)

-   **Date:** December 9, 2025
-   **Classification:** Injection
-   **Severity:** 4 - Critical
-   **Description:** Successfully updated passwords by injecting a SQL query into the `name` parameter of a user update request. Because the password field is processed first in the code, the injected SQL was included and set all passwords to the new password.
    -   **Payload:** `{"name":"hacker\" WHERE 1=1#", "password":"password"}`.
    -   **Impact:** Any account where the email is known can be accessed. Emails could also be changed using a similar tactic.
-   **Corrections:** Sanitize all user inputs in the update endpoints. Use parameterized queries.

## Peer Attack

**Attacker:** Peer 2
**Target:** pizza.pizza-spencer.click

### Attack 1:

---

## Combined Summary of Learnings

Through this penetration testing exercise, we identified that **Input Sanitization** and **Default Credentials** are critical vulnerabilities.

TODO: Expand on these learnings 
