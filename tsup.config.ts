import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  bundle: false,
  target: 'es2022',
  outDir: 'dist',
})
