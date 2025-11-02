// main.js

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("header nav ul li a");
    const sections = document.querySelectorAll("section");

    // 页面滚动时更新导航高亮
    window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY + 100; // 偏移顶部导航高度
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
    });

    // 点击导航平滑滚动（兼容性增强）
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            const topOffset = targetSection.offsetTop - 70; // 顶部导航高度补偿
            window.scrollTo({
                top: topOffset,
                behavior: "smooth"
            });
        });
    });
});
