var originalSetItem = sessionStorage.setItem;

sessionStorage.setItem = function() {
    var event = new Event('itemInserted');

    originalSetItem.apply(this, arguments);
    document.dispatchEvent(event);

    console.log('inside set item')
}
