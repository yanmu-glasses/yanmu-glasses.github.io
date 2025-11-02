document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("header nav ul li a");
    const sections = document.querySelectorAll("section");
    const header = document.querySelector("header");
    let lastScrollTop = 0;
    let ticking = false;

    // 页面滚动逻辑
    function onScroll() {
        const scrollPos = window.scrollY + 100;
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        // ====== 导航高亮 ======
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href").substring(1) === section.id) {
                        link.classList.add("active");
                    }
                });
            }
        });

        // ====== 移动端下滑隐藏 / 上滑显示 ======
        if (window.innerWidth < 768) {
            if (currentScroll > lastScrollTop + 10 && currentScroll > 80) {
                header.style.transform = "translateY(-100%)";
            } else if (currentScroll < lastScrollTop - 10) {
                header.style.transform = "translateY(0)";
            }
        } else {
            header.style.transform = "translateY(0)";
        }

        lastScrollTop = Math.max(currentScroll, 0);
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });

    // 点击导航平滑滚动
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            const topOffset = targetSection.offsetTop - 70;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
        });
    });

    // 屏幕旋转或尺寸变化时重置导航栏
    window.addEventListener("resize", () => {
        header.style.transform = "translateY(0)";
    });
});
