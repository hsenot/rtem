RTEMApp.views.Navigation = new Ext.NestedList({
    store: RTEMApp.stores.NavigationStore,
    dock: 'left',
    useTitleAsBackText: false,
    title: 'Choose drill-down',
    displayField: 'label',
    toolbar:{hidden:true},
    hideAnimation: 'fadeOut',
	hidden: true,
    onBackTap:function(){
		// Loading values in the store for the parent node of the current node 
		// This allows the chart store to remain in sync with the navigation (drill up)
		var ar = this.items.items[this.items.length-2].recordNode.subStore.data.items.slice().sort(function(a,b){
			if (b.data.qty==a.data.qty){
				if (a.data.code<b.data.code)
					return -1
				if (a.data.code>b.data.code)
					return 1
				return 0
			}
			else
			{
				return b.data.qty-a.data.qty
			}
		});
		RTEMApp.stores.ChartStore.loadData(ar);	    	
		// Performing the normal onBackTap
		Ext.NestedList.prototype.onBackTap.call(this, arguments);
	},
    listeners: {
        itemtap: function(subList, subIndex, el, e) {
			// Hiding the navigation on first tap (i.e. first level)
        	this.hide();
        
            var store = subList.getStore(),
                record = store.getAt(subIndex),
                recordNode = record.node,
                parentNode = recordNode ? recordNode.parentNode : null;

            // toolbar title change and back button display
            var toolBar = RTEMApp.views.viewport.toolBar;
            toolBar.setTitle(recordNode.attributes.record.data.label);
            toolBar.items.get(0).show();

			// If it's a leaf then we display the generator detail
            if (recordNode.leaf) {
				// We display a power plant view
				// which contains direct attributes and an image from Pachube
				var ppv = RTEMApp.views.PowerPlantView;
         
                // Appending extra items to the ppv:
                // Quantity field, and its appropriate label
				var qtyElt=Ext.getCmp('qty_elt');
				if (qtyElt)
				{
					ppv.remove(qtyElt);
				}

                if (this.items.items[1].recordNode.attributes.record.data.code!="emi")
                {
                	var var_lab;

					if (this.items.items[1].recordNode.attributes.record.data.code=="gen")
					{
						var_lab = 'Current output (MW)';
					}

					if (this.items.items[1].recordNode.attributes.record.data.code=="em")
					{
						var_lab = 'Current emissions (t CO2-e)';
					}
                
					var qty_item ={
						id: 'qty_elt',
						xtype: 'textfield',
						name: 'qty',
						label: var_lab,
						disabled:true
					};
	
					ppv.add(qty_item);
                }
            
                // Pachube longitudinal graph
 				// Get the viewport dimensions
				var w = Ext.Viewport.getSize().width;
				if (w>600) {w=600;}
 				var h = Math.round(w*2/3);
				// Requesting the Pachube image with these dimensions
				var pachube_img_url = 'https://api.pachube.com/v2/feeds/47944/datastreams/'+recordNode.attributes.record.data.code+'.png?width='+w+'&height='+h+'&colour=%23f15a24&duration=1day&title=Instant%20output%20(MW)%20over%20the%20last%2024h&show_axis_labels=true&detailed_grid=true&scale=datastream&min=0&timezone=Melbourne';

				// Removing the component if exists already
				var pachImg = Ext.getCmp('pachubeImg');
				if (pachImg)
				{
					ppv.remove(pachImg);
				}
				// Adding the image to the form as a simple HTML element
				ppv.add({
						id:'pachubeImg',
		            	html:'<img src="http://src.sencha.io/-48/'+pachube_img_url+'"/>'
				});
				ppv.doLayout();
				
                RTEMApp.views.viewport.setActiveItem(ppv, 'slide');

				// Setting the form values to the data values                
                ppv.setValues(recordNode.attributes.record.data);				
				
            }
            else
            {
				// If emission intensity, bar charts
				if (this.items.items[1].recordNode.attributes.record.data.code=="emi")
				{

					// Loading values in the store
					var ar = recordNode.subStore.data.items.slice().sort(function(a,b){
						if (b.data.qty==a.data.qty){
							if (a.data.code<b.data.code)
								return -1
							if (a.data.code>b.data.code)
								return 1
							return 0
						}
						else
						{
							return b.data.qty-a.data.qty
						}
					});
					RTEMApp.stores.ChartStore.loadData(ar);	
					// Creating the chart
            		var barchart = RTEMApp.views.BarChartView;
					// Calling the right chart
					RTEMApp.views.viewport.setActiveItem(barchart, 'slide');
				}
            	// Else pie charts
				else
				{
					// Loading values in the store
					var ar = recordNode.subStore.data.items.slice().sort(function(a,b){
						if (a.data.code<b.data.code)
							return -1
						if (a.data.code>b.data.code)
							return 1
						return 0
					});
					RTEMApp.stores.ChartStore.loadData(ar);	
					// Creating the chart
            		var chart = RTEMApp.views.ChartView;
					// Calling the right chart
					RTEMApp.views.viewport.setActiveItem(chart, 'slide');
				}
            }
        }

    }
});
