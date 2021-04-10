const mongoose = require("mongoose");

const { Schema } = mongoose;

const dataSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        active: {
            type: Boolean
        }
    }
)

module.exports = mongoose.model('Data', dataSchema, 'dummy_data');
