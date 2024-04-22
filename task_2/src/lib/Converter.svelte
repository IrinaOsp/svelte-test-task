<script lang="ts">
  import { onMount } from 'svelte';

let amount = 1;
let fromCurrency = 'USD';
let toCurrency = 'EUR';
let convertedAmount = 0;
let rate = 1;
let error = '';
let currencies = [fromCurrency, toCurrency];

async function fetchExchangeRate() {
  if (!fromCurrency || !toCurrency) return;

  const url = `https://open.er-api.com/v6/latest/${fromCurrency}`;
  const response = await fetch(url).then((res) => res.json());
  currencies = [...Object.keys(response.rates)];
  rate = response.rates[toCurrency.toUpperCase()];
  handleAmountChange()
}

function handleCurrencyChange() {
  fetchExchangeRate();
}
function handleAmountChange() {
  convertedAmount = isNaN(amount * rate) ? 0 : amount * rate;
  error = convertedAmount ? '' : 'Please enter a valid amount and currencies';
}

onMount(fetchExchangeRate);
</script>

<div>
  <div>
    <label class="label">
      From:
      <input 
        type="number" 
        bind:value={amount} 
        on:input={handleAmountChange}
       />
      <select bind:value={fromCurrency} on:change={handleCurrencyChange}>
        {#each currencies as currency}
          <option value={currency}>
            {currency}
          </option>
        {/each}
      </select>
    </label>
  </div>

  <div>
    <label class="label">
      To:
      <span>
        {convertedAmount.toFixed(2)}
      </span>
      <select bind:value={toCurrency} on:change={handleCurrencyChange}>
        {#each currencies as currency}
          <option value={currency}>
            {currency}
          </option>
        {/each}
      </select>
    </label>
  </div>
  <p class="error">{error}</p>

  <a href="https://www.exchangerate-api.com" class="note">
    Rates By Exchange Rate API
  </a>

</div>


<style>
  .label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5em;
    font-weight: bold;
  }
  .error {
    color: red;
    height: 1em;
  }
  .note {
    display: block;
    margin-top: 2em;
    font-size: 0.8em;
    color: gray;
  }
</style>