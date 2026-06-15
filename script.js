const gift = document.getElementById("gift");
const card = document.getElementById("card");

gift.addEventListener("click", () => {

    gift.classList.add("hide");

    setTimeout(() => {

        document.getElementById("landing").style.display = "none";
        card.style.display = "flex";

    }, 500);

});
