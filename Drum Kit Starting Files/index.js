

for ( let i = 0; i < document.querySelectorAll(".drum").length; i++) {

    document.querySelectorAll(".drum")[i].addEventListener("click", function () {

        let buttonInnerHTML = this.innerHTML;
        switch (buttonInnerHTML) {
            case "w":
                let tom1 = new Audio("./sounds/tom-1.mp3");
                tom1.play();
                break;
            case "a":
                let tom2 = new Audio("./sounds/tom-2.mp3");
                tom2.play();
                break;

    });

}

let audio = new Audio("./sounds/tom-1.mp3");
        audio.play();