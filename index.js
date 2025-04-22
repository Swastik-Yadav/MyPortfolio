// DOM Elements
const navbar = document.getElementById('Navbar');
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const skillLevels = document.querySelectorAll('.skill-level');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('sheetdb-form');
const scrollToTopBtn = document.getElementById('scrollToTop');

// Mobile Menu Toggle with improved accessibility
mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);

    // Change icon with animation
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking outside with improved performance
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') &&
        !e.target.closest('.nav-links') &&
        !e.target.closest('.mobile-menu-btn')) {
        closeMobileMenu();
    }
});

function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('menu-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// Smooth scrolling with improved performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            if (navLinks.classList.contains('active')) {
                closeMobileMenu();
            }

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active link with animation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Navbar scroll effect with throttling
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled-nav');
    } else {
        navbar.classList.remove('scrolled-nav');
    }
    
    // Show/hide scroll to top button
    if (currentScroll > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
    
    lastScroll = currentScroll;
});

// Scroll to top button functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add active class to nav links on scroll with improved performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Animate skill bars with improved performance
function animateSkillBars() {
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.width = '0';
        void skill.offsetWidth; // Force reflow
        skill.style.width = `${level}%`;
    });
}

// Portfolio filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add animation to sparkle elements with improved performance
function animateSparkles() {
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach(sparkle => {
        const rotation = Math.random() * 360;
        const opacity = 0.7 + Math.random() * 0.3;
        sparkle.style.transform = `rotate(${rotation}deg)`;
        sparkle.style.opacity = opacity;
    });
}

// Intersection Observer for fade-in animations with improved performance
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.classList.remove('fade-out');

            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 500);
            }
        } else {
            entry.target.classList.add('fade-out');
            entry.target.classList.remove('fade-in');
            
            if (entry.target.id === 'skills') {
                skillLevels.forEach(skill => {
                    skill.style.width = '0';
                });
            }
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
sections.forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Form submission handling with improved UX
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonContent = submitButton.innerHTML;
        
        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! I'll get back to you soon.</p>
            `;
            
            this.innerHTML = '';
            this.appendChild(successMsg);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                this.reset();
                this.innerHTML = `
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Your Name" name="data[name]" required>
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Your Email" name="data[email]" required>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Subject" name="data[subject]" required>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Your Message" name="data[message]" required></textarea>
                    </div>
                    <button type="submit" class="form-submit">
                        <span>Send Message</span>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                `;
            }, 3000);
            
        } catch (error) {
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'form-error';
            errorMsg.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <p>Sorry, there was an error sending your message. Please try again later.</p>
            `;
            
            this.insertBefore(errorMsg, this.firstChild);
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonContent;
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMsg.remove();
            }, 5000);
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
.fade-out {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-in {
    opacity: 1;
    transform: translateY(0);
}

.scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border: none;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.scroll-to-top.show {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.form-success, .form-error {
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.form-success {
    background: #d4edda;
    color: #155724;
}

.form-error {
    background: #f8d7da;
    color: #721c24;
}

.form-success i, .form-error i {
    font-size: 1.2em;
}
`;
document.head.appendChild(style);

// Initialize sparkle animations
animateSparkles();
setInterval(animateSparkles, 3000);

