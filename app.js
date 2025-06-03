document.addEventListener('DOMContentLoaded', function() {
    // Remove loading class when page is loaded
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 1000);

    // Typewriter effect
    class Typewriter {
        constructor(element, words, wait = 3000) {
            this.element = element;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

            let typeSpeed = 200;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Init Typewriter
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach(el => {
        const words = JSON.parse(el.getAttribute('data-words'));
        const wait = el.getAttribute('data-wait') || 3000;
        new Typewriter(el, words, wait);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars on scroll
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        const progress = skill.querySelector('.skill-progress');
        progress.style.width = `${percent}%`;
    });

    // Project card flip animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-card-inner').style.transform = 'rotateY(180deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-card-inner').style.transform = 'rotateY(0deg)';
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // Terminal functionality
    const terminalWindow = document.querySelector('.terminal-window');
    const terminalInput = document.querySelector('.terminal-input');
    const terminalContent = document.querySelector('.terminal-content');
    
    // Show terminal after delay
    setTimeout(() => {
        terminalWindow.classList.add('active');
    }, 3000);

    // Terminal commands
    const commands = {
        help: 'Available commands: help, about, skills, projects, contact, clear',
        about: 'I am Prahlad Singh, a cosmic developer with expertise in full-stack development, AI, and creating otherworldly digital experiences.',
        skills: 'Frontend: React, Vue,  | Backend: Node.js, Express.js, MongoDB',
        projects: 'Edunoteshub, PG Expense Tracker',
        contact: 'You can reach me at prahlad.singh.dev or through the contact form on this site.',
        clear: function() {
            terminalContent.innerHTML = '<p>Welcome to Cosmic Developer Terminal v3.1.4</p><p>Type "help" to see available commands</p>';
        }
    };

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.textContent.trim().toLowerCase();
            terminalInput.textContent = '';
            
            // Create new line with command
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="terminal-prompt">cosmic_dev@portfolio:~$</span> ${command}`;
            terminalContent.appendChild(commandLine);
            
            // Process command
            let output = '';
            if (commands[command] !== undefined) {
                if (typeof commands[command] === 'function') {
                    commands[command]();
                } else {
                    output = commands[command];
                }
            } else {
                output = `Command not found: ${command}. Type "help" for available commands.`;
            }
            
            if (output) {
                const outputLine = document.createElement('p');
                outputLine.textContent = output;
                terminalContent.appendChild(outputLine);
            }
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
            
            // Create new input line
            const newInputLine = document.createElement('div');
            newInputLine.className = 'terminal-line';
            newInputLine.innerHTML = '<span class="terminal-prompt">cosmic_dev@portfolio:~$</span> <span class="terminal-input" contenteditable="true"></span>';
            terminalContent.appendChild(newInputLine);
            
            // Focus on new input
            const newInput = newInputLine.querySelector('.terminal-input');
            newInput.focus();
            
            // Update reference
            terminalInput = newInput;
        }
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.1
        });
    });
    
    // Floating navigation background change on scroll
    const nav = document.querySelector('.floating-nav');
    ScrollTrigger.create({
        start: 100,
        onUpdate: (self) => {
            if (self.direction === -1) {
                nav.style.backgroundColor = 'rgba(15, 14, 23, 0.95)';
                nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
            } else {
                if (window.scrollY < 100) {
                    nav.style.backgroundColor = 'rgba(15, 14, 23, 0.8)';
                    nav.style.boxShadow = 'none';
                }
            }
        }
    });

    // Create tech sphere tags
    const techTags = [
        'React', 'Node.js', 'TypeScript', 'Python', 
        'JavaScript', 'CSS3', 'HTML5',
        'MongoDB', 'MySQL','Java','C','Php', 'Git', 'Redux','Express.js'
    ];
    
    const sphereSurface = document.querySelector('.sphere-surface');
    techTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tech-tag';
        tagElement.textContent = tag;
        sphereSurface.appendChild(tagElement);
        
        // Random position on sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 150;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        gsap.set(tagElement, {
            x: x,
            y: y,
            z: z,
            opacity: 0.8,
            color: `hsl(${Math.random() * 360}, 80%, 70%)`
        });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navSocial = document.querySelector('.nav-social');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navSocial.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navSocial.classList.remove('active');
        });
    });
});

// Three.js background animation
window.addEventListener('load', function() {
    // Only initialize if Three.js is available
    if (typeof THREE !== 'undefined') {
        const container = document.querySelector('.particles');
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Scene
        const scene = new THREE.Scene();
        
        // Camera
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 30;
        
        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.2,
            color: 0x6e45e2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            
            renderer.setSize(width, height);
        });
    }
});

// Terminal toggle functionality
const terminalToggle = document.querySelector('.terminal-toggle');
const terminalWindow = document.querySelector('.terminal-window');
const terminalClose = document.querySelector('.terminal-close');

// Toggle terminal visibility
terminalToggle.addEventListener('click', () => {
    terminalWindow.classList.toggle('active');
});

// Close terminal (for mobile)
terminalClose.addEventListener('click', () => {
    terminalWindow.classList.remove('active');
});

// Close when clicking outside (optional)
document.addEventListener('click', (e) => {
    if (!terminalWindow.contains(e.target) && 
        !terminalToggle.contains(e.target) &&
        terminalWindow.classList.contains('active')) {
        terminalWindow.classList.remove('active');
    }
});
