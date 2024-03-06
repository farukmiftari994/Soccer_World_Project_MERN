function adminCheck(req, res, next) {
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(402).json({
      error: "Only admin can have access",
    });
  } else {
    next();
  }
}

export default adminCheck;
