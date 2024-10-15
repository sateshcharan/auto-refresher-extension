document.getElementById('save').addEventListener('click', function() {
    const minInterval = parseInt(document.getElementById('minInterval').value);
    const maxInterval = parseInt(document.getElementById('maxInterval').value);

    chrome.storage.sync.set({
        minInterval: minInterval,
        maxInterval: maxInterval
    }, function() {
        alert('Settings saved');
    });
});

// Load the saved settings and counter
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['minInterval', 'maxInterval', 'refreshCount'], function(result) {
        document.getElementById('minInterval').value = result.minInterval || 30000;
        document.getElementById('maxInterval').value = result.maxInterval || 60000;
        document.getElementById('refreshCount').textContent = result.refreshCount || 0;
    });
});
