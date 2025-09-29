// Password configuration
const passwords = {
    event: "hiphop"
};

// Global variables
let selectedUniversity = "";
let currentTicketPrice = 30;

// Loading utility functions
function showLoading(button, text = 'Loading...') {
    button.dataset.originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
}

function hideLoading(button) {
    button.textContent = button.dataset.originalText;
    button.disabled = false;
}

// Show/hide sections
function showSection(sectionId) {
    const sections = ['password-screen', 'landing-page'];
    sections.forEach(section => {
        document.getElementById(section).classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Update current price display
function updateTicketPrice() {
    const currentDate = new Date();
    const phase1End = new Date('2023-09-28');
    const phase2End = new Date('2023-10-04');

    if (currentDate <= phase1End) {
        currentTicketPrice = 30;
    } else if (currentDate <= phase2End) {
        currentTicketPrice = 50;
    } else {
        currentTicketPrice = 70;
    }
}

// Initialize the application
function initializeApp() {
    // Password functionality
    document.getElementById('submit-password').addEventListener('click', function() {
        const password = document.getElementById('event-password').value;
        if (password === passwords.event) {
            showSection('landing-page');
        } else {
            alert('Incorrect password. Please try again.');
            document.getElementById('event-password').value = '';
        }
    });

    // Webtickets redirect
    document.getElementById('purchase-ticket-webtickets').addEventListener('click', function() {
        const termsChecked = document.getElementById('agree-terms').checked;
        
        if (!termsChecked) {
            alert('Please agree to the Terms and Conditions before purchasing tickets.');
            return;
        }
        
        // Replace with your actual Webtickets event URL
        window.open('https://www.webtickets.co.za/event.aspx?itemid=123456789', '_blank');
    });
    
    // Terms modal
    document.getElementById('show-terms').addEventListener('click', function() {
        document.getElementById('terms-modal').style.display = 'flex';
    });
    
    document.getElementById('close-terms').addEventListener('click', function() {
        document.getElementById('terms-modal').style.display = 'none';
    });
    
    // Newsletter subscription
    document.getElementById('subscribe-updates').addEventListener('click', function() {
        const name = document.getElementById('update-name').value;
        const phone = document.getElementById('update-phone').value;
        
        if (name && phone) {
            alert(`Thanks ${name}! You've been subscribed to updates. We'll contact you at ${phone}.`);
            document.getElementById('update-name').value = '';
            document.getElementById('update-phone').value = '';
        } else {
            alert('Please enter both your name and phone number to subscribe.');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle Enter key for password input
    document.getElementById('event-password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('submit-password').click();
        }
    });

    // Close modal when clicking outside
    document.getElementById('terms-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    // Initialize price on load
    updateTicketPrice();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);