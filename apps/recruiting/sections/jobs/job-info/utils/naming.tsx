// for getting shortname with extension name
export const getShortNameWithExtension = (name: string, length = 10) => {
  if (name?.length <= length) return name;
  return (
    name?.slice(0, length - 3) +
    ".." +
    name?.slice(name?.lastIndexOf("."), name?.length)
  );
};

// for getting shortname for large text
export const getShortName = (name: string, length = 10) => {
  if (name?.length <= length) return name;
  return name?.slice(0, length - 3) + "...";
};
