const mongoose = require("mongoose")

const RecommendationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    visitedDate: { type: Date, required: true },
    rating: {
        range: {
            min: { type: Number, min: 0 },
            max: { type: Number, max: 5 }
        }
    },
    pin: {
        coordinates: {
            lat: { type: Number },
            lon: { type: Number }
        }
    },
    comment: { type: String, required: true},
    photos: [{ type: String }]
})

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);

module.exports = Recommendation;