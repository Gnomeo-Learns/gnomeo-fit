import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Replace YOUR_GITHUB_USERNAME with your actual GitHub username
export default defineConfig({
  site: 'https://gnomeo-learns.github.io',
  base: '/gnomeo-fit',
  integrations: [react()],
  output: 'static',
});
