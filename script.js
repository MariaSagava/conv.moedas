async function converterMoeda() {
    const valor = document.getElementById('valor').value;
    const moedaOrigem = document.getElementById('moedaOrigem').value;
    const moedaDestino = document.getElementById('moedaDestino').value;

    if (!valor) {
        document.getElementById('resultado').innerHTML = 'Por favor, insira um valor para converter.';
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`);
        
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }

        const data = await response.json();
        
        if (data.rates) {
            const taxa = data.rates[moedaDestino];
            const resultado = (valor * taxa).toFixed(2);
            const valorFormatado = new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(resultado);

            document.getElementById('resultado').innerHTML = 
                `${valor} ${moedaOrigem} = ${valorFormatado} ${moedaDestino}`;
        }
    } catch (error) {
        document.getElementById('resultado').innerHTML = 
            'Erro ao converter. Tente novamente mais tarde.';
        console.error('Erro:', error);
    }
}


document.getElementById('valor').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        converterMoeda();
    }
});
