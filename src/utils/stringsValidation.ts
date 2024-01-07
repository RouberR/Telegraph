export const isEmailValid = (email: string) => {
  if (!email.length) {
    return;
  }
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailPattern.test(email);
};
