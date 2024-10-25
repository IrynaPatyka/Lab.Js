// Callback функция для навигации по DOM-дереву
function navigateDOM(node, onNext, onPrevious) {
    if (!node) return;

    // Генерация сообщения в зависимости от расположения узла в дереве
    let message;
    if (!node.nextElementSibling && !node.previousElementSibling) {
        message = `Кінцевий вузол: "${node.textContent.trim()}". Введіть '2' для виходу.`;
    } else if (!node.previousElementSibling) {
        message = `Перший вузол: "${node.textContent.trim()}". Введіть '1' для переходу до наступного вузла або '2' для завершення.`;
    } else if (!node.nextElementSibling) {
        message = `Останній вузол: "${node.textContent.trim()}". Введіть '1' для повернення назад або '2' для завершення.`;
    } else {
        message = `Текущий вузол: "${node.textContent.trim()}". Введіть '1' для переходу вперед, '2' для виходу або '3' для повернення назад.`;
    }

    // Получаем ответ пользователя через prompt
    const response = prompt(message);

    // Действия на основе ответа пользователя
    if (response === '1' && onNext) {
        onNext(node);
    } else if (response === '3' && onPrevious) {
        onPrevious(node);
    } else {
        alert("Завершення.");
    }
}

// Запуск навигации по DOM с помощью callback-ов
window.onload = () => {
    const container = document.querySelector('.profile-container');
    if (container && container.firstElementChild) {
        // Инициализация первого узла и назначение callback-функций для переходов
        const startNode = container.firstElementChild;

        const onNext = (node) => {
            if (node.nextElementSibling) {
                navigateDOM(node.nextElementSibling, onNext, onPrevious);
            } else {
                alert("Досягнуто кінця.");
            }
        };

        const onPrevious = (node) => {
            if (node.previousElementSibling) {
                navigateDOM(node.previousElementSibling, onNext, onPrevious);
            } else {
                alert("Ви на початку.");
            }
        };

        // Стартуем с первого узла
        navigateDOM(startNode, onNext, onPrevious);
    } else {
        console.error("Контейнер або його перший дочірній елемент не знайдено.");
    }
};
