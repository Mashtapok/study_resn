const fileInput = document.querySelector('#file-input')
const errorField = document.querySelector('#error')

fileInput.addEventListener('change', onFileChange);

function onFileChange() {
  const fr = new FileReader();

  fr.onload = function () {
    let result = '';

    const formattedArray = replaceDotWithComa(splitStringToArray(fr.result.trim()))
    result = formattedArray.reduce((accum, value, index) => {
      if (index === 0) return accum += `${index} ${value}`

      return accum += `\r\n${index} ${value}`
    }, '')

    textToFile(result, 'file.txt')
    errorField.textContent = 'Проверьте скачанный файл перед использованием. Если "Ангел" выдаёт ошибку, попробуйте нажать на кнопку "Очистить окно ввода" перед загрузкой файла'
  }

  fr.onerror = function () {
    errorField.textContent = 'Ошибка чтения файла'
  }

  fr.readAsText(this.files[0]);
}


function replaceDotWithComa(arrayWithString) {
  return arrayWithString.map(s => s.replace(',', '').replace('.', ','))
}

function splitStringToArray(string) {
  return string.split(' ')
}

function textToFile(text, name) {
  const file = new Blob([text], {type: 'text/plain'});
  const url = window.URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = name || 'text.txt';
  a.type = 'text/plain';

  a.addEventListener('click', () => {
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
  })
  a.click()
}
