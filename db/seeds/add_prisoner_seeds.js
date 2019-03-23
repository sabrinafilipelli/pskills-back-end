exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("prisoners")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("prisoners").insert([
				{
					name: "Al Capone",
					id_number: 1,
					prison_id: 1
				},
				{
					name: "Lucky Luciano",
					id_number: 72321,
					prison_id: 1
				},
				{
					name: `Salvatore 'Totò' Riina`,
					id_number: 1611930,
					prison_id: 2
				},
				{
					name: `Felice Maniero`,
					id_number: 1611931,
					prison_id: 2
				}
			]);
		});
};
