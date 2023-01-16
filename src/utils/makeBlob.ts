export const makeBlob = (file) => {
  const fileURL = URL.createObjectURL(file);
  return fileURL;
};
