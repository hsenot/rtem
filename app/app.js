Ext.chart.interactions.ItemDrill = Ext.extend(Ext.chart.interactions.Abstract, {
	gesture: 'singletap',
	constructor: function(config) {
		var me = this;
		me.addEvents('show');
		Ext.chart.interactions.ItemDrill.superclass.constructor.call(me, config);
	},
	onGesture: function(e) {
		var me = this,item = me.getItemForEvent(e),panel;
		if (item) {
			me.item = item;

			// Drilling down logic

			// Current navigation object
			var nai = RTEMApp.views.Navigation.getActiveItem();
			
			// The code of the clicked part					
			var clicked_item_code = item.storeItem.data.code;

			// We trigger the tap event on the nested list - this will maintain the sync between drill-down and the nested list
			var i = 0, cn = nai.recordNode.childNodes, k=cn.length, cc;

			// We know the code is the code of one of the children of the active item
			// Finding the right index for the item to tap is done by looping on the childNodes array
			for (i=0;i<k;i++)
			{
				cc = cn[i].attributes.record.data.code;
				if (cc==clicked_item_code)
				{
					RTEMApp.views.Navigation.fireEvent("itemtap", nai, i);
					break;
				}
			}

			delete me.item;
		}
	},
	reset: function() {
		var me = this,
			item = me.item;
		if (item) {
			item.series.unHighlightItem(item);
			delete me.item;
		}
	}		
});

Ext.chart.interactions.Manager.registerType('itemdrill', Ext.chart.interactions.ItemDrill);

RTEMApp = new Ext.Application({
    name: 'RTEMApp',
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    launch: function(){
        this.views.viewport = new this.views.Viewport({title: 'Real-Time Electricity Mix'});
    }
});

