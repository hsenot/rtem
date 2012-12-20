RTEMApp.views.ChartView = new Ext.chart.Chart({
                cls: 'pie1',
                theme: 'Demo',
                store: RTEMApp.stores.ChartStore,
                shadow: false,
                animate: true,
                insetPadding: 20,
                legend: {
                    position: {
                        portrait: 'bottom',
                        landscape: 'left'
                    }
                },
                interactions: [
                {
                    type: 'rotate'
                },{
                	type:'itemdrill',
                	gesture:'singletap'
                }],
                series: [{
                    type: 'pie',
                    field: 'qty',
                    showInLegend: true,
                    label: {
                        field: 'code',
                        contrast: true
                    },
					highlight: {
						segment: {
							margin: 5
						}
					},
      				listeners: {
        				'labelOverflow': function(label, item) {
          					item.useCallout = true;
        				}
      				},					
		            callouts: {
        		        renderer: function(callout, storeItem) {
                		    callout.label.setAttributes({
                        		text: storeItem.get('code')
		                    }, true);
        		        },
                		filter: function() {
                    		return false;
		                },
		                lines: {
        		            'stroke-width': 2,
                		    offsetFromViz: 0
		                },
		                label: {
		                    font: '12px Arial',
		                    fill: '#000000'
 		               }
 		           }
                }],
                listeners:{
                	refresh:function(c){
                		// Store changed, we need to refresh the legend as well
                		this.legend.getView().updateStore();
                	}
                }
});

