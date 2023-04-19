class UserDto {
  constructor({ name, lastname, email, isAdmin }) {
    this.fullname = `${name} ${lastname}`;
    this.email = `${email}`;
    this.admin = isAdmin ? "yes" : "no";
  }
}

export const convertUserToDto = (users) => {
  if (Array.isArray(users)) {
    return users.map((user) => new UserDto(user));
  } else {
    return new UserDto(users);
  }
};

export { UserDto };
