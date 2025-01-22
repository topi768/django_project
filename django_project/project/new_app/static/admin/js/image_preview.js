console.log('hello');

document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.querySelector('input[name="image"]');
    const previewImage = document.getElementById('image-preview');
    const coordinatesTextarea = document.querySelector('textarea[name="coordinates"]');
    const imageContainer = document.getElementById('image-container'); // Контейнер изображения

    if (!coordinatesTextarea || !imageContainer) {
        console.log("Coordinates textarea or image container not found.");
        return;
    }

    /**
     * Функция для создания точек на основе координат
     * @param {Array} coordinates - массив координат
     */
    function renderPoints(coordinates) {
        // Удаляем предыдущие точки
        const existingPoints = imageContainer.querySelectorAll('.coordinate-point');
        existingPoints.forEach(point => point.remove());

        // Добавляем новые точки
        coordinates.forEach((coord, index) => {
            const point = document.createElement('div');
            point.className = 'coordinate-point';
            point.style.position = 'absolute';
            point.style.width = `${coord.width}%`;
            point.style.height = `${coord.height}%`;
            point.style.left = `${coord.x}%`;
            point.style.top = `${coord.y}%`;
            point.style.borderColor = 'red';
            point.style.borderWidth = '2px';
            point.style.borderStyle = 'solid';

            point.title = `Point ${index + 1}: (${coord.x}, ${coord.y})`;

            imageContainer.style.position = 'relative'; // Контейнер должен быть относительно спозиционирован
            imageContainer.appendChild(point);
        });
    }

    /**
     * Обработчик изменения изображения
     */
    if (imageInput) {
        imageInput.addEventListener('change', function () {

            const file = imageInput.files[0];
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                previewImage.src = '';
                previewImage.style.display = 'none';
            }
        });
    }

    /**
     * Обработчик ввода текста в поле coordinates
     */
    coordinatesTextarea.addEventListener('input', function () {
        try {
            const json = JSON.parse(this.value); // Преобразуем текст JSON в объект
            console.log(json);
            
            renderPoints(json); // Отрисовываем точки
        } catch (e) {
            // Если JSON некорректный, просто ничего не делаем
            console.log('Invalid JSON in coordinates field:', e);
        }
    });

    // Начальная отрисовка точек (если данные уже есть)
    try {
        const initialCoordinates = JSON.parse(coordinatesTextarea.value);
        renderPoints(initialCoordinates);
    } catch (e) {
        console.log('Invalid JSON in coordinates field:', e);
    }
});
