// Supabase configuration
const SUPABASE_URL = 'https://etuxrjkfexeyjwafgmeg.supabase.co'; // Replace with your Supabase project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0dXhyamtmZXhleWp3YWZnbWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTkwNzAsImV4cCI6MjA2MTY5NTA3MH0.QJqfPSCqpKU7KpnjJoLwstmpOD193H5BVK5qpBjfRww'; // Replace with your Supabase anon/public key

// Initialize Supabase client
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        console.log('Login button found, attaching event');
        loginButton.addEventListener('click', handleLogin);
    } else {
        console.error('Login button not found');
    }

    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                toggleLoginModal();
            }
        });
    }

    checkUser();
});


// Function to handle login
async function handleLogin() {
    console.log('handleLogin triggered');
    const email = document.getElementById('email1').value;
    const password = document.getElementById('password').value;
    console.log(email, password)
    const loginMessage = document.getElementById('loginMessage');
    
    if (!email || !password) {
        loginMessage.textContent = 'Please enter both email and password';
        loginMessage.className = 'text-center text-sm text-red-500';
        return;
    }
    
    try {
        loginMessage.textContent = 'Signing in...';
        loginMessage.className = 'text-center text-sm text-blue-500';
        
        // Sign in with Supabase
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            loginMessage.textContent = error.message || 'Login failed';
            loginMessage.className = 'text-center text-sm text-red-500';
            return;
        }
        
        // Login successful
        loginMessage.textContent = 'Login successful! Redirecting...';
        loginMessage.className = 'text-center text-sm text-green-500';
        
        // Store user session
        localStorage.setItem('solaraUser', JSON.stringify(data.user));
        
        // Update UI to show logged in state
        updateUIForLoggedInUser(data.user);
        
        // Close modal after short delay
        // Redirect after short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        
    } catch (error) {
        loginMessage.textContent = 'An unexpected error occurred';
        loginMessage.className = 'text-center text-sm text-red-500';
        console.error('Login error:', error);
    }
}

// Function to check if user is already logged in
async function checkUser() {
    try {
        const { data, error } = await client.auth.getSession();

        if (error) {
            console.error('Session retrieval error:', error);
            return;
        }

        if (data?.session?.user) {
            updateUIForLoggedInUser(data.session.user);
        } else {
            console.log('No active session found');
        }
    } catch (error) {
        console.error('Error checking user session:', error);
    }
}


// Update UI based on logged in user
function updateUIForLoggedInUser(user) {
    // Get login button in the header
    const loginNav = document.querySelector('nav a[onclick="toggleLoginModal()"]');
    if (loginNav) {
        // Update login button to show user is logged in
        loginNav.innerHTML = `<i class="fas fa-user mr-2 text-sm"></i>${user.email.split('@')[0]}`;
        loginNav.onclick = handleLogout;
    }
}

// Handle logout
async function handleLogout() {
    try {
        const { error } = await client.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            return;
        }
        
        // Clear local storage
        localStorage.removeItem('solaraUser');
        
        // Reset UI
        const loginNav = document.querySelector('nav a[onclick="handleLogout"]');
        if (loginNav) {
            loginNav.innerHTML = '<i class="fas fa-lock mr-2 text-sm"></i>Login';
            loginNav.onclick = toggleLoginModal;
        }
        
        // Reload page to reset state
        window.location.reload();
        
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Fix the toggle login modal function if it's not defined elsewhere
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                toggleLoginModal();
            }
        });
    }
});
