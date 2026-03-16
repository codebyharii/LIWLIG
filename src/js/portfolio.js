// =================================================================
// LIWLIG — Portfolio / Case Studies Filter Module
// =================================================================

export function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-item');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach((card, index) => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    card.style.transitionDelay = `${index * 50}ms`;
                    card.classList.remove('hidden');
                    card.classList.add('show');
                } else {
                    card.style.transitionDelay = '0ms';
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }
            });
        });
    });
}
