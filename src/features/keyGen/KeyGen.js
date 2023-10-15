export const KeyGenerator = () => {
  const hexCharacters = "0123456789ABCDEF";
  let key = "";

  for (let i = 0; i < 24; i++) {
    const randomIndex = Math.floor(Math.random() * hexCharacters.length);
    key += hexCharacters.charAt(randomIndex);
  }

  return key;
};
