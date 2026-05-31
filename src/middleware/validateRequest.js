const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);

      // Replace request body with validated data
      req.body = validatedData;

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors?.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
  };
};

export default validate;