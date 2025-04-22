# Gallery made with Astro

A modern, performant image gallery built with Astro and Tailwind CSS. This project demonstrates how to create a beautiful, responsive gallery with automatic image optimization and metadata generation.

## Features

- 🚀 Built with [Astro](https://astro.build) for optimal performance
- 🎨 Styled with [Tailwind CSS](https://tailwindcss.com)
- 📚 SEO-friendly with automatic metadata generation
- 🌟 Accessibility features
- 🛠️ Customizable layout and styling
- 📱 Fully responsive design
- 🔄 Automatic metadata generation
- 🖼️ Image optimization and lazy loading
- ♿ Accessible components

## Project Structure

```text
gallery/
├── src/
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   └── data/          # Image metadata and data
└── scripts/           # Utility scripts for metadata generation
```

## How It Works

1. **Image Management**

   - Images are stored in `src/data/images`
   - Each image can have associated metadata (title, description, tags)

2. **Metadata Generation**

   - The `scripts/generate-metadata.js` script automatically generates metadata for all images
   - Metadata is stored in `src/data/metadata.json`
   - This enables dynamic gallery generation without manual metadata entry

3. **Components**
   - `Gallery.astro`: Main gallery layout and grid system
   - `Card.astro`: Individual image card with hover effects and metadata display
   - `Footer.astro`: Site footer with credits
   - `Layout.astro`: Base page layout wrapper
   - `Modal.astro`: Modal component for full-size image viewing
   - `Loading.astro`: Loading indicator for image lazy-loading
   - `Filter.astro`: Component for displaying image tags

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your images to `src/data/images`
4. Run the metadata generation script:

   ```bash
   node scripts/generate-metadata.js
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Customization

- Modify `src/pages/index.astro` to change the gallery layout
- Update `src/components/Card.astro` to customize image card appearance
- Adjust Tailwind classes for styling changes

## Development

All commands are run from the root of the project:

| Command                   | Action                                       |
| :------------------------ | :------------------------------------------- |
| `npm install`             | Installs dependencies                        |
| `npm run dev`             | Starts local dev server at `localhost:4321`  |
| `npm run build`           | Build your production site to `./dist/`      |
| `npm run preview`         | Preview your build locally, before deploying |
| `npm run format`          | Use Prettier to format all files             |
| `npm run update-metadata` | Manually update metadata file with new files |
| `npm run prepare`         | Run `update-metadata` and `format` commands  |
| `npm run push`            | Bump package version and push to npm         |
| `npm run push-minor`      | Bump minor package version and push to npm   |
| `npm run push-major`      | Bump major package version and push to npm   |

## License

MIT License - feel free to use this project's code as a starting point for your own image gallery!
