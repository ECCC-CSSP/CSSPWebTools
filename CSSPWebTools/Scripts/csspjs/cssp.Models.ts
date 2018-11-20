
module CSSP {
    export class ClimateSiteUseOfSiteOrdinal {
        constructor(public UseOfSiteID: number, public Ordinal: number) {
        }
    }

    export class ClimateSiteTVItemIDYearsText {
        constructor(public ClimateSiteTVItemID: number, public YearsText: string) {
        }
    }

    export class HydrometricSiteUseOfSiteOrdinal {
        constructor(public UseOfSiteID: number, public Ordinal: number) {
        }
    }

    export class HydrometricSiteTVItemIDYearsText {
        constructor(public HydrometricSiteTVItemID: number, public YearsText: string) {
        }
    }

    export class MWQMSubsectorAnalysisModel {
        constructor(public mwqmSubsectorModel: MWQMSubsectorModel,
            public mwqmSiteAnalysisModelList: MWQMSiteAnalysisModel[],
            public mwqmRunAnalysisModelList: MWQMRunAnalysisModel[]) {
        };
    }

    export class MWQMSubsectorModel {
        constructor(public MWQMSubsectorTVItemID: number, public ShortRangeEnd: number, public MidRangeEnd: number,
            public UpperRainLimitStillConsideredDry1: number, public UpperRainLimitStillConsideredDry2: number,
            public UpperRainLimitStillConsideredDry3: number, public UpperRainLimitStillConsideredDry4: number,
            public LowerRainLimitConsideredRain1: number, public LowerRainLimitConsideredRain2: number,
            public LowerRainLimitConsideredRain3: number, public LowerRainLimitConsideredRain4: number,
            public StartDate: Date, public EndDate: Date, public Runs: number, public CalculationDataType: string,
            public SelectFullYear: boolean, public StartYear: number, public EndYear: number) {
        };
    }

    export class MWQMSiteAnalysisModel {
        constructor(public SiteIndex: number, public MWQMSiteTVItemID: number, public Samples: number, public StartYear: number,
            public EndYear: number, public MinFC: number, public MaxFC: number, public GMean: number,
            public Median: number, public P90: number, public PercOver43: number, public PercOver260: number,
            public mwqmSampleAnalysisModel: MWQMSampleAnalysisModel[], public colorAndLetter: ColorAndLetter, public isActive: boolean) {
        };
    }

    export class MWQMRunAnalysisModel {
        constructor(public RunIndex: number, public MWQMRunTVItemID: number, public IsOKRun: boolean, public RemoveFromStat: boolean,
            public RunDate: Date, public RainDay0: number, public RainDay1: number, public RainDay2: number, public RainDay3: number,
            public RainDay4: number, public RainDay5: number, public RainDay6: number, public RainDay7: number, public RainDay8: number,
            public RainDay9: number, public RainDay10: number, public StartTide: string, public EndTide: string,
            public UseInStat: boolean, public RunYear: number) {
        };
    }

    export class MWQMSampleAnalysisModel {
        constructor(public SiteIndex: number, public RunIndex: number, public MWQMRunTVItemID: number, public RunSampleTypeText: string,
            public FC: number, public Temp: number, public Sal: number, public GeoMean: number, public Median: number,
            public P90: number, public PercOver43: number, public PercOver260: number, public SampleDate: Date, public UseInStat: boolean,
            public SampleYear: number) {
        };
    }
    export class ValRun {
        constructor(public val: number, public run: number) {
        }
    }
    export class ColorAndLetter {
        constructor(public color: string, public letter: string) {
        }
    }
    export class RunsToRemoveFromStat {
        constructor(public RemoveFromStat: boolean, public MWQMRunTVItemID: number) {
        }
    }
    export class UseRunAndRainValue {
        constructor(public UseRun: boolean, public RainValue: number) {
        }
    }

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
    export class LegendElem {
        constructor(public TVType: TVTypeEnum, public Color: string, public LegendText: string) {
        }
    }
    export class TVTypeTVAuth {
        constructor(public TVTypeUserAuthID: number, public TVType: number, public TVPath: string, public TVAuth: number, public Level: number) {
        }
    }
    export class TVItemTVAuth {
        constructor(public TVItemUserAuthID: number, public TVText: string, public TVItemID1: number, public TVTypeStr: string, public TVAuth: number) {
        }
    }
    export class TVTypeNamesAndTVPath {
        constructor(public TVTypeName: string, public Index: number, public TVPath: string, public ParentIndex: number) {
        }
    }
    export class ContactModel {
        constructor(public ContactTVItemID: number, public Disabled: boolean, public LoginEmail: string) {
        }
    }
    export class ContactSearchModel {
        constructor(public ContactTVItemID: number, public FullName: string) {
        }
    }
    export class LoginModel {
        constructor(public Error: string, public Email: string, public ReturnURL: string) {
        }
    }

    export class DialogModel {
        constructor(public DialogModelType: DialogModelTypeEnum, public Title: string, public Message: string) {
        }
    }
    export enum DialogModelTypeEnum {
        Error,
        Success,
        AreYouSure,
        Permissions,
        Message,
        TVItemMoving,
        Help,
        ContinueSaving,
    }
    export enum DialogCommandEnum {
        Yes,
        No,
        OK,
        Save,
        Cancel,
        Close,
    }

    export enum InfrastructureTypeEnum {
        Error = 0,
        WWTP = 1,
        LiftStation = 2,
        Other = 3,
        SeeOther = 4,
    }
    export class Variables {
        public URL: string;
        public LoginEmail: string;
        public IsAdmin: string;
        public IsSamplingPlanner: string;
        public Culture: string;
        public TVTextList: Array<string>;
        public TVItemIDList: Array<string>;
        public VariableShow: string;
        constructor() {
            this.URL = "";
            this.LoginEmail = "";
            this.IsAdmin = "false";
            this.Culture = Globalize.culture.name;
            this.TVTextList = [];
            this.TVItemIDList = [];
            this.VariableShow = "";
        }
    }
    export enum URLVarShowEnum {
        ShowTesting,
        ShowMap,
        ShowMoreInfo,
        ShowRootTab,
        ShowCountryTab,
        ShowProvinceTab,
        ShowAreaTab,
        ShowSectorTab,
        ShowSubsectorTab,
        ShowMunicipalityTab,
        ShowInfrastructureTab,
        ShowMWQMRunsTab,
        ShowMWQMSitesTab,
        ShowPolSourceSiteTab,
        ShowClimateSite,
        ShowHydrometricSite,
        ShowTideSite,
        ShowMikeScenarioTab,
        ShowWWTPAndLSTab,
        ShowVisualPlumesTab,
        ShowFullLegend,
        ShowMuni,
        ShowMWQMSiteByDate,
        ShowMWQMSiteByNormal,
        ShowMapFull,
        ShowTheNoDataInMap,
        ShowAll,
        NumberOfSampleDecade,
        NumberOfSampleUnit,
    }
    export enum URLVarYearEnum {
        ShowMWQMSiteWithDataAfterYear,
        ShowMWQMSiteChartFromYear,
    }
    export class ButtonCreationModel {
        constructor(public className: string, public iconNamePrimary: string, public iconNameSecondary: string, public keepText: boolean) {
        }
    }
    export class PinObjectModel {
        constructor(public ImageSrc: string, public LegendText: string, public TVType: string, public SubTVText: string, public IsUsed: boolean) {
        }
    }

    export enum DrawTypeEnum {
        Error = 0,
        Point = 1,
        Polyline = 2,
        Polygon = 3,
    }

    export class Coord {
        constructor(public Lat: number, public Lng: number, public Ordinal: number) {
        }
    }

    export class MapObj {
        constructor(public MapInfoID: number, public MapInfoDrawType: DrawTypeEnum, public CoordList: Array<Coord>) {
        }
    }

    export class tvLocation {
        constructor(public TVItemID: number, public TVText: string, public TVType: number, public SubTVType: number, public MapObjList: Array<MapObj>) {
        }
    }

    export class polSourceSiteObsModel {
        public ObservationDateTxt: string = "";

        public GetDateTxt: Function;
        // Constructor
        constructor(public PolSourceObservationID: number,
            public Error: string,
            public PolSourceSiteID: number,
            public siteid: number,
            public ObservationDate: any,
            public InspectorName: string,
            public PolTypeText: string,
            public PolTypeAcronym: string,
            public PolStatusText: string,
            public PolStatusAcronym: string,
            public PolRiskText: string,
            public PolRiskAcronym: string,
            public ObservationText: string,
            public IsPointSource: boolean,
            public IsActive: boolean
        ) {
            this.GetDateTxt = (TheDate: Date): string => {
                if (TheDate) {
                    return "";
                }
                else {
                    return Globalize.format(new Date(TheDate.getFullYear(), (TheDate.getMonth() + 1), TheDate.getDate()), "D", Globalize.culture.name.substr(0, 2));
                }
            };
            this.ObservationDateTxt = this.GetDateTxt(ObservationDate);
        }
    }

    export class polSourceSiteModel {
        public ActiveStartDateTxt: string = "";
        public ActiveEndDateTxt: string = "";
        public PolSourceSiteObsList: Array<CSSP.polSourceSiteObsModel>;

        public GetDateTxt: Function;
        constructor(public PolSourceSiteID: number,
            public TVText: string,
            public TypeText: string,
            public TVPath: string,
            public Error: string,
            public BCKey: string,
            public QCKey: string,
            public Site: number,
            public ActiveStartDate: any,
            public ActiveEndDate: any,
            public Latitude: number,
            public Longitude: number
        ) {
            this.GetDateTxt = (TheDate: Date): string => {
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
    }

    export class mwqmSampleModel {
        public SampleDateTimeTxt: string = "";

        public GetDateTxt: Function;

        constructor(public MWQMSampleID: number,
            public Error: string,
            public MWQMRunID: number,
            public MWQMSiteID: number,
            public SampleDateTime: any,
            public DO_mg_L: number,
            public FecCol_MPN_100ml: number,
            public Salinity_PPT: number,
            public WaterTemp_C: number
        ) {
            this.GetDateTxt = (TheDate: Date): string => {
                if (TheDate) {
                    return "";
                }
                else {
                    return Globalize.format(new Date(TheDate.getFullYear(), (TheDate.getMonth() + 1), TheDate.getDate()), "D", Globalize.culture.name.substr(0, 2));
                }
            };
            this.SampleDateTimeTxt = this.GetDateTxt(SampleDateTime);
        }

    }

    export class mwqmSiteModel {
        public MWQMSampleList: Array<CSSP.mwqmSampleModel>;
        public ActiveStartDateTxt: string = "";
        public ActiveEndDateTxt: string = "";

        public GetDateTxt: Function;

        constructor(public MWQMSiteID: number,
            public TVText: string,
            public TypeText: string,
            public TVPath: string,
            public Error: string,
            public SiteNumber: string,
            public SiteName: string,
            public ActiveStartDate: any,
            public ActiveEndDate: any,
            public Latitude: number,
            public Longitude: number
        ) {
            this.GetDateTxt = (TheDate: Date): string => {
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
    }

    export class mwqmRunModel {
        public MWQMSampleList: Array<CSSP.mwqmSampleModel>;
        public StartDateTxt: string = "";
        public EndDateTxt: string = "";

        public GetDateTxt: Function;
        constructor(public MWQMRunID: number,
            public TVText: string,
            public TypeText: string,
            public TVPath: string,
            public Error: string,
            public RunNumber: number,
            public StartDate: any,
            public EndDate: any,
            public TideStart: string,
            public TideEnd: string,
            public Note: string,
            public RainDay1: number,
            public RainDay2: number,
            public RainDay3: number
        ) {
            this.GetDateTxt = (TheDate: Date): string => {
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
    }

    export class StatareaModel {
        constructor(public Error: string,
            public SectorCount: number,
            public SubSectorCount: number,
            public MWQMRunCount: number,
            public MWQMSampleCount: number,
            public MWQMSiteCount: number,
            public PolSourceSiteCount: number) {
        }
    }

    export class StatliftstationModel {
        constructor(public Error: string,
            public SpillCount: number,
            public BoxModelCount: number,
            public VPScenarioCount: number) {
        }
    }

    export class StatmikescenarioModel {
        constructor(public Error: string,
            public HydroFileSize: number,
            public TransFileSize: number) {
        }
    }

    export class StatmunicipalityModel {
        constructor(public Error: string,
            public WWTPCount: number,
            public LiftSiteCount: number,
            public MikeScenarioCount: number,
            public BoxModelCount: number,
            public VPScenarioCount: number) {
        }
    }

    export class StatpolsourcesiteModel {
        constructor(public Error: string,
            public FullDesc: string) {
        }
    }

    export class StatprovinceModel {
        constructor(public Error: string,
            public MunicipalityCount: number,
            public WWTPCount: number,
            public LiftSiteCount: number,
            public AreaCount: number,
            public SectorCount: number,
            public SubSectorCount: number,
            public MWQMRunCount: number,
            public MWQMSampleCount: number,
            public MWQMSiteCount: number,
            public PolSourceSiteCount: number,
            public MikeScenarioCount: number,
            public BoxModelCount: number,
            public VPScenarioCount: number) {
        }
    }

    export class StatsectorModel {
        constructor(public Error: string,
            public SubSectorCount: number,
            public MWQMRunCount: number,
            public MWQMSampleCount: number,
            public MWQMSiteCount: number,
            public PolSourceSiteCount: number) {
        }
    }

    export class StatsubsectorModel {
        constructor(public Error: string,
            public MWQMRunCount: number,
            public MWQMSampleCount: number,
            public MWQMSiteCount: number,
            public PolSourceSiteCount: number) {
        }
    }

    export class StatmwqmrunModel {
        constructor(public Error: string,
            public MWQMSampleCount: number) {
        }
    }

    export class StatmwqmsiteModel {
        constructor(public Error: string,
            public MWQMSampleCount: number) {
        }
    }

    export class StatwwtpModel {
        constructor(public Error: string,
            public SpillCount: number,
            public LiftSiteCount: number,
            public BoxModelCount: number,
            public VPScenarioCount: number) {
        }
    }


    export class TVItemModel {
        constructor(public TVItemID: number, public TVText: string) {
        }
    }

    export class TVItemModelInfLink {
        constructor(public TVPath: string, public TVText: string, public TVType: string, public TVAuth: number, public InfrastructureTVTypeEN, public ParentTVPath: string) {
        }
    }

    export class tvAuth {
        constructor(public TVPath: string, public AuthorizeLevel: number) {
        }
    }

    export class tvFullText {
        constructor(public TVPath: string, public FullText: string) {
        }
    }

    export class userModel {
        public FullName: string = "";
        public GetFullName: Function;
        constructor(public FirstName: string, public Initial: string, public IsDisabled: boolean, public LastName: string, public LoginEmail: string, public UserInfoID: string) {
            this.GetFullName = (): string => {
                return this.LastName + ", " + this.FirstName + " " + this.Initial;
            };
        }
    }

    export enum TVAuthEnum {
        NoAccess = 1,
        Read = 2,
        Edit = 3,
        Create = 4,
        Delete = 5,
        Admin = 6,
    }
    export enum TVTypeEnum {
        Error = 0,
        Root = 1,
        Address = 2,
        Area = 3,
        ClimateSite = 4,
        Contact = 5,
        Country = 6,
        Email = 7,
        File = 8,
        HydrometricSite = 9,
        Infrastructure = 10,
        MikeBoundaryConditionWebTide = 11,
        MikeBoundaryConditionMesh = 12,
        MikeScenario = 13,
        MikeSource = 14,
        Municipality = 15,
        MWQMSite = 16,
        PolSourceSite = 17,
        Province = 18,
        Sector = 19,
        Subsector = 20,
        Tel = 21,
        TideSite = 22,
        MWQMSiteSample = 23,
        WasteWaterTreatmentPlant = 24,
        LiftStation = 25,
        Spill = 26,
        BoxModel = 27,
        VisualPlumesScenario = 28,
        Outfall = 29,
        OtherInfrastructure = 30,
        MWQMRun = 31,
        NoDepuration = 33,
        Failed = 34,
        Passed = 35,
        NoData = 36,
        LessThan10 = 37,
        MeshNode = 38,
        WebTideNode = 39,
        SamplingPlan = 40,
        SeeOther = 41,
        LineOverflow = 42,
        BoxModelInputs = 43,
        BoxModelResults = 44,
        ClimateSiteInfo = 45,
        ClimateSiteData = 46,
        HydrometricSiteInfo = 47,
        HydrometricSiteData = 48,
        InfrastructureInfo = 49,
        LabSheetInfo = 50,
        LabSheetDetailInfo = 51,
        MapInfo = 52,
        MapInfoPoint = 53,
        MikeSourceStartEndInfo = 54,
        MWQMLookupMPNInfo = 55,
        SamplingPlanInfo = 56,
        SamplingPlanSubsectorInfo = 57,
        SamplingPlanSubsectorSiteInfo = 58,
        MWQMSiteStartEndInfo = 59,
        MWQMSubsectorInfo = 60,
        PolSourceSiteInfo = 61,
        PolSourceSiteObsInfo = 62,
        HydrometricRatingCurveInfo = 63,
        HydrometricRatingCurveDataInfo = 64,
        TideLocationInfo = 65,
        TideSiteDataInfo = 66,
        UseOfSite = 67,
        VisualPlumesScenarioInfo = 68,
        VisualPlumesScenarioAmbient = 69,
        VisualPlumesScenarioResults = 70,
        TotalFile = 71,
        MikeSourceIsRiver = 72,
        MikeSourceIncluded = 73,
        MikeSourceNotIncluded = 74,
        RainExceedance = 75,
        EmailDistributionList = 76,
        OpenData = 77,
        ProvinceTools = 78,
        Classification = 79,
        Approved = 80,
        Restricted = 81,
        Prohibited = 82,
        ConditionallyApproved = 83,
        ConditionallyRestricted = 84,
    }

    export class MIKEResult {
        constructor(public MikeScenarioTVItemID: number,
            public MikeScenarioTVText: string,
            public StartTime: Date,
            public EndTime: Date,
            public ResultFrequency_Min: number,
            public NumberOfTimeSteps: number,
            public TimeStepDateTimeList: Date[],
            public MIKEMWQMSiteResultList: MIKEMWQMSiteResult[],
            public MIKESourceResultList: MIKESourceResult[]) {
        }
    }
    export class MIKEMWQMSiteResult {
        constructor(public MWQMSiteTVItemID: number,
            public MWQMSiteTVText: string,
            public Lat: number,
            public Lng: number,
            public ElementLat: number,
            public ElementLng: number,
            public SampleDateTime: Date,
            public FC: number,
            public Salinity: number,
            public Temperature: number,
            public TVLocation: tvLocation,
            public MIKEHydroResult: MIKEHydroResult,
            public MIKETransResult: MIKETransResult) {
        }
    }
    export class MIKEHydroResult {
        constructor(public SurfaceElevationList: number[],
            public StillWaterDepthList: number[],
            public TotalWaterDepthList: number[],
            public UVelocityList: number[],
            public VVelocityList: number[],
            public DensityList: number[],
            public TemperatureList: number[],
            public SalinityList: number[],
            public CurrentSpeedList: number[],
            public CurrentDirectionList: number[],
            public WindUVelocityList: number[],
            public WindVVelocityList: number[],
            public PrecipitationList: number[]) {
        }
    }
    export class MIKETransResult {
        constructor(public FCList: number[],
            public UVelocityList: number[],
            public VVelocityList: number[]) {
        }
    }
    export class MIKESourceResult {
        constructor(public MWQMSourceTVItemID: number,
            public MWQMSourceTVText: string,
            public Lat: number,
            public Lng: number,
            public DischargeList: number[],
            public FCList: number[]) {
        }
    }

}