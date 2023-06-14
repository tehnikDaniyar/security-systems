export const lazyLoading = () => {

	if ('loading' in HTMLImageElement.prototype) {
		// supported in browser
	} else {



		const lazyImages = document.querySelectorAll('img[data-src]');
		const loadMapBlock = document.querySelectorAll('._load-map');
		const windowHeight = document.documentElement.clientHeight;
		const loadMoreBlock = document.querySelector('._load-more');

		let lazyImagesPosition = [];

		if (lazyImages.length > 0) {
			lazyImages.forEach(img => {
				if (img.dataset.src) {
					lazyImagesPosition.push(img.getBoundingClientRect().top + pageYOffset);
					lazyScrollCheck(lazyImages, lazyImagesPosition);
				};
			})
		};

		let lazyMapPositions = [];

		if (loadMapBlock.length > 0) {
			loadMapBlock.forEach(mapBlock => {
				if (mapBlock.dataset.map) {
					lazyMapPositions.push(mapBlock.getBoundingClientRect().top + pageYOffset);
					lazyScrollCheck(loadMapBlock, lazyMapPositions);
				};
			});
		};


		window.addEventListener('scroll', () => {
			if (document.querySelectorAll('img[data-src]').length > 0 || document.querySelectorAll('._load-map').length > 0) {
				lazyScrollCheck(lazyImages, lazyImagesPosition);
				lazyScrollCheck(loadMapBlock, lazyMapPositions);
			};

			if (!loadMoreBlock.classList.contains('_loading')) {
				loadMore();
			}

		});



		function lazyScrollCheck(nodelist, arrOfPositions) {
			let itemIndex = arrOfPositions.findIndex(item => pageYOffset > item - windowHeight);
			if (itemIndex >= 0) {
				if (nodelist[itemIndex].dataset.src) {
					nodelist[itemIndex].src = nodelist[itemIndex].dataset.src;
					nodelist[itemIndex].removeAttribute('data-src');
				};

				if (nodelist[itemIndex].dataset.map) {
					nodelist[itemIndex].innerHTML = `
				<iframe
				src="${nodelist[itemIndex].dataset.map}"
				width="1200" height="450" style="border:0;" allowfullscreen="" loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"></iframe>
				`;
					nodelist[itemIndex].removeAttribute('data-map');
				};
				delete arrOfPositions[itemIndex];
				nodelist[itemIndex].closest('.preloadIcon').classList.remove('preloadIcon');
				;
			};
		};

		function loadMore() {
			let loadMoreBlockPosition = loadMoreBlock.getBoundingClientRect().top + pageYOffset;
			let loadMoreBlockHeight = loadMoreBlock.offsetHeight;

			if (pageYOffset > (loadMoreBlockPosition + loadMoreBlockHeight) - windowHeight) {
				getContent();
			};
		};

		async function getContent() {
			if (!loadMoreBlock.classList.contains('preloadIcon')) {
				let iconPreload = document.createElement('div');
				iconPreload.classList.add('preloadIcon');
				loadMoreBlock.insertAdjacentElement("beforeend", iconPreload);
			};

			loadMoreBlock.classList.add('_loading');

			let response = await fetch('../more.html', {
				method: 'GET',
			});

			if (response.ok) {
				let result = await response.text();
				loadMoreBlock.insertAdjacentHTML('beforeend', result);
				loadMoreBlock.classList.remove('_loading');
				loadMoreBlock.querySelector('.preloadIcon').remove();
			} else {
				alert("error");
			}
		};

	};
}