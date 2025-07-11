// /docs/SPECIFICATION.md
# Systematic Synthesis: Hypervisor & Construct Protocol Specification

**Version:** 1.0
**Date:** 2025-07-08
**Status:** Finalized Concept

## 1. Overview

This document specifies the architecture for the "Systematic Synthesis" project. The project is a SvelteKit application that functions as a **Hypervisor**, a secure management and hosting layer for a collection of sandboxed, dynamically deployed Single-Page Applications known as **Constructs**.

The system provides a private **Hypervisor Control Panel** (the Superuser Route) for The Architect to manage the main portfolio website and to deploy, configure, and monitor all hosted Constructs. The architecture is designed to be secure, scalable, and framework-agnostic for the guest applications, leveraging the Cloudflare serverless ecosystem.

---

## 2. Core Architecture & Technology Stack

The system is built on a "Hypervisor-Construct" model. The SvelteKit application is the Hypervisor, and the sandboxed SPAs are the Constructs.

### 2.1. Technology Stack

| Component                  | Service                  | Purpose                                                           |
| -------------------------- | ------------------------ | ----------------------------------------------------------------- |
| **Execution Environment**  | Cloudflare Pages/Workers | Hosts the SvelteKit Hypervisor application and all server-side logic. |
| **Construct Bundle Storage** | Cloudflare R2            | Stores the static asset bundles for all Constructs in a private bucket. |
| **Metadata & Manifests**   | Cloudflare Workers KV    | Stores Construct manifests and Cipher-to-ID mappings for fast reads. |
| **User & Relational Data**   | Cloudflare D1            | Stores user accounts and structured data for host-provided services. |
| **Secrets Management**     | Worker Secrets           | Securely stores all sensitive credentials (JWT secret, API keys).   |

### 2.2. Architectural Principles

*   **Database of Record:** The system is stateless. The local filesystem is not used for persistence. All state (Construct bundles, metadata, user data) is stored in the designated Cloudflare services.
*   **Services on Demand:** The Hypervisor provides a catalogue of backend services (data, real-time, etc.) that Constructs can request declaratively via their manifest file.
*   **Zero-Trust Asset Serving:** The Hypervisor acts as a mandatory, authenticated proxy for all Construct assets. Direct links to the underlying R2 storage are never exposed to the client.

---

## 3. The Construct Package Specification

A Construct is deployed as a `.zip` archive. This archive represents a self-contained application package.

### 3.1. Package Structure

The root of the `.zip` archive must contain:

1.  **`cipher-manifest.json`**: The mandatory service contract file.
2.  **Application Bundle**: The static output of a framework's build process (e.g., a `dist` or `build` folder). All asset paths within this bundle **must be relative** (e.g., `./assets/app.js`).

### 3.2. The Construct Manifest (`cipher-manifest.json`)

This file defines the Construct's properties and resource requirements.

**Schema:**
```json
{
  "manifestVersion": "1.0",
  "title": "A Human-Readable Title for the Construct",
  "entrypoint": "./index.html",
  "auth": {
    "level": "public"
  },
  "services": {
    "kvStore": null,
    "websocket": null,
    "cron": null
  }
}
```

**Field Explanations:**

| Field               | Type   | Required | Description                                                                                                                                                                                             |
| ------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `manifestVersion`   | String | Yes      | The version of the manifest schema being used (e.g., `"1.0"`).                                                                                                                                          |
| `title`             | String | Yes      | The title of the Construct, used for the browser tab's `<title>` tag.                                                                                                                                   |
| `entrypoint`        | String | Yes      | The relative path to the main HTML file within the bundle.                                                                                                                                              |
| `auth`              | Object | Yes      | Defines the authentication and authorization requirements for the Construct. See section 3.2.1.                                                                                                         |
| `services`          | Object | Yes      | A key-value map of requested server-side services. A `null` value indicates the service is not needed. An object value configures the service. See section 3.2.2.                                        |

#### 3.2.1. The `auth` Object

| Field         | Type   | Required | Description                                                                                                                            |
| ------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `level`       | String | Yes      | Access level. Must be `"public"` (accessible to all with the Cipher) or `"private"` (requires user login after Cipher entry).          |
| `permissions` | Array  | No       | An array of string permissions (e.g., `["chat:post"]`) that the Hypervisor's service APIs will check for when processing user requests. |

#### 3.2.2. The `services` Object

This object contains configurations for optional, on-demand backend services.

*   **`kvStore`**:
    *   **Purpose:** Provides access to a sandboxed key-value store.
    *   **Schema:** `{ "scopes": ["scope1", "scope2"] }`
    *   **Behavior:** The Hypervisor exposes KV API endpoints and namespaces all keys with `[constructId]:[scope]:...`.

*   **`websocket`**:
    *   **Purpose:** Enables real-time communication.
    *   **Schema:** `[{ "path": "/chat", "mode": "room", "authRequired": true }]`
    *   **Behavior:** An array of endpoint configurations. The Hypervisor instantiates a WebSocket server for each entry at `/cipher/view/[id]/[path]`. `mode` can be `"broadcast"` (simple relay) or `"room"` (supports user-based room logic).

*   **`cron`**:
    *   **Purpose:** Schedules automated backend tasks.
    *   **Schema:** `[{ "schedule": "0 0 * * *", "action": { ... } }]`
    *   **Behavior:** An array of job definitions. The `action` object specifies a safe, predefined operation on another service (e.g., `{ "service": "kvStore", "operation": "clearScope", "params": { "scope": "daily_scores" } }`). This prevents arbitrary code execution.

---

## 4. Authentication & Authorization Protocol

*   **Primary Token:** A single, `HttpOnly`, `Secure`, `SameSite=Strict` cookie named `sys-access-token` is used for session management. It contains a server-signed JWT. This cookie is never accessible to client-side JavaScript.
*   **Login Flow:** For `private` Constructs, the Hypervisor presents a login/registration wall after a valid Cipher is entered. Upon successful login, the `sys-access-token` cookie is set.
*   **Zero-Knowledge SPA:** The sandboxed SPAs are designed to be "zero-knowledge" regarding the authentication token. They make standard `fetch` requests to the Hypervisor's API endpoints, and the browser automatically and securely attaches the `HttpOnly` cookie.
*   **Client-Side Identity:** To get user data for UI purposes, the SPA must call a dedicated `/api/users/me` endpoint. The Hypervisor validates the session from the cookie and returns a JSON object with non-sensitive user data (e.g., `{ id, name }`).

---

## 5. Hypervisor Routing & APIs

*   **`/cipher`**: The public gateway. A page with a single input field that accepts a Cipher code and validates it against the KV store. On success, it redirects to the appropriate viewer route.
*   **`/cipher/auth/[constructId]`**: The auth wall presented for private Constructs.
*   **`/cipher/view/[constructId]/[...assetpath]`**: The Universal Asset Server. This is a SvelteKit `+server.ts` file that handles all requests for Construct assets.
    *   **Logic:** It authenticates the user via cookie, authorizes access based on the Construct's manifest, and then streams the requested asset from the private R2 bucket to the client.
*   **`/api/services/...`**: A namespace for API endpoints that provide the host services (e.g., `/api/services/kv/get`, `/api/services/kv/set`). These endpoints enforce authentication and data sandboxing.

---

## 6. The Hypervisor Control Panel (`/superuser`)

The Superuser Route is a secure, private dashboard for The Architect to manage the entire system.

*   **Access:** Gated by a global, keyboard-sequence-triggered command prompt that leads to a password challenge. Successful authentication sets the primary session cookie.
*   **Modules:**
    1.  **Cipher Engine:** A full CRUD interface for managing Constructs. This includes uploading new `.zip` bundles, updating existing ones, and editing manifests in-browser.
    2.  **Service Monitoring:** A read-only view of the system's state, including a browser for R2 buckets, a data inspector for D1/KV, and a monitor for live WebSocket and Cron services.
    3.  **User Management:** A dashboard for administering user accounts that can access private Constructs.
    4.  **Nexus CMS:** A simple content management interface for the main public portfolio website.

This specification outlines a robust, secure, and highly flexible platform for hosting sandboxed applications, providing The Architect with absolute control through a centralized and powerful Hypervisor Control Panel.