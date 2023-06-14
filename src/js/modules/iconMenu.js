export const iconMenu = () => {
	const iconMenu = document.querySelector('.icon-menu');
	const headerList = document.querySelector('.header__list');
	const body = document.querySelector('body');

	if (iconMenu) {
		iconMenu.addEventListener('click', () => {
			iconMenu.classList.toggle('_active');

			if (iconMenu.classList.contains('_active')) {
				headerList.classList.add('_show');
				body.classList.add('_scrollOff');
			} else {
				headerList.classList.remove('_show');
				body.classList.remove('_scrollOff');
			};
		});
	};
}