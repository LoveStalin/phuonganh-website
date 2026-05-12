document.addEventListener('DOMContentLoaded', () => {
    // Password
    const passwordScreen = document.getElementById('password-screen');
    const passField = document.getElementById('pass-field');
    const nums = document.querySelectorAll('.num-pad .num');

    // đổi pass ở đây
    const CORRECT_PASS = "0407";

    nums.forEach(num => {
        num.addEventListener('click', () => {
            if (num.classList.contains('ok')) {
                if (passField.value === CORRECT_PASS) {
                    passwordScreen.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else {
                    passField.value = "";
                    passField.placeholder = "Sai rồi lêu lêu 😝";
                }
            } else if (num.classList.contains('del')) {
                passField.value = passField.value.slice(0, -1);
            } else {
                passField.value += num.textContent;
            }
        });
    });

    // ========= SECRET POPUP EFFECTS (NO TEXT CHANGE) =========

    // Elements
    const btn = document.getElementById("secret-btn");
    const popup = document.getElementById("secret-popup");
    const closeBtn = document.getElementById("secret-close");
    const secretBox = document.querySelector(".secret-box");

    // ---Rung popup khi mở---
    function shakeBox() {
        secretBox.classList.add("shake-open");
        setTimeout(() => {
            secretBox.classList.remove("shake-open");
        }, 450);
    }

    // ---Tim rơi khi mở---
    function dropHearts() {
        for (let i = 0; i < 25; i++) {
            const heart = document.createElement("div");
            heart.classList.add("falling-heart");
            heart.textContent = "💗";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.animationDelay = Math.random() * 1.5 + "s";

            popup.appendChild(heart);

            setTimeout(() => heart.remove(), 4000);
        }
    }

    // ---Hiệu ứng đánh chữ---
    function typeText(element, speed = 30) {
        // get text from data attribute (fallback to element.textContent)
        const full = element.getAttribute('data-fulltext') ?? element.textContent ?? "";
        // cancel any previous typing interval attached to this element
        if (element._typingInterval) {
            clearInterval(element._typingInterval);
            element._typingInterval = null;
        }

        element.textContent = "";
        let i = 0;

        element._typingInterval = setInterval(() => {
            // guard: stop if out of range
            if (i >= full.length) {
                clearInterval(element._typingInterval);
                element._typingInterval = null;
                return;
            }

            // append the next character
            element.textContent += full[i];
            i++;
        }, speed);
    }

    // --- SAFE OPEN / CLOSE POPUP
    const openBtn = document.getElementById('secret-btn');
    const popupEl = document.getElementById('secret-popup');
    const closeBtnEl = document.getElementById('secret-close');

    if (!openBtn || !popupEl || !closeBtnEl || !secretBox) {
        console.warn('Missing popup elements (secret-btn / secret-popup / secret-close / .secret-box). Check your HTML IDs/classes.');
    } else {

        openBtn.addEventListener('click', () => {
            // show popup
            popupEl.style.display = 'flex';

            // shake + hearts
            shakeBox();
            dropHearts();

            const textEl = document.getElementById('myTypingText') || document.querySelector('.secret-text');
            if (textEl) {
                // reset mỗi lần mở, lưu text gốc vào data-fulltext (recommended)
                const original = textEl.getAttribute('data-fulltext') || textEl.textContent;
                // ensure the attribute exists so we can restore on close
                if (!textEl.getAttribute('data-fulltext')) textEl.setAttribute('data-fulltext', original);
                // gọi typing (hàm typeText(element, speed) phải có trong file)
                typeText(textEl, 28);
            }
        });

        closeBtnEl.addEventListener('click', () => {
            // hide popup
            popupEl.style.display = 'none';

            // remove any falling hearts left in DOM
            const leftover = popupEl.querySelectorAll('.falling-heart');
            leftover.forEach(h => h.remove());

            // restore text to original (so next open types from start)
            const textEl = document.getElementById('myTypingText') || document.querySelector('.secret-text');
            if (textEl) {
                const original = textEl.getAttribute('data-fulltext');
                if (original !== null) textEl.textContent = original;
            }
        });
    }

    // chặn scroll khi chưa vào
    document.body.style.overflow = 'hidden';

    /* script.js — logic for interactions */
    const galleryGrid = document.getElementById('gallery-grid');

    if (galleryGrid) {
        galleryGrid.addEventListener('click', async (e) => {
            if (e.target.classList.contains('photo') && e.target.textContent.includes('+ Add')) {
                // tạo input upload tạm
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (ev) => {
                    const file = ev.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (r) => {
                            const newPhoto = document.createElement('div');
                            newPhoto.className = 'photo';
                            newPhoto.style.background = `url(${r.target.result}) center/cover no-repeat`;
                            galleryGrid.insertBefore(newPhoto, galleryGrid.firstChild);
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            }
        });
    }

    // basic DOM refs
    const msgForm = document.getElementById('msg-form');
    const msgInput = document.getElementById('msg-input');
    const msgs = document.getElementById('msgs');
    const genWishBtn = document.getElementById('gen-wish');
    const wishArea = document.getElementById('wish-area');
    const startConfetti = document.getElementById('start-confetti');
    const massGenerate = document.getElementById('mass-generate');
    const cake = document.getElementById('cake');
    const toggleCake = document.getElementById('toggle-cake');
    const playMusic = document.getElementById('play-music');
    const bgAudio = document.getElementById('bg-audio');

    // sample wish parts
    const wishStarts = [
        "Chúc mừng sinh nhật!", "Happy b-day!", "Mừng tuổi mới!",
        "Ngày đặc biệt của cậu", "Gửi tới Phương Anh những lời chúc", "Sinh nhật Phương Anh"
    ];
    const wishMiddles = [
        "tuổi mới thật rực rỡ", "mọi điều suôn sẻ", "những thành công rực rỡ",
        "sức khoẻ dồi dào", "được yêu thương thật nhiều", "Học giỏi,luôn xinh đẹp", "Hạnh phúc"
    ];
    const wishEnds = [
        "❤️", "🎉", "✨", "🥳", "🤍"
    ];

    // messages form
    if (msgForm) {
        msgForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const v = msgInput.value.trim();
            if (!v) return;
            const el = document.createElement('div');
            el.className = 'msg';
            el.textContent = v + " — từ bạn";
            msgs.prepend(el);
            msgInput.value = '';
        });
    }

    // wish generator
    if (genWishBtn) {
        genWishBtn.addEventListener('click', () => {
            const s = wishStarts[Math.floor(Math.random() * wishStarts.length)];
            const m = wishMiddles[Math.floor(Math.random() * wishMiddles.length)];
            const e = wishEnds[Math.floor(Math.random() * wishEnds.length)];
            const line = `${s} Mong bạn ${m} ${e}`;
            const p = document.createElement('div');
            p.textContent = line;
            wishArea.prepend(p);
            // little sparkle animation
            p.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350, easing: 'ease-out' });
        });
    }

    // 💖 Moving Neon Heart
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    let t = 0;


    // confetti simple implementation (vanilla)
    function simpleConfetti() {
        const count = 120;
        for (let i = 0; i < count; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            const size = Math.random() * 10 + 6;
            c.style.position = 'fixed';
            c.style.left = Math.random() * 100 + '%';
            c.style.top = '-10%';
            c.style.width = size + 'px';
            c.style.height = (size * 1.6) + 'px';
            c.style.background = `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;
            c.style.opacity = Math.random() * 0.9 + 0.6;
            c.style.borderRadius = '3px';
            c.style.transform = `rotate(${Math.random() * 360}deg)`;
            c.style.zIndex = 9999;
            c.style.pointerEvents = 'none';
            document.body.appendChild(c);
            // animate
            const fall = c.animate([
                { transform: c.style.transform, top: '-10%' },
                { transform: c.style.transform + ' translateY(120vh) rotate(360deg)', top: '120%' }
            ], { duration: 2000 + Math.random() * 2000, easing: 'cubic-bezier(.2,.7,.2,1)' });
            fall.onfinish = () => {
                c.remove();
            }
        }
    }

    if (startConfetti) {
        startConfetti.addEventListener('click', () => simpleConfetti());
    }

    // 💖 Heart rain effect
    function heartRain() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 16 + 12) + 'px';
        heart.style.opacity = Math.random() * 0.6 + 0.4;
        document.body.appendChild(heart);

        // Remove after animation
        setTimeout(() => heart.remove(), 4000);
    }

    // tạo mưa tim nhẹ nhàng mỗi vài trăm ms
    setInterval(heartRain, 250);

    // audio control (user should provide a src or the file by dropping into folder)
    let audioPlaying = false;

    function toggleAudio() {
        const audio = document.getElementById("bg-audio");
        if (!audio) return;

        if (audioPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        audioPlaying = !audioPlaying;

        // Update button text
        const playMusic = document.getElementById('play-music');
        if (playMusic) {
            playMusic.textContent = audioPlaying ? "Tắt nhạc" : "Bật nhạc";
        }
    }

    // Attach to play music button
    if (playMusic) {
        playMusic.textContent = "Bật nhạc"; // Initial text
        playMusic.addEventListener('click', toggleAudio);
    }

    // little easter: keyboard shortcut for confetti
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
            simpleConfetti();
        }
    });

    // small accessibility: focus first control
    document.querySelector('.controls .btn')?.focus();

    // 💌 Lời chúc theo thời gian trong ngày
    function dailyWish() {
        const greetEl = document.getElementById('time-greet');
        const now = new Date();
        const hour = now.getHours();
        let message = "";

        if (hour >= 5 && hour < 11) {
            message = "Chào buổi sáng, Phương Anh ☀️! Chúc cậu một ngày mới tràn năng lượng, luôn mỉm cười và đừng quên ăn sáng đấy nhé 💕";
        }
        else if (hour >= 11 && hour < 17) {
            message = "Buổi chiều vui vẻ nha Phương Anh 🌸! Nhớ uống đủ nước, ăn đủ no, đừng học căng quá, nhớ nghỉ giữa giờ nha 💖";
        }
        else if (hour >= 17 && hour < 21) {
            message = "Tối an lành nè 🌆! Hy vọng Phương Anh có buổi tối thật chill, ăn ngon và làm bài thiệc thư giãn nhaaaa ✨";
        }
        else {
            message = "Khuya rồi đó Phương Anh ơiii 🌙💤 — ngủ sớm đi nha, sáng mai còn dậy sớm nè, đừng thức khuya làm bài tập nữa, không tốt cho sức khỏe đâu 😴💗";
        }
        if (greetEl) greetEl.textContent = message;
    }

    // chạy 1 lần khi load
    dailyWish();

    // cập nhật lại mỗi phút
    setInterval(dailyWish, 60000);

    // 🎂 Countdown to Phương Anh's Birthday
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let target = new Date(`${currentYear}-07-04T00:00:00`);

        // Nếu sinh nhật năm nay qua rồi => đếm cho năm sau
        if (now > target) {
            target = new Date(`${currentYear + 1}-07-04T00:00:00`);
        }

        const diff = target - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        const msg = document.getElementById('birthday-msg');
        if (msg) {
            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                msg.textContent = "🎉 Hôm nay là sinh nhật của Phương Anh rồi đó! Chúc mừng sinh nhật nhaaa 🥳💖";
            } else {
                msg.textContent = `Còn ${days} ngày nữa là tới sinh nhật của Phương Anh rồi đó 😚`;
            }
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    document.querySelectorAll(".card").forEach(card => {
        const hearts = [
            { class: "heart-top-left", icon: "💖" },
            { class: "heart-top-right", icon: "💗" },
            { class: "heart-bottom-left", icon: "💕" },
            { class: "heart-bottom-right", icon: "💞" },
        ];

        hearts.forEach(h => {
            const span = document.createElement("span");
            span.classList.add("heart-frame", h.class);
            span.textContent = h.icon;
            card.appendChild(span);
        });
    });

    ///DARK MODE
    const toggleDark = document.getElementById("darkModeToggle");

    if (toggleDark) {
        toggleDark.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            // đổi icon mặt trăng <-> mặt trời
            if (document.body.classList.contains("dark")) {
                toggleDark.textContent = "☀️";
            } else {
                toggleDark.textContent = "🌙";
            }
        });
    }

    ///Sparkles JS
    const sparkleCanvas = document.getElementById("sparkleCanvas");
    const ctxSparkle = sparkleCanvas.getContext("2d");
    let W, H;

    function resizeSparkle() {
        W = sparkleCanvas.width = window.innerWidth;
        H = sparkleCanvas.height = window.innerHeight;
    }
    resizeSparkle();
    window.addEventListener("resize", resizeSparkle);

    let particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.5 + 0.3
        });
    }

    function drawSparkles() {
        ctxSparkle.clearRect(0, 0, W, H);

        particles.forEach(p => {
            ctxSparkle.fillStyle = `rgba(255, 200, 255, ${p.alpha})`;
            ctxSparkle.beginPath();
            ctxSparkle.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctxSparkle.fill();

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > W) p.speedX *= -1;
            if (p.y < 0 || p.y > H) p.speedY *= -1;
        });

        requestAnimationFrame(drawSparkles);
    }
    drawSparkles();
    document.body.classList.add("glow-mode");
    document.body.classList.add("gradient-mode");
    window.lightTrailEnabled = true; // mặc định bật

    function createLightTrail(x, y) {
        if (!window.lightTrailEnabled) return; // nếu tắt thì không vẽ

        const dot = document.createElement("div");
        dot.className = "light-trail";
        dot.style.left = x + "px";
        dot.style.top = y + "px";
        document.body.appendChild(dot);

        setTimeout(() => dot.remove(), 600);
    }

    //PC
    document.addEventListener("mousemove", (e) => {
        createLightTrail(e.clientX, e.clientY);
    });

    //Mobile
    document.addEventListener("touchmove", (e) => {
        let touch = e.touches[0];
        createLightTrail(touch.clientX, touch.clientY);
    });

    ///3D gyro
    window.tiltEnabled = true;

    // ----- ĐIỀU CHỈNH GYRO -----
    window.addEventListener("deviceorientation", (e) => {
        console.log("LOG TEST → beta:", e.beta, " gamma:", e.gamma);
    });

    function handleGyro(e) {
        if (!window.tiltEnabled) return;

        let x = e.beta || 0;
        let y = e.gamma || 0;

        // Limit movement
        x = Math.max(-30, Math.min(30, x));
        y = Math.max(-30, Math.min(30, y));

        const tiltX = x / 2;
        const tiltY = y / 2;

        document.querySelectorAll(".card").forEach(card => {
            card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
    }

    // ----- KÍCH HOẠT GYRO -----
    function enableGyro() {
        const btn = document.getElementById("enableGyroBtn");

        if (btn) {
            btn.addEventListener("click", () => {

                // iOS
                if (typeof DeviceOrientationEvent !== "undefined" &&
                    typeof DeviceOrientationEvent.requestPermission === "function") {

                    DeviceOrientationEvent.requestPermission().then(result => {
                        if (result === "granted") {
                            window.addEventListener("deviceorientation", handleGyro);
                            alert("Đã bật nghiêng 3D!");
                        } else {
                            alert("Phương Anh cần cho phép truy cập cảm biến.");
                        }
                    });

                } else {
                    // Android
                    window.addEventListener("deviceorientation", handleGyro);
                    alert("Đã bật nghiêng 3D!");
                }
            });
        }
    }

    //Gọi hàm Gyro
    enableGyro();

    // ----- TOGGLE TILT -----
    const toggleTilt = document.getElementById("toggleTilt");
    if (toggleTilt) {
        toggleTilt.addEventListener("change", (e) => {
            window.tiltEnabled = e.target.checked;

            if (!window.tiltEnabled) {
                document.querySelectorAll(".card").forEach(card => {
                    card.style.transform = "none";
                });
            }
        });
    }

    ///Setting Panels
    const settingsPanel = document.getElementById("settingsPanel");
    const openSettings = document.getElementById("openSettings");

    if (openSettings) {
        openSettings.addEventListener("click", () => {
            if (settingsPanel.classList.contains("show")) {
                //Đóng panel
                settingsPanel.classList.remove("show");
                setTimeout(() => {
                    settingsPanel.style.display = "none";
                }, 200);
            } else {
                //Mở panel
                settingsPanel.style.display = "flex";
                requestAnimationFrame(() => {
                    settingsPanel.classList.add("show");
                });
            }
        });
    }

    //Sparkles
    const toggleSparkle = document.getElementById("toggleSparkle");
    if (toggleSparkle) {
        toggleSparkle.addEventListener("change", (e) => {
            sparkleCanvas.style.display = e.target.checked ? "block" : "none";
        });
    }

    //Glow
    const toggleGlow = document.getElementById("toggleGlow");
    if (toggleGlow) {
        toggleGlow.addEventListener("change", (e) => {
            document.body.classList.toggle("glow-mode", e.target.checked);
        });
    }

    //Gradient
    const toggleGradient = document.getElementById("toggleGradient");
    if (toggleGradient) {
        toggleGradient.addEventListener("change", (e) => {
            document.body.classList.toggle("gradient-mode", e.target.checked);
        });
    }

    //Light Trail
    const toggleTrail = document.getElementById("toggleTrail");
    if (toggleTrail) {
        toggleTrail.addEventListener("change", (e) => {
            window.lightTrailEnabled = e.target.checked;
        });
    }

    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const circle = document.createElement("span");
            circle.classList.add("ripple");

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            circle.style.width = circle.style.height = size + "px";
            circle.style.left = e.clientX - rect.left - size / 2 + "px";
            circle.style.top = e.clientY - rect.top - size / 2 + "px";

            this.appendChild(circle);

            setTimeout(() => circle.remove(), 600);
        });
    });
});