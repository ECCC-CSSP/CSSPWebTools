
module CSSP {
    export class DocumentButtonEvents {
        // Constructor
        constructor() {
            this.Init();
        }

        // Functions
        public Init: Function = (): void => {
            $(document).off("click", "button[class^='jb']");
            $(document).on("click", "button[class^='jb']", (evt: Event) => {
                var $bjs = $(evt.target);
                if (!$bjs.is("button")) {
                    $bjs = $bjs.closest("button");
                }
                switch ($bjs.attr("class").split(" ")[0]) {
                    case "jbGetAllPolSourceSiteInfoUnderSubsectorForMark":
                        {
                            cssp.PolSourceSite.GetAllPolSourceSiteInfoUnderSubsectorForMark($bjs);
                        }
                        break;
                    case "jbAddressAdd":
                        {
                            cssp.Address.FormSubmitAddOrUpdate($bjs);
                        }
                        break;
                    case "jbAddressDelete":
                        {
                            cssp.Address.FormSubmitDelete($bjs);
                        }
                        break;
                    case "jbAddressLocationCrossOnMap":
                        {
                            cssp.Address.AddressLocationCrossOnMap($bjs);
                        }
                        break;
                    case "jbGetCivicAddress":
                        {
                            cssp.Address.GetCivicAddress($bjs);
                        }
                        break;
                    case "jbAddressInfrastructureAddOrUpdate":
                        {
                            cssp.Address.FormSubmitAddOrUpdateInfrastructure($bjs);
                        }
                        break;
                    case "jbAddressInfrastructureDelete":
                        {
                            cssp.Address.FormSubmitDeleteInfrastructure($bjs);
                        }
                        break;
                    case "jbAddressPolSourceSiteAddOrUpdate":
                        {
                            cssp.Address.FormSubmitAddOrUpdatePolSourceSite($bjs);
                        }
                        break;
                    case "jbAddressPolSourceSiteDelete":
                        {
                            cssp.Address.FormSubmitDeletePolSourceSite($bjs);
                        }
                        break;
                    case "jbAddressUpdate":
                        {
                            cssp.Address.FormSubmitAddOrUpdate($bjs);
                        }
                        break;
                    case "jbAppTaskRefresh":
                        {
                            cssp.Home.AppTaskRefresh($bjs);
                        }
                        break;
                    case "jbAppTaskRefreshStart":
                        {
                            cssp.Home.AppTaskRefreshStart($bjs);
                        }
                        break;
                    case "jbAppTaskRefreshStop":
                        {
                            cssp.Home.AppTaskRefreshStop($bjs);
                        }
                        break;
                    case "jbAppTaskDelete":
                        {
                            cssp.Home.AppTaskDelete($bjs);
                        }
                        break;
                    case "jbBoxModelScenarioCopy":
                        {
                            cssp.BoxModel.CopyBoxModelScenario($bjs);
                        }
                        break;
                    case "jbBoxModelScenarioCreate":
                        {
                            cssp.BoxModel.CreateBoxModelScenario($bjs);
                        }
                        break;
                    case "jbBoxModelScenarioDelete":
                        {
                            cssp.BoxModel.AskToRemoveBoxModel($bjs);
                        }
                        break;
                    case "jbBoxModelShowHideForm":
                        {
                            cssp.BoxModel.ShowHideForm($bjs);
                        }
                        break;
                    case "jbBoxModelShowHideResult":
                        {
                            cssp.BoxModel.ShowHideResults($bjs);
                        }
                        break;
                    case "jbBoxModelScenarioSave":
                        {
                            cssp.BoxModel.FormSubmit($bjs);
                        }
                        break;
                    case "jbClimateSiteAddToUse":
                        {
                            cssp.ClimateSite.ClimateSitesAddToUse($bjs);
                        }
                        break;
                    case "jbClimateSitesShowOnMap":
                        {
                            cssp.ClimateSite.ClimateSitesShowOnMap();
                        }
                        break;
                    case "jbClimateSitesFindWithinDistance":
                        {
                            cssp.ClimateSite.ClimateSitesFindWithinDistance();
                        }
                        break;
                    case "jbClimateSiteOpenDialogToShowExOfYearsToEnter":
                        {
                            cssp.ClimateSite.ClimateSiteOpenDialogToShowExOfYearsToEnter();
                        }
                        break;
                    case "jbClimateSitePrioritiesSave":
                        {
                            cssp.ClimateSite.ClimateSitePrioritiesSave();
                        }
                        break;
                    case "jbClimateSitePrioritiesSetPriorityByDistance":
                        {
                            cssp.ClimateSite.ClimateSitePrioritiesSetPriorityByDistance();
                        }
                        break;
                    case "jbLoadClimateSiteSelectRun":
                        {
                            cssp.ClimateSite.LoadClimateSiteSelectRun($bjs);
                        }
                        break;
                    case "jbClimateSiteGetDataForRunsOfYear":
                        {
                            cssp.ClimateSite.ClimateSiteGetDataForRunsOfYear($bjs);
                        }
                        break;
                    case "jbClimateSiteSetDataToUseByAverageOrPriority":
                        {
                            cssp.ClimateSite.ClimateSiteSetDataToUseByAverageOrPriority($bjs);
                        }
                        break;
                    case "jbClimateSitesToUseForSubsectorVerifyAndSave":
                        {
                            cssp.ClimateSite.ClimateSitesToUseForSubsectorVerifyAndSave();
                        }
                        break;
                    case "jbClimateSiteShowHideEditEnteredDiv":
                        {
                            cssp.ClimateSite.ClimateSiteShowHideEditEnteredDiv($bjs);
                        }
                        break;
                    case "jbClimateSiteOpenRadarHistoricalSite":
                        {
                            cssp.ClimateSite.ClimateSiteOpenRadarHistoricalSite($bjs);
                        }
                        break;
                    case "jbClimateSiteRainEnteredFillUsingSelected":
                        {
                            cssp.ClimateSite.ClimateSiteRainEnteredFillUsingSelected($bjs);
                        }
                        break;
                    case "jbClimateSiteRainEnteredFillUsingAverage":
                        {
                            cssp.ClimateSite.ClimateSiteRainEnteredFillUsingAverage($bjs);
                        }
                        break;
                    case "jbClimateSiteRainEnteredFillUsingPriority":
                        {
                            cssp.ClimateSite.ClimateSiteRainEnteredFillUsingPriority($bjs);
                        }
                        break;
                    case "jbClimateSiteRainEnteredFillUsingWeighted":
                        {
                            cssp.ClimateSite.ClimateSiteRainEnteredFillUsingWeighted($bjs);
                        }
                        break;
                    case "jbClimateSiteRainEnteredAreYouSureToSave":
                        {
                            cssp.ClimateSite.ClimateSiteRainEnteredAreYouSureToSave($bjs);
                        }
                        break;
                    case "jbClimateSitesUseSameAsSelectedSubsector":
                        {
                            cssp.ClimateSite.ClimateSitesUseSameAsSelectedSubsector($bjs);
                        }
                        break;
                    case "jbContactAddOrModify":
                        {
                            cssp.Contact.FormSubmit();
                        }
                        break;
                    case "jbContactAskToDelete":
                        {
                            cssp.Contact.AskToDelete($bjs);
                        }
                        break;
                    case "jbContactHideEditButtons":
                        {
                            cssp.Contact.HideEditButtons($bjs);
                        }
                        break;
                    case "jbContactShowHideAdd":
                        {
                            cssp.Contact.ContactShowHideAdd($bjs);
                        }
                        break;
                    case "jbContactShowEditButtons":
                        {
                            cssp.Contact.ShowEditButtons($bjs);
                        }
                        break;
                    case "jbContactShowHideModify":
                        {
                            cssp.Contact.ContactShowHideModify($bjs);
                        }
                        break;
                    case "jbEmailAdd":
                        {
                            cssp.Email.FormSubmitAddOrUpdate($bjs);
                        }
                        break;
                    case "jbEmailDelete":
                        {
                            cssp.Email.FormSubmitDelete($bjs);
                        }
                        break;
                    case "jbEmailUpdate":
                        {
                            cssp.Email.FormSubmitAddOrUpdate($bjs);
                        }
                        break;
                    case "jbEmailDistributionListShowHideEditButtons":
                        {
                            cssp.EmailDistributionList.EmailDistributionListShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbEmailDistributionListShowHideAdd":
                        {
                            cssp.EmailDistributionList.EmailDistributionListListShowHideAdd($bjs);
                        }
                        break;
                    case "jbEmailDistributionListEdit":
                        {
                            cssp.EmailDistributionList.LoadEmailDistributionListAddOrModify($bjs);
                        }
                        break;
                    case "jbEmailDistributionListEditSave":
                        {
                            cssp.EmailDistributionList.FormSubmit($bjs);
                        }
                        break;
                    case "jbEmailDistributionListAskToDelete":
                        {
                            cssp.EmailDistributionList.EmailDistributionListAskToDelete($bjs);
                        }
                        break;
                    case "jbEmailDistributionListContactAskToDelete":
                        {
                            cssp.EmailDistributionList.EmailDistributionListContactAskToDelete($bjs);
                        }
                        break;
                    case "jbEmailDistributionListContactEdit":
                        {
                            cssp.EmailDistributionList.LoadEmailDistributionListContactAddOrModify($bjs);
                        }
                        break;
                    case "jbEmailDistributionListContactEditSave":
                        {
                            cssp.EmailDistributionList.FormContactSubmit($bjs);
                        }
                        break;
                    case "jbEmailDistributionListContactAddNewContact":
                        {
                            cssp.EmailDistributionList.ShowHideEmailDistributionListContactAdd($bjs);
                        }
                        break;
                    case "jbEmailDistributionListGenerateExcelFile":
                        {
                            cssp.EmailDistributionList.EmailDistributionListGenerateExcelFile($bjs);
                        }
                        break;
                    case "jbEmailDistributionListMoveDown":
                        {
                            cssp.EmailDistributionList.EmailDistributionListMoveDown($bjs);
                        }
                        break;
                    case "jbEmailDistributionListMoveUp":
                        {
                            cssp.EmailDistributionList.EmailDistributionListMoveUp($bjs);
                        }
                        break;
                    case "jbFileAskToDelete":
                        {
                            cssp.File.AskToDelete($bjs);
                        }
                        break;
                    case "jbFileDownload":
                        {
                            cssp.File.FileDownload($bjs);
                        }
                        break;
                    case "jbFileEditSave":
                        {
                            cssp.File.FileEditSave($bjs);
                        }
                        break;
                    case "jbFileEditShowHide":
                        {
                            cssp.File.FileEditShowHide($bjs);
                        }
                        break;
                    case "jbCreateDocumentFromTemplate":
                        {
                            cssp.File.CreateDocumentFromTemplate($bjs);
                        }
                        break;
                    case "jbCreateDocumentShowHide":
                        {
                            cssp.File.CreateDocumentShowHide($bjs);
                        }
                        break;
                    case "jbFileUpload":
                        {
                            cssp.File.FileUpload($bjs);
                        }
                        break;
                    case "jbFileImportShowHide":
                        {
                            cssp.File.FileImportShowHide($bjs);
                        }
                        break;
                    case "jbFileListRefresh":
                        {
                            cssp.Helper.PageRefresh();
                        }
                        break;
                    case "jbFileShowHideEditButtons":
                        {
                            cssp.File.ShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbFileUploadTakeParentLatLng":
                        {
                        }
                        break;
                    case "jbForgotPassword":
                        {
                            cssp.ForgotPassword.FormSubmit();
                        }
                        break;
                    case "jbForgotPasswordEmailSent":
                        {
                            cssp.ForgotPasswordEmailSent.FormSubmit();
                        }
                        break;
                    case "jbGetLastUpdateAndTVText":
                        {
                            cssp.GetLastUpdateAndTVText();
                        }
                        break;
                    case "jbGetParentLatLng":
                        {
                            cssp.File.GetParentLatLng($bjs);
                        }
                        break;
                    case "jbInfrastructureCreateShowHide":
                        {
                            cssp.Infrastructure.ShowHideAddOrModify($bjs, true, true);
                       }
                        break;
                    case "jbInfrastructureDelete":
                        {
                            cssp.Infrastructure.AskToDelete($bjs);
                        }
                        break;
                    case "jbInfrastructureEdit":
                        {
                            cssp.Infrastructure.ShowEdit($bjs);
                        }
                        break;
                    case "jbInfrastructureEditSave":
                        {
                            cssp.Infrastructure.FormSubmitEditAll();
                        }
                        break;
                    case "jbInfrastructureMapShowItem":
                        {
                            cssp.GoogleMap.ShowItemOnMap($bjs);
                        }
                        break;
                    case "jbInfrastructureMoveCancel":
                        {
                            cssp.Infrastructure.MoveCancel($bjs);
                        }
                        break;
                    case "jbInfrastructureMoveTo":
                        {
                            cssp.Infrastructure.MoveTo($bjs);
                        }
                        break;
                    case "jbInfrastructureMoveToTop":
                        {
                            cssp.Infrastructure.MoveToTop($bjs);
                        }
                        break;
                    case "jbInfrastructureMoveStart":
                        {
                            cssp.Infrastructure.MoveStart($bjs);
                        }
                        break;
                    case "jbInfrastructureNameAndMapAdd":
                        {
                            cssp.Infrastructure.FormSubmitNameAndMap($bjs);
                        }
                        break;
                    case "jbInfrastructureShowHideAdd":
                        {
                            cssp.Infrastructure.ShowHideAddOrModify($bjs, true, false);
                        }
                        break;
                    case "jbInfrastructureShowHideModify":
                        {
                            cssp.Infrastructure.ShowHideAddOrModify($bjs, false, false);
                        }
                        break;
                    case "jbInfrastructureShowHideEditButtons":
                        {
                            cssp.Infrastructure.ShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorShowEdit":
                        {
                            cssp.MWQMRun.MWQMSubsectorShowEdit($bjs);
                        }
                        break;
                    case "jbLogin":
                        {
                            cssp.Login.FormSubmit();
                        }
                        break;
                    case "jbMapEdit":
                        {
                            cssp.GoogleMap.MapEdit($bjs);
                        }
                        break;
                    case "jbMapEditCancel":
                        {
                            cssp.GoogleMap.MapEditCancel($bjs);
                        }
                        break;
                    case "jbMapEditPointCancel":
                        {
                            cssp.GoogleMap.MapEditPointCancel($bjs);
                        }
                        break;
                    case "jbMapEditPointSave":
                        {
                            cssp.GoogleMap.MapEditPointSave($bjs);
                        }
                        break;
                    case "jbMapEditSave":
                        {
                            cssp.GoogleMap.MapEditSave($bjs);
                        }
                        break;
                    case "jbMapShowItem":
                        {
                            cssp.GoogleMap.ShowItemOnMap($bjs);
                        }
                        break;
                    case "jbMapSizeBigger":
                        {
                            cssp.GoogleMap.MapSizeBigger();
                        }
                        break;
                    case "jbMapSizeSmaller":
                        {
                            cssp.GoogleMap.MapSizeSmaller();
                        }
                        break;
                    case "jbMapHide":
                        {
                            document.location.href = $(".GlobeIcon").attr("href");
                            return true;
                        }
                    case "jbMapTopCenterShowHide":
                        {
                            cssp.GoogleMap.MapTopCenterShowHide();
                        }
                        break;
                    case "jbMikeScenarioAdd":
                        {
                            cssp.MikeScenario.MikeScenarioAdd($bjs);
                        }
                        break;
                    case "jbMikeScenarioAcceptWebTide":
                        {
                            cssp.MikeScenario.MikeScenarioAcceptWebTide($bjs);
                        }
                        break;
                    case "jbMikeScenarioCreateWebTideDataWLFromStartToEndDate":
                        {
                            cssp.MikeScenario.MikeScenarioCreateWebTideDataWLFromStartToEndDate();
                        }
                        break;
                    case "jbMikeScenarioAskToRun":
                        {
                            cssp.MikeScenario.MikeScenarioAskToRun();
                        }
                        break;
                    case "jbMikeScenarioBCDeleteNode":
                        {
                            cssp.MikeScenario.MikeScenarioBCDeleteNode($bjs);
                        }
                        break;
                    case "jbMikeScenarioCopy":
                        {
                            cssp.MikeScenario.MikeScenarioCopy($bjs);
                        }
                        break;
                    case "jbMikeScenarioCreateWebTideDataWLFromStartToEndDate":
                        {
                            cssp.MikeScenario.MikeScenarioCreateWebTideDataWLFromStartToEndDate($bjs);
                        }
                        break;
                    case "jbMikeScenarioDelete":
                        {
                            cssp.MikeScenario.AskToRemoveMikeScenario($bjs);
                        }
                        break;
                    case "jbMikeScenarioGeneralParametersEdit":
                        {
                            cssp.MikeScenario.MikeScenarioGeneralParametersEdit($bjs);
                        }
                        break;
                    case "jbMikeScenarioGeneralParametersEditSave":
                        {
                            cssp.MikeScenario.MikeScenarioGeneralParametersEditSave($bjs);
                        }
                        break;
                    case "jbMikeScenarioGenerateWebTideNodes":
                        {
                            cssp.MikeScenario.MikeScenarioGenerateWebTideNodes($bjs);
                        }
                        break;
                    case "jbMikeScenarioImport":
                        {
                            cssp.MikeScenario.MikeScenarioImport($bjs);
                        }
                        break;
                    case "jbMikeScenarioNodesViewOnMap":
                        {
                            cssp.MikeScenario.MikeScenarioNodesViewOnMap($bjs);
                        }
                        break;
                    case "jbMikeScenarioMeshBCNodeList":
                        {
                            cssp.MikeScenario.MikeScenarioMeshBCNodeListShowHide($bjs);
                        }
                        break;
                    case "jbMikeScenarioOtherFileImport":
                        {
                            cssp.MikeScenario.MikeScenarioOtherFileImport($bjs);
                        }
                        break;
                    case "jbMikeScenarioOtherFileNotImport":
                        {
                            cssp.MikeScenario.MikeScenarioOtherFileNotImport($bjs);
                        }
                        break;
                    case "jbMikeScenarioResetWebTide":
                        {
                            cssp.MikeScenario.MikeScenarioResetWebTide($bjs);
                        }
                        break;
                    case "jbMikeScenarioSelectPreviousInput":
                        {
                            cssp.MikeScenario.MikeScenarioSelectPreviousInput($bjs);
                        }
                        break;
                    case "jbMikeScenarioSetupWebTide":
                        {
                            cssp.MikeScenario.MikeScenarioSetupWebTide($bjs);
                        }
                        break;
                    case "jbMikeScenarioShowHideEditButtons":
                        {
                            cssp.MikeScenario.MikeScnenarioShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbMikeScenarioShowHideWaterLevels":
                        {
                            cssp.MikeScenario.MikeScenarioShowHideWaterLevels($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceEditAdd":
                        {
                            cssp.MikeScenario.MikeScenarioSourceEditAdd($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceShowHideAdd":
                        {
                            cssp.MikeScenario.MikeScenarioSourceShowHideAdd($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceShowHideEditButtons":
                        {
                            cssp.MikeScenario.MikeScnenarioSourceShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbMikeScenarioShowHideErrorInfo":
                        {
                            cssp.MikeScenario.MikeScenarioShowHideErrorInfo($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceEditShowHide":
                        {
                            cssp.MikeScenario.MikeScenarioSourceEditShowHide($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceStartEndEditShowHide":
                        {
                            cssp.MikeScenario.MikeScenarioSourceStartEndEditShowHide($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceEditNameLatLngShowHide":
                        {
                            cssp.MikeScenario.MikeScenarioSourceEditNameLatLngShowHide($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceInfoShowHide":
                        {
                            cssp.MikeScenario.MikeScenarioSourceInfoShowHide($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceEditDelete":
                        {
                            cssp.MikeScenario.AskToRemoveMikeScenarioSource($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceEditSave":
                        {
                            cssp.MikeScenario.MikeScenarioSourceEditSave($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceStartEndAdd":
                        {
                            cssp.MikeScenario.MikeScenarioSourceStartEndAdd($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceStartEndDelete":
                        {
                            cssp.MikeScenario.AskToRemoveMikeScenarioSourceStartEnd($bjs);
                        }
                        break;
                    case "jbMikeScenarioSourceStartEndSave":
                        {
                            cssp.MikeScenario.MikeScenarioSourceStartEndSave($bjs);
                        }
                        break;
                    case "jbMikeScenarioWebTideBCNodeList":
                        {
                            cssp.MikeScenario.MikeScenarioWebTideBCNodeListShowHide($bjs);
                        }
                        break;
                    case "jbMikeScenarioGenerateResultsShowStudyArea":
                        {
                            cssp.MikeScenario.MikeScenarioGenerateResultsShowStudyArea($bjs);
                        }
                        break;
                    case "jbRainExceedanceShowHideEditButtons":
                        {
                            cssp.RainExceedance.RainExceedanceShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbRainExceedanceShowHideAdd":
                        {
                            cssp.RainExceedance.RainExceedanceShowHideAdd($bjs);
                        }
                        break;
                    case "jbMWQMRunAddOrModify":
                        {
                            cssp.MWQMRun.MWQMRunAddOrModify($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAddOrModify":
                        {
                            cssp.MWQMRun.MWQMSubsectorAddOrModify($bjs);
                        }
                        break;
                    case "jbMWQMRunDelete":
                        {
                            cssp.MWQMRun.AskToDeleteRun($bjs);
                        }
                        break;
                    case "jbMWQMSampleAdd":
                        {
                            cssp.MWQMRun.MWQMSampleAddOrModify($bjs);
                        }
                        break;
                    case "jbMWQMSampleModify":
                        {
                            cssp.MWQMRun.MWQMSampleAddOrModify($bjs);
                        }
                        break;
                    case "jbMWQMRunAdd":
                        {
                            cssp.MWQMRun.MWQMRunAdd($bjs);
                        }
                        break;
                    case "jbMWQMRunDataLoad":
                        {
                            cssp.MWQMRun.ShowPart("MWQMRunData");
                        }
                        break;
                    case "jbMWQMRunInfoLoad":
                        {
                            cssp.MWQMRun.ShowPart("MWQMRunInfo");
                        }
                        break;
                    case "jbMWQMRunSampleDelete":
                        {
                            cssp.MWQMRun.AskToDeleteRunSample($bjs);
                        }
                        break;
                    case "jbMWQMRunShowOnMap":
                        {
                            cssp.MWQMRun.MWQMRunShowOnMap($bjs);
                        }
                        break;
                    case "jbMWQMRunShowHideEdit":
                        {
                            cssp.MWQMRun.MWQMRunShowHideEdit($bjs);
                        }
                        break;
                    case "jbMWQMRunShowHideEditButtons":
                        {
                            cssp.MWQMRun.MWQMRunShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbMWQMSiteAdd":
                        {
                            cssp.MWQMSite.MWQMSiteAddOrModifyShowHide($bjs);
                        }
                        break;
                    case "jbMWQMSiteChartBiggerHeight":
                        {
                            cssp.MWQMSite.ChartBiggerHeight();
                        }
                        break;
                    case "jbMWQMSiteChartSmallerHeight":
                        {
                            cssp.MWQMSite.ChartSmallerHeight();
                        }
                        break;
                    case "jbMWQMSiteChartBiggerWidth":
                        {
                            cssp.MWQMSite.ChartBiggerWidth();
                        }
                        break;
                    case "jbMWQMSiteChartSmallerWidth":
                        {
                            cssp.MWQMSite.ChartSmallerWidth();
                        }
                        break;
                    case "jbMWQMSiteEdit":
                        {
                            cssp.MWQMSite.MWQMSiteEdit($bjs);
                        }
                        break;
                    case "jbMWQMSiteEditSave":
                        {
                            cssp.MWQMSite.MWQMSiteEditSave($bjs);
                        }
                        break;
                    case "jbMWQMSiteChartsLoad":
                        {
                            cssp.MWQMSite.LoadMWQMSiteCharts();
                        }
                        break;
                    case "jbMWQMSiteFileDownload":
                        {
                            cssp.MWQMSite.MWQMSiteFileDownload($bjs);
                        }
                        break;
                    case "jbMWQMSiteOtherMWQMSitesLoad":
                        {
                            cssp.MWQMSite.LoadOtherMWQMSites();
                        }
                        break;
                    case "jbMWQMSiteDataLoad":
                        {
                            cssp.MWQMSite.LoadMWQMSiteTable();
                        }
                        break;
                    case "jbMWQMSiteShowHideEditButtons":
                        {
                            cssp.MWQMSite.ShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbMWQMSiteInfoShowHide":
                        {
                            cssp.MWQMSite.MWQMSiteInfoShowHide($bjs);
                        }
                        break;
                    case "jbMWQMSiteModifyShowHide":
                        {
                            cssp.MWQMSite.MWQMSiteAddOrModifyShowHide($bjs);
                        }
                        break;
                    case "jbMWQMSiteRefresh":
                        {
                            cssp.MWQMSite.DrawCharts();
                        }
                        break;
                    case "jbMWQMSiteShowHideOnMap":
                        {
                            cssp.MWQMSite.MWQMShowHideOnMap();
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisShowHideColorAndLetterHelp":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisShowHideColorAndLetterHelp($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisShowHide":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisShowHide($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisShowHideRainRows":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisShowHideRainRows($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisShowHideTideRows":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisShowHideTideRows($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisShowHideQueryTool":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisShowHideQueryTool($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisShowHideRunsNotUsed":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisShowHideRunsNotUsed($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisRemoveFromStat":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisRemoveFromStat($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisSaveCreateOrExportToExcel":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisSaveCreateOrExportToExcel($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisReportParameterOrExcelDelete":
                        {
                            cssp.MWQMSite.AskToRemoveMWQMAnalysisReportParameter($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisReportParameterOrExcelLoad":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisReportParameterOrExcelLoad($bjs);
                        }
                        break;
                    case "jbMWQMSubsectorAnalysisLoadForReport":
                        {
                            cssp.MWQMSite.MWQMSubsectorAnalysisLoadForReport($bjs);
                        }
                        break;
                    case "jbPageRefresh":
                        {
                            cssp.Helper.PageRefresh();
                        }
                        break;
                    case "jbPolSourceAddIssue":
                        {
                            cssp.PolSourceSite.PolSourceAddIssue($bjs);
                        }
                        break;
                    case "jbPolSourceObservationIssueAskToDelete":
                        {
                            cssp.PolSourceSite.PolSourceObservationIssueAskToDelete($bjs);
                        }
                        break;
                    case "jbPolSourceEditIssue":
                        {
                            cssp.PolSourceSite.PolSourceEditIssue($bjs);
                        }
                        break;
                    case "jbPolSourceObservationChangeDate":
                        {
                            cssp.PolSourceSite.PolSourceObservationChangeDate($bjs);
                        }
                        break;
                    case "jbPolSourceObservationCopy":
                        {
                            cssp.PolSourceSite.PolSourceObservationCopy($bjs);
                        }
                        break;
                    case "jbPolSourceObservationAskToDelete":
                        {
                            cssp.PolSourceSite.PolSourceObservationAskToDelete($bjs);
                        }
                        break;
                    case "jbPolSourceObservationEditSave":
                        {
                            cssp.PolSourceSite.PolSourceObservationEditSave($bjs);
                        }
                        break;
                    case "jbPolSourceSaveIssue":
                        {
                            cssp.PolSourceSite.FormSubmitIssue($bjs);
                        }
                        break;
                    case "jbPolSourceSiteShowHideEditButtons":
                        {
                            cssp.PolSourceSite.ShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbPolSourceSiteEdit":
                        {
                            cssp.PolSourceSite.PolSourceSiteEdit($bjs);
                        }
                        break;
                    case "jbPolSourceSiteEditSave":
                        {
                            cssp.PolSourceSite.FormSubmit($bjs);
                        }
                        break;
                    case "jbPolSourceSiteActiveOnly":
                        {
                            cssp.PolSourceSite.PolSourceSiteActiveOnly($bjs);
                        }
                        break;
                    case "jbPolSourceSiteAddShowHide":
                        {
                            cssp.PolSourceSite.PolSourceSiteAddOrModifyShowHide($bjs);
                        }
                        break;
                    case "jbPolSourceSiteModifyShowHide":
                        {
                            cssp.PolSourceSite.PolSourceSiteAddOrModifyShowHide($bjs);
                        }
                        break;
                    case "jbPolSourceSiteToggleActive":
                        {
                            cssp.PolSourceSite.PolSourceSiteToggleActive($bjs);
                        }
                        break;
                    case "jbPolSourceSiteShowHideOnMap":
                        {
                            cssp.PolSourceSite.PolSourceShowHideOnMap();
                        }
                        break;
                    case "jbProfileSave":
                        {
                            cssp.Profile.FormSubmit();
                        }
                        break;
                    case "jbRainExceedanceAddOrModify":
                        {
                            cssp.RainExceedance.FormSubmit($bjs);
                        }
                        break;
                    case "jbRegister":
                        {
                            cssp.Register.FormSubmit();
                        }
                        break;
                    case "jbSamplingPlanAdd":
                        {
                            cssp.SamplingPlan.SamplingPlanAdd($bjs);
                        };
                        break;
                    case "jbSamplingPlanAcceptLabSheet":
                        {
                            cssp.SamplingPlan.SamplingPlanAcceptLabSheet($bjs);
                        }
                        break;
                    case "jbSamplingPlanCopy":
                        {
                            cssp.SamplingPlan.SamplingPlanCopy($bjs);
                        };
                        break;
                    case "jbSamplingPlanGenerateSamplingPlan":
                        {
                            cssp.SamplingPlan.SamplingPlanGenerateSamplingPlan($bjs);
                        }
                        break;
                    case "jbSamplingPlanAskToDelete":
                        {
                            cssp.SamplingPlan.SamplingPlanAskToDelete($bjs);
                        }
                        break;
                    case "jbSamplingPlanDeleteFile":
                        {
                            cssp.SamplingPlan.SamplingPlanAskToDeleteFile($bjs);
                        }
                        break;
                    case "jbSamplingPlanEdit":
                        {
                            cssp.SamplingPlan.SamplingPlanEdit($bjs);
                        };
                        break;
                    case "jbSamplingPlanEditSave":
                        {
                            cssp.SamplingPlan.FormSubmitTopInfo($bjs);
                        }
                        break;
                    case "jbSamplingPlanSubsectorEditSave":
                        {
                            cssp.SamplingPlan.FormSubmitSubsector($bjs);
                        }
                        break;
                    case "jbSamplingPlanEditShowHide":
                        {
                            cssp.SamplingPlan.SamplingPlanEditShowHide($bjs);
                        }
                        break;
                    case "jbSamplingPlanRejectLabSheet":
                        {
                            cssp.SamplingPlan.SamplingPlanRejectLabSheet($bjs);
                        }
                        break;
                    case "jbSamplingPlanShowOnMap":
                        {
                            cssp.SamplingPlan.SamplingPlanShowOnMap($bjs);
                        }
                        break;
                    case "jbSamplingPlanShowMWQMSites":
                        {
                            cssp.SamplingPlan.SamplingPlanShowMWQMSites($bjs);
                        }
                        break;
                    case "jbSamplingPlanShowHistoryLabSheetDetail":
                        {
                            cssp.SamplingPlan.SamplingPlanShowHistoryLabSheetDetail($bjs);
                        }
                        break;
                    case "jbSamplingPlanShowHistoryLabSheets":
                        {
                            cssp.SamplingPlan.ShowHistoryLabSheets($bjs);
                        }
                        break;
                    case "jbSamplingPlanShowTransferredLabSheets":
                        {
                            cssp.SamplingPlan.ShowTransferredLabSheets($bjs);
                        }
                        break;
                    case "jbSamplingPlanSubsectorSelectAll":
                        {
                            cssp.SamplingPlan.SubsectorSelectAll($bjs);
                        }
                        break;
                    case "jbSamplingPlanSubsectorUnSelectAll":
                        {
                            cssp.SamplingPlan.SubsectorUnSelectAll($bjs);
                        }
                        break;
                    case "jbSecurity":
                        {
                            cssp.View.Permissions($bjs);
                        }
                        break;
                    case "jbTelAdd":
                        {
                            cssp.Tel.FormSubmitAddOrUpdate($bjs);
                        }
                        break;
                    case "jbTelDelete":
                        {
                            cssp.Tel.FormSubmitDelete($bjs);
                        }
                        break;
                    case "jbTelUpdate":
                        {
                            cssp.Tel.FormSubmitAddOrUpdate($bjs);
                        }
                        break;
                    case "jbTVTypeAuthRemove":
                        {
                            cssp.Admin.RemoveUserTVTypeAuth($bjs);
                        }
                        break;
                    case "jbTVTypeAuthNoAccess":
                        {
                            cssp.Admin.SetUserTVTypeAuth($bjs, 1);
                        }
                        break;
                    case "jbTVTypeAuthRead":
                        {
                            cssp.Admin.SetUserTVTypeAuth($bjs, 2);
                        }
                        break;
                    case "jbTVTypeAuthEdit":
                        {
                            cssp.Admin.SetUserTVTypeAuth($bjs, 3);
                        }
                        break;
                    case "jbTVTypeAuthCreate":
                        {
                            cssp.Admin.SetUserTVTypeAuth($bjs, 4);
                        }
                        break;
                    case "jbTVTypeAuthDelete":
                        {
                            cssp.Admin.SetUserTVTypeAuth($bjs, 5);
                        }
                        break;
                    case "jbTVTypeAuthAdmin":
                        {
                            cssp.Admin.SetUserTVTypeAuth($bjs, 6);
                        }
                        break;
                    case "jbTVItemAddOrModify":
                        {
                            cssp.TVItem.FormSubmit();
                        }
                        break;
                    case "jbTVItemAuthRemove":
                        {
                            cssp.Admin.RemoveUserTVItemAuth($bjs);
                        }
                        break;
                    case "jbTVItemAuthHideAdd":
                        {
                            cssp.Admin.TVItemAuthShowHideAdd($bjs);
                        }
                        break;
                    case "jbTVItemAuthShowAdd":
                        {
                            cssp.Admin.TVItemAuthShowHideAdd($bjs);
                        }
                        break;
                    case "jbTVItemAuthNoAccess":
                        {
                            cssp.Admin.SetUserTVItemAuth($bjs, 1);
                        }
                        break;
                    case "jbTVItemAuthRead":
                        {
                            cssp.Admin.SetUserTVItemAuth($bjs, 2);
                        }
                        break;
                    case "jbTVItemAuthEdit":
                        {
                            cssp.Admin.SetUserTVItemAuth($bjs, 3);
                        }
                        break;
                    case "jbTVItemAuthCreate":
                        {
                            cssp.Admin.SetUserTVItemAuth($bjs, 4);
                        }
                        break;
                    case "jbTVItemAuthDelete":
                        {
                            cssp.Admin.SetUserTVItemAuth($bjs, 5);
                        }
                        break;
                    case "jbTVItemAuthAdmin":
                        {
                            cssp.Admin.SetUserTVItemAuth($bjs, 6);
                        }
                        break;
                    case "jbTVItemAskToDelete":
                        {
                            cssp.TVItem.AskToDelete($bjs);
                        }
                        break;
                    case "jbTVItemMove":
                        {
                            cssp.View.TVItemMove($bjs);
                        }
                        break;
                    case "jbTVItemMoveStart":
                        {
                            cssp.View.TVItemMoveStart($bjs);
                        }
                        break;
                    case "jbTVItemShowAdd":
                        {
                            cssp.TVItem.ShowAdd($bjs);
                        }
                        break;
                    case "jbTVItemShowHideEditButtons":
                        {
                            cssp.TVItem.ShowHideEditButtons($bjs);
                        }
                        break;
                    case "jbTVItemShowModify":
                        {
                            cssp.TVItem.ShowModify($bjs);
                        }
                        break;
                    case "jbVPScenarioCopy":
                        {
                            cssp.VisualPlumes.CopyVPScenario($bjs);
                        }
                        break;
                    case "jbVPScenarioCreate":
                        {
                            cssp.VisualPlumes.CreateVPScenario($bjs);
                        }
                        break;
                    case "jbVPScenarioDelete":
                        {
                            cssp.VisualPlumes.AskToDelete($bjs);
                        }
                        break;
                    case "jbVPScenarioRefresh":
                        {
                            cssp.Helper.PageRefresh();
                        }
                        break;
                    case "jbVPScenarioSave":
                        {
                            cssp.VisualPlumes.FormSubmit($bjs);
                        }
                        break;
                    case "jbVPScenarioShowChartResult":
                        {
                            cssp.VisualPlumes.VPScenarioShowChartResult($bjs);
                        }
                        break;
                    case "jbVPScenarioShowInput":
                        {
                            cssp.VisualPlumes.VPScenarioShowInput($bjs);
                        }
                        break;
                    case "jbVPScenarioShowRawResult":
                        {
                            cssp.VisualPlumes.VPScenarioShowRawResult($bjs);
                        }
                        break;
                    case "jbVPScenarioShowResult":
                        {
                            cssp.VisualPlumes.VPScenarioShowResult($bjs);
                        }
                        break;
                    case "jbVPScenarioView":
                        {
                            cssp.VisualPlumes.LoadVPScenario($bjs);
                        }
                        break;
                    case "jbVPShowList":
                        {
                            cssp.VisualPlumes.ReloadVPList($bjs);
                        }
                        break;
                    default:
                        {
                            cssp.Dialog.ShowDialogBasic(new DialogModel(DialogModelTypeEnum.Error, $bjs.attr("class").split(" ")[0], cssp.GetHTMLVariable("#LayoutVariables", "varNotImplemented")));
                        }
                        break;
                }
                return false;
            });
        };
    }
}