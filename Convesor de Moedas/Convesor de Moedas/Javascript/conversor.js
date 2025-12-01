const form = document.getElementById("converteForm");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertedAmount = document.getElementById("convertedAmount");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

const API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

async function convertMoney() {
    result.innerHTML = "";
    error.innerHTML = "";
    loading.style.display = "flex"; 

    const valor = amount.value; 
    if (!valor || valor <= 0) {
        error.innerHTML = "⚠️ Digite um valor válido maior que 0!";
        loading.style.display = "none";
        return;
    }

    try {
        const baseLower = fromCurrency.value.toLowerCase();
        const targetLower = toCurrency.value.toLowerCase();
        
        const response = await fetch(`${API_URL}/${baseLower}.json`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        const rate = data[baseLower][targetLower];
        
        if (!rate) {
            throw new Error(`Taxa não encontrada para ${fromCurrency.value} → ${toCurrency.value}`);
        }
        
        const convertedValue = (parseFloat(valor) * rate).toFixed(2);
        

        convertedAmount.value = convertedValue;
        amount.value = valor; 

        result.innerHTML = `
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #4caf50;">
                <p style="margin: 0; color: #2e7d32; font-weight: bold;">
                    <strong>1 ${fromCurrency.value} = ${parseFloat(rate).toFixed(4)} ${toCurrency.value}</strong><br><br>
                    <span style="font-size: 1.5em; color: #1976d2;">${valor} ${fromCurrency.value} = ${convertedValue} ${toCurrency.value}</span>
                </p>
            </div>
        `;

    } catch (err) {
        error.innerHTML = `<div style="background: #ffebee; padding: 10px; border-radius: 8px; color: #c62828; border-left: 4px solid #f44336;">❌ ${err.message || 'Erro na conversão. Tente novamente!'}<br><small>Verifique o console (F12) para mais detalhes.</small></div>`;
        console.error("Erro completo:", err); 
        amount.value = valor; 
    } finally {
        loading.style.display = "none";
    }
}


form.addEventListener("submit", function(e) {
    e.preventDefault();
    convertMoney();
});


amount.addEventListener("input", () => setTimeout(convertMoney, 500)); 
fromCurrency.addEventListener("change", convertMoney);
toCurrency.addEventListener("change", convertMoney);
