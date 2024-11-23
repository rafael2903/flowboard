const THEME = {
    LIGHT: "light",
    DARK: "dark"
}

const chosenTheme = localStorage.getItem("theme");
let theme = chosenTheme || THEME.LIGHT
const switchThemeButton = document.querySelector("#theme-switch")
const darkModePreference = window.matchMedia?.('(prefers-color-scheme: dark)')

const setTheme = (newTheme) => {
    document.documentElement.classList.remove(theme)
    switchThemeButton.classList.remove(theme)
    theme = newTheme
    document.documentElement.classList.add(theme)
    switchThemeButton.classList.add(theme)
}

const evaluateThemePreference = (darkModePreference) => {
    if (chosenTheme) return
    const prefersDarkmode = darkModePreference?.matches
    if (prefersDarkmode) setTheme(THEME.DARK)
        else setTheme(THEME.LIGHT)
}

evaluateThemePreference(darkModePreference)
darkModePreference.addEventListener("change", event => evaluateThemePreference(event))

setTheme(theme)

switchThemeButton.addEventListener("click", () => {
    const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme);
})
