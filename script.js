let isYearly = false;
let currentPlan = { name: "Arcade", price: 9 };

// Navigate between steps
function goToStep(stepNum) {
    // Hide all panels
    document.querySelectorAll('.form-panel').forEach(panel => panel.classList.add('hidden'));
    // Show selected panel
    document.getElementById(`step-${stepNum}`).classList.remove('hidden');
    
    // Update sidebar active state
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById(`nav-${stepNum}`).classList.add('active');

    if (stepNum === 4) updateSummary();
}

// Select monthly/yearly toggle
function toggleBill() {
    isYearly = document.getElementById('bill-check').checked;
    document.getElementById('mo-label').classList.toggle('active', !isYearly);
    document.getElementById('yr-label').classList.toggle('active', isYearly);
    
    // Update Plan prices in Step 2
    const prices = isYearly ? ["$90/yr", "$120/yr", "$150/yr"] : ["$9/mo", "$12/mo", "$15/mo"];
    document.querySelectorAll('.price-tag').forEach((el, index) => {
        el.innerText = prices[index];
    });

    // Update Add-on prices in Step 3
    const addonPrices = isYearly ? ["+$10/yr", "+$20/yr", "+$20/yr"] : ["+$1/mo", "+$2/mo", "+$2/mo"];
    document.querySelectorAll('.addon-price').forEach((el, index) => {
        el.innerText = addonPrices[index];
    });
}

// Plan selection
function selectPlan(element, moPrice, yrPrice, planName) {
    document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    currentPlan = { name: planName, price: isYearly ? yrPrice : moPrice };
}

// Toggle Add-on checkboxes
function toggleAddon(element) {
    element.classList.toggle('active');
    const checkbox = element.querySelector('input');
    checkbox.checked = !checkbox.checked;
}

// Update the final summary page
function updateSummary() {
    const period = isYearly ? "Yearly" : "Monthly";
    const suffix = isYearly ? "yr" : "mo";
    
    document.getElementById('final-plan-name').innerText = `${currentPlan.name} (${period})`;
    document.getElementById('final-plan-price').innerText = `$${currentPlan.price}/${suffix}`;
    
    let total = currentPlan.price;
    const finalAddonsBox = document.getElementById('addons-list-final');
    finalAddonsBox.innerHTML = "";

    document.querySelectorAll('.addon-box.active').forEach(addon => {
        const title = addon.querySelector('h3').innerText;
        const priceText = addon.querySelector('.addon-price').innerText;
        const priceValue = parseInt(priceText.replace(/[^0-9]/g, ''));
        
        total += priceValue;
        finalAddonsBox.innerHTML += `
            <div class="summary-row" style="margin-top:15px;">
                <span style="color:#9699ab">${title}</span>
                <span style="color:#02295a">${priceText}</span>
            </div>`;
    });

    document.getElementById('total-final-price').innerText = `+$${total}/${suffix}`;
}