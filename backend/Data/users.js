import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@admin.com',
		password : bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Shihab Sikder',
		email: 'shihab@shihab.com',
		password : bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Adib Abrar',
		email: 'adib@abrar.com',
		password : bcrypt.hashSync('123456', 10),
	}
]

export default users;