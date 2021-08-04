import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	}
}, {
	timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPass){
	return await bcrypt.compare(enteredPass, this.password)
}

userSchema.pre('save',async function(next){
	if(!this.isModified('password')){
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
})

// pre is from mongoose
// isModified is from mongos as well, it checks if the parameter is being changed or not

const User = mongoose.model('User', userSchema)

export default User;