export const scrollHeader = () => {
	const header = document.querySelector('header');
	const headerPoint = document.querySelector('.header-point');



	const callback = function (entries, observer) {

		entries.forEach(entry => {
			const { target, isIntersecting, intersectionRatio } = entry;

			if (!isIntersecting) {
				header.classList.add('scroll');
			};

			if (isIntersecting) {
				header.classList.remove('scroll');
			};
		});
	};


	const options = {
		threshold: 0,
		rootMargin: "0px 0px 0px 0px"
	};

	const observer = new IntersectionObserver(callback, options);

	observer.observe(headerPoint);

}