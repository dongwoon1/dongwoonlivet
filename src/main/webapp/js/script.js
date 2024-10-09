// 스크롤에 따라 헤드 변화
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 1) { // Change this value based on when you want to trigger the style change
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

//헤더 메뉴 이동을 스크롤링으로 하는 기능 + 천천히 스크롤링
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - 50; // 필요한 만큼 보정 값을 설정 (헤더 높이 등 고려 가능)
        const duration = 1700; // 스크롤 애니메이션 지속 시간 (밀리초 단위)
        let startTime = null;

        function animationScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animationScroll);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animationScroll);
    });
});

//스크롤시 화면 점멸
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".fade-in-section");
    let lastScrollY = window.scrollY; // 이전 스크롤 위치

    const options = {
        threshold: 0.02
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


//more 버튼 활성화시 lineup등장 및 버튼 숨김
document.querySelector('.more-btn').addEventListener('click', function() {
  const hiddenContainers = document.querySelectorAll('.hidden');
  hiddenContainers.forEach(container => {
    container.classList.remove('hidden');
  });
  // 버튼을 숨기기 위해 더 이상 필요 없을 때 제거
  this.style.display = 'none';
});


//검색 폰트 클릭 이벤트
document.querySelector('.fa-magnifying-glass').addEventListener('click', function () {
    const searchText = document.querySelector('.faq-search-btn').value.toLowerCase(); // 입력값
    const faqBoxes = document.querySelectorAll('.faq-box'); // 모든 FAQ 항목
    
    faqBoxes.forEach(faqBox => {
        const faqContent = faqBox.querySelector('.faq-box-content span').textContent.toLowerCase();
        
        // 입력값이 FAQ 내용에 포함되는지 확인
        if (faqContent.includes(searchText)) {
            faqBox.style.display = 'block'; // 일치하면 표시
        } else {
            faqBox.style.display = 'none'; // 일치하지 않으면 숨김
        }
    });
});


//검색 폰트 enter 이벤트
document.querySelector('.faq-search-btn').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Enter 키가 눌렸다면 검색 아이콘의 클릭 이벤트 실행
        document.querySelector('.fa-magnifying-glass').click();
    }
});


// 모든 fa-chevron-down 아이콘에 이벤트 리스너 추가
document.querySelectorAll('.fa-chevron-down').forEach((icon) => {
    icon.addEventListener('click', function () {
        // 현재 클릭된 아이콘의 상위 faq-box 다음에 있는 faq-reply를 찾음
        const reply = this.closest('.faq-box').nextElementSibling;
        const faqBox = this.closest('.faq-box');
        const down = faqBox.querySelector('.fa-chevron-down'); // 하향 아이콘
        const up = faqBox.querySelector('.fa-chevron-up');     // 상향 아이콘

        // 답변이 표시되어 있으면 숨기고, 숨겨져 있으면 표시
        if (reply.style.display === 'none' || !reply.style.display) {
            reply.style.display = 'block';  // 답변을 보이게 함
            faqBox.style.borderBottom = 'none';  // border-bottom을 없앰
            down.style.display = 'none';   // 하향 아이콘 숨김
            up.style.display = 'block';    // 상향 아이콘 표시
        } 
    });
});

//fa-chevron-up 이벤트	
document.querySelectorAll('.fa-chevron-up').forEach((icon) => {
    icon.addEventListener('click', function () {
        // 현재 클릭된 아이콘의 상위 faq-box 다음에 있는 faq-reply를 찾음
        const reply = this.closest('.faq-box').nextElementSibling;
        const faqBox = this.closest('.faq-box');
        const down = faqBox.querySelector('.fa-chevron-down'); // 하향 아이콘
        const up = faqBox.querySelector('.fa-chevron-up');     // 상향 아이콘

        // 답변이 보이면 숨기게 설정
        if (reply.style.display === 'block') {
            reply.style.display = 'none';   // 답변을 숨김
            faqBox.style.borderBottom = ''; // 원래 상태로 복구 (기본값)
            up.style.display = 'none';      // 상향 아이콘 숨김
            down.style.display = 'block';   // 하향 아이콘 표시
        }
    });
});

// 지도 초기화 함수
function initMap() {
    // 지도에 표시할 위치 (예: 서울)
    const okhyang = { lat: 37.5665, lng: 126.9780 };

    // 지도 객체 생성 및 설정
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,  // 줌 레벨
        center: okhyang  // 초기 중심 위치
    });

    // 마커 생성 및 지도에 표시
    const marker = new google.maps.Marker({
        position: okhyang,
        map: map,
        title: '옥향아파트'
    });
    console.log("map", map);
}

