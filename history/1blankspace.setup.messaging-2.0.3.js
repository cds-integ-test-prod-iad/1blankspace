/*!
 * ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed as Attribution-ShareAlike 4.0 International
 * http://creativecommons.org/licenses/by-sa/4.0/
 */
 
ns1blankspace.setup.messaging = 
{
	data: 		{
					verificationText: {1: 'Not Verified', 2: 'Suspended', 3: 'Verified'}
				},

	init: 		function (oParam)
				{
					var bShowHome = true
					
					if (oParam != undefined)
					{
						if (oParam.showHome != undefined) {bShowHome = oParam.showHome}	
					}

					ns1blankspace.app.reset();

					ns1blankspace.object = 154;
					ns1blankspace.objectParentName = 'setup';
					ns1blankspace.objectName = 'messaging';
					ns1blankspace.viewName = 'Messaging';
					ns1blankspace.objectMethod = 'SETUP_MESSAGING_ACCOUNT';
					
					ns1blankspace.app.set(oParam);
				},

	home: 		function (oParam, oResponse)
				{
					if (oResponse == undefined)
					{
						$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);

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
									
						aHTML.push('<table>');

						aHTML.push('<tr><td><div id="ns1blankspaceViewMessagingEmailLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
								
						aHTML.push('</table>');		
						
						$('#ns1blankspaceControl').html(aHTML.join(''));	

						var oSearch = new AdvancedSearch();
						oSearch.method = 'SETUP_MESSAGING_ACCOUNT_SEARCH';
						oSearch.addField('email,usertext,verification');
						oSearch.addFilter('type', 'EQUAL_TO', 5);
						oSearch.rows = 50;
						oSearch.sort('email', 'asc');
						oSearch.getResults(function (data) {ns1blankspace.setup.messaging.home(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table>' +
											'<tr><td class="ns1blankspaceNothing">Click New to create an IMAP messaging account.</td></tr>' +
											'</table>');
						}
						else
						{
							aHTML.push('<table>');
							aHTML.push('<tr><td class="ns1blankspaceCaption">MOST LIKELY</td><td class="ns1blankspaceCaption">User</td><td class="ns1blankspaceCaption">Sending Status</td></tr>');

							$.each(oResponse.data.rows, function()
							{
								aHTML.push('<tr class="ns1blankspaceRow">');
								
								aHTML.push('<td id="ns1blankspaceMostLikely_title-' + this.id + 
														'" class="ns1blankspaceMostLikely" style="width:250px; padding-right:15px;">' +
														this.email +
														'</td>');

								aHTML.push('<td id="ns1blankspaceMostLikely_usertext-' + this.id + 
														'" class="ns1blankspaceSubNote" style="width:150px;">' +
														this.usertext +
														'</td>');

								aHTML.push('<td id="ns1blankspaceMostLikely_usertext-' + this.id + 
														'" class="ns1blankspaceSubNote">' +
														ns1blankspace.setup.messaging.data.verificationText[this.verification] +
														'</td>');
								
								aHTML.push('</tr>');
							});
							
							aHTML.push('</table>');			
						}
						
						$('#ns1blankspaceMostLikely').html(aHTML.join(''));
					
						$('td.ns1blankspaceMostLikely').click(function(event)
						{
							ns1blankspace.setup.messaging.search.send(event.target.id, {source: 1});
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
										oSearch.method = 'SETUP_MESSAGING_ACCOUNT_SEARCH';
										oSearch.addField('email,type,typetext,authtype,authtypetext,accountname,server,port,sslport,title,user,usertext,footer,smtpserver,smtpserverport,smtpaccountname,smtpencrypted,verification,verificationtext');
										oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContext);
										oSearch.getResults(function(data) {ns1blankspace.setup.messaging.show(data)});
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
											sElementId = 'ns1blankspace.ViewControlBrowse';
										}
										
										if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
										{	
											ns1blankspace.search.start();
											
											var oSearch = new AdvancedSearch();
											oSearch.method = 'SETUP_MESSAGING_ACCOUNT_SEARCH';
											oSearch.addField('email');
											oSearch.addFilter('type', 'EQUAL_TO', 5);

											if (iSource == ns1blankspace.data.searchSource.browse)
											{
												oSearch.addFilter('email', 'TEXT_STARTS_WITH', sSearchText);
											}
											else
											{	
												oSearch.addFilter('email', 'TEXT_IS_LIKE', sSearchText);
											}	
											
											ns1blankspace.search.advanced.addFilters(oSearch);

											oSearch.getResults(ns1blankspace.setup.messaging.search.process);
										}
									};	
								},

					process:	function (oResponse)
								{
									var iColumn = 0;
									var	iMaximumColumns = 1;
									var aHTML = [];

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
															this.email + '</td>');
											
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
											ns1blankspace.setup.messaging.search.send(event.target.id, {source: 1});
										});

										ns1blankspace.render.bind(
										{
											columns: 'email',
											more: oResponse.moreid,
											startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
											functionSearch: ns1blankspace.setup.messaging.search.send
										});
									}			
								}
				},				

	layout:	function ()
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

						aHTML.push('<tr><td id="ns1blankspaceControlFooter" class="ns1blankspaceControl">' +
										'Footer</td></tr>');

						aHTML.push('</table>');	
						
						aHTML.push('<table class="ns1blankspaceControl">');

						aHTML.push('<tr><td id="ns1blankspaceControlSharing" class="ns1blankspaceControl">' +
										'Sharing</td></tr>');
					}	
					
					aHTML.push('</table>');					
								
					$('#ns1blankspaceControl').html(aHTML.join(''));
					
					var aHTML = [];

					aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainFooter" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainSharing" class="ns1blankspaceControlMain"></div>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));

					$('#ns1blankspaceControlSummary').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
						ns1blankspace.setup.messaging.summary();
					});
					
					$('#ns1blankspaceControlDetails').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
						ns1blankspace.setup.messaging.details();
					});

					$('#ns1blankspaceControlFooter').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainFooter'});
						ns1blankspace.setup.messaging.footer();
					});

					$('#ns1blankspaceControlSharing').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainSharing', refresh: true});
						ns1blankspace.setup.messaging.sharing.show();
					});
				},

	show:		function (oResponse)
				{
					ns1blankspace.app.clean();
					ns1blankspace.setup.messaging.layout();
					
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						ns1blankspace.objectContextData = undefined;
						
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this messaging IMAP account.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						ns1blankspace.objectContextData = oResponse.data.rows[0];
					
						var sContext = ns1blankspace.objectContextData.email;
						var aContext = sContext.split("@");
						
						sContext = aContext[0];
						
						for (var i = 1; i < aContext.length; i++)
						{
							sContext += '<br />@' + aContext[i];
						}
						
						$('#ns1blankspaceControlContext').html(sContext);
						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
						
						ns1blankspace.history.view(
						{
							newDestination: 'ns1blankspace.setup.messaging.init({id: ' + ns1blankspace.objectContext + '})',
							move: false
						});
						
						ns1blankspace.history.control({functionDefault: 'ns1blankspace.setup.messaging.summary()'});
					}	
				},	
		
	summary:		function ()
				{
					var aHTML = [];
					
					if (ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td valign="top">Sorry can\'t find this messaging IMAP account.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						aHTML.push('<table class="ns1blankspaceMain">' +
									'<tr class="ns1blankspaceRow">' +
									'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Large"></td>' +
									'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2Action" style="width:230px;"></td>' +
									'</tr>' +
									'</table>');				
						
						$('#ns1blankspaceMainSummary').html(aHTML.join(''));

						var aHTML = [];

						aHTML.push('<table class="ns1blankspace">');
						
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Email</td></tr>' +
										'<tr><td id="ns1blankspaceSummaryEmail" class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.email +
										'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Incoming Server (IMAP)</td></tr>' +
										'<tr><td id="ns1blankspaceSummaryServer" class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.server +
										'</td></tr>');			
						
						aHTML.push('</table>');					
						
						$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2">');
						
						aHTML.push('<tr><td id="ns1blankspaceVerificationContainer" class="ns1blankspaceSummaryCaption">');

						if (ns1blankspace.objectContextData.verification == '2')
						{
							aHTML.push('SUSPENDED</td></tr><tr><td class="ns1blankspaceSubNote" style="padding-top:8px;">This messaging account has been suspended.</td></tr>')
						}
						
						if (ns1blankspace.objectContextData.verification == '3')
						{
							aHTML.push('VERIFIED</td></tr><tr><td class="ns1blankspaceSubNote" style="padding-top:8px;">This messaging account can<br />now send emails.</td></tr>')
						}
						
						if (ns1blankspace.objectContextData.verification == '1' || ns1blankspace.objectContextData.verification == undefined)
						{
							aHTML.push('NOT VERIFIED FOR SENDING')
							aHTML.push('</td></tr>');
							aHTML.push('<tr><td class="ns1blankspaceSubNote" style="padding-top:8px;">Send a request for verification to <a href="mailto:verify@ibcom.biz">verify@ibcom.biz</a>.</td></tr>');
						}

						aHTML.push('<tr><td>&nbsp;</td></tr>');
						aHTML.push('<tr><td><span class="ns1blankspaceAction" id="ns1blankspaceAccountFullRefresh">Reset Inbox</span></td></tr>');	
						
						aHTML.push('</table>');								
						
						$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));

						$('#ns1blankspaceAccountFullRefresh')
						.button(
						{
							label: 'Reset Inbox'
						})
						.on('click', function()
						{
							var oButtons = 
							[
								{
									text: "Yes", icons: {primary: 'ui-icon-check'}, 
									click: function() 
									{
										$(this).dialog('close');
										ns1blankspace.setup.messaging.fullRefresh({account: ns1blankspace.objectContext});
									}
								},
								{
									text: "No", icons: {primary: 'ui-icon-check'}, 
									click: function() {$(this).dialog('close')}
								}
							];

							ns1blankspace.container.confirm(
							{
								title: 'Full Inbox Reset',
								html: 'Are you sure you want to do a full inbox reset? This could take some time.',
								buttons: oButtons
							});
						});
					}	
				},

	fullRefresh: 	function(oParam)
				{
					var iAccount = ns1blankspace.util.getParam(oParam, 'account').value;
					var sCheckParams = ns1blankspace.util.getParam(oParam, 'checkParams', {'default': ''}).value;
					oParam.localParms = ns1blankspace.util.getParam(oParam, "localParms", {'default': {}}).value

					if (iAccount == undefined)
					{
						ns1blankspace.status.error('No messaging account passed. Please contact support.');
					}
					else
					{
						var oData = ($.type("sCheckParams") == 'object') ? sCheckParams : {};
						if (sCheckParams != "")
						{
							$.each(sCheckParams.split('&'), function()
							{
								oData[this.split('=').shift()] = this.split('=').pop();
							});
						}

						oData.account = iAccount;
						oData.fullrefresh = (oParam.localParms.startIndex == undefined) ? '1' : '0';
						if (oParam.localParms.startIndex != undefined) {oData.startIndex = oParam.localParms.startIndex;}
						if (oParam.localParms.stopIndex != undefined) {oData.stopIndex = oParam.localParms.stopIndex;}

						ns1blankspace.status.working('Searching for emails' + 
													((oParam.localParms.startIndex) 
														? " from row " + oParam.localParms.startIndex + " to " + oParam.localParms.stopIndex + " of " + oParam.localParms.fullCount
														: ": Most recent 100")
													);
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_CACHE_CHECK'),
							data: oData,
							success: function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									if (oResponse.newrows == '100')
									{
										ns1blankspace.status.message('Retrieving older emails..')
										oParam.localParms.fullCount = (oParam.localParms.stopIndex == undefined) ? oResponse.stopIndex : oParam.localParms.fullCount;
										oParam.localParms.startIndex = Number(oResponse.startindex) - 100;
										oParam.localParms.stopIndex = Number(oResponse.stopindex) - 100;
										if (oParam.localParms.startIndex < 0) {oParam.localParms.startIndex = 0}
										if (oParam.localParms.stopIndex < 0) {oParam.localParms.stopIndex = 0}
										ns1blankspace.setup.messaging.fullRefresh(oParam)
									}
									else if (oResponse.newrows == undefined)
									{	
										if (oResponse.warning)
										{
											ns1blankspace.status.error("Caching process is already running on this account. Please log off and try again.");
											delete(oParam.localParms);
										}
									}
									else
									{	
										delete(oParam.localParms);
										ns1blankspace.status.message('Account Cache Refreshed..');
										if (oParam.onComplete)
										{
											ns1blankspace.util.onComplete(oParam);
										}
									}
								}
								else
								{
									delete(oParam.localParms);
									ns1blankspace.status.error('Error refreshing account cache: ' + 
												((oResponse.error.errorcode == '3') ? "You do not have access to this account." : oResponse.error.errornotes));
								}
							}
						});
					}
				},				

	details:		function ()
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
										'User' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceSelect">' +
										'<input id="ns1blankspaceDetailsUser" class="ns1blankspaceSelect"' +
											' data-method="SETUP_USER_SEARCH"' +
											' data-columns="username">' +
										'</td></tr>');			

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Email' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsEmail" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceHeaderCaption" style="padding-top:18px;">INCOMING (IMAP)</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Account Name' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsAccountName" class="ns1blankspaceText">' +
										'</td></tr>');	

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Account Password' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsAccountPassword" class="ns1blankspaceText" type="password">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Server' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsServer" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Port' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsPort" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'SSL Port' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsSSLPort" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceHeaderCaption" style="padding-top:18px;">OUTGOING (SMTP)</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Server' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsSMTPServer" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Port' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsSMTPPort" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Use Encrytion (SSL/TLS)' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRadio">' +
										'<input type="radio" id="radioEncrytedY" name="radioEncryted" value="Y"/>Yes' +
										'<br /><input type="radio" id="radioEncrytedN" name="radioEncryted" value="N"/>No' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Account Name' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsSMTPAccountName" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Account Password' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsSMTPAccountPassword" class="ns1blankspaceText" type="password">' +
										'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceSubNote">' +
										'If you leave server details blank; defaults will be used.</td></tr>');
		
						aHTML.push('</table>');					
						
						$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
						
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2">');
					
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Type' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRadio">' +
										'<input type="radio" id="radioType5" name="radioType" value="5"/>Email' +
										'</td></tr>');
	
						aHTML.push('</table>');					
						
						$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));
						
						if (ns1blankspace.objectContextData != undefined)
						{
							if (ns1blankspace.objectContextData.smtpencrypted == '') {ns1blankspace.objectContextData.smtpencrypted = 'Y'}

							$('#ns1blankspaceDetailsUser').val(ns1blankspace.objectContextData.usertext);
							$('#ns1blankspaceDetailsUser').attr('data-id', ns1blankspace.objectContextData.user);
							$('#ns1blankspaceDetailsEmail').val(ns1blankspace.objectContextData.email);
							$('[name="radioType"][value="' + ns1blankspace.objectContextData.type + '"]').attr('checked', true);
							$('#ns1blankspaceDetailsAccountName').val(ns1blankspace.objectContextData.accountname);
							$('#ns1blankspaceDetailsServer').val(ns1blankspace.objectContextData.server);
							$('#ns1blankspaceDetailsPort').val(ns1blankspace.objectContextData.port);
							$('#ns1blankspaceDetailsSSLPort').val(ns1blankspace.objectContextData.sslport);
							$('#ns1blankspaceDetailsSMTPServer').val(ns1blankspace.objectContextData.smtpserver);
							$('#ns1blankspaceDetailsSMTPPort').val(ns1blankspace.objectContextData.smtpserverport);
							$('#ns1blankspaceDetailsSMTPAccountName').val(ns1blankspace.objectContextData.smtpaccountname);
							$('[name="radioEncryted"][value="' + ns1blankspace.objectContextData.smtpencrypted + '"]').attr('checked', true);		
						}
						else
						{
							$('[name="radioType"][value="5"]').attr('checked', true);
							$('[name="radioEncryted"][value="Y"]').attr('checked', true);
						}
					}	
				},

	footer:		function ()
				{
					var aHTML = [];

					if ($('#ns1blankspaceMainFooter').attr('data-loading') == '1')
					{
						$('#ns1blankspaceMainFooter').attr('data-loading', '');
						
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspace">');
						
						aHTML.push('<tr><td class="ns1blankspaceTextMulti">' +
										'<textarea rows="50" cols="50" id="ns1blankspaceFooterText" class="ns1blankspaceTextMultiLarge"></textarea>' +
										'</td></tr>');		
								
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainFooter').html(aHTML.join(''));
							
						if (ns1blankspace.objectContextData != undefined)
						{
							$('#ns1blankspaceFooterText').val((ns1blankspace.objectContextData.footer).formatXHTML());
						}
					}	
				},

	save: 	{
					send:		function()
								{
									ns1blankspace.status.working();
									
									var sData = '_=1';
									
									if (ns1blankspace.objectContext != -1)
									{
										sData += '&id=' + ns1blankspace.objectContext	
									}	
									
									if ($('#ns1blankspaceMainDetails').html() != '')
									{
										var sServer = ns1blankspace.util.fs($('#ns1blankspaceDetailsServer').val());
										if (sServer == '') {sServer = 'imap.gmail.com'}

										var sSSLPort = $('#ns1blankspaceDetailsSSLPort').val();
										var sPort = $('#ns1blankspaceDetailsPort').val();
										if (sSSLPort == '' && sPort == '') {sSSLPort = '993'}	

										sData += '&user=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsUser').attr("data-id"));
										sData += '&email=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsEmail').val());
										sData += '&title=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsEmail').val());
										sData += '&address=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsEmail').val());
										sData += '&type=' + ns1blankspace.util.fs($('input[name="radioType"]:checked').val());
										sData += '&accountname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsAccountName').val());
										sData += '&server=' + sServer;
										sData += '&cachetype=1';
										sData += '&sslport=' + sSSLPort;
										sData += '&port=' + sPort;
										sData += '&authtype=0';
										sData += '&smtpserver=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSMTPServer').val());
										sData += '&smtpserverport=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSMTPPort').val());
										sData += '&smtpencrypted=' + ns1blankspace.util.fs($('input[name="radioEncryted"]:checked').val());

										if ($('#ns1blankspaceDetailsAccountPassword').val() != '')
										{
											sData += '&accountpassword=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsAccountPassword').val());
										}

										if ($('#ns1blankspaceDetailsSMTPAccountPassword').val() != '')
										{
											sData += '&smtpaccountname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSMTPAccountName').val());
											sData += '&smtpaccountpassword=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSMTPAccountPassword').val());
										}
									};

									if ($('#ns1blankspaceMainFooter').html() != '')
									{
										sData += '&footer=' + ns1blankspace.util.fs($('#ns1blankspaceFooterText').val());
									}	

									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('SETUP_MESSAGING_ACCOUNT_MANAGE'),
										data: sData,
										dataType: 'json',
										success: function()
										{
											ns1blankspace.inputDetected = false;
											ns1blankspace.status.message('Saved');
											ns1blankspace.setup.messaging.home();
										}
									});		
								}
				},

	sharing: 	{
					show:		function (oParam, oResponse)
								{
									var iObjectContext = ns1blankspace.objectContext;
										
									if (oResponse == undefined)
									{	
										var oSearch = new AdvancedSearch();
										oSearch.method = 'SETUP_MESSAGING_ACCOUNT_SHARE_SEARCH';
										oSearch.addField('user,usertext');
										oSearch.addFilter('account', 'EQUAL_TO', ns1blankspace.objectContext);
										oSearch.getResults(function(data) {ns1blankspace.setup.messaging.sharing.show(oParam, data)});
									}
									else
									{
										var aHTML = [];
											
										aHTML.push('<table class="ns1blankspaceContainer">' +
														'<tr class="ns1blankspaceContainer">' +
														'<td id="ns1blankspaceSharingColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
														'<td id="ns1blankspaceSharingColumn2" class="ns1blankspaceColumn2" style="width:250px;"></td>' +
														'</tr>' + 
														'</table>');

										$('#ns1blankspaceMainSharing').html(aHTML.join(''));
										
										var aHTML = [];
											
										aHTML.push('<table class="ns1blankspaceColumn2">');
										
										aHTML.push('<tr><td class="ns1blankspaceAction">' +
													'<span id="ns1blankspaceMessagingSharingAdd">Add</span>' +
													'</td></tr>');
													
										aHTML.push('<tr><td style="padding-top:20px;" class="ns1blankspaceSubNote">' +
													'Share this messaging (email) account with other users within your space.' +
													'</td></tr>');			
									
										aHTML.push('</table>');					
										
										$('#ns1blankspaceSharingColumn2').html(aHTML.join(''));
									
										$('#ns1blankspaceMessagingSharingAdd').button(
										{
											label: "Add"
										})
										.click(function()
										{
											 ns1blankspace.setup.messaging.sharing.add.show(oParam);
										});
											
										var aHTML = [];

										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">This account is not shared.</td></tr></table>');
	
											$('#ns1blankspaceSharingColumn1').html(aHTML.join(''));
										}
										else
										{
											aHTML.push('<div><table id="ns1blankspaceSetupMessagingSharing">');
											aHTML.push('<tr class="ns1blankspaceCaption">');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">User</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
											aHTML.push('</tr>');
		
											$.each(oResponse.data.rows, function(i, v)
											{
												aHTML.push('<tr class="ns1blankspaceRow">');
																
												aHTML.push('<td id="ns1blankspaceSetupMessagingSharing_user-' + v.id + '" class="ns1blankspaceRow">' +
																		v.usertext + '</td>');
																		
												aHTML.push('<td style="width:30px; text-align:right;" class="ns1blankspaceRow">');
													
												aHTML.push('<span id="ns1blankspaceSetupMessagingSharing_remove-' + v.id + '" class="ns1blankspaceRowRemove"></span>');
													
												aHTML.push('</td>');
																
												aHTML.push('</tr>');
											});
											
											aHTML.push('</table></div>');

											$('#ns1blankspaceSharingColumn1').html(aHTML.join(''));
												
											$('#ns1blankspaceSetupMessagingSharing span.ns1blankspaceRowRemove').button(
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
													method: 'SETUP_MESSAGING_ACCOUNT_SHARE_MANAGE',
													parentLevel: 2,
													ifNoneMessage: 'This account is not shared.'
												});
											})
											.css('width', '15px')
											.css('height', '17px');
										}
									}
								},

					add:		{
									show:		function (oParam, oResponse)
												{									
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

														aHTML.push('<table class="ns1blankspaceColumn2">');
																
														aHTML.push('<tr><td class="ns1blankspaceCaption">Search for user</td></tr>');
													
														aHTML.push('<tr><td class="ns1blankspaceText">' +
																	'<input id="ns1blankspaceSetupMessagingSharingUser" style="padding:3px;">' +
																	'</td></tr>');

														aHTML.push('<tr><td id="ns1blankspaceSetupMessagingSharingUserResults" style="padding-top:8px;">' +
																	'</td></tr>');
																		
														aHTML.push('</table>');	
					
														$('#ns1blankspaceSharingColumn2').html(aHTML.join(''));

														$('#ns1blankspaceSetupMessagingSharingUser').focus();

														$('#ns1blankspaceSetupMessagingSharingUser').keyup(function ()
														{
															if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
																ns1blankspace.timer.delayCurrent = setTimeout('ns1blankspace.setup.messaging.sharing.add.search()', ns1blankspace.option.typingWait);
														});
													}
												},

									search:		function (oParam, oResponse)
												{
													if (oResponse === undefined)
													{	
														$('#ns1blankspaceSetupMessagingSharingUserResults').html(ns1blankspace.xhtml.loadingSmall);

														var sMethod = $('#ns1blankspaceMessageSaveObjectValue :selected').attr('data-method');
														var sSearchText = $('#ns1blankspaceSetupMessagingSharingUser').val();
														
														var oSearch = new AdvancedSearch();
														oSearch.method = 'SETUP_USER_SEARCH';
														oSearch.addField('username');
														oSearch.addFilter('username', 'TEXT_IS_LIKE', sSearchText);
														oSearch.addOperator('and');
														oSearch.addFilter('id', 'NOT_EQUAL_TO', ns1blankspace.objectContextData.user);
														oSearch.rows = 20;
														oSearch.rf = 'json';
														oSearch.getResults(function(data) {ns1blankspace.setup.messaging.sharing.add.search(oParam, data)});
													}
													else
													{
														var aHTML = [];
									
														aHTML.push('<table style="font-size:0.875em;">');
														
														$.each(oResponse.data.rows, function(i, v) 
														{
															aHTML.push('<tr><td id="ns1blankspaceItem_title-' + v.id +'" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
																			v.username + '</td></tr>');	
														});
														
														aHTML.push('</table>');

														$('#ns1blankspaceSetupMessagingSharingUserResults').html(aHTML.join(''));

														$('#ns1blankspaceSetupMessagingSharingUserResults td.ns1blankspaceRowSelect')
														.click(function()
														{
															var oData = {account: ns1blankspace.objectContext, user: (this.id).split('-')[1]}

															$.ajax(
															{
																type: 'POST',
																url: ns1blankspace.util.endpointURI('SETUP_MESSAGING_ACCOUNT_SHARE_MANAGE'),
																data: oData,
																dataType: 'json',
																success: function(data)
																{
																	if (data.status == 'OK')
																	{
																		ns1blankspace.setup.messaging.sharing.show();
																	}	
																}
															});
														});
													}		
												}
								}
				}											
}								

