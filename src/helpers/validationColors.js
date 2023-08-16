export default function (item) {
  const itemCode = /^#[0-9a-f]{6}/.test(item.code);
  const itemId = /^\d+/.test(item.id);
  const itemTitle = /^[А-ЯЁ][а-яё]*/.test(item.title);

  return itemCode && itemId && itemTitle;
}
