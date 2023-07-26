const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const User = require('./models/User');

const app = express();
const port = 5000;
const dbName = 'dashboard';

app.use(express.json())
app.use(cors({
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE"]
}))

//connect to database
const db = process.env.mongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('Connected to database'))
    .catch(error => console.log(error));

//ROUTES//
app.get('/api/auth', auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

//REGISTER//
app.post('/api/register', async (req, res) => {
    try {
		const { username, email, password, confirmPassword } = req.body;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: 'Invalid email format' });
		}

		//TODO: DISPLAY THIS ON FRONTEND FOR USER

		if (!username || !password || !email || !confirmPassword) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: 'Passwords do not match' });
		}

		//TODO: DISPLAY THIS ON FRONTEND FOR USER
  
		// Check if the username or email already exists in the database
		const existingUser = await User.findOne({ $or: [{ username }, { email }] });

		if (existingUser) {
			return res.status(409).json({ error: 'Username or email already exists' });
		}

		//TODO: DISPLAY THIS ON FRONTEND FOR USER
  
		const hashedPassword = await bcrypt.hash(password, 10);

      // If all validation checks pass, proceed with user registration
      // Insert the user data into the database
		try {
			const newUser = {
				username: username,
				email: email,
				password: hashedPassword,
			};
			//const result = 
			await User.create(newUser)

			// jwt.sign(
			// 	{ id: result.insertedId }, // Using the inserted user's ID as the JWT payload
			// 	process.env.JWT_SECRET,
			// 	{ expiresIn: 3600 },
			// 	(err, token) => {
			// 	  if (err) throw err;
			// 	  res.json({ token, id: result.insertedId });
			// 	}
			//   );
			} catch (err) {
				console.error('Error:', err);
				res.status(500).json({ error: 'Internal Server Error' });
			} finally {
				mongoose.connection.close()
			}
	} catch (error) {
		console.error('Error during registration:', error);
		res.status(500).json({ error: 'An error occurred during registration' });
	}
  });

//LOGIN//
app.post('/api/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		// Retrieve the user data from the database based on the username
		const user = await User.findOne({ $or: [{ username }] });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		if (!password) {
			return res.status(404).json({ error: 'Password not found' });
		}

		// Compare the provided password with the hashed password stored in the user object
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (isPasswordValid) {
			jwt.sign(
				{ id: user._id }, // Using the user's ID as the JWT payload
				process.env.JWT_SECRET, // Replace with your JWT secret key
				{ expiresIn: 3600 },
				(err, token) => {
				  if (err) throw err;
				  res.json({
					token,
					id: user._id,
					username: user.username, // If 'name' is a field in your user object
				  });
				}
			  );
		} else {
		// Passwords do not match, authentication failed
		return res.status(401).json({ error: 'Invalid password' });
		}
	} catch (error) {
		console.error('Error during login:', error);
		res.status(500).json({ error: 'An error occurred during login' });
	}
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});