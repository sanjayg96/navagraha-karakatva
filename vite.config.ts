import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

const isArtifact = process.env.BUILD_TARGET === 'artifact';

export default defineConfig({
  // Pages serves from a subpath; the artifact build is self-contained so it uses './'.
  base: isArtifact ? './' : process.env.PAGES_BASE || '/navagraha-karakatva/',
  plugins: [react(), ...(isArtifact ? [viteSingleFile()] : [])],
  build: { target: 'es2020', cssCodeSplit: !isArtifact },
});
