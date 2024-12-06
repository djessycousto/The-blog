const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    userImage: user.userImage,
  };
};
module.exports = { createTokenUser };
