const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const popupCloseIcons = document.querySelectorAll('.close-popup');
let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
	popupLinks.forEach(popupLink => {
		popupLink.addEventListener('click', (event) => {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			event.preventDefault();
		});
	});
};


if (popupCloseIcons.length > 0) {
	popupCloseIcons.forEach(popupCloseIcon => {
		popupCloseIcon.addEventListener('click', (event) => {
			popupClose(popupCloseIcon.closest('.popup'));
			event.preventDefault();
		});
	});
};

function popupOpen(curentPopup) {
	if (curentPopup, unlock) {

		//============close opened popap=========
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		};

		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', (event) => {
			if (!event.target.closest('.popup__content')) {
				popupClose(event.target.closest('.popup'));
			};
		});


	};
};

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + "px";

	if (lockPadding.length > 0) {
		lockPadding.forEach(elem => elem.style.paddingRight = lockPaddingValue);
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(() => unlock = true, timeout);
};

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		};
	};
};

function bodyUnLock() {
	setTimeout(() => {
		if (lockPadding.length > 0) {
			lockPadding.forEach(elem => elem.style.paddingRight = "0px");
		};

		body.style.paddingRight = "0px";
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(() => unlock = true, timeout);
};

document.addEventListener('keydown', (event) => {
	let popupActive = document.querySelector('.popup.open');
	if (popupActive) {
		if (event.which === 27) {
			popupClose(popupActive);
		};
	};
});


//========================poliphils============================

(function () {

	// проверяем поддержку
	if (!Element.prototype.closest) {

		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;

			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}

})();

(function () {

	// проверяем поддержку
	if (!Element.prototype.matches) {

		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;

	}

})();