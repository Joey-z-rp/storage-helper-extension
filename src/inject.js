var originalSetItem = sessionStorage.setItem;

sessionStorage.setItem = function() {
    var event = new Event('itemInserted');
    document.dispatchEvent(event);

    originalSetItem.apply(this, arguments);
    console.log('inside set item')
}

