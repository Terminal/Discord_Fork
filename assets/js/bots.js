window.addEventListener('load', () => {
	const list = document.getElementById('list');
	const spinner = document.getElementsByClassName('spinner');
	const search = document.getElementById('search');

	// If a list exists on the page, detect the type of list to display
	if (list) {
		const listType = list.dataset.listType || 'bots';
		const listCategory = list.dataset.listCategory || 'all';
		createList(list, listType, listCategory);
	}

	// Delete the spinner after loading
	if (spinner && spinner[0]) {
		spinner[0].parentNode.removeChild(spinner[0]);
	}

	if (search && list) {
		search.addEventListener('keyup', () => {
			const query = search.value.toLowerCase().trim();
			const cards = [...list.childNodes];

			cards
			.filter(card => card.nodeName === 'SECTION')
			.forEach((card) => {
				// If can't find the card
				if (card.innerText.toLowerCase().indexOf(query) === -1) {
					card.classList.add('hidden');
				} else {
					// otherwise, allow it to be seen
					card.classList.remove('hidden');
				}
			})
		})
	}
})

const createList = async (target, type = 'bots', category = 'all') => {
	const items = await fetch(`/api/${type}/${category}.json`)
		.then(data => data.json());

	items
		.sort(() => Math.random() - .5)
		.forEach((item) => {
			const itemCard = document.createElement('section');
			const itemName = document.createElement('a');
			const itemLogoBox = document.createElement('div');
			const itemLogo = document.createElement('img')
			const itemDesc = document.createElement('span');
			const itemButtons = document.createElement('div');

			itemCard.classList.add('card');

			itemName.innerText = item.name;
			itemName.setAttribute('href', `/${type}/${item.id}`)
			itemName.classList.add('name');

			itemLogo.classList.add('avatar');
			itemLogo.src = item.avatar;

			if (item.nsfw) {
				// Append a "nsfw" tag
				const itemNSFW = document.createElement('span');
				itemNSFW.classList.add('nsfw-tag');
				itemNSFW.innerText = 'NSFW';
				itemName.appendChild(itemNSFW);

				// Add a blur to the NSFW logo
				itemLogo.classList.add('nsfw');
			}
			itemLogoBox.classList.add('avatar');
			itemLogoBox.appendChild(itemLogo);

			itemLogo.addEventListener('error', () => {
				itemLogo.src = '/assets/images/logo.png';
			})

			itemDesc.innerText = item.description;
			itemDesc.classList.add('description');

			if (item.link) {
				const itemInvite = document.createElement('a');
				itemInvite.classList.add('btn', 'green');
				itemInvite.innerText = 'Invite';
				itemInvite.href = item.link;
				itemButtons.appendChild(itemInvite);
			}

			itemButtons.classList.add('link', 'buttons');
			
			itemCard.appendChild(itemLogoBox);
			itemCard.appendChild(itemName);
			itemCard.appendChild(itemDesc);
			itemCard.appendChild(itemButtons);
			target.appendChild(itemCard);
		});
}
