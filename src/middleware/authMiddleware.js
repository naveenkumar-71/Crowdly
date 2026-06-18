const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

    try {

        console.log(req.headers);

        const authHeader = req.headers.authorization;


        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const accessToken = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT ERROR =>", error);

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });

    }

};

module.exports = protect;