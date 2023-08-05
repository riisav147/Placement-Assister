const mongoose = require("mongoose");

const studentData = new mongoose.Schema({
    // personal details
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    officialEmail: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        // required: true
    },

    dob: {
        type: String,
        required: true
    },

    // Education 10th
    schoolName: {
        type: String,
        required: true
    },
    ten_board: {
        type: String,
        required: true
    },
    ten_yOfpassing: {
        type: String,
        required: true
    },
    ten_percentage: {
        type: String,
        required: true
    },
    ten_state: {
        type: String,
        // required: true
    },
    ten_country: {
        type: String,
        required: true
    },

    // Education 12th

    schoolName1: {
        type: String,
        required: true
    },
    twl_board: {
        type: String,
        required: true
    },
    twl_yOfpassing: {
        type: String,
        required: true
    },
    twl_percentage: {
        type: String,
        required: true
    },
    twl_state: {
        type: String,
        // required: true
    },
    twl_country: {
        type: String,
        required: true
    },

    // Diploma



});

const placementData = mongoose.model("placementData", studentData);
module.exports = placementData;