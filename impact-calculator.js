// Impact Calculator functionality
function createCalculatorOverlay() {
    // Create the overlay container if it doesn't exist
    if (document.getElementById('impact-calculator-overlay')) {
        return document.getElementById('impact-calculator-overlay');
    }
    
    const calculatorOverlay = document.createElement('div');
    calculatorOverlay.id = 'impact-calculator-overlay';
    calculatorOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center';
    
    // Create the calculator content
    calculatorOverlay.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative">
            <button id="close-calculator" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                <i class="fas fa-times text-xl"></i>
            </button>
            
            <div class="text-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Calculate Your Impact</h2>
                <p class="text-gray-600">See how processing with Solara can help you make a difference</p>
            </div>
            
            <div class="space-y-6">
                <!-- Monthly Processing Volume -->
                <div>
                    <div class="flex justify-between mb-2">
                        <label for="volume-slider" class="font-medium text-gray-700">Monthly Processing Volume</label>
                        <span id="volume-display" class="font-medium text-solara-blue">$50,000</span>
                    </div>
                    <input type="range" id="volume-slider" min="50000" max="500000" step="5000" value="50000" 
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                </div>
                
                <!-- Monthly Transactions -->
                <div>
                    <div class="flex justify-between mb-2">
                        <label for="transactions-slider" class="font-medium text-gray-700">Average Monthly Transactions</label>
                        <span id="transactions-display" class="font-medium text-solara-blue">100</span>
                    </div>
                    <input type="range" id="transactions-slider" min="100" max="5000" step="50" value="100" 
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                </div>
                
                <!-- Results Section -->
                <div class="mt-8 p-6 bg-gray-100 rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="text-center p-4">
                            <p class="text-gray-600 mb-1">Your Charitable Impact</p>
                            <p class="text-3xl font-bold text-solara-blue" id="impact-result">$60.75</p>
                            <p class="text-sm text-gray-500">Monthly Contribution</p>
                        </div>
                        <div class="text-center p-4">
                            <p class="text-gray-600 mb-1">Annual Community Impact</p>
                            <p class="text-3xl font-bold text-solara-blue" id="annual-impact">$729</p>
                            <p class="text-sm text-gray-500">Yearly Contribution</p>
                        </div>
                    </div>
                </div>
                
                <div class="text-center">
                    <a href="#" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/sali-solarapayments/30min'});return false;" 
                    class="inline-block bg-solara-blue text-white py-3 px-8 rounded-md font-medium hover:bg-blue-600 transition hover-lift">
                    Schedule a Consultation
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Append the calculator overlay to the body
    document.body.appendChild(calculatorOverlay);
    
    // Set up event listeners
    setupCalculatorEvents(calculatorOverlay);
    
    return calculatorOverlay;
}

function setupCalculatorEvents(calculatorOverlay) {
    // Close button functionality
    const closeButton = calculatorOverlay.querySelector('#close-calculator');
    closeButton.addEventListener('click', function() {
        calculatorOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    });
    
    // Close on overlay click (outside of calculator)
    calculatorOverlay.addEventListener('click', function(e) {
        if (e.target === calculatorOverlay) {
            calculatorOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });
    
    // Set up calculator functionality
    const volumeSlider = calculatorOverlay.querySelector('#volume-slider');
    const transactionsSlider = calculatorOverlay.querySelector('#transactions-slider');
    const volumeDisplay = calculatorOverlay.querySelector('#volume-display');
    const transactionsDisplay = calculatorOverlay.querySelector('#transactions-display');
    const impactResult = calculatorOverlay.querySelector('#impact-result');
    const annualImpact = calculatorOverlay.querySelector('#annual-impact');
    
    // Update displays when sliders change
    volumeSlider.addEventListener('input', function() {
        volumeDisplay.textContent = formatCurrency(parseFloat(this.value));
        calculateImpact(volumeSlider, transactionsSlider, impactResult, annualImpact);
    });
    
    transactionsSlider.addEventListener('input', function() {
        transactionsDisplay.textContent = this.value;
        calculateImpact(volumeSlider, transactionsSlider, impactResult, annualImpact);
    });
    
    // Initial calculation
    calculateImpact(volumeSlider, transactionsSlider, impactResult, annualImpact);
}

// Function to format currency
function formatCurrency(value) {
    return '$' + value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

// Function to calculate the impact
function calculateImpact(volumeSlider, transactionsSlider, impactResult, annualImpact) {
    // Get values from sliders
    const monthlyVolume = parseFloat(volumeSlider.value);
    const monthlyTransactions = parseFloat(transactionsSlider.value);
    
    // Calculate processing fee (1.5% of volume)
    const percentageFee = monthlyVolume * 0.015;
    
    // Calculate transaction fees ($0.10 per transaction)
    const transactionFees = monthlyTransactions * 0.1;
    
    // Total revenue
    const totalRevenue = percentageFee + transactionFees;
    
    // Take 10% off the top for processor cut
    const afterProcessorCut = totalRevenue * 0.9;
    
    // Take 10% of the remaining amount for charitable impact
    const charitableImpact = afterProcessorCut * 0.1;
    
    // Update the displays
    impactResult.textContent = formatCurrency(charitableImpact);
    annualImpact.textContent = formatCurrency(charitableImpact * 12);
}

// Function to open the calculator
function openImpactCalculator() {
    const calculatorOverlay = createCalculatorOverlay();
    calculatorOverlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

// Make the openImpactCalculator function globally available
window.openImpactCalculator = openImpactCalculator;
