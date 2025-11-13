# TanStack Router + Mantine Starter

A modern React application built with **TanStack Router** and **Mantine UI**, featuring a powerful multi-step wizard with conditional logic and form validation.

## ✨ Features

- 🎯 **Type-Safe Routing** - File-based routing with TanStack Router
- 🎨 **Modern UI** - Beautiful components with Mantine v8
- 📝 **Smart Wizard** - Multi-step form with:
  - Dynamic field validation
  - Conditional question skipping
  - Progress tracking
  - Smooth transitions
- ✅ **Form Validation** - Mantine Form with custom validators
- 🔄 **PostCSS** - Modern CSS with Mantine preset
- 🚀 **Fast Development** - Vite for instant HMR
- 📦 **TypeScript** - Full type safety throughout

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run serve
```

## 📁 Project Structure

```
src/
├── features/
│   └── Wizard/                    # Wizard feature module
│       ├── components/
│       │   ├── Wizard/           # Main wizard component
│       │   └── WizardQuestion/   # Individual question renderer
│       ├── types/
│       │   └── question.type.ts  # TypeScript interfaces
│       ├── utils/
│       │   ├── build-validation-rules.ts
│       │   ├── build-initial-values.ts
│       │   ├── questions.ts      # Question definitions
│       │   └── validation-schemas.ts
│       └── ...
├── routes/                        # File-based routes
│   ├── __root.tsx                # Root layout
│   ├── index.tsx                 # Home page
│   └── wizard.tsx                # Wizard page
└── main.tsx                      # App entry point
```

## 🧙 Wizard Feature

The wizard component supports advanced form flows with:

### Conditional Logic

Questions can be conditionally shown based on previous answers:

```typescript
{
  id: 'university',
  title: 'What university do you attend?',
  skipConditions: [
    (answers) => Number(answers.age) < 18  // Skip if under 18
  ]
}
```

### Validation

Built-in Mantine validators with custom rules:

```typescript
import { hasLength, isEmail } from '@mantine/form';

{
  id: 'email',
  title: 'Your email',
  validationRule: isEmail('Invalid email address')
}
```

### Custom Validators

```typescript
{
  id: 'age',
  validationRule: (value) => {
    const num = Number(value);
    if (isNaN(num)) return 'Must be a number';
    if (num < 18) return 'Must be 18 or older';
    return null; // Valid
  }
}
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 |
| **Routing** | TanStack Router v1 |
| **UI Library** | Mantine v8 |
| **Forms** | Mantine Form + Mantine Form Zod Resolver |
| **Validation** | Zod |
| **Build Tool** | Vite 7 |
| **Language** | TypeScript 5 |
| **CSS** | PostCSS with Mantine preset |
| **Testing** | Vitest |

## 📝 Adding Routes

TanStack Router uses file-based routing. Create a new file in `src/routes/`:

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return <div>About Page</div>
}
```

The route is automatically available at `/about`.

## 🎨 Styling

This project uses:

- **Mantine Components** - Pre-built, accessible UI components
- **CSS Modules** - Scoped styling with `.module.css` files
- **PostCSS** - Modern CSS features and transformations
- **CSS Variables** - For theming and design tokens

### Customizing Theme

Edit `src/routes/__root.tsx`:

```tsx
<MantineProvider theme={{
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
}}>
  <Outlet />
</MantineProvider>
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build |
| `npm run test` | Run tests |

## 📚 Key Concepts

### Controlled vs Uncontrolled Forms

This project uses **controlled mode** for forms to ensure immediate state synchronization:

```typescript
const form = useForm({
  mode: 'controlled', // ✅ Values sync immediately
  initialValues: { ... },
  validate: { ... }
});
```

### Conditional Validation

Validation rules automatically skip hidden fields:

```typescript
validate: questions.reduce((acc, question) => {
  acc[question.id] = (value, values) => 
    question.skipConditions?.some(condition => condition(values))
      ? null  // Skip validation
      : question.validationRule(value, values, question.id);
  return acc;
}, {})
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📖 Learn More

- [TanStack Router Docs](https://tanstack.com/router)
- [Mantine Documentation](https://mantine.dev)
- [Mantine Form Validation](https://mantine.dev/form/validation/)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using TanStack Router and Mantine UI
