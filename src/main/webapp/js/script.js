// script.js
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 1) { // Change this value based on when you want to trigger the style change
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".fade-in-section");
    let lastScrollY = window.scrollY; // 이전 스크롤 위치

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
			 const currentScrollY = window.scrollY;
			
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }else{
				if (currentScrollY < lastScrollY) {
                    // 스크롤이 위로 올라갈 때만 초기화
                    entry.target.classList.remove('is-visible');
                }
			}
			 lastScrollY = currentScrollY; // 현재 스크롤 위치를 저장

        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});