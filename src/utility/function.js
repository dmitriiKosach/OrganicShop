export function getStatistics(orders, categoriesStatus, typeStat) {
    let res = new Map();
    typeStat === "statProducts"
        ? orders.map(order => {
            order.products.map(product => {
                if (categoriesStatus === "yes") {
                    if (!res.has(product.category)) {
                        res.set(product.category, { count: 1, quantity: product.quantity, unit: product.unit });
                    } else {
                        let property = res.get(product.category);
                        res.set(product.category, { count: property.count + 1, quantity: property.quantity + product.quantity, unit: property.unit });
                    }
                } else {
                    if (!res.has(product.name)) {
                        res.set(product.name, { count: 1, quantity: product.quantity, unit: product.unit });
                    } else {
                        let property = res.get(product.name);
                        res.set(product.name, { count: property.count + 1, quantity: property.quantity + product.quantity, unit: property.unit });
                    }
                }
            })
        })
        : orders.map(order => {
            if (!res.has(order.username)) {
                res.set(order.username, { count: 1, totalPurchases: Number(order.totalPrice) });
            } else {
                let property = res.get(order.username);
                res.set(order.username, { count: property.count + 1, totalPurchases: Number(property.totalPurchases) + Number(order.totalPrice) });
            }
        })
    return new Map([...res.entries()].sort((a, b) => b[1].count - a[1].count));;
}

export function getDataBase(dataEntries, label) {
    let database = { labels: [], data: [], label: label === "" ? "customers statistic in chart" : label + " statistic in chart"}
    for (let entry of dataEntries) {
        database.labels.push(entry[0]);
        database.data.push(label === "" ? entry[1].totalPurchases : entry[1].count);
    }
    return database;
}