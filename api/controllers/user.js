import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export async function signup(req, res){
	try {
		const { userName, email, password } = req.body;


		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);


		const newUser = new User({
			userName,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				userName: newUser.userName,
                email : newUser.email
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller : ", error.message);
		res.status(500).json({ error: error.message });
	}
};

export async function login(req, res) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email : user.email
		});
	} catch (error) {
		console.log("Error in login controller : ", error.message);
		res.status(500).json({ error: error.message });
	}
};

export async function logout(req, res){
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller : ", error.message);
		res.status(500).json({ error: error.message });
	}
};