let minInterval = 30000; // Default minimum interval (in milliseconds)
let maxInterval = 60000; // Default maximum interval (in milliseconds)
let refreshCount = 0; // Counter to track the number of refreshes

function getRandomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startAutoRefresh() {
  chrome.storage.sync.get(['minInterval', 'maxInterval', 'refreshCount'], function(result) {
    minInterval = result.minInterval || minInterval;
    maxInterval = result.maxInterval || maxInterval;
    refreshCount = result.refreshCount || 0;

    const interval = getRandomInterval(minInterval, maxInterval);

    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.reload(tabs[0].id, function() {
          // Increment the counter and save it
          refreshCount++;
          chrome.storage.sync.set({ refreshCount: refreshCount });
        });
      });
      startAutoRefresh(); // Schedule the next refresh
    }, interval);
  });
}

// Start the auto-refresh process
startAutoRefresh();
