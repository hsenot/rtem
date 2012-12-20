RTEMApp.views.PowerPlantView = new Ext.form.FormPanel({
	fullscreen:true,
	scroll:'vertical',
//scrollable: {
//    direction: 'vertical',
//    directionLock: true
//},
	items: [
        {
            xtype: 'textfield',
            name: 'code',
            label: 'Code',
            disabled:true
        },
        {
            xtype: 'textfield',
            name: 'label',
            label: 'Label',
            disabled:true
        },
        {
            xtype: 'textfield',
            name: 'owner',
            label: 'Operator',
            disabled:true
        },
		{
			xtype:'textfield',
			name: 'ef',
			label: 'Emission factor (t CO2-e / MWh sent out)',
			disabled: true
		},
        {
            xtype: 'textfield',
            name: 'capacity',
            label: 'Capacity (MW)',
            disabled:true
        }
    ]
});

