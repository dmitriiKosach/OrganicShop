export const CURRENCY = 'USD';

export const paypalConf = {
    currency: CURRENCY,
    env: 'sandbox',
    client: {
        sandbox: 'AZ7JurNh8d3jQm6lx1FDca7gtrCNNkO4jNaPD9vmnbFjsWOysQEMop0Bp0icfkJBpK6jueiRCVuFRAnD',
        production: '-- id --'
    },
    style: {
        label: 'pay',
        size: 'medium',
        shape: 'rect',
        color: 'gold'
    }
};