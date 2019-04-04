const originalSetItem = sessionStorage.setItem;

sessionStorage.setItem = function() {
    const event = new CustomEvent(
        'itemInserted',
        {
            detail: {
                key:arguments[0],
                value: arguments[1],
            },
        },
    );

    originalSetItem.apply(this, arguments);

    document.dispatchEvent(event);

    console.log('inside set item')
};
