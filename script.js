function generarFolio() {
  const now = new Date();
  return 'F' + now.getFullYear() +
         (now.getMonth() + 1).toString().padStart(2, '0') +
         now.getDate().toString().padStart(2, '0') +
         now.getHours().toString().padStart(2, '0') +
         now.getMinutes().toString().padStart(2, '0') +
         now.getSeconds().toString().padStart(2, '0');
}

let ultimoTicket = '';

function calcular() {
  const productos = [
    { nombre: "Tacos dorados", precio: 12, cantidad: parseInt(document.getElementById("tacos").value) || 0 },
    { nombre: "Enchiladas", precio: 20, cantidad: parseInt(document.getElementById("enchiladas").value) || 0 },
    { nombre: "Sopes", precio: 15, cantidad: parseInt(document.getElementById("sopes").value) || 0 },
    { nombre: "Tostadas", precio: 13, cantidad: parseInt(document.getElementById("tostadas").value) || 0 },
    { nombre: "Aguas frescas", precio: 10, cantidad: parseInt(document.getElementById("aguas").value) || 0 }
  ];

  let total = 0;
  const folio = generarFolio();
  const fecha = new Date().toLocaleString('es-MX');

  let ticket = `===== TICKET DE CENADURÍA =====\nFolio: ${folio}\nFecha: ${fecha}\n\n`;

  productos.forEach(p => {
    if (p.cantidad > 0) {
      let subtotal = p.precio * p.cantidad;
      total += subtotal;
      ticket += `${p.nombre} (${p.cantidad} x $${p.precio}): $${subtotal}\n`;
    }
  });

  ticket += "------------------------------\n";
  ticket += `TOTAL: $${total.toFixed(2)} MXN\n`;
  ticket += "Gracias por su compra.";

  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("ticket").textContent = ticket;
  ultimoTicket = ticket;
}

function guardarTicket() {
  if (!ultimoTicket) {
    alert("Primero genera un ticket.");
    return;
  }
  const blob = new Blob([ultimoTicket], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const folio = generarFolio();
  link.download = `ticket_${folio}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}
