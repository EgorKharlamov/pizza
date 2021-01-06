export const addToCart = (good: any) => {
  const key = 'cart';
  const existedCart = localStorage.getItem(key);
  if (existedCart) {
    const existedParsed = JSON.parse(existedCart);
    existedParsed.push(good);
    localStorage.setItem(key, JSON.stringify(existedParsed));
  } else {
    localStorage.setItem(key, JSON.stringify([good]));
  }
};
