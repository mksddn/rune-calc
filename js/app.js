document.addEventListener("DOMContentLoaded", function () {
	// SCROLL
	document.querySelectorAll('a[href^="#"]:not(.popup-link)').forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			let hash = this.getAttribute("href").substring(1);
			scroll(hash);
		});
	});

	function scroll(hash) {
		const scrollTarget = document.getElementById(hash);
		if (scrollTarget) {
			// const topOffset = $nav ? $nav.offsetHeight : 0;
			const topOffset = 0; // если не нужен отступ сверху
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;
			window.scrollBy({
			top: offsetPosition,
			behavior: "smooth",
			});
		}
	}

	// SPOILER
	const accordions = document.querySelectorAll(".spoiler");
	const openAccordion = (accordion) => {
		const content = accordion.querySelector(".spoiler__content");
		accordion.classList.add("spoiler__active");
		content.style.maxHeight = content.scrollHeight + "px";
	};
	const closeAccordion = (accordion) => {
		const content = accordion.querySelector(".spoiler__content");
		accordion.classList.remove("spoiler__active");
		content.style.maxHeight = null;
	};
	accordions.forEach((accordion) => {
		const intro = accordion.querySelector(".spoiler__intro");
		const content = accordion.querySelector(".spoiler__content");
		intro.onclick = () => {
			if (content.style.maxHeight) {
			closeAccordion(accordion);
			} else {
			accordions.forEach((accordion) => closeAccordion(accordion));
			openAccordion(accordion);
			}
		};
	});
});
