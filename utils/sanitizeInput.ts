export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, ""); // Removes harmful signs such as < and >
};
