// Imports
const express = require("express");
const bcrypt = require("bcryptjs");

// Router Declaration
const router = express.Router();
const db = require("./prisonsModel");
const { adminRoute } = require("../auth/jwtModel");

// Routes
// ** == R - Read == ** //
// Read All
router.get("/", async (req, res) => {
	try {
		const prisons = await db.readAll();

		res.status(200).json(prisons);
	} catch (err) {
		res.status(500).json({
			errorMessage: "Houston, we hae a problem in PRISONS GET/"
		});
	}
});

// Read One
router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		let prison = await db.readOne(id);
		let prisoners = await db.readPrisoners(id);

		if (!prison) {
			res.status(404).json({
				errorMessage: "Prison does not exist in system"
			});
		} else {
			prison.prisoners = prisoners;
			res.status(200).json(prison);
		}
	} catch (err) {
		res.status(500).json({
			errorMessage: "Houston, we hae a problem in PRISONS GET/"
		});
	}
});

// Read Prisoners
router.get("/:id/prisoners", async (req, res) => {
	const { id } = req.params;

	try {
		let prison = await db.readOne(id);
		let prisoners = await db.readPrisoners(id);

		if (!prison) {
			res.status(404).json({
				errorMessage: "Prison does not exist in system"
			});
		} else if (!prisoners || prisoners.length === 0) {
			res.status(404).json({
				errorMessage: `No prisoners associated with ${prison.location}`
			});
		} else {
			res.status(200).json(prisoners);
		}
	} catch (err) {
		res.status(500).json({
			errorMessage: "Houston, we hae a problem in PRISONS GET/"
		});
	}
});

// ** == U - Update == ** //
router.put("/:id", adminRoute, async (req, res) => {
	const { id } = req.params;
	const updates = req.body;

	try {
		let prison = await db.readOne(id);

		if (!prison) {
			res.status(404).json({
				errorMessage: "There is no matching prison in the DB"
			});
		}

		if (updates.password) {
			let hash = bcrypt.hashSync(updates.password, 14);

			updates.password = hash;
		}

		if (updates.location) {
			let existingPrison = await db
				.findBy({
					location: updates.location
				})
				.first();

			if (existingPrison) {
				res.status(401).json({
					errorMessage: `${updates.location} is already in use`
				});
			}
		}

		let updatedPrison = await db.updatePrison(id, updates);

		res.status(200).json(updatedPrison);
	} catch (err) {
		res.status(500).json({
			errorMessage: "Houston, we hae a problem in PRISONS PUT/"
		});
	}
});

// ** == D - Destroy == ** //
router.delete("/:id", adminRoute, async (req, res) => {
	const { id } = req.params;

	try {
		let existingPrison = await db.findBy({ id }).first();

		if (!existingPrison) {
			res.status(404).json({
				errorMessage: "There is no matching prison in the DB"
			});
		}

		await db.destroyPrison(id);

		res.status(200).json(`${existingPrison.location} has been deleted`);
	} catch (err) {
		res.status(500).json({
			errorMessage: "Houston, we have a problem in Prisons DELETE/"
		});
	}
});

router.use("/", (req, res) => res.send("Welcome to the Prisons API"));

// Export
module.exports = router;
