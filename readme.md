# Как запустить

1. Скачиваем репозиторий (при помощи кнопки download либо командой ```git clone <ссылка на репозиторий>```
2. Заходим в папку с содержимым репозитория (с помощью cd)
3. Запускаем проект в Node.js при помощи команды ```node main.js```

# Описание работы

Данный проект представляет собой консольное приложение на Node.js для анализа транзакций, хранящихся в формате JSON. Он использует класс `TransactionAnalyzer`, который принимает массив транзакций в качестве входных данных и предоставляет методы для анализа данных, такие как подсчет общей суммы транзакций, поиск наиболее частого типа транзакций, фильтрацию и данных по различным критериям и прочее. Приложение обеспечивает удобный способ анализа финансовых операций и может быть расширено для добавления дополнительных функций анализа или визуализации данных.

# Краткая документация

**Класс `TransactionAnalyzer`:**
- **Конструктор:** `TransactionAnalyzer(transactions: Array<Object>)`
  - Создает новый экземпляр класса `TransactionAnalyzer` с заданными транзакциями.
  - `transactions`: Массив объектов, содержащих данные о транзакциях.

- **Методы:**
  - `addTransaction(transaction: Object): void`
    - Добавляет новую транзакцию в массив транзакций.
    - `transaction`: Объект с данными новой транзакции.
    
  - `getAllTransactions(): Array<Object>`
    - Возвращает массив всех транзакций.

  - `getUniqueTransactionType(): Array<string>`
    - Возвращает массив уникальных типов транзакций.

  - `calculateTotalAmount(): number`
    - Вычисляет общую сумму всех транзакций.

  - `calculateTotalAmountByDate(year?: number, month?: number, day?: number): number`
    - Вычисляет общую сумму транзакций за указанный год, месяц и день.
    - `year`, `month`, `day`: Необязательные параметры для фильтрации по дате.

  - `getTransactionByType(type: string): Array<Object>`
    - Возвращает транзакции указанного типа.

  - `getTransactionsInDateRange(startDate: string, endDate: string): Array<Object>`
    - Возвращает транзакции в указанном диапазоне дат.

  - `getTransactionsByMerchant(merchantName: string): Array<Object>`
    - Возвращает транзакции с указанным торговым местом или компанией.

  - `calculateAverageTransactionAmount(): number`
    - Вычисляет среднее значение транзакций.

  - `getTransactionsByAmountRange(minAmount: number, maxAmount: number): Array<Object>`
    - Возвращает транзакции с суммой в заданном диапазоне.

  - `calculateTotalDebitAmount(): number`
    - Вычисляет общую сумму дебетовых транзакций.

  - `findMostTransactionsMonth(): string`
    - Возвращает месяц, в котором было больше всего транзакций.

  - `findMostDebitTransactionMonth(): string`
    - Возвращает месяц, в котором было больше дебетовых транзакций.

  - `mostTransactionTypes(): string`
    - Возвращает тип транзакций, которых больше всего.

  - `getTransactionsBeforeDate(date: string): Array<Object>`
    - Возвращает транзакции, совершенные до указанной даты.

  - `findTransactionById(id: string): Object | null`
    - Возвращает транзакцию по ее уникальному идентификатору.

  - `mapTransactionDescriptions(): Array<string>`
    - Возвращает массив описаний транзакций.

**Пример использования:**

```javascript
const transactions = require('./transactions.json'); // Загрузка данных о транзакциях
const analyzer = new TransactionAnalyzer(transactions); // Создание экземпляра анализатора

// Добавление новой транзакции
analyzer.addTransaction({
    transaction_id: "10",
    transaction_date: "2023-05-20",
    transaction_amount: "200.00",
    transaction_type: "credit",
    transaction_description: "Online purchase",
    merchant_name: "Amazon",
    card_type: "MasterCard"
});

// Вычисление общей суммы транзакций
const totalAmount = analyzer.calculateTotalAmount();
console.log("Total amount:", totalAmount);

// Получение списка всех транзакций
const allTransactions = analyzer.getAllTransactions();
console.log("All transactions:", allTransactions);
```

Также в самом проекте присутствует документация в формате JSDoc.

# Ответы на контрольные вопросы

1. Примитивные типы данных в JavaScript:
   - Число (Number)
   - Строка (String)
   - Булево значение (Boolean)
   - null
   - undefined
   - Символ (Symbol)
   - BigInt (большое число)

2. В моем приложении использовались следующие методы массивов:
   - `filter()`: для фильтрации транзакций по определенным критериям (например, по диапазону суммы или типу).
   - `reduce()`: для вычисления общей суммы транзакций или других агрегированных значений.
   - `map()`: для преобразования массива объектов в массив значений определенного свойства (например, описаний транзакций).

Эти методы помогли в обработке и анализе данных, позволяя эффективно работать с массивами объектов транзакций и получать нужную информацию из них.

3. Роль конструктора класса в JavaScript состоит в том, чтобы определить структуру объекта определенного типа (класса). Конструктор класса используется для создания новых экземпляров объектов данного класса. Он определяет начальные значения свойств объекта и может принимать аргументы для установки этих значений.

4. Для создания нового экземпляра класса в JavaScript используется ключевое слово `new` в сочетании с вызовом конструктора класса.

# Источники

- [MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript)
- [W3Schools](https://www.w3schools.com/js/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/javascript)
- [Tutorialspoint](https://www.tutorialspoint.com/javascript/index.htm)
- [Can I Use](https://caniuse.com/)
