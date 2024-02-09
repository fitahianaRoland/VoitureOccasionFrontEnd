export function menuburger() {
    const containerHeader = document.querySelector("#containerHeader")
    containerHeader.classList.toggle('active')
}
export  function linksEvent() {
    const containerHeader = document.querySelector("#containerHeader")
    containerHeader.classList.remove('active')
}