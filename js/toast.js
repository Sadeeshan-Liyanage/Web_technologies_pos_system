// =================Toast notification system=================//
function showToast(message, type = 'success') {
    const icons = { success: '✓', error: '✕', warn: '⚠' };
    const toast = $(`
        <div class="toast ${type !== 'success' ? type : ''}">
            <span>${icons[type] || icons.success}</span>
            <span>${message}</span>
        </div>
    `);
    $('#toast-container').append(toast);
    setTimeout(() => toast.fadeOut(300, () => toast.remove()), 2800);
}
