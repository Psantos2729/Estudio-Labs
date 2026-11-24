# Graph Report - estudio-labs  (2026-11-24)

## Corpus Check
- 53 files · ~5,355 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 2, .example 1)

## Summary
- 226 nodes · 365 edges · 13 communities (10 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e4ffc8d4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- AuthProvider.tsx
- steps
- masteryView.ts
- mapStore.ts
- compilerOptions
- line-limit.test.mjs
- scripts
- lint
- public.handle_new_user
- test-db.sh
- README.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `scripts` - 11 edges
3. `MapPage()` - 9 edges
4. `displayId()` - 8 edges
5. `react` - 8 edges
6. `ModuleDef` - 7 edges
7. `useAuth()` - 7 edges
8. `LoginPage()` - 7 edges
9. `ModuleView` - 6 edges
10. `App()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Props` --references--> `ModuleView`  [EXTRACTED]
  src/features/map/ModuleList.tsx → src/features/map/masteryView.ts
- `App()` --calls--> `MapPage()`  [EXTRACTED]
  src/app/App.tsx → src/features/map/MapPage.tsx
- `useModuleViews()` --calls--> `useAuth()`  [EXTRACTED]
  src/features/map/useMastery.ts → src/features/auth/AuthProvider.tsx
- `LoginPage()` --calls--> `Panel()`  [EXTRACTED]
  src/features/auth/LoginPage.tsx → src/ui/primitives/Panel.tsx
- `public.module_mastery` --references--> `public.modules`  [EXTRACTED]
  supabase/migrations/20261124000003_module_mastery.sql → supabase/migrations/20261124000001_catalog.sql

## Import Cycles
- None detected.

## Communities (13 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (31): devDependencies, eslint@^9.39.5, @eslint/js@^9.39.5, eslint-plugin-react-hooks@^5.2.0, globals@^16.5.0, lefthook@^1.13.6, @types/node@^22.20.5, @types/react@^19.3.0 (+23 more)

### Community 1 - "AuthProvider.tsx"
Cohesion: 0.10
Nodes (27): dependencies, react@^19.3.1, react-dom@^19.3.1, react-router-dom@^7.18.7, @supabase/supabase-js@^2.119.2, @tanstack/react-query@^5.108.4, react, react-dom (+19 more)

### Community 2 - "steps"
Cohesion: 0.08
Nodes (28): runs-on, services, steps, DATABASE_URL, POSTGRES_DB, POSTGRES_PASSWORD, jobs, database (+20 more)

### Community 3 - "masteryView.ts"
Cohesion: 0.10
Nodes (29): ADR-0005, files, MODULES, modules, root, BossChallenge, displayId(), ModuleDef (+21 more)

### Community 4 - "mapStore.ts"
Cohesion: 0.40
Nodes (4): ADR-0008, zustand@^5.1.0, zustand, MapState

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+10 more)

### Community 6 - "line-limit.test.mjs"
Cohesion: 0.18
Nodes (11): config, violations, countLines(), findViolations(), listFiles(), config, arr(), modules (+3 more)

### Community 7 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check-lines, dev, lint, prepare, preview, seed (+3 more)

### Community 8 - "lint"
Cohesion: 0.22
Nodes (8): run, check-lines, lint, glob, run, pre-commit, commands, parallel

### Community 9 - "public.handle_new_user"
Cohesion: 0.22
Nodes (7): public.exercises, public.modules, public.profiles, public.module_mastery, on_auth_user_created, public.handle_new_user(), auth.users

## Knowledge Gaps
- **4 isolated node(s):** `ADR-0006`, `ADR-0005`, `ADR-0006`, `ADR-0008`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 87 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `package.json` to `masteryView.ts`, `line-limit.test.mjs`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **What connects `ADR-0006`, `ADR-0005`, `ADR-0006` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08571428571428572 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `AuthProvider.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10099573257467995 - nodes in this community are weakly interconnected._
- **Why does `react` connect `AuthProvider.tsx` to `package.json`, `masteryView.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `steps` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._