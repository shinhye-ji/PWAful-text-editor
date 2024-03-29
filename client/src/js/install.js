const butInstall = document.getElementById('buttonInstall');
// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit')
    console.log('event' + event)
    event.preventDefault();

    window.deferredPrompt = event;

    butInstall.classList.toggle('hidden', false);
});
// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if(!promptEvent) {
        return;
    }
    
    // show the prompt 
    promptEvent.prompt();

    // reset deferred prompt variable
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear the promp womp womp
    console.log('Install hit')
    window.deferredPrompt = null;
});
