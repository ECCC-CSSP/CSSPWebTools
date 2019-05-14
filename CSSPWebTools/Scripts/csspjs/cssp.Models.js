var CSSP;
(function (CSSP) {
    var ClimateSiteUseOfSiteOrdinal = /** @class */ (function () {
        function ClimateSiteUseOfSiteOrdinal(UseOfSiteID, Ordinal) {
            this.UseOfSiteID = UseOfSiteID;
            this.Ordinal = Ordinal;
        }
        return ClimateSiteUseOfSiteOrdinal;
    }());
    CSSP.ClimateSiteUseOfSiteOrdinal = ClimateSiteUseOfSiteOrdinal;
    var ClimateSiteTVItemIDYearsText = /** @class */ (function () {
        function ClimateSiteTVItemIDYearsText(ClimateSiteTVItemID, YearsText) {
            this.ClimateSiteTVItemID = ClimateSiteTVItemID;
            this.YearsText = YearsText;
        }
        return ClimateSiteTVItemIDYearsText;
    }());
    CSSP.ClimateSiteTVItemIDYearsText = ClimateSiteTVItemIDYearsText;
    var HydrometricSiteUseOfSiteOrdinal = /** @class */ (function () {
        function HydrometricSiteUseOfSiteOrdinal(UseOfSiteID, Ordinal) {
            this.UseOfSiteID = UseOfSiteID;
            this.Ordinal = Ordinal;
        }
        return HydrometricSiteUseOfSiteOrdinal;
    }());
    CSSP.HydrometricSiteUseOfSiteOrdinal = HydrometricSiteUseOfSiteOrdinal;
    var HydrometricSiteTVItemIDYearsText = /** @class */ (function () {
        function HydrometricSiteTVItemIDYearsText(HydrometricSiteTVItemID, YearsText) {
            this.HydrometricSiteTVItemID = HydrometricSiteTVItemID;
            this.YearsText = YearsText;
        }
        return HydrometricSiteTVItemIDYearsText;
    }());
    CSSP.HydrometricSiteTVItemIDYearsText = HydrometricSiteTVItemIDYearsText;
    var MWQMSubsectorAnalysisModel = /** @class */ (function () {
        function MWQMSubsectorAnalysisModel(mwqmSubsectorModel, mwqmSiteAnalysisModelList, mwqmRunAnalysisModelList) {
            this.mwqmSubsectorModel = mwqmSubsectorModel;
            this.mwqmSiteAnalysisModelList = mwqmSiteAnalysisModelList;
            this.mwqmRunAnalysisModelList = mwqmRunAnalysisModelList;
        }
        ;
        return MWQMSubsectorAnalysisModel;
    }());
    CSSP.MWQMSubsectorAnalysisModel = MWQMSubsectorAnalysisModel;
    var MWQMSubsectorModel = /** @class */ (function () {
        function MWQMSubsectorModel(MWQMSubsectorTVItemID, ShortRangeEnd, MidRangeEnd, UpperRainLimitStillConsideredDry1, UpperRainLimitStillConsideredDry2, UpperRainLimitStillConsideredDry3, UpperRainLimitStillConsideredDry4, LowerRainLimitConsideredRain1, LowerRainLimitConsideredRain2, LowerRainLimitConsideredRain3, LowerRainLimitConsideredRain4, StartDate, EndDate, Runs, CalculationDataType, SelectFullYear, StartYear, EndYear) {
            this.MWQMSubsectorTVItemID = MWQMSubsectorTVItemID;
            this.ShortRangeEnd = ShortRangeEnd;
            this.MidRangeEnd = MidRangeEnd;
            this.UpperRainLimitStillConsideredDry1 = UpperRainLimitStillConsideredDry1;
            this.UpperRainLimitStillConsideredDry2 = UpperRainLimitStillConsideredDry2;
            this.UpperRainLimitStillConsideredDry3 = UpperRainLimitStillConsideredDry3;
            this.UpperRainLimitStillConsideredDry4 = UpperRainLimitStillConsideredDry4;
            this.LowerRainLimitConsideredRain1 = LowerRainLimitConsideredRain1;
            this.LowerRainLimitConsideredRain2 = LowerRainLimitConsideredRain2;
            this.LowerRainLimitConsideredRain3 = LowerRainLimitConsideredRain3;
            this.LowerRainLimitConsideredRain4 = LowerRainLimitConsideredRain4;
            this.StartDate = StartDate;
            this.EndDate = EndDate;
            this.Runs = Runs;
            this.CalculationDataType = CalculationDataType;
            this.SelectFullYear = SelectFullYear;
            this.StartYear = StartYear;
            this.EndYear = EndYear;
        }
        ;
        return MWQMSubsectorModel;
    }());
    CSSP.MWQMSubsectorModel = MWQMSubsectorModel;
    var MWQMSiteAnalysisModel = /** @class */ (function () {
        function MWQMSiteAnalysisModel(SiteIndex, MWQMSiteTVItemID, Samples, StartYear, EndYear, MinFC, MaxFC, GMean, Median, P90, PercOver43, PercOver260, mwqmSampleAnalysisModel, colorAndLetter, isActive) {
            this.SiteIndex = SiteIndex;
            this.MWQMSiteTVItemID = MWQMSiteTVItemID;
            this.Samples = Samples;
            this.StartYear = StartYear;
            this.EndYear = EndYear;
            this.MinFC = MinFC;
            this.MaxFC = MaxFC;
            this.GMean = GMean;
            this.Median = Median;
            this.P90 = P90;
            this.PercOver43 = PercOver43;
            this.PercOver260 = PercOver260;
            this.mwqmSampleAnalysisModel = mwqmSampleAnalysisModel;
            this.colorAndLetter = colorAndLetter;
            this.isActive = isActive;
        }
        ;
        return MWQMSiteAnalysisModel;
    }());
    CSSP.MWQMSiteAnalysisModel = MWQMSiteAnalysisModel;
    var MWQMRunAnalysisModel = /** @class */ (function () {
        function MWQMRunAnalysisModel(RunIndex, MWQMRunTVItemID, IsOKRun, RemoveFromStat, RunDate, RainDay0, RainDay1, RainDay2, RainDay3, RainDay4, RainDay5, RainDay6, RainDay7, RainDay8, RainDay9, RainDay10, StartTide, EndTide, UseInStat, RunYear) {
            this.RunIndex = RunIndex;
            this.MWQMRunTVItemID = MWQMRunTVItemID;
            this.IsOKRun = IsOKRun;
            this.RemoveFromStat = RemoveFromStat;
            this.RunDate = RunDate;
            this.RainDay0 = RainDay0;
            this.RainDay1 = RainDay1;
            this.RainDay2 = RainDay2;
            this.RainDay3 = RainDay3;
            this.RainDay4 = RainDay4;
            this.RainDay5 = RainDay5;
            this.RainDay6 = RainDay6;
            this.RainDay7 = RainDay7;
            this.RainDay8 = RainDay8;
            this.RainDay9 = RainDay9;
            this.RainDay10 = RainDay10;
            this.StartTide = StartTide;
            this.EndTide = EndTide;
            this.UseInStat = UseInStat;
            this.RunYear = RunYear;
        }
        ;
        return MWQMRunAnalysisModel;
    }());
    CSSP.MWQMRunAnalysisModel = MWQMRunAnalysisModel;
    var MWQMSampleAnalysisModel = /** @class */ (function () {
        function MWQMSampleAnalysisModel(SiteIndex, RunIndex, MWQMRunTVItemID, RunSampleTypeText, FC, Temp, Sal, GeoMean, Median, P90, PercOver43, PercOver260, SampleDate, UseInStat, SampleYear) {
            this.SiteIndex = SiteIndex;
            this.RunIndex = RunIndex;
            this.MWQMRunTVItemID = MWQMRunTVItemID;
            this.RunSampleTypeText = RunSampleTypeText;
            this.FC = FC;
            this.Temp = Temp;
            this.Sal = Sal;
            this.GeoMean = GeoMean;
            this.Median = Median;
            this.P90 = P90;
            this.PercOver43 = PercOver43;
            this.PercOver260 = PercOver260;
            this.SampleDate = SampleDate;
            this.UseInStat = UseInStat;
            this.SampleYear = SampleYear;
        }
        ;
        return MWQMSampleAnalysisModel;
    }());
    CSSP.MWQMSampleAnalysisModel = MWQMSampleAnalysisModel;
    var ValRun = /** @class */ (function () {
        function ValRun(val, run) {
            this.val = val;
            this.run = run;
        }
        return ValRun;
    }());
    CSSP.ValRun = ValRun;
    var ColorAndLetter = /** @class */ (function () {
        function ColorAndLetter(color, letter) {
            this.color = color;
            this.letter = letter;
        }
        return ColorAndLetter;
    }());
    CSSP.ColorAndLetter = ColorAndLetter;
    var RunsToRemoveFromStat = /** @class */ (function () {
        function RunsToRemoveFromStat(RemoveFromStat, MWQMRunTVItemID) {
            this.RemoveFromStat = RemoveFromStat;
            this.MWQMRunTVItemID = MWQMRunTVItemID;
        }
        return RunsToRemoveFromStat;
    }());
    CSSP.RunsToRemoveFromStat = RunsToRemoveFromStat;
    var UseRunAndRainValue = /** @class */ (function () {
        function UseRunAndRainValue(UseRun, RainValue) {
            this.UseRun = UseRun;
            this.RainValue = RainValue;
        }
        return UseRunAndRainValue;
    }());
    CSSP.UseRunAndRainValue = UseRunAndRainValue;
    //export class SearchTagsAndTerms {
    //    constructor(public tag: SearchTagEnum, public Term) {
    //    }
    //}
    //export enum SearchTagEnum {
    //    Error,
    //    Contact,           // c:
    //    Email,             // e:  
    //    Telephone,         // t:
    //    FilePicture,       // fp:
    //    FileReport,        // fr:
    //    FileGenerated,     // fg:
    //    FilePDF,           // fpdf:
    //    FileDOCX,          // fdocx:
    //    FileXLSX,          // fxlsx:
    //    FileKMZ,           // fkmz:
    //    Municipality,      // m:
    //    Province,          // p:
    //    MikeScenario,      // ms:
    //    ClimateSite,       // cs:
    //    HydrometricSite,   // hs:
    //    TideSite,          // ts:
    //    MWQMSite,          // st:
    //    PollutionSource,   // ps:
    //    Area,              // a:
    //    Sector,            // s:
    //    Subsector,         // ss:
    //    UnderWhereYouAre,  // u:
    //    NoTag,             // no tag
    //}                      
    var LegendElem = /** @class */ (function () {
        function LegendElem(TVType, Color, LegendText) {
            this.TVType = TVType;
            this.Color = Color;
            this.LegendText = LegendText;
        }
        return LegendElem;
    }());
    CSSP.LegendElem = LegendElem;
    var TVTypeTVAuth = /** @class */ (function () {
        function TVTypeTVAuth(TVTypeUserAuthID, TVType, TVPath, TVAuth, Level) {
            this.TVTypeUserAuthID = TVTypeUserAuthID;
            this.TVType = TVType;
            this.TVPath = TVPath;
            this.TVAuth = TVAuth;
            this.Level = Level;
        }
        return TVTypeTVAuth;
    }());
    CSSP.TVTypeTVAuth = TVTypeTVAuth;
    var TVItemTVAuth = /** @class */ (function () {
        function TVItemTVAuth(TVItemUserAuthID, TVText, TVItemID1, TVTypeStr, TVAuth) {
            this.TVItemUserAuthID = TVItemUserAuthID;
            this.TVText = TVText;
            this.TVItemID1 = TVItemID1;
            this.TVTypeStr = TVTypeStr;
            this.TVAuth = TVAuth;
        }
        return TVItemTVAuth;
    }());
    CSSP.TVItemTVAuth = TVItemTVAuth;
    var TVTypeNamesAndTVPath = /** @class */ (function () {
        function TVTypeNamesAndTVPath(TVTypeName, Index, TVPath, ParentIndex) {
            this.TVTypeName = TVTypeName;
            this.Index = Index;
            this.TVPath = TVPath;
            this.ParentIndex = ParentIndex;
        }
        return TVTypeNamesAndTVPath;
    }());
    CSSP.TVTypeNamesAndTVPath = TVTypeNamesAndTVPath;
    var ContactModel = /** @class */ (function () {
        function ContactModel(ContactTVItemID, Disabled, LoginEmail) {
            this.ContactTVItemID = ContactTVItemID;
            this.Disabled = Disabled;
            this.LoginEmail = LoginEmail;
        }
        return ContactModel;
    }());
    CSSP.ContactModel = ContactModel;
    var ContactSearchModel = /** @class */ (function () {
        function ContactSearchModel(ContactTVItemID, FullName) {
            this.ContactTVItemID = ContactTVItemID;
            this.FullName = FullName;
        }
        return ContactSearchModel;
    }());
    CSSP.ContactSearchModel = ContactSearchModel;
    var LoginModel = /** @class */ (function () {
        function LoginModel(Error, Email, ReturnURL) {
            this.Error = Error;
            this.Email = Email;
            this.ReturnURL = ReturnURL;
        }
        return LoginModel;
    }());
    CSSP.LoginModel = LoginModel;
    var DialogModel = /** @class */ (function () {
        function DialogModel(DialogModelType, Title, Message) {
            this.DialogModelType = DialogModelType;
            this.Title = Title;
            this.Message = Message;
        }
        return DialogModel;
    }());
    CSSP.DialogModel = DialogModel;
    var DialogModelTypeEnum;
    (function (DialogModelTypeEnum) {
        DialogModelTypeEnum[DialogModelTypeEnum["Error"] = 0] = "Error";
        DialogModelTypeEnum[DialogModelTypeEnum["Success"] = 1] = "Success";
        DialogModelTypeEnum[DialogModelTypeEnum["AreYouSure"] = 2] = "AreYouSure";
        DialogModelTypeEnum[DialogModelTypeEnum["Permissions"] = 3] = "Permissions";
        DialogModelTypeEnum[DialogModelTypeEnum["Message"] = 4] = "Message";
        DialogModelTypeEnum[DialogModelTypeEnum["TVItemMoving"] = 5] = "TVItemMoving";
        DialogModelTypeEnum[DialogModelTypeEnum["Help"] = 6] = "Help";
        DialogModelTypeEnum[DialogModelTypeEnum["ContinueSaving"] = 7] = "ContinueSaving";
    })(DialogModelTypeEnum = CSSP.DialogModelTypeEnum || (CSSP.DialogModelTypeEnum = {}));
    var DialogCommandEnum;
    (function (DialogCommandEnum) {
        DialogCommandEnum[DialogCommandEnum["Yes"] = 0] = "Yes";
        DialogCommandEnum[DialogCommandEnum["No"] = 1] = "No";
        DialogCommandEnum[DialogCommandEnum["OK"] = 2] = "OK";
        DialogCommandEnum[DialogCommandEnum["Save"] = 3] = "Save";
        DialogCommandEnum[DialogCommandEnum["Cancel"] = 4] = "Cancel";
        DialogCommandEnum[DialogCommandEnum["Close"] = 5] = "Close";
    })(DialogCommandEnum = CSSP.DialogCommandEnum || (CSSP.DialogCommandEnum = {}));
    var InfrastructureTypeEnum;
    (function (InfrastructureTypeEnum) {
        InfrastructureTypeEnum[InfrastructureTypeEnum["Error"] = 0] = "Error";
        InfrastructureTypeEnum[InfrastructureTypeEnum["WWTP"] = 1] = "WWTP";
        InfrastructureTypeEnum[InfrastructureTypeEnum["LiftStation"] = 2] = "LiftStation";
        InfrastructureTypeEnum[InfrastructureTypeEnum["Other"] = 3] = "Other";
        InfrastructureTypeEnum[InfrastructureTypeEnum["SeeOtherMunicipality"] = 4] = "SeeOtherMunicipality";
    })(InfrastructureTypeEnum = CSSP.InfrastructureTypeEnum || (CSSP.InfrastructureTypeEnum = {}));
    var Variables = /** @class */ (function () {
        function Variables() {
            this.URL = "";
            this.LoginEmail = "";
            this.IsAdmin = "false";
            this.Culture = Globalize.culture.name;
            this.TVTextList = [];
            this.TVItemIDList = [];
            this.VariableShow = "";
        }
        return Variables;
    }());
    CSSP.Variables = Variables;
    var URLVarShowEnum;
    (function (URLVarShowEnum) {
        URLVarShowEnum[URLVarShowEnum["ShowTesting"] = 0] = "ShowTesting";
        URLVarShowEnum[URLVarShowEnum["ShowMap"] = 1] = "ShowMap";
        URLVarShowEnum[URLVarShowEnum["ShowMoreInfo"] = 2] = "ShowMoreInfo";
        URLVarShowEnum[URLVarShowEnum["ShowRootTab"] = 3] = "ShowRootTab";
        URLVarShowEnum[URLVarShowEnum["ShowCountryTab"] = 4] = "ShowCountryTab";
        URLVarShowEnum[URLVarShowEnum["ShowProvinceTab"] = 5] = "ShowProvinceTab";
        URLVarShowEnum[URLVarShowEnum["ShowAreaTab"] = 6] = "ShowAreaTab";
        URLVarShowEnum[URLVarShowEnum["ShowSectorTab"] = 7] = "ShowSectorTab";
        URLVarShowEnum[URLVarShowEnum["ShowSubsectorTab"] = 8] = "ShowSubsectorTab";
        URLVarShowEnum[URLVarShowEnum["ShowMunicipalityTab"] = 9] = "ShowMunicipalityTab";
        URLVarShowEnum[URLVarShowEnum["ShowInfrastructureTab"] = 10] = "ShowInfrastructureTab";
        URLVarShowEnum[URLVarShowEnum["ShowMWQMRunsTab"] = 11] = "ShowMWQMRunsTab";
        URLVarShowEnum[URLVarShowEnum["ShowMWQMSitesTab"] = 12] = "ShowMWQMSitesTab";
        URLVarShowEnum[URLVarShowEnum["ShowPolSourceSiteTab"] = 13] = "ShowPolSourceSiteTab";
        URLVarShowEnum[URLVarShowEnum["ShowClimateSite"] = 14] = "ShowClimateSite";
        URLVarShowEnum[URLVarShowEnum["ShowHydrometricSite"] = 15] = "ShowHydrometricSite";
        URLVarShowEnum[URLVarShowEnum["ShowTideSite"] = 16] = "ShowTideSite";
        URLVarShowEnum[URLVarShowEnum["ShowMikeScenarioTab"] = 17] = "ShowMikeScenarioTab";
        URLVarShowEnum[URLVarShowEnum["ShowWWTPAndLSTab"] = 18] = "ShowWWTPAndLSTab";
        URLVarShowEnum[URLVarShowEnum["ShowVisualPlumesTab"] = 19] = "ShowVisualPlumesTab";
        URLVarShowEnum[URLVarShowEnum["ShowFullLegend"] = 20] = "ShowFullLegend";
        URLVarShowEnum[URLVarShowEnum["ShowMuni"] = 21] = "ShowMuni";
        URLVarShowEnum[URLVarShowEnum["ShowMWQMSiteByDate"] = 22] = "ShowMWQMSiteByDate";
        URLVarShowEnum[URLVarShowEnum["ShowMWQMSiteByNormal"] = 23] = "ShowMWQMSiteByNormal";
        URLVarShowEnum[URLVarShowEnum["ShowMapFull"] = 24] = "ShowMapFull";
        URLVarShowEnum[URLVarShowEnum["ShowTheNoDataInMap"] = 25] = "ShowTheNoDataInMap";
        URLVarShowEnum[URLVarShowEnum["ShowAll"] = 26] = "ShowAll";
        URLVarShowEnum[URLVarShowEnum["NumberOfSampleDecade"] = 27] = "NumberOfSampleDecade";
        URLVarShowEnum[URLVarShowEnum["NumberOfSampleUnit"] = 28] = "NumberOfSampleUnit";
    })(URLVarShowEnum = CSSP.URLVarShowEnum || (CSSP.URLVarShowEnum = {}));
    var URLVarYearEnum;
    (function (URLVarYearEnum) {
        URLVarYearEnum[URLVarYearEnum["ShowMWQMSiteWithDataAfterYear"] = 0] = "ShowMWQMSiteWithDataAfterYear";
        URLVarYearEnum[URLVarYearEnum["ShowMWQMSiteChartFromYear"] = 1] = "ShowMWQMSiteChartFromYear";
    })(URLVarYearEnum = CSSP.URLVarYearEnum || (CSSP.URLVarYearEnum = {}));
    var ButtonCreationModel = /** @class */ (function () {
        function ButtonCreationModel(className, iconNamePrimary, iconNameSecondary, keepText) {
            this.className = className;
            this.iconNamePrimary = iconNamePrimary;
            this.iconNameSecondary = iconNameSecondary;
            this.keepText = keepText;
        }
        return ButtonCreationModel;
    }());
    CSSP.ButtonCreationModel = ButtonCreationModel;
    var PinObjectModel = /** @class */ (function () {
        function PinObjectModel(ImageSrc, LegendText, TVType, SubTVText, IsUsed) {
            this.ImageSrc = ImageSrc;
            this.LegendText = LegendText;
            this.TVType = TVType;
            this.SubTVText = SubTVText;
            this.IsUsed = IsUsed;
        }
        return PinObjectModel;
    }());
    CSSP.PinObjectModel = PinObjectModel;
    var DrawTypeEnum;
    (function (DrawTypeEnum) {
        DrawTypeEnum[DrawTypeEnum["Error"] = 0] = "Error";
        DrawTypeEnum[DrawTypeEnum["Point"] = 1] = "Point";
        DrawTypeEnum[DrawTypeEnum["Polyline"] = 2] = "Polyline";
        DrawTypeEnum[DrawTypeEnum["Polygon"] = 3] = "Polygon";
    })(DrawTypeEnum = CSSP.DrawTypeEnum || (CSSP.DrawTypeEnum = {}));
    var Coord = /** @class */ (function () {
        function Coord(Lat, Lng, Ordinal) {
            this.Lat = Lat;
            this.Lng = Lng;
            this.Ordinal = Ordinal;
        }
        return Coord;
    }());
    CSSP.Coord = Coord;
    var MapObj = /** @class */ (function () {
        function MapObj(MapInfoID, MapInfoDrawType, CoordList) {
            this.MapInfoID = MapInfoID;
            this.MapInfoDrawType = MapInfoDrawType;
            this.CoordList = CoordList;
        }
        return MapObj;
    }());
    CSSP.MapObj = MapObj;
    var tvLocation = /** @class */ (function () {
        function tvLocation(TVItemID, TVText, TVType, SubTVType, MapObjList) {
            this.TVItemID = TVItemID;
            this.TVText = TVText;
            this.TVType = TVType;
            this.SubTVType = SubTVType;
            this.MapObjList = MapObjList;
        }
        return tvLocation;
    }());
    CSSP.tvLocation = tvLocation;
    var polSourceSiteObsModel = /** @class */ (function () {
        // Constructor
        function polSourceSiteObsModel(PolSourceObservationID, Error, PolSourceSiteID, siteid, ObservationDate, InspectorName, PolTypeText, PolTypeAcronym, PolStatusText, PolStatusAcronym, PolRiskText, PolRiskAcronym, ObservationText, IsPointSource, IsActive) {
            this.PolSourceObservationID = PolSourceObservationID;
            this.Error = Error;
            this.PolSourceSiteID = PolSourceSiteID;
            this.siteid = siteid;
            this.ObservationDate = ObservationDate;
            this.InspectorName = InspectorName;
            this.PolTypeText = PolTypeText;
            this.PolTypeAcronym = PolTypeAcronym;
            this.PolStatusText = PolStatusText;
            this.PolStatusAcronym = PolStatusAcronym;
            this.PolRiskText = PolRiskText;
            this.PolRiskAcronym = PolRiskAcronym;
            this.ObservationText = ObservationText;
            this.IsPointSource = IsPointSource;
            this.IsActive = IsActive;
            this.ObservationDateTxt = "";
            this.GetDateTxt = function (TheDate) {
                if (TheDate) {
                    return "";
                }
                else {
                    return Globalize.format(new Date(TheDate.getFullYear(), (TheDate.getMonth() + 1), TheDate.getDate()), "D", Globalize.culture.name.substr(0, 2));
                }
            };
            this.ObservationDateTxt = this.GetDateTxt(ObservationDate);
        }
        return polSourceSiteObsModel;
    }());
    CSSP.polSourceSiteObsModel = polSourceSiteObsModel;
    var polSourceSiteModel = /** @class */ (function () {
        function polSourceSiteModel(PolSourceSiteID, TVText, TypeText, TVPath, Error, BCKey, QCKey, Site, ActiveStartDate, ActiveEndDate, Latitude, Longitude) {
            this.PolSourceSiteID = PolSourceSiteID;
            this.TVText = TVText;
            this.TypeText = TypeText;
            this.TVPath = TVPath;
            this.Error = Error;
            this.BCKey = BCKey;
            this.QCKey = QCKey;
            this.Site = Site;
            this.ActiveStartDate = ActiveStartDate;
            this.ActiveEndDate = ActiveEndDate;
            this.Latitude = Latitude;
            this.Longitude = Longitude;
            this.ActiveStartDateTxt = "";
            this.ActiveEndDateTxt = "";
            this.GetDateTxt = function (TheDate) {
                if (TheDate) {
                    return "";
                }
                else {
                    return Globalize.format(new Date(TheDate.getFullYear(), (TheDate.getMonth() + 1), TheDate.getDate()), "D", Globalize.culture.name.substr(0, 2));
                }
            };
            this.ActiveStartDateTxt = this.GetDateTxt(ActiveStartDate);
            this.ActiveEndDateTxt = this.GetDateTxt(ActiveEndDate);
        }
        return polSourceSiteModel;
    }());
    CSSP.polSourceSiteModel = polSourceSiteModel;
    var mwqmSampleModel = /** @class */ (function () {
        function mwqmSampleModel(MWQMSampleID, Error, MWQMRunID, MWQMSiteID, SampleDateTime, DO_mg_L, FecCol_MPN_100ml, Salinity_PPT, WaterTemp_C) {
            this.MWQMSampleID = MWQMSampleID;
            this.Error = Error;
            this.MWQMRunID = MWQMRunID;
            this.MWQMSiteID = MWQMSiteID;
            this.SampleDateTime = SampleDateTime;
            this.DO_mg_L = DO_mg_L;
            this.FecCol_MPN_100ml = FecCol_MPN_100ml;
            this.Salinity_PPT = Salinity_PPT;
            this.WaterTemp_C = WaterTemp_C;
            this.SampleDateTimeTxt = "";
            this.GetDateTxt = function (TheDate) {
                if (TheDate) {
                    return "";
                }
                else {
                    return Globalize.format(new Date(TheDate.getFullYear(), (TheDate.getMonth() + 1), TheDate.getDate()), "D", Globalize.culture.name.substr(0, 2));
                }
            };
            this.SampleDateTimeTxt = this.GetDateTxt(SampleDateTime);
        }
        return mwqmSampleModel;
    }());
    CSSP.mwqmSampleModel = mwqmSampleModel;
    var mwqmSiteModel = /** @class */ (function () {
        function mwqmSiteModel(MWQMSiteID, TVText, TypeText, TVPath, Error, SiteNumber, SiteName, ActiveStartDate, ActiveEndDate, Latitude, Longitude) {
            this.MWQMSiteID = MWQMSiteID;
            this.TVText = TVText;
            this.TypeText = TypeText;
            this.TVPath = TVPath;
            this.Error = Error;
            this.SiteNumber = SiteNumber;
            this.SiteName = SiteName;
            this.ActiveStartDate = ActiveStartDate;
            this.ActiveEndDate = ActiveEndDate;
            this.Latitude = Latitude;
            this.Longitude = Longitude;
            this.ActiveStartDateTxt = "";
            this.ActiveEndDateTxt = "";
            this.GetDateTxt = function (TheDate) {
                if (TheDate) {
                    return "";
                }
                else {
                    return Globalize.format(new Date(TheDate.getFullYear(), (TheDate.getMonth() + 1), TheDate.getDate()), "D", Globalize.culture.name.substr(0, 2));
                }
            };
            this.ActiveStartDateTxt = this.GetDateTxt(ActiveStartDate);
            this.ActiveEndDateTxt = this.GetDateTxt(ActiveEndDate);
        }
        return mwqmSiteModel;
    }());
    CSSP.mwqmSiteModel = mwqmSiteModel;
    var mwqmRunModel = /** @class */ (function () {
        function mwqmRunModel(MWQMRunID, TVText, TypeText, TVPath, Error, RunNumber, StartDate, EndDate, TideStart, TideEnd, Note, RainDay1, RainDay2, RainDay3) {
            this.MWQMRunID = MWQMRunID;
            this.TVText = TVText;
            this.TypeText = TypeText;
            this.TVPath = TVPath;
            this.Error = Error;
            this.RunNumber = RunNumber;
            this.StartDate = StartDate;
            this.EndDate = EndDate;
            this.TideStart = TideStart;
            this.TideEnd = TideEnd;
            this.Note = Note;
            this.RainDay1 = RainDay1;
            this.RainDay2 = RainDay2;
            this.RainDay3 = RainDay3;
            this.StartDateTxt = "";
            this.EndDateTxt = "";
            this.GetDateTxt = function (TheDate) {
                if (TheDate) {
                    return "";
                }
                else {
                    return Globalize.format(new Date(TheDate.getFullYear(), (TheDate.getMonth() + 1), TheDate.getDate()), "D", Globalize.culture.name.substr(0, 2));
                }
            };
            this.StartDateTxt = this.GetDateTxt(StartDate);
            this.EndDateTxt = this.GetDateTxt(EndDate);
        }
        return mwqmRunModel;
    }());
    CSSP.mwqmRunModel = mwqmRunModel;
    var StatareaModel = /** @class */ (function () {
        function StatareaModel(Error, SectorCount, SubSectorCount, MWQMRunCount, MWQMSampleCount, MWQMSiteCount, PolSourceSiteCount) {
            this.Error = Error;
            this.SectorCount = SectorCount;
            this.SubSectorCount = SubSectorCount;
            this.MWQMRunCount = MWQMRunCount;
            this.MWQMSampleCount = MWQMSampleCount;
            this.MWQMSiteCount = MWQMSiteCount;
            this.PolSourceSiteCount = PolSourceSiteCount;
        }
        return StatareaModel;
    }());
    CSSP.StatareaModel = StatareaModel;
    var StatliftstationModel = /** @class */ (function () {
        function StatliftstationModel(Error, SpillCount, BoxModelCount, VPScenarioCount) {
            this.Error = Error;
            this.SpillCount = SpillCount;
            this.BoxModelCount = BoxModelCount;
            this.VPScenarioCount = VPScenarioCount;
        }
        return StatliftstationModel;
    }());
    CSSP.StatliftstationModel = StatliftstationModel;
    var StatmikescenarioModel = /** @class */ (function () {
        function StatmikescenarioModel(Error, HydroFileSize, TransFileSize) {
            this.Error = Error;
            this.HydroFileSize = HydroFileSize;
            this.TransFileSize = TransFileSize;
        }
        return StatmikescenarioModel;
    }());
    CSSP.StatmikescenarioModel = StatmikescenarioModel;
    var StatmunicipalityModel = /** @class */ (function () {
        function StatmunicipalityModel(Error, WWTPCount, LiftSiteCount, MikeScenarioCount, BoxModelCount, VPScenarioCount) {
            this.Error = Error;
            this.WWTPCount = WWTPCount;
            this.LiftSiteCount = LiftSiteCount;
            this.MikeScenarioCount = MikeScenarioCount;
            this.BoxModelCount = BoxModelCount;
            this.VPScenarioCount = VPScenarioCount;
        }
        return StatmunicipalityModel;
    }());
    CSSP.StatmunicipalityModel = StatmunicipalityModel;
    var StatpolsourcesiteModel = /** @class */ (function () {
        function StatpolsourcesiteModel(Error, FullDesc) {
            this.Error = Error;
            this.FullDesc = FullDesc;
        }
        return StatpolsourcesiteModel;
    }());
    CSSP.StatpolsourcesiteModel = StatpolsourcesiteModel;
    var StatprovinceModel = /** @class */ (function () {
        function StatprovinceModel(Error, MunicipalityCount, WWTPCount, LiftSiteCount, AreaCount, SectorCount, SubSectorCount, MWQMRunCount, MWQMSampleCount, MWQMSiteCount, PolSourceSiteCount, MikeScenarioCount, BoxModelCount, VPScenarioCount) {
            this.Error = Error;
            this.MunicipalityCount = MunicipalityCount;
            this.WWTPCount = WWTPCount;
            this.LiftSiteCount = LiftSiteCount;
            this.AreaCount = AreaCount;
            this.SectorCount = SectorCount;
            this.SubSectorCount = SubSectorCount;
            this.MWQMRunCount = MWQMRunCount;
            this.MWQMSampleCount = MWQMSampleCount;
            this.MWQMSiteCount = MWQMSiteCount;
            this.PolSourceSiteCount = PolSourceSiteCount;
            this.MikeScenarioCount = MikeScenarioCount;
            this.BoxModelCount = BoxModelCount;
            this.VPScenarioCount = VPScenarioCount;
        }
        return StatprovinceModel;
    }());
    CSSP.StatprovinceModel = StatprovinceModel;
    var StatsectorModel = /** @class */ (function () {
        function StatsectorModel(Error, SubSectorCount, MWQMRunCount, MWQMSampleCount, MWQMSiteCount, PolSourceSiteCount) {
            this.Error = Error;
            this.SubSectorCount = SubSectorCount;
            this.MWQMRunCount = MWQMRunCount;
            this.MWQMSampleCount = MWQMSampleCount;
            this.MWQMSiteCount = MWQMSiteCount;
            this.PolSourceSiteCount = PolSourceSiteCount;
        }
        return StatsectorModel;
    }());
    CSSP.StatsectorModel = StatsectorModel;
    var StatsubsectorModel = /** @class */ (function () {
        function StatsubsectorModel(Error, MWQMRunCount, MWQMSampleCount, MWQMSiteCount, PolSourceSiteCount) {
            this.Error = Error;
            this.MWQMRunCount = MWQMRunCount;
            this.MWQMSampleCount = MWQMSampleCount;
            this.MWQMSiteCount = MWQMSiteCount;
            this.PolSourceSiteCount = PolSourceSiteCount;
        }
        return StatsubsectorModel;
    }());
    CSSP.StatsubsectorModel = StatsubsectorModel;
    var StatmwqmrunModel = /** @class */ (function () {
        function StatmwqmrunModel(Error, MWQMSampleCount) {
            this.Error = Error;
            this.MWQMSampleCount = MWQMSampleCount;
        }
        return StatmwqmrunModel;
    }());
    CSSP.StatmwqmrunModel = StatmwqmrunModel;
    var StatmwqmsiteModel = /** @class */ (function () {
        function StatmwqmsiteModel(Error, MWQMSampleCount) {
            this.Error = Error;
            this.MWQMSampleCount = MWQMSampleCount;
        }
        return StatmwqmsiteModel;
    }());
    CSSP.StatmwqmsiteModel = StatmwqmsiteModel;
    var StatwwtpModel = /** @class */ (function () {
        function StatwwtpModel(Error, SpillCount, LiftSiteCount, BoxModelCount, VPScenarioCount) {
            this.Error = Error;
            this.SpillCount = SpillCount;
            this.LiftSiteCount = LiftSiteCount;
            this.BoxModelCount = BoxModelCount;
            this.VPScenarioCount = VPScenarioCount;
        }
        return StatwwtpModel;
    }());
    CSSP.StatwwtpModel = StatwwtpModel;
    var TVItemModel = /** @class */ (function () {
        function TVItemModel(TVItemID, TVText) {
            this.TVItemID = TVItemID;
            this.TVText = TVText;
        }
        return TVItemModel;
    }());
    CSSP.TVItemModel = TVItemModel;
    var TVItemModelInfLink = /** @class */ (function () {
        function TVItemModelInfLink(TVPath, TVText, TVType, TVAuth, InfrastructureTVTypeEN, ParentTVPath) {
            this.TVPath = TVPath;
            this.TVText = TVText;
            this.TVType = TVType;
            this.TVAuth = TVAuth;
            this.InfrastructureTVTypeEN = InfrastructureTVTypeEN;
            this.ParentTVPath = ParentTVPath;
        }
        return TVItemModelInfLink;
    }());
    CSSP.TVItemModelInfLink = TVItemModelInfLink;
    var tvAuth = /** @class */ (function () {
        function tvAuth(TVPath, AuthorizeLevel) {
            this.TVPath = TVPath;
            this.AuthorizeLevel = AuthorizeLevel;
        }
        return tvAuth;
    }());
    CSSP.tvAuth = tvAuth;
    var tvFullText = /** @class */ (function () {
        function tvFullText(TVPath, FullText) {
            this.TVPath = TVPath;
            this.FullText = FullText;
        }
        return tvFullText;
    }());
    CSSP.tvFullText = tvFullText;
    var userModel = /** @class */ (function () {
        function userModel(FirstName, Initial, IsDisabled, LastName, LoginEmail, UserInfoID) {
            var _this = this;
            this.FirstName = FirstName;
            this.Initial = Initial;
            this.IsDisabled = IsDisabled;
            this.LastName = LastName;
            this.LoginEmail = LoginEmail;
            this.UserInfoID = UserInfoID;
            this.FullName = "";
            this.GetFullName = function () {
                return _this.LastName + ", " + _this.FirstName + " " + _this.Initial;
            };
        }
        return userModel;
    }());
    CSSP.userModel = userModel;
    var TVAuthEnum;
    (function (TVAuthEnum) {
        TVAuthEnum[TVAuthEnum["NoAccess"] = 1] = "NoAccess";
        TVAuthEnum[TVAuthEnum["Read"] = 2] = "Read";
        TVAuthEnum[TVAuthEnum["Edit"] = 3] = "Edit";
        TVAuthEnum[TVAuthEnum["Create"] = 4] = "Create";
        TVAuthEnum[TVAuthEnum["Delete"] = 5] = "Delete";
        TVAuthEnum[TVAuthEnum["Admin"] = 6] = "Admin";
    })(TVAuthEnum = CSSP.TVAuthEnum || (CSSP.TVAuthEnum = {}));
    var TVTypeEnum;
    (function (TVTypeEnum) {
        TVTypeEnum[TVTypeEnum["Error"] = 0] = "Error";
        TVTypeEnum[TVTypeEnum["Root"] = 1] = "Root";
        TVTypeEnum[TVTypeEnum["Address"] = 2] = "Address";
        TVTypeEnum[TVTypeEnum["Area"] = 3] = "Area";
        TVTypeEnum[TVTypeEnum["ClimateSite"] = 4] = "ClimateSite";
        TVTypeEnum[TVTypeEnum["Contact"] = 5] = "Contact";
        TVTypeEnum[TVTypeEnum["Country"] = 6] = "Country";
        TVTypeEnum[TVTypeEnum["Email"] = 7] = "Email";
        TVTypeEnum[TVTypeEnum["File"] = 8] = "File";
        TVTypeEnum[TVTypeEnum["HydrometricSite"] = 9] = "HydrometricSite";
        TVTypeEnum[TVTypeEnum["Infrastructure"] = 10] = "Infrastructure";
        TVTypeEnum[TVTypeEnum["MikeBoundaryConditionWebTide"] = 11] = "MikeBoundaryConditionWebTide";
        TVTypeEnum[TVTypeEnum["MikeBoundaryConditionMesh"] = 12] = "MikeBoundaryConditionMesh";
        TVTypeEnum[TVTypeEnum["MikeScenario"] = 13] = "MikeScenario";
        TVTypeEnum[TVTypeEnum["MikeSource"] = 14] = "MikeSource";
        TVTypeEnum[TVTypeEnum["Municipality"] = 15] = "Municipality";
        TVTypeEnum[TVTypeEnum["MWQMSite"] = 16] = "MWQMSite";
        TVTypeEnum[TVTypeEnum["PolSourceSite"] = 17] = "PolSourceSite";
        TVTypeEnum[TVTypeEnum["Province"] = 18] = "Province";
        TVTypeEnum[TVTypeEnum["Sector"] = 19] = "Sector";
        TVTypeEnum[TVTypeEnum["Subsector"] = 20] = "Subsector";
        TVTypeEnum[TVTypeEnum["Tel"] = 21] = "Tel";
        TVTypeEnum[TVTypeEnum["TideSite"] = 22] = "TideSite";
        TVTypeEnum[TVTypeEnum["MWQMSiteSample"] = 23] = "MWQMSiteSample";
        TVTypeEnum[TVTypeEnum["WasteWaterTreatmentPlant"] = 24] = "WasteWaterTreatmentPlant";
        TVTypeEnum[TVTypeEnum["LiftStation"] = 25] = "LiftStation";
        TVTypeEnum[TVTypeEnum["Spill"] = 26] = "Spill";
        TVTypeEnum[TVTypeEnum["BoxModel"] = 27] = "BoxModel";
        TVTypeEnum[TVTypeEnum["VisualPlumesScenario"] = 28] = "VisualPlumesScenario";
        TVTypeEnum[TVTypeEnum["Outfall"] = 29] = "Outfall";
        TVTypeEnum[TVTypeEnum["OtherInfrastructure"] = 30] = "OtherInfrastructure";
        TVTypeEnum[TVTypeEnum["MWQMRun"] = 31] = "MWQMRun";
        TVTypeEnum[TVTypeEnum["NoDepuration"] = 33] = "NoDepuration";
        TVTypeEnum[TVTypeEnum["Failed"] = 34] = "Failed";
        TVTypeEnum[TVTypeEnum["Passed"] = 35] = "Passed";
        TVTypeEnum[TVTypeEnum["NoData"] = 36] = "NoData";
        TVTypeEnum[TVTypeEnum["LessThan10"] = 37] = "LessThan10";
        TVTypeEnum[TVTypeEnum["MeshNode"] = 38] = "MeshNode";
        TVTypeEnum[TVTypeEnum["WebTideNode"] = 39] = "WebTideNode";
        TVTypeEnum[TVTypeEnum["SamplingPlan"] = 40] = "SamplingPlan";
        TVTypeEnum[TVTypeEnum["SeeOtherMunicipality"] = 41] = "SeeOtherMunicipality";
        TVTypeEnum[TVTypeEnum["LineOverflow"] = 42] = "LineOverflow";
        TVTypeEnum[TVTypeEnum["BoxModelInputs"] = 43] = "BoxModelInputs";
        TVTypeEnum[TVTypeEnum["BoxModelResults"] = 44] = "BoxModelResults";
        TVTypeEnum[TVTypeEnum["ClimateSiteInfo"] = 45] = "ClimateSiteInfo";
        TVTypeEnum[TVTypeEnum["ClimateSiteData"] = 46] = "ClimateSiteData";
        TVTypeEnum[TVTypeEnum["HydrometricSiteInfo"] = 47] = "HydrometricSiteInfo";
        TVTypeEnum[TVTypeEnum["HydrometricSiteData"] = 48] = "HydrometricSiteData";
        TVTypeEnum[TVTypeEnum["InfrastructureInfo"] = 49] = "InfrastructureInfo";
        TVTypeEnum[TVTypeEnum["LabSheetInfo"] = 50] = "LabSheetInfo";
        TVTypeEnum[TVTypeEnum["LabSheetDetailInfo"] = 51] = "LabSheetDetailInfo";
        TVTypeEnum[TVTypeEnum["MapInfo"] = 52] = "MapInfo";
        TVTypeEnum[TVTypeEnum["MapInfoPoint"] = 53] = "MapInfoPoint";
        TVTypeEnum[TVTypeEnum["MikeSourceStartEndInfo"] = 54] = "MikeSourceStartEndInfo";
        TVTypeEnum[TVTypeEnum["MWQMLookupMPNInfo"] = 55] = "MWQMLookupMPNInfo";
        TVTypeEnum[TVTypeEnum["SamplingPlanInfo"] = 56] = "SamplingPlanInfo";
        TVTypeEnum[TVTypeEnum["SamplingPlanSubsectorInfo"] = 57] = "SamplingPlanSubsectorInfo";
        TVTypeEnum[TVTypeEnum["SamplingPlanSubsectorSiteInfo"] = 58] = "SamplingPlanSubsectorSiteInfo";
        TVTypeEnum[TVTypeEnum["MWQMSiteStartEndInfo"] = 59] = "MWQMSiteStartEndInfo";
        TVTypeEnum[TVTypeEnum["MWQMSubsectorInfo"] = 60] = "MWQMSubsectorInfo";
        TVTypeEnum[TVTypeEnum["PolSourceSiteInfo"] = 61] = "PolSourceSiteInfo";
        TVTypeEnum[TVTypeEnum["PolSourceSiteObsInfo"] = 62] = "PolSourceSiteObsInfo";
        TVTypeEnum[TVTypeEnum["HydrometricRatingCurveInfo"] = 63] = "HydrometricRatingCurveInfo";
        TVTypeEnum[TVTypeEnum["HydrometricRatingCurveDataInfo"] = 64] = "HydrometricRatingCurveDataInfo";
        TVTypeEnum[TVTypeEnum["TideLocationInfo"] = 65] = "TideLocationInfo";
        TVTypeEnum[TVTypeEnum["TideSiteDataInfo"] = 66] = "TideSiteDataInfo";
        TVTypeEnum[TVTypeEnum["UseOfSite"] = 67] = "UseOfSite";
        TVTypeEnum[TVTypeEnum["VisualPlumesScenarioInfo"] = 68] = "VisualPlumesScenarioInfo";
        TVTypeEnum[TVTypeEnum["VisualPlumesScenarioAmbient"] = 69] = "VisualPlumesScenarioAmbient";
        TVTypeEnum[TVTypeEnum["VisualPlumesScenarioResults"] = 70] = "VisualPlumesScenarioResults";
        TVTypeEnum[TVTypeEnum["TotalFile"] = 71] = "TotalFile";
        TVTypeEnum[TVTypeEnum["MikeSourceIsRiver"] = 72] = "MikeSourceIsRiver";
        TVTypeEnum[TVTypeEnum["MikeSourceIncluded"] = 73] = "MikeSourceIncluded";
        TVTypeEnum[TVTypeEnum["MikeSourceNotIncluded"] = 74] = "MikeSourceNotIncluded";
        TVTypeEnum[TVTypeEnum["RainExceedance"] = 75] = "RainExceedance";
        TVTypeEnum[TVTypeEnum["EmailDistributionList"] = 76] = "EmailDistributionList";
        TVTypeEnum[TVTypeEnum["OpenData"] = 77] = "OpenData";
        TVTypeEnum[TVTypeEnum["ProvinceTools"] = 78] = "ProvinceTools";
        TVTypeEnum[TVTypeEnum["Classification"] = 79] = "Classification";
        TVTypeEnum[TVTypeEnum["Approved"] = 80] = "Approved";
        TVTypeEnum[TVTypeEnum["Restricted"] = 81] = "Restricted";
        TVTypeEnum[TVTypeEnum["Prohibited"] = 82] = "Prohibited";
        TVTypeEnum[TVTypeEnum["ConditionallyApproved"] = 83] = "ConditionallyApproved";
        TVTypeEnum[TVTypeEnum["ConditionallyRestricted"] = 84] = "ConditionallyRestricted";
    })(TVTypeEnum = CSSP.TVTypeEnum || (CSSP.TVTypeEnum = {}));
    var MIKEResult = /** @class */ (function () {
        function MIKEResult(MikeScenarioTVItemID, MikeScenarioTVText, StartTime, EndTime, ResultFrequency_Min, NumberOfTimeSteps, TimeStepDateTimeList, MIKEMWQMSiteResultList, MIKESourceResultList) {
            this.MikeScenarioTVItemID = MikeScenarioTVItemID;
            this.MikeScenarioTVText = MikeScenarioTVText;
            this.StartTime = StartTime;
            this.EndTime = EndTime;
            this.ResultFrequency_Min = ResultFrequency_Min;
            this.NumberOfTimeSteps = NumberOfTimeSteps;
            this.TimeStepDateTimeList = TimeStepDateTimeList;
            this.MIKEMWQMSiteResultList = MIKEMWQMSiteResultList;
            this.MIKESourceResultList = MIKESourceResultList;
        }
        return MIKEResult;
    }());
    CSSP.MIKEResult = MIKEResult;
    var MIKEMWQMSiteResult = /** @class */ (function () {
        function MIKEMWQMSiteResult(MWQMSiteTVItemID, MWQMSiteTVText, Lat, Lng, ElementLat, ElementLng, SampleDateTime, FC, Salinity, Temperature, TVLocation, MIKEHydroResult, MIKETransResult) {
            this.MWQMSiteTVItemID = MWQMSiteTVItemID;
            this.MWQMSiteTVText = MWQMSiteTVText;
            this.Lat = Lat;
            this.Lng = Lng;
            this.ElementLat = ElementLat;
            this.ElementLng = ElementLng;
            this.SampleDateTime = SampleDateTime;
            this.FC = FC;
            this.Salinity = Salinity;
            this.Temperature = Temperature;
            this.TVLocation = TVLocation;
            this.MIKEHydroResult = MIKEHydroResult;
            this.MIKETransResult = MIKETransResult;
        }
        return MIKEMWQMSiteResult;
    }());
    CSSP.MIKEMWQMSiteResult = MIKEMWQMSiteResult;
    var MIKEHydroResult = /** @class */ (function () {
        function MIKEHydroResult(SurfaceElevationList, StillWaterDepthList, TotalWaterDepthList, UVelocityList, VVelocityList, DensityList, TemperatureList, SalinityList, CurrentSpeedList, CurrentDirectionList, WindUVelocityList, WindVVelocityList, PrecipitationList) {
            this.SurfaceElevationList = SurfaceElevationList;
            this.StillWaterDepthList = StillWaterDepthList;
            this.TotalWaterDepthList = TotalWaterDepthList;
            this.UVelocityList = UVelocityList;
            this.VVelocityList = VVelocityList;
            this.DensityList = DensityList;
            this.TemperatureList = TemperatureList;
            this.SalinityList = SalinityList;
            this.CurrentSpeedList = CurrentSpeedList;
            this.CurrentDirectionList = CurrentDirectionList;
            this.WindUVelocityList = WindUVelocityList;
            this.WindVVelocityList = WindVVelocityList;
            this.PrecipitationList = PrecipitationList;
        }
        return MIKEHydroResult;
    }());
    CSSP.MIKEHydroResult = MIKEHydroResult;
    var MIKETransResult = /** @class */ (function () {
        function MIKETransResult(FCList, UVelocityList, VVelocityList) {
            this.FCList = FCList;
            this.UVelocityList = UVelocityList;
            this.VVelocityList = VVelocityList;
        }
        return MIKETransResult;
    }());
    CSSP.MIKETransResult = MIKETransResult;
    var MIKESourceResult = /** @class */ (function () {
        function MIKESourceResult(MWQMSourceTVItemID, MWQMSourceTVText, Lat, Lng, DischargeList, FCList) {
            this.MWQMSourceTVItemID = MWQMSourceTVItemID;
            this.MWQMSourceTVText = MWQMSourceTVText;
            this.Lat = Lat;
            this.Lng = Lng;
            this.DischargeList = DischargeList;
            this.FCList = FCList;
        }
        return MIKESourceResult;
    }());
    CSSP.MIKESourceResult = MIKESourceResult;
})(CSSP || (CSSP = {}));
//# sourceMappingURL=cssp.Models.js.map