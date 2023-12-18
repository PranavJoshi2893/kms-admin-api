const User = require('./user_model');
const { hash, compare } = require('bcrypt');

async function registration(req, res) {
    try {
        const { first_name, last_name, username, password } = req.body;

        //check username already taken or not
        const user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ message: "Username already taken by another user" })
        }

        //create hashed password
        const hashedPassword = await hash(password, 10);

        //register new user
        const newUser = new User({
            first_name,
            last_name,
            username,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ message: "New User created" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }


}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        //find user with unique username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "user with provided username not found" })
        }

        // compare password
        const isMatched = await compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Unauthorized: Invalid Password" })
        }

        return res.status(200).json({ message: "Login Successful" })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    registration,
    login
}