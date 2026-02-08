// Registra os plugins do GSAP
gsap.registerPlugin(ScrollTrigger);

// 1. Inicialização do Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

// Loop de animação do Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Split Text Animation
const splitTextElements = document.querySelectorAll(".split-text");
splitTextElements.forEach(el => {
    const text = el.innerText;
    const splitHTML = text.split("").map(char => 
        `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
    ).join("");
    el.innerHTML = splitHTML;
});

// 3. Hero Animation
const tl = gsap.timeline();
tl.from(".char", {
    y: 100,
    opacity: 0,
    stagger: 0.03,
    duration: 1,
    ease: "power4.out"
})
.from(".reveal-text", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
}, "-=0.6");

// 4. Parallax Image Effect
// Seleciona apenas em telas maiores para performance mobile
if (window.innerWidth > 768) {
    document.querySelectorAll(".project-card").forEach(card => {
        const speed = card.getAttribute("data-speed");
        gsap.to(card, {
            y: -30 * speed,
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// 5. Scroll Reveal Items
const revealItems = document.querySelectorAll(".reveal-item");
revealItems.forEach(item => {
    gsap.from(item, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// 6. Magnetic Button Effect
const magnets = document.querySelectorAll('.magnetic-btn');
magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
        const position = magnet.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    magnet.addEventListener('mouseleave', () => {
        magnet.style.transform = 'translate(0px, 0px)';
    });
});