export function currencyFormat(value: number) {
    return '$' + (value / 100).toFixed(2)
}