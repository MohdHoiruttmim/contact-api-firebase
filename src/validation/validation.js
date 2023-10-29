const validate = (schema,  request) => {
  const result = schema.validate(request, {
    abortEarly: false, // show all error
  });
  if (result.error) {
    throw result.error;
  } else {
    return result.value;
  }
};

module.exports = { validate };
