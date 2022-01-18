
class Modals {
    constructor(modalId) {
        this.modal = new bootstrap.Modal(document.getElementById(modalId), {
            keyboard: false
        })
    }

    show() {
        this.modal.show()
    }
    hide() {
        this.modal.hide()
    }
}
