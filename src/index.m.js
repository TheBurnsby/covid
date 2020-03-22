
Oxe.setup({
    listener: {

    },
    fetcher: {
        // acceptType: 'json',
        // contentType: 'json',
        responseType: 'json',
        // credentials: 'include',
        // origin: window.location.origin
    },
    component: {

    },
    router: {
        routes: [
            'index',
            'countries',
            'country',
            'state',
            'usa'

        ]
    }
}).then(() => {
    window.document.body.style.opacity = 1;
    // Global.modal.options.action = { class: 'button smoke' };
}).catch(console.error);
