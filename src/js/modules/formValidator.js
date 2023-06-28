export const formValidator = () => {
	const form = document.querySelector('.form');
	const name = form.querySelector('[name="name"]');
	const tel = form.querySelector('[name="tel"]');

	console.log(name.value);

	form.addEventListener('submit', (e) => {

		if (name.value === "") {
			name.classList.add('error');
			e.preventDefault();
		} else {
			name.classList.remove('error');

		}

		if (tel.value === "") {
			tel.classList.add('error');
			e.preventDefault();
		} else {
			tel.classList.remove('error');
		}



	})
}