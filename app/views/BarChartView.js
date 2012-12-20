var colors = ['url(#v-1)','url(#v-2)','url(#v-3)'];

RTEMApp.views.BarChartView = new Ext.chart.Chart({
                cls: 'column1',
                store: RTEMApp.stores.ChartStore,
                shadow: false,
                animate: true,
                interactions: [{
                	type:'itemdrill',
                	gesture:'singletap'
                }],
                gradients: [{
                    'id': 'v-1',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(212, 40, 40)'
                        },
                        100: {
                            color: 'rgb(117, 14, 14)'
                        }
                    }
                },
                {
                    'id': 'v-2',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(255, 140, 0)'
                        },
                        100: {
                            color: 'rgb(160, 82, 45)'
                        }
                    }
                },
                {
                    'id': 'v-3',
                    'angle': 0,
                    stops: {
                        0: {
                            color: 'rgb(43, 221, 115)'
                        },
                        100: {
                            color: 'rgb(14, 117, 56)'
                        }
                    }
                }],
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    fields: ['qty'],
                    minimum: 0.0,
                    maximum: 1.6,
                    majorTickSteps: 3,
                    minorTickSteps: 3,
                    title: 'Intensity (t CO2-e / MWh)',
					grid: {
						odd: {
							opacity: 1,
							fill: '#ddd',
							stroke: '#bbb',
							'stroke-width': 1
						}
					}
        		},
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['code']
                }],
                series: [{
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    renderer: function(sprite, storeItem, barAttr, i, store) {
                    	var uk_avg = 0.575;
						if (storeItem.data.qty<uk_avg) 
	                        {barAttr.fill = colors[2];}
						if ((storeItem.data.qty>=uk_avg) && (storeItem.data.qty<2*uk_avg))
							{barAttr.fill = colors[1];}
						if (storeItem.data.qty>=2*uk_avg)
							{barAttr.fill = colors[0];}
                        return barAttr;
                    },
                    label: {
                      field: 'qty'
                    },
                    xField: 'code',
                    yField: 'qty'
                }]
});

