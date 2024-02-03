const textToWork = document.querySelector('textarea')
const encryptBtn = document.querySelector('.encrypt-btn')
const decryptBtn = document.querySelector('.decrypt-btn')
const copyBtn = document.querySelector('.copy-btn')
const modal = document.querySelector('dialog')
const paragraphResult = document.querySelector('.result-text-container p')
const infoPlaceholder = document.querySelector('.result-none-container')

const dictionary = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

function encrypt(e) {
  e.preventDefault()

  let phrase = textToWork.value;
  let newPhrase = ''

  for (let i = 0; i < phrase.length; i++) {
    const isAbleToEncryp = Object.keys(dictionary).includes(phrase[i]);

    if (isAbleToEncryp) {
      newPhrase += dictionary[phrase[i]];
    } else {
      newPhrase += phrase[i];
    }
  }

  paragraphResult.parentElement.classList.remove('inactive')
  paragraphResult.innerText = newPhrase
  infoPlaceholder.classList.add('inactive')
}

function decrypt(e) {
  e.preventDefault()

  let newPhrase = textToWork.value;

  for (const key in dictionary) {
    const element = dictionary[key];
    while (newPhrase.includes(element)) {
      newPhrase = newPhrase.replace(element, key);
    }
  }

  paragraphResult.parentElement.classList.remove('inactive')
  paragraphResult.innerText = newPhrase
  infoPlaceholder.classList.add('inactive')

}

async function copy() {
  try {
    await navigator.clipboard.writeText(paragraphResult.textContent);
    
    modal.setAttribute('open', true)

    window.scrollTo(0, 0)

    paragraphResult.parentElement.classList.add('inactive')
    infoPlaceholder.classList.remove('inactive')
    textToWork.value = ''
  } catch (error) {
    console.error(error.message);
  }
}

copyBtn.addEventListener('click', copy)

encryptBtn.addEventListener('click', encrypt)
decryptBtn.addEventListener('click', decrypt)