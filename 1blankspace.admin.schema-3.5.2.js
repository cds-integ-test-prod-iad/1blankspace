/*!
 * ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed as Attribution-ShareAlike 4.0 International
 * http://creativecommons.org/licenses/by-sa/4.0/
 */

 /* 
	Endpoints, methods & properties are the resources to manage the underlying objects and their instances
	Object properties are derived by the associated _SEARCH method and structure additions
 */

if (ns1blankspace.admin === undefined) {ns1blankspace.admin = {}}

ns1blankspace.admin.schema = 
{
	data: 	{lab: (window.location.host.indexOf('lab.ibcom.biz') != -1), superUser: false},

	init: 	function (oParam)
				{
					var bShowHome = true;
					
					if (oParam != undefined)
					{
						if (oParam.showHome != undefined) {bShowHome = oParam.showHome}
					}

					ns1blankspace.app.reset();

					ns1blankspace.objectParentName = 'admin';
					ns1blankspace.objectName = 'schema';
					ns1blankspace.viewName = 'Schema';

					ns1blankspace.admin.schema.data.superUser = ns1blankspace.user.super;

					ns1blankspace.app.set(oParam);
				},

	home:		function (oParam, oResponse)
				{
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
					$('#ns1blankspaceViewControlAction').button({disabled: false});
					$('#ns1blankspaceViewControlNew').button({disabled: true});
					
					var aHTML = [];
								
					aHTML.push('<table>');


					aHTML.push('<tr><td><span style="color: #b8b8b8; font-size: 2.6em; margin-top: 4px;" class="glyphicon glyphicon-book" aria-hidden="true"></span></td></tr>');

					aHTML.push('</table>');		
						
					aHTML.push('<table class="ns1blankspaceControl" style="padding-top:10px;">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Summary</td></tr>');

					aHTML.push('</table>');		
						
					aHTML.push('<table class="ns1blankspaceControl" style="padding-top:10px;">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlEndpoints" class="ns1blankspaceControl">' +
									'Endpoints</td></tr>');

					aHTML.push('<tr><td id="ns1blankspaceControlMethods" class="ns1blankspaceControl">' +
									'Methods</td></tr>');

					aHTML.push('<tr><td id="ns1blankspaceControlProperties" class="ns1blankspaceControl">' +
									'Properties</td></tr>');

					aHTML.push('</table>');		
						
					aHTML.push('<table class="ns1blankspaceControl" style="padding-top:10px;">');
				
					aHTML.push('<tr><td id="ns1blankspaceControlObjects" class="ns1blankspaceControl">' +
									'Objects</td></tr>');

					//if (ns1blankspace.user.super)
					//{}					

					aHTML.push('</table>');		
					
					$('#ns1blankspaceControl').html(aHTML.join(''));	
					
					var aHTML = [];
					
					aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainEndpoints" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainMethods" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainProperties" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainObjects" class="ns1blankspaceControlMain"></div>');

					$('#ns1blankspaceMain').html(aHTML.join(''));
					
					$('#ns1blankspaceControlSummary').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
						ns1blankspace.admin.schema.summary();
					});

					$('#ns1blankspaceControlEndpoints').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainEndpoints'});
						ns1blankspace.admin.schema.endpoints.show();
					});

					$('#ns1blankspaceControlMethods').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainMethods'});
						ns1blankspace.admin.schema.methods.show();
					});

					$('#ns1blankspaceControlProperties').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainProperties'});
						ns1blankspace.admin.schema.properties.show();
					});

					$('#ns1blankspaceControlObjects').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainObjects'});
						ns1blankspace.admin.schema.objects.show();
					});

					ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
					ns1blankspace.admin.schema.summary();
				},

	summary:	function ()
				{
					var aHTML = [];

					aHTML.push('<table class="ns1blankspaceMain">' +
								'<tr class="ns1blankspaceRow">' +
								'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
								'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:250px;"></td>' +
								'</tr>' +
								'</table>');				
					
					$('#ns1blankspaceMainSummary').html(aHTML.join(''));	

					var aHTML = [];

					aHTML.push('<table class="ns1blankspace">');

					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Endpoints</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryEndpoints" class="ns1blankspaceSummary">' +
									ns1blankspace.xhtml.loadingSmall +
									'</td></tr>');

					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Methods</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryMethods" class="ns1blankspaceSummary">' +
									ns1blankspace.xhtml.loadingSmall +
									'</td></tr>');

					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Properties</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryProperties" class="ns1blankspaceSummary">' +
									ns1blankspace.xhtml.loadingSmall +
									'</td></tr>');

					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Objects</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryObjects" class="ns1blankspaceSummary">' +
									ns1blankspace.xhtml.loadingSmall +
									'</td></tr>');

					aHTML.push('</table>');

					$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

					var aHTML = [];

					aHTML.push('<table class="ns1blankspaceColumn2">');

					aHTML.push('</table>')

					$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));

					ns1blankspace.admin.schema.endpoints.count();
					ns1blankspace.admin.schema.methods.count();
					ns1blankspace.admin.schema.properties.count();
					ns1blankspace.admin.schema.objects.count();
				}
}				

ns1blankspace.admin.schema.endpoints =
{
	data: 	{searchText: undefined},

	init: 	function (oParam, oResponse)
				{
					ns1blankspace.admin.schema.endpoints.show(oParam)
				},

	count: 	function (oParam, oResponse)
				{
					if (oResponse == undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_ENDPOINT_SEARCH';
						oSearch.addField('id');
						oSearch.addSummaryField('count(id) count');
						oSearch.rows = 1;
						oSearch.getResults(function(data) {ns1blankspace.admin.schema.endpoints.count(oParam, data)})	
					}
					else
					{
						$('#ns1blankspaceSummaryEndpoints').html(oResponse.summary.count);
					}	
				},	

	show:		function (oParam, oResponse)
				{
					var oSearchText = ns1blankspace.util.getParam(oParam, 'searchText');
					var sSearchText;

					if (oSearchText.exists)
					{
						sSearchText = oSearchText.value;
						ns1blankspace.admin.schema.endpoints.data.searchText = sSearchText;
					}
					else
					{	
						sSearchText = ns1blankspace.admin.schema.endpoints.data.searchText;
					}	

					if (oResponse == undefined)
					{	
						var aHTML = [];
	
						aHTML.push('<table class="ns1blankspaceContainer">' +
										'<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceAdminSchemaEndpointsColumn1"></td>' +
										'<td id="ns1blankspaceAdminSchemaEndpointsColumn2" style="width:115px;"></td>' +
										'</tr>' +
										'</table>');				
						
						$('#ns1blankspaceMainEndpoints').html(aHTML.join(''));

						$('#ns1blankspaceAdminSchemaEndpointsColumn1').html(ns1blankspace.xhtml.loading);

						ns1blankspace.admin.schema.endpoints.data.details = [];

						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_ENDPOINT_SEARCH';
						oSearch.addField('category,categorytext,title,type,typetext,notes');
					
						if (sSearchText != '')
						{
							oSearch.addBracket('(');

							oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('notes', 'TEXT_IS_LIKE', sSearchText);
							
							if (!_.isNaN(_.toNumber(sSearchText)))
							{
								oSearch.addOperator('or');
								oSearch.addFilter('id', 'EQUAL_TO', sSearchText);
							}

							oSearch.addBracket(')');
						}

						oSearch.rows = 999;
						oSearch.sort('title', 'asc');
						oSearch.getResults(function(data) {ns1blankspace.admin.schema.endpoints.show(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="ns1blankspaceAdminSchemaEndpoints">' +
											'<tr><td class="ns1blankspaceSub">No endpoints.</td></tr></table>');

							$('#ns1blankspaceAdminSchemaEndpointsColumn1').html(aHTML.join(''));
						}
						else
						{
							var aHTML = [];

							aHTML.push('<table id="ns1blankspaceAdminSchemaEndpoints" class="ns1blankspace">' +
										'<tr class="ns1blankspaceHeaderCaption">' +
										'<td class="ns1blankspaceHeaderCaption">Title</td>' +
										'<td class="ns1blankspaceHeaderCaption">Type</td>' +
										'<td class="ns1blankspaceHeaderCaption">Category</td>' +
										'<td class="ns1blankspaceHeaderCaption"></td>' +
										'</tr>');

							$(oResponse.data.rows).each(function() 
							{
								aHTML.push(ns1blankspace.admin.schema.endpoints.row(this));
							});
							
							aHTML.push('</table>');
						}

						ns1blankspace.render.page.show(
						{
							type: 'JSON',
							xhtmlElementID: 'ns1blankspaceAdminSchemaEndpointsColumn1',
							xhtmlContext: 'AdminSchemaEndpoints',
							xhtml: aHTML.join(''),
							showMore: (oResponse.morerows == "true"),
							more: oResponse.moreid,
							rows: 100,
							functionShowRow: ns1blankspace.admin.schema.endpoints.row,
							functionOpen: undefined,
							functionOnNewPage: ns1blankspace.admin.schema.endpoints.bind
						});

						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceColumn2">');

						aHTML.push('<tr><td class="ns1blankspaceText" style="padding-top:14px;">' +
												'<input id="ns1blankspaceAdminSchemaEndpointsSearchText" class="ns1blankspaceText" style="width:130px;">' +
												'</td></tr>');
																			
						aHTML.push('<tr><td style="padding-top:0px;">' +
										'<span id="ns1blankspaceAdminSchemaEndpointsSearch" class="ns1blankspaceAction">Search</span>');

						if (sSearchText != undefined)
						{	
							aHTML.push(' <span id="ns1blankspaceAdminSchemaEndpointsSearchClear" class="ns1blankspaceAction">Clear</span>');
						}

						aHTML.push('</td></tr>');

						aHTML.push('</table>');

						if ($('#ns1blankspaceAdminSchemaEndpointsColumn2 table').length == 0)
						{
							$('#ns1blankspaceAdminSchemaEndpointsColumn2').html(aHTML.join(''));
						}
						else
						{
							$('#ns1blankspaceAdminSchemaEndpointsColumn2 table').before(aHTML.join(''));
						}

						$('#ns1blankspaceAdminSchemaEndpointsSearch').button(
						{
							label: 'Search'
						})
						.click(function() 
						{
							oParam = ns1blankspace.util.setParam(oParam, 'searchText', $('#ns1blankspaceAdminSchemaEndpointsSearchText').val());
							ns1blankspace.admin.schema.endpoints.show(oParam);
						})
						.css('width', '65px');

						$('#ns1blankspaceAdminSchemaEndpointsSearchClear').button(
						{
							label: 'Clear'
						})
						.click(function() 
						{
							oParam = ns1blankspace.util.setParam(oParam, 'searchText', '');
							ns1blankspace.admin.schema.endpoints.show(oParam);
						})
						.css('width', '57px');

						$('#ns1blankspaceAdminSchemaEndpointsSearchText').keyup(function(e)
						{
							if (e.which === 13)
					    	{
					    		oParam = ns1blankspace.util.setParam(oParam, 'searchText', $('#ns1blankspaceAdminSchemaEndpointsSearchText').val())
					    		ns1blankspace.admin.schema.endpoints.show(oParam);
					    	}
						});				

						$('#ns1blankspaceAdminSchemaEndpointsSearchText').val(sSearchText);
					}
				},	

	row: 		function (oRow)	
				{
					var aHTML = [];

					ns1blankspace.admin.schema.endpoints.data.details.push(oRow);

					aHTML.push('<tr id="ns1blankspaceAdminSchemaEndpoints_container-' + oRow["id"] + '">');
					
					aHTML.push('<td id="ns1blankspaceAdminSchemaEndpoints_title-' + oRow["id"] + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
										oRow["title"] + '</td>');

				
					aHTML.push('<td id="ns1blankspaceAdminSchemaEndpoints_type-' + oRow["id"] + '" class="ns1blankspaceRow">' +
									oRow["typetext"] + '</td>');

					aHTML.push('<td id="ns1blankspaceAdminSchemaEndpoints_category-' + oRow["id"] + '" class="ns1blankspaceRow">' +
									oRow["categorytext"] + '</td>');

					if (ns1blankspace.user.super)
					{
						//edit
					}

					aHTML.push('</tr>');

					return aHTML.join('');
				},

	bind: 	function ()
				{
					$('.ns1blankspaceRowSelect:visible').click(function()
					{
						ns1blankspace.admin.schema.endpoints.details({xhtmlElementID: this.id})
					});	
				},

	details: 	
				function (oParam)
				{
					var sXHTMLElementID;
					var sKey;

					if (ns1blankspace.util.param(oParam, 'xhtmlElementID').exists)
					{
						sXHTMLElementID = ns1blankspace.util.param(oParam, 'xhtmlElementID').value
						sKey = ns1blankspace.util.param(oParam, 'xhtmlElementID', '-').values[1];
					}

					if ($('#ns1blankspaceAdminSchemaEndpoints_container_details-' + sKey).length != 0)
					{
						$('#ns1blankspaceAdminSchemaEndpoints_container_details-' + sKey).remove();
					}
					else
					{
						var sHTML = 'No details';

						var oDetail = $.grep(ns1blankspace.admin.schema.endpoints.data.details, function (a) {return a.id == sKey;})[0];

						if (oDetail)
						{
							sHTML = '<div class="ns1blankspaceSummaryCaption">ID</div><div>' + oDetail.id + '</div>';

							if (oDetail.notes != '')
							{
								sHTML = sHTML + '<div class="ns1blankspaceSummaryCaption">Notes</div><div>' + oDetail.notes + '</div>';
							}
							
							$('#ns1blankspaceAdminSchemaEndpoints_container-' + sKey).after('<tr id="ns1blankspaceAdminSchemaEndpoints_container_details-' + sKey + '">' +
								'<td colspan=3><div style="background-color: #F3F3F3; padding:8px; color:#444444; font-weight:100; font-size:0.875em;">' + sHTML + '</div></td></tr>');	
						}
					}
				}				
}

ns1blankspace.admin.schema.methods =
{
	data: 	{searchText: undefined},

	init: 	function (oParam, oResponse)
				{
					ns1blankspace.admin.monitoring.methods.show(oParam);
				},

	count: 	function (oParam, oResponse)
				{
					if (oResponse == undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_METHOD_SEARCH';
						oSearch.addField('id');
						oSearch.addSummaryField('count(id) count');
						oSearch.rows = 1;
						oSearch.getResults(function(data) {ns1blankspace.admin.schema.methods.count(oParam, data)})	
					}
					else
					{
						$('#ns1blankspaceSummaryMethods').html(oResponse.summary.count);
					}	
				},	
	
	show:		function (oParam, oResponse)
				{
					var oSearchText = ns1blankspace.util.getParam(oParam, 'searchText');
					var sSearchText;

					if (oSearchText.exists)
					{
						sSearchText = oSearchText.value;
						ns1blankspace.admin.schema.methods.data.searchText = sSearchText;
					}
					else
					{	
						sSearchText = ns1blankspace.admin.schema.methods.data.searchText;
					}	

					if (oResponse == undefined)
					{	
						var aHTML = [];
	
						aHTML.push('<table class="ns1blankspaceContainer">' +
										'<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceAdminSchemaMethodsColumn1"></td>' +
										'<td id="ns1blankspaceAdminSchemaMethodsColumn2" style="width:115px;"></td>' +
										'</tr>' +
										'</table>');				
						
						$('#ns1blankspaceMainMethods').html(aHTML.join(''));

						$('#ns1blankspaceAdminSchemaMethodsColumn1').html(ns1blankspace.xhtml.loading);

						ns1blankspace.admin.schema.methods.data.details = [];

						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_METHOD_SEARCH';
						oSearch.addField('addavailable,advancedsearchavailable,endpoint,endpointtext,id,notes,object,objecttext,removeavailable,title,unrestrictedaccess,unrestrictedloggedonaccess,updateavailable,useavailable');
					
						if (sSearchText != '')
						{
							oSearch.addBracket('(');

							oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('notes', 'TEXT_IS_LIKE', sSearchText);
							
							if (!_.isNaN(_.toNumber(sSearchText)))
							{
								oSearch.addOperator('or');
								oSearch.addFilter('id', 'EQUAL_TO', sSearchText);
							}

							oSearch.addBracket(')');
						}

						oSearch.rows = 20;
						oSearch.sort('title', 'asc');
						oSearch.getResults(function(data) {ns1blankspace.admin.schema.methods.show(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="ns1blankspaceAdminSchemaMethods">' +
											'<tr><td class="ns1blankspaceSub">No methods.</td></tr></table>');

							$('#ns1blankspaceAdminSchemaMethodsColumn1').html(aHTML.join(''));
						}
						else
						{
							var aHTML = [];

							aHTML.push('<table id="ns1blankspaceAdminSchemaMethods" class="ns1blankspace">' +
										'<tr class="ns1blankspaceHeaderCaption">' +
										'<td class="ns1blankspaceHeaderCaption">Title</td>' +
										'<td class="ns1blankspaceHeaderCaption">Endpoint</td>' +
										'</tr>');

							$(oResponse.data.rows).each(function() 
							{
								aHTML.push(ns1blankspace.admin.schema.methods.row(this));
							});
							
							aHTML.push('</table>');
						}

						ns1blankspace.render.page.show(
						{
							type: 'JSON',
							xhtmlElementID: 'ns1blankspaceAdminSchemaMethodsColumn1',
							xhtmlContext: 'AdminSchemaMethods',
							xhtml: aHTML.join(''),
							showMore: (oResponse.morerows == "true"),
							more: oResponse.moreid,
							rows: 100,
							functionShowRow: ns1blankspace.admin.schema.methods.row,
							functionOpen: undefined,
							functionOnNewPage: ns1blankspace.admin.schema.methods.bind
						});

						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceColumn2">');

						aHTML.push('<tr><td class="ns1blankspaceText" style="padding-top:14px;">' +
												'<input id="ns1blankspaceAdminSchemaMethodsSearchText" class="ns1blankspaceText" style="width:130px;">' +
												'</td></tr>');
																			
						aHTML.push('<tr><td style="padding-top:0px;">' +
										'<span id="ns1blankspaceAdminSchemaMethodsSearch" class="ns1blankspaceAction">Search</span>');

						if (sSearchText != undefined)
						{	
							aHTML.push(' <span id="ns1blankspaceAdminSchemaMethodsSearchClear" class="ns1blankspaceAction">Clear</span>');
						}

						aHTML.push('</td></tr>');

						aHTML.push('</table>');

						if ($('#ns1blankspaceAdminSchemaMethodsColumn2 table').length == 0)
						{
							$('#ns1blankspaceAdminSchemaMethodsColumn2').html(aHTML.join(''));
						}
						else
						{
							$('#ns1blankspaceAdminSchemaMethodsColumn2 table').before(aHTML.join(''));
						}

						$('#ns1blankspaceAdminSchemaMethodsSearch').button(
						{
							label: 'Search'
						})
						.click(function() 
						{
							oParam = ns1blankspace.util.setParam(oParam, 'searchText', $('#ns1blankspaceAdminSchemaMethodsSearchText').val());
							ns1blankspace.admin.schema.methods.show(oParam);
						})
						.css('width', '65px');

						$('#ns1blankspaceAdminSchemaMethodsSearchClear').button(
						{
							label: 'Clear'
						})
						.click(function() 
						{
							oParam = ns1blankspace.util.setParam(oParam, 'searchText', '');
							ns1blankspace.admin.schema.methods.show(oParam);
						})
						.css('width', '57px');

						$('#ns1blankspaceAdminSchemaMethodsSearchText').keyup(function(e)
						{
							if (e.which === 13)
					    	{
					    		oParam = ns1blankspace.util.setParam(oParam, 'searchText', $('#ns1blankspaceAdminSchemaMethodsSearchText').val())
					    		ns1blankspace.admin.schema.methods.show(oParam);
					    	}
						});				

						$('#ns1blankspaceAdminSchemaMethodsSearchText').val(sSearchText);
					}
				},	

	row: 		function (oRow)	
				{
					var aHTML = [];

					ns1blankspace.admin.schema.methods.data.details.push(oRow);

					aHTML.push('<tr id="ns1blankspaceAdminSchemaMethods_container-' + oRow["id"] + '">');
					
					aHTML.push('<td id="ns1blankspaceAdminSchemaMethods_title-' + oRow["id"] + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
										oRow["title"] + '</td>');

					aHTML.push('<td id="ns1blankspaceAdminSchemaMethods_endpoint-' + oRow["id"] + '" class="ns1blankspaceRow">' +
									oRow["endpointtext"] + '</td>');

					aHTML.push('</tr>');

					return aHTML.join('');
				},

	bind: 	function ()
				{
					$('.ns1blankspaceRowSelect:visible').click(function()
					{
						ns1blankspace.admin.schema.methods.details({xhtmlElementID: this.id})
					});		
				},

	details: 	
				function (oParam)
				{
					var sXHTMLElementID;
					var sKey;

					if (ns1blankspace.util.param(oParam, 'xhtmlElementID').exists)
					{
						sXHTMLElementID = ns1blankspace.util.param(oParam, 'xhtmlElementID').value
						sKey = ns1blankspace.util.param(oParam, 'xhtmlElementID', '-').values[1];
					}

					if ($('#ns1blankspaceAdminSchemaMethods_container_details-' + sKey).length != 0)
					{
						$('#ns1blankspaceAdminSchemaMethods_container_details-' + sKey).remove();
					}
					else
					{
						var sHTML = 'No details';

						var oDetail = $.grep(ns1blankspace.admin.schema.methods.data.details, function (a) {return a.id == sKey;})[0];

						if (oDetail)
						{
							sHTML = '<table class="table table-condensed">' +
										'<tr><td style="width:40%;">ID</td><td>' + oDetail.id + '</td></tr>' +
											'<tr><td>Unrestricted Access</td><td>' + oDetail.unrestrictedaccess + '</td></tr>' +
											'<tr><td>Unrestricted Access (Authenticated)</td><td>' + oDetail.unrestrictedloggedonaccess + '</div>' +
											'<tr><td>Can Be Used To Search</td><td>' + oDetail.useavailable + '</td></tr>' +
											'<tr><td>Can Be Used To Add</td><td>' + oDetail.addavailable + '</td></tr>' +
											'<tr><td>Can Be Used To Update</td><td>' + oDetail.updateavailable + '</td></tr>' +
											'<tr><td>Can Be Used To Remove</td><td>' + oDetail.removeavailable + '</td></tr>';

							if (oDetail.objecttext != '')
							{
								sHTML = sHTML + '<tr><td>Object</td><td>' + oDetail.objecttext + '</td></tr>';
							}

							if (oDetail.notes != '')
							{
								sHTML = sHTML + '<tr><td>Notes</td><td>' + oDetail.notes + '</td></tr>';
							}

							sHTML = sHTML + '</table>'
							
							$('#ns1blankspaceAdminSchemaMethods_container-' + sKey).after('<tr id="ns1blankspaceAdminSchemaMethods_container_details-' + sKey + '" style="font-size:0.875em;">' +
								'<td colspan=2><div style="background-color: #F3F3F3; padding:8px; color:#444444; font-weight:100; font-size:0.875em;">' + sHTML + '</div></td></tr>');	
						}
					}
				}						
}

ns1blankspace.admin.schema.properties =
{
	data: 	{searchText: undefined},

	init: 	function (oParam, oResponse)
				{
					ns1blankspace.admin.schema.properties.show(oParam);
				},

	count: 	function (oParam, oResponse)
				{
					if (oResponse == undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_METHOD_PROPERTY_SEARCH';
						oSearch.addField('id');
						oSearch.addSummaryField('count(id) count');
						oSearch.rows = 1;
						oSearch.getResults(function(data) {ns1blankspace.admin.schema.properties.count(oParam, data)})	
					}
					else
					{
						$('#ns1blankspaceSummaryProperties').html(oResponse.summary.count);
					}	
				},	
	
	show:		function (oParam, oResponse)
				{
					var oSearchText = ns1blankspace.util.getParam(oParam, 'searchText');
					var sSearchText;

					if (oSearchText.exists)
					{
						sSearchText = oSearchText.value;
						ns1blankspace.admin.schema.properties.data.searchText = sSearchText;
					}
					else
					{	
						sSearchText = ns1blankspace.admin.schema.properties.data.searchText;
					}	

					if (oResponse == undefined)
					{	
						var aHTML = [];
	
						aHTML.push('<table class="ns1blankspaceContainer">' +
										'<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceAdminSchemaPropertiesColumn1"></td>' +
										'<td id="ns1blankspaceAdminSchemaPropertiesColumn2" style="width:115px;"></td>' +
										'</tr>' +
										'</table>');				
						
						$('#ns1blankspaceMainProperties').html(aHTML.join(''));

						$('#ns1blankspaceAdminSchemaPropertiesColumn1').html(ns1blankspace.xhtml.loading);

						ns1blankspace.admin.schema.properties.data.details = [];

						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_METHOD_PROPERTY_SEARCH';
						oSearch.addField('datalength,datatype,datatypetext,mandatory,method,methodtext,name,notes,searchendpoint,searchmethod,searchrelatedproperty,title');
					
						if (sSearchText != '')
						{
							oSearch.addBracket('(');

							oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('name', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('notes', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('methodtext', 'TEXT_IS_LIKE', sSearchText);
							
							if (!_.isNaN(_.toNumber(sSearchText)))
							{
								oSearch.addOperator('or');
								oSearch.addFilter('id', 'EQUAL_TO', sSearchText);
							}

							oSearch.addBracket(')');
						}

						oSearch.rows = 20;
						oSearch.sort('title', 'asc');
						oSearch.getResults(function(data) {ns1blankspace.admin.schema.properties.show(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="ns1blankspaceAdminSchemaMethods">' +
											'<tr><td class="ns1blankspaceSub">No properties.</td></tr></table>');

							$('#ns1blankspaceAdminSchemaPropertiesColumn1').html(aHTML.join(''));
						}
						else
						{
							var aHTML = [];

							aHTML.push('<table id="ns1blankspaceAdminSchemaProperties" class="ns1blankspace">' +
										'<tr class="ns1blankspaceHeaderCaption">' +
										'<td class="ns1blankspaceHeaderCaption">Title</td>' +
										'<td class="ns1blankspaceHeaderCaption">Name</td>' +
										'<td class="ns1blankspaceHeaderCaption">Method</td>' +
										'<td class="ns1blankspaceHeaderCaption">Type</td>' +
										'</tr>');

							$(oResponse.data.rows).each(function() 
							{
								aHTML.push(ns1blankspace.admin.schema.properties.row(this));
							});
							
							aHTML.push('</table>');
						}

						ns1blankspace.render.page.show(
						{
							type: 'JSON',
							xhtmlElementID: 'ns1blankspaceAdminSchemaPropertiesColumn1',
							xhtmlContext: 'AdminSchemaProperties',
							xhtml: aHTML.join(''),
							showMore: (oResponse.morerows == "true"),
							more: oResponse.moreid,
							rows: 100,
							functionShowRow: ns1blankspace.admin.schema.properties.row,
							functionOpen: undefined,
							functionOnNewPage: ns1blankspace.admin.schema.properties.bind
						});

						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceColumn2">');

						aHTML.push('<tr><td class="ns1blankspaceText" style="padding-top:14px;">' +
												'<input id="ns1blankspaceAdminSchemaPropertiesSearchText" class="ns1blankspaceText" style="width:130px;">' +
												'</td></tr>');
																			
						aHTML.push('<tr><td style="padding-top:0px;">' +
										'<span id="ns1blankspaceAdminSchemaPropertiesSearch" class="ns1blankspaceAction">Search</span>');

						if (sSearchText != undefined)
						{	
							aHTML.push(' <span id="ns1blankspaceAdminSchemaPropertiesSearchClear" class="ns1blankspaceAction">Clear</span>');
						}

						aHTML.push('</td></tr>');

						aHTML.push('</table>');

						if ($('#ns1blankspaceAdminSchemaPropertiesColumn2 table').length == 0)
						{
							$('#ns1blankspaceAdminSchemaPropertiesColumn2').html(aHTML.join(''));
						}
						else
						{
							$('#ns1blankspaceAdminSchemaPropertiesColumn2 table').before(aHTML.join(''));
						}

						$('#ns1blankspaceAdminSchemaPropertiesSearch').button(
						{
							label: 'Search'
						})
						.click(function() 
						{
							oParam = ns1blankspace.util.setParam(oParam, 'searchText', $('#ns1blankspaceAdminSchemaPropertiesSearchText').val());
							ns1blankspace.admin.schema.properties.show(oParam);
						})
						.css('width', '65px');

						$('#ns1blankspaceAdminSchemaPropertiesSearchClear').button(
						{
							label: 'Clear'
						})
						.click(function() 
						{
							oParam = ns1blankspace.util.setParam(oParam, 'searchText', '');
							ns1blankspace.admin.schema.properties.show(oParam);
						})
						.css('width', '57px');

						$('#ns1blankspaceAdminSchemaPropertiesSearchText').keyup(function(e)
						{
							if (e.which === 13)
					    	{
					    		oParam = ns1blankspace.util.setParam(oParam, 'searchText', $('#ns1blankspaceAdminSchemaPropertiesSearchText').val())
					    		ns1blankspace.admin.schema.properties.show(oParam);
					    	}
						});				

						$('#ns1blankspaceAdminSchemaPropertiesSearchText').val(sSearchText);
					}
				},	

	row: 		function (oRow)	
				{
					var aHTML = [];

					ns1blankspace.admin.schema.properties.data.details.push(oRow);

					aHTML.push('<tr id="ns1blankspaceAdminSchemaProperties_container-' + oRow["id"] + '">');
					
					aHTML.push('<td id="ns1blankspaceAdminSchemaProperties_name-' + oRow["id"] + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
										oRow["name"].toLowerCase() + '</td>');

					aHTML.push('<td id="ns1blankspaceAdminSchemaProperties_title-' + oRow["id"] + '" class="ns1blankspaceRow">' +
										oRow["title"] + '</td>');

					aHTML.push('<td id="ns1blankspaceAdminSchemaProperties_method-' + oRow["id"] + '" class="ns1blankspaceRow">' +
									oRow["methodtext"] + '</td>');

					aHTML.push('<td id="ns1blankspaceAdminSchemaProperties_type-' + oRow["id"] + '" class="ns1blankspaceRow">' +
									oRow["datatypetext"] + '</td>');

					aHTML.push('</tr>');

					return aHTML.join('');
				},

	bind: 	function ()
				{
					$('.ns1blankspaceRowSelect:visible').click(function()
					{
						ns1blankspace.admin.schema.properties.details({xhtmlElementID: this.id})
					});		
				},

	details: 	
				function (oParam)
				{
					var sXHTMLElementID;
					var sKey;

					if (ns1blankspace.util.param(oParam, 'xhtmlElementID').exists)
					{
						sXHTMLElementID = ns1blankspace.util.param(oParam, 'xhtmlElementID').value
						sKey = ns1blankspace.util.param(oParam, 'xhtmlElementID', '-').values[1];
					}

					if ($('#ns1blankspaceAdminSchemaProperties_container_details-' + sKey).length != 0)
					{
						$('#ns1blankspaceAdminSchemaProperties_container_details-' + sKey).remove();
					}
					else
					{
						var sHTML = 'No details';

						var oDetail = $.grep(ns1blankspace.admin.schema.properties.data.details, function (a) {return a.id == sKey;})[0];

						if (oDetail)
						{
							sHTML = '<table class="table table-condensed">' +
										'<tr><td style="width:40%;">ID</td><td>' + oDetail.id + '</td></tr>' +
											'<tr><td>Mandatory</td><td>' + oDetail.mandatory + '</td></tr>';
											
							if (oDetail.searchendpoint != '')
							{
								sHTML = sHTML + '<tr><td>Search Endpoint</td><td>' + oDetail.searchendpoint + '</td></tr>';
							}

							if (oDetail.searchrelatedproperty != '')
							{
								sHTML = sHTML + '<tr><td>Search Related Property</td><td>' + oDetail.searchrelatedproperty + '</td></tr>';
							}

							if (oDetail.typetext != 'Text')
							{
								sHTML = sHTML + '<tr><td>Length</td><td>' + oDetail.datalength + '</td></tr>';
							}

							if (false && oDetail.notes != '')
							{
								sHTML = sHTML + '<tr><td>Notes</td><td>' + oDetail.notes + '</td></tr>';
							}

							sHTML = sHTML + '</table>'
							
							$('#ns1blankspaceAdminSchemaProperties_container-' + sKey).after('<tr id="ns1blankspaceAdminSchemaProperties_container_details-' + sKey + '" style="font-size:0.875em;">' +
								'<td colspan=4><div style="background-color: #F3F3F3; padding:8px; color:#444444; font-weight:100; font-size:0.875em;">' + sHTML + '</div></td></tr>');	
						}
					}
				}				
}

ns1blankspace.admin.schema.objects =
{
	data: 	{searchText: undefined},

	init: 	function (oParam, oResponse)
				{
					ns1blankspace.admin.schema.objects.show(oParam);
				},

	count: 	function (oParam, oResponse)
				{
					if (oResponse == undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_OBJECT_SEARCH';
						oSearch.addField('id');
						oSearch.addSummaryField('count(id) count');
						oSearch.rows = 1;
						oSearch.getResults(function(data) {ns1blankspace.admin.schema.objects.count(oParam, data)})	
					}
					else
					{
						$('#ns1blankspaceSummaryObjects').html(oResponse.summary.count);
					}	
				},	
	
	show:		function (oParam, oResponse)
				{
					var oSearchText = ns1blankspace.util.getParam(oParam, 'searchText');
					var sSearchText;

					if (oSearchText.exists)
					{
						sSearchText = oSearchText.value;
						ns1blankspace.admin.schema.objects.data.searchText = sSearchText;
					}
					else
					{	
						sSearchText = ns1blankspace.admin.schema.objects.data.searchText;
					}	

					if (oResponse == undefined)
					{	
						var aHTML = [];
	
						aHTML.push('<table class="ns1blankspaceContainer">' +
										'<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceAdminSchemaObjectsColumn1"></td>' +
										'<td id="ns1blankspaceAdminSchemaObjectsColumn2" style="width:115px;"></td>' +
										'</tr>' +
										'</table>');				
						
						$('#ns1blankspaceMainObjects').html(aHTML.join(''));

						$('#ns1blankspaceAdminSchemaObjectsColumn1').html(ns1blankspace.xhtml.loading);

						ns1blankspace.admin.schema.objects.data.details = [];

						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_OBJECT_SEARCH';
						oSearch.addField('categorytext,title,bulkavailable,advancedsearchmethod,defaulttextcolumn,parentobject,parentobjecttext,prefix,roleobjectaccessavailable,snapshotavailable,notes');
					
						if (sSearchText != '')
						{
							oSearch.addBracket('(');

							oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('notes', 'TEXT_IS_LIKE', sSearchText);
							
							if (!_.isNaN(_.toNumber(sSearchText)))
							{
								oSearch.addOperator('or');
								oSearch.addFilter('id', 'EQUAL_TO', sSearchText);
							}

							oSearch.addBracket(')');
						}

						oSearch.rows = 20;
						oSearch.sort('title', 'asc');
						oSearch.getResults(function(data) {ns1blankspace.admin.schema.objects.show(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="ns1blankspaceAdminSchemaObjects">' +
											'<tr><td class="ns1blankspaceSub">No objects.</td></tr></table>');

							$('#ns1blankspaceAdminSchemaObjectsColumn1').html(aHTML.join(''));
						}
						else
						{
							var aHTML = [];

							aHTML.push('<table id="ns1blankspaceAdminSchemaObjects" class="ns1blankspace">' +
										'<tr class="ns1blankspaceHeaderCaption">' +
										'<td class="ns1blankspaceHeaderCaption">Title</td>' +
										'<td class="ns1blankspaceHeaderCaption">Category</td>' +
										'</tr>');

							$(oResponse.data.rows).each(function() 
							{
								aHTML.push(ns1blankspace.admin.schema.objects.row(this));
							});
							
							aHTML.push('</table>');
						}

						ns1blankspace.render.page.show(
						{
							type: 'JSON',
							xhtmlElementID: 'ns1blankspaceAdminSchemaObjectsColumn1',
							xhtmlContext: 'AdminSchemaObjects',
							xhtml: aHTML.join(''),
							showMore: (oResponse.morerows == "true"),
							more: oResponse.moreid,
							rows: 100,
							functionShowRow: ns1blankspace.admin.schema.objects.row,
							functionOpen: undefined,
							functionOnNewPage: ns1blankspace.admin.schema.objects.bind
						});

						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceColumn2">');

						aHTML.push('<tr><td class="ns1blankspaceText" style="padding-top:14px;">' +
												'<input id="ns1blankspaceAdminSchemaObjectsSearchText" class="ns1blankspaceText" style="width:130px;">' +
												'</td></tr>');
																			
						aHTML.push('<tr><td style="padding-top:0px;">' +
										'<span id="ns1blankspaceAdminSchemaObjectsSearch" class="ns1blankspaceAction">Search</span>');

						if (sSearchText != undefined)
						{	
							aHTML.push(' <span id="ns1blankspaceAdminSchemaObjectsSearchClear" class="ns1blankspaceAction">Clear</span>');
						}

						aHTML.push('</td></tr>');

						aHTML.push('</table>');

						if ($('#ns1blankspaceAdminSchemaObjectsColumn2 table').length == 0)
						{
							$('#ns1blankspaceAdminSchemaObjectsColumn2').html(aHTML.join(''));
						}
						else
						{
							$('#ns1blankspaceAdminSchemaObjectsColumn2 table').before(aHTML.join(''));
						}

						$('#ns1blankspaceAdminSchemaObjectsSearch').button(
						{
							label: 'Search'
						})
						.click(function() 
						{
							oParam = ns1blankspace.util.setParam(oParam, 'searchText', $('#ns1blankspaceAdminSchemaObjectsSearchText').val());
							ns1blankspace.admin.schema.objects.show(oParam);
						})
						.css('width', '65px');

						$('#ns1blankspaceAdminSchemaObjectsSearchClear').button(
						{
							label: 'Clear'
						})
						.click(function() 
						{
							oParam = ns1blankspace.util.setParam(oParam, 'searchText', '');
							ns1blankspace.admin.schema.objects.show(oParam);
						})
						.css('width', '57px');

						$('#ns1blankspaceAdminSchemaObjectsSearchText').keyup(function(e)
						{
							if (e.which === 13)
					    	{
					    		oParam = ns1blankspace.util.setParam(oParam, 'searchText', $('#ns1blankspaceAdminSchemaObjectsSearchText').val())
					    		ns1blankspace.admin.schema.objects.show(oParam);
					    	}
						});				

						$('#ns1blankspaceAdminSchemaObjectsSearchText').val(sSearchText);
					}
				},	

	row: 		function (oRow)	
				{
					var aHTML = [];

					ns1blankspace.admin.schema.objects.data.details.push(oRow);

					aHTML.push('<tr id="ns1blankspaceAdminSchemaObjects_container-' + oRow["id"] + '">');
					
					aHTML.push('<td id="ns1blankspaceAdminSchemaObjects_title-' + oRow["id"] + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
										oRow["title"].toLowerCase() + '</td>');

					aHTML.push('<td id="ns1blankspaceAdminSchemaObjects_category-' + oRow["id"] + '" class="ns1blankspaceRow">' +
										oRow["categorytext"] + '</td>');

					aHTML.push('</tr>');

					return aHTML.join('');
				},

	bind: 	function ()
				{
					$('.ns1blankspaceRowSelect:visible').click(function()
					{
						ns1blankspace.admin.schema.objects.details({xhtmlElementID: this.id})
					});		
				},

	details: 	
				function (oParam)
				{
					var sXHTMLElementID;
					var sKey;

					if (ns1blankspace.util.param(oParam, 'xhtmlElementID').exists)
					{
						sXHTMLElementID = ns1blankspace.util.param(oParam, 'xhtmlElementID').value
						sKey = ns1blankspace.util.param(oParam, 'xhtmlElementID', '-').values[1];
					}

					if ($('#ns1blankspaceAdminSchemaObjects_container_details-' + sKey).length != 0)
					{
						$('#ns1blankspaceAdminSchemaObjects_container_details-' + sKey).remove();
					}
					else
					{
						var sHTML = 'No details';

						var oDetail = $.grep(ns1blankspace.admin.schema.objects.data.details, function (a) {return a.id == sKey;})[0];

						if (oDetail)
						{
							sHTML = '<table class="table table-condensed">' +
										'<tr><td style="width:40%;">ID</td><td>' + oDetail.id + '</td></tr>' +
										'<tr><td>Prefix</td><td>' + oDetail.prefix + '</td></tr>' +
										'<tr><td>Category</td><td>' + oDetail.categorytext + '</td></tr>' +
										'<tr><td>Bulk Update Available</td><td>' + oDetail.bulkavailable + '</td></tr>' +
										'<tr><td>Snapshot Available</td><td>' + oDetail.snapshotavailable + '</td></tr>' +
										'<tr><td>Role Based Access Available</td><td>' + oDetail.roleobjectaccessavailable + '</td></tr>' +
										'<tr><td>Default Reference Property</td><td>' + oDetail.defaulttextcolumn + '</td></tr>';

											
							if (oDetail.advancedsearchmethod != '')
							{
								sHTML = sHTML + '<tr><td>Search Endpoint</td><td>' + oDetail.advancedsearchmethod + '</td></tr>';
							}

							if (oDetail.parentobjecttext != '')
							{
								sHTML = sHTML + '<tr><td>Parent</td><td>' + oDetail.parentobjecttext + '</td></tr>';
							}

							if (oDetail.notes != '')
							{
								sHTML = sHTML + '<tr><td>Notes</td><td>' + oDetail.notes + '</td></tr>';
							}

							sHTML = sHTML + '</table>'
							
							$('#ns1blankspaceAdminSchemaObjects_container-' + sKey).after('<tr id="ns1blankspaceAdminSchemaObjects_container_details-' + sKey + '" style="font-size:0.875em;">' +
								'<td colspan=4><div style="background-color: #F3F3F3; padding:8px; color:#444444; font-weight:100; font-size:0.875em;">' + sHTML + '</div></td></tr>');	
						}
					}
				}				
}