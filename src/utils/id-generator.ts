let id = 0;

export const generateCode = (): string => {
  return String(id++);
};
