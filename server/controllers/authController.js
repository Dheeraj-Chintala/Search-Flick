export const getUser = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not logged in" });

  const { _id, displayName, email, photo } = req.user;
  res.json({
    id: _id,
    name: displayName,   // ✅ rename
    email,
    avatar: photo        // ✅ rename
  });
};


export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.clearCookie('connect.sid'); // ✅ clear session cookie if using express-session
    res.status(200).json({ message: 'Logged out successfully' }); // ✅ send JSON
  });
};
