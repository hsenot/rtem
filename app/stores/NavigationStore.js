(function(){

RTEMApp.stores.NavigationStore = new Ext.data.TreeStore({
	model:'Navigation',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'app/data/state.json',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});

})();