/* ==========================
   SAWERA PORTFOLIO
========================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio Loaded Successfully");

    /* Smooth Button Click */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

});