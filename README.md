# Slack Clone (Next.js + Convex)

Welcome to the **Slack Clone**, a full-stack messaging application built with **Next.js** on the frontend and **Convex** as the backend service. This project is designed to replicate core Slack functionalities, providing real-time messaging, user authentication, and dynamic channel management.


# data Base Schema
![ERD](https://github.com/mo634/slack-clone/blob/main/diagram-export-13-12-2024-07_03_10.png)

---

## 🚀 Features

- **User Authentication**: Secure login  , signup and ability for using OAuth provider like Github of Google to login  and user session handling.
- **complete CRUD Operations**: ability to create ,delete , update , read the entities of App throug convex functionalities


---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React-based framework)
- **Backend**: [Convex](https://www.convex.dev/) (Serverless backend with real-time data)
- **Styling**: Tailwind CSS and shadcn/ui for modern and responsive UI
- **Authentication**: Convex built-in methods
- **Database**: Convex's built-in data storage

---

## 📋 Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Convex CLI: Install with `npm install -g convex`  

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/slack-clone.git
   cd slack-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Convex backend:
   - Log in to Convex:  
     ```bash
     convex login
     ```
   - Initialize Convex for the project:  
     ```bash
     convex init
     ```

4. Configure environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the required variables:
     ```env
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=<your-nextauth-secret>
     CONVEX_DEPLOYMENT=<your-convex-deployment-url>
     ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

---


---

## 📄 Project Structure

```
└── 📁src
    └── 📁app
        └── 📁auth
            └── page.tsx 
        └── 📁workspaces
            └── 📁[workspaceId]
                └── 📁workspace-components
                    └── Asidebar.tsx
                    └── SidebarIcons.tsx
                    └── Toolbar.tsx
                    └── WorkSpaceSwitcher.jsx
                └── layout.tsx
                └── page.tsx
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── page.tsx
    └── 📁components
        └── 📁auth
            └── 📁api
                └── use-current-user.tsx
            └── 📁auth-components
                └── FormInput.tsx
                └── ProviderButton.tsx
                └── user-button.tsx
            └── auth-screen.tsx
            └── sign-in-card.tsx
            └── sign-up-card.tsx
            └── types.ts
        └── 📁ui
            └── avatar.tsx
            └── button.tsx
            └── card.tsx
            └── dialog.tsx
            └── dropdown-menu.tsx
            └── input.tsx
            └── separator.tsx
            └── sonner.tsx
        └── 📁workspaces
            └── 📁api
                └── use-create-work-space.tsx
                └── use-get-work-spaces.tsx
                └── use-get-workspace.tsx
            └── 📁components
                └── create-work-spaces-modal.tsx
            └── 📁hooks
                └── use-get-workspace-id.tsx
            └── 📁store
                └── modalAtom.tsx
        └── convexProvider.tsx
        └── Loader.jsx
        └── models.tsx
    └── 📁lib
        └── utils.ts
    └── middleware.ts
```
Happy coding! 🚀
