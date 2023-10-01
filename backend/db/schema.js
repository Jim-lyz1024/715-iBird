const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const challengeSchema = new Schema({
	type: { type: String, enum: ['birdCollection', 'correctQuizzes', 'walkingDistance', 'elevationGain'] },
	level: { type: String, enum: ['bronze', 'silver', 'gold'] },
});

// DB Schema for a user
const userSchema = new Schema({
	username: { type: String, unique: true, required: true },
	passHash: { type: String, required: true },
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	myBirds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bird' }],
	totalWalkingDistance: { type: Number, default: 0 },
	totalElevationGain: { type: Number, default: 0 },
	totalCorrectQuizes: { type: Number, default: 0 },
	scores: { type: Number, default: 0 },
	achievedChallanges: [challengeSchema],
	kiwiLevel: { type: Number, default: 1 },
	kiwiExp: { type: Number, default: 0 },
	kiwiStage: { type: Number, default: 1 },
	isExpert: { type: Boolean, default: false }
});

const distanceGoalSchema = new mongoose.Schema({
	distance: { type: Number, required: true },  // in meters
	duration: { type: Number, required: true },  // in minutes
	level: { type: Number, enum: [1, 2, 3], required: true },
	status: { type: String, enum: ['inProgress', 'success', 'failed'], default: 'inProgress' },
	startDate: { type: Date, default: Date.now },
	endDate: { type: Date },
	endDistance: { type: Number }
});

const BirdCountGoalSchema = new mongoose.Schema({
	count: { type: Number, required: true },
	status: { type: String, enum: ['inProgress', 'success', 'failed'], default: 'inProgress' },
	level: { type: Number, enum: [1, 2, 3, 4, 5], required: true }, // number of birds to find = level * 3
	birdsFound: { type: Number, default: 0 }
});

const questionSchema = new Schema({
	question: { type: String, required: true },
	questionType: { type: String, default: "text" },
	answerSelectionType: { type: String, default: "single" },
	answers: [{ type: String, required: true }],
	correctAnswer: { type: String, required: true }
});

// DB Schema for a trip
const tripSchema = new Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	locations: [{
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true },
		timestamp: { type: Date, default: Date.now, required: true }
	}],
	isActive: { type: Boolean, default: true },
	isEdugaming: { type: Boolean, required: true },
	fitnessLevel: { type: String, enum: ['low', 'mid', 'high'], required: true },
	distanceGoal: distanceGoalSchema,
	birdCountGoals: [BirdCountGoalSchema],
	suspiciousLocation: { type: Boolean, default: false },
	images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
	startDate: { type: Date },
	endDate: { type: Date },
	distance: { type: Number, default: 0 },
	elevationGain: { type: Number, default: 0 },
	quiz: {
		type: {
			birdName: { type: String, required: true },
			birdRarity: { type: Number, required: true },
			questions: [questionSchema],
			isFlowHelper: { type: Boolean, default: false }
		},
		default: null
	},
	scores: { type: Number, default: 0 },
	lastTimeFoundBird: { type: Date, default: Date.now, required: true },
	fitnessAssessed: { type: Boolean, default: false }
});

const imageSchema = new Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	s3Key: { type: String, required: true },
	birdId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bird' },

	timestamp: { type: Date, required: true },
	location: {
		lat: {
			type: Number,
			required: false
		},
		lng: {
			type: Number,
			required: false
		}
	},
	expertStatus: {
		type: String,
		enum: ['NA', 'inProgress', 'done'],
		default: 'NA'
	}
});

const birdSchema = new Schema({
	name: { type: String, unique: true, required: true },
	maoriName: { type: String },
	scientificName: { type: String },
	otherNames: [{ type: String }],
	conservationStatus: { type: String },
	rarity: { type: Number, required: true },
	images: [{ type: String }],
	questions: [questionSchema]
});

const User = mongoose.model("User", userSchema);
const Trip = mongoose.model("Trip", tripSchema);
const Image = mongoose.model('Image', imageSchema);
const Bird = mongoose.model('Bird', birdSchema);

module.exports = { User, Trip, Image, Bird };
