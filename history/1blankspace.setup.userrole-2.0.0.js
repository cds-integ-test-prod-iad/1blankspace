/*!
 * ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed as Attribution-ShareAlike 4.0 International
 * http://creativecommons.org/licenses/by-sa/4.0/
 */
 
ns1blankspace.setup.userRole = 
{
	init: 		function (oParam)
				{
					ns1blankspace.app.reset();

					ns1blankspace.object = 22;
					ns1blankspace.objectParentName = 'setup';
					ns1blankspace.objectName = 'userRole';
					ns1blankspace.objectContextData = undefined;
					ns1blankspace.objectContext = -1;
					ns1blankspace.viewName = 'User Roles';

					ns1blankspace.app.set(oParam);
				},

	home: 		function (oParam, oResponse)
				{
					if (oResponse == undefined)
					{
						var aHTML = [];
									
						aHTML.push('<table class="ns1blankspaceMain">');
						aHTML.push('<tr class="ns1blankspaceMain">' +
										'<td id="ns1blankspaceMostLikely" class="ins1blankspaceMain">' +
										ns1blankspace.xhtml.loading +
										'</td>' +
										'</tr>');
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMain').html(aHTML.join(''));
						
						var aHTML = [];
						
						aHTML.push('<table>' +
							'<tr><td><div id="ns1blankspaceViewSetupUserLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>' +
							'</table>');	
						
						$('#ns1blankspaceControl').html(aHTML.join(''));
						
						$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'SETUP_ROLE_SEARCH';
						oSearch.addField('title');
						oSearch.rows = 50;
						oSearch.sort('title', 'asc');
						oSearch.getResults(function (data) {ns1blankspace.setup.userRole.home(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="ns1blankspaceMostLikely">' +
											'<tr><td class="ns1blankspaceNothing">Click New to create a user role.</td></tr>' +
											'</table>');
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceMostLikely">');
							aHTML.push('<tr><td class="ns1blankspaceCaption">MOST LIKELY</td></tr>');
							
							$.each(oResponse.data.rows, function()
							{	
								aHTML.push('<tr class="ns1blankspaceRow">');
								
								aHTML.push('<td id="ns1blankspaceMostLikely_title-' + this.id + 
												'" class="ns1blankspaceMostLikely">' +
												this.title + 
												'</td>');

								aHTML.push('</tr>');
							});
							
							aHTML.push('</table>');
						}
						
						$('#ns1blankspaceMostLikely').html(aHTML.join(''));
					
						$('td.ns1blankspaceMostLikely').click(function(event)
						{
							ns1blankspace.setup.userRole.search.send(event.target.id, {source: 1});
						});
					}
				},

	search: 	{
					send: 		function (sXHTMLElementID, oParam)
								{
									var aSearch = sXHTMLElementID.split('-');
									var sElementID = aSearch[0];
									var sSearchContext = aSearch[1];
									var iMinimumLength = 0;
									var iSource = ns1blankspace.data.searchSource.text;
									var sSearchText;
									var iMaximumColumns = 1;
									
									if (oParam != undefined)
									{
										if (oParam.source != undefined) {iSource = oParam.source}
										if (oParam.searchText != undefined) {sSearchText = oParam.searchText}
										if (oParam.rows != undefined) {iRows = oParam.rows}
										if (oParam.searchContext != undefined) {sSearchContext = oParam.searchContext}
										if (oParam.minimumLength != undefined) {iMinimumLength = oParam.minimumLength}
										if (oParam.maximumColumns != undefined) {iMaximumColumns = oParam.maximumColumns}
									}
										
									if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
									{
										$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
										
										ns1blankspace.objectContext = sSearchContext;
										
										var oSearch = new AdvancedSearch();
										oSearch.method = 'SETUP_ROLE_SEARCH';
										oSearch.addField('title,notes,modifieddate');
										oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContext);
										oSearch.getResults(function(data) {ns1blankspace.setup.userRole.show(data)});
									}
									else
									{	
										if (sSearchText == undefined)
										{
											sSearchText = $('#ns1blankspaceViewControlSearch').val();
										}	
										
										if (iSource == ns1blankspace.data.searchSource.browse)
										{
											iMinimumLength = 1;
											iMaximumColumns = 4;
											sSearchText = aSearch[1];
											if (sSearchText == '#') {sSearchText = '[0-9]'}
											sElementId = 'ns1blankspaceViewControlBrowse';
										}
										
										if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
										{	
											ns1blankspace.search.start();
											
											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_ROLE_SEARCH';
											oSearch.addField('title');
											
											if (iSource == ns1blankspace.data.searchSource.browse)
											{
												oSearch.addFilter('title', 'TEXT_STARTS_WITH', sSearchText);
											}
											else
											{	
												oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);
											}	
											
											ns1blankspace.search.advanced.addFilters(oSearch);

											oSearch.getResults(ns1blankspace.setup.userRole.search.process);
										}
									};	
								},

					process:	function (oResponse)
								{
									var iColumn = 0;
									var aHTML = [];
									var	iMaximumColumns = 1;
										
									ns1blankspace.search.stop();
										
									if (oResponse.data.rows.length == 0)
									{
										$(ns1blankspace.xhtml.searchContainer).html('<table class="ns1blankspaceSearchMedium"><tr><td class="ns1blankspaceSubNote">Nothing to show</td></tr></table>');
									}
									else
									{	
										aHTML.push('<table class="ns1blankspaceSearchMedium">');
										
										$.each(oResponse.data.rows, function()
										{	
											iColumn = iColumn + 1;
											
											if (iColumn == 1)
											{
												aHTML.push('<tr class="ns1blankspaceSearch">');
											}
											
											aHTML.push('<td class="ns1blankspaceSearch" id="' +
															'-' + this.id + '">' +
															this.title + '</td>');
											
											if (iColumn == iMaximumColumns)
											{
												aHTML.push('</tr>');
												iColumn = 0;
											}	
										});
								    	
										aHTML.push('</table>');

										$(ns1blankspace.xhtml.searchContainer).html(
											ns1blankspace.render.init(
											{
												html: aHTML.join(''),
												more: (oResponse.morerows == "true"),
												header: false
											}) 
										);	
										
										$('td.ns1blankspaceSearch').click(function(event)
										{
											$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
											$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions)
											ns1blankspace.setup.userRole.search.send(event.target.id, {source: 1});
										});

										ns1blankspace.render.bind(
										{
											columns: 'title',
											more: oResponse.moreid,
											startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
											functionSearch: ns1blankspace.setup.userRole.search.send
										});   
									}			
								}
				},

	layout:		function ()
				{
					var aHTML = [];

					aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
					
					aHTML.push('<table class="ns1blankspaceControl">');
					
					if (ns1blankspace.objectContext == -1)
					{
						aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
										'Details</td></tr>');		
					}
					else
					{
						aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
										'Summary</td></tr>');
									
						aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
										'Details</td></tr>');
													
						aHTML.push('</table>');
									
						aHTML.push('<table class="ns1blankspaceControl">');

						aHTML.push('<tr><td id="ns1blankspaceControlAccess" class="ns1blankspaceControl">' +
										'Access</td></tr>');
					}	

					aHTML.push('</table>');					
								
					$('#ns1blankspaceControl').html(aHTML.join(''));
					
					var aHTML = [];
				
					aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainAccess" class="ns1blankspaceControlMain"></div>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
						
					$('#ns1blankspaceControlSummary').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
						ns1blankspace.setup.userRole.summary();
					});
					
					$('#ns1blankspaceControlDetails').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
						ns1blankspace.setup.userRole.details();
					});
					
					$('#ns1blankspaceControlAccess').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainAccess'});
						ns1blankspace.setup.userRole.access.show();
					});
				},

	show:		function (oResponse)
				{
					ns1blankspace.app.clean();
					ns1blankspace.setup.userRole.layout();
					
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						ns1blankspace.objectContextData = undefined;
						
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this user role.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						ns1blankspace.objectContextData = oResponse.data.rows[0];
						
						$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.title);

						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
						
						ns1blankspace.history.view(
						{
							newDestination: 'ns1blankspace.setup.userRole.init({id: ' + ns1blankspace.objectContext + '})',
							move: false
						});
						
						ns1blankspace.history.control({functionDefault: 'ns1blankspace.setup.userRole.summary()'})
					}	
				},	
		
	summary:	function ()
				{
					var aHTML = [];
					
					if (ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td valign="top">Sorry can\'t find this user role.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						aHTML.push('<table class="ns1blankspaceMain">' +
									'<tr class="ns1blankspaceRow">' +
									'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Large"></td>' +
									'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2Action" style="width:100px;"></td>' +
									'</tr>' +
									'</table>');				
						
						$('#ns1blankspaceMainSummary').html(aHTML.join(''));	

						aHTML.push('<table>');
									
						if (ns1blankspace.objectContextData.notes != '')
						{				
							aHTML.push('<tr><td class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.notes +
										'</td></tr>');
						}	

						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Last Updated</td></tr>' +
										'<tr><td id="ns1blankspaceSummaryLastUpdated" class="ns1blankspaceSummary">' +
										Date.parse(ns1blankspace.objectContextData.modifieddate).toString("dd MMM yyyy") +
										'</td></tr>');	
						
						aHTML.push('</table>');					
						
						$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));
					}	
				},

	details:	function ()
				{
					var aHTML = [];

					if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
					{
						$('#ns1blankspaceMainDetails').attr('data-loading', '');
						
						aHTML.push('<table class="ns1blankspaceContainer">');
						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
										'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2"></td>' +
										'</tr>');
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainDetails').html(aHTML.join(''));
					
						var aHTML = [];
						
					
						aHTML.push('<table class="ns1blankspace">');
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Title' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsTitle" class="ns1blankspaceText">' +
										'</td></tr>');
					
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Notes' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceMultiText">' +
										'<textarea rows="10" cols="35" id="ns1blankspaceDetailsNotes" class="ns1blankspaceTextMultiSmall"></textarea>' +
										'</td></tr>');

						aHTML.push('</table>');					
						
						$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));

						$('#ns1blankspaceDetailsTitle').focus();
						
						if (ns1blankspace.objectContextData != undefined)
						{
							$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData.title);
							$('#ns1blankspaceDetailsNotes').val(ns1blankspace.objectContextData.notes);
						}
					}	
				},

	save: 		{
					send: 		function ()
								{
									ns1blankspace.status.working();

									var sData = '_=1';
									
									if (ns1blankspace.objectContext != -1)
									{
										sData += '&id=' + ns1blankspace.util.fs(ns1blankspace.objectContext);	
									}	
									
									if ($('#ns1blankspaceMainDetails').html() != '')
									{
										sData += '&title=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTitle').val());
										sData += '&notes=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsNotes').val());
									};

									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('SETUP_ROLE_MANAGE'),
										data: sData,
										dataType: 'json',
										success: this.process
									});		
								},

					process: 	function (oResponse)
								{	
									if (oResponse.status == 'OK')
									{
										ns1blankspace.status.message('Saved');
										ns1blankspace.inputDetected = false;
										if (ns1blankspace.objectContext == -1) {var bNew = true}
										ns1blankspace.objectContext = oResponse.id;	
										
										if (bNew) {ns1blankspace.setup.userRole.search.send('-' + ns1blankspace.objectContext)}
									}
									else
									{
										ns1blankspace.status.error(oResponse.error.errornotes);
									}
								}			
				},				

	access: 	{
					show: 		function(oParam, oResponse)
								{
									if (oResponse == undefined)
									{
										$vq.clear({queue: 'plan'});

										$vq.add('<table class="ns1blankspaceContainer">', {queue: 'access'});

										$vq.add('<tr class="ns1blankspaceContainer">' +
													'<td id="ns1blankspacePlanColumn1Container" class="ns1blankspaceColumn1Flexible">', {queue: 'access'});

											$vq.add('<table>', {queue: 'access'});

											$vq.add('<tr><td id="ns1blankspaceAccessColumnType">', {queue: 'access'});

											$vq.add('<div style="width:370px;"><div id="ns1blankspaceAccessType" style="margin-left:0px; margin-right:3px; margin-bottom:5px; width:350px; float:left;">' +
													'<input style="width: 100%;" type="radio" id="ns1blankspaceAccessType-method" name="radioAccessType" />' +
														'<label for="ns1blankspaceAccessType-method" style="width:80px; font-size:0.75em;">' +
														'Methods</label>' +
													'<input style="width: 100%;" type="radio" id="ns1blankspaceAccessType-parameter" name="radioAccessType" />' +
														'<label for="ns1blankspaceBAccessType-parameter" style="width:80px; font-size:0.75em;">' +
														'Parameters</label>' +	
													'</div>', {queue: 'access'});

											$vq.add('</td></tr>', {queue: 'access'})

											$vq.add('<tr><td id="ns1blankspaceAccessColumn1" class="ns1blankspaceColumn1Flexible">' +
														ns1blankspace.xhtml.loading + '</td></tr>', {queue: 'access'});

											$vq.add('</table>', {queue: 'access'});

										$vq.add('</td>', {queue: 'access'});	
														
										$vq.add('<td id="ns1blankspaceAccessColumn2" class="ns1blankspaceColumn2" style="width:275px;"></td>' +
														'</tr>', {queue: 'access'});

										$vq.add('</table>', {queue: 'plan'});					
										
										$vq.render('#ns1blankspaceMainAccess', {queue: 'plan'});

										$('#ns1blankspaceAccessType-' + sAccessType).attr('checked', true);

										$('#ns1blankspaceAccessType').buttonset();
															
										$('#ns1blankspaceAccessType :radio').click(function()
										{
											oParam = ns1blankspace.util.setParam(oParam, 'accountType', (this.id).split('-')[1]);
											ns1blankspace.financial.budget.plan.show(oParam);
										});

										/*
										var aHTML = [];
												
										aHTML.push('<table class="ns1blankspaceContainer">' +
														'<tr class="ns1blankspaceContainer">' +
														'<td id="ns1blankspaceAccessColumn1" class="ns1blankspaceColumn1Flexible">' +
														ns1blankspace.xhtml.loading + '</td>' +
														'<td id="ns1blankspaceAccessColumn2" class="ns1blankspaceColumn2" style="width:50px;"></td>' +
														'</tr>' + 
														'</table>');

										$('#ns1blankspaceMainAccess').html(aHTML.join(''));
										*/
										
										var aHTML = [];
											
										aHTML.push('<table class="ns1blankspaceColumn2">');
										
										aHTML.push('<tr><td>' +
														'<span id="ns1blankspaceUserRoleAccessEdit" class="ns1blankspaceAction">Edit</span>' +
														'</td></tr>');
														
										aHTML.push('</table>');					
										
										$('#ns1blankspaceAccessColumn2').html(aHTML.join(''));
									
										$('#ns1blankspaceUserRoleAccessEdit').button(
										{
											label: "Edit"
										})
										.click(function()
										{
											 ns1blankspace.setup.userRole.access.edit();
										})

										var oSearch = new AdvancedSearch();
										oSearch.method = 'SETUP_ROLE_METHOD_ACCESS_SEARCH';
										oSearch.addField('access,accesstext,accessmethod,accessmethodtext,canadd,canremove,canupdate,canuse');
										oSearch.addFilter('role', 'EQUAL_TO', ns1blankspace.objectContext);
										oSearch.rows = 500;
										oSearch.sort('accessmethodtext', 'asc');
										oSearch.getResults(function(data) {ns1blankspace.setup.userRole.access.show(oParam, data)});
									}
									else
									{
										var aHTML = [];
										
										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">No access set up.</td></tr></table>');

											aHTML.push('</table>');

											$('#ns1blankspaceAccessColumn1').html(aHTML.join(''));
										}
										else
										{		
											aHTML.push('<table id="ns1blankspaceUserRoleAccess" class="ns1blankspaceContainer" style="font-size:0.875em;">');
											
											aHTML.push('<tr class="ns1blankspaceCaption">');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Method</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Search</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Add</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Update</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Remove</td>');
											aHTML.push('</tr>');

											$.each(oResponse.data.rows, function()
											{
												aHTML.push(ns1blankspace.setup.userRole.access.row(this));
											});
												
											aHTML.push('</table>');
											
											ns1blankspace.render.page.show(
											{
												xhtmlElementID: 'ns1blankspaceAccessColumn1',
												xhtmlContext: 'UserRoleAccess',
												xhtml: aHTML.join(''),
												showMore: (oResponse.morerows == "true"),
												more: oResponse.moreid,
												rows: ns1blankspace.option.defaultRows,
												functionShowRow: ns1blankspace.setup.userRole.access.row,
												headerRow: true,
											});
										}
									}	

								},

					row:		function (oRow)
								{
									var aHTML = [];

									aHTML.push('<tr class="ns1blankspaceRow">');
									aHTML.push('<td id="ns1blankspaceUserRoleAccess_method-' + oRow.id + '" class="ns1blankspaceRow">' +
															oRow.accessmethodtext + '</td>');
									aHTML.push('<td id="ns1blankspaceUserRoleAccess_search-' + oRow.id + '" class="ns1blankspaceRow">' +
															oRow.canuse + '</td>');
									aHTML.push('<td id="ns1blankspaceUserRoleAccess_add-' + oRow.id + '" class="ns1blankspaceRow">' +
															(oRow.canuse=='N'?oRow.canadd:'-') + '</td>');
									aHTML.push('<td id="ns1blankspaceUserRoleAccess_update-' + oRow.id + '" class="ns1blankspaceRow">' +
															(oRow.canuse=='N'?oRow.canupdate:'-') + '</td>');
									aHTML.push('<td id="ns1blankspaceUserRoleAccess_remove-' + oRow.id + '" class="ns1blankspaceRow">' +
															(oRow.canuse=='N'?oRow.canremove:'-') + '</td>');

									aHTML.push('</tr>');

									return aHTML.join('');						
								},			

					edit: 		function (oParam, oResponse)
								{
									var iStep = 1;
									var iEndpoint;
									var oMethods;

									if (oParam != undefined)
									{
										if (oParam.step != undefined) {iStep = oParam.step}
										if (oParam.endpoint != undefined) {iEndpoint = oParam.endpoint}
										if (oParam.methods != undefined) {oMethods = oParam.methods}
									}
										
									if (iStep == 1)
									{
										var aHTML = [];
										
										aHTML.push('<table class="ns1blankspaceContainer">' +
														'<tr class="ns1blankspaceContainer">' +
														'<td id="ns1blankspaceAccessColumnEndpoint" class="ns1blankspaceColumn1" style="width:100px;padding-right:5px;font-size:0.875em;">' +
															ns1blankspace.xhtml.loading + '</td>' +
														'<td id="ns1blankspaceAccessColumnMethod" class="ns1blankspaceColumn2" style="width:200px;padding-right:5px;font-size:0.875em;"></td>' +
														'<td id="ns1blankspaceAccessColumnEdit" class="ns1blankspaceColumn2" style="width:280px;padding-right:15px;font-size:0.875em;"></td>' +
														'<td id="ns1blankspaceAccessColumnAction" class="ns1blankspaceColumn2"></td>' +
														'</tr>' + 
														'</table>');			
												
										$('#ns1blankspaceMainAccess').html(aHTML.join(''));

										if (oResponse == undefined)
										{
											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_ENDPOINT_SEARCH';
											oSearch.addField('title');
											oSearch.rows = 1000;
											oSearch.sort('title', 'asc');
											oSearch.getResults(function(data) {ns1blankspace.setup.userRole.access.edit(oParam, data)})	
										}
										else
										{
											var aHTML = [];
										
											ns1blankspace.endpoints = oResponse.data.rows;
									
											aHTML.push('<table id="ns1blankspaceUserAccessEndpoints">');
											
											if (oResponse.data.rows.length == 0)
											{
												aHTML.push('<tr><td class="ns1blankspaceNothing">' +
																'No access to endpoints has been setup.<br /><br / >You need to subscribe to at least one membership.</td></tr>');
											}
											else
											{		
												$(oResponse.data.rows).each(function()
												{
													aHTML.push('<tr class="ns1blankspaceRow">');
													
													aHTML.push('<td id="ns1blankspaceUserRoleEndpoint_title-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect"' +
																			' title="">' +
																			(this.title).toUpperCase() + '</td>');

													aHTML.push('</tr>');

												});
											}	
										
											aHTML.push('</table>');
												
											$('#ns1blankspaceAccessColumnEndpoint').html(aHTML.join(''));

											$('#ns1blankspaceUserAccessEndpoints td.ns1blankspaceRowSelect').click(function(event)
											{
												var sXHTMLElementId = event.target.id;
												var aID = sXHTMLElementId.split('-');
												
												ns1blankspace.setup.userRole.access.edit({endpoint: aID[1], step: 3});
											});
										}
									}	
									else if (iStep == 2)
									{
										if (oResponse == undefined)
										{
											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_METHOD_SEARCH';
											oSearch.addField('title,useavailable,addavailable,updateavailable,removeavailable');
											oSearch.addFilter('endpoint', 'EQUAL_TO', iEndpoint)
											oSearch.rows = 200;
											oSearch.sort('title', 'asc');
											oSearch.getResults(function(data) {ns1blankspace.setup.userRole.access.edit(oParam, data)})	
										}
										else
										{
											$.extend(true, oParam, {step: 3, methods: oResponse.data.rows});
											ins1blankspace.setup.userRole.access.edit(oParam);	
										}
									}

									else if (iStep == 3)
									{
										if (oResponse == undefined)
										{
											$('#ns1blankspaceAccessColumnMethod').html(ns1blankspace.xhtml.loadingSmall);
											$('#ns1blankspaceAccessColumnEdit').html("");

											var aHTML = [];
											
											aHTML.push('<table class="ns1blankspaceColumn2">' +
															'<tr><td><span id="ns1blankspaceUserAccessAdd" class="ns1blankspaceAction">' +
															'Add</span></td></tr>' +
															'</table>');									
											
											$('#ns1blankspaceAccessColumnAction').html(aHTML.join(''));
										
											$('#ns1blankspaceUserAccessAdd').button(
											{
												label: "Add"
											})
											.click(function()
											{
												$.extend(true, oParam, {step: 4, xhtmlElementID: ""});
												ns1blankspace.setup.userRole.access.edit(oParam);
											})

											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_METHOD_SEARCH';
											oSearch.addField('title,useavailable,addavailable,updateavailable,removeavailable');
											oSearch.addFilter('endpoint', 'EQUAL_TO', iEndpoint)
											oSearch.rows = 200;
											oSearch.sort('title', 'asc');
											oSearch.getResults(function(data) {ns1blankspace.setup.userRole.access.edit(oParam, data)})	
										}
										else
										{
											var aHTML = [];
									
											aHTML.push('<table id="ns1blankspaceUserAccessMethods" class="ns1blankspaceColumn2">');
										
											if (oResponse.data.rows.length == 0)
											{
												aHTML.push('<tr><td class="ns1blankspaceNothing">' +
																'No functional rights available.</td></tr>');
											}
											else
											{		
												$(oResponse.data.rows).each(function()
												{
													aHTML.push('<tr class="ns1blankspaceRow">');

													aHTML.push('<td id="ns1blankspaceUserAccessMethod_title-' + this.id +
																		'-' + this.addavailable +
																		'-' + this.removeavailable +
																		'-' + this.updateavailable +
																		'-' + this.useavailable +
																		'" class="ns1blankspaceRow ns1blankspaceRowSelect"' +
																		' title="">' +
																			this.title + '</td>');
											
													aHTML.push('</tr>');
												});
											
												aHTML.push('</table>');
											}
										
											$('#ns1blankspaceAccessColumnMethod').html(aHTML.join(''));

											$('#ns1blankspaceUserAccessMethods td.ns1blankspaceRowSelect').click(function()
											{
												$.extend(true, oParam, {step: 4, xhtmlElementID: this.id});
												ns1blankspace.setup.userRole.access.edit(oParam);
											})
										}
									}

									else if (iStep == 4)
									{
										var sXHTMLElementID;
										
										if (oParam != undefined)
										{
											if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
										}
										
										if (sXHTMLElementID != undefined)
										{
											var aXHTMLElementID = sXHTMLElementID.split('-');
										}	

										var oSearch = new AdvancedSearch();
										oSearch.method = 'SETUP_ROLE_METHOD_ACCESS_SEARCH';
										oSearch.addField('canadd,canremove,canupdate,canuse');
										oSearch.addFilter('role', 'EQUAL_TO', ns1blankspace.objectContext);
										oSearch.addFilter('accessmethod', 'EQUAL_TO', aXHTMLElementID[1]);

										oSearch.getResults(function(data) {
												$.extend(true, oParam, {step: 5});
												ns1blankspace.setup.userRole.access.edit(oParam, data)
												});
									}

									else if (iStep == 5)
									{
										var sID; 
										var sXHTMLElementID;
										var aXHTMLElementID;
										var aHTML = [];
										var h = -1;
										var bCan = false;

										if (oParam != undefined)
										{
											if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
										}
										
										if (sXHTMLElementID != undefined)
										{
											aXHTMLElementID = sXHTMLElementID.split('-');
										}	
									
										aHTML.push('<table id="ns1blankspaceUserAccessMethods" class="ns1blankspaceColumn2">');

										if (oResponse != undefined)
										{
											if (oResponse.data.rows.length > 0)
											{
												sID = oResponse.data.rows[0].id;
											}
											else
											{
												aHTML.push('<tr><td class="ns1blankspaceNothing">' +
																'This role doesn\'t have access to this method.  Click Save to add it.</td></tr>');
											}
										}

										if (aXHTMLElementID[5] == 'Y')
										{
											bCan = true;			
											aHTML.push('<tr><td class="ns1blankspaceCaption">' +
															'Search?' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceRadio">' +
															'<input type="radio" id="radioCanUseY" name="radioCanUse" value="Y"/>Yes' +
															'<br /><input type="radio" id="radioCanUseN" name="radioCanUse" value="N"/>No' +
															'</td></tr>');
										}

										if (aXHTMLElementID[2] == 'Y')
										{		
											bCan = true;	
											aHTML.push('<tr><td class="ns1blankspaceCaption">' +
															'Add?' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceRadio">' +
															'<input type="radio" id="radioCanAddY" name="radioCanAdd" value="Y"/>Yes' +
															'<br /><input type="radio" id="radioCanAddN" name="radioCanAdd" value="N"/>No' +
															'</td></tr>');
										}
											
										if (aXHTMLElementID[4] == 'Y')
										{	
											bCan = true;		
											aHTML.push('<tr><td class="ns1blankspaceCaption">' +
															'Update?' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceRadio">' +
															'<input type="radio" id="radioCanUpdateY" name="radioCanUpdate" value="Y"/>Yes' +
															'<br /><input type="radio" id="radioCanUpdateN" name="radioCanUpdate" value="N"/>No' +
															'</td></tr>');
										}
											
										if (aXHTMLElementID[3] == 'Y')
										{		
											bCan = true;	
											aHTML.push('<tr><td class="ns1blankspaceCaption">' +
															'Remove?' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceRadio">' +
															'<input type="radio" id="radioCanRemoveY" name="radioCanRemove" value="Y"/>Yes' +
															'<br /><input type="radio" id="radioCanRemoveN" name="radioCanRemove" value="N"/>No' +
															'</td></tr>');
										}
													
										if (!bCan)
										{
											aHTML.push('<tr><td class="ns1blankspaceNothing">' +
																'Can not set any access to this functionality.</td></tr>');

										}

										aHTML.push('</table>');					
										
										$('#ns1blankspaceAccessColumnEdit').html(aHTML.join(''));
										
										var aHTML = [];
										
										aHTML.push('<table class="ns1blankspace" style="font-size:0.875em">');
												
										aHTML.push('<tr><td>' +
														'<span style="width:70px;" id="ns1blankspaceUserAccessSave" class="ns1blankspaceAction">Save</span>' +
														'</td></tr>');
														
										aHTML.push('<tr><td>' +
														'<span style="width:70px;" id="ns1blankspaceUserAccessCancel" class="ns1blankspaceAction">Cancel</span>' +
														'</td></tr>');
																			
										aHTML.push('</table>');					
											
										$('#ns1blankspaceAccessColumnAction').html(aHTML.join(''));
										
										$('#ns1blankspaceUserAccessSave').button(
										{
											text: "Save"
										})
										.click(function() 
										{
											ns1blankspace.status.working();

											var sData = 'id=' + ns1blankspace.util.fs(sID);
											sData += '&role=' + ns1blankspace.util.fs(ns1blankspace.objectContext);
											sData += '&accessmethod=' + ns1blankspace.util.fs(aXHTMLElementID[1]);
											sData += '&canadd=' + (ns1blankspace.util.fs($('input[name="radioCanAdd"]:checked').val()) != '' ? ns1blankspace.util.fs($('input[name="radioCanAdd"]:checked').val()) : 'N');
											sData += '&canremove=' + (ns1blankspace.util.fs($('input[name="radioCanRemove"]:checked').val()) != '' ? ns1blankspace.util.fs($('input[name="radioCanRemove"]:checked').val()) : 'N');
											sData += '&canupdate=' + (ns1blankspace.util.fs($('input[name="radioCanUpdate"]:checked').val()) != '' ? ns1blankspace.util.fs($('input[name="radioCanUpdate"]:checked').val()) : 'N');
											sData += '&canuse=' + (ns1blankspace.util.fs($('input[name="radioCanUse"]:checked').val()) != '' ? ns1blankspace.util.fs($('input[name="radioCanUse"]:checked').val()) : 'N');

											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('SETUP_ROLE_METHOD_ACCESS_MANAGE'),
												data: sData,
												dataType: 'json',
												success: function(data)
												{
													if (data.status == "OK")
													{
														ns1blankspace.status.message('Saved');
													}
													else
													{
														ns1blankspace.status.error(data.error.errornotes);
													}
												}
											});
										});

										$('#ns1blankspaceUserAccessCancel').button(
										{
											text: "Cancel"
										})
										.click(function() 
										{
											$.extend(true, oParam, {step: 2});
											ins1blankspace.setup.userRole.access.edit(oParam);
										});

										if (oResponse.data.rows.length != 0)
										{
											var oObjectContext = oResponse.data.rows[0];
											
											$('[name="radioCanAdd"][value="' + oObjectContext.canadd + '"]').attr('checked', true);
											$('[name="radioCanRemove"][value="' + oObjectContext.canremove + '"]').attr('checked', true);
											$('[name="radioCanUpdate"][value="' + oObjectContext.canupdate + '"]').attr('checked', true);
											$('[name="radioCanUse"][value="' + oObjectContext.canuse + '"]').attr('checked', true);
										}
										else
										{
											$('[name="radioCanAdd"][value="Y"]').attr('checked', true);
											$('[name="radioCanRemove"][value="Y"]').attr('checked', true);
											$('[name="radioCanUpdate"][value="Y"]').attr('checked', true);
											$('[name="radioCanUse"][value="Y"]').attr('checked', true);
										}
									}
								}	
				}
}				