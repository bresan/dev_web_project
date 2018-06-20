var AnimationUtils = {
    moveToDiv(divName) {
        $('html, body').animate({
            scrollTop: $("#" + divName).offset().top
        }, 300);
    },
    moveToBottom() {
        AnimationUtils.moveToDiv("bottom");
    },
    moveToTop() {
        AnimationUtils.moveToDiv("top");
    }
};