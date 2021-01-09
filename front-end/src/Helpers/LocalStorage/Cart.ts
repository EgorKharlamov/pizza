import IGoods from '../../Store/goods/types';
import { cartKey, existedCart } from './LocalStorage';

export const Cart = {
  addToCart: (good: any) => {
    if (existedCart()) {
      const existedParsed = JSON.parse(existedCart()!);
      existedParsed.push(good);
      localStorage.setItem(cartKey(), JSON.stringify(existedParsed));
    } else {
      localStorage.setItem(cartKey(), JSON.stringify([good]));
    }
  },
  rmFromCart: (id: number) => {
    if (existedCart()) {
      const existedParsed = JSON.parse(existedCart()!);
      let flag = true;
      const newCart = existedParsed.filter((good: any) => {
        if (flag && good.id === id) {
          flag = false;
          return good.id !== id;
        }
        return true;
      });
      localStorage.setItem(cartKey(), JSON.stringify(newCart));
    }
  },
  rmAllIdFromCart: (id: number) => {
    if (existedCart()) {
      const existedParsed = JSON.parse(existedCart()!);
      const newCart = existedParsed.filter((good: any) => good.id !== id);
      localStorage.setItem(cartKey(), JSON.stringify(newCart));
    }
  },
  getGoodsList: ():IGoods[] | undefined => {
    let result;
    if (existedCart()) {
      result = JSON.parse(existedCart()!);
    } else {
      result = undefined;
    }
    return result;
  },
  clearGoodsList: () => {
    localStorage.setItem(cartKey(), JSON.stringify([]));
  },
  modifyCart: (v: any) => {
    const modifyied: Record<any, any> = {};
    // eslint-disable-next-line consistent-return
    v.forEach((el: IGoods) => {
      if (!modifyied[el.id]) {
        modifyied[el.id] = {
          id: el.id, name: el.name, count: 1, img: el.imageUrl, price: el.price,
        };
        return null;
      }
      modifyied[el.id] = {
        id: el.id,
        name: el.name,
        count: modifyied[el.id].count += 1,
        img: el.imageUrl,
        price: Math.round((modifyied[el.id].price += el.price) * 100) / 100,
      };
    });
    const result = { list: [] as any, totalPrice: 0 };
    result.list = Object.values(modifyied);
    // eslint-disable-next-line no-return-assign
    result.list.forEach((el: any) => result.totalPrice += el.price);
    return result;
  },
};
