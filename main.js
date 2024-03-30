const transactionsData = require('./transactions.json');

/**
 * Класс для анализа транзакций.
 */
class TransactionAnalyzer {
  /**
   * Создает экземпляр TransactionAnalyzer.
   * @param {Array<Object>} transactions - Массив объектов, представляющих транзакции.
   */
  constructor(transactions) {
    this.transactions = transactions;
  }

  /**
   * Добавляет новую транзакцию в массив существующих транзакций.
   * @param {Object} transaction - Объект, представляющий новую транзакцию.
   */
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  /**
   * Возвращает все транзакции.
   * @returns {Array<Object>} - Массив всех транзакций.
   */
  getAllTransactions() {
    return this.transactions;
  }

  /**
   * Возвращает массив всевозможных типов транзакций.
   * @returns {Array<string>} - Массив типов транзакций.
   */
  getUniqueTransactionType() {
    // Создаем Set для хранения уникальных типов транзакций
    const transactionTypes = new Set();

    // Проходим по всем транзакциям и добавляем их типы в Set
    this.transactions.forEach(transaction => {
      transactionTypes.add(transaction.transaction_type);
    });

    // Преобразуем Set в массив и возвращаем его
    return Array.from(transactionTypes);
  }

  /**
 * Рассчитывает общую сумму всех транзакций.
 * @returns {number} - Общая сумма всех транзакций.
 */
  calculateTotalAmount() {
    let totalAmount = 0;
    this.transactions.forEach(transaction => {
      totalAmount += parseFloat(transaction.transaction_amount);
    });
    return totalAmount;
  }

  /**
 * Вычисляет общую сумму транзакций за указанный год, месяц и день.
 * Параметры year, month и day являются необязательными.
 * В случае отсутствия одного из параметров, метод производит расчет по остальным.
 * @param {number} [year] - Год.
 * @param {number} [month] - Месяц (от 1 до 12).
 * @param {number} [day] - День месяца.
 * @returns {number} - Общая сумма транзакций за указанный период.
 */
  calculateTotalAmountByDate(year, month, day) {
    let totalAmount = 0;

    // Если переданы все параметры, фильтруем транзакции по дате
    if (year !== undefined && month !== undefined && day !== undefined) {
      totalAmount = this.transactions
        .filter(transaction => {
          const transactionDate = new Date(transaction.transaction_date);
          return transactionDate.getFullYear() === year &&
            transactionDate.getMonth() + 1 === month &&
            transactionDate.getDate() === day;
        })
        .reduce((acc, curr) => acc + parseFloat(curr.transaction_amount), 0);
    } else if (year !== undefined && month !== undefined) {
      // Если переданы только год и месяц, фильтруем транзакции по году и месяцу
      totalAmount = this.transactions
        .filter(transaction => {
          const transactionDate = new Date(transaction.transaction_date);
          return transactionDate.getFullYear() === year &&
            transactionDate.getMonth() + 1 === month;
        })
        .reduce((acc, curr) => acc + parseFloat(curr.transaction_amount), 0);
    } else if (year !== undefined) {
      // Если передан только год, фильтруем транзакции по году
      totalAmount = this.transactions
        .filter(transaction => {
          const transactionDate = new Date(transaction.transaction_date);
          return transactionDate.getFullYear() === year;
        })
        .reduce((acc, curr) => acc + parseFloat(curr.transaction_amount), 0);
    } else {
      // Если не переданы параметры, рассчитываем общую сумму всех транзакций
      totalAmount = this.transactions
        .reduce((acc, curr) => acc + parseFloat(curr.transaction_amount), 0);
    }

    return totalAmount;
  }

  /**
 * Возвращает транзакции указанного типа (debit или credit).
 * @param {string} type - Тип транзакции (debit или credit).
 * @returns {Array<Object>} - Массив транзакций указанного типа.
 */
  getTransactionByType(type) {
    // Фильтруем транзакции по указанному типу
    const filteredTransactions = this.transactions.filter(transaction => transaction.transaction_type === type);
    return filteredTransactions;
  }

  /**
 * Возвращает транзакции, проведенные в указанном диапазоне дат от startDate до endDate.
 * @param {string} startDate - Начальная дата в формате "YYYY-MM-DD".
 * @param {string} endDate - Конечная дата в формате "YYYY-MM-DD".
 * @returns {Array<Object>} - Массив транзакций, проведенных в указанном диапазоне дат.
 */
  getTransactionsInDateRange(startDate, endDate) {
    // Преобразуем даты в объекты Date
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Фильтруем транзакции по диапазону дат
    const filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate >= startDateObj && transactionDate <= endDateObj;
    });

    return filteredTransactions;
  }

  /**
   * Возвращает транзакции, совершенные с указанным торговым местом или компанией.
   * @param {string} merchantName - Название торгового места или компании.
   * @returns {Array<Object>} - Массив транзакций, совершенных с указанным торговым местом или компанией.
   */
  getTransactionsByMerchant(merchantName) {
    // Фильтруем транзакции по указанному торговому месту или компании
    const filteredTransactions = this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    return filteredTransactions;
  }

  /**
   * Возвращает среднее значение транзакций.
   * @returns {number} - Среднее значение транзакций.
   */
  calculateAverageTransactionAmount() {
    // Если нет транзакций, возвращаем 0
    if (this.transactions.length === 0) {
      return 0;
    }

    // Суммируем все суммы транзакций
    const totalAmount = this.transactions.reduce((acc, curr) => acc + parseFloat(curr.transaction_amount), 0);

    // Вычисляем среднее значение
    const averageAmount = totalAmount / this.transactions.length;
    return averageAmount;
  }

  /**
 * Возвращает транзакции с суммой в заданном диапазоне от minAmount до maxAmount.
 * @param {number} minAmount - Минимальная сумма транзакции.
 * @param {number} maxAmount - Максимальная сумма транзакции.
 * @returns {Array<Object>} - Массив транзакций с суммой в заданном диапазоне.
 */
  getTransactionsByAmountRange(minAmount, maxAmount) {
    // Фильтруем транзакции по диапазону суммы
    const filteredTransactions = this.transactions.filter(transaction => {
      const transactionAmount = parseFloat(transaction.transaction_amount);
      return transactionAmount >= minAmount && transactionAmount <= maxAmount;
    });
    return filteredTransactions;
  }

  /**
 * Вычисляет общую сумму дебетовых транзакций.
 * @returns {number} - Общая сумма дебетовых транзакций.
 */
  calculateTotalDebitAmount() {
    // Фильтруем транзакции по типу "debit" и суммируем их суммы
    const totalDebitAmount = this.transactions
      .filter(transaction => transaction.transaction_type === 'debit')
      .reduce((acc, curr) => acc + parseFloat(curr.transaction_amount), 0);

    return totalDebitAmount;
  }

  /**
 * Возвращает месяц, в котором было больше всего транзакций.
 * @returns {string} - Название месяца с наибольшим количеством транзакций.
 */
  findMostTransactionsMonth() {
    // Создаем объект для хранения количества транзакций по месяцам
    const transactionsByMonth = {};

    // Подсчитываем количество транзакций для каждого месяца
    this.transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.transaction_date);
      const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
      if (transactionsByMonth[monthKey] === undefined) {
        transactionsByMonth[monthKey] = 1;
      } else {
        transactionsByMonth[monthKey]++;
      }
    });

    // Находим месяц с наибольшим количеством транзакций
    let maxMonth = '';
    let maxTransactions = 0;
    for (const month in transactionsByMonth) {
      if (transactionsByMonth[month] > maxTransactions) {
        maxMonth = month;
        maxTransactions = transactionsByMonth[month];
      }
    }

    // Преобразуем номер месяца в название
    const [year, month] = maxMonth.split('-');
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const mostTransactionsMonth = monthNames[parseInt(month) - 1];

    return mostTransactionsMonth;
  }

  /**
 * Возвращает месяц, в котором было больше дебетовых транзакций.
 * @returns {string} - Название месяца с наибольшим количеством дебетовых транзакций.
 */
  findMostDebitTransactionMonth() {
    // Создаем объект для хранения количества дебетовых транзакций по месяцам
    const debitTransactionsByMonth = {};

    // Подсчитываем количество дебетовых транзакций для каждого месяца
    this.transactions.forEach(transaction => {
      if (transaction.transaction_type === 'debit') {
        const transactionDate = new Date(transaction.transaction_date);
        const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
        if (debitTransactionsByMonth[monthKey] === undefined) {
          debitTransactionsByMonth[monthKey] = 1;
        } else {
          debitTransactionsByMonth[monthKey]++;
        }
      }
    });

    // Находим месяц с наибольшим количеством дебетовых транзакций
    let maxMonth = '';
    let maxDebitTransactions = 0;
    for (const month in debitTransactionsByMonth) {
      if (debitTransactionsByMonth[month] > maxDebitTransactions) {
        maxMonth = month;
        maxDebitTransactions = debitTransactionsByMonth[month];
      }
    }

    // Преобразуем номер месяца в название
    const [year, month] = maxMonth.split('-');
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const mostDebitTransactionMonth = monthNames[parseInt(month) - 1];

    return mostDebitTransactionMonth;
  }

  /**
 * Возвращает тип транзакций, которых больше всего.
 * @returns {string} - Тип транзакций: 'debit', 'credit' или 'equal'.
 */
  mostTransactionTypes() {
    // Подсчитываем количество дебетовых и кредитовых транзакций
    let debitCount = 0;
    let creditCount = 0;

    this.transactions.forEach(transaction => {
      if (transaction.transaction_type === 'debit') {
        debitCount++;
      } else if (transaction.transaction_type === 'credit') {
        creditCount++;
      }
    });

    // Возвращаем результат в зависимости от количества
    if (debitCount > creditCount) {
      return 'debit';
    } else if (creditCount > debitCount) {
      return 'credit';
    } else {
      return 'equal';
    }
  }

  /**
 * Возвращает транзакции, совершенные до указанной даты.
 * @param {string} date - Дата в формате "YYYY-MM-DD".
 * @returns {Array<Object>} - Массив транзакций, совершенных до указанной даты.
 */
  getTransactionsBeforeDate(date) {
    // Преобразуем дату в объект Date
    const targetDate = new Date(date);

    // Фильтруем транзакции, оставляя только те, которые были совершены до указанной даты
    const filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate < targetDate;
    });

    return filteredTransactions;
  }

  /**
 * Возвращает транзакцию по ее уникальному идентификатору.
 * @param {string} id - Уникальный идентификатор транзакции.
 * @returns {Object|null} - Объект транзакции или null, если транзакция не найдена.
 */
  findTransactionById(id) {
    // Поиск транзакции по уникальному идентификатору
    const foundTransaction = this.transactions.find(transaction => transaction.transaction_id === id);

    return foundTransaction || null;
  }

  /**
 * Возвращает новый массив, содержащий только описания транзакций.
 * @returns {Array<string>} - Массив описаний транзакций.
 */
  mapTransactionDescriptions() {
    // Используем метод map для преобразования массива транзакций в массив описаний
    const transactionDescriptions = this.transactions.map(transaction => transaction.transaction_description);

    return transactionDescriptions;
  }


}

// Пример использования класса
const analyzer = new TransactionAnalyzer(transactionsData);

// Пример добавления новой транзакции
const newTransaction = {
  transaction_id: "2",
  transaction_date: "2022-03-24",
  transaction_amount: "50.00",
  transaction_type: "credit",
  transaction_description: "Refund for returned item",
  merchant_name: "OnlineStore",
  card_type: "Mastercard",
};
analyzer.addTransaction(newTransaction);

// Пример получения уникальных типов транзакций
console.log(analyzer.getUniqueTransactionType());

// Пример использования метода calculateTotalAmount
console.log("Общая сумма всех транзакций:", analyzer.calculateTotalAmount());

// Пример использования метода calculateTotalAmountByDate
console.log("Общая сумма транзакций за март 2023 года:", analyzer.calculateTotalAmountByDate(2023, 3));

// Пример использования метода getTransactionByType
console.log("Дебетовые транзакции:", analyzer.getTransactionByType('debit'));
console.log("Кредитовые транзакции:", analyzer.getTransactionByType('credit'));

// Пример использования метода getTransactionsInDateRange
console.log("Транзакции в указанном диапазоне дат:", analyzer.getTransactionsInDateRange("2023-01-01", "2023-01-31"));

// Пример использования метода getTransactionsByMerchant
console.log("Транзакции, совершенные в магазине SuperMart:", analyzer.getTransactionsByMerchant("SuperMart"));

// Пример использования метода calculateAverageTransactionAmount
console.log("Среднее значение транзакций", analyzer.calculateAverageTransactionAmount());

// Пример использования метода getTransactionsByAmountRange
console.log("Транзакции от 50 до 100: ", analyzer.getTransactionsByAmountRange(50, 100));

// Пример использования метода calculateTotalDebitAmount
console.log("Полное значение дебита: ", analyzer.calculateTotalDebitAmount());

// Пример использования метода findMostTransactionsMonth
console.log("Месяц с большим количеством транзакций: ", analyzer.findMostTransactionsMonth());

// Пример использования метода findMostDebitTransactionMonth
console.log("Месяц с большим количеством дебитовых транзакций: ", analyzer.findMostDebitTransactionMonth());

// Пример использования метода mostTransactionTypes
console.log("Тип наиболее частых транзакций: ", analyzer.mostTransactionTypes());

// Пример использования метода getTransactionsBeforeDate
console.log("Все транзакции до даты: ", analyzer.getTransactionsBeforeDate('2023-01-01'));

// Пример использования метода findTransactionById
console.log("Транзакции по ID: ", analyzer.findTransactionById("3"));

// Пример использования метода mapTransactionDescriptions
console.log("Массив с описаниями транзакций: ", analyzer.mapTransactionDescriptions());
