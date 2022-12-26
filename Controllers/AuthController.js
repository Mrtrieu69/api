import userModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, password } = req.body;
    // Create data to bd
    try {
        await userModel.create({
            username,
            password: bcrypt.hashSync(password, 10),
        });
        return res.status(200).send("Successfully!");
    } catch (error) {
        return res.status(404).send("Error!");
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        // Check email
        if (!user) {
            return res.status(400).send("Invalid password or email!");
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid password or email!");
        }

        // Create JWT
        const jwtToken = jwt.sign(
            {
                _id: user._id,
                username: user.username,
            },
            process.env.SECRET_JWT,
            { expiresIn: 60 * 60 * 24 }
        );

        return res.status(200).send({
            accessToken: jwtToken,
        });
    } catch (error) {
        return res.status(404).send("Error!");
    }
};
