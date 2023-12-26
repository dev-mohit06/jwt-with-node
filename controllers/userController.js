exports.info = (req, res, next) => {
    let currentUser = req.user;
    return res.status(200).json({ data: currentUser });
}