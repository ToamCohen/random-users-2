class Api {
	constructor() {
		this.user = {};
		this.users = [];
		this.qoutes = {};
		this.pokemon = {};
		this.lorem = "";
		this.localStorageUsers = [];
	}

	fetch_data_for_load = () => {
		this.fetch_qoute();
		this.fetch_users();
		this.fetch_pokemon();
		this.fetch_text();
	};

	create_main_user(results) {
		return new Main_user(
			results.location.street.number,
			results.name.first,
			results.name.last,
			results.location.city,
			results.location.state,
			results.picture.large
		);
	}

	creat_user(data) {
		this.users = data
			.splice(1, 6)
			.map((r) => new User(r.name.first, r.name.last, r.id.value));
	}

	random() {
		return Math.floor(Math.random() * 100 + 1);
	}

	fetch_users = () => {
		$.ajax({
			method: "GET",
			url: `https://randomuser.me/api/?page=${this.random()}&results=7&seed=abc`,
			success: (data) => {
				this.user = this.create_main_user(data.results[0]);
				this.creat_user(data.results);
				console.log(this.user);
			},
			error: (xhr, text, err) => console.log(text),
		});
	};

	fetch_qoute = () => {
		$.ajax({
			method: "GET",
			url: `https://api.kanye.rest`,
			success: (kanye) => (this.qoutes = { kanye: "kanye:" + kanye.quote }),
			error: (xhr, text, err) => console.log(text),
		});
	};

	proper_Case = (string) => {
		return `${string[0].toUpperCase()}${string.slice(1)}`;
	};

	fetch_pokemon = () => {
		$.ajax({
			method: "GET",
			url: `https://pokeapi.co/api/v2/pokemon/${this.random()}/`,
			success: (data) => {
				const name = this.proper_Case(data.name);
				this.pokemon = new Pokemon(name, data.sprites.back_default);
			},
			error: (xhr, text, err) => console.log(text),
		});
	};

	fetch_text = () => {
		$.ajax({
			method: "GET",
			url: `https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=${this.random()}&format`,
			success: (data) => (this.lorem = data),
			error: (xhr, text, err) => console.log(text),
		});
	};

	save_to_localStorage = () => {
		const users = JSON.parse(localStorage.users || "[]");
		users.push(
			new LocalStorage(
				this.user.id,
				this.user,
				this.qoutes,
				this.pokemon,
				this.lorem,
				this.users
			)
		);
		localStorage.users = JSON.stringify(users);
		this.localStorageUsers = users.filter((a) => a.mainUser.firstName !== undefined);
		console.log(JSON.parse(localStorage.users));
		console.log(this.localStorageUsers);
		console.log(this.localStorageUsers[0].id);
	};
}
