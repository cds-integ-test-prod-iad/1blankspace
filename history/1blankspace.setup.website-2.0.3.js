/*!
 * ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed as Attribution-ShareAlike 4.0 International
 * http://creativecommons.org/licenses/by-sa/4.0/
 */
 
ns1blankspace.setup.website = 
{
	data: 		{},

	init: 		function (oParam)
				{
					ns1blankspace.app.reset();

					ns1blankspace.object = 40;
					ns1blankspace.objectParentName = 'setup';
					ns1blankspace.objectName = 'website';
					ns1blankspace.viewName = 'Websites & Webapps';
					ns1blankspace.viewOptionsBind = ns1blankspace.setup.website.bind;
					
					ns1blankspace.app.set(oParam);
				},

	bind:		function ()
				{
					$('#ns1blankspaceControlActionOptionsRemove').click(function(event)
					{
						ns1blankspace.setup.website.remove();
					});
				},

	new:   		function ()
				{
					ns1blankspace.show({selector: '#ns1blankspaceMain'});
					ns1blankspace.setup.website.siteTemplate.init();
				},

	siteTemplate: 
				{
					init: 	function (oParam)
							{
								ns1blankspace.status.working();

								if (ns1blankspace.setup.website.data.templates == undefined)
								{
									$.ajax(
									{
										type: 'GET',
										url: '/jscripts/1blankspace.setup.website-2.0.0.json',
										dataType: 'json',
										global: false,
										success: function(data)
										{
											ns1blankspace.setup.website.data.templates = data.templates;
											ns1blankspace.setup.website.siteTemplate.show(oParam);
										},
										error: function(data)
										{
											ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
											ns1blankspace.setup.website.details()
										}
									});
								}
								else
								{
									ns1blankspace.setup.website.siteTemplate.show(oParam);
								}

								ns1blankspace.status.clear();
							},

					show: 	function(oParam)
							{
								var aHTML = [];

								aHTML.push('<table class="ns1blankspaceMain" id="ns1blankspaceNewTemplates">');
		
								aHTML.push('<tr><td class="ns1blankspaceCaption">SELECT A TEMPLATE</td></tr>')
								

								$.each(ns1blankspace.setup.website.data.templates, function (i, template)
								{
									aHTML.push('<tr><td id="ns1blankspaceNewTemplate-' + template.name + '" class="ns1blankspaceMostLikely">' + template.data.title + '</td></tr>')
								});

								aHTML.push('</table>');

								$('#ns1blankspaceMain').html(aHTML.join(''));

								$('#ns1blankspaceNewTemplates td.ns1blankspaceMostLikely').click(function(event)
								{
									var oTemplateDefault = $.grep(ns1blankspace.setup.website.data.templates, function(a) {return a.name == 'default'});
									var sName = (this.id).split('-')[1]
									var oTemplate = $.grep(ns1blankspace.setup.website.data.templates, function(a) {return a.name == sName});
									var oParam = {data: $.extend(true, oTemplateDefault[0].data, oTemplate[0].data)};

									for (var key in oParam.data)
							  		{
							     		if (oParam.data.hasOwnProperty(key))
							     		{
							     			oParam.data[key] = oParam.data[key].formatXHTML()
							     		}
							     	}

									ns1blankspace.setup.website.save.send(oParam);
								});
							}
				},				

	home:		function (oParam, oResponse)
				{
					if (oResponse == undefined)
					{
						$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);

						var aHTML = [];
			
						aHTML.push('<table class="ns1blankspaceMain">' + 
										'<tr class="ns1blankspaceMain">' +
										'<td id="ns1blankspaceMostLikely">' +
										ns1blankspace.xhtml.loading + '</td>' +
										'<td id="ns1blankspaceHomeAction" style="width:270px;"></td>' +
										'</tr></table>');					
						
						$('#ns1blankspaceMain').html(aHTML.join(''));
											
						var aHTML = [];

						aHTML.push('<table>' +
							'<tr><td><div id="ns1blankspaceViewSetupWebsiteLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>' +
							'</table>');			
						
						$('#ns1blankspaceControl').html(aHTML.join(''));	
						
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2">');
						
						aHTML.push('<tr><td style="width:200px; font-size:0.875em;" >' +
										'<a href="/site/1262/mydigitalspace_attachment_loader.zip"' +
										' id="ns1blankspaceAttachmentUploader">Get the file attachment uploader<br />for Windows</a>' +
										'</td></tr>');	
														
						aHTML.push('</td></tr></table>');					

						$('#ns1blankspaceHomeAction').html(aHTML.join(''));	
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'SETUP_SITE_SEARCH';
						oSearch.addField('title,reference');
						oSearch.sort('title', 'asc');
						oSearch.rows = 50;
						
						oSearch.getResults(function(oResponse)
						{
							ns1blankspace.setup.website.home(oParam, oResponse)
						});
					}
					else
					{
						var aHTML = [];

						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table>' +
											'<tr><td class="ns1blankspaceNothing">Click New to create a website.</td></tr>' +
											'</table>');
						}
						else
						{
						
							aHTML.push('<table style="padding-right:20px;">');
							
							$.each(oResponse.data.rows, function(r, row)
							{	
								aHTML.push('<tr class="ns1blankspaceRow">');
								
								aHTML.push('<td id="ns1blankspaceSetupWebsiteMostLikely_title-' + row.id + 
												'" class="ns1blankspaceMostLikely ns1blankspaceRow" style="border-color:#F5F5F5; padding:6px;">' +
												row.title +
												'</td>');

								aHTML.push('<td id="ns1blankspaceSetupWebsiteMostLikely_title-' + row.id + 
												'" class="ns1blankspaceSubNote  ns1blankspaceRow" style="text-align:right; font-size:0.75em; font-weight:100; border-color:#F5F5F5; padding:6px;">' +
												row.id +
												'</td>');
								
								aHTML.push('</tr>');
							});
							
							aHTML.push('</table>');
						}
						
						$('#ns1blankspaceMostLikely').html(aHTML.join(''));
					
						$('td.ns1blankspaceMostLikely').click(function(event)
						{
							ns1blankspace.setup.website.search.send(event.target.id, {source: 1});
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
									var iRows = 10;
									
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
										oSearch.method = 'SETUP_SITE_SEARCH';
										oSearch.addField('bodytag,cancreatespace,columns,cssattachment,cssattachmenttext,default,developeremail,documenttype,email,' +
															'footerheight,footerscript,headerheight,headerscript,headertitle,hidestandardlinks,layout,layouttext,ondemandstatus,ondemandstatustext,' +
															'reference,status,statustext,templatedocument,templatedocumenttext,title,usekeywordsastitle');
										oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContext);
										oSearch.rows = 1;
										
										oSearch.getResults(function(oResponse)
										{
											ns1blankspace.setup.website.show(oParam, oResponse)
										});

										/*
										$.ajax(
										{
											type: 'GET',
											url: ns1blankspace.util.endpointURI('SETUP_SITE_SEARCH'),
											data: 'id=' + ns1blankspace.objectContext,
											dataType: 'json',
											success: function(data) {ns1blankspace.setup.website.show(oParam, data)}
										});
*/
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
											
											$.ajax(
											{
												type: 'GET',
												url: ns1blankspace.util.endpointURI('SETUP_SITE_SEARCH'),
												data: 'quicksearch=' + sSearchText,
												dataType: 'json',
												success: function(data) {ns1blankspace.setup.website.search.process(oParam, data)}
											});
										}
									};	
								},

					process:	function (oParam, oResponse)
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
											
											aHTML.push('<td class="ns1blankspaceSearch" id="title' +
															'-' + this.id + '">' +
															this.title + '</td>');
											
											if (iColumn == iMaximumColumns)
											{
												aHTML.push('</tr>');
												iColumn = 0;
											}	
										});
								    	
										aHTML.push('</table>');

										$(ns1blankspace.xhtml.searchContainer).html(aHTML.join(''));
										
										$('td.ns1blankspaceSearch').click(function(event)
										{
											$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
											$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions);
											ns1blankspace.setup.website.search.send(event.target.id, {source: 1});
										});
									}			
								}
				},				

	layout: 	function ()
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

						aHTML.push('<tr><td id="ns1blankspaceControlLayout" class="ns1blankspaceControl">' +
										'Layout</td></tr>');

						aHTML.push('<tr><td>&nbsp;</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
										'Attachments</td></tr>');

						aHTML.push('<tr><td>&nbsp;</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlPages" class="ns1blankspaceControl">' +
										'Pages</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlForms" class="ns1blankspaceControl">' +
										'Forms</td></tr>');

						aHTML.push('<tr><td>&nbsp;</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlScripts" class="ns1blankspaceControl">' +
										'Scripts</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlAdvanced" class="ns1blankspaceControl">' +
										'Advanced</td></tr>');

						aHTML.push('<tr><td>&nbsp;</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlURLs" class="ns1blankspaceControl">' +
										'URLs</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlHTTPHeaders" class="ns1blankspaceControl">' +
										'Headers</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlRedirects" class="ns1blankspaceControl">' +
										'Redirects</td></tr>');
					}	

					aHTML.push('</table>');					
								
					$('#ns1blankspaceControl').html(aHTML.join(''));

					var aHTML = [];
					
					aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainLayout" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainAddAttachment" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainPages" class="ns1blankspaceControlMain"></div>');	
					aHTML.push('<div id="ns1blankspaceMainAdvanced" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainScripts" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainURLs" class="ns1blankspaceControlMain"></div>');	
					aHTML.push('<div id="ns1blankspaceMainWebapp" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainForms" class="ns1blankspaceControlMain"></div>');	
					aHTML.push('<div id="ns1blankspaceMainHTTPHeaders" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainRedirects" class="ns1blankspaceControlMain"></div>');			
						
					$('#ns1blankspaceMain').html(aHTML.join(''));
						
					$('#ns1blankspaceControlSummary').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
						ns1blankspace.setup.website.summary();
					});
					
					$('#ns1blankspaceControlDetails').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
						ns1blankspace.setup.website.details();
					});
					
					$('#ns1blankspaceControlLayout').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainLayout'});
						ns1blankspace.setup.website.style();
					});
						
					$('#ns1blankspaceControlAttachments').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainAttachments'});
						ns1blankspace.attachments.show(
						{
							xhtmlElementID: 'ns1blankspaceMainAttachments',
							label: 'Select the file attachment:',
							maxFiles: 1,
							helpNotes: 'If you upload a file with the same name as an existing attachment it will automatically be replaced.'
						});
					});

					$('#ns1blankspaceControlPages').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainPages', context: {inContext: false}});
						ns1blankspace.setup.website.css.getURI();  //after getting custom css it calls pages.show()
					});

					$('#ns1blankspaceControlForms').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainForms', context: {inContext: false}});
						ns1blankspace.setup.website.forms();
					});
					
					$('#ns1blankspaceControlAddAttachment').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainAddAttachment', context: {inContext: false}});
						ns1blankspace.setup.website.attachment.add();
					});
					
					$('#ns1blankspaceControlAdvanced').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainAdvanced'});
						ns1blankspace.setup.website.advanced();
					});
					
					$('#ns1blankspaceControlScripts').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainScripts'});
						ns1blankspace.setup.website.scripts();
					});

					$('#ns1blankspaceControlURLs').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainURLs', context: {inContext: false}});
						ns1blankspace.setup.website.urls.show();
					});

					$('#ns1blankspaceControlHTTPHeaders').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainHTTPHeaders', context: {inContext: false}});
						ns1blankspace.setup.website.httpHeaders.show();
					});

					$('#ns1blankspaceControlRedirects').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainRedirects', context: {inContext: false}});
						ns1blankspace.setup.website.redirects.show();
					});
				},

	show: 		function (oParam, oResponse)
				{
					ns1blankspace.app.clean();
					ns1blankspace.setup.website.layout();
					
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						ns1blankspace.objectContextData = undefined;
						
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this website.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						ns1blankspace.objectContextData = oResponse.data.rows[0];

						if (ns1blankspace.objectContextData.cssattachment == -1) {ns1blankspace.objectContextData.cssattachment = ''} 
						
						$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.title);

						$('#ns1blankspaceControlContext').html(
							ns1blankspace.objectContextData.title +
							'<br /><span id="ns1blankspaceControlContext_id" class="ns1blankspaceSub" style="padding-top:6px;">' + ns1blankspace.objectContextData.id + '</span>');

						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});

						ns1blankspace.history.view(
						{
							newDestination: 'ns1blankspace.setup.website.init({id: ' + ns1blankspace.objectContext + '})',
							move: false
						});
						
						ns1blankspace.history.control({functionDefault: 'ns1blankspace.setup.website.summary()'});
					}	
				},
		
	summary:	function ()
				{
					var aHTML = [];
					
					if (ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td valign="top">Sorry can\'t find this website.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						aHTML.push('<table class="ns1blankspaceMain">' +
									'<tr class="ns1blankspaceRow">' +
									'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:300px;"></td>' +
									'</tr>' +
									'</table>');				
						
						$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
					
						var aHTML = [];
					
						aHTML.push('<table>');

						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Site ID</td></tr>' +
										'<tr><td id="ns1blankspaceSummarySiteID" class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.id +
										'</td></tr>');
				
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Status</td></tr>' +
										'<tr><td id="ns1blankspaceSummarySiteStatus" class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.statustext +
										'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Attachments URL</td></tr>' +
										'<tr><td id="ns1blankspaceSummarySiteAttachmentsURL" class="ns1blankspaceSummary">' +
										'/site/' + ns1blankspace.objectContextData.id + '/' +
										'</td></tr>');

						if (ns1blankspace.objectContextData.ondemandstatustext == '')
						{
							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">App Status</td></tr>' +
										'<tr><td class="interfaceMainSummary">' +
										'Not Enabled (click Advanced to enable requests to the site)' +
										'</td></tr>');

						}
						else
						{
							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">App Status</td></tr>' +
										'<tr><td class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.ondemandstatustext +
										'</td></tr>');
						}			

						aHTML.push('</table>');					
						
						$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

						var aHTML = [];
											
						aHTML.push('<table class="ns1blankspaceColumn2">');
																
						if (ns1blankspace.objectContextData.primaryurl != undefined)
						{
							aHTML.push('<tr><td class="ns1blankspaceSummaryColumn2Action" style="width:175px; padding-top:10px;">' +
										'<a href="' + ns1blankspace.objectContextData.primaryurl + '" target="_blank">' + ns1blankspace.objectContextData.primaryurl + '</a>' +
										'<br /><hr /><br />' +
										'</td></tr>');
						}		
									
						aHTML.push('<tr><td class="ns1blankspaceSub" style="font-size:0.75em;">' +
										'Use the Attachments link to add your resources (scripts, documents, images etc) and update the Scripts section to reference any added js scripts or any other scripts your app may require.' +
										'</td>' +
										'</tr>');			
									
						aHTML.push('</table>');					
						
						$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));
										
						$('#ns1blankspaceSummarySetupWebApp').click(function() 
						{
							ns1blankspace.show({selector: '#ns1blankspaceMainWebapp'});
							ns1blankspace.setup.website.webapp();
						});
					}	
				},

	details: 	function ()
				{
					var aHTML = [];
					
					if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
					{
						$('#ns1blankspaceMainDetails').attr('data-loading', '');
						
						aHTML.push('<table class="ns1blankspaceContainer">' +
										'<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
										'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2"></td>' +
										'</tr>' + 
										'</table>');					
						
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
										'Email (optional)' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsEmail" class="ns1blankspaceText">' +
										'</td></tr>');
							
						aHTML.push('</table>');					
						
						$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
						
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2">');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Status' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRadio">' +
										'<input type="radio" id="radioStatus2" name="radioStatus" value="2"/>Open' +
										'<br /><input type="radio" id="radioStatus1" name="radioStatus" value="1"/>Closed' +
										'</td></tr>');
	
						aHTML.push('</table>');					
						
						$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));
						
						if (ns1blankspace.objectContextData != undefined)
						{
							$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData.title);
							$('#ns1blankspaceDetailsEmail').val(ns1blankspace.objectContextData.email);
							$('[name="radioStatus"][value="' + ns1blankspace.objectContextData.status + '"]').attr('checked', true);
						}
						else
						{
							$('[name="radioStatus"][value="2"]').attr('checked', true);	
						}
					}	
				},

	style:		function ()
				{
					var aHTML = [];
					
					if ($('#ns1blankspaceMainLayout').attr('data-loading') == '1')
					{
						$('#ns1blankspaceMainLayout').attr('data-loading', '');
						
						aHTML.push('<table class="ns1blankspaceContainer">' +
										'<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceLayoutColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
										'<td id="ns1blankspaceLayoutColumn2" class="ns1blankspaceColumn2" style="width:200px;"></td>' +
										'</tr>' + 
										'</table>');					
						
						$('#ns1blankspaceMainLayout').html(aHTML.join(''));

						var aHTML = [];

						aHTML.push('<table class="ns1blankspace">');
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Style' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRadio">' +
										'<input type="radio" id="radioLayout3" name="radioLayout" value="3"/>None (Use CSS/Divs)' +
										'<br /><input type="radio" id="radioLayout2" name="radioLayout" value="2"/>Using Tables' +
										'<br /><input type="radio" id="radioLayout1" name="radioLayout" value="1"/>Using Frames' +
										'</td></tr>');			
							
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'CSS Attachment' +
										'</td></tr>' +
										'<tr class="ns1blankspaceRadio">' +
										'<td id="ns1blankspaceDetailsCSSAttachment" class="ns1blankspaceRadio">' +
											'<span id="ns1blankspaceSetupWebsiteCSSContainer">' +
											ns1blankspace.xhtml.loadingSmall + '</span>');
						
						aHTML.push('</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Default Template' +
										'</td></tr>' +
										'<tr class="ns1blankspaceRadio">' +
										'<td id="ns1blankspaceDetailsCSSAttachment" class="ns1blankspaceRadio">' +
											'<span id="ns1blankspaceSetupWebsiteTemplateContainer">' +
											ns1blankspace.xhtml.loadingSmall + '</span>');
						
						aHTML.push('</td></tr>');					
										
						aHTML.push('</table>');					
						
						$('#ns1blankspaceLayoutColumn1').html(aHTML.join(''));
						
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2">');
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Header Height' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceLayoutHeaderHeight" class="ns1blankspaceText">' +
										'</td></tr>');		

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Footer Height' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceLayoutFooterHeight" class="ns1blankspaceText">' +
										'</td></tr>');		

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Columns' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceLayoutColumns" class="ns1blankspaceText">' +
										'</td></tr>');		
						
						aHTML.push('</table>');					
						
						$('#ns1blankspaceLayoutColumn2').html(aHTML.join(''));
						
						if (ns1blankspace.objectContextData != undefined)
						{
							$('#ns1blankspaceLayoutHeaderHeight').val(ns1blankspace.objectContextData.headerheight);
							$('#ns1blankspaceLayoutFooterHeight').val(ns1blankspace.objectContextData.footerheight);
							$('#ns1blankspaceLayoutColumns').val(ns1blankspace.objectContextData.columns);
							$('[name="radioLayout"][value="' + ns1blankspace.objectContextData.layout + '"]').attr('checked', true);
							ns1blankspace.setup.website.css.list(ns1blankspace.objectContextData.cssattachment);
							ns1blankspace.setup.website.template(ns1blankspace.objectContextData.templatedocument);
						}
						else
						{
							$('[name="radioLayout"][value="3"]').attr('checked', true);
							ns1blankspace.setup.website.css.list(-1);
							ns1blankspace.setup.website.template('');
						}
					}	
				},

	css: 		{
					list: 		function (iValue)
								{
									var oSearch = new AdvancedSearch();
									oSearch.method = 'CORE_ATTACHMENT_SEARCH';
									oSearch.addField('filename,attachment');
									oSearch.addFilter('filename', 'TEXT_IS_LIKE', 'css')
									oSearch.addFilter('object', 'EQUAL_TO', 40);
									oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext)
									oSearch.rf = 'json';
									oSearch.sort('filename', 'asc');
									
									oSearch.getResults(function(oResponse)
									{
										var aHTML = [];

										aHTML.push('<input type="radio" id="radioCSSAttachment0" name="radioCSSAttachment" value="0"/>' +
																	'None<br />');

										$.each(oResponse.data.rows, function()
										{
											aHTML.push('<input type="radio" id="radioCSSAttachment' + this.attachment + '" name="radioCSSAttachment" value="' + this.attachment + '"/>' +
																this.filename + '<br />');				
										});
										
										$('#ns1blankspaceSetupWebsiteCSSContainer').html(aHTML.join(''));
										$('[name="radioCSSAttachment"][value="' + iValue + '"]').attr('checked', true);
									});
								},

					getURI: 	function (oParam)
								{
									var iCSSAttachment = (ns1blankspace.objectContextData.cssattachment ? ns1blankspace.objectContextData.cssattachment : -1);
									var fCallback = ns1blankspace.setup.website.pages.show;

									if (oParam != undefined)
									{
										if (oParam.cssAttachment != undefined) {iCSSAttachment = oParam.cssAttachment}
									}

									if 	(iCSSAttachment != -1 && ns1blankspace.objectContextData.cssuri == undefined)
									{
										var oSearch = new AdvancedSearch();
										oSearch.method = 'CORE_ATTACHMENT_SEARCH';
										oSearch.addField('filename');
										oSearch.addFilter('attachment', 'EQUAL_TO', iCSSAttachment);
										oSearch.rf = 'json';
										
										oSearch.getResults(function(oResponse)
										{
											if (oResponse.status = "OK")
											{
												if (oResponse.data.rows.length > 0)
												{
													ns1blankspace.objectContextData.cssuri = '/site/' + ns1blankspace.objectContext + '/' +
														oResponse.data.rows[0].filename;
												}		
											}	
											 
											fCallback();
										});
									}
									else
									{
										fCallback();
									}
								},
	
				},	

	template: 	function (iValue)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'DOCUMENT_SEARCH';
					
					oSearch.addField('title');
					oSearch.addFilter('content', 'TEXT_IS_LIKE', 'TemplateField|166|4016')
					oSearch.sort('title', 'asc');
					
					oSearch.getResults(function(oResponse)
					{
						var aHTML = [];

						aHTML.push('<input type="radio" id="radioTemplateDocument" name="radioTemplateDocument" value=""/>' +
													'None<br />');

						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<div style="margin-top:15px;" class="ns1blankspaceSub">To create a template; create a new page and insert the "Content" dynamic tag.</div>');
						}	
						else
						{	
							$.each(oResponse.data.rows, function()
							{
								aHTML.push('<input type="radio" id="radioTemplateDocument' + this.id + '" name="radioTemplateDocument" value="' + this.id + '"/>' +
													this.title + '<br />');				
							});
						}	
						
						$('#ns1blankspaceSetupWebsiteTemplateContainer').html(aHTML.join(''));
						$('[name="radioTemplateDocument"][value="' + iValue + '"]').attr('checked', true);
					});
				},
		
	advanced:	function ()
				{
					if ($('#ns1blankspaceMainAdvanced').attr('data-loading') == '1')
					{
						$('#ns1blankspaceMainAdvanced').attr('data-loading', '');
						
						var aHTML = [];
											
						aHTML.push('<table class="ns1blankspace">');
					
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'App Status' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRadio">' +
										'<input type="radio" id="radioAppStatus1" name="radioAppStatus" value="1"/>Disabled' +
										'<br /><input type="radio" id="radioAppStatus2" name="radioAppStatus" value="2"/>' +
												'Enabled For Testing (Allow requests from any source/site)' +
												'<br /><input type="radio" id="radioAppStatus3" name="radioAppStatus" value="3"/>' +
												'Enabled (Requests only from this website)' +
												'<br /><input type="radio" id="radioAppStatus4" name="radioAppStatus" value="4"/>' +
												'Enabled For Testing (Allow Requests from any source/site & access to any space)' +
												'<br /><input type="radio" id="radioAppStatus5" name="radioAppStatus" value="5"/>' +
												'Enabled (Requests only from this website & access to any space)' +
										'</td></tr>');
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Web Page Title' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRadio">' +
										'<input type="radio" id="radioTitleN" name="radioTitle" value="N"/>Use Document Title' +
										'<br /><input type="radio" id="radioTitleY" name="radioTitle" value="Y"/>Use Document Keywords' +
										'</td></tr>');		
	
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Document Type' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceTextMulti">' +
										'<textarea style="height: 50px;" rows="3" cols="35" id="ns1blankspaceAdvancedDocumentType" class="ns1blankspaceTextMultiLarge"></textarea>' +
										'</td></tr>');		
					
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'BODY Tag' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceTextMulti">' +
										'<textarea style="height: 50px;" rows="3" cols="35" id="ns1blankspaceAdvancedBodyTag" class="ns1blankspaceTextMultiLarge"></textarea>' +
										'</td></tr>');		
										
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainAdvanced').html(aHTML.join(''));
						
						if (ns1blankspace.objectContextData != undefined)
						{
							$('[name="radioAppStatus"][value="' + ns1blankspace.objectContextData.ondemandstatus + '"]').attr('checked', true);
							$('[name="radioTitle"][value="' + ns1blankspace.objectContextData.usekeywordsastitle + '"]').attr('checked', true);
							$('[name="radioTitle"][value="' +ns1blankspace.objectContextData.layout + '"]').attr('checked', true);
							$('#ns1blankspaceAdvancedDocumentType').val((ns1blankspace.objectContextData.documenttype).formatXHTML());
							$('#ns1blankspaceAdvancedBodyTag').val((ns1blankspace.objectContextData.bodytag).formatXHTML());
						}
					}	
				},

	scripts: 	function ()
				{
					if ($('#ns1blankspaceMainScripts').attr('data-loading') == '1')
					{
						$('#ns1blankspaceMainScripts').attr('data-loading', '');
						
						var aHTML = [];
											
						aHTML.push('<table class="ns1blankspace">');
					
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Header Script' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceTextMulti">' +
										'<textarea style="height: 350px;" rows="20" cols="80" id="ns1blankspaceScriptsHeader" class="ns1blankspaceTextMultiLarge"></textarea>' +
										'</td></tr>');		
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Footer Script (eg Google Analytics)' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceTextMulti">' +
										'<textarea style="height: 150px;" rows="20" cols="80" id="ns1blankspaceScriptsFooter" class="ns1blankspaceTextMultiLarge"></textarea>' +
										'</td></tr>');	
														
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainScripts').html(aHTML.join(''));
						
						if (ns1blankspace.objectContextData != undefined)
						{
							$('#ns1blankspaceScriptsHeader').val((ns1blankspace.objectContextData.headerscript).formatXHTML());
							$('#ns1blankspaceScriptsFooter').val((ns1blankspace.objectContextData.footerscript).formatXHTML());
						}
					}	
				},

	pages: 		{			
					show: 		function (oParam, oResponse)
								{
									var iObjectContext = ns1blankspace.objectContext;
									var oOptions = {view: true, remove: true};
									var oActions = {add: true};
									
									if (oParam != undefined)
									{
										if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
										if (oParam.options != undefined) {oOptions = oParam.options}
										if (oParam.actions != undefined) {oActions = oParam.actions}
									}		
										
									if (oResponse == undefined)
									{
										var oSearch = new AdvancedSearch();
										oSearch.method = 'SETUP_SITE_DOCUMENT_SEARCH';
										
										oSearch.addField('documenttitle,documentpublic,locationtext,documenturl,document');

										oSearch.addFilter('site', 'EQUAL_TO', iObjectContext)
										oSearch.sort('documenttitle', 'asc');
										
										oSearch.getResults(function(data)
										{
											ns1blankspace.setup.website.pages.show(oParam, data)
										});
									}
									else
									{
										if (oActions != undefined)
										{
											var aHTML = [];
												
											aHTML.push('<table class="ns1blankspaceContainer">' +
															'<tr class="ns1blankspaceContainer">' +
															'<td id="ns1blankspacePagesColumn1" class="ns1blankspaceColumn1Flexible" style="width:750px;"></td>' +
															'<td id="ns1blankspacePagesColumn2" class="ns1blankspaceColumn2Action"></td>' +
															'</tr>' + 
															'</table>');
												
											$('#ns1blankspaceMainPages').html(aHTML.join(''));

											var aHTML = [];

											aHTML.push('<table class="ns1blankspaceColumn2">');
											
											if (oActions.add)
											{
												aHTML.push('<tr><td class="ns1blankspaceAction">' +
																'<span id="ns1blankspaceSetupWebsitePagesAdd">Add</span>' +
																'</td></tr>');
											}
											
											aHTML.push('</table>');					
											
											$('#ns1blankspacePagesColumn2').html(aHTML.join(''));
										
											$('#ns1blankspaceSetupWebsitePagesAdd').button(
											{
												label: "Add"
											})
											.click(function() {
												 ns1blankspace.setup.website.pages.edit(oParam);
											})
										}	
									
										var aHTML = [];

										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">No pages.</td></tr></table>');
	
											$('#ns1blankspacePagesColumn1').html(aHTML.join(''));
										}
										else
										{
											aHTML.push('<table id="ns1blankspaceSetupWebsitePages">');
											aHTML.push('<tr class="ns1blankspaceCaption">');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Title</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">URL</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Type</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Sharing</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">ID</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
											aHTML.push('</tr>');
											
											$.each(oResponse.data.rows, function()
											{	
												aHTML.push('<tr class="ns1blankspaceRow">');
																
												aHTML.push('<td id="ns1blankspaceWebsitePages_title-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
																		this.documenttitle + '</td>');
																		
												aHTML.push('<td id="ns1blankspaceWebsitePages_url-' + this.id + '" class="ns1blankspaceRow">' +
																		this.documenturl + '</td>');
																		
												if (this.locationtext == 'Header' || this.locationtext == 'Home')
												{				
													aHTML.push('<td id="ns1blankspaceWebsitePages_location-' + this.id + '" class="ns1blankspaceRow">' +
																		this.locationtext + '</td>');
												}	
												else
												{
													aHTML.push('<td id="ns1blankspaceWebsitePages_location-' + this.id + '" class="ns1blankspaceRow" style="color:#A0A0A0;">' +
																		'Page</td>');
												}						
												
												if (this.documentpublic == 'Y')
												{				
													aHTML.push('<td id="ns1blankspaceWebsitePages_public-' + this.id + '" class="ns1blankspaceRow">' +
																		'Public</td>');
												}
												else
												{
													aHTML.push('<td id="ns1blankspaceWebsitePages_public-' + this.id + '" class="ns1blankspaceRow">' +
																		'Private</td>');
												}		
																
												aHTML.push('<td id="ns1blankspaceWebsitePages_id-' + this.document + '" class="ns1blankspaceRow" style="color:#A0A0A0;">' +
																		this.document + '</td>');
																								
												aHTML.push('<td style="width:30px; text-align:right;" class="ns1blankspaceRow">');
												
												aHTML.push('<span id="ns1blankspaceWebsitePage_options_remove-' + this.id + '" class="ns1blankspaceRowRemove"></span>');
																	
												aHTML.push('</td></tr>');
											});
											
											aHTML.push('</table>');

											$('#ns1blankspacePagesColumn1').html(aHTML.join(''));
											
											$('#ns1blankspaceSetupWebsitePages .ns1blankspaceRowRemove').button({
												text: false,
												icons: {
													primary: "ui-icon-close"
												}
											})
											.click(function()
											{
												ns1blankspace.remove(
												{
													xhtmlElementID: this.id,
													method: 'SETUP_SITE_DOCUMENT_MANAGE',
													ifNoneMessage: 'No pages.'
												});
											})
											.css('width', '15px')
											.css('height', '17px');
											
											
											$('#ns1blankspaceSetupWebsitePages td.ns1blankspaceRowSelect')
											.click(function()
											{
												ns1blankspace.setup.website.pages.edit({xhtmlElementID: this.id})
											});
										}
									}	
								},

					edit:		function (oParam, oResponse)
								{
									var sID; 
									var iDocumentType = 5;
									
									if (oResponse == undefined)
									{
										var sXHTMLElementID;

										if (oParam != undefined)
										{
											if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
										}
										
										if (sXHTMLElementID != undefined)
										{
											var aXHTMLElementID = sXHTMLElementID.split('-');
											var sID = aXHTMLElementID[1];
											var sDocumentID = aXHTMLElementID[2];
										}	
									
										var aHTML = [];
										
										aHTML.push('<table class="ns1blankspace">');
												
										aHTML.push('<tr>' +
														'<td class="ns1blankspaceCaption">' +
														'Title' +
														'</td>' +
														'<td class="ns1blankspaceCaption" style="width:200px;">' +
														'URL</td></tr>');

										aHTML.push('<tr class="ns1blankspaceText">' +
														'<td class="ns1blankspaceText">' +
														'<input id="ns1blankspaceSetupWebsitePageTitle" class="ns1blankspaceText">' +
														'</td><td class="ns1blankspaceText" style="width:200px;">' +
														'<input id="ns1blankspaceSetupWebsitePageURL" class="ns1blankspaceText" style="width:200px;">' +
														'</td></tr>');
										
										aHTML.push('</table>');
					
										aHTML.push('<table class="ns1blankspace">');
										
										aHTML.push('<tr class="ns1blankspace">' +	
														'<td class="ns1blankspaceCaption">' +
														'Type' +
														'</td>' +
														'<td class="ns1blankspaceCaption">' +
														'Format' +
														'</td>' +
														'<td class="ns1blankspaceCaption">' +
														'Sharing' +
														'</td>' +
														'<td class="ns1blankspaceCaption" id="ns1blankspaceWebsitePageNetworkGroupsCaption"></td>' +
														'<td style="padding-right:10px; text-align:right;">' +
														'<span class="ns1blankspaceAction" id="ns1blankspaceWebsitePageNetworkGroupsAdd"></span></td>' +
														'</tr>');
														
										aHTML.push('<tr class="ns1blankspaceText">');
														
										aHTML.push('<td class="ns1blankspaceRadio" style="width:125px;">' +
														'<input type="radio" id="radioLocation9" name="radioLocation" value="9"/>Page' +
														'<br /><input type="radio" id="radioLocation2" name="radioLocation" value="2"/>Home' +
														'<br /><input type="radio" id="radioLocation3" name="radioLocation" value="3"/>Header' +
														'</td>');
														
										aHTML.push('<td class="ns1blankspaceRadio" style="width:125px;">' +
														'<input type="radio" id="radioDocumentType5" name="radioDocumentType" value="5"/>HTML' +
														'<br /><input type="radio" id="radioDocumentType6" name="radioDocumentType" value="6"/>Text' +
														'</td>');
												
										aHTML.push('<td class="ns1blankspaceRadio" style="width:125px;">' +
														'<input type="radio" id="radioPublicY" name="radioPublic" value="Y"/>Public' +
														'<br /><input type="radio" id="radioPublicN" name="radioPublic" value="N"/>Private' +
														'</td>');

										aHTML.push('<td colspan=2 class="ns1blankspaceRadio" id="ns1blankspaceWebsitePageNetworkGroups">&nbsp;' +
														'</td></tr>');
									
										aHTML.push('</table>');
											
										aHTML.push('<table style="margin-top:5px;">');
										
										ns1blankspace.counter.editor = ns1blankspace.counter.editor + 1;
										
										aHTML.push('<tr class="ns1blankspaceTextMulti">' +
														'<td class="ns1blankspaceTextMulti">' +
														'<textarea rows="10" cols="70" name="ns1blankspaceEditText" id="ns1blankspaceEditText' +
														ns1blankspace.counter.editor + '" data-editorcount="' + ns1blankspace.counter.editor + '"' +
														' class="ns1blankspaceTextMultiLarge tinymceAdvanced" style="width:610px; font-size:0.75em; height:500px;"></textarea>' +
														'</td></tr>');
										
										aHTML.push('</table>');	

										aHTML.push('<table style="margin-top:10px; margin-bottom:15px;">');

										aHTML.push('<tr><td class="ns1blankspaceRadio"><input type="checkbox" id="ns1blankspaceWebsitePageIgnoreLayout" />' +
														'Ignore Site Layout</td>');

										aHTML.push('<td class="ns1blankspaceRadio"><input type="checkbox" id="ns1blankspaceWebsitePageIgnoreHead" />' +
														'Ignore Site Header</td></tr>');

										aHTML.push('</table>');				
										
										$('#ns1blankspacePagesColumn1').html(aHTML.join(''));

										$('#ns1blankspaceSetupWebsitePageTitle').focus();
										
										var aHTML = [];
										
										aHTML.push('<table class="ns1blankspaceColumn2">');
												
										aHTML.push('<tr><td>' +
														'<span class="ns1blankspaceAction" id="ns1blankspaceWebsitePageSave">Save</span>' +
														'</td></tr>');
									
										aHTML.push('<tr><td>' +
														'<span class="ns1blankspaceAction" id="ns1blankspaceWebsitePageCancel">Cancel</span>' +
														'</td></tr>');
														
										aHTML.push('</table>');					
										
										$('#ns1blankspacePagesColumn2').html(aHTML.join(''));
										
										$('#ns1blankspaceWebsitePageSave').button(
										{
											label: "Save"
										})
										.click(function() 
										{
											ns1blankspace.status.working();

											var sData = 'site=' + ns1blankspace.util.fs(ns1blankspace.objectContext);
											sData += '&documenttitle=' + ns1blankspace.util.fs($('#ns1blankspaceSetupWebsitePageTitle').val());
											sData += '&documenturl=' + ns1blankspace.util.fs($('#ns1blankspaceSetupWebsitePageURL').val());
											sData += '&documenttype=' + ns1blankspace.util.fs($('input[name="radioDocumentType"]:checked').val());
											sData += '&documentpublic=' + ns1blankspace.util.fs($('input[name="radioPublic"]:checked').val());
											sData += '&location=' + ns1blankspace.util.fs($('input[name="radioLocation"]:checked').val());
											sData += '&documentignorewebsitelayout=' + ($('#ns1blankspaceWebsitePageIgnoreLayout:checked').length==0?'N':'Y');
											sData += '&documentignorewebsiteheadertags=' + ($('#ns1blankspaceWebsitePageIgnoreHead:checked').length==0?'N':'Y');
											
											if (parseInt($('input[name="radioDocumentType"]:checked').val()) == 5)
											{
												sData += '&documentcontent=' + ns1blankspace.util.fs(tinyMCE.get('ns1blankspaceEditText' + ns1blankspace.counter.editor).getContent());
											}
											else
											{
												sData += '&documentcontent=' + ns1blankspace.util.fs($('#ns1blankspaceEditText' + ns1blankspace.counter.editor).val());
											}
											
											if (sID != undefined) {sData += '&id=' + ns1blankspace.util.fs(sID)};

											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('SETUP_SITE_DOCUMENT_MANAGE'),
												data: sData,
												dataType: 'json',
												success: function()
												{
													ns1blankspace.setup.website.pages.show();
													ns1blankspace.status.clear();
												}
											});
										})
										.css('width', '65px');
										
										$('#ns1blankspaceWebsitePageCancel').button(
										{
											label: "Cancel"
										})
										.click(function() 
										{
											ns1blankspace.setup.website.pages.show();
										})
										.css('width', '65px');
										
										$('[name="radioDocumentType"]').click(function()
										{
											if (parseInt($('input[name="radioDocumentType"]:checked').val()) == 5)
											{
												ns1blankspace.format.editor.init({selector: '#ns1blankspaceEditText' + ns1blankspace.counter.editor});
											}
											else
											{
												tinymce.remove('#ns1blankspaceEditText' + ns1blankspace.counter.editor);
											}
										});
										
										$('[name="radioPublic"]').click(function()
										{
											ns1blankspace.setup.website.pages.networkGroups({id: sDocumentID});
										});

										var sCSS = ns1blankspace.objectContextData.cssuri;
										if (sCSS == undefined) {sCSS = ns1blankspace.xhtml.editorCSS}

										if (sID != undefined)
										{
											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_SITE_DOCUMENT_SEARCH';
											oSearch.addField('documentcontent,documentignorewebsiteheadertags,documentignorewebsitelayout,documentpublic,' +
																'location,locationtext,documenturl,document,documenttitle,documenttype');
											oSearch.addFilter('id', 'EQUAL_TO', sID)
						
											oSearch.getResults(function(data)
											{
												ns1blankspace.setup.website.pages.edit(oParam, data)
											});
										}
										else
										{
											$('[name="radioDocumentType"][value="5"]').attr('checked', true);
											$('[name="radioLocation"][value="9"]').attr('checked', true);
											ns1blankspace.format.editor.init({selector: '#ns1blankspaceEditText' + ns1blankspace.counter.editor});
											$('[name="radioPublic"][value="Y"]').attr('checked', true);	
										}
									}
									else
									{
										if (oResponse.data.rows.length != 0)
										{
											var oObjectContext = oResponse.data.rows[0];
											$('#ns1blankspaceSetupWebsitePageTitle').val(oObjectContext.documenttitle.formatXHTML());
											$('#ns1blankspaceSetupWebsitePageURL').val(oObjectContext.documenturl);
											
											$('#ns1blankspaceEditText' + ns1blankspace.counter.editor).val((oObjectContext.documentcontent).formatXHTML());
											
											if (parseInt(oObjectContext.documenttype) == 5)
											{
												ns1blankspace.format.editor.init({selector: '#ns1blankspaceEditText' + ns1blankspace.counter.editor});
											}
											
											$('[name="radioLocation"][value="' + oObjectContext.location + '"]').attr('checked', true);
											$('[name="radioDocumentType"][value="' + oObjectContext.documenttype + '"]').attr('checked', true);
											$('[name="radioPublic"][value="' + oObjectContext.documentpublic + '"]').attr('checked', true);

											$('#ns1blankspaceWebsitePageIgnoreLayout').attr('checked', (oObjectContext.documentignorewebsitelayout == 'Y'));
											$('#ns1blankspaceWebsitePageIgnoreHead').attr('checked', (oObjectContext.documentignorewebsiteheadertags == 'Y'));

											ns1blankspace.setup.website.pages.networkGroups({id: oObjectContext.document});
										}
										else
										{
											$('[name="radioLocation"][value="9"]').attr('checked', true);
											$('[name="radioDocumentType"][value="5"]').attr('checked', true);
											ns1blankspace.format.editor.init({selector: '#ns1blankspaceEditText' + ns1blankspace.counter.editor});
											$('[name="radioPublic"][value="Y"]').attr('checked', true);					
										}
									}		
								},

					networkGroups:
								function (oParam)
								{
									var iID = ns1blankspace.util.getParam(oParam, 'id', {"default": ''}).value;

									var sRetrictionCaption = '';
									
									$('#ns1blankspaceWebsitePageNetworkGroupsAdd').html('');
									$('#ns1blankspaceWebsitePageNetworkGroups').html('');

									if (iID != '')
									{
										if ($('input[name="radioPublic"]:checked').val() == 'N')
										{
											sRetrictionCaption = 'Share with'

											ns1blankspace.setup.networkGroup.groups.init(
											{
												xhtmlElementContainerID: 'ns1blankspaceWebsitePageNetworkGroups',
												xhtmlElementAddID: 'ns1blankspaceWebsitePageNetworkGroupsAdd',
												object: 14,
												objectContext: iID
											});
										}	
									}

									$('#ns1blankspaceWebsitePageNetworkGroupsCaption').html(sRetrictionCaption)		
								}
				},
				
	forms: 		function (oParam, oResponse)
				{
					var iObjectContext = ns1blankspace.objectContext;
					var oOptions = {view: true};
					var oActions = {};
					
					if (oParam != undefined)
					{
						if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
						if (oParam.options != undefined) {oOptions = oParam.options}
						if (oParam.actions != undefined) {oActions = oParam.actions}
					}		
						
					if (oResponse == undefined)
					{
						$.ajax(
						{
							type: 'GET',
							url: ns1blankspace.util.endpointURI('SETUP_SITE_FORM_SEARCH'),
							data: 'site=' + iObjectContext,
							dataType: 'json',
							success: function(data) {ns1blankspace.setup.website.forms(oParam, data)}
						});
					}
					else
					{
						if (oActions != undefined)
						{
							var aHTML = [];
								
							aHTML.push('<table class="ns1blankspaceContainer">' +
											'<tr class="ns1blankspaceContainer">' +
											'<td id="ns1blankspaceFormsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
											'<td id="ns1blankspaceFormsColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td>' +
											'</tr>' + 
											'</table>');	

							$('#ns1blankspaceMainForms').html(aHTML.join(''));
							
							var aHTML = [];

							aHTML.push('<table class="ns1blankspaceColumn2">');
							
							aHTML.push('<tr><td class="ns1blankspaceAction">' +
												'<span id="ns1blankspaceSetupWebsiteFormsAdd">Add</span>' +
												'</td></tr>');
							
							aHTML.push('</table>');					
							
							$('#ns1blankspaceFormsColumn2').html(aHTML.join(''));
						
							$('#ns1blankspaceSetupWebsiteFormsAdd').button(
							{
								label: "Add"
							})
							.click(function()
							{
								ns1blankspace.setup.websiteForm.init({showHome: false, site: ns1blankspace.objectContext});
								ns1blankspace.setup.websiteForm["new"]();
							})
						}	
					
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table><tr><td class="ns1blankspaceNothing">No forms.</td></tr></table>');
	
							$('#ns1blankspaceFormsColumn1').html(aHTML.join(''));
						
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceSetupWebsiteForms" class="ns1blankspace">');
							aHTML.push('<tr class="ns1blankspaceCaption">');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Form</td>');
							aHTML.push('</tr>');
							
							$.each(oResponse.data.rows, function()
							{	
								aHTML.push('<tr class="ns1blankspaceRow">');
								
								sTitle = this.title;
								if (sTitle == '') {sTitle = this.message}
								if (sTitle == '') {sTitle = this.typetext}
								sTitle = sTitle + ' (' + this.id + ')';
								
								aHTML.push('<td id="ns1blankspaceWebsiteForms_title-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
														sTitle + '</td>');
											
								aHTML.push('</tr>');
							});
							
							aHTML.push('</table>');

							$('#ns1blankspaceFormsColumn1').html(aHTML.join(''));
							
							$('#ns1blankspaceSetupWebsiteForms .ns1blankspaceRowSelect').click(function()
							{
								ns1blankspace.setup.websiteForm.init({id: (this.id).split('-')[1]});
							})
							.css('width', '15px')
							.css('height', '17px');
						}
					}	
				},

	urls: 		{
					show:		function (oParam, oResponse)
								{
									var iObjectContext = ns1blankspace.objectContext;
									var oOptions = {view: true, remove: true};
									var oActions = {add: true};
									
									if (oParam != undefined)
									{
										if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
										if (oParam.options != undefined) {oOptions = oParam.options}
										if (oParam.actions != undefined) {oActions = oParam.actions}
									}		
										
									if (oResponse == undefined)
									{	
										var oSearch = new AdvancedSearch();
										oSearch.method = 'SETUP_SITE_URL_SEARCH';
										oSearch.addField('primary,status,statustext,url');
										oSearch.addFilter('site', 'EQUAL_TO', ns1blankspace.objectContext)
										oSearch.rf = 'json';
										oSearch.sort('url', 'asc');
										
										oSearch.getResults(function(oResponse)
										{
											ns1blankspace.setup.website.urls.show(oParam, oResponse)
										});
									}
									else
									{
										if (oActions != undefined)
										{
											var aHTML = [];
												
											aHTML.push('<table class="ns1blankspaceContainer">' +
															'<tr class="ns1blankspaceContainer">' +
															'<td id="ns1blankspaceURLColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
															'<td id="ns1blankspaceURLColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td>' +
															'</tr>' + 
															'</table>');

											$('#ns1blankspaceMainURLs').html(aHTML.join(''));
											
											var aHTML = [];
												
											aHTML.push('<table class="ns1blankspaceColumn2">');
											
											if (oActions.add)
											{
												aHTML.push('<tr><td class="ns1blankspaceAction">' +
															'<span id="ns1blankspaceWebsiteURLAdd">Add</span>' +
															'</td></tr>');
															
												aHTML.push('<tr><td style="padding-top:20px;" id="ns1blankspaceURLAdd" class="ns1blankspaceAction">' +
															'CNAME your own url to site.mydigitalstructure.com' +
															'</td></tr>');			
											}
											
											aHTML.push('</table>');					
											
											$('#ns1blankspaceURLColumn2').html(aHTML.join(''));
										
											$('#ns1blankspaceWebsiteURLAdd').button(
											{
												label: "Add"
											})
											.click(function()
											{
												 ns1blankspace.setup.website.urls.add(oParam);
											})
										}	
									
										var aHTML = [];

										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">No urls.</td></tr></table>');
	
											$('#ns1blankspaceURLColumn1').html(aHTML.join(''));
										}
										else
										{
											aHTML.push('<table id="ns1blankspaceSetupWebsiteURLs">');
											aHTML.push('<tr class="ns1blankspaceCaption">');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">URL</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
											aHTML.push('</tr>');
		
											$.each(oResponse.data.rows, function()
											{
												aHTML.push('<tr class="ns1blankspaceRow">');
																
												aHTML.push('<td id="ns1blankspaceWebsiteURL_url-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
																		this.url + '</td>');
																		
												aHTML.push('<td style="width:30px; text-align:right;" class="ns1blankspaceRow">');
													
												if (oOptions.remove)
												{	
													aHTML.push('<span id="ns1blankspaceWebsiteURL_options_remove-' + this.id + '" class="ns1blankspaceRowRemove"></span>');
												};	
													
												aHTML.push('</td>');
																
												aHTML.push('</tr>');
											});
											
											aHTML.push('</table>');

											$('#ns1blankspaceURLColumn1').html(aHTML.join(''));
											
											if (oOptions.remove) 
											{
												$('#ns1blankspaceSetupWebsiteURLs span.ns1blankspaceRowRemove').button( {
													text: false,
													icons: {
														primary: "ui-icon-close"
													}
												})
												.click(function()
												{
													ns1blankspace.remove(
													{
														xhtmlElementID: this.id,
														method: 'SETUP_SITE_URL_MANAGE',
														parentLevel: 2,
														ifNoneMessage: 'No URLs.'
													});
												})
												.css('width', '15px')
												.css('height', '17px')
											}
											
											if (oOptions.view) 
											{
												$('#ns1blankspaceSetupWebsiteURLs .ns1blankspaceRowSelect').click(function()
												{
													ns1blankspace.setup.website.urls.add({xhtmlElementID: this.id})
												})
												.css('width', '15px')
												.css('height', '17px')
											}	
										}
									}
								},

					add:		function (oParam, oResponse)
								{
									var sID; 
									
									if (oResponse == undefined)
									{
										var sXHTMLElementID;

										if (oParam != undefined)
										{
											if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
										}
										
										if (sXHTMLElementID != undefined)
										{
											var aXHTMLElementID = sXHTMLElementID.split('-');
											var sID = aXHTMLElementID[1];
										}	
									
										var aHTML = [];
	
										aHTML.push('<table class="ns1blankspace">');
												
										aHTML.push('<tr>' +
														'<td class="ns1blankspaceCaption">' +
														'URL' +
														'</td></tr>' +
														'<tr class="ns1blankspaceText">' +
														'<td class="ns1blankspaceText">' +
														'<input id="ns1blankspaceSetupWebsiteURLURL" class="ns1blankspaceText">' +
														'</td></tr>');
														
										aHTML.push('</table>');					
										
										$('#ns1blankspaceURLColumn1').html(aHTML.join(''));

										$('#ns1blankspaceSetupWebsiteURLURL').focus();
										
										var aHTML = [];

										aHTML.push('<table class="ns1blankspaceColumn2">');
												
										aHTML.push('<tr><td>' +
														'<span class="ns1blankspaceAction" style="width:80px;" id="ns1blankspaceWebsiteURLSave">Save</span>' +
														'</td></tr>');
									
										aHTML.push('<tr><td>' +
														'<span class="ns1blankspaceAction" style="width:80px;" id="ns1blankspaceWebsiteURLCancel">Cancel</span>' +
														'</td></tr>');
														
										aHTML.push('</table>');	
	
										$('#ns1blankspaceURLColumn2').html(aHTML.join(''));
										
										$('#ns1blankspaceWebsiteURLSave').button(
										{
											text: "Save"
										})
										.click(function() 
										{
											var sData = 'site=' + ns1blankspace.objectContext;
											sData += '&url=' + ns1blankspace.util.fs(ns1blankspace.util.trimLast($('#ns1blankspaceSetupWebsiteURLURL').val(), '/'));
											sData += '&id=' + ns1blankspace.util.fs(sID);
											
											ns1blankspace.status.working();

											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('SETUP_SITE_URL_MANAGE'),
												data: sData,
												dataType: 'json',
												success: function(data) {
													if (data.status == 'OK')
													{	
														ns1blankspace.status.message('URL added.')
														ns1blankspace.show({selector: '#ns1blankspaceMainURLs', refresh: true});
														ns1blankspace.setup.website.urls.show();

													}
													else
													{
														ns1blankspace.status.error(data.error.errornotes);
													}	
												}
											});
										});
										
										$('#ns1blankspaceWebsiteURLCancel').button(
										{
											text: "Cancel"
										})
										.click(function() 
										{
											ns1blankspace.show({selector: '#ns1blankspaceMainURLs'});
											ns1blankspace.setup.website.urls.show();
										});
										
										if (sID != undefined)
										{
											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_SITE_URL_SEARCH';
											oSearch.addField('primary,status,statustext,url');
											oSearch.addFilter('id', 'EQUAL_TO', sID)
											oSearch.rf = 'json';
											oSearch.sort('url', 'asc');
											
											oSearch.getResults(function(oResponse)
											{
												ns1blankspace.setup.website.urls.add(oParam, oResponse)
											});
										}
									}
									else
									{
										if (oResponse.data.rows.length != 0)
										{
											var oObjectContext = oResponse.data.rows[0];
											$('#ns1blankspaceSetupWebsiteURLURL').val(oObjectContext.url)
										}
									}		
								}
				},
	
	httpHeaders: 
				{
					show:		function (oParam, oResponse)
								{
									var iObjectContext = ns1blankspace.objectContext;
									
									if (oParam != undefined)
									{
										if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
									}		
										
									if (oResponse == undefined)
									{	
										var oSearch = new AdvancedSearch();
										oSearch.method = 'SETUP_SITE_HTTP_HEADER_SEARCH';
										oSearch.addField('key,value');
										oSearch.addFilter('site', 'EQUAL_TO', ns1blankspace.objectContext)
										oSearch.rf = 'json';
										oSearch.sort('key', 'asc');
										
										oSearch.getResults(function(data)
										{
											ns1blankspace.setup.website.httpHeaders.show(oParam, data)
										});
									}
									else
									{	
										var aHTML = [];
											
										aHTML.push('<table class="ns1blankspaceContainer">' +
														'<tr class="ns1blankspaceContainer">' +
														'<td id="ns1blankspaceHTTPHeaderColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
														'<td id="ns1blankspaceHTTPHeaderColumn2" class="ns1blankspaceColumn2" style="width:200px;"></td>' +
														'</tr>' + 
														'</table>');

										$('#ns1blankspaceMainHTTPHeaders').html(aHTML.join(''));
										
										var aHTML = [];
											
										aHTML.push('<table class="ns1blankspaceColumn2">');
										
										aHTML.push('<tr><td class="ns1blankspaceAction">' +
													'<span id="ns1blankspaceWebsiteHTTPHeaderAdd">Add</span>' +
													'</td></tr>');
													
										aHTML.push('<tr><td style="padding-top:20px;">' +
													'<a href="http://en.wikipedia.org/wiki/List_of_HTTP_header_fields" target="_blank">What are HTTP headers?</a>' +
													'</td></tr>');	

										aHTML.push('<tr><td style="padding-top:16px;" class="ns1blankspaceSubNote">' +
													'A common header is<br />Access-Control-Allow-Origin:<br />[your domain or * for all domains]' +
													'</td></tr>');	

										aHTML.push('</table>');					
										
										$('#ns1blankspaceHTTPHeaderColumn2').html(aHTML.join(''));
									
										$('#ns1blankspaceWebsiteHTTPHeaderAdd').button(
										{
											label: "Add"
										})
										.click(function()
										{
											 ns1blankspace.setup.website.httpHeaders.add(oParam);
										})
											
										var aHTML = [];

										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">No HTTP Headers.</td></tr></table>');
	
											$('#ns1blankspaceHTTPHeaderColumn1').html(aHTML.join(''));
										}
										else
										{
											aHTML.push('<table id="ns1blankspaceSetupWebsiteHTTPHeaders">');
											aHTML.push('<tr class="ns1blankspaceCaption">');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">HTTP Header</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Value</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
											aHTML.push('</tr>');
		
											$.each(oResponse.data.rows, function()
											{
												aHTML.push('<tr class="ns1blankspaceRow">');
																
												aHTML.push('<td id="ns1blankspaceWebsiteHTTPHeader_header-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
																		this.key + '</td>');

												aHTML.push('<td id="ns1blankspaceWebsiteHTTPHeader_value-' + this.id + '" class="ns1blankspaceRow">' +
																		this.value + '</td>');
																		
												aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">');
													
												aHTML.push('<span id="ns1blankspaceWebsiteHTTPHeader_options_remove-' + this.id + '" class="ns1blankspaceRowRemove"></span>');
														
												aHTML.push('</td>');
																
												aHTML.push('</tr>');
											});
											
											aHTML.push('</table>');

											$('#ns1blankspaceHTTPHeaderColumn1').html(aHTML.join(''));
													
											$('#ns1blankspaceSetupWebsiteHTTPHeaders span.ns1blankspaceRowRemove').button(
											{
												text: false,
												icons:
												{
													primary: "ui-icon-close"
												}
											})
											.click(function()
											{
												ns1blankspace.remove(
												{
													xhtmlElementID: this.id,
													method: 'SETUP_SITE_HTTP_HEADER_MANAGE',
													parentLevel: 2,
													ifNoneMessage: 'No HTTP Headers.'
												});
											})
											.css('width', '15px')
											.css('height', '17px');
											
											$('#ns1blankspaceSetupWebsiteHTTPHeaders .ns1blankspaceRowSelect')
											.click(function()
											{
												ns1blankspace.setup.website.httpHeaders.add({xhtmlElementID: this.id})
											});
										}
									}
								},

					add:		function (oParam, oResponse)
								{
									var sID; 
									
									if (oResponse == undefined)
									{
										var sXHTMLElementID;

										if (oParam != undefined)
										{
											if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
										}
										
										if (sXHTMLElementID != undefined)
										{
											var aXHTMLElementID = sXHTMLElementID.split('-');
											var sID = aXHTMLElementID[1];
										}	
									
										var aHTML = [];
	
										aHTML.push('<table class="ns1blankspace">');
												
										aHTML.push('<tr><td class="ns1blankspaceCaption">' +
														'HTTP Header (Key)' +
														'</td></tr>' +
														'<tr class="ns1blankspaceText">' +
														'<td class="ns1blankspaceText">' +
														'<input id="ns1blankspaceSetupWebsiteHTTPHeaderKey" class="ns1blankspaceText">' +
														'</td></tr>');

										aHTML.push('<tr><td class="ns1blankspaceCaption">' +
														'Value' +
														'</td></tr>' +
														'<tr class="ns1blankspaceText">' +
														'<td class="ns1blankspaceText">' +
														'<input id="ns1blankspaceSetupWebsiteHTTPHeaderValue" class="ns1blankspaceText">' +
														'</td></tr>');
														
										aHTML.push('</table>');					
										
										$('#ns1blankspaceHTTPHeaderColumn1').html(aHTML.join(''));

										$('#ns1blankspaceSetupWebsiteHTTPHeaderKey').focus();
										
										var aHTML = [];

										aHTML.push('<table class="ns1blankspaceColumn2">');
												
										aHTML.push('<tr><td>' +
														'<span class="ns1blankspaceAction" style="width:80px;" id="ns1blankspaceWebsiteHTTPHeaderSave">Save</span>' +
														'</td></tr>');
									
										aHTML.push('<tr><td>' +
														'<span class="ns1blankspaceAction" style="width:80px;" id="ns1blankspaceWebsiteHTTPHeaderCancel">Cancel</span>' +
														'</td></tr>');
														
										aHTML.push('</table>');	
	
										$('#ns1blankspaceHTTPHeaderColumn2').html(aHTML.join(''));
										
										$('#ns1blankspaceWebsiteHTTPHeaderSave').button(
										{
											text: "Save"
										})
										.click(function() 
										{
											var oData =
											{
												site: ns1blankspace.objectContext,
												key: $('#ns1blankspaceSetupWebsiteHTTPHeaderKey').val(),
												value: $('#ns1blankspaceSetupWebsiteHTTPHeaderValue').val(),
												id: sID
											}	
											
											ns1blankspace.status.working();

											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('SETUP_SITE_HTTP_HEADER_MANAGE'),
												data: oData,
												dataType: 'json',
												success: function(data)
												{
													if (data.status == 'OK')
													{	
														ns1blankspace.status.message('HTTP header added.')
														ns1blankspace.show({selector: '#ns1blankspaceMainHTTPHeaders', refresh: true});
														ns1blankspace.setup.website.httpHeaders.show();
													}
													else
													{
														ns1blankspace.status.error(data.error.errornotes);
													}	
												}
											});
										});
										
										$('#ns1blankspaceWebsiteHTTPHeaderCancel').button(
										{
											text: "Cancel"
										})
										.click(function() 
										{
											ns1blankspace.show({selector: '#ns1blankspaceMainHTTPHeaders'});
											ns1blankspace.setup.website.httpHeaders.show();
										});
										
										if (sID != undefined)
										{
											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_SITE_HTTP_HEADER_SEARCH';
											oSearch.addField('key,value');
											oSearch.addFilter('site', 'EQUAL_TO', ns1blankspace.objectContext)
											oSearch.rf = 'json';
											
											oSearch.getResults(function(data)
											{
												ns1blankspace.setup.website.httpHeaders.add(oParam, data)
											});
										}
									}
									else
									{
										if (oResponse.data.rows.length != 0)
										{
											var oObjectContext = oResponse.data.rows[0];
											$('#ns1blankspaceSetupWebsiteHTTPHeaderKey').val(oObjectContext.key)
											$('#ns1blankspaceSetupWebsiteHTTPHeaderValue').val(oObjectContext.value)
										}
									}		
								}
				},

	redirects: 
				{
					show:		function (oParam, oResponse)
								{
									var iObjectContext = ns1blankspace.objectContext;
									
									if (oParam != undefined)
									{
										if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
									}		
										
									if (oResponse == undefined)
									{	
										var oSearch = new AdvancedSearch();
										oSearch.method = 'SETUP_SITE_URL_REDIRECT_SEARCH';
										oSearch.addField('statustext,urlnew,urlold');
										oSearch.addFilter('site', 'EQUAL_TO', ns1blankspace.objectContext)
										oSearch.rf = 'json';
										oSearch.sort('urlold', 'asc');
										
										oSearch.getResults(function(data)
										{
											ns1blankspace.setup.website.redirects.show(oParam, data)
										});
									}
									else
									{	
										var aHTML = [];
											
										aHTML.push('<table class="ns1blankspaceContainer">' +
														'<tr class="ns1blankspaceContainer">' +
														'<td id="ns1blankspaceRedirectColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
														'<td id="ns1blankspaceRedirectColumn2" class="ns1blankspaceColumn2" style="width:200px;"></td>' +
														'</tr>' + 
														'</table>');

										$('#ns1blankspaceMainRedirects').html(aHTML.join(''));
										
										var aHTML = [];
											
										aHTML.push('<table class="ns1blankspaceColumn2">');
										
										aHTML.push('<tr><td class="ns1blankspaceAction">' +
													'<span id="ns1blankspaceWebsiteRedirectAdd">Add</span>' +
													'</td></tr>');
													
										aHTML.push('<tr><td style="padding-top:20px;">' +
													'<a href="http://en.wikipedia.org/wiki/URL_redirection" target="_blank">What are HTTP redirects?</a>' +
													'</td></tr>');	

										aHTML.push('</table>');					
										
										$('#ns1blankspaceRedirectColumn2').html(aHTML.join(''));
									
										$('#ns1blankspaceWebsiteRedirectAdd').button(
										{
											label: "Add"
										})
										.click(function()
										{
											 ns1blankspace.setup.website.redirects.add(oParam);
										})
											
										var aHTML = [];

										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">No redirects.</td></tr></table>');
	
											$('#ns1blankspaceRedirectColumn1').html(aHTML.join(''));
										}
										else
										{
											aHTML.push('<table id="ns1blankspaceSetupWebsiteRedirects">');
											aHTML.push('<tr class="ns1blankspaceCaption">');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">URLs</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">HTTP Status Text</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
											aHTML.push('</tr>');
		
											$.each(oResponse.data.rows, function()
											{
												aHTML.push('<tr class="ns1blankspaceRow">');
																
												aHTML.push('<td id="ns1blankspaceWebsiteRedirect_oldurl-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
																		this.urlold + '<br />' + this.urlnew + '</td>');

												aHTML.push('<td id="ns1blankspaceWebsiteRedirect_statustext-' + this.id + '" class="ns1blankspaceRow">' +
																		this.statustext + '</td>');
																		
												aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">');
													
												aHTML.push('<span id="ns1blankspaceWebsiteRedirect_options_remove-' + this.id + '" class="ns1blankspaceRowRemove"></span>');
														
												aHTML.push('</td>');
																
												aHTML.push('</tr>');
											});
											
											aHTML.push('</table>');

											$('#ns1blankspaceRedirectColumn1').html(aHTML.join(''));
													
											$('#ns1blankspaceSetupWebsiteRedirects span.ns1blankspaceRowRemove').button(
											{
												text: false,
												icons:
												{
													primary: "ui-icon-close"
												}
											})
											.click(function()
											{
												ns1blankspace.remove(
												{
													xhtmlElementID: this.id,
													method: 'SETUP_SITE_URL_REDIRECT_MANAGE',
													parentLevel: 2,
													ifNoneMessage: 'No redirects.'
												});
											})
											.css('width', '15px')
											.css('height', '17px');
											
											$('#ns1blankspaceSetupWebsiteRedirects .ns1blankspaceRowSelect')
											.click(function()
											{
												ns1blankspace.setup.website.redirects.add({xhtmlElementID: this.id})
											});
										}
									}
								},

					add:		function (oParam, oResponse)
								{
									var sID; 
									
									if (oResponse == undefined)
									{
										var sXHTMLElementID;

										if (oParam != undefined)
										{
											if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
										}
										
										if (sXHTMLElementID != undefined)
										{
											var aXHTMLElementID = sXHTMLElementID.split('-');
											var sID = aXHTMLElementID[1];
										}	
									
										var aHTML = [];
	
										aHTML.push('<table class="ns1blankspace">');
												
										aHTML.push('<tr><td class="ns1blankspaceCaption">' +
														'If URL is' +
														'</td></tr>' +
														'<tr class="ns1blankspaceText">' +
														'<td class="ns1blankspaceText">' +
														'<input id="ns1blankspaceSetupWebsiteRedirectURLOld" class="ns1blankspaceText">' +
														'</td></tr>');

										aHTML.push('<tr><td class="ns1blankspaceCaption">' +
														'Redirect to this URL' +
														'</td></tr>' +
														'<tr class="ns1blankspaceText">' +
														'<td class="ns1blankspaceText">' +
														'<input id="ns1blankspaceSetupWebsiteRedirectURLNew" class="ns1blankspaceText">' +
														'</td></tr>');


										aHTML.push('<tr><td class="ns1blankspaceCaption">' +
														'HTTP Status Text' +
														'</td></tr>' +
														'<tr class="ns1blankspaceText">' +
														'<td class="ns1blankspaceText">' +
														'<input id="ns1blankspaceSetupWebsiteRedirectStatusText" class="ns1blankspaceText">' +
														'</td></tr>');
														
										aHTML.push('</table>');					
										
										$('#ns1blankspaceRedirectColumn1').html(aHTML.join(''));

										$('#ns1blankspaceSetupWebsiteRedirectOldURL').focus();
										
										var aHTML = [];

										aHTML.push('<table class="ns1blankspaceColumn2">');
												
										aHTML.push('<tr><td>' +
														'<span class="ns1blankspaceAction" style="width:80px;" id="ns1blankspaceWebsiteRedirectSave">Save</span>' +
														'</td></tr>');
									
										aHTML.push('<tr><td>' +
														'<span class="ns1blankspaceAction" style="width:80px;" id="ns1blankspaceWebsiteRedirectCancel">Cancel</span>' +
														'</td></tr>');

										aHTML.push('<tr><td style="padding-top:16px;" class="ns1blankspaceSubNote">' +
													'A common status text is<br />301 Moved Permanently.' +
													'</td></tr>');	

										aHTML.push('<tr><td style="padding-top:16px;" class="ns1blankspaceSubNote">' +
													'The URLs need to be fully qualified, ie http://...' +
													'</td></tr>');	
														
										aHTML.push('</table>');	
	
										$('#ns1blankspaceRedirectColumn2').html(aHTML.join(''));
										
										$('#ns1blankspaceWebsiteRedirectSave').button(
										{
											text: "Save"
										})
										.click(function() 
										{
											var oData =
											{
												site: ns1blankspace.objectContext,
												urlold: $('#ns1blankspaceSetupWebsiteRedirectURLOld').val(),
												urlnew: $('#ns1blankspaceSetupWebsiteRedirectURLNew').val(),
												statustext: $('#ns1blankspaceSetupWebsiteRedirectStatusText').val(),
												id: sID
											}	
											
											ns1blankspace.status.working();

											//ns1blankspace.util.endpointURI('SETUP_SITE_URL_REDIRECT_MANAGE')'
											$.ajax(
											{
												type: 'POST',
												url: '/rpc/setup/?method=SETUP_SITE_URL_REDIRECT_MANAGE',
												data: oData,
												dataType: 'json',
												success: function(data)
												{
													if (data.status == 'OK')
													{	
														ns1blankspace.status.message('Redirect added.')
														ns1blankspace.show({selector: '#ns1blankspaceMainRedirects', refresh: true});
														ns1blankspace.setup.website.redirects.show();
													}
													else
													{
														ns1blankspace.status.error(data.error.errornotes);
													}	
												}
											});
										});
										
										$('#ns1blankspaceWebsiteRedirectCancel').button(
										{
											text: "Cancel"
										})
										.click(function() 
										{
											ns1blankspace.show({selector: '#ns1blankspaceMainRedirects', refresh: true});
														ns1blankspace.setup.website.redirects.show();
										});
										
										if (sID != undefined)
										{
											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_SITE_URL_REDIRECT_SEARCH';
											oSearch.addField('statustext,urlnew,urlold');
											oSearch.addFilter('site', 'EQUAL_TO', ns1blankspace.objectContext)
											oSearch.rf = 'json';
											
											oSearch.getResults(function(data)
											{
												ns1blankspace.setup.website.redirects.add(oParam, data)
											});
										}
									}
									else
									{
										if (oResponse.data.rows.length != 0)
										{
											var oObjectContext = oResponse.data.rows[0];
											$('#ns1blankspaceSetupWebsiteRedirectURLOld').val(oObjectContext.urlold);
											$('#ns1blankspaceSetupWebsiteRedirectURLNew').val(oObjectContext.urlnew);
											$('#ns1blankspaceSetupWebsiteRedirectStatusText').val(oObjectContext.statustext);
										}
									}		
								}
				},						

	save: 		{
					send:		function (oParam, oResponse)
								{
									if (oResponse == undefined)
									{
										ns1blankspace.status.working();
										
										var oData = ns1blankspace.util.getParam(oParam, 'data').value;

										if (oData == undefined)
										{	
											var sCSSAttachment;

											oData = {};
											
											if (ns1blankspace.objectContext != -1)
											{
												oData.id = ns1blankspace.objectContext;
											}
											else
											{
												sCSSAttachment = 0;
											}
											
											if ($('#ns1blankspaceMainDetails').html() != '')
											{
												oData.title = $('#ns1blankspaceDetailsTitle').val();
												oData.email = $('#ns1blankspaceDetailsEmail').val();
												oData.status = $('input[name="radioStatus"]:checked').val();	
											}

											if ($('#ns1blankspaceMainLayout').html() != '')
											{
												oData.headerheight = $('#ns1blankspaceLayoutHeaderHeight').val();
												oData.footerheight = $('#ns1blankspaceLayoutFooterHeight').val();
												oData.columns = $('#ns1blankspaceLayoutColumns').val();
												oData.layout = $('input[name="radioLayout"]:checked').val();
												oData.templatedocument = $('input[name="radioTemplateDocument"]:checked').val();
												sCSSAttachment = $('input[name="radioCSSAttachment"]:checked').val();
												ns1blankspace.objectContextData.cssattachment = sCSSAttachment;
												ns1blankspace.objectContextData.cssuri = undefined;
											}
											
											if ($('#ns1blankspaceMainAdvanced').html() != '')
											{
												oData.ondemandstatus = $('input[name="radioAppStatus"]:checked').val();	
												oData.usekeywordsastitle = $('input[name="radioTitle"]:checked').val();
												oData.documenttype = $('#ns1blankspaceAdvancedDocumentType').val();
												oData.bodytag = $('#ns1blankspaceAdvancedBodyTag').val();
											}
											
											if ($('#ns1blankspaceMainScripts').html() != '')
											{
												oData.headerscript = $('#ns1blankspaceScriptsHeader').val();
												oData.footerscript = $('#ns1blankspaceScriptsFooter').val();
											}
											
											if (sCSSAttachment != undefined)
											{
												oData.cssattachment = sCSSAttachment;
											}	
										}

										if (oData.cssattachment == -1) {oData.cssattachment = 0}

										ns1blankspace.status.working();

										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('SETUP_SITE_MANAGE'),
											data: oData,
											dataType: 'json',
											success: function(data) {ns1blankspace.setup.website.save.send(oParam, data)}
										});
									}
									else
									{			
										if (oResponse.status == 'OK')
										{	
											ns1blankspace.status.message('Saved');
											
											if (ns1blankspace.objectContext == -1)
											{
												ns1blankspace.objectContext = oResponse.id;
												ns1blankspace.inputDetected = false;
												ns1blankspace.setup.website.search.send('-' + ns1blankspace.objectContext, {source: 1});
											}	
										}
										else
										{
											ns1blankspace.status.error('Could not save the website!');
										}
									}
								}
				},

	attachments:
				{
					add:	function ()
								{
									var aHTML = [];
									
									aHTML.push('<table class="ns1blankspaceContainer">' +
													'<tr class="ns1blankspaceContainer">' +
													'<td id="ns1blankspaceAddAttachmentColumn1" class="ns1blankspaceColumn1"></td>' +
													'<td id="ns1blankspaceAddAttachmentColumn2" class="ns1blankspaceColumn2"></td>' +
													'</tr>' + 
													'</table>');		
										
									$('#ns1blankspaceAddAttachment').html(aHTML.join(''));

									$('#ns1blankspaceAddAttachmentColumn1').html(ns1blankspace.attachments.upload.show(1, 40));
									
									$('#spanInterfaceMainUpload').button(
										{
											label: "Upload"
										})
										.click(function() {
											 ns1blankspace.attachments.setup.website.attachments.upload();
										})
								},

					updload:	function ()
								{
									var oForm = document.ns1blankspaceFileUpload;
								  	oForm.submit();
								},

					status:		function ()  //???
								{
									var oDivStatus = document.getElementById('divonDemandFileUploadStatus');
									var oFrame = document.getElementById('ifonDemandUpload');
									var sStatus;
									var sCurrentState;
								 
									if (oFrame.readyState) 
									{
										sCurrentState = oFrame.readyState;
									}
									else 
									{
										if (oFrame.contentDocument.body.innerHTML == 'OK') 
										{
											sCurrentState = 'complete';
										}
										else 
										{
											sCurrentState = oFrame.contentDocument.body.innerHTML;
										}
									}
								 
									if (sCurrentState == 'complete') 
									{
										clearInterval(iOnDemandTimer);

										if (oDivStatus != null)
										{
											oDivStatus.setAttribute("class", "");
											oDivStatus.style.display = 'none';
										}
										$.blockUI({ message: "<h2>File Upload Complete..</h2>", timeout: 500 });
									}
								}
				},				

	webapp:		function (oParam, oResponse)
				{
					var sAction; 
					
					if (oParam != undefined)
					{
						if (oParam.action != undefined) {sAction = (oParam.action).toLowerCase()}
					}
					
					if (sAction == undefined)
					{
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspace">');
								
						aHTML.push('<tr class="ns1blankspace">' +
										'<td class="ns1blankspace">' +
										'<span style="width:250px;font-size:0.875em" id="ns1blankspaceWebappjQuery">1blankspace jQuery</span>' +
										'</td>' +
										'<td style="width:25px;"></td>' +
										'<td class="ns1blankspace">' +
										'<span style="width:250px;font-size:0.875em" id="ns1blankspaceWebappjQueryMobile">1blankspace jQuery Mobile</span>' +
										'</td></tr>');
										
						aHTML.push('<tr class="ns1blankspace">' +
										'<td style="padding-top:15px;font-size:0.875em;color:#404040;">' +
										'Set the header scripts to reference the <a href="http://mydigitalstructure.com/1blankspace" target="_blank">1blankspace namespace</a>.' +
										'</td>' +
										'<td style="width:25px;"></td>' +
										'<td style="padding-top:15px;font-size:0.875em;color:#404040;">' +
										'Set the header scripts to reference the 1blankspace jQuery Mobile framework / design pattern.' +
										'</td></tr>');
										
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainWebapp').html(aHTML.join(''));
						
						$('#ns1blankspaceWebappjQuery').button(
						{
							text: "1blankspace jQuery"
						})
						.click(function() 
						{
							ns1blankspace.setup.website.webapp({action: 'jquery'});
						});
						
						$('#ns1blankspaceWebappjQueryMobile').button(
						{
							text: "1blankspace jQuery Mobile"
						})
						.click(function() 
						{
							ns1blankspace.setup.website.webapp({action: 'jquerymobile'});
						});
					}
					else
					{
						if (oResponse == undefined)
						{
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_SITE_MANAGE'),
								data: 'id=' + ns1blankspace.objectContext + '&createapp=' + sAction,
								dataType: 'json',
								success: function(data) {ns1blankspace.setup.website.webapp(oParam, data)}
							});
						}
						else
						{
							if (oResponse.status == 'OK')
							{
								$('#ns1blankspaceMainWebapp').html('Webapp created.')
								
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('SETUP_SITE_SEARCH'),
									data: 'id=' + ns1blankspace.objectContext,
									dataType: 'json',
									success: function(oResponse)
									{
										$('#ns1blankspaceMainScripts').attr('data-loading', '1');
										ns1blankspace.objectContextData.headerscript = (oResponse.data.rows[0]).headerscript;
										$('#ns1blankspaceMainLayout').attr('data-loading', '1');
										ns1blankspace.objectContextData.layout = 3;
									}
								});
								
							}
							else
							{
								$('#ns1blankspaceMainWebapp').html('Somethings gone wrong!')
							}
						}
					}		
				},

	remove: 	function (oParam, oResponse)
				{		
					var sVerifyCode;
					var sUserVerifyCode;
					
					if (oParam != undefined)
					{
						if (oParam.verifyCode != undefined) {sVerifyCode = oParam.verifyCode}
						if (oParam.userVerifyCode != undefined) {sUserVerifyCode = oParam.userVerifyCode}
					}
					
					if (sVerifyCode == undefined && ns1blankspace.objectContext != -1)
					{							
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('SETUP_SITE_MANAGE'),
							data: 'remove=1&id=' + ns1blankspace.objectContext,
							dataType: 'json',
							success: function(data){ns1blankspace.setup.website.remove({verifyCode: data.verifycode})}
						});
							
					}
					else if (sVerifyCode != undefined && sUserVerifyCode == undefined)
					{
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceViewControlContainer" style="width:225px;">');
								
						aHTML.push('<tr><td class="ns1blankspace">' +
										'Enter verification code: ' + sVerifyCode +
										'</td></tr>' +
										'<tr>' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceSetupWebsiteRemoveVerify" class="ns1blankspaceText" style="width:150px;">' +
										'</td></tr>' +
										'<tr class="ns1blankspaceText">' +
										'<td class="ns1blankspaceText">' +
										'<span id="ns1blankspaceSetupWebsiteRemoveVerifyRemove" class="ns1blankspaceAction">Delete this website</span>' +
										'</td></tr>');
										
						aHTML.push('</table>');					
						
						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						
						$('#ns1blankspaceSetupWebsiteRemoveVerifyRemove').button(
						{
							text: "Delete this website"
						})
						.click(function() 
						{
							ns1blankspace.setup.website.remove({verifyCode: sVerifyCode, userVerifyCode: $('#ns1blankspaceSetupWebsiteRemoveVerify').val()})
						});
					
					}
					else if (sVerifyCode != undefined && sUserVerifyCode != undefined && oResponse == undefined)
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('SETUP_SITE_MANAGE'),
							data: 'remove=1&id=' + ns1blankspace.objectContext + '&verifycode=' + sUserVerifyCode,
							dataType: 'json',
							success: function(data){ns1blankspace.setup.website.remove(oParam, data)}
						});

					}
					else if (oResponse != undefined)
					{
						if (oResponse.notes == 'REMOVED')
						{
							ns1blankspace.inputDetected = false;
							ns1blankspace.app.options.hide();
							ns1blankspace.setup.website.init();
							ns1blankspace.status.message("Website removed");
						}
						else
						{
							ns1blankspace.status.error('Cannot remove website!')
						}
					}	
					else
					{
						ns1blankspace.status.error('Cannot remove website!')
					}	
				}
}