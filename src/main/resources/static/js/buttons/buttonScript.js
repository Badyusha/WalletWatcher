document.addEventListener('DOMContentLoaded', function () {

    const buttons = document.querySelectorAll('.cartoon-button');

    buttons.forEach(button => {
        let isTouch = false;

        button.addEventListener('mousedown', () => {
            if (!isTouch) {
                button.classList.add('active');
                setTimeout(() => {
                    button.classList.remove('active');
                }, 170); // Задержка для нажатия мышью
            }
        });

        button.addEventListener('mouseup', () => {
            if (!isTouch) {
                // Удаляем обработчик, если нажатие было мышью
                clearTimeout(button.timeoutId);
            }
        });

        button.addEventListener('mouseleave', () => {
            if (!isTouch) {
                // Удаляем обработчик, если нажатие было мышью и курсор ушел
                clearTimeout(button.timeoutId);
                button.classList.remove('active');
            }
        });

        button.addEventListener('touchstart', () => {
            isTouch = true;
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 200); // Задержка для нажатия тачпадом
        });

        button.addEventListener('touchend', () => {
            // Удаляем обработчик, если нажатие было тачпадом
            clearTimeout(button.timeoutId);
        });

        button.addEventListener('touchcancel', () => {
            // Удаляем обработчик, если нажатие было тачпадом и курсор ушел
            clearTimeout(button.timeoutId);
            button.classList.remove('active');
        });

        button.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'mouse') {
                isTouch = false;
            }
        });

        document.addEventListener('pointermove', (event) => {
            if (event.pointerType === 'mouse') {
                isTouch = false;
            }
        });
    });
})