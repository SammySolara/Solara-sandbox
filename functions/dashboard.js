// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('solaraUser'));
    const usernameDisplay = document.getElementById('usernameDisplay');
    const merchantList = document.getElementById('merchantList');

    const PAYARC_PROXY_URL = 'https://apikeytesting.sali-a16.workers.dev/';

    if (user && user.email) {
        usernameDisplay.textContent = `Welcome, ${user.email.split('@')[0]}`;
        fetchMerchants();
    } else {
        usernameDisplay.textContent = 'User not found';
        merchantList.textContent = '';
    }


    async function fetchMerchants() {
        try {
            const response = await fetch(PAYARC_PROXY_URL);
            const data = await response.json();
            renderMerchantList(data.merchants || []);
        } catch (error) {
            console.error('Error fetching merchants:', error);
            merchantList.textContent = 'Error fetching merchants.';
        }
    }

        function renderMerchantList(merchants) {
            if (merchants.length === 0) {
                merchantList.textContent = 'No merchants found.';
                return;
            }

            merchantList.innerHTML = `
                <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Merchants</h2>
                <ul>
                    ${merchants.map(m => `<li>${m.businessName || 'Unnamed'} (ID: ${m.id})</li>`).join('')}
                </ul>
            `;
        }
    });
