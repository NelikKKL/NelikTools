// HTML Валидатор
function validateHTML() {
    const htmlInput = document.getElementById('html-input').value;
    const resultDiv = document.getElementById('html-result');
    
    // Простая базовая проверка HTML
    const hasDoctype = /<!DOCTYPE html>/i.test(htmlInput);
    const hasHtmlTag = /<html[\s>]/i.test(htmlInput);
    const hasHeadTag = /<head[\s>]/i.test(htmlInput);
    const hasBodyTag = /<body[\s>]/i.test(htmlInput);
    const hasClosingTags = /<\/html>[\s]*<\/body>[\s]*<\/head>/i.test(htmlInput);
    
    let resultHTML = '<div class="validation-results">';
    let isValid = true;
    
    if (hasDoctype) {
        resultHTML += '<div class="check success">✓ DOCTYPE объявлен</div>';
    } else {
        resultHTML += '<div class="check warning">⚠ DOCTYPE не объявлен</div>';
        isValid = false;
    }
    
    if (hasHtmlTag) {
        resultHTML += '<div class="check success">✓ HTML тег найден</div>';
    } else {
        resultHTML += '<div class="check error">✗ HTML тег отсутствует</div>';
        isValid = false;
    }
    
    if (hasHeadTag) {
        resultHTML += '<div class="check success">✓ HEAD тег найден</div>';
    } else {
        resultHTML += '<div class="check error">✗ HEAD тег отсутствует</div>';
        isValid = false;
    }
    
    if (hasBodyTag) {
        resultHTML += '<div class="check success">✓ BODY тег найден</div>';
    } else {
        resultHTML += '<div class="check error">✗ BODY тег отсутствует</div>';
        isValid = false;
    }
    
    if (hasClosingTags) {
        resultHTML += '<div class="check success">✓ Закрывающие теги присутствуют</div>';
    } else {
        resultHTML += '<div class="check warning">⚠ Закрывающие теги могут отсутствовать</div>';
    }
    
    // Проверка на наличие заголовка
    const hasTitle = /<title>.*?<\/title>/i.test(htmlInput);
    if (hasTitle) {
        resultHTML += '<div class="check success">✓ TITLE тег найден</div>';
    } else {
        resultHTML += '<div class="check warning">⚠ TITLE тег отсутствует</div>';
    }
    
    resultHTML += `<div class="summary ${isValid ? 'success' : 'error'}">`;
    resultHTML += isValid ? '✅ HTML структура валидна' : '❌ Найдены ошибки в HTML структуре';
    resultHTML += '</div>';
    resultHTML += '</div>';
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.className = isValid ? 'result-container success' : 'result-container error';
}

// CSS Валидатор
function validateCSS() {
    const cssInput = document.getElementById('css-input').value;
    const resultDiv = document.getElementById('css-result');
    
    // Простая базовая проверка CSS
    const hasSelectors = /[a-zA-Z0-9\-_\.#]+\s*\{/g.test(cssInput);
    const hasDeclarations = /[\w\-]+\s*:\s*[^;}]+;/g.test(cssInput);
    const hasClosingBraces = /\}/g.test(cssInput);
    
    let resultHTML = '<div class="validation-results">';
    let isValid = true;
    
    if (hasSelectors) {
        resultHTML += '<div class="check success">✓ CSS селекторы найдены</div>';
    } else {
        resultHTML += '<div class="check error">✗ CSS селекторы отсутствуют</div>';
        isValid = false;
    }
    
    if (hasDeclarations) {
        resultHTML += '<div class="check success">✓ CSS объявления найдены</div>';
    } else {
        resultHTML += '<div class="check error">✗ CSS объявления отсутствуют</div>';
        isValid = false;
    }
    
    if (hasClosingBraces) {
        resultHTML += '<div class="check success">✓ Закрывающие скобки присутствуют</div>';
    } else {
        resultHTML += '<div class="check error">✗ Закрывающие скобки отсутствуют</div>';
        isValid = false;
    }
    
    // Проверка на комментарии
    const hasComments = /\/\*.*?\*\//s.test(cssInput);
    if (hasComments) {
        resultHTML += '<div class="check info">ℹ Найдены CSS комментарии</div>';
    }
    
    // Подсчет правил
    const ruleCount = (cssInput.match(/[a-zA-Z0-9\-_\.#]+\s*\{/g) || []).length;
    resultHTML += `<div class="check info">ℹ Найдено ${ruleCount} CSS правил</div>`;
    
    resultHTML += `<div class="summary ${isValid ? 'success' : 'error'}">`;
    resultHTML += isValid ? '✅ CSS структура валидна' : '❌ Найдены ошибки в CSS структуре';
    resultHTML += '</div>';
    resultHTML += '</div>';
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.className = isValid ? 'result-container success' : 'result-container error';
}

// JSON Валидатор
function validateJSON() {
    const jsonInput = document.getElementById('json-input').value;
    const resultDiv = document.getElementById('json-result');
    
    try {
        const parsed = JSON.parse(jsonInput);
        const formatted = JSON.stringify(parsed, null, 2);
        
        let resultHTML = '<div class="validation-results">';
        resultHTML += '<div class="check success">✅ JSON валиден</div>';
        
        // Анализ структуры
        const type = Array.isArray(parsed) ? 'массив' : typeof parsed;
        resultHTML += `<div class="check info">ℹ Тип данных: ${type}</div>`;
        
        if (typeof parsed === 'object' && parsed !== null) {
            const keys = Object.keys(parsed);
            resultHTML += `<div class="check info">ℹ Количество ключей: ${keys.length}</div>`;
            
            // Проверка на вложенные объекты
            let hasNested = false;
            for (const key in parsed) {
                if (typeof parsed[key] === 'object' && parsed[key] !== null) {
                    hasNested = true;
                    break;
                }
            }
            if (hasNested) {
                resultHTML += '<div class="check info">ℹ Найдены вложенные объекты</div>';
            }
        }
        
        resultHTML += '</div>';
        
        resultDiv.innerHTML = resultHTML;
        resultDiv.className = 'result-container success';
        
    } catch (error) {
        let resultHTML = '<div class="validation-results">';
        resultHTML += '<div class="check error">❌ Невалидный JSON</div>';
        resultHTML += `<div class="check error">✗ Ошибка: ${error.message}</div>`;
        
        // Попытка найти позицию ошибки
        const errorLine = error.message.match(/line (\d+)/);
        if (errorLine) {
            resultHTML += `<div class="check error">✗ Ошибка в строке: ${errorLine[1]}</div>`;
        }
        
        resultHTML += '</div>';
        
        resultDiv.innerHTML = resultHTML;
        resultDiv.className = 'result-container error';
    }
}

// Форматирование JSON
function formatJSON() {
    const jsonInput = document.getElementById('json-input').value;
    try {
        const parsed = JSON.parse(jsonInput);
        const formatted = JSON.stringify(parsed, null, 2);
        document.getElementById('json-input').value = formatted;
        
        const resultDiv = document.getElementById('json-result');
        resultDiv.innerHTML = '<div class="check success">✅ JSON успешно отформатирован</div>';
        resultDiv.className = 'result-container success';
    } catch (error) {
        const resultDiv = document.getElementById('json-result');
        resultDiv.innerHTML = `<div class="check error">✗ Ошибка форматирования: ${error.message}</div>`;
        resultDiv.className = 'result-container error';
    }
}

// XML Валидатор
function validateXML() {
    const xmlInput = document.getElementById('xml-input').value;
    const resultDiv = document.getElementById('xml-result');
    
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlInput, "text/xml");
        
        // Проверка на наличие ошибок парсинга
        const parserError = xmlDoc.getElementsByTagName("parsererror");
        if (parserError.length > 0) {
            throw new Error("Ошибка при парсинге XML");
        }
        
        // Успешная валидация
        let resultHTML = '<div class="validation-results">';
        resultHTML += '<div class="check success">✅ XML валиден</div>';
        
        // Анализ структуры
        const rootElement = xmlDoc.documentElement;
        resultHTML += `<div class="check info">ℹ Корневой элемент: ${rootElement.tagName}</div>`;
        
        // Подсчет дочерних элементов
        const childCount = rootElement.childElementCount;
        resultHTML += `<div class="check info">ℹ Дочерних элементов: ${childCount}</div>`;
        
        // Проверка на наличие атрибутов
        let hasAttributes = false;
        const allElements = xmlDoc.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
            if (allElements[i].attributes.length > 0) {
                hasAttributes = true;
                break;
            }
        }
        if (hasAttributes) {
            resultHTML += '<div class="check info">ℹ Найдены элементы с атрибутами</div>';
        }
        
        resultHTML += '</div>';
        
        resultDiv.innerHTML = resultHTML;
        resultDiv.className = 'result-container success';
        
    } catch (error) {
        let resultHTML = '<div class="validation-results">';
        resultHTML += '<div class="check error">❌ Невалидный XML</div>';
        resultHTML += `<div class="check error">✗ Ошибка: ${error.message}</div>`;
        resultHTML += '</div>';
        
        resultDiv.innerHTML = resultHTML;
        resultDiv.className = 'result-container error';
    }
}

// Email Валидатор
function validateEmail() {
    const emailInput = document.getElementById('email-input').value.trim();
    const resultDiv = document.getElementById('email-result');
    
    // Расширенная валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domainRegex = /\.[a-zA-Z]{2,}$/;
    const hasAtSymbol = emailInput.includes('@');
    const parts = emailInput.split('@');
    
    let resultHTML = '<div class="validation-results">';
    let isValid = true;
    
    if (emailRegex.test(emailInput)) {
        resultHTML += '<div class="check success">✅ Email формат валиден</div>';
    } else {
        resultHTML += '<div class="check error">❌ Неверный формат email</div>';
        isValid = false;
    }
    
    if (hasAtSymbol && parts.length === 2) {
        const localPart = parts[0];
        const domainPart = parts[1];
        
        if (localPart.length > 0 && localPart.length <= 64) {
            resultHTML += '<div class="check success">✓ Локальная часть в пределах нормы</div>';
        } else {
            resultHTML += '<div class="check warning">⚠ Локальная часть слишком длинная или пустая</div>';
            isValid = false;
        }
        
        if (domainRegex.test(domainPart)) {
            resultHTML += '<div class="check success">✓ Домен имеет правильный формат</div>';
        } else {
            resultHTML += '<div class="check error">✗ Неверный формат домена</div>';
            isValid = false;
        }
        
        if (domainPart.length <= 255) {
            resultHTML += '<div class="check success">✓ Длина домена в пределах нормы</div>';
        } else {
            resultHTML += '<div class="check error">✗ Домен слишком длинный</div>';
            isValid = false;
        }
    } else {
        resultHTML += '<div class="check error">✗ Отсутствует символ @ или неправильная структура</div>';
        isValid = false;
    }
    
    // Дополнительные проверки
    if (emailInput.startsWith('@') || emailInput.endsWith('@')) {
        resultHTML += '<div class="check error">✗ Email не может начинаться или заканчиваться на @</div>';
        isValid = false;
    }
    
    if (emailInput.includes('..')) {
        resultHTML += '<div class="check warning">⚠ Email содержит последовательные точки</div>';
    }
    
    resultHTML += `<div class="summary ${isValid ? 'success' : 'error'}">`;
    resultHTML += isValid ? '✅ Email валиден' : '❌ Email невалиден';
    resultHTML += '</div>';
    resultHTML += '</div>';
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.className = isValid ? 'result-container success' : 'result-container error';
}

// Массовая валидация email
function validateEmailsBulk() {
    const emailsBulk = document.getElementById('emails-bulk').value.trim().split('\n');
    const resultDiv = document.getElementById('emails-bulk-result');
    
    let validCount = 0;
    let invalidCount = 0;
    let resultHTML = '<div class="validation-results">';
    
    emailsBulk.forEach(email => {
        email = email.trim();
        if (!email) return;
        
        const isValid = validateSingleEmail(email);
        if (isValid) {
            validCount++;
            resultHTML += `<div class="check success">✅ ${email}</div>`;
        } else {
            invalidCount++;
            resultHTML += `<div class="check error">❌ ${email}</div>`;
        }
    });
    
    resultHTML += `<div class="summary ${invalidCount === 0 ? 'success' : 'error'}">`;
    resultHTML += `📊 Результаты: ${validCount} валидных, ${invalidCount} невалидных`;
    resultHTML += '</div>';
    resultHTML += '</div>';
    
    resultDiv.innerHTML = resultHTML;
    resultDiv.className = invalidCount === 0 ? 'result-container success' : 'result-container error';
}

function validateSingleEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.includes('@') && email.split('@').length === 2;
}

// URL Валидатор
function validateURL() {
    const urlInput = document.getElementById('url-input').value.trim();
    const resultDiv = document.getElementById('url-result');
    
    try {
        const url = new URL(urlInput);
        let resultHTML = '<div class="validation-results">';
        let isValid = true;
        
        // Проверка протокола
        const validProtocols = ['http:', 'https:', 'ftp:', 'mailto:'];
        if (validProtocols.includes(url.protocol)) {
            resultHTML += `<div class="check success">✓ Протокол: ${url.protocol.slice(0, -1)}</div>`;
        } else {
            resultHTML += `<div class="check error">✗ Недопустимый протокол: ${url.protocol.slice(0, -1)}</div>`;
            isValid = false;
        }
        
        // Проверка домена
        if (url.hostname) {
            resultHTML += `<div class="check success">✓ Домен: ${url.hostname}</div>`;
            
            // Проверка на наличие точки в домене (для обычных доменов)
            if (url.hostname.includes('.') && !url.hostname.startsWith('.') && !url.hostname.endsWith('.')) {
                resultHTML += '<div class="check success">✓ Формат домена корректный</div>';
            } else if (!url.hostname.includes('.') && url.protocol !== 'mailto:') {
                resultHTML += '<div class="check warning">⚠ Домен может быть некорректным</div>';
            }
        } else {
            resultHTML += '<div class="check error">✗ Домен отсутствует</div>';
            isValid = false;
        }
        
        // Проверка пути
        if (url.pathname && url.pathname !== '/') {
            resultHTML += `<div class="check info">ℹ Путь: ${url.pathname}</div>`;
        }
        
        // Проверка порта
        if (url.port) {
            const validPorts = [80, 443, 8080, 21, 25, 587];
            if (validPorts.includes(parseInt(url.port))) {
                resultHTML += `<div class="check success">✓ Порт: ${url.port}</div>`;
            } else {
                resultHTML += `<div class="check warning">⚠ Нестандартный порт: ${url.port}</div>`;
            }
        }
        
        resultHTML += `<div class="summary ${isValid ? 'success' : 'error'}">`;
        resultHTML += isValid ? '✅ URL валиден' : '❌ URL невалиден';
        resultHTML += '</div>';
        resultHTML += '</div>';
        
        resultDiv.innerHTML = resultHTML;
        resultDiv.className = isValid ? 'result-container success' : 'result-container error';
        
    } catch (error) {
        let resultHTML = '<div class="validation-results">';
        resultHTML += '<div class="check error">❌ Невалидный URL</div>';
        resultHTML += `<div class="check error">✗ Ошибка: ${error.message}</div>`;
        resultHTML += '</div>';
        
        resultDiv.innerHTML = resultHTML;
        resultDiv.className = 'result-container error';
    }
}

// Генератор паролей
function generatePassword() {
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    const length = parseInt(document.getElementById('password-length-slider').value);
    
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let allChars = '';
    let password = '';
    
    if (includeUppercase) allChars += uppercase;
    if (includeLowercase) allChars += lowercase;
    if (includeNumbers) allChars += numbers;
    if (includeSymbols) allChars += symbols;
    
    if (allChars === '') {
        document.getElementById('generated-password').value = 'Выберите хотя бы один тип символов';
        return;
    }
    
    // Гарантируем наличие хотя бы одного символа каждого выбранного типа
    if (includeUppercase) password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    if (includeLowercase) password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    if (includeNumbers) password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (includeSymbols) password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    
    // Заполняем оставшиеся символы
    while (password.length < length) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
    }
    
    // Перемешиваем пароль
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    document.getElementById('generated-password').value = password;
}

function copyPassword() {
    const passwordInput = document.getElementById('generated-password');
    passwordInput.select();
    document.execCommand('copy');
    
    const originalText = passwordInput.value;
    passwordInput.value = '✅ Скопировано!';
    setTimeout(() => {
        passwordInput.value = originalText;
    }, 1500);
}

// Base64 кодировщик/декодировщик
function encodeBase64() {
    const input = document.getElementById('base64-input').value;
    const resultDiv = document.getElementById('base64-result');
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        resultDiv.innerHTML = `<div class="check success">✅ Закодировано:<br><strong>${encoded}</strong></div>`;
        resultDiv.className = 'result-container success';
    } catch (error) {
        resultDiv.innerHTML = `<div class="check error">✗ Ошибка кодирования: ${error.message}</div>`;
        resultDiv.className = 'result-container error';
    }
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value;
    const resultDiv = document.getElementById('base64-result');
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        resultDiv.innerHTML = `<div class="check success">✅ Декодировано:<br><strong>${decoded}</strong></div>`;
        resultDiv.className = 'result-container success';
    } catch (error) {
        resultDiv.innerHTML = `<div class="check error">✗ Ошибка декодирования: ${error.message}</div>`;
        resultDiv.className = 'result-container error';
    }
}

// Генератор градиентов
function updateGradientPreview() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const direction = document.getElementById('gradient-direction').value;
    
    const preview = document.getElementById('gradient-preview');
    preview.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
    
    const gradientCode = `linear-gradient(${direction}, ${color1}, ${color2})`;
    document.getElementById('gradient-code').value = gradientCode;
}

function copyGradient() {
    const gradientInput = document.getElementById('gradient-code');
    gradientInput.select();
    document.execCommand('copy');
    
    const originalText = gradientInput.value;
    gradientInput.value = '✅ Скопировано!';
    setTimeout(() => {
        gradientInput.value = originalText;
        updateGradientPreview();
    }, 1500);
}

// Генератор палитр
function generatePalette() {
    const baseColor = document.getElementById('base-color').value;
    const paletteContainer = document.getElementById('palette-colors');
    
    // Очищаем контейнер
    paletteContainer.innerHTML = '';
    
    // Генерируем 5 оттенков от базового цвета
    for (let i = 0; i < 5; i++) {
        const shade = generateShade(baseColor, i);
        const colorDiv = document.createElement('div');
        colorDiv.className = 'palette-color';
        colorDiv.style.background = shade;
        colorDiv.textContent = shade;
        colorDiv.onclick = () => copyToClipboard(shade);
        paletteContainer.appendChild(colorDiv);
    }
}

function generateShade(hex, index) {
    // Преобразуем hex в RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Создаем оттенки: от более темных до более светлых
    const shades = [
        { r: r * 0.3, g: g * 0.3, b: b * 0.3 },    // Очень темный
        { r: r * 0.6, g: g * 0.6, b: b * 0.6 },    // Темный
        { r, g, b },                              // Базовый
        { r: r * 1.2, g: g * 1.2, b: b * 1.2 },    // Светлый
        { r: r * 1.5, g: g * 1.5, b: b * 1.5 }     // Очень светлый
    ];
    
    const shade = shades[index];
    
    // Ограничиваем значения 0-255
    const nr = Math.min(255, Math.max(0, shade.r));
    const ng = Math.min(255, Math.max(0, shade.g));
    const nb = Math.min(255, Math.max(0, shade.b));
    
    // Преобразуем обратно в hex
    return `#${Math.round(nr).toString(16).padStart(2, '0')}${Math.round(ng).toString(16).padStart(2, '0')}${Math.round(nb).toString(16).padStart(2, '0')}`;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`Цвет ${text} скопирован в буфер обмена!`);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Обновление градиента при загрузке
    updateGradientPreview();
    
    // Обработчики событий для градиента
    document.getElementById('color1').addEventListener('input', updateGradientPreview);
    document.getElementById('color2').addEventListener('input', updateGradientPreview);
    document.getElementById('gradient-direction').addEventListener('change', updateGradientPreview);
    
    // Инициализация длины пароля
    const lengthSlider = document.getElementById('password-length-slider');
    const lengthDisplay = document.getElementById('password-length');
    lengthDisplay.textContent = lengthSlider.value;
    
    lengthSlider.addEventListener('input', function() {
        lengthDisplay.textContent = this.value;
    });
    
    // Плавная прокрутка к секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновление активной ссылки в навигации
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Изменение активной ссылки при прокрутке
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Генерация начального пароля
    generatePassword();
    
    // Генерация начальной палитры
    generatePalette();
    
    // Запуск начальных валидаций
    validateHTML();
    validateCSS();
    validateJSON();
    validateXML();
    validateEmail();
    validateURL();
});