// Nyirol Institute of Innovation and Technology - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('show') && !event.target.closest('nav') && !event.target.closest('.nav-toggle')) {
            navMenu.classList.remove('show');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Donation amount selection
    const donationOptions = document.querySelectorAll('.donation-option');
    if (donationOptions.length > 0) {
        donationOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                donationOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update hidden input with selected amount if it exists
                const amountInput = document.querySelector('#donation-amount');
                if (amountInput) {
                    const amount = this.getAttribute('data-amount');
                    amountInput.value = amount;
                }
            });
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    let errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('error');
                    
                    let errorMsg = emailField.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'Please enter a valid email address';
                        emailField.parentNode.appendChild(errorMsg);
                    } else {
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            }
            
            if (!valid) {
                e.preventDefault();
            }
        });
    });
    
    // Program pathway interactive elements
    const programSteps = document.querySelectorAll('.program-step');
    const programDetails = document.querySelectorAll('.program-detail');
    
    if (programSteps.length > 0 && programDetails.length > 0) {
        programSteps.forEach((step, index) => {
            step.addEventListener('click', function() {
                // Remove active class from all steps
                programSteps.forEach(s => s.classList.remove('active'));
                // Add active class to clicked step
                this.classList.add('active');
                
                // Hide all program details
                programDetails.forEach(detail => detail.style.display = 'none');
                // Show corresponding detail
                if (programDetails[index]) {
                    programDetails[index].style.display = 'block';
                }
            });
        });
        
        // Activate first step by default
        if (programSteps[0]) {
            programSteps[0].classList.add('active');
        }
        if (programDetails[0]) {
            programDetails[0].style.display = 'block';
        }
    }
    
    // Animate stats when in viewport
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const animateStats = () => {
            stats.forEach(stat => {
                const rect = stat.getBoundingClientRect();
                const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
                
                if (isInViewport && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    let current = 0;
                    const increment = target / 50; // Adjust for animation speed
                    const timer = setInterval(() => {
                        current += increment;
                        stat.textContent = Math.floor(current);
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(timer);
                        }
                    }, 30);
                }
            });
        };
        
        // Run on scroll
        window.addEventListener('scroll', animateStats);
        // Run once on page load
        animateStats();
    }
});