// Sample ride data
const sampleRides = {
  ola: [
    { type: "Auto", price: 95, eta: 8, platform: "Ola", color: "#FDB515" },
    { type: "Mini", price: 145, eta: 6, platform: "Ola", color: "#FDB515" },
    { type: "Prime", price: 185, eta: 5, platform: "Ola", color: "#FDB515" }
  ],
  uber: [
    { type: "UberGo", price: 155, eta: 7, platform: "Uber", color: "#000000" },
    { type: "UberX", price: 195, eta: 5, platform: "Uber", color: "#000000" },
    { type: "Premier", price: 285, eta: 4, platform: "Uber", color: "#000000" }
  ],
  rapido: [
    { type: "Bike", price: 45, eta: 12, platform: "Rapido", color: "#FFD700" },
    { type: "Auto", price: 85, eta: 10, platform: "Rapido", color: "#FFD700" },
    { type: "Cab", price: 165, eta: 8, platform: "Rapido", color: "#FFD700" }
  ]
};

// Utility functions
function scrollToDemo() {
  const demoSection = document.getElementById('demo');
  if (demoSection) {
    demoSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = 80; // Account for fixed header
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Main ride comparison functionality
function compareRides() {
  const pickupInput = document.getElementById('pickup');
  const destinationInput = document.getElementById('destination');
  const compareBtn = document.getElementById('compare-btn');
  const btnText = compareBtn.querySelector('.btn-text');
  const btnLoading = compareBtn.querySelector('.btn-loading');
  const resultsSection = document.getElementById('results');
  
  // Validate inputs
  if (!pickupInput || !destinationInput) {
    console.error('Input elements not found');
    return;
  }
  
  if (!pickupInput.value.trim() || !destinationInput.value.trim()) {
    alert('Please enter both pickup and destination locations');
    return;
  }
  
  // Show loading state
  if (compareBtn) {
    compareBtn.disabled = true;
  }
  if (btnText) {
    btnText.classList.add('hidden');
  }
  if (btnLoading) {
    btnLoading.classList.remove('hidden');
  }
  if (resultsSection) {
    resultsSection.classList.add('hidden');
  }
  
  // Simulate API call delay
  setTimeout(() => {
    // Hide loading state
    if (compareBtn) {
      compareBtn.disabled = false;
    }
    if (btnText) {
      btnText.classList.remove('hidden');
    }
    if (btnLoading) {
      btnLoading.classList.add('hidden');
    }
    
    // Show results
    displayRideResults();
    if (resultsSection) {
      resultsSection.classList.remove('hidden');
      
      // Scroll to results with a small delay
      setTimeout(() => {
        resultsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, 2500);
}

function displayRideResults() {
  const resultsGrid = document.getElementById('results-grid');
  const cheapestElement = document.getElementById('cheapest');
  const fastestElement = document.getElementById('fastest');
  
  if (!resultsGrid) {
    console.error('Results grid not found');
    return;
  }
  
  // Combine all rides
  const allRides = [
    ...sampleRides.ola,
    ...sampleRides.uber,
    ...sampleRides.rapido
  ];
  
  // Add some randomization to make it feel more realistic
  const randomizedRides = allRides.map(ride => ({
    ...ride,
    price: Math.max(30, ride.price + Math.floor(Math.random() * 21) - 10), // ±10 rupees, minimum 30
    eta: Math.max(3, ride.eta + Math.floor(Math.random() * 5) - 2) // ±2 minutes, minimum 3
  }));
  
  // Sort rides by price for better display
  randomizedRides.sort((a, b) => a.price - b.price);
  
  // Find cheapest and fastest
  const cheapest = randomizedRides.reduce((min, ride) => 
    ride.price < min.price ? ride : min
  );
  const fastest = randomizedRides.reduce((min, ride) => 
    ride.eta < min.eta ? ride : min
  );
  
  // Clear previous results
  resultsGrid.innerHTML = '';
  
  // Display rides
  randomizedRides.forEach(ride => {
    const rideCard = createRideCard(ride, cheapest, fastest);
    resultsGrid.appendChild(rideCard);
  });
  
  // Update summary
  if (cheapestElement) {
    cheapestElement.textContent = `${cheapest.platform} ${cheapest.type} - ₹${cheapest.price}`;
  }
  if (fastestElement) {
    fastestElement.textContent = `${fastest.platform} ${fastest.type} - ${fastest.eta} mins`;
  }
}

function createRideCard(ride, cheapest, fastest) {
  const card = document.createElement('div');
  card.className = 'ride-card';
  
  // Add special classes for cheapest and fastest
  if (ride.price === cheapest.price && ride.platform === cheapest.platform) {
    card.classList.add('ride-card--cheapest');
  }
  if (ride.eta === fastest.eta && ride.platform === fastest.platform) {
    card.classList.add('ride-card--fastest');
  }
  
  // Add click handler for booking simulation
  card.addEventListener('click', (event) => {
    handleRideSelection(ride, event);
  });
  
  card.innerHTML = `
    <div class="ride-info">
      <div class="ride-platform" style="background-color: ${ride.color}"></div>
      <div class="ride-details">
        <h4>${ride.platform} ${ride.type}</h4>
        <p>${ride.platform} • ${getVehicleDescription(ride.type)}</p>
      </div>
    </div>
    <div class="ride-stats">
      <div class="ride-price">₹${ride.price}</div>
      <div class="ride-eta">${ride.eta} mins</div>
    </div>
  `;
  
  return card;
}

function getVehicleDescription(type) {
  const descriptions = {
    'Auto': 'Auto-rickshaw',
    'Mini': 'Compact car',
    'Prime': 'Sedan car',
    'UberGo': 'Hatchback',
    'UberX': 'Sedan',
    'Premier': 'Premium sedan',
    'Bike': 'Motorcycle',
    'Cab': 'Standard cab'
  };
  return descriptions[type] || 'Vehicle';
}

function handleRideSelection(ride, event) {
  // Simulate booking process
  const confirmed = confirm(`Book ${ride.platform} ${ride.type} for ₹${ride.price}?\n\nYou will be redirected to ${ride.platform}'s app to complete your booking.`);
  
  if (confirmed) {
    // In a real app, this would redirect to the platform's booking page
    alert(`Redirecting to ${ride.platform}...\n\nIn a real implementation, you would be taken to ${ride.platform}'s app with your trip details pre-filled.`);
    
    // Add some visual feedback
    if (event && event.currentTarget) {
      event.currentTarget.style.transform = 'scale(0.95)';
      setTimeout(() => {
        event.currentTarget.style.transform = 'scale(1)';
      }, 150);
    }
  }
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'var(--hopngo-white)';
      header.style.backdropFilter = 'none';
    }
  }
}

// Smooth scrolling for navigation links
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
  
  // Footer links
  const footerLinks = document.querySelectorAll('.footer__link[href^="#"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
}

// Animate elements on scroll
function animateOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    }
  });
  
  // Observe steps
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, index) => {
    if (step) {
      step.style.opacity = '0';
      step.style.transform = 'translateY(30px)';
      step.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
      observer.observe(step);
    }
  });
}

// Form enhancements
function enhanceFormInputs() {
  const inputs = document.querySelectorAll('.form-control');
  
  inputs.forEach(input => {
    if (input) {
      // Add focus/blur effects
      input.addEventListener('focus', () => {
        if (input.parentElement) {
          input.parentElement.classList.add('form-group--focused');
        }
      });
      
      input.addEventListener('blur', () => {
        if (input.parentElement) {
          input.parentElement.classList.remove('form-group--focused');
        }
      });
      
      // Enable Enter key to trigger comparison
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          compareRides();
        }
      });
    }
  });
}

// Demo interaction enhancements
function enhanceDemoInteraction() {
  // Add sample location suggestions
  const pickupInput = document.getElementById('pickup');
  const destinationInput = document.getElementById('destination');
  
  const locationSuggestions = [
    'Connaught Place, Delhi',
    'Airport Terminal 3',
    'India Gate, Delhi',
    'Khan Market, Delhi',
    'Cyber Hub, Gurgaon',
    'Select City Walk Mall',
    'DLF Mall of India',
    'Red Fort, Delhi',
    'Lotus Temple, Delhi',
    'Hauz Khas Village'
  ];
  
  // Add click handler to shuffle locations for demo
  const demoTitle = document.querySelector('.demo .section-title');
  if (demoTitle) {
    demoTitle.addEventListener('dblclick', () => {
      const randomPickup = locationSuggestions[Math.floor(Math.random() * locationSuggestions.length)];
      const randomDestination = locationSuggestions[Math.floor(Math.random() * locationSuggestions.length)];
      
      if (randomPickup !== randomDestination && pickupInput && destinationInput) {
        pickupInput.value = randomPickup;
        destinationInput.value = randomDestination;
      }
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing HopNGo app...');
  
  // Initialize all functionality
  initializeNavigation();
  animateOnScroll();
  enhanceFormInputs();
  enhanceDemoInteraction();
  
  // Add scroll listener for header effect
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Add click handlers for CTA buttons - with better error handling
  const ctaButtons = document.querySelectorAll('.hero__cta, .header__cta');
  ctaButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToDemo();
      });
    }
  });
  
  // Initialize form with sample values if empty
  const pickupInput = document.getElementById('pickup');
  const destinationInput = document.getElementById('destination');
  
  if (pickupInput && !pickupInput.value.trim()) {
    pickupInput.value = 'Connaught Place, Delhi';
  }
  if (destinationInput && !destinationInput.value.trim()) {
    destinationInput.value = 'Airport Terminal 3';
  }
  
  // Ensure compare button has click handler
  const compareBtn = document.getElementById('compare-btn');
  if (compareBtn) {
    compareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      compareRides();
    });
  }
  
  console.log('HopNGo app initialized successfully');
});

// Export functions for global access
window.scrollToDemo = scrollToDemo;
window.compareRides = compareRides;