// Función para activar las animaciones de contenido
function activateContent() {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        const contentPosition = content.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if(contentPosition < screenPosition) {
            content.classList.add('active');
        }
    });
}

// Función para actualizar la barra de progreso
function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = (scrollTop / documentHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercentage + '%';
}

// Animación de la temperatura
function animateTemperature() {
    const temperatures = document.querySelectorAll('.temperature');
    temperatures.forEach(temp => {
        const tempValue = parseFloat(temp.textContent);
        if (!isNaN(tempValue)) {
            let currentTemp = 14;
            const interval = setInterval(() => {
                if (currentTemp < tempValue) {
                    currentTemp += 0.1;
                    temp.textContent = currentTemp.toFixed(1) + '°C';
                } else {
                    clearInterval(interval);
                }
            }, 50);
        }
    });
}

// Event listeners
window.addEventListener('scroll', () => {
    activateContent();
    updateProgressBar();
});

window.addEventListener('load', () => {
    activateContent();
    updateProgressBar();
    animateTemperature();
});

// Smooth scrolling para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal para el compromiso
document.getElementById('pledgeBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const pledge = prompt('¿Cuál es tu compromiso para combatir el cambio climático?');
    if (pledge) {
        alert('¡Gracias por tu compromiso! Juntos podemos hacer la diferencia.');
    }
});
