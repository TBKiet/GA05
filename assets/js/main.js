function showToast(message, type) {
    const toast = document.getElementById("formToast");
    const toastMessage = document.getElementById("toastMessage");
    toast.className = `toast bg-${type}`;
    toastMessage.innerText = message;
    const bootstrapToast = new bootstrap.Toast(toast, {
      delay: 3000, // Delay in milliseconds (3 seconds)
    });
    bootstrapToast.show();
  }