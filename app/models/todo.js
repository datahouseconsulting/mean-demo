/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


/**
 * Create a new schema "object" that will represent a document/table in mongodb
 */
var TodoSchema = new mongoose.Schema({

    // list each column/property here followed by its type and any other attributes wanted
    // the default/trim do exactly what they sound like
    created: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        default: '',
        trim: true
    },
    done: {
        type: Boolean,
        default: false,
        trim: true
    }
});



// add the newly created schema to the mongoose as a model
mongoose.model('Todo', TodoSchema);
