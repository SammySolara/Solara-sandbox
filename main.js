document.addEventListener('DOMContentLoaded', function() {

    // Updated cursor follower with coral pink hover and subtle normal colors
function initCursorFollower() {
    // Check if we're on mobile - don't initialize on mobile devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return; // Exit early, don't initialize on mobile
    }
  
    // Create the cursor follower elements
    const cursorFollower = document.createElement('div');
    const cursorDot = document.createElement('div');
    
    // Add elements to the DOM
    document.body.appendChild(cursorFollower);
    document.body.appendChild(cursorDot);
    
    // Apply styles to the outer follower - Subtle lavender color that works on blue/white
    cursorFollower.style.position = 'fixed';
    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
    cursorFollower.style.borderRadius = '50%';
    cursorFollower.style.border = '2px solid rgba(108, 45, 255, 0.6)'; // Soft lavender that's subtle
    cursorFollower.style.transform = 'translate(-50%, -50%)';
    cursorFollower.style.pointerEvents = 'none'; 
    cursorFollower.style.zIndex = '9999';
    cursorFollower.style.transition = 'transform 0.1s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease';
    cursorFollower.style.boxShadow = '0 0 15px rgba(98, 37, 158, 0.69)'; // Light shadow
    
    // Apply styles to the inner dot - Subtle sage green
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '8px';
    cursorDot.style.height = '8px';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.backgroundColor = 'rgb(0, 174, 255)'; // Sage green - visible but not bold
    cursorDot.style.transform = 'translate(-50%, -50%)';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '10000';
    cursorDot.style.transition = 'width 0.2s ease, height 0.2s ease, background-color 0.3s ease';
    cursorDot.style.boxShadow = '0 0 5px rgba(0, 157, 255, 0.6)'; // Matching shadow
    
    // Variables for smooth animation
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Update mouse position on mouse move
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Handle cursor over clickable elements - Changed to coral pink
    document.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.onclick != null ||
          getComputedStyle(e.target).cursor === 'pointer') {
        
        // Expand the cursor follower with coral pink accent
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
        cursorFollower.style.borderColor = 'rgba(255, 127, 127, 0.9)'; // Coral pink for hover state
        cursorFollower.style.boxShadow = '0 0 20px rgba(255, 127, 127, 0.6)'; // Matching shadow
        
        // Change the dot
        cursorDot.style.width = '10px';
        cursorDot.style.height = '10px';
        cursorDot.style.backgroundColor = 'rgba(255, 127, 127, 1)'; // Matching coral pink
      }
    });
    
    // Reset cursor when not over clickable elements
    document.addEventListener('mouseout', (e) => {
      if (e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.onclick != null ||
          getComputedStyle(e.target).cursor === 'pointer') {
        
        // Reset the cursor follower
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
        cursorFollower.style.borderColor = 'rgba(108, 45, 255, 0.6)'; // Reset to lavender
        cursorFollower.style.boxShadow = '0 0 15px rgba(98, 37, 158, 0.69)';
        
        // Reset the dot
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorDot.style.backgroundColor = 'rgb(0, 174, 255)'; // Reset to sage green
      }
    });
    
    // Handle click animation
    document.addEventListener('mousedown', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Animation loop and other functionality remains the same
    // Smooth animation loop
    function animateCursor() {
      // Smooth follower movement with easing
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      // Smoother dot movement with different easing
      dotX += (mouseX - dotX) * 0.3;
      dotY += (mouseY - dotY) * 0.3;
      
      // Apply positions
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    
    // Hide the default cursor throughout the entire page
    document.body.style.cursor = 'none';
    
    // Hide cursor on ALL elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      element.style.cursor = 'none';
    });
    
    // Hide on mouse leave, show on mouse enter
    document.addEventListener('mouseleave', () => {
      cursorFollower.style.display = 'none';
      cursorDot.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
      cursorFollower.style.display = 'block';
      cursorDot.style.display = 'block';
    });
    
    // Add an observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Hide cursor on the new element and all its children
              node.style.cursor = 'none';
              const childElements = node.querySelectorAll('*');
              childElements.forEach(element => {
                element.style.cursor = 'none';
              });
            }
          });
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Start animation
    animateCursor();
}

    // Mobile Navigation Setup
    function setupMobileNav() {
        // Find the existing header and mobile menu button
        const header = document.querySelector('header');
        const mobileMenuButton = document.querySelector('.md\\:hidden');
        const navMenu = document.querySelector('header nav');
        
        // Add sticky positioning to the header
        header.classList.add('transition-all', 'duration-300');
        
        // Create a mobile navigation overlay
        const mobileNav = document.createElement('div');
        mobileNav.classList.add(
            'fixed', 'inset-0', 'bg-white', 'z-50', 'flex', 'flex-col', 
            'p-5', 'transform', 'transition-transform', 'duration-300', 'ease-in-out',
            'translate-x-full', 'md:hidden'
        );
        
        // Clone the navigation items for the mobile menu
        const navItems = navMenu.cloneNode(true);
        navItems.classList.remove('hidden', 'md:flex', 'items-center', 'space-x-8');
        navItems.classList.add('flex', 'flex-col', 'w-full', 'pt-16', 'items-center', 'text-center');
        
        // Style all the links in the mobile menu for proper alignment
        const navLinks = navItems.querySelectorAll('a');
        navLinks.forEach(link => {
            link.classList.add('w-full', 'py-4', 'text-xl', 'block', 'text-center', 'border-b', 'border-gray-100');
            link.style.margin = '0';
            
            // Make sure the "Get a Free Cost Analysis" button is properly styled
            if (link.textContent.includes('Free Cost Analysis')) {
                link.classList.add('mx-auto', 'my-4', 'w-4/5', 'py-3');
            }
        });
        
        // Add a close button to the mobile menu
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        closeButton.classList.add(
            'absolute', 'top-4', 'right-4', 'text-gray-700', 
            'focus:outline-none', 'p-2'
        );
        
        // Add event listener to close button
        closeButton.addEventListener('click', function() {
            mobileNav.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });
        
        // Build the mobile menu
        mobileNav.appendChild(closeButton);
        mobileNav.appendChild(navItems);
        document.body.appendChild(mobileNav);
        
        // Toggle the mobile menu when hamburger button is clicked
        mobileMenuButton.addEventListener('click', function() {
            mobileNav.classList.toggle('translate-x-full');
            document.body.classList.toggle('overflow-hidden');
        });
        
        // Close the mobile menu when a link is clicked
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }
    
    // Make the header sticky on scroll
    function makeHeaderSticky() {
        const header = document.querySelector('header');
        // Get the original header height for offset calculations
        const headerHeight = header.offsetHeight;
        
        // Create a placeholder for the header with the same height
        const headerPlaceholder = document.createElement('div');
        headerPlaceholder.style.height = headerHeight + 'px';
        headerPlaceholder.style.display = 'none';
        header.parentNode.insertBefore(headerPlaceholder, header);
        
        // Initial state setup
        if (window.pageYOffset > 0) {
            header.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-40', 'shadow-md');
            headerPlaceholder.style.display = 'block';
        }
        
        // Smooth transition for the header with throttling
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.pageYOffset > 0) {
                        header.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'z-40', 'shadow-md');
                        headerPlaceholder.style.display = 'block';
                    } else {
                        header.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'z-40', 'shadow-md');
                        headerPlaceholder.style.display = 'none';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Store reference to headerPlaceholder for use in smooth scrolling
        window.headerPlaceholder = headerPlaceholder;
    }
    
    // Setup navigation highlighting and smooth scrolling
function setupNavigation() {
    // Function to get all navigation links
    function getNavLinks() {
        const links = {};
        
        // Main navigation links
        const navLinks = document.querySelectorAll('header nav a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {

                if (href === './partnerships.html' || href === 'partnerships.html' || href === '#') {
                    // Check text content to identify partnerships link
                    if (link.textContent.trim().toLowerCase() === 'partnerships') {
                        links['partnerships'] = links['partnerships'] || [];
                        links['partnerships'].push(link);
                        return;
                    }
                }
                
                // For solution page link
                if (href === './solutions.html' || href === 'solutions.html') {
                    links['solutions'] = links['solutions'] || [];
                    links['solutions'].push(link);
                    return;
                }
                
                // For commitment page link
                if (href === './commitment.html' || href === 'commitment.html') {
                    links['commitment'] = links['commitment'] || [];
                    links['commitment'].push(link);
                    return;
                }
                
                // Extract the anchor part for linking
                const anchor = href.includes('#') ? 
                    href.substring(href.indexOf('#')) : 
                    href;
                
                // Use the anchor as a key
                const key = anchor.replace('#', '').replace(/-/g, ''); // Use global replace
                if (key) {
                    links[key] = links[key] || [];
                    links[key].push(link);
                }
            }
        });
        
        // Additional links throughout the page
        const additionalLinks = document.querySelectorAll('a[href^="#"]');
        additionalLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                const key = href.replace('#', '').replace(/-/g, ''); // Use global replace
                if (key) {
                    links[key] = links[key] || [];
                    links[key].push(link);
                }
            }
        });
        
        return links;
    }
    
    function checkSections() {
        const links = getNavLinks();
        
        // Reset all links to their original color
        Object.values(links).flat().forEach(link => {
            link.classList.remove('text-solara-blue');
        });
        
        // Get current scroll position plus some offset
        const scrollPos = window.scrollY + 150;
        
        // Get the current page path
        const pathname = window.location.pathname;
        const pageName = pathname.split('/').pop() || 'index.html';
        
        // Highlight based on current page
        switch (pageName) {
            case 'commitment.html':
                // On commitment page, highlight the commitment link
                const commitmentLinks = links['commitment'] || [];
                commitmentLinks.forEach(link => link.classList.add('text-solara-blue'));
                return;
                
            case 'solutions.html':
                // On solutions page, highlight the solutions link
                const solutionLinks = links['solutions'] || [];
                solutionLinks.forEach(link => link.classList.add('text-solara-blue'));
                return;
                
            case 'partnerships.html':
                // On partnerships page, highlight the partnerships link
                const partnershipLinks = links['partnerships'] || [];
                partnershipLinks.forEach(link => link.classList.add('text-solara-blue'));
                return;
                
            case '':
            case 'index.html':
                // On home page, check scroll position for section highlighting
                if (scrollPos < 200) {
                    // At top of page, highlight home
                    const homeLinks = links['home'] || [];
                    homeLinks.forEach(link => link.classList.add('text-solara-blue'));
                } else {
                    // Check which section is in view
                    highlightCurrentSection(links, scrollPos);
                }
                return;
                
            default:
                // For any other page, don't automatically highlight any nav item
                return;
        }
    }
    
    // Helper function to highlight the current section in view
    function highlightCurrentSection(links, scrollPos) {
        Object.keys(links).forEach(key => {
            if (['home', 'solutions', 'commitment'].includes(key)) return; // Skip page links
            
            const section = document.getElementById(key);
            if (section && 
                scrollPos >= section.offsetTop && 
                scrollPos < (section.offsetTop + section.offsetHeight)) {
                links[key].forEach(link => link.classList.add('text-solara-blue'));
            }
        });
    }
    
    // Add scroll event listener with throttling
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(checkSections, 50);
    });
    
    // Run once at page load
    checkSections();
    
    // Set up smooth scrolling for all page links
    setupSmoothScrolling();
}
    
    // Smooth scrolling for all internal links
    function setupSmoothScrolling() {
        // Get all links that point to an anchor on the page
        const links = document.querySelectorAll('a[href^="#"]');
        
        // Calculate the header height once
        const getHeaderHeight = () => {
            const header = document.querySelector('header');
            return header ? header.offsetHeight : 0;
        };
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Don't process links to other pages
                if (targetId.includes('.html')) return;
                
                e.preventDefault();
                
                // Special case for Home link
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    setTimeout(() => {
                        // Get the header height
                        const headerHeight = getHeaderHeight();
                        
                        // Calculate the final position
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = targetPosition - headerHeight - 20; // Adding 20px for spacing
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 10);
                }
            });
        });
    }
    
    // Set up logo and home link to scroll to top
    function setupHomeLinks() {
        // Select the logo link in the header and the Home link in the footer
        const logoLinks = document.querySelectorAll('header .text-2xl.font-bold a, footer a[href="#"]');
        
        // Function to handle smooth scrolling to top
        function smoothScrollToTop(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Add event listeners to both elements
        logoLinks.forEach(link => {
            link.addEventListener('click', smoothScrollToTop);
        });
    }
    
    // Set up special handling for "Explore Our Solutions" button
    function setupExploreButton() {
        // Get the "Explore Our Solutions" button specifically
        const exploreButton = document.querySelector('a[href="#processing-services"]');
        
        // Only add the smooth scroll to this specific button
        if (exploreButton) {
            exploreButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetElement = document.querySelector('#processing-services');
                
                if (targetElement) {
                    // Small delay to ensure DOM is stable
                    setTimeout(() => {
                        // Get the current header height
                        const headerHeight = document.querySelector('header').offsetHeight;
                        
                        // Calculate the final scroll position with offset
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = targetPosition - headerHeight - 20; // 20px extra spacing
                        
                        // Perform the smooth scroll
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 10);
                }
            });
        }
    }
    
    // Initialize Calendly bubble if it exists
    function initCalendlyBubble() {
        const calendlyBubble = document.querySelector('.floating-calendly-bubble');
        if (calendlyBubble) {
            calendlyBubble.addEventListener('click', function() {
                Calendly.initPopupWidget({url: 'https://calendly.com/sali-solarapayments/30min'});
                return false;
            });
        }
    }
    
    // Set up impact calculator buttons to load the calculator script
    function setupImpactButtons() {
        const impactButtons = document.querySelectorAll('button.impact');
        
        if (impactButtons.length > 0) {
            impactButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Load the impact calculator script dynamically
                    if (!window.impactCalculatorLoaded) {
                        const script = document.createElement('script');
                        script.src = './impact-calculator.js';
                        script.onload = function() {
                            // Open the calculator once the script is loaded
                            if (typeof openImpactCalculator === 'function') {
                                openImpactCalculator();
                            }
                        };
                        document.body.appendChild(script);
                        window.impactCalculatorLoaded = true;
                    } else {
                        // If already loaded, just open the calculator
                        if (typeof openImpactCalculator === 'function') {
                            openImpactCalculator();
                        }
                    }
                });
            });
        }
    }
    
    // Initialize all functionality
    setupMobileNav();
    makeHeaderSticky();
    setupNavigation();
    setupHomeLinks();
    setupExploreButton();
    initCalendlyBubble();
    setupImpactButtons();
    initCursorFollower();
});

function selectCompensationModel(model) {
    const compensationModelSelect = document.getElementById('compensation_model');
    if (compensationModelSelect) {
        compensationModelSelect.value = model;
    }
}

function toggleLoginModal() {
    const modal = document.getElementById('loginModal');

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');

        // Close when clicking outside the box
        modal.addEventListener('click', outsideClickClose);
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');

        modal.removeEventListener('click', outsideClickClose);
    }
}

function outsideClickClose(e) {
    const modalBox = document.querySelector('#loginModal > div');
    if (!modalBox.contains(e.target)) {
        toggleLoginModal();
    }
}
