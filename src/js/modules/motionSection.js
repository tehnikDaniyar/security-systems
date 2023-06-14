export const motionSection = () => {
	section = document.querySelector('[data-speed]');
	const sectionClassName = section.className;
	const sectionItems = document.querySelector(`.${sectionClassName}__items`);
	const sectionColumns = document.querySelectorAll(`.${sectionClassName}__column`);

	if (section && sectionItems && sectionColumns) {

		const motionSpeed = section.dataset.speed;

		let positionX = 0;
		let coordXprocent = 0;

		function setMouseSectionStyle() {
			let sectionItemsWidth = 0;

			sectionColumns.forEach(column => {
				sectionItemsWidth += column.offsetWidth;
			});

			let sectionDifferent = furnitureItemsWidth - section.offsetWidth;
			const distX = Math.floor(coordXprocent - positionX);

			positionX = positionX + (distX * motionSpeed);
			let position = sectionDifferent / 200 * positionX;

			console.log(position);
			sectionItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

			if (Math.abs(distX) > 0) {
				requestAnimationFrame(setMouseSectionStyle)
			} else {
				section.classList.remove("_init");
			}
		};

		section.addEventListener('mousemove', (e) => {
			const sectionWidth = section.offsetWidth;
			const coordX = e.pageX - sectionWidth / 2;
			coordXprocent = coordX / sectionWidth * 200;

			if (!section.classList.contains("_init")) {
				requestAnimationFrame(setMouseSectionStyle);
				section.classList.add("_init");
			};
		});

	}
}