function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function calculateLCM(n) {
    let lcm = 1;
    for (let i = 2; i <= n; i++) {
        lcm = lcm * i / gcd(lcm, i);
    }
    return lcm;
}

function calculateMCM() {
    const inputNumber = document.getElementById('inputNumber').value;
    const n = parseInt(inputNumber, 10);

    if (isNaN(n) || n <= 0) {
        alert('Por favor, ingrese un número válido mayor que cero.');
        return;
    }

    const lcmResult = calculateLCM(n);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `El MCM del conjunto del 1 al ${n} es: ${lcmResult}`;
}
