import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import svgr from '@svgr/rollup' 

export default defineConfig({
  plugins: [react(), RubyPlugin(), svgr()],
  resolve: {
    alias: {
      app: resolve(__dirname, './app'),
    },
  },
});
