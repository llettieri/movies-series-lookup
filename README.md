# Movies & Series Lookup

A modern, fast web app for discovering and looking up movies and TV series. Search, browse details, and explore your
entertainment options effortlessly.

## 🚀 Features

- 🔍 **Smart Search**: Find movies and series by title, genre, or keywords
- 📺 **Rich Details**: Posters, ratings, cast, and synopses
- 📱 **Responsive Design**: Perfect on mobile, tablet, and desktop
- ⚡ **Fast Loading**: Optimized with Next.js App Router and server-side rendering
- 🎨 **Beautiful UI**: shadcn/ui components with Tailwindcss

## 🛠 Tech Stack

| Frontend    | Backend            | Tools           |
|-------------|--------------------|-----------------|
| Next.js 16+ | Next.js API Routes | TypeScript      |
| React 19+   | Server Components  | Tailwind CSS    |
| shadcn/ui   | App Router         | ESLint/Prettier |
|             |                    | Vitest + MSW    |
|             |                    | pnpm            |

## 🎯 Motivation

Tired of jumping between apps to find what to watch? Movies & Series Lookup combines movie and TV discovery into one
clean, speedy interface. Built for performance and developer happiness, it showcases modern Next.js patterns with
TypeScript type safety and pixel-perfect UI.

Perfect for movie nights or quick recommendations!

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/llettieri/movies-series-lookup.git
cd movies-series-lookup

# Install node, version specified in .nvmrc file (requires nvm)
nvm install
nvm use

# Enable pnpm with corepack
corepack enable pnpm

# Create local .env file (see .env.example)
pnpm create-env

# Install dependencies
pnpm install

# Run development server
pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) and start exploring!

## 🔗 API Credits

Powered by [The Movie Database (TMDb)](https://www.themoviedb.org/) API  
Get your free API key at [TMDB Developers](https://developers.themoviedb.org/3/getting-started/introduction) and set it
in the
`.env` file:

```
TMDB_API_KEY=your_api_key_here
```

## 📁 Project Structure

Here the most important directories:

```
├── app/            # Next.js App Router
├── components/     # Reusable UI components
├── config/         # Various config
├── hooks/          # Custom React hooks
├── lib/            # Utilities & API helpers
├── models/         # Data models & DTOs
├── public/         # Static assets
├── services/       # Services / API calls
└── tests/          # Test fixtures, MSW handlers & setup
```

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

GNU General Public License v3.0 - see [LICENSE](LICENSE) file.
