RTEMApp.models.NavigationModel = Ext.regModel('Navigation', {
    fields: [
        {name: 'code',   type: 'string'},
        {name: 'label',  type: 'string'},
        {name: 'qty',	 type: 'string'},
        {name: 'owner',	 type: 'string'},
        {name: 'capacity',	 type: 'string'},
		{name: 'ef', type: 'string'}
    ]
});
