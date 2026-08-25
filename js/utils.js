// ========== UTILITIES ==========
function formatDatePTBR(d){d=d||new Date();return String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear();}
function formatDateTimePTBR(d){d=d||new Date();return formatDatePTBR(d)+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
function escapeHtml(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}
