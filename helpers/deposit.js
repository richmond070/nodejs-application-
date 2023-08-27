document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    // Get the amount input field value
    const amountInput = document.getElementById('amountInput');
    const amountValue = amountInput.value;
  
    // Convert the amount value to an integer using parseInt()
    const amountAsInteger = parseInt(amountValue, 10); // 10 indicates base 10 (decimal)
})