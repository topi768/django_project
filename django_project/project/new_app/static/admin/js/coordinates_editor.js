document.addEventListener('DOMContentLoaded', function () {
    const coordinatesField = document.querySelector('textarea[name="coordinates"]');

    if (coordinatesField) {
        try {
            // Преобразуем текст JSON в удобный формат
            const json = JSON.parse(coordinatesField.value || '[]');
            coordinatesField.value = JSON.stringify(json, null, 4); // Красивое форматирование JSON
        } catch (e) {
            console.log('Invalid JSON in coordinates field:', e);
        }

        // Добавляем обработчик изменения
        coordinatesField.addEventListener('change', function () {
            try {
                const json = JSON.parse(coordinatesField.value);
                coordinatesField.value = JSON.stringify(json, null, 4); // Обновляем с красивым форматированием
            } catch (e) {
                console.log('Invalid JSON! Please fix the syntax.');
                
            }
        });
    }
});
