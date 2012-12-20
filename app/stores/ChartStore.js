RTEMApp.models.ElecQtyModel = Ext.regModel('ElecQtyModel', {
    fields: [
        {name: 'code',   type: 'string'},
        {name: 'label',  type: 'string'},
        {name: 'qty',	 type: 'string'}
    ]
});

RTEMApp.stores.ChartStore = new Ext.data.JsonStore({
	model: 'ElecQtyModel',
	data: []
});

