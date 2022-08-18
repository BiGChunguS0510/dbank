import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function() {
  // console.log("Finished Loading");
  let currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
});

document.querySelector("form").addEventListener("submit", async function(event){
  event.preventDefault();

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  const button = event.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);
  if (document.getElementById("input-amount").value.length != 0){
    await dbank_backend.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0){
    await dbank_backend.withdrawl(outputAmount);
  }  

  await dbank_backend.compound();

  let currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
});