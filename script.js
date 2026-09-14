// --- Mouse-Reactive LFO Canvas ---
const canvas = document.getElementById('lfoWaveform');
const ctx = canvas.getContext('2d');

let width, height;
let time = 0;

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector('.hero').offsetHeight;
}
window.addEventListener('resize', resize);
resize();

function draw() {
    ctx.clearRect(0, 0, width, height);
    
    const freqMod = (mouse.x / width) * 0.02 + 0.005;
    const ampMod = (mouse.y / height) * 60 + 20;

    const waves = [
        { freqOffset: 1, ampOffset: 1, speed: 0.02, color: 'rgba(184, 134, 85, 0.1)' },
        { freqOffset: 1.5, ampOffset: 0.6, speed: 0.03, color: 'rgba(184, 134, 85, 0.2)' },
        { freqOffset: 0.5, ampOffset: 1.2, speed: 0.01, color: 'rgba(184, 134, 85, 0.15)' }
    ];

    ctx.globalCompositeOperation = 'lighter';

    waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        for (let i = 0; i < width; i++) {
            const currentFreq = freqMod * wave.freqOffset;
            const currentAmp = ampMod * wave.ampOffset;
            
            const y = Math.sin(i * currentFreq + time * wave.speed) * currentAmp 
                    * Math.sin(time * 0.01); 
            ctx.lineTo(i, (height / 2) + y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    time++;
    requestAnimationFrame(draw);
}
draw();

// --- Scroll-Triggered Reveals ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
