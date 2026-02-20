const winProbabilityInput = document.getElementById('winProbability');
const decimalOddsInput = document.getElementById('decimalOdds');
const betAmountOutput = document.getElementById('betAmount');
const explanationOutput = document.getElementById('explanation');
const fractionInputs = Array.from(document.querySelectorAll('input[name="kellyFraction"]'));

const state = {
  bankroll: 0,
};

function requestBankroll() {
  const response = window.prompt('Enter your starting capital in dollars:', '1000');
  if (response === null) {
    return requestBankroll();
  }

  const parsed = Number.parseFloat(response);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    window.alert('Please enter a positive number for bankroll.');
    return requestBankroll();
  }

  state.bankroll = parsed;
}

function getSelectedFraction() {
  const selected = fractionInputs.find((input) => input.checked);
  return selected ? Number.parseFloat(selected.value) : 1;
}

function calculateKellyFraction(probabilityPercent, decimalOdds) {
  const p = probabilityPercent / 100;
  const q = 1 - p;
  const b = decimalOdds - 1;

  if (b <= 0 || p < 0 || p > 1) {
    return 0;
  }

  const fullKelly = (b * p - q) / b;
  return Math.max(0, fullKelly);
}

function updateOutput() {
  const probability = Number.parseFloat(winProbabilityInput.value);
  const odds = Number.parseFloat(decimalOddsInput.value);
  const fraction = getSelectedFraction();

  if (!Number.isFinite(probability) || !Number.isFinite(odds)) {
    betAmountOutput.textContent = '$0.00';
    explanationOutput.textContent = 'Please enter valid numbers.';
    return;
  }

  const fullKellyFraction = calculateKellyFraction(probability, odds);
  const adjustedFraction = fullKellyFraction * fraction;
  const stake = state.bankroll * adjustedFraction;

  betAmountOutput.textContent = `$${stake.toFixed(2)}`;

  if (stake <= 0) {
    explanationOutput.textContent = 'No positive edge detected; Kelly stake is $0.00.';
    return;
  }

  const riskLabel = fraction === 1 ? 'Full' : fraction === 0.5 ? 'Half' : 'Quarter';
  explanationOutput.textContent = `${riskLabel} Kelly = ${(adjustedFraction * 100).toFixed(
    2
  )}% of bankroll ($${state.bankroll.toFixed(2)}).`;
}

requestBankroll();
updateOutput();

[winProbabilityInput, decimalOddsInput, ...fractionInputs].forEach((input) => {
  input.addEventListener('input', updateOutput);
  input.addEventListener('change', updateOutput);
});
