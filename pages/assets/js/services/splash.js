import SplashConstants from "../constants/splash_constants.js";


class Splash {
    static showSplash() {
        $(`#${SplashConstants.SPLASH_ELEMENT_ID}`).fadeIn(0);
    }

    static hideSplash() {
        $(`#${SplashConstants.SPLASH_ELEMENT_ID}`).fadeOut();
    }
}

export default Splash;