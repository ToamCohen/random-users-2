const api = new Api();
const render = new Renderer();

const load_button = $("#load-data");
const display_button = $("#display-data");
const save_button_to_localStorage = $("#save-to-localStorage");
const clear_button_from_localStorage = $("#clear-button-from-localStorage");

const load_data_on_click = function () {
	api.fetch_data_for_load();
};

load_button.on("click", load_data_on_click);

const display_users_on_click = function () {
	render.render(api.user, "#main-user", "#user");
	render.render(api.qoutes, "#quote", "#quote");
	render.render(api.pokemon, "#pokemon", "#pokemon");
	render.render(api.lorem, "#lorem", "#lorem");
	render.render({ name_data: api.users }, "#friends", "#users");
	render.render({ user: api.localStorageUsers }, "#list-of-users", "#list-of-users");
};

display_button.on("click", display_users_on_click);

const display_users_from_local_storage = function () {
	const containerID = $(this).closest("div").attr("id");
	const containerI = JSON.parse(containerID);
	const index = (r) => containerI === r.id;
	const foundIndex = api.localStorageUsers.findIndex(index);
	render.render(api.localStorageUsers[foundIndex].mainUser, "#main-user", "#user");
	render.render(api.localStorageUsers[foundIndex].qoutes, "#quote", "#quote");
	render.render(api.localStorageUsers[foundIndex].pokemon, "#pokemon", "#pokemon");
	render.render(api.localStorageUsers[foundIndex].text, "#lorem", "#lorem");
	render.render({ name_data: api.localStorageUsers[foundIndex].friends }, "#friends", "#users");
};

$("#list-of-users-container").on(
	"click",
	".button-for-desplay-user",
	display_users_from_local_storage
);

const clear_local_storage = function () {
	$("#list-of-users-container").empty();
	localStorage.clear();
};

save_button_to_localStorage.on("click", api.save_to_localStorage);

clear_button_from_localStorage.on("click", clear_local_storage);
