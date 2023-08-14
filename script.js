import { TinySegmenter } from "https://code4fukui.github.io/TinySegmenter/TinySegmenter.js";



const fileInput = document.getElementById('file-input');
const textDisplay = document.getElementById('text-display');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let sentences = [];
let currentIndex = 0;
let wordIndex = 0;
let nextSwitchSentence = false;
let prevSwitchSentence = false;
let backToPrevSen = false;




fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;

            // 句読点をもとに分割
            sentences = content.split(/[、,.。!！?？]/);
            currentIndex = 0;
            wordIndex=0
            displayCurrentSentence();
        }
        reader.readAsText(file);
    }
});

function displayCurrentSentence() {
    //コメントアウトコード
    // const seg = TinySegmenter.segment(content);

    nextSwitchSentence=false;
    prevSwitchSentence=false;

    // 単語をもとに分割
    var content=sentences[currentIndex]

    const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
    const segments = segmenter.segment(content);
    // var reg = new RegExp(/^[!"%')\*\+\-\.,\/:;>?@\\\]^_`|}~？！。、」』】はがのをにへとで]$/);
    var reg = new RegExp(/^[はがのをにへとで]$/);
    
    let zyoshiIndex=[]
    zyoshiIndex.push(-1)
    for (let seg of segments) {
        if(reg.test(seg.segment)){
            zyoshiIndex.push(seg.index)
        }
    }
    zyoshiIndex.push(content.length-1)
    let bunkatsu = []
    for (let i = 0; i < zyoshiIndex.length-1; i++) {
        bunkatsu.push(content.slice(zyoshiIndex[i]+1,zyoshiIndex[i+1]+1))
        
    }



    // textDisplay.textContent = sentences[currentIndex];
    if(backToPrevSen==true){
        console.log("sadou")

        wordIndex = bunkatsu.length-1
        backToPrevSen=false
    }



    textDisplay.textContent = bunkatsu[wordIndex]
    console.log(bunkatsu)

    if(wordIndex == bunkatsu.length-1){
        nextSwitchSentence=true;
    }

    if(wordIndex == 0){
        prevSwitchSentence=true;
    }
}



//slide部分
prevButton.addEventListener('click', () => {

    if (prevSwitchSentence==true && currentIndex > 0) {
        currentIndex--;
        backToPrevSen = true
        displayCurrentSentence();
    }else{
        wordIndex--;
        if (wordIndex <= 0){
            wordIndex = 0
        }
        displayCurrentSentence();
    }
});

nextButton.addEventListener('click', () => {
    if (nextSwitchSentence==true && currentIndex < sentences.length - 1) {
        currentIndex++;
        wordIndex=0
        displayCurrentSentence();
    }else{
        wordIndex++;
        displayCurrentSentence();
    }
});