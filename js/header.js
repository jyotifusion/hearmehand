document.addEventListener('DOMContentLoaded', function() {
    // Include header
    fetch('../html/components/header.html')
        .then(response => response.text())
        .then(data => {
            // Insert header at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Set active link based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'home.html';
            const navLinks = document.querySelectorAll('.nav-links a');
            
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage || 
                    (currentPage === '' && linkHref === 'home.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
});
