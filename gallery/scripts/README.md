# Gallery Scripts

This directory contains utility scripts for managing the gallery.

## Metadata Generation

The `generate-metadata.js` script automatically creates and updates metadata entries for images in your gallery.

### How It Works

1. The script scans the `src/data/images` directory for image files
2. It checks if each image already has an entry in `src/data/metadata.json`
3. For any new images, it creates a metadata entry with:
   - Title: Generated from the filename (converts hyphens/underscores to spaces, capitalizes words)
   - Date: Uses git commit date if available, otherwise falls back to file modification time
   - Empty description and tags (which you can fill in later)
4. It preserves all existing metadata for images that already have entries
5. It sorts all entries by date (newest first)

### Usage

#### Local Development

Run the script manually when you add new images:

```bash
npm run update-metadata
```

#### Automated Workflow

The script is designed to work with GitHub Actions:

1. When you push changes to your images submodule, it triggers a workflow in the main repository
2. The workflow runs the metadata generation script
3. Any changes to metadata.json are committed and pushed back to the main repository

### Setup for GitHub Actions

To make the automated workflow work, you need to:

1. Create a Personal Access Token (PAT) with `workflow` scope
2. Add it as a secret named `REPO_ACCESS_TOKEN` in your submodule repository settings

This allows the submodule repository to trigger workflows in the main repository.
