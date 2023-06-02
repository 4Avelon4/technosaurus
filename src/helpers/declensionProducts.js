import declensionNumbers from './declensionNumbers';

export default function declensionProducts(number) {
  const words = ['товар', 'товара', 'товаров'];

  return declensionNumbers(number, words);
}
