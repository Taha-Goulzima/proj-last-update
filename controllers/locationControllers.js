const mongoose = require('mongoose');
const Location = require('../model/location'); 

const handleError = (res, error) => {
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: error.message });
    } else {
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @description Create a new location
 * @route /locations
 * @method POST 
 */
const Car = require('../model/cars'); // Assurez-vous que le modèle Car est importé

module.exports.createLocation = async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.body;

        // Récupérer les informations de la voiture
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Calcul du nombre de jours
        const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        const totalPrice = days * car.prixJour;

        // Créer la location avec le prix calculé
        const newLocation = await Location.create({
            ...req.body,
            prix: totalPrice
        });

        res.status(201).json(newLocation);
    } catch (error) {
        handleError(res, error);
    }
};


/**
 * @description Get all locations sorted by most recent start date
 * @route /locations
 * @method GET 
 */
module.exports.getAllLocation = async (req, res) => {
    try {
        const locations = await Location.find().populate('carId').sort({ createdAt: -1 });
        res.status(200).json(locations);
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * @description Get location details by ID
 * @route /locations/:id
 * @method GET
 */
module.exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * @description Update location by ID
 * @route /locations/:id
 * @method PUT
 */
module.exports.updateLocation = async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.body;

        // Récupérer les informations de la voiture si carId ou dates sont modifiés
        let totalPrice = null;
        if (carId || startDate || endDate) {
            const car = await Car.findById(carId || req.body.carId);
            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            }

            const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
            totalPrice = days * car.prixJour;
        }

        // Mettre à jour la location
        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            { ...req.body, prix: totalPrice },
            { new: true, runValidators: true }
        );

        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: "Location updated successfully", updatedLocation });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * @description Delete location by ID
 * @route /locations/:id
 * @method DELETE
 */
module.exports.deleteLocation = async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * @description Check location availability and simulate price
 * @route /locations/check 
 * @method POST
 */
module.exports.checkLocationAvailability = async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.body;

        // Récupérer la voiture pour le prix
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ message: "Invalid start or end date." });
        }

        const existingLocation = await Location.findOne({
            carId,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
            ]
        });

        if (existingLocation) {
            return res.status(200).json({ status: "en location", message: "Car is already rented for the selected dates." });
        }

        const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        const totalPrice = days * car.prixJour;

        res.status(200).json({ status: "disponible", prix: totalPrice });
    } catch (error) {
        handleError(res, error);
    }
};


/**
 * @description Start the location
 * @route /locations/:id/demarrer
 * @method POST
 */
module.exports.startLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, {
            etat: "en cours"
        }, { new: true });

        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: "Location started successfully", location });
    } catch (error) {
        handleError(res, error);
    }
};


/**
 * @description End the location
 * @route /locations/:id/terminer
 * @method POST 
 */
module.exports.endLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, {
            etat: "terminée"
        }, { new: true });

        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: "Location ended successfully", location });
    } catch (error) {
        handleError(res, error);
    }
};

