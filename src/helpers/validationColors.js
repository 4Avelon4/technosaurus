export default function (item) {
  return /^#[0-9a-f]{6}/.test(item.code) && /^\d+/.test(item.id) && /^[А-ЯЁ][а-яё]*/.test(item.title);
}
