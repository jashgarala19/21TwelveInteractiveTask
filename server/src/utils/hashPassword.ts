import bcrypt from "bcryptjs";

const saltRounds = 10; // Number of salt rounds for bcryptjs
export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);
  

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw new Error("Password hashing failed");
  }
};
