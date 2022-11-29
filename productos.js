const fs = require('fs');

class contenedor {
    constructor(path) {
        this.path = path;
    }

    getAll = async () => {
        try {
            const info = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(info);
        } catch (error) {
            console.log(error);
        }
    };

    save = async (nombre, precio, thumbnail) => {
        const stock = await this.getAll();

        const producto = {
            nombre,
            precio,
            thumbnail,
        };

        stock.push(producto);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(stock, null, 2));
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = contenedor;
