const getToken = (req) => {
  const token = req.body.authorization.split(" ")[1];

  if (token != undefined) {
    return token;
  } else {
    return { status: "failed", message: "Token Not Found" };
  }
};

module.exports = getToken;
