import bcryptjs from "bcryptjs";

const pepper = process.env.PEPPER;

async function hash(password) {
  if (password == undefined) {
    throw {
      message: "Senha nao definida",
      cause: password,
    };
  }
  const rounds = getNumberOfRounds();

  return await bcryptjs.hash(password + pepper, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 10 : 1;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(providedPassword + pepper, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
