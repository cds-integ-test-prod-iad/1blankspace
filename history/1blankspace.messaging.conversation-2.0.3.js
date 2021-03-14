/*!
 * ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed as Attribution-ShareAlike 4.0 International
 * http://creativecommons.org/licenses/by-sa/4.0/
 */
 
if (ns1blankspace.messaging === undefined) {ns1blankspace.messaging = {}}
 
ns1blankspace.messaging.conversation = 
{
	init: 		function (oParam)
				{
					var bNew = false;
					
					if (oParam != undefined)
					{
						if (oParam["new"] != undefined) {bNew = oParam["new"]}	
					}

					if (bNew) {ns1blankspace.messaging.conversation.isConversationOwner = true}

					ns1blankspace.app.reset();

					ns1blankspace.object = 50;
					ns1blankspace.objectParentName = 'messaging';
					ns1blankspace.objectName = 'conversation';
					ns1blankspace.viewName = 'Conversations';
					
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
						aHTML.push('<tr><td><div id="ns1blankspaceViewMessagingConversationLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');		
						aHTML.push('</table>');		
						
						$('#ns1blankspaceControl').html(aHTML.join(''));	

						var oSearch = new AdvancedSearch();
						oSearch.method = 'MESSAGING_CONVERSATION_SEARCH';
						oSearch.addField('title');
						oSearch.rows = 20;
						oSearch.addFilter('status', 'NOT_EQUAL_TO', 2);
						oSearch.addFilter('sharing', 'NOT_EQUAL_TO', 2);
						oSearch.sort('modifieddate', 'desc');
						oSearch.getResults(function (data) {ns1blankspace.messaging.conversation.home(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table>' +
											'<tr><td class="ns1blankspaceNothing">Click New to create a conversation.</td></tr>' +
											'</table>');
						}
						else
						{
							aHTML.push('<table>');
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
							ns1blankspace.messaging.conversation.search.send(event.target.id, {source: 1});
						});
					}
				},

	search: 	{
					send:		function (sXHTMLElementID, oParam)
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
										oSearch.method = 'MESSAGING_CONVERSATION_SEARCH';
										oSearch.addField('alertemailfrom,alertemailmessage,alerturl,allowsmsalerts,commentcount,description,emailalertdefault,' +
															'includemessageinemailalert,lastcommentdate,owner,ownertext,lastcommentuser,lastcommentusertext,' +
															'lastpostedday,object,objectcontext,participantcan,participantcantext,postcount,sharing,sharingtext,title');

										oSearch.addField(ns1blankspace.option.auditFields);
										
										oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContext)
										oSearch.getResults(function(data) {ns1blankspace.messaging.conversation.show(oParam, data)});
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
											oSearch.method = 'MESSAGING_CONVERSATION_SEARCH';
											oSearch.addField('title');
											oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);

											ns1blankspace.search.advanced.addFilters(oSearch);
											
											oSearch.sort('title', 'asc');
											oSearch.getResults(function(data) {ns1blankspace.messaging.conversation.search.process(oParam, data)});
										}
									};	
								},

					process:	function (oParam, oResponse)
								{
									var iColumn = 0;
									var aHTML = [];
									var h = -1;
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
											
											aHTML.push('<td class="ns1blankspaceSearch" id="-' + this.id + '">' +
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
											ns1blankspace.messaging.conversation.search.send(event.target.id, {source: 1});
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
						aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl">' +
										'Summary</td></tr>');

						if (ns1blankspace.messaging.conversation.isConversationOwner)
						{	
							aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
										'Details</td></tr>');
						}

						aHTML.push('<tr><td id="ns1blankspaceControlParticipants" class="ns1blankspaceControl">' +
										'Participants</td></tr>');

						aHTML.push('</table>');
						
						aHTML.push('<table class="ns1blankspaceControl">');

						aHTML.push('<tr><td id="ns1blankspaceControlPosts" class="ns1blankspaceControl ns1blankspaceHighlight">' +
										'Posts</td></tr>');

						//aHTML.push('<tr><td id="ns1blankspaceControlComments" class="ns1blankspaceControl">' +
						//				'Comments</td></tr>');

						aHTML.push('</table>');
						
						aHTML.push('<table class="ns1blankspaceControl">');

						aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
										'Attachments</td></tr>');
					}	
					
					aHTML.push('</table>');					
								
					$('#ns1blankspaceControl').html(aHTML.join(''));
					
					var aHTML = [];

					aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainParticipants" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainParticipantsAdd" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainPosts" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainPostDetails" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainComments" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
						
					$('#ns1blankspaceMain').html(aHTML.join(''));

					$('#ns1blankspaceControlSummary').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
						ns1blankspace.messaging.conversation.summary();
					});
					
					$('#ns1blankspaceControlDetails').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
						ns1blankspace.messaging.conversation.details();
					});

					$('#ns1blankspaceControlParticipants').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainParticipants', context: {inContext: false}});
						ns1blankspace.messaging.conversation.participants.init();
					});

					$('#ns1blankspaceControlPosts').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainPosts', context: {inContext: false}});
						ns1blankspace.messaging.conversation.posts.show();
					});
				
					$('#ns1blankspaceControlComments').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainComments'});
						ns1blankspace.messaging.conversation.comments.show();
					});

					$('#ns1blankspaceControlAttachments').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
						ns1blankspace.attachments.show();
					});
				},

	show: 		function (oParam, oResponse)
				{
					ns1blankspace.app.clean();
					
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						ns1blankspace.objectContextData = undefined;
						
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this conversation.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));

						ns1blankspace.messaging.conversation.isConversationOwner = false;
					}
					else
					{
						ns1blankspace.objectContextData = oResponse.data.rows[0];
						ns1blankspace.messaging.conversation.isConversationOwner = (ns1blankspace.user.id == ns1blankspace.objectContextData.owner)

						ns1blankspace.messaging.conversation.layout();

						$('#ns1blankspaceControlContext').html(
								ns1blankspace.objectContextData.title + 
								'<br /><span id="ns1blankspaceControlContext_post" class="ns1blankspaceSub"></span>');

						if (ns1blankspace.messaging.conversation.isConversationOwner)
						{	
							$('#ns1blankspaceViewControlAction').button({disabled: false});
							$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
						}	
						
						ns1blankspace.history.view(
						{
							newDestination: 'ns1blankspace.messaging.conversation.init({id: ' + ns1blankspace.objectContext + '})',
							move: false
							});
						
						var sFunctionDefault = 'ns1blankspace.messaging.conversation.posts.show()';
						var sDefault = ns1blankspace.util.getParam(oParam, 'default').value;
						var sDefaultParam = ns1blankspace.util.getParam(oParam, 'defaultParam', {"default": ''}).value;

						if (sDefault !== undefined)
						{
							sFunctionDefault = sDefault + '(' + sDefaultParam + ')';
						}

						ns1blankspace.history.control({functionDefault: sFunctionDefault});
					}	
				},	
		
	summary:	function ()
				{
					var aHTML = [];
					
					if (ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td valign="top">Sorry can\'t find this conversation.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						aHTML.push('<table class="ns1blankspaceMain">' +
									'<tr class="ns1blankspaceRow">' +
									'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2Action" style="width:100px;"></td>' +
									'</tr>' +
									'</table>');				
						
						$('#ns1blankspaceMainSummary').html(aHTML.join(''));

						var aHTML = [];

						aHTML.push('<table class="ns1blankspace">');
						
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Owner</td></tr>' +
										'<tr><td id="ns1blankspaceSummaryOwner" class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.ownertext +
										'</td></tr>');

 						if (ns1blankspace.objectContextData.description != '')
						{	
							aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Description</td></tr>' +
										'<tr><td id="ns1blankspaceSummaryDescription" class="ns1blankspaceSummary">' +
										(ns1blankspace.objectContextData.description).formatXHTML() +
										'</td></tr>');
						}						
						
						aHTML.push('</table>');					
						
						$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));
				
						var aHTML = [];
			
						aHTML.push('<table class="ns1blankspaceColumn2">');
						
						if (ns1blankspace.messaging.conversation.isConversationOwner)
						{
							aHTML.push('<tr><td style="padding-top:10px;">' +
										'<span id="ns1blankspaceConversationAddParticipant" class="ns1blankspaceAction">Add&nbsp;Participant</span>' +
										'</td></tr>');
						}
						else
						{
							aHTML.push('<tr><td style="padding-top:10px;">' +
										'<span id="ns1blankspaceConversationRemoveParticipant" class="ns1blankspaceAction">Leave</span>' +
										'</td></tr>');
						}	
								
						aHTML.push('</table>');					
						
						$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	
						
						$('#ns1blankspaceConversationAddParticipant').button().click(function(event)
						{
							ns1blankspace.messaging.conversation.participants.add();
						});

						$('#ns1blankspaceConversationRemoveParticipant').button().click(function(event)
						{
							ns1blankspace.messaging.conversation.participants.leave();
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
							
						if (ns1blankspace.messaging.conversation.isConversationOwner)
						{
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
											'Sharing' +
											'</td></tr>' +
											'<tr class="ns1blankspace">' +
											'<td class="ns1blankspaceRadio">' +
											'<input type="radio" id="radioSharingY" name="radioSharing" value="1"/>Added Participants & Network Groups' +
											'<br /><input type="radio" id="radioSharingN" name="radioSharing" value="2"/>Everyone (Public)' +
											'<br /><input type="radio" id="radioSharingN" name="radioSharing" value="3"/>Internal' +
											'</td></tr>');	

							aHTML.push('<tr class="ns1blankspaceCaption">' +
											'<td class="ns1blankspaceCaption">' +
											'Participant Can' +
											'</td></tr>' +
											'<tr class="ns1blankspace">' +
											'<td class="ns1blankspaceRadio">' +
											'<input type="radio" id="radioParticipantCan1" name="radioParticipantCan" value="1"/>Add Posts & Comments' +
											'<br /><input type="radio" id="radioParticipantCan2" name="radioParticipantCan" value="2"/>Add Comments Only' +
											'<br /><input type="radio" id="radioParticipantCan3" name="radioParticipantCan" value="3"/>View Only' +
											'<br /><input type="radio" id="radioParticipantCan4" name="radioParticipantCan" value="4"/>Add Posts Only' +
											'</td></tr>');

							aHTML.push('<tr class="ns1blankspaceCaption">' +
											'<td class="ns1blankspaceCaption">' +
											'URL For Email Alerts' +
											'</td></tr>' +
											'<tr class="ns1blankspace">' +
											'<td class="ns1blankspaceText">' +
											'<input id="ns1blankspaceDetailsAlertURL" class="ns1blankspaceText">' +
											'</td></tr>');					
						}			
						else
						{
							aHTML.push('<tr><td class="ns1blankspaceNothing">Only the owner can change the conversation details.</td></tr>');
						}
						
						aHTML.push('</table>');					
						
						$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
						
						if (ns1blankspace.messaging.conversation.isConversationOwner)
						{
							var aHTML = [];
						
							aHTML.push('<table id="tablens1blankspaceMainDetailsColumn2" class="ns1blankspaceMain">');
							
							aHTML.push('<tr class="ns1blankspaceCaption">' +
											'<td class="ns1blankspaceCaption">' +
											'Description' +
											'</td></tr>' +
											'<tr class="ns1blankspace">' +
											'<td class="ns1blankspaceText">' +
											'<textarea id="ns1blankspaceDetailsDescription" rows="5" cols="35" class="ns1blankspaceTextMulti"></textarea>' +
											'</td></tr>');	

							aHTML.push('</table>');					
								
							$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));
						}	
						
						if (ns1blankspace.objectContextData != undefined)
						{
							$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData.title);
							$('#ns1blankspaceDetailsDescription').val(ns1blankspace.objectContextData.description);
							$('#ns1blankspaceDetailsAlertURL').val(ns1blankspace.objectContextData.alerturl);
							
							$('[name="radioSharing"][value="' + ns1blankspace.objectContextData.sharing + '"]').attr('checked', true);
							$('[name="radioParticipantCan"][value="' + ns1blankspace.objectContextData.participantcan + '"]').attr('checked', true);
						}
						else
						{
							$('[name="radioSharing"][value="1"]').attr('checked', true);
							$('[name="radioParticipantCan"][value="1"]').attr('checked', true);
						}		
					}	
				},

	participants: {
					init:		function (oParam)
								{
									var aHTML = [];
									
									aHTML.push('<table class="ns1blankspaceContainer">' +
													'<tr class="ns1blankspaceContainer">' +
													'<td id="ns1blankspaceParticipantsColumn1" class="ns1blankspaceColumn1Flexible">' +
													ns1blankspace.xhtml.loading + '</td>' +
													'<td id="ns1blankspaceParticipantsColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td>' +
													'</tr>' + 
													'</table>');
													
									$('#ns1blankspaceMainParticipants').html(aHTML.join(''));	
									
									if (ns1blankspace.messaging.conversation.isConversationOwner)
									{	
										var aHTML = [];1;	
										
										aHTML.push('<table class="ns1blankspaceColumn2">');
																		
										aHTML.push('<tr><td>' +
															'<span id="ns1blankspaceParticipantsAdd" class="ns1blankspaceAction">Add</span>' +
															'</td></tr>');
														
										aHTML.push('</table>');					
										
										$('#ns1blankspaceParticipantsColumn2').html(aHTML.join(''));	
									
										$('#ns1blankspaceParticipantsAdd').button(
											{
												label: "Add"
											})
											.click(function() {
												ns1blankspace.messaging.conversation.participants.add();
											})
									}		
									
									ns1blankspace.messaging.conversation.participants.show();
								},		

					show: 		function (oParam, oResponse)
								{
									var sLabel = "Participants";
									var iOption = 1;
									
									if (oParam != undefined)
									{
										if (oParam.label != undefined) {sLabel = oParam.label}
									}

									if (oResponse == undefined)
									{
										var oSearch = new AdvancedSearch();
										oSearch.method = 'MESSAGING_CONVERSATION_PARTICIPANT_SEARCH';
										oSearch.addField('user,username');
										oSearch.addCustomOption('conversation', ns1blankspace.objectContext);
										oSearch.addFilter('status', 'EQUAL_TO', 1)
										oSearch.rows = 100;
										oSearch.getResults(function(oResponse)
										{
											ns1blankspace.messaging.conversation.participants.show(oParam, oResponse)
										});
									}
									else
									{
										var aHTML = [];
										var h = -1;
										
										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">No participants.</td></tr></table>');

											$('#ns1blankspaceParticipantsColumn1').html(aHTML.join(''));
										}
										else
										{
											aHTML.push('<table id="ns1blankspaceConversationParticipants" class="ns1blankspace">');

											$.each(oResponse.data.rows, function()
											{
												aHTML.push('<tr class="ns1blankspaceRow">');
																
												aHTML.push('<td id="ns1blankspaceConversationParticipants_userlogonname-' + this.user + '" class="ns1blankspaceRow">' +
																		this.username + '</td>');
																
												if ((ns1blankspace.messaging.conversation.isConversationOwner && this.user != ns1blankspace.user.id) ||
														(!ns1blankspace.messaging.conversation.isConversationOwner && this.user == ns1blankspace.user.id))
												{					
													aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">' +
																	'<span id="ns1blankspaceConversationParticipants-' + this.id + '" class="ns1blankspaceRowDelete"></span>' +
																	'</td></tr>');
												}
												else
												{					
													aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow"></td></tr>');
												}

												aHTML.push('</tr>');		
											})
											
											aHTML.push('</table>');

											$('#ns1blankspaceParticipantsColumn1').html(aHTML.join(''));
											
											$('#ns1blankspaceConversationParticipants span.ns1blankspaceRowDelete').button(
											{
												text: false,
												icons: 
												{
													 primary: "ui-icon-close"
												}
											})
											.click(function()
											{
												ns1blankspace.messaging.conversation.participants.remove({xhtmlElementID: this.id});
											})
											.css('width', '15px')
											.css('height', '18px');				
										}
									}	
								},	

					add: 		function (oParam, oResponse)
								{
									var oSearch;
									
									if (oParam != undefined)
									{
										if (oParam.label != undefined) {sLabel = oParam.label}
										if (oParam.search != undefined) {oSearch = oParam.search}
									}
									
									if (oResponse == undefined)
									{		
										if (oSearch == undefined)
										{
											ns1blankspace.show({selector: '#ns1blankspaceMainParticipantsAdd'});
											
											var aHTML = [];
			
											aHTML.push('<table class="ns1blankspaceContainer">' +
															'<tr class="ns1blankspaceContainer">' +
															'<td id="ns1blankspaceParticipantsAddColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
															'<td id="ns1blankspaceParticipantsAddColumn2" class="ns1blankspaceColumn2" style="width:300px;"></td>' +
															'</tr>' + 
															'</table>');		
															
											$('#ns1blankspaceMainParticipantsAdd').html(aHTML.join(''));	
											
											var aHTML = [];
											
											aHTML.push('<table class="ns1blankspaceContainer">');
											
											aHTML.push('<tr class="ns1blankspaceCaption">' +
															'<td class="ns1blankspaceCaption">' +
															'First Name' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceText">' +
															'<input id="ns1blankspaceDetailsFirstName" class="ns1blankspaceText">' +
															'</td></tr>');	

											aHTML.push('<tr class="ns1blankspaceCaption">' +
															'<td class="ns1blankspaceCaption">' +
															'Last Name' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceText">' +
															'<input id="ns1blankspaceDetailsSurname" class="ns1blankspaceText">' +
															'</td></tr>');	
														

											aHTML.push('<tr class="ns1blankspaceCaption">' +
															'<td class="ns1blankspaceCaption">' +
															'Email' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceText">' +
															'<input id="ns1blankspaceDetailsEmail" class="ns1blankspaceText">' +
															'</td></tr>');
										
											aHTML.push('<tr class="ns1blankspaceCaption">' +
															'<td class="ns1blankspaceCaption">' +
															'Logon Name' +
															'</td></tr>' +
															'<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceText">' +
															'<input id="ns1blankspaceDetailsLogonName" class="ns1blankspaceText">' +
															'</td></tr>');
														
											aHTML.push('</table>');		
											
											aHTML.push('<table class="ns1blankspaceMainColumn2Action">');
												
											aHTML.push('<tr><td>' +
															'<span id="ns1blankspaceParticipantsAddSearch" class="ns1blankspaceAction">Search</span>' +
															'</td></tr>');
														
											aHTML.push('<tr><td class="ns1blankspaceSub" style="font-size:0.75em; padding-top:7px;">' +
															'You must enter full names.  eg First Name "John"' +
															'</td></tr>');
																		
											aHTML.push('</table>');					
										
											$('#ns1blankspaceParticipantsAddColumn1').html(aHTML.join(''))
											
											$('#ns1blankspaceParticipantsAddSearch').button(
											{
												label: "Search"
											})
											.click(function() {
											
												var oSearchSet = {}

												if ($('#ns1blankspaceDetailsFirstName').val() != '')
												{
													oSearchSet.firstName = $('#ns1blankspaceDetailsFirstName').val()
												}
												if ($('#ns1blankspaceDetailsSurname').val() != '')
												{
													oSearchSet.surname = $('#ns1blankspaceDetailsSurname').val()
												}
												if ($('#ns1blankspaceDetailsEmail').val() != '')
												{
													oSearchSet.email = $('#ns1blankspaceDetailsEmail').val()
												}
												if ($('#ns1blankspaceDetailsLogonName').val() != '')
												{
													oSearchSet.userText = $('#ns1blankspaceDetailsLogonName').val()
												}

												if (oParam == undefined) {oParam = {}}
												oParam.search = oSearchSet;
												ns1blankspace.messaging.conversation.participants.add(oParam);
											})
										}
										else
										{
											var sData = 'rf=json&scope=1';
										
											if (oSearch.firstName != undefined) 
											{
												sData += '&firstname=' + ns1blankspace.util.fs(oSearch.firstName);
											}	
											if (oSearch.surname != undefined)
											{
												sData += '&surname=' +ns1blankspace.util.fs(oSearch.surname);
											}
											if (oSearch.email != undefined)
											{
												sData += '&email=' + ns1blankspace.util.fs(oSearch.email);
											}
											if (oSearch.userText != undefined)
											{
												sData += '&usertext=' + ns1blankspace.util.fs(oSearch.userText);
											}
										
											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('NETWORK_USER_SEARCH'),
												data: sData,
												dataType: 'json',
												success: function(data){ns1blankspace.messaging.conversation.participants.add(oParam, data)}
											});
										}	
									}
									else
									{
										if (oResponse.status == 'ER')
										{
											var aHTML = [];

											ns1blankspace.status.error('Not a valid request.');
										}
										else
										{
											var aHTML = [];
											
											ns1blankspace.status.message('');

											if (oResponse.data.rows.length == 0)
											{
												aHTML.push('<table class="ns1blankspaceColumn2"><tr><td class="ns1blankspaceNothing">No matching users.</td></tr></table>');

												$('#ns1blankspaceParticipantsAddColumn2').html(aHTML.join(''));
											}
											else
											{
												aHTML.push('<table id="ns1blankspaceParticpantsAddSelect" class="ns1blankspaceColumn2">');
												
												$.each(oResponse.data.rows, function()
												{	
													aHTML.push('<tr class="ns1blankspaceRow">');
													aHTML.push('<td id="ns1blankspaceParticpantsAddSelect_title-' +
																			this.user + '" class="ns1blankspaceRow">' +
																			this.usertext + '</td>');
													
													aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">' +
																	'<span id="ns1blankspaceParticipantAddSelect-' + this.user + '" class="ns1blankspaceRowSelect"></span>' +
																	'</td></tr>');
													
												});
												
												aHTML.push('</table>');

												$('#ns1blankspaceParticipantsAddColumn2').html(aHTML.join(''));
												
												$('#ns1blankspaceParticpantsAddSelect .ns1blankspaceRowSelect').button({
													text: false,
													label: "Add",
													icons:
													{
														 primary: "ui-icon-plus"
													}
												})
												.click(function()
												{
													ns1blankspace.messaging.conversation.participants.select(this.id);
												})
												.css('width', '15px')
												.css('height', '20px');
											}
										}	
									}
								},

					select:		function (sXHTMLElementID)
								{
									var aSearch = sXHTMLElementID.split('-');
									var sElementID = aSearch[0];
									var sContext = aSearch[1];
									
									var sData = 'user=' + sContext + '&conversation=' + ns1blankspace.objectContext;
												
									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('MESSAGING_CONVERSATION_PARTICIPANT_MANAGE'),
										data: sData,
										dataType: 'json',
										success: function(data){$('#' + sXHTMLElementID).parent().parent().fadeOut(500)}
									});	
								},
									
					remove:		function (oParam)
								{
									var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;

									if (sXHTMLElementID !== undefined)
									{	
										var sID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value;
									
										var sData = 'remove=1&id=' + sID + '&conversation=' + ns1blankspace.objectContext;
																					
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('MESSAGING_CONVERSATION_PARTICIPANT_MANAGE'),
											data: sData,
											dataType: 'json',
											success: function(data){$('#' + sXHTMLElementID).parent().parent().fadeOut(500)}
										});	
									}	
								},

					leave:		function (oParam)
								{
									var oSearch = new AdvancedSearch();
										
									oSearch.method = 'MESSAGING_CONVERSATION_PARTICIPANT_SEARCH';
									oSearch.addField('user');
									oSearch.addFilter('user', 'EQUAL_TO', ns1blankspace.user.id);
									oSearch.addCustomOption('conversation', ns1blankspace.objectContext);
									oSearch.rows = 1;
									oSearch.getResults(function(oResponse)
									{
										var iID = ns1blankspace.util.getRow(oResponse, {property: 'id'})

										if (iID !== undefined)
										{	
											var oData = 
											{
												id: iID,
												remove: 1,
												user: ns1blankspace.user.id,
												conversation:  ns1blankspace.objectContext
											}	
														
											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('MESSAGING_CONVERSATION_PARTICIPANT_MANAGE'),
												data: oData,
												dataType: 'json',
												success: function(data)
												{
													ns1blankspace.status.message('Removed from conversation')
													ns1blankspace.messaging.conversation.init();
												}
											});	
										}	
									});		
								}			
				},

	posts: 		{
					show: 		function (oParam, oResponse)
								{
									var iID = ns1blankspace.util.getParam(oParam, 'id').value;

									if (oResponse == undefined)
									{
										ns1blankspace.show({selector: '#ns1blankspaceMainPosts'});

										var aHTML = [];
										
										aHTML.push('<table class="ns1blankspaceContainer">' +
														'<tr class="ns1blankspaceContainer">' +
														'<td id="ns1blankspacePostsColumn1" class="ns1blankspaceColumn1Flexible">' +
														ns1blankspace.xhtml.loading + '</td>' +
														'<td id="ns1blankspacePostsColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td>' +
														'</tr>' +
														'</table>');	
														
										$('#ns1blankspaceMainPosts').html(aHTML.join(''));	
									
										if (ns1blankspace.objectContextData.participantcan)
										{
											var aHTML = [];

											aHTML.push('<table class="ns1blankspaceColumn2">');
													
											aHTML.push('<tr><td>' +
															'<span class="ns1blankspaceAction" id="ns1blankspacePostsAdd">Add</span>' +
															'</td></tr>');
															
											aHTML.push('</table>');					
											
											$('#ns1blankspacePostsColumn2').html(aHTML.join(''));	
										
											$('#ns1blankspacePostsAdd').button(
											{
												label: "Add"
											})
											.click(function()
											{
												ns1blankspace.messaging.conversation.posts.add(false);
											});
										}	

										var oSearch = new AdvancedSearch();
										oSearch.method = 'MESSAGING_CONVERSATION_POST_SEARCH';
										oSearch.addField('subject,message,ownerusertext,createddate,modifieddate,lastcommentdate,createdusertext');
										oSearch.addCustomOption('conversation', ns1blankspace.objectContext);

										if (iID !== undefined)
										{
											oSearch.addFilter('id', 'EQUAL_TO', iID);
										}

										oSearch.sort('modifieddate', 'desc');
										oSearch.getResults(function(data) {ns1blankspace.messaging.conversation.posts.show(oParam, data)});
									}
									else
									{
										var aHTML = [];
										
										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<table><tr><td class="ns1blankspaceNothing">No posts.</td></tr></table>');

											aHTML.push('</table>');

											$('#ns1blankspacePostsColumn1').html(aHTML.join(''));
										}
										else
										{		
											aHTML.push('<table id="ns1blankspaceMessagingConversationPosts" class="ns1blankspaceContainer">');
											
											$.each(oResponse.data.rows, function()
											{
												aHTML.push(ns1blankspace.messaging.conversation.posts.row(this));
											});
												
											aHTML.push('</table>');
											
											ns1blankspace.render.page.show(
											{
												xhtmlElementID: 'ns1blankspacePostsColumn1',
												xhtmlContext: 'ConversationPosts',
												xhtml: aHTML.join(''),
												showMore: (oResponse.morerows == "true"),
												more: oResponse.moreid,
												rows: ns1blankspace.option.defaultRows,
												functionShowRow: ns1blankspace.messaging.conversation.posts.row,
												functionOnNewPage: ns1blankspace.messaging.conversation.posts.bind,
												headerRow: false,
												bodyClass: 'ns1blankspaceMessagingConversationPosts'
											}); 

											if (iID !== undefined)
											{
												ns1blankspace.messaging.conversation.posts.comments.showHide(
												{
													xhtmlElementID: 'ns1blankspaceMessagingConversationPosts_comment_view-' + iID,
													onComplete: ns1blankspace.messaging.conversation.posts.comments.search.send,
													"new": true
												});
											}	
											
										}
									}	
								},

					row:		function (oRow)
								{
									var aHTML = [];

									aHTML.push('<tr class="ns1blankspaceRow" id="ns1blankspaceMessagingConversationPosts_container-' + oRow.id + '">');
													
									var sSubject = oRow.subject;
									if (sSubject == '') {sSubject = '...'}		
													
									aHTML.push('<td id="ns1blankspaceMessagingConversationPosts_subject-' + oRow.id + '" class="ns1blankspaceRow" style="padding-top:6px;">' +
															sSubject);
															
									aHTML.push('<br /><div style="margin-top:3px;" class="ns1blankspaceSubNote">' +
															oRow.createdusertext + ', ');
															
									var oDate = new Date(oRow.modifieddate);
															
									aHTML.push(oDate.toString("dd MMM yyyy @ h:mm tt")  + '</div>');

									aHTML.push('<div id="ns1blankspaceMessagingConversationPosts_message-' + oRow.id + '" style="display:none; margin-top:3px;" class="ns1blankspaceRow ns1blankspaceSubNote">' +
															ns1blankspace.util.cleanURL({text: (oRow.message).formatXHTML()}) + '</div>');


									aHTML.push('</td><td style="width:80px; text-align:right; vertical-align:bottom; padding-bottom:4px;" class="ns1blankspaceRow">' +
													'<div id="ns1blankspaceMessagingConversationPosts_comment_container-' + oRow.id + '">' +
													'<span id="ns1blankspaceMessagingConversationPosts_comment_view-' + oRow.id + '" class="ns1blankspaceRowAddCommentView"></span>' +
													'<span id="ns1blankspaceMessagingConversationPosts_comment_add-' + oRow.id + '">&nbsp;</span>' +
													'</div>' +
													'</td></tr>');

									return aHTML.join('');						
								},

					bind: 		function (oParam)
								{
									var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID').value;

									$('#' + sXHTMLContainerID + ' td.ns1blankspaceRowSelect').click(function()
									{
										ns1blankspace.show({selector: '#ns1blankspaceMainComments'});
										var aXHTMLElementID = (this.id).split('-');
										ns1blankspace.messaging.conversation.comments.show({post: aXHTMLElementID[1]});
									})

									$('#' + sXHTMLContainerID + ' span.ns1blankspaceRowAddCommentView')
									.button(
									{
										text: false,
										label: " Comments",
										icons:
										{
											 primary: "ui-icon-comment"
										}
									})
									.css('width', '20px')
									.css('margin-left', '2px')
									.css('font-size', '0.625em')
									.click(function()
									{
										var aXHTMLElementID = (this.id).split('-');
										ns1blankspace.messaging.conversation.posts.comments.showHide(
										{
											xhtmlElementID: this.id,
											onComplete: ns1blankspace.messaging.conversation.posts.comments.search.send
										});
									})
													
									.next()
										.button(
										{
											text: false,
											icons:
											{
												primary: "ui-icon-plus"
											}
										})
										.css('width', '20px')
										.css('margin-left', '2px')
										.css('font-size', '0.625em')
										.click(function()
										{
											ns1blankspace.messaging.conversation.posts.comments.showHide(
											{
												xhtmlElementID: this.id,
												onComplete: ns1blankspace.messaging.conversation.posts.comments["new"].show
											});
										})
								},								

					comments:	{
									showHide: 	function (oParam)
												{
													var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
													var sKey = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value
													var sSource = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 0}).value;
													var bExists = ($('#ns1blankspaceMessagingConversationPostComments_container-' + sKey).length != 0);
													
													var sAction = ns1blankspace.util.getParam(oParam, 'action').value;
													if (sAction == undefined) {sAction = ns1blankspace.util.getData(oParam, 'data-action', {"default": ''}).value}
													if (sAction == '') {sAction = 'open'}

													if (!bExists && $('#ns1blankspaceMessagingConversationPosts_comment_close-' + sKey).length == 0)
													{
														$('#ns1blankspaceMessagingConversationPosts_comment_view-' + sKey).before('<span id="ns1blankspaceMessagingConversationPosts_comment_close-' +
																		sKey + '" data-action="close">&nbsp;</span>');

														$('#ns1blankspaceMessagingConversationPosts_comment_close-' + sKey).button(
														{
															text: false,
															label: 'close',
															icons:
															{
																primary: "ui-icon-arrowthickstop-1-n"
															}
														})
														.css('width', '20px')
														.css('margin-left', '2px')
														.css('font-size', '0.625em')
														.click(function()
														{
															ns1blankspace.messaging.conversation.posts.comments.showHide(
															{
																xhtmlElementID: this.id
															});
														})
													}	

													if (sAction == 'close')
													{
														$('#ns1blankspaceMessagingConversationPostComments_container-' + sKey).remove();
														$('#ns1blankspaceMessagingConversationPosts_comment_close-' + sKey).remove()
													}
													else
													{
														if (!bExists)
														{	
															var sMessage = $('#ns1blankspaceMessagingConversationPosts_message-' + sKey).html();

															var sHTML = '<table class="ns1blankspaceContainer">' +
																		'<tr class="ns1blankspaceContainer">' +
																		'<td id="ns1blankspaceCommentsColumn1-' + sKey + '" class="ns1blankspaceColumn1Flexible" style="font-size:0.725em; background-color:white;padding-left:5px;">' + sMessage + '</td>' +
																		'<td id="ns1blankspaceCommentsColumn2-' + sKey + '" class="ns1blankspaceColumn2" style="width:300px; padding-left:10px;">' +
																				'<div id="ns1blankspaceCommentsColumn2Add-' + sKey + '"></div>' +
																				'<div id="ns1blankspaceCommentsColumn2List-' + sKey + '" style="font-size:0.875em;"></div></td>' +
																		'</tr></table>';

															$('#ns1blankspaceMessagingConversationPosts_container-' + sKey).after('<tr id="ns1blankspaceMessagingConversationPostComments_container-' + sKey + '"' +
																		' data-source="' + sSource + '">' +
																		'<td colspan=2><div style="background-color: #F3F3F3; padding:5px; margin-bottom:12px;">' + sHTML + '</div></td></tr>');
														}

														ns1blankspace.util.onComplete(oParam);
													}
												},

									search: 	{
													send: 		function (oParam)
																{
																	var sKey = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value;
																	var iPost = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value;

																	$('#ns1blankspaceCommentsColumn2List-' + sKey).html(ns1blankspace.xhtml.loadingSmall);
																		
																	var oSearch = new AdvancedSearch();
																	oSearch.method = 'MESSAGING_CONVERSATION_POST_COMMENT_SEARCH';
																	oSearch.addField('message,modifiedusertext,modifieddate');
																	oSearch.addFilter('post', 'EQUAL_TO', iPost);
																	oSearch.addFilter('conversation', 'EQUAL_TO', ns1blankspace.objectContext)
																	oSearch.addCustomOption('conversation', ns1blankspace.objectContext);
																	oSearch.rows = 100;
																	oSearch.sort('modifieddate', 'desc');
																	oSearch.getResults(function(data) {ns1blankspace.messaging.conversation.posts.comments.search.process(oParam, data)});
																},

													process: 	function (oParam, oResponse)
																{
																	var sKey = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value;
																	var bNew = ns1blankspace.util.getParam(oParam, 'new', {"default": false}).value;

																	var aHTML = [];
																
																	if (oResponse.data.rows.length == 0)
																	{
																		$('#ns1blankspaceCommentsColumn2List-' + sKey).html('<table><tr id="ns1blankspaceMessagingConversationPostCommentsList_container">' +
																							'<td class="ns1blankspaceNothing">No comments.</td></tr></table>');							
																	}
																	else
																	{
																		aHTML.push('<table>');

																		if (oResponse.data.rows.length > 1)
																		{	
																			aHTML.push('<tr><td class="ns1blankspaceRow ns1blankspaceSubNote">' + oResponse.data.rows.length + ' comments.</td></tr>');
																		}		

																		$.each(oResponse.data.rows, function()
																		{
																			var oDate = new Date(this.modifieddate);

																			aHTML.push('<tr><td class="ns1blankspaceRow" style="padding-top:6px;">' +
																							ns1blankspace.util.toBR(this.message) +
																							'<br /><div class="ns1blankspaceSub" style="margin-top:3px;">' +
																							'<span>' + this.modifiedusertext + '</span><br />' + oDate.toString("dddd, dd MMM yyyy @ h:mm tt") + '</div>');	
																		});

																		$('#ns1blankspaceCommentsColumn2List-' + sKey).html(aHTML.join(''));
																	}

																	if (bNew)
																	{
																		ns1blankspace.messaging.conversation.posts.comments["new"].show(oParam);
																	}	
																}	
												},			

									"new":		{

													show:  		function (oParam)
																{
																	var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
																	var sKey = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value
																	var aHTML = [];

																	aHTML.push('<table style="margin-bottom:10px;">');									
																
																	aHTML.push('<tr><td class="ns1blankspaceTextMulti">' +
																						'<textarea id="ns1blankspaceCommentMessage-' + sKey + '" name="message" rows="15" cols="5" style="height:175px; font-size:0.875em; width:100%;"' +
																								' class="ns1blankspaceTextMulti"></textarea>' +
																						'</td></tr>');
																	
																	aHTML.push('<tr><td id="ns1blankspaceCommentSend_container-' + sKey + '">' +
																					'<span id="ns1blankspaceCommentSend-' + sKey + '" class="ns1blankspaceAction">Send</span>' +
																					'</td></tr>');
																							
																	aHTML.push('</table>');

																	$('#ns1blankspaceCommentsColumn2Add-' + sKey).html(aHTML.join(''));

																	$('#ns1blankspaceCommentSend-' + sKey).button(
																	{
																		label: "Send"
																	})
																	.click(function() {
																		ns1blankspace.messaging.conversation.posts.comments["new"].send({xhtmlElementID: sXHTMLElementID, step: 3});
																	})
																	.css('font-size', '0.725em;');

																	$('#ns1blankspaceCommentMessage-' + sKey).focus();
																	
																},						

													send:		function (oParam)
																{
																	var sKey = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value
																	var iPost = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value
				
																	$('#ns1blankspaceCommentSend_container-' + sKey).html(ns1blankspace.xhtml.loadingSmall);
																		
																	var oData =
																	{
																		message: $('#ns1blankspaceCommentMessage-' + sKey).val(),
																		post: iPost
																	}	
																		
																	$.ajax(
																	{
																		type: 'POST',
																		url: ns1blankspace.util.endpointURI('MESSAGING_CONVERSATION_POST_COMMENT_MANAGE'),
																		data: oData,
																		dataType: 'json',
																		success: function(data)
																		{
																			if (data.status == 'OK')
																			{
																				ns1blankspace.status.message('Comment sent.');
																				oParam = ns1blankspace.util.setParam(oParam, 'action', 'close')
																				ns1blankspace.messaging.conversation.posts.comments.showHide(oParam)
																			}
																			else
																			{
																				ns1blankspace.status.message('Comment could not be sent.');
																			}	
																		}
																	});	
																}
												}
								},								

					add:		function (oParam, oResponse)
								{
									var sXHTMLElementContextID;
									var iPost;
													
									ns1blankspace.counter.editor = ns1blankspace.counter.editor + 1;		
									
									if (oParam != undefined)
									{
										if (oParam.label != undefined) {sLabel = oParam.label}
										if (oParam.xhtmlElementContextID != undefined) {sXHTMLElementContextID = oParam.xhtmlElementContextID}
										if (oParam.post != undefined) {iPost = oParam.post}
									}

									if (sXHTMLElementContextID != undefined)
									{
										var aSearch = sXHTMLElementContextID.split('-');
										var sElementId = aSearch[0];
										var lProjectTask = aSearch[1];
									}	
										
									var aHTML = [];
									
									aHTML.push('<table class="ns1blankspaceContainer">' +
															'<tr class="ns1blankspaceContainer">' +
															'<td id="ns1blankspacePostDetailsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
															'<td id="ns1blankspacePostDetailsColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td>' +
															'</tr>' + 
															'</table>');			
										
									$('#ns1blankspaceMainPosts').html(aHTML.join(''));
											
									if (oResponse == undefined && iPost != undefined)
									{
										var sData = 'id=' + iPost;
										
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('MESSAGING_CONVERSATION_POST_SEARCH'),
											data: sData,
											dataType: 'json',
											success: function(data) {ns1blankspace.messaging.conversation.posts.add(oParam, data)}
										});
									}
									else
									{
										var aHTML = [];

										aHTML.push('<table class="ns1blankspaceColumn2">');
										
										aHTML.push('<tr><td id="ns1blankspacePostDetailsSend_container">' +
														'<span class="ns1blankspaceAction" id="ns1blankspacePostDetailsSend">Send</span>' +
														'</td></tr>');
																
										aHTML.push('</table>');					
										
										$('#ns1blankspacePostDetailsColumn2').html(aHTML.join(''));
										
										$('#ns1blankspacePostDetailsSend').button(
										{
											label: "Send"
										})
										.click(function()
										{
											$('#ns1blankspacePostDetailsSend_container').html(ns1blankspace.xhtml.loadingSmall);

											if ($('#oFile0').val() == '')
											{
												ns1blankspace.messaging.conversation.posts.send()
											}
											else
											{
												$('#message').val(tinyMCE.get('ns1blankspacePostMessage' + ns1blankspace.counter.editor).getContent());
												ns1blankspace.attachments.upload.process(
												{
													functionPostUpdate: ns1blankspace.messaging.conversation.posts.show,
												});
											}	
										})
										
										var aHTML = [];
															
										aHTML.push('<table class="ns1blankspace">');					
															
										aHTML.push('<tr class="ns1blankspace">' +
															'<td class="ns1blankspaceCaption">' +
															'Subject' +
															'</td></tr>' +
															'<tr class="ns1blankspaceText">' +
															'<td class="ns1blankspaceText">' +
															'<input name="subject" id="ns1blankspacePostSubject" class="ns1blankspaceText">' +
															'</td></tr>');							
									
										aHTML.push('<tr class="ns1blankspaceTextMulti">' +
															'<td class="ns1blankspaceMainTextMulti">' +
															'<textarea rows="25" cols="50" id="ns1blankspacePostMessage' +
															ns1blankspace.counter.editor + '" data-editorcount="' + ns1blankspace.counter.editor + '" class="ns1blankspaceTextMulti"></textarea>' +	
															'</td></tr>');
									
										aHTML.push('</table>');						
									
										$('#ns1blankspacePostDetailsColumn1').html(
											ns1blankspace.attachments.upload.show(
												{
													url: '/ondemand/attach/progress/',
													xhtml: aHTML.join(''),
													label: '',
													inputs: ['message']
												})
										);
										
										if (ns1blankspace.option.richTextEditing)
										{
											ns1blankspace.format.editor.init({selector: '#ns1blankspacePostMessage' + ns1blankspace.counter.editor});
											//tinyMCE.execCommand('mceAddControl', false, 'ns1blankspacePostMessage' + ns1blankspace.counter.editor);
										}	
										
										$('#ns1blankspacePostSubject').focus();

										if (oResponse != undefined)
										{	
											if (oResponse.data.rows.length != 0)
											{
												$('#ns1blankspacePostSubject').val(oResponse.data.rows[0].subject);
												$('#ns1blankspacePostMessage').val(oResponse.data.rows[0].message);		
											}
										}	
									}	
								},	

					send:		function (oParam)
								{
									var sData = 'conversation=' + ns1blankspace.util.fs(ns1blankspace.objectContext);
									sData += '&subject=' + ns1blankspace.util.fs($('#ns1blankspacePostSubject').val());
									sData += '&message=' + ns1blankspace.util.fs(tinyMCE.get('ns1blankspacePostMessage' + ns1blankspace.counter.editor).getContent()) 
									
									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('MESSAGING_CONVERSATION_POST_MANAGE'),
										data: sData,
										dataType: 'json',
										success: function(data) {ns1blankspace.messaging.conversation.posts.show(oParam)}
									});
								}
				},

	comments: 	{
					show:		function (oParam, oResponse)
								{
									var sXHTMLElementID = 'ns1blankspaceMainComments';
									var iPost;
									
									if (oParam != undefined)
									{
										if (oParam.post != undefined) {iPost = oParam.post}
										if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
									}

									if (oResponse == undefined)
									{
										var sData = 'includeme=1&conversation=' + ns1blankspace.objectContext;
										
										if (iPost != undefined)
										{
											sData += '&post=' + iPost;
										}
										
										sData += '&includepost=1';
											
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('MESSAGING_CONVERSATION_POST_COMMENT_SEARCH'),
											data: sData,
											dataType: 'json',
											success: function(data) {ns1blankspace.messaging.conversation.comments.show(oParam, data)}
										});

									}
									else
									{
										var aHTML = [];

										aHTML.push('<table class="ns1blankspaceContainer">' +
															'<tr class="ns1blankspaceContainer">' +
															'<td id="ns1blankspaceCommentsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
															'<td id="ns1blankspaceCommentsColumn2" class="ns1blankspaceColumn2" style="width: 5px;"></td>' +
															'</tr>' + 
															'</table>');			
														
										$('#ns1blankspaceMainComments').html(aHTML.join(''));	
									
										var aHTML = [];
										
										aHTML.push('<table>');

										if (oResponse.data.rows.length == 0)
										{
											aHTML.push('<tr><td class="ns1blankspaceNothing">No comments.</td></tr></table>');
										}
										else
										{	
											if (iPost)
											{
												aHTML.push('<tr><td style="padding-bottom:15px;">' +
																(oResponse.data.rows[0].postmessage).formatXHTML() + '</td></tr>');
											}

											aHTML.push('</table>');

											aHTML.push('<table id="ns1blankspaceConversationComments" class="ns1blankspaceContainer">');
												
											aHTML.push('<tr class="ns1blankspaceCaption">');

											if (iPost == undefined)
											{
												aHTML.push('<td class="ns1blankspaceHeaderCaption">Post</td>');
											}
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Comment</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">By</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">Date</td>');
											aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
											aHTML.push('</tr>');
											
											$.each(oResponse.data.rows, function()
											{
												aHTML.push('<tr class="ns1blankspaceRow">');
																	
												if (iPost == undefined)
												{
													aHTML.push('<td id="ns1blankspaceConversationComments_postsubject-' + this.id + '" class="ns1blankspaceRow">' +
																		this.postsubject + '</td>');	
												}
												
												aHTML.push('<td id="ns1blankspaceConversationComments_message-' + this.id + '" class="ns1blankspaceRow">' +
																		this.message + '</td>');
																		
												aHTML.push('<td id="ns1blankspaceConversationComments_usertext-' + this.id + '" class="ns1blankspaceRow">' +
																		this.usertext + '</td>');
																		
												aHTML.push('<td id="ns1blankspaceConversationComments_date-' + this.id + '" class="ns1blankspaceRow">' +
																		this.datetime + '</td>');
													
												aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">' +
																	'<span id="ns1blankspaceConversationComments-' + this.post + '-' + this.id + '" class="ns1blankspaceRowSelect ns1blankspaceRowSelect"></span>' +
																	'</td></tr>');
														
												aHTML.push('</tr>');
												
											});
											
											aHTML.push('</table>');	
										}
										
										$('#ns1blankspaceCommentsColumn1').html(aHTML.join(''));
										
										$('#ns1blankspaceConversationComments span.ns1blankspaceRowSelect').button({
											text: false,
											label: "Comment",
											icons: {
												 primary: "ui-icon-comment"
											}
										})
										.click(function() {
											ns1blankspace.messaging.conversation.posts.comments({xhtmlElementID: this.id});
										})
										.css('width', '15px')
										.css('height', '20px');
										
									}
								}		
				},

	save: 		{
					validate: 	true,

					send:		function ()
								{
									if (ns1blankspace.messaging.conversation.save.validate)
									{	
										ns1blankspace.status.working();
										
										var oData = {};
										
										if (ns1blankspace.objectContext != -1)
										{
											oData.id = ns1blankspace.objectContext;
										}
										else
										{
											oData.includemessageinemailalert = 'Y';
											oData.emailalertdefault = 'Y';
										}

										if ($('#ns1blankspaceMainDetails').html() != '')
										{
											oData.title = $('#ns1blankspaceDetailsTitle').val();
											oData.description = $('#ns1blankspaceDetailsDescription').val();
											oData.sharing = $('input[name="radioSharing"]:checked').val();
											oData.participantcan = $('input[name="radioParticipantCan"]:checked').val();

											var sAlert = $('#ns1blankspaceDetailsAlertURL').val();
											if (sAlert == '' && ns1blankspace.objectContext == -1)
											{
												sAlert = window.location.protocol + '//' + window.location.host +
															'/#/messaging.conversation/[[CONVERSATION_ID]]/posts.show/[[POST_ID]]'
											}

											oData.alerturl = sAlert;
										}
										
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('MESSAGING_CONVERSATION_MANAGE'),
											data: oData,
											dataType: 'json',
											success: ns1blankspace.messaging.conversation.save.process
										});		
									}	
								},

					process:	function (oResponse)
								{		
									if (oResponse.status == 'OK')
									{
										ns1blankspace.status.message('Saved');
										if (ns1blankspace.objectContext == -1) {ns1blankspace.objectContext = oResponse.id};	
										ns1blankspace.inputDetected = false;
										ns1blankspace.messaging.conversation.search.send('-' + ns1blankspace.objectContext, {source: 1});
									}
									else
									{
										ns1blankspace.status.message(oResponse.error.errornotes);
									}
								}
				}				
}
