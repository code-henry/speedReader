import { TinySegmenter } from "https://code4fukui.github.io/TinySegmenter/TinySegmenter.js";




const fileInput = document.getElementById('file-input');
const textDisplay = document.getElementById('text-display');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let sentences = [];
let currentIndex = 0;

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;
            const seg = TinySegmenter.segment(content);
            console.log(seg);
            sentences = content.split(/[、,.。!！?？]/);
            currentIndex = 0;
            displayCurrentSentence();
        }
        reader.readAsText(file);
    }
});

function displayCurrentSentence() {
    textDisplay.textContent = sentences[currentIndex];
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayCurrentSentence();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < sentences.length - 1) {
        currentIndex++;
        displayCurrentSentence();
    }
});