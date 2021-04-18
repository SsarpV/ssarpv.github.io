const TypeWriter = function(txtElement, words, wait = 1000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

}

TypeWriter.prototype.type = function(){
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length-1);
    }else{
        this.txt = fullTxt.substring(0, this.txt.length+1);
    }
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    let typeSpeed = 100;
    if(this.isDeleting){
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait;
        this.isDeleting = true;
    }else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed);
}
const greets = ["Hello there, General Kenobi", "Welcome to my site!", "Have a nice day!", "null", "undefined", "It was a mistake to come here"]
const greet = greets[Math.floor(Math.random() * greets.length)]
//I have no idea what this is
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // cool shit
    new TypeWriter(txtElement, words, wait);
    const greetElement = document.getElementById("greet")
    greetElement.innerHTML = greet
}