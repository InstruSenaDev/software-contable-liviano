const cuentasContables = [
    { codigo: '1', cuenta: 'Activo', naturaleza: 'Débito' },
    { codigo: '11', cuenta: 'Efectivo y Equivalentes Al Efectivo', naturaleza: 'Débito' },
    { codigo: '1105', cuenta: 'Caja', naturaleza: 'Débito' },
    { codigo: '110505', cuenta: 'Caja General', naturaleza: 'Crédito' },
    { codigo: '1110', cuenta: 'Bancos', naturaleza: 'Débito' },
    { codigo: '1435', cuenta: 'Mercancías no fabricadas por la empresa', naturaleza: 'Débito' },
    { codigo: '1525', cuenta: 'Equipos de Computación', naturaleza: 'Débito' },
    { codigo: '2', cuenta: 'Pasivos', naturaleza: 'Crédito' },
    { codigo: '2205', cuenta: 'Proveedores Nacionales', naturaleza: 'Crédito' },
    { codigo: '2408', cuenta: 'Impuesto sobre las ventas por pagar', naturaleza: 'Crédito' },
    { codigo: '240810', cuenta: 'IVA Descontable', naturaleza: 'Débito' },
    { codigo: '5105', cuenta: 'Gastos por Servicios', naturaleza: 'Débito' },
    { codigo: '510510', cuenta: 'Fletes y Transporte', naturaleza: 'Débito' },
    { codigo: '5170', cuenta: 'Impuestos Arancelarios', naturaleza: 'Débito' },
    { codigo: '5305', cuenta: 'Descuentos Comerciales en Compras', naturaleza: 'Crédito' },
    { codigo: '5310', cuenta: 'Devoluciones en Compras', naturaleza: 'Crédito' }
];

let facturas = [];
let cuentasSeleccionadas = [];

document.addEventListener('DOMContentLoaded', () => {
    const selectCuentas = document.getElementById('cuentas');
    cuentasContables.forEach(cuenta => {
        const option = document.createElement('option');
        option.value = cuenta.codigo;
        option.textContent = `${cuenta.codigo} - ${cuenta.cuenta}`;
        selectCuentas.appendChild(option);
    });

    // Función para actualizar valores en el resumen de compras en tiempo real
    document.querySelectorAll('#monto, #impuesto, #descuento').forEach(input => {
        input.addEventListener('input', actualizarResumenCompras);
    });

    function actualizarResumenCompras() {
        const monto = parseFloat(document.getElementById('monto').value) || 0;
        const impuesto = parseFloat(document.getElementById('impuesto').value) || 0;
        const descuento = parseFloat(document.getElementById('descuento').value) || 0;

        const montoImpuesto = monto * (impuesto / 100);
        const montoDescuento = monto * (descuento / 100);
        const totalCalculado = monto + montoImpuesto - montoDescuento;

        // Actualizar valores en el resumen de compras en tiempo real
        const proveedor = document.getElementById('proveedor').value || "N/A";
        const tablaFacturas = document.getElementById('tablaFacturas');
        tablaFacturas.innerHTML = ''; // Limpiar la tabla para actualizar con los nuevos valores

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border p-2">${proveedor}</td>
            <td class="border p-2">$${monto.toFixed(2)}</td>
            <td class="border p-2">$${montoImpuesto.toFixed(2)}</td>
            <td class="border p-2">$${montoDescuento.toFixed(2)}</td>
            <td class="border p-2">$${totalCalculado.toFixed(2)}</td>
        `;
        tablaFacturas.appendChild(row);

        const totalCompras = document.getElementById('totalCompras');
        totalCompras.textContent = `$${totalCalculado.toFixed(2)}`;
    }

    // Función para manejar la selección y visualización de cuentas contables
    document.getElementById('agregarCuentas').addEventListener('click', () => {
        const tipo = document.getElementById('tipo').value;
        const cuentaCodigo = document.getElementById('cuentas').value;
        const valor = parseFloat(document.getElementById('valor').value) || 0;

        if (cuentaCodigo && valor) {
            const cuentaSeleccionada = cuentasContables.find(c => c.codigo === cuentaCodigo);
            if (cuentaSeleccionada) {
                cuentasSeleccionadas.push({ tipo, cuenta: cuentaSeleccionada, valor });
                actualizarCuentasSeleccionadas();
                document.getElementById('valor').value = '';
            }
        }
    });

    function actualizarCuentasSeleccionadas() {
        const cuentasSeleccionadasList = document.getElementById('cuentasSeleccionadas');
        cuentasSeleccionadasList.innerHTML = '';

        cuentasSeleccionadas.forEach(cuenta => {
            const listItem = document.createElement('li');
            listItem.textContent = `${cuenta.tipo} - ${cuenta.cuenta.codigo} - ${cuenta.cuenta.cuenta}: $${cuenta.valor.toFixed(2)}`;
            cuentasSeleccionadasList.appendChild(listItem);
        });
    }

    // Función para contabilizar las compras
    document.getElementById('contabilizar').addEventListener('click', () => {
        const resumen = {
            proveedor: document.getElementById('proveedor').value,
            monto: parseFloat(document.getElementById('monto').value) || 0,
            impuesto: parseFloat(document.getElementById('impuesto').value) || 0,
            descuento: parseFloat(document.getElementById('descuento').value) || 0
        };

        // Mostrar los datos en la tabla de registro contable
        const tablaContabilidad = document.getElementById('tablaContabilidad');
        tablaContabilidad.innerHTML = '';

        let totalDebitos = 0;
        let totalCreditos = 0;

        cuentasSeleccionadas.forEach(cuenta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="border p-2">${cuenta.cuenta.codigo} - ${cuenta.cuenta.cuenta}</td>
                <td class="border p-2">${cuenta.tipo === 'debito' ? `$${cuenta.valor.toFixed(2)}` : ''}</td>
                <td class="border p-2">${cuenta.tipo === 'credito' ? `$${cuenta.valor.toFixed(2)}` : ''}</td>
            `;
            tablaContabilidad.appendChild(row);

            if (cuenta.tipo === 'debito') {
                totalDebitos += cuenta.valor;
            } else if (cuenta.tipo === 'credito') {
                totalCreditos += cuenta.valor;
            }
        });

        document.getElementById('totalDebitos').textContent = `$${totalDebitos.toFixed(2)}`;
        document.getElementById('totalCreditos').textContent = `$${totalCreditos.toFixed(2)}`;

        // Validar saldos
        const validacionSaldos = document.getElementById('validacionSaldos');
        if (totalDebitos === totalCreditos) {
            validacionSaldos.textContent = 'Los saldos están equilibrados.';
            validacionSaldos.className = 'text-green-500';
        } else {
            validacionSaldos.textContent = 'Los saldos NO están equilibrados.';
            validacionSaldos.className = 'text-red-500';
        }
    });
});
