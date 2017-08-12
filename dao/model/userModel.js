var mongoose = require('mongoose');
var {
	Schema
} = mongoose;

var userSchema = new Schema({
	username: "string",
	password: {
		type: String,
		default: "111111"
	}
})

mongoose.model("user", userSchema, "users")