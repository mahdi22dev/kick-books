export const EditUsername = (req, res) => {
  try {
    const token = req?.cookies?.access_token;
    const { newUsername } = req?.body;
    console.log(newUsername);
    if (!token || !req.user) {
      return res.status(401).json({
        success: false,
        request: null,
        message: "Your Not Authorized",
      });
    }

    return res.status(201).json({
      success: true,
      request: req.user,
      message: `Username edited successfly ${newUsername}!`,
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
