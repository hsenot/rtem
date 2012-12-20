RTEMApp.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    items: [{
        cls: 'launchscreen',
        html: '<div><p>This application visualizes the real-time electricity mix in the Australian (Eastern states) grid.</p></div>'
    }],
    initComponent: function() {
        var navigateButton = new Ext.Button({
            hidden: Ext.is.Phone || Ext.Viewport.orientation == 'landscape',
            text: 'Navigation',
            handler: function() {
                EnergyApp.views.Navigation.showBy(this, 'fade');
            }
        });
		
		var h = function(){
                var navigation = RTEMApp.views.Navigation,title;
				var chart = RTEMApp.views.ChartView;
				var barchart = RTEMApp.views.BarChartView;
				var ppv = RTEMApp.views.PowerPlantView;

                if(this.getActiveItem() === navigation){
                    navigation.onBackTap();
                    
                    // we are in the root - no back button here
                    if(navigation.items.indexOf(navigation.getActiveItem()) <= 0){
                        this.toolBar.items.get(0).hide();
                        title = this.title || '';
                    }
                }else{
					if (navigation.items.indexOf(navigation.getActiveItem()) == 1){
						navigation.onBackTap();
	                    this.setActiveItem(navigation, {
	                        type: 'slide',
	                        reverse: true
	                    });
	                    this.toolBar.items.get(0).hide();
                        title = this.title || '';
					}
					else
					{
						// We need to drill-up, that is: going back from the detailed view to the chart
						if (this.getActiveItem() === ppv){
							// Distinguishing between charts and barcharts
							if (navigation.items.items[1].recordNode.attributes.record.data.code=="emi")
							{
								// Going back to barcharts
							    this.setActiveItem(barchart, {
			                        type: 'slide',
	    		                    reverse: true
	        		            });									
							}
							else
							{
							    this.setActiveItem(chart, {
			                        type: 'slide',
	    		                    reverse: true
	        		            });							
							}
						}
						else
						{
							// Or drilling up the navigation tree
							navigation.onBackTap();
						}
					}
               }
               var recordNode = navigation.getActiveItem().recordNode;
               title = title || navigation.renderTitleText(recordNode);
              
               this.toolBar.setTitle(title);
               
            };
		
        var onHelpTap = function() {
			new Ext.Panel({
 		          floating: true,
		           modal: true,
		           centered: true,
		           width: 300,
		           height: 300,
		           styleHtmlContent: true,
		           scroll: 'vertical',
		           dockedItems: [{
		               dock: 'top',
		               xtype: 'toolbar',
		               title: 'What\'s that app?'
		           }],
		           stopMaskTapEvent: false,
		           fullscreen: false,
				   html: "It lets you explore the electricity produced in the Eastern grid (the \"NEM\") in terms of:<ul>" +
							"<li>Quantity (in MW)</li>" +
							"<li>Emissions (in t CO2-e)</li>" +
							"<li>Emission intensity (in t CO2-e / MWh sent out)</li>" +
							"</ul>" +
							"You can interact with the data:<ul>" +
							"<li>Tap on a pie slice or a bar to get more detail (drill down)</li>" +
							"<li>Rotate the pies</li>" +
							"<li>Remove pie slices by tapping the corresponding legend items</li>"+
							"</ul>"
		       }).show('pop');
		};
		
        this.toolBar = new Ext.Toolbar({
            ui: 'dark',
            dock: 'top',
            items: [
				// Back button
            	{text: 'Back',ui: 'back',handler: h,hidden: true,scope: this},
            	// Spacer to get the remaining buttons to the right
            	{xtype : 'spacer'},
            	// Help button
            	{iconCls: 'help',iconMask: true,ui: 'plain',handler: onHelpTap}
            ],
            title: this.title
        });

        this.dockedItems = this.dockedItems || [];
        this.dockedItems.unshift(this.toolBar);
        this.items = this.items || [];
        this.items.unshift(RTEMApp.views.Navigation);


        RTEMApp.views.Viewport.superclass.initComponent.call(this, arguments);
    },
    layoutOrientation: function(orientation, w, h) {
        RTEMApp.views.Viewport.superclass.layoutOrientation.call(this, orientation, w, h);
    }
});
