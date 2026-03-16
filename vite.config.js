import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                work: resolve(__dirname, 'work.html'),
                caseStudy: resolve(__dirname, 'case-study.html'),
                services: resolve(__dirname, 'services.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
            },
        },
    },
});
