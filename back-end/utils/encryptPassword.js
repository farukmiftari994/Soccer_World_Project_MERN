import bcrypt from "bcrypt";
//library used for hashing password

const encryptPassword = async (userPassword) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.log("error hashing password :>> ", error);
    return null;
  }
};

const verifyPassword = async (userPassword, hashedPassword) => {
  const isPassword = await bcrypt.compare(userPassword, hashedPassword);
  console.log("isPassword :>> ", isPassword);
  return isPassword;
};

export { encryptPassword, verifyPassword };
