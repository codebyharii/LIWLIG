// =================================================================
// LIWLIG — Main Entry Point
// =================================================================

import '../styles/variables.css';
import '../styles/base.css';
import '../styles/components.css';
import '../styles/animations.css';

import { initNavigation } from './navigation.js';
import { initAnimations, initSmoothScroll } from './animations.js';
import { initPortfolio } from './portfolio.js';
import { initInteractions } from './interactions.js';

// ── Preloader ──
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 800);
        });
    }
}

// ── Initialize everything on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavigation();
    initAnimations();
    initSmoothScroll();
    initPortfolio();
    initInteractions();
});
