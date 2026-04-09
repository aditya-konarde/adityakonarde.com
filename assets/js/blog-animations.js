/**
 * blog-animations.js
 * Remotion-inspired animations for Hugo PaperMod
 * - IntersectionObserver-based staggered entrances
 * - Scroll-driven reading progress (JS fallback)
 * - Respects prefers-reduced-motion
 */

(function () {
    'use strict';

    // Check reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If reduced motion, show everything immediately
    if (prefersReducedMotion) {
        document.querySelectorAll('.animate-in, .text-reveal').forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    // ---------------------------------------------------------------
    // 1. INTERSECTION OBSERVER - Staggered entrance animations
    //    Remotion's <Sequence offset> pattern in CSS
    // ---------------------------------------------------------------
    function setupStaggeredEntrances() {
        var elements = document.querySelectorAll('.animate-in');
        if (!elements.length) return;

        // Auto-assign stagger index based on position in parent
        elements.forEach(function (el, index) {
            var siblings = el.parentElement.querySelectorAll('.animate-in');
            var siblingIndex = Array.prototype.indexOf.call(siblings, el);
            el.style.setProperty('--stagger', siblingIndex.toString());
        });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ---------------------------------------------------------------
    // 2. TEXT REVEAL OBSERVER
    //    Remotion clip-path composition
    // ---------------------------------------------------------------
    function setupTextReveal() {
        var elements = document.querySelectorAll('.text-reveal');
        if (!elements.length) return;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ---------------------------------------------------------------
    // 3. READING PROGRESS BAR (JS fallback)
    //    For browsers without CSS animation-timeline support
    // ---------------------------------------------------------------
    function setupReadingProgress() {
        var bar = document.querySelector('.reading-progress');
        if (!bar) return;

        // Check if CSS scroll-driven animation is supported
        // If so, let CSS handle it and skip JS
        if (CSS.supports && CSS.supports('animation-timeline', 'scroll(root block)')) {
            return;
        }

        function updateProgress() {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            var progress = scrollTop / docHeight;
            bar.style.transform = 'scaleX(' + progress + ')';
        }

        // Initial state
        updateProgress();

        // Use passive scroll listener for performance
        window.addEventListener('scroll', updateProgress, { passive: true });

        // Also update on resize (viewport changes)
        window.addEventListener('resize', updateProgress, { passive: true });
    }

    // ---------------------------------------------------------------
    // 4. POST ENTRY STAGGER AUTO-ASSIGN
    //    Add animate-in class to post entries on list pages
    // ---------------------------------------------------------------
    function setupPostListAnimations() {
        var postEntries = document.querySelectorAll('.post-entry');
        if (!postEntries.length) return;

        postEntries.forEach(function (entry, index) {
            entry.classList.add('animate-in');
            entry.style.setProperty('--stagger', index.toString());
        });
    }

    // ---------------------------------------------------------------
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    //    Better reading experience within articles
    // ---------------------------------------------------------------
    function setupSmoothAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---------------------------------------------------------------
    // INIT - Run all after DOM is ready
    // ---------------------------------------------------------------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setupPostListAnimations();
        setupStaggeredEntrances();
        setupTextReveal();
        setupReadingProgress();
        setupSmoothAnchors();
    }

})();
