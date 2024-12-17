document.addEventListener('DOMContentLoaded', function() {
  class ModalManager {
    constructor() {
      this.modal = document.getElementById('modal');
      this.form = document.getElementById('modalWindows');
      this.input_values = document.querySelectorAll('.input_value');
      this.modalError = document.getElementById('error');
      this.closeModal = document.getElementById('close');
      this.sendButton = document.getElementById('send');
  
      this.bindEvents();
    }
  
    bindEvents() {
      this.modal.onclick = this.openModal.bind(this);
      this.closeModal.onclick = this.closeModal.bind(this);
      this.sendButton.onclick = this.sendForm.bind(this);
    }
  
    openModal() {
      this.form.style.display = 'flex';
    }
  
    closeModal() {
      this.form.style.display = 'none';
    }
  
    sendForm() {
      if (this.validateForm()) {
        this.form.style.display = 'none';
        this.clearForm();
      } else {
        this.showError();
      }
    }
  
    validateForm() {
      return Array.from(this.input_values).every(input => input.value.trim() !== '');
    }
  
    showError() {
      this.modalError.style.display = 'block';
    }
  
    clearForm() {
      this.input_values.forEach(input => input.value = '');
      this.modalError.style.display = 'none';
    }
  }
  const modalManager = new ModalManager();

  ymaps.ready(function () { 
    let Map = new ymaps.Map("YMapsID", {
        center: [35.782081, 139.898528],
        zoom: 13,
    });
    let myPlacemark = new ymaps.Placemark([35.782081, 139.898528], {
      content: 'Токио',
    });

    Map.geoObjects.add(myPlacemark);
});
});