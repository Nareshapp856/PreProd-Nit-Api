const mssql = require('mssql')


let pool;

const poolConfig = () => ({
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    server: process.env.DB_SERVER, 
    database: process.env.DB_DATABASE, 
    port: parseInt(process.env.DB_PORT || '1433'), 
    options: {
        encrypt: true, 
        trustServerCertificate: true, 
    },
});

const fetchParams = entity => {
    const params = [];
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const value = entity[key];
            params.push({
                name: key,
                value
            });
        }
    }
    return params;
};

const assignParams = (request, inputs, outputs) => {
    [inputs, outputs].forEach((params, index) => {
        const operation = index === 0 ? 'input' : 'output';
        params.forEach(param => {
            if (param.type) {
                request[operation](param.name, param.type, param.value);
            } else {
                request[operation](param.name, param.value);
            }
        });
    });
};

const run = async (name, command, inputs = [], outputs = []) => {
    await connect();
    const request = pool.request();
    assignParams(request, inputs, outputs);
    return request[name](command);
};

const connect = async () => {
    if (!pool) {
        pool = new mssql.ConnectionPool(poolConfig());
    }
    if (!pool.connected) {
        await pool.connect();
    }
};

const query = async (command, inputs = [], outputs = []) => {
    return run('query', command, inputs, outputs);
};

const queryEntity = async (command, entity, outputs = []) => {
    const inputs = fetchParams(entity);
    return run('query', command, inputs, outputs);
};

const execute = async (command, inputs = [], outputs = []) => {
    return run('execute', command, inputs, outputs);
};

const executeEntity = async (command, entity, outputs = []) => {
    const inputs = fetchParams(entity);
    return run('execute', command, inputs, outputs);
};

const generateTable = (columns, entities) => {
    const table = new mssql.Table();

    columns.forEach(column => {
        if (column && typeof column === 'object' && column.name && column.type) {
            if (column.hasOwnProperty('options')) {
                table.columns.add(column.name, column.type, column.options);
            } else {
                table.columns.add(column.name, column.type);
            }
        }
    });

    entities.forEach(entity => {
        table.rows.add(...columns.map(i => entity[i.name]));
    });

    return table;
};

const convertToBase64 = (file) => {

    const fileBase64 = '';

    
    const reader = new FileReader();
 
    reader.readAsDataURL(file);
    reader.onloadend = () => {
     
        fileBase64=reader.result.toString('base64');
        console.log(fileBase64);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    return fileBase64
  };

module.exports = {
    pool,
    mssql,
    connect,
    query,
    queryEntity,
    execute,
    executeEntity,
    generateTable
};