exports.handleError = res => error => {
  const { statusCode } = error;
  if (res.statusCode === 200) res.statusCode = 422;
  else if (statusCode) res.statusCode = statusCode;
  else if (error instanceof Error) {
    res.status(200).json({ errors: [error.message] });
  }

  res.status(200).json({ errors: [error] });
};
