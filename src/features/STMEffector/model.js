import {
  createStore,
  createEffect,
  createEvent,
  forward,
  restore,
  sample,
  combine
} from "effector";

//приведение строки баланса к удобному виду
const parseBalance = (stringBalance) => {
  return +stringBalance.match(/(?<=\$)[\d,]+/g)[0].replace(",", "");
};
//получение данных
export const getData = createEvent();
//сортировка
export const sortAge = createEvent();
export const sortBalance = createEvent();
//фильтрация
export const search = createEvent();

//запрос данных
const getBookFx = createEffect(async () => {
  return fetch(
    "https://next.json-generator.com/api/json/get/NkcCg0Tf9"
  ).then((response) => response.json());
});

const $book = restore(getBookFx.doneData, []);
export const $loading = getBookFx.pending;
export const $sortAge = createStore(0).reset([sortBalance, search]);
export const $sortBalance = createStore(0).reset([sortAge, search]);
export const $searchingName = createStore("");
export const $filteredBook = $book.map((data) => data);

$filteredBook
  .on($sortAge, (book, direction) =>
    [...book].sort((a, b) => direction * (b.age - a.age))
  )
  .on($sortBalance, (book, direction) =>
    [...book].sort(
      (a, b) => direction * (parseBalance(b.balance) - parseBalance(a.balance))
    )
  );

$sortAge.on(sortAge, (direction, _) => (direction === 0 ? 1 : -1 * direction));
$sortBalance.on(sortBalance, (direction, _) =>
  direction === 0 ? 1 : -1 * direction
);
$searchingName.on(search, (_, name) => name);

//получение данных https://next.json-generator.com/
forward({
  from: getData,
  to: getBookFx
});

//фильтрация данных по введенному имени(регистр не учитывается)
sample({
  source: $book,
  clock: $searchingName,
  fn: (book, name) =>
    book.filter(
      (person) =>
        person.name.first.toLowerCase().includes(name.toLowerCase()) ||
        person.name.last.toLowerCase().includes(name.toLowerCase())
    ),
  target: $filteredBook
});

//пагинация
export const setPage = createEvent();
export const setRowsCount = createEvent();

export const $rowOnPage = createStore(10);
export const $pagesCount = combine($filteredBook, $rowOnPage, (book, rows) =>
  Math.ceil(book.length / rows)
);
export const $currentPage = createStore(1).reset([
  sortBalance,
  search,
  setRowsCount,
  sortAge
]);
export const $pageContent = combine(
  $filteredBook,
  $currentPage,
  $rowOnPage,
  (book, page, rows) => book.slice(page * rows - rows, page * rows)
);

$rowOnPage.on(setRowsCount, (_, count) => +count);
$currentPage.on(setPage, (_, page) => page);
