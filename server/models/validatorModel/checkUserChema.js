export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errorMessage: "Name is least 3 characters",
    },
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  displayName: {
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errorMessage: "Name is least 3 characters",
    },
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  password: {
    isStrongPassword: {
      // options: {
      //   // minLength: 8,
      //   // minLowercase: 1,
      //   // minUppercase: 1,
      //   // minNumbers: 1,
      //   // minSymbols: 1,
      // },
      errorMessage: "Password is not strong enough",
    },
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
};
