class FormView {
    getFormKeys(form){
        return [...new FormData(form)]
    }
    getObjectFromKeys(form){
        return Object.fromEntries(this.getFormKeys(form))
    }
    clearFormData(form){
        form.reset()
    }
    checkupData(){
        
    }
}
module.exports = new FormView()