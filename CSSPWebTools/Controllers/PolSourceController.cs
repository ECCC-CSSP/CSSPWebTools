using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
using CSSPWebTools.Models;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using CSSPWebTools.Controllers.Resources;

namespace CSSPWebTools.Controllers
{
    public class PolSourceController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public PolSourceSiteService _PolSourceSiteService { get; private set; }
        public PolSourceController _PolSourceController { get; private set; }
        public MapInfoService _MapInfoService { get; private set; }
        public MapInfoPointService _MapInfoPointService { get; private set; }
        public AddressService _AddressService { get; private set; }
        public BaseEnumService _BaseEnumService { get; private set; }
        public TVFileService _TVFileService { get; private set; }
        #endregion Properties

        #region Constructors
        public PolSourceController()
        {
            _PolSourceController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _PolSourceSiteService = new PolSourceSiteService(LanguageRequest, User);
            _MapInfoService = new MapInfoService(LanguageRequest, User);
            _MapInfoPointService = new MapInfoPointService(LanguageRequest, User);
            _AddressService = new AddressService(LanguageRequest, User);
            _BaseEnumService = new BaseEnumService(LanguageRequest);
            _TVFileService = new TVFileService(LanguageRequest, User);
        }
        #endregion Overrides

        #region Functions public
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetAllPolSourceSiteInfoUnderSubsectorForMark(int SubsectorTVItemID)
        {
            TVItemModel tvItemModelSubsector = _TVItemService.GetTVItemModelWithTVItemIDDB(SubsectorTVItemID);
            if (!string.IsNullOrWhiteSpace(tvItemModelSubsector.Error))
            {
                string csv = tvItemModelSubsector.Error;
            }
            DateTime DN = DateTime.UtcNow;

            string ServerFilePath = _TVFileService.GetServerFilePath(SubsectorTVItemID);
            string FileName = tvItemModelSubsector.TVText.Substring(0, tvItemModelSubsector.TVText.IndexOf(" ")) + "_PolSourceSiteInfo_" + 
                DN.Year.ToString() + "_" + 
                (DN.Month > 9 ? DN.Month.ToString() : "0" + DN.Month.ToString()) + "_" +
                (DN.Day > 9 ? DN.Day.ToString() : "0" + DN.Day.ToString()) + "_" +
                (DN.Hour > 9 ? DN.Hour.ToString() : "0" + DN.Hour.ToString()) + "_" +
                (DN.Minute > 9 ? DN.Minute.ToString() : "0" + DN.Minute.ToString()) +
                " .csv";

            DirectoryInfo di = new DirectoryInfo(ServerFilePath);
            if (!di.Exists)
                di.Create();

            FileInfo fi = new FileInfo(ServerFilePath + FileName);
            if (fi.Exists)
            {
                TVFileModel tvFileModelToDelete = _TVFileService.GetTVFileModelWithServerFilePathAndServerFileNameDB(ServerFilePath, FileName);
                if (!string.IsNullOrWhiteSpace(tvFileModelToDelete.Error))
                    Json(tvFileModelToDelete.Error, JsonRequestBehavior.AllowGet);

                TVFileModel tvFileModelRet = _TVFileService.PostDeleteTVFileWithTVItemIDDB(tvFileModelToDelete.TVFileTVItemID);
                if (!string.IsNullOrWhiteSpace(tvFileModelRet.Error))
                    Json(tvFileModelRet.Error, JsonRequestBehavior.AllowGet);
            }

            TVItemModel tvItemModelTVFile = _TVItemService.PostAddChildTVItemDB(SubsectorTVItemID, FileName, TVTypeEnum.File);
            if (!string.IsNullOrWhiteSpace(tvItemModelTVFile.Error))
                Json(tvItemModelTVFile.Error, JsonRequestBehavior.AllowGet);

            TVFileModel tvFileModelNew = new TVFileModel()
            {
                TVFileTVItemID = tvItemModelTVFile.TVItemID,
                Language = LanguageEnum.en,
                Year = DateTime.Now.Year,
                FilePurpose = FilePurposeEnum.Information,
                FileType = FileTypeEnum.CSV,
                FileDescription = "",
                FileSize_kb = 1,
                FileInfo = "",
                FileCreatedDate_UTC = DateTime.UtcNow,
                ClientFilePath = "",
                ServerFileName = FileName,
                ServerFilePath = _TVFileService.ChoseEDriveOrCDrive(ServerFilePath.Replace(@"C:\", @"E:\")),
            };

            TVFileModel tvFileModelRet2 = _TVFileService.PostAddTVFileDB(tvFileModelNew);
            if (!string.IsNullOrWhiteSpace(tvFileModelRet2.Error))
                Json(tvFileModelRet2.Error, JsonRequestBehavior.AllowGet);

            StringBuilder sb = new StringBuilder();

            sb.AppendLine(",," + tvItemModelSubsector.TVText +  ",,,,,,,,");

            sb.AppendLine("Site,Type,Obs. Written,Obs. Selected,Lat,Lng,Active,Photo,Civic");

            List<PolSourceSiteModel> PolSourceSiteModelList = _PolSourceSiteService.GetPolSourceSiteModelListWithSubsectorTVItemIDDB(SubsectorTVItemID);
            List<TVItemModel> tvItemModelPolSourceList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(SubsectorTVItemID, TVTypeEnum.PolSourceSite);

            foreach (PolSourceSiteModel polSourceSiteModel in PolSourceSiteModelList)
            {
                TVItemModel tvItemModelCurrent = tvItemModelPolSourceList.Where(c => c.TVItemID == polSourceSiteModel.PolSourceSiteTVItemID).FirstOrDefault();
                if (!string.IsNullOrWhiteSpace(tvItemModelCurrent.Error))
                    Json(tvItemModelCurrent.Error, JsonRequestBehavior.AllowGet);

                // Site
                sb.Append(polSourceSiteModel.Site + ",");

                PolSourceObservationModel polSourceObservationModel = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelListWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID).OrderByDescending(c => c.ObservationDate_Local).OrderByDescending(c => c.LastUpdateDate_UTC).FirstOrDefault();
                if (polSourceObservationModel != null)
                {
                    // Type
                    sb.Append((polSourceObservationModel.Observation_ToBeDeleted.Length > 2 ? polSourceObservationModel.Observation_ToBeDeleted.Substring(0, 3) : "") + ",");

                    string ObsWritten = polSourceObservationModel.Observation_ToBeDeleted.Replace(",", "_");
                    ObsWritten = ObsWritten.Replace("\t", "   ");

                    // Obs. Written
                    sb.Append(ObsWritten + ",");

                    TVItemMoreInfoPolSourceSiteModel tvItemMoreInfoPolSourceSiteModel = _TVItemService.GetTVItemMoreInfoPolSourceSiteDB(polSourceSiteModel.PolSourceSiteTVItemID);

                    string ObsSelected = ControllerRes.Empty;
                    if (tvItemMoreInfoPolSourceSiteModel.IssuesTVTextList.Count > 0)
                    {
                        ObsSelected = tvItemMoreInfoPolSourceSiteModel.IssuesTVTextList[0].Replace(",", "_");
                        ObsSelected = ObsSelected.Replace("\t", "   ");
                    }

                    // Obs. Selected
                    sb.Append(ObsSelected + ",");
                }
                else
                {
                    sb.Append("Error Type,Error Obs.,Error Obs.");
                }

                List<MapInfoPointModel> mapInfoPointModelList = _MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(polSourceSiteModel.PolSourceSiteTVItemID, TVTypeEnum.PolSourceSite, MapInfoDrawTypeEnum.Point);
                if (mapInfoPointModelList.Count > 0)
                {
                    // Lat, Lng
                    sb.Append(mapInfoPointModelList[0].Lat + "," + mapInfoPointModelList[0].Lng + ",");
                }

                // Active
                sb.Append((tvItemModelCurrent.IsActive ? "TRUE" : "FALSE") + ",");

                // Photo
                sb.Append(",");

                if (polSourceSiteModel.CivicAddressTVItemID != null && polSourceSiteModel.CivicAddressTVItemID != 0)
                {
                    AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)polSourceSiteModel.CivicAddressTVItemID);

                    // Civic
                    sb.Append(addressModel.StreetNumber + " " + addressModel.StreetName + " " + addressModel.StreetTypeText +
                        addressModel.MunicipalityTVText + ",");
                }

                sb.AppendLine("");
            }

            fi = new FileInfo(ServerFilePath + FileName);
            StreamWriter sw = fi.CreateText();
            sw.Write(sb.ToString());
            sw.Flush();
            sw.Close();

            // creating the KML file
            fi = new FileInfo(fi.FullName.Replace(".csv", ".kml"));
            Generate(fi, SubsectorTVItemID);

            return Json("", JsonRequestBehavior.AllowGet);

        }
        public void Generate(FileInfo fi, int SubsectorTVItemID)
        {
            BaseEnumService baseEnumService = new BaseEnumService(LanguageRequest);
            TVItemService tvItemService = new TVItemService(LanguageRequest, User);
            MapInfoService mapInfoService = new MapInfoService(LanguageRequest, User);
            PolSourceSiteService polSourceSiteService = new PolSourceSiteService(LanguageRequest, User);
            InfrastructureService infrastructureService = new InfrastructureService(LanguageRequest, User);

            if (LanguageRequest == LanguageEnum.fr)
            {
                Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-CA");
                Thread.CurrentThread.CurrentUICulture = new CultureInfo("fr-CA");
            }
            else
            {
                Thread.CurrentThread.CurrentCulture = new CultureInfo("en-CA");
                Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-CA");
            }

            TVFileService tvFileService = new TVFileService(LanguageRequest, User);
            string ServerFilePath = tvFileService.GetServerFilePath(SubsectorTVItemID);

            DirectoryInfo di = new DirectoryInfo(ServerFilePath);
            if (!di.Exists)
                di.Create();

            if (fi.Exists)
                fi.Delete();

            if (fi.Exists)
            {
                TVFileModel tvFileModelToDelete = _TVFileService.GetTVFileModelWithServerFilePathAndServerFileNameDB(ServerFilePath, fi.Name);
                if (!string.IsNullOrWhiteSpace(tvFileModelToDelete.Error))
                    Json(tvFileModelToDelete.Error, JsonRequestBehavior.AllowGet);

                TVFileModel tvFileModelRet = _TVFileService.PostDeleteTVFileWithTVItemIDDB(tvFileModelToDelete.TVFileTVItemID);
                if (!string.IsNullOrWhiteSpace(tvFileModelRet.Error))
                    Json(tvFileModelRet.Error, JsonRequestBehavior.AllowGet);
            }

            TVItemModel tvItemModelTVFile = _TVItemService.PostAddChildTVItemDB(SubsectorTVItemID, fi.Name, TVTypeEnum.File);
            if (!string.IsNullOrWhiteSpace(tvItemModelTVFile.Error))
                Json(tvItemModelTVFile.Error, JsonRequestBehavior.AllowGet);

            TVFileModel tvFileModelNew = new TVFileModel()
            {
                TVFileTVItemID = tvItemModelTVFile.TVItemID,
                Language = LanguageEnum.en,
                Year = DateTime.Now.Year,
                FilePurpose = FilePurposeEnum.Information,
                FileType = FileTypeEnum.KML,
                FileDescription = "",
                FileSize_kb = 1,
                FileInfo = "",
                FileCreatedDate_UTC = DateTime.UtcNow,
                ClientFilePath = "",
                ServerFileName = fi.Name,
                ServerFilePath = _TVFileService.ChoseEDriveOrCDrive(ServerFilePath.Replace(@"C:\", @"E:\")),
            };

            TVFileModel tvFileModelRet2 = _TVFileService.PostAddTVFileDB(tvFileModelNew);
            if (!string.IsNullOrWhiteSpace(tvFileModelRet2.Error))
                Json(tvFileModelRet2.Error, JsonRequestBehavior.AllowGet);

            StringBuilder sbKML = new StringBuilder();

            sbKML.AppendLine(@"<?xml version=""1.0"" encoding=""UTF-8""?>");
            sbKML.AppendLine(@"<kml xmlns=""http://www.opengis.net/kml/2.2"" xmlns:gx=""http://www.google.com/kml/ext/2.2"" xmlns:kml=""http://www.opengis.net/kml/2.2"" xmlns:atom=""http://www.w3.org/2005/Atom"">");
            sbKML.AppendLine(@"<Document>");
            sbKML.AppendLine(@"	<name>" + fi.Name + "</name>");

            sbKML.AppendLine(@"    <StyleMap id=""msn_ylw-pushpin"">");
            sbKML.AppendLine(@"		<Pair>");
            sbKML.AppendLine(@"			<key>normal</key>");
            sbKML.AppendLine(@"			<styleUrl>#sn_ylw-pushpin</styleUrl>");
            sbKML.AppendLine(@"		</Pair>");
            sbKML.AppendLine(@"		<Pair>");
            sbKML.AppendLine(@"			<key>highlight</key>");
            sbKML.AppendLine(@"			<styleUrl>#sh_ylw-pushpin</styleUrl>");
            sbKML.AppendLine(@"		</Pair>");
            sbKML.AppendLine(@"	</StyleMap>");
            sbKML.AppendLine(@"	<Style id=""sh_ylw-pushpin"">");
            sbKML.AppendLine(@"		<IconStyle>");
            sbKML.AppendLine(@"			<scale>1.2</scale>");
            sbKML.AppendLine(@"		</IconStyle>");
            sbKML.AppendLine(@"		<LineStyle>");
            sbKML.AppendLine(@"			<color>ff00ff00</color>");
            sbKML.AppendLine(@"			<width>1.5</width>");
            sbKML.AppendLine(@"		</LineStyle>");
            sbKML.AppendLine(@"		<PolyStyle>");
            sbKML.AppendLine(@"			<color>0000ff00</color>");
            sbKML.AppendLine(@"		</PolyStyle>");
            sbKML.AppendLine(@"	</Style>");
            sbKML.AppendLine(@"	<Style id=""sn_ylw-pushpin"">");
            sbKML.AppendLine(@"		<LineStyle>");
            sbKML.AppendLine(@"			<color>ff00ff00</color>");
            sbKML.AppendLine(@"			<width>1.5</width>");
            sbKML.AppendLine(@"		</LineStyle>");
            sbKML.AppendLine(@"		<PolyStyle>");
            sbKML.AppendLine(@"			<color>0000ff00</color>");
            sbKML.AppendLine(@"		</PolyStyle>");
            sbKML.AppendLine(@"	</Style>");

            sbKML.AppendLine(@"    <StyleMap id=""msn_grn-pushpin"">");
            sbKML.AppendLine(@"		<Pair>");
            sbKML.AppendLine(@"			<key>normal</key>");
            sbKML.AppendLine(@"			<styleUrl>#sn_grn-pushpin</styleUrl>");
            sbKML.AppendLine(@"		</Pair>");
            sbKML.AppendLine(@"		<Pair>");
            sbKML.AppendLine(@"			<key>highlight</key>");
            sbKML.AppendLine(@"			<styleUrl>#sh_grn-pushpin</styleUrl>");
            sbKML.AppendLine(@"		</Pair>");
            sbKML.AppendLine(@"	</StyleMap>");
            sbKML.AppendLine(@"	<Style id=""sh_grn-pushpin"">");
            sbKML.AppendLine(@"		<IconStyle>");
            sbKML.AppendLine(@"			<scale>1.2</scale>");
            sbKML.AppendLine(@"		</IconStyle>");
            sbKML.AppendLine(@"		<LineStyle>");
            sbKML.AppendLine(@"			<color>ff0000ff</color>");
            sbKML.AppendLine(@"			<width>1.5</width>");
            sbKML.AppendLine(@"		</LineStyle>");
            sbKML.AppendLine(@"		<PolyStyle>");
            sbKML.AppendLine(@"			<color>000000ff</color>");
            sbKML.AppendLine(@"		</PolyStyle>");
            sbKML.AppendLine(@"	</Style>");
            sbKML.AppendLine(@"	<Style id=""sn_grn-pushpin"">");
            sbKML.AppendLine(@"		<LineStyle>");
            sbKML.AppendLine(@"			<color>ff0000ff</color>");
            sbKML.AppendLine(@"			<width>1.5</width>");
            sbKML.AppendLine(@"		</LineStyle>");
            sbKML.AppendLine(@"		<PolyStyle>");
            sbKML.AppendLine(@"			<color>000000ff</color>");
            sbKML.AppendLine(@"		</PolyStyle>");
            sbKML.AppendLine(@"	</Style>");

            TVItemModel tvItemModelSubsector = tvItemService.GetTVItemModelWithTVItemIDDB(SubsectorTVItemID);
            List<MapInfoPointModel> mapInfoPointModelList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(tvItemModelSubsector.TVItemID, TVTypeEnum.Subsector, MapInfoDrawTypeEnum.Point);

            sbKML.AppendLine(@"	<Folder>");
            sbKML.AppendLine(@"	<name>Subsector</name>");
            sbKML.AppendLine(@"	<visibility>0</visibility>");

            // Doing Point
            sbKML.AppendLine(@"	<Placemark>");
            sbKML.AppendLine(@"	<name>" + tvItemModelSubsector.TVText + "</name>");
            sbKML.AppendLine(@"	<visibility>0</visibility>");
            sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");
            //sbKMZ.AppendLine(@"	<description>");
            //sbKMZ.AppendLine(@"<![CDATA[");
            //sbKMZ.AppendLine(@"<a href=""" + _TaskRunnerBaseService.GetUrlFromTVItem(tvItemModelRoot) + @""">" + tvItemModelRoot.TVText + "</a>");
            //sbKMZ.AppendLine(@"]]>");
            //sbKMZ.AppendLine(@"	</description>");
            sbKML.AppendLine(@"	<Point>");
            sbKML.AppendLine(@"		<coordinates>" + mapInfoPointModelList[0].Lng + "," + mapInfoPointModelList[0].Lat + ",0</coordinates>");
            sbKML.AppendLine(@"	</Point>");
            sbKML.AppendLine(@"	</Placemark>");

            // Doing Polygon
            sbKML.AppendLine(@"	<Placemark>");
            sbKML.AppendLine(@"		<name>" + tvItemModelSubsector.TVText + " (poly)</name>");
            sbKML.AppendLine(@"	    <visibility>0</visibility>");
            sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");
            //sbKMZ.AppendLine(@"	<description>");
            //sbKMZ.AppendLine(@"<![CDATA[");
            //sbKMZ.AppendLine(@"<a href=""" + _TaskRunnerBaseService.GetUrlFromTVItem(tvItemModelCountry) + @""">" + tvItemModelCountry.TVText + "</a>");
            //sbKMZ.AppendLine(@"]]>");
            //sbKMZ.AppendLine(@"	</description>");
            sbKML.AppendLine(@"		<Polygon>");
            sbKML.AppendLine(@"			<outerBoundaryIs>");
            sbKML.AppendLine(@"				<LinearRing>");
            sbKML.AppendLine(@"					<coordinates>");

            mapInfoPointModelList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(tvItemModelSubsector.TVItemID, TVTypeEnum.Subsector, MapInfoDrawTypeEnum.Polygon);
            foreach (MapInfoPointModel mapInfoPointModel in mapInfoPointModelList)
            {
                sbKML.AppendLine(mapInfoPointModel.Lng + "," + mapInfoPointModel.Lat + ",0 ");

            }

            sbKML.AppendLine(@"					</coordinates>");
            sbKML.AppendLine(@"				</LinearRing>");
            sbKML.AppendLine(@"			</outerBoundaryIs>");
            sbKML.AppendLine(@"		</Polygon>");
            sbKML.AppendLine(@"	</Placemark>");

            // Doing Municipalities
            sbKML.AppendLine(@" <Folder>");
            sbKML.AppendLine(@"	<name>Municipalities</name>");
            sbKML.AppendLine(@"	<visibility>0</visibility>");
            List<TVItemModel> tvItemModelMunicipalityList = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelSubsector.TVItemID, TVTypeEnum.Municipality);

            foreach (TVItemModel tvItemModelMunicipality in tvItemModelMunicipalityList)
            {
                sbKML.AppendLine(@" <Folder>");
                sbKML.AppendLine(@"	<name>" + tvItemModelMunicipality.TVText + "</name>");
                sbKML.AppendLine(@"	<visibility>0</visibility>");
                // Doing point
                sbKML.AppendLine(@"	<Placemark>");
                sbKML.AppendLine(@"	<name>" + tvItemModelMunicipality.TVText + " ( Point)</name>");
                sbKML.AppendLine(@"	<visibility>0</visibility>");
                sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");

                mapInfoPointModelList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(tvItemModelMunicipality.TVItemID, TVTypeEnum.Municipality, MapInfoDrawTypeEnum.Point);

                sbKML.AppendLine(@"		<Point>");
                sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelList[0].Lng + "," + mapInfoPointModelList[0].Lat + ",0</coordinates>");
                sbKML.AppendLine(@"		</Point>");
                sbKML.AppendLine(@"	</Placemark>");

                List<TVItemModel> tvItemModelInfrastructureList = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelMunicipality.TVItemID, TVTypeEnum.Infrastructure);

                List<InfrastructureModel> infrastructureModelList = new List<InfrastructureModel>();

                foreach (TVItemModel tvItemModelInfrastructure in tvItemModelInfrastructureList)
                {
                    infrastructureModelList.Add(infrastructureService.GetInfrastructureModelWithInfrastructureTVItemIDDB(tvItemModelInfrastructure.TVItemID));
                }

                // Doing WWTP
                foreach (InfrastructureModel infrastructureModel in infrastructureModelList.Where(c => c.InfrastructureType == InfrastructureTypeEnum.WWTP).ToList())
                {
                    sbKML.AppendLine(@"	<Placemark>");
                    sbKML.AppendLine(@"	<name>" + tvItemModelInfrastructureList.Where(c => c.TVItemID == infrastructureModel.InfrastructureTVItemID).Select(c => c.TVText).FirstOrDefault() + "</name>");
                    sbKML.AppendLine(@"	<visibility>0</visibility>");
                    sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");

                    sbKML.AppendLine(@"	<description>");
                    sbKML.AppendLine(@"<![CDATA[");
                    sbKML.AppendLine(@"<pre>");
                    sbKML.AppendLine(@"Alarm System Type: " + baseEnumService.GetEnumText_AlarmSystemTypeEnum(infrastructureModel.AlarmSystemType) + "\r\n");
                    sbKML.AppendLine(@"Can overflow: " + infrastructureModel.CanOverflow.ToString() + "\r\n");
                    sbKML.AppendLine(@"Category: " + infrastructureModel.InfrastructureCategory + "\r\n");
                    sbKML.AppendLine(@"Collection System Type: " + baseEnumService.GetEnumText_CollectionSystemTypeEnum(infrastructureModel.CollectionSystemType) + "\r\n");
                    sbKML.AppendLine(@"Comments: " + infrastructureModel.Comment + "\r\n");
                    sbKML.AppendLine(@"DesignFlow (m3/day): " + infrastructureModel.DesignFlow_m3_day + "\r\n");
                    sbKML.AppendLine(@"Disinfection Type: " + baseEnumService.GetEnumText_DisinfectionTypeEnum(infrastructureModel.DisinfectionType) + "\r\n");
                    sbKML.AppendLine(@"Infrastructure Type: " + baseEnumService.GetEnumText_InfrastructureTypeEnum(infrastructureModel.InfrastructureType) + "\r\n");
                    sbKML.AppendLine(@"Average Flow (m3/day): " + infrastructureModel.AverageFlow_m3_day + "\r\n");
                    sbKML.AppendLine(@"AverageFlow_m3_day: " + infrastructureModel.PeakFlow_m3_day + "\r\n");
                    sbKML.AppendLine(@"Percent Flow Of Total (%): " + infrastructureModel.PercFlowOfTotal + "\r\n");
                    sbKML.AppendLine(@"Population Served: " + infrastructureModel.PopServed + "\r\n");
                    sbKML.AppendLine(@"Time Zone: " + infrastructureModel.TimeOffset_hour + "\r\n");
                    sbKML.AppendLine(@"Treatment Type: " + baseEnumService.GetEnumText_TreatmentTypeEnum(infrastructureModel.TreatmentType) + "\r\n");

                    List<MapInfoPointModel> mapInfoPointModelInfrastructureList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(infrastructureModel.InfrastructureTVItemID, TVTypeEnum.WasteWaterTreatmentPlant, MapInfoDrawTypeEnum.Point);

                    if (mapInfoPointModelInfrastructureList.Count > 0)
                    {
                        sbKML.AppendLine(@"Latitude Longitude: " + mapInfoPointModelInfrastructureList[0].Lat + " " + mapInfoPointModelInfrastructureList[0].Lng + "\r\n");
                    }
                    else
                    {
                        sbKML.AppendLine("Latitude Longitude: \r\n");
                    }

                    List<MapInfoPointModel> mapInfoPointModelInfrastructureOutfallList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(infrastructureModel.InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point);

                    if (mapInfoPointModelInfrastructureOutfallList.Count > 0)
                    {
                        sbKML.AppendLine(@"Outfall: Latitude Longitude: " + mapInfoPointModelInfrastructureOutfallList[0].Lat + " " + mapInfoPointModelInfrastructureOutfallList[0].Lng + "\r\n");
                    }
                    else
                    {
                        sbKML.AppendLine("Outfall: Latitude Longitude: \r\n");
                    }
                    sbKML.AppendLine("\r\n\r\n");
                    sbKML.AppendLine("Outfall Information\r\n\r\n");
                    sbKML.AppendLine(@"Average Depth (m): " + infrastructureModel.AverageDepth_m + "\r\n");
                    sbKML.AppendLine(@"Decay Rate (/day): " + infrastructureModel.DecayRate_per_day + "\r\n");
                    sbKML.AppendLine(@"Distance From Shore (m): " + infrastructureModel.DistanceFromShore_m + "\r\n");
                    sbKML.AppendLine(@"Far Field Velocity (m/s): " + infrastructureModel.FarFieldVelocity_m_s + "\r\n");
                    sbKML.AppendLine(@"Horizontal Angle (deg): " + infrastructureModel.HorizontalAngle_deg + "\r\n");
                    sbKML.AppendLine(@"Near Field Velocity (m/s): " + infrastructureModel.NearFieldVelocity_m_s + "\r\n");
                    sbKML.AppendLine(@"Number Of Ports: " + infrastructureModel.NumberOfPorts + "\r\n");
                    sbKML.AppendLine(@"Port Diameter (m): " + infrastructureModel.PortDiameter_m + "\r\n");
                    sbKML.AppendLine(@"Port Elevation (m): " + infrastructureModel.PortElevation_m + "\r\n");
                    sbKML.AppendLine(@"Port Spacing (m): " + infrastructureModel.PortSpacing_m + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Concentration (FC /100 ml): " + infrastructureModel.ReceivingWater_MPN_per_100ml + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Salinity (PSU): " + infrastructureModel.ReceivingWaterSalinity_PSU + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Temperature (ºC): " + infrastructureModel.ReceivingWaterTemperature_C + "\r\n");
                    sbKML.AppendLine(@"Vertical Angle (deg): " + infrastructureModel.VerticalAngle_deg + "\r\n");
                    sbKML.AppendLine(@"</pre>");
                    sbKML.AppendLine(@"]]>");
                    sbKML.AppendLine(@"	</description>");

                    sbKML.AppendLine(@"		<Point>");
                    sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelInfrastructureList[0].Lng + "," + mapInfoPointModelInfrastructureList[0].Lat + ",0</coordinates>");
                    sbKML.AppendLine(@"		</Point>");
                    sbKML.AppendLine(@"	</Placemark>");

                    sbKML.AppendLine(@"	<Placemark>");
                    sbKML.AppendLine(@"	<name>Outfall " + tvItemModelInfrastructureList.Where(c => c.TVItemID == infrastructureModel.InfrastructureTVItemID).Select(c => c.TVText).FirstOrDefault() + "</name>");
                    sbKML.AppendLine(@"	<visibility>0</visibility>");
                    sbKML.AppendLine(@"<styleUrl>#msn_grn-pushpin</styleUrl>");

                    sbKML.AppendLine(@"		<Point>");
                    sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelInfrastructureOutfallList[0].Lng + "," + mapInfoPointModelInfrastructureOutfallList[0].Lat + ",0</coordinates>");
                    sbKML.AppendLine(@"		</Point>");
                    sbKML.AppendLine(@"	</Placemark>");

                }

                // Doing LS
                foreach (InfrastructureModel infrastructureModel in infrastructureModelList.Where(c => c.InfrastructureType == InfrastructureTypeEnum.LiftStation).ToList())
                {
                    sbKML.AppendLine(@"	<Placemark>");
                    sbKML.AppendLine(@"	<name>" + tvItemModelInfrastructureList.Where(c => c.TVItemID == infrastructureModel.InfrastructureTVItemID).Select(c => c.TVText).FirstOrDefault() + "</name>");
                    sbKML.AppendLine(@"	<visibility>0</visibility>");
                    sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");

                    sbKML.AppendLine(@"	<description>");
                    sbKML.AppendLine(@"<![CDATA[");
                    sbKML.AppendLine(@"<pre>");
                    sbKML.AppendLine(@"Alarm System Type: " + baseEnumService.GetEnumText_AlarmSystemTypeEnum(infrastructureModel.AlarmSystemType) + "\r\n");
                    sbKML.AppendLine(@"Can overflow: " + infrastructureModel.CanOverflow.ToString() + "\r\n");
                    sbKML.AppendLine(@"Category: " + infrastructureModel.InfrastructureCategory + "\r\n");
                    sbKML.AppendLine(@"Collection System Type: " + baseEnumService.GetEnumText_CollectionSystemTypeEnum(infrastructureModel.CollectionSystemType) + "\r\n");
                    sbKML.AppendLine(@"Comments: " + infrastructureModel.Comment + "\r\n");
                    sbKML.AppendLine(@"Infrastructure Type: " + baseEnumService.GetEnumText_InfrastructureTypeEnum(infrastructureModel.InfrastructureType) + "\r\n");
                    sbKML.AppendLine(@"Percent Flow Of Total (%): " + infrastructureModel.PercFlowOfTotal + "\r\n");

                    List<MapInfoPointModel> mapInfoPointModelInfrastructureList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(infrastructureModel.InfrastructureTVItemID, TVTypeEnum.LiftStation, MapInfoDrawTypeEnum.Point);

                    if (mapInfoPointModelInfrastructureList.Count > 0)
                    {
                        sbKML.AppendLine(@"Latitude Longitude: " + mapInfoPointModelInfrastructureList[0].Lat + " " + mapInfoPointModelInfrastructureList[0].Lng + "\r\n");
                    }
                    else
                    {
                        sbKML.AppendLine("Latitude Longitude: \r\n");
                    }

                    List<MapInfoPointModel> mapInfoPointModelInfrastructureOutfallList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(infrastructureModel.InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point);

                    if (mapInfoPointModelInfrastructureOutfallList.Count > 0)
                    {
                        sbKML.AppendLine(@"Outfall: Latitude Longitude: " + mapInfoPointModelInfrastructureOutfallList[0].Lat + " " + mapInfoPointModelInfrastructureOutfallList[0].Lng + "\r\n");
                    }
                    else
                    {
                        sbKML.AppendLine("Outfall: Latitude Longitude: \r\n");
                    }
                    sbKML.AppendLine("\r\n\r\n");
                    sbKML.AppendLine("Outfall Information\r\n\r\n");
                    sbKML.AppendLine(@"Average Depth (m): " + infrastructureModel.AverageDepth_m + "\r\n");
                    sbKML.AppendLine(@"Decay Rate (/day): " + infrastructureModel.DecayRate_per_day + "\r\n");
                    sbKML.AppendLine(@"Distance From Shore (m): " + infrastructureModel.DistanceFromShore_m + "\r\n");
                    sbKML.AppendLine(@"Far Field Velocity (m/s): " + infrastructureModel.FarFieldVelocity_m_s + "\r\n");
                    sbKML.AppendLine(@"Horizontal Angle (deg): " + infrastructureModel.HorizontalAngle_deg + "\r\n");
                    sbKML.AppendLine(@"Near Field Velocity (m/s): " + infrastructureModel.NearFieldVelocity_m_s + "\r\n");
                    sbKML.AppendLine(@"Number Of Ports: " + infrastructureModel.NumberOfPorts + "\r\n");
                    sbKML.AppendLine(@"Port Diameter (m): " + infrastructureModel.PortDiameter_m + "\r\n");
                    sbKML.AppendLine(@"Port Elevation (m): " + infrastructureModel.PortElevation_m + "\r\n");
                    sbKML.AppendLine(@"Port Spacing (m): " + infrastructureModel.PortSpacing_m + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Concentration (FC /100 ml): " + infrastructureModel.ReceivingWater_MPN_per_100ml + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Salinity (PSU): " + infrastructureModel.ReceivingWaterSalinity_PSU + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Temperature (ºC): " + infrastructureModel.ReceivingWaterTemperature_C + "\r\n");
                    sbKML.AppendLine(@"Vertical Angle (deg): " + infrastructureModel.VerticalAngle_deg + "\r\n");
                    sbKML.AppendLine(@"</pre>");
                    sbKML.AppendLine(@"]]>");
                    sbKML.AppendLine(@"	</description>");

                    sbKML.AppendLine(@"		<Point>");
                    sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelInfrastructureList[0].Lng + "," + mapInfoPointModelInfrastructureList[0].Lat + ",0</coordinates>");
                    sbKML.AppendLine(@"		</Point>");
                    sbKML.AppendLine(@"	</Placemark>");

                    sbKML.AppendLine(@"	<Placemark>");
                    sbKML.AppendLine(@"	<name>Outfall " + tvItemModelInfrastructureList.Where(c => c.TVItemID == infrastructureModel.InfrastructureTVItemID).Select(c => c.TVText).FirstOrDefault() + "</name>");
                    sbKML.AppendLine(@"	<visibility>0</visibility>");
                    sbKML.AppendLine(@"<styleUrl>#msn_grn-pushpin</styleUrl>");

                    sbKML.AppendLine(@"		<Point>");
                    sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelInfrastructureOutfallList[0].Lng + "," + mapInfoPointModelInfrastructureOutfallList[0].Lat + ",0</coordinates>");
                    sbKML.AppendLine(@"		</Point>");
                    sbKML.AppendLine(@"	</Placemark>");
                }

                // Doing Line Overflow
                foreach (InfrastructureModel infrastructureModel in infrastructureModelList.Where(c => c.InfrastructureType == InfrastructureTypeEnum.LineOverflow).ToList())
                {
                    sbKML.AppendLine(@"	<Placemark>");
                    sbKML.AppendLine(@"	<name>" + tvItemModelInfrastructureList.Where(c => c.TVItemID == infrastructureModel.InfrastructureTVItemID).Select(c => c.TVText).FirstOrDefault() + "</name>");
                    sbKML.AppendLine(@"	<visibility>0</visibility>");
                    sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");

                    sbKML.AppendLine(@"	<description>");
                    sbKML.AppendLine(@"<![CDATA[");
                    sbKML.AppendLine(@"<pre>");
                    sbKML.AppendLine(@"Alarm System Type: " + baseEnumService.GetEnumText_AlarmSystemTypeEnum(infrastructureModel.AlarmSystemType) + "\r\n");
                    sbKML.AppendLine(@"Can overflow: " + infrastructureModel.CanOverflow.ToString() + "\r\n");
                    sbKML.AppendLine(@"Category: " + infrastructureModel.InfrastructureCategory + "\r\n");
                    sbKML.AppendLine(@"Collection System Type: " + baseEnumService.GetEnumText_CollectionSystemTypeEnum(infrastructureModel.CollectionSystemType) + "\r\n");
                    sbKML.AppendLine(@"Comments: " + infrastructureModel.Comment + "\r\n");
                    sbKML.AppendLine(@"Infrastructure Type: " + baseEnumService.GetEnumText_InfrastructureTypeEnum(infrastructureModel.InfrastructureType) + "\r\n");
                    sbKML.AppendLine(@"Percent Flow Of Total (%): " + infrastructureModel.PercFlowOfTotal + "\r\n");

                    List<MapInfoPointModel> mapInfoPointModelInfrastructureList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(infrastructureModel.InfrastructureTVItemID, TVTypeEnum.LineOverflow, MapInfoDrawTypeEnum.Point);

                    if (mapInfoPointModelInfrastructureList.Count > 0)
                    {
                        sbKML.AppendLine(@"Latitude Longitude: " + mapInfoPointModelInfrastructureList[0].Lat + " " + mapInfoPointModelInfrastructureList[0].Lng + "\r\n");
                    }
                    else
                    {
                        sbKML.AppendLine("Latitude Longitude: \r\n");
                    }

                    List<MapInfoPointModel> mapInfoPointModelInfrastructureOutfallList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(infrastructureModel.InfrastructureTVItemID, TVTypeEnum.Outfall, MapInfoDrawTypeEnum.Point);

                    if (mapInfoPointModelInfrastructureOutfallList.Count > 0)
                    {
                        sbKML.AppendLine(@"Outfall: Latitude Longitude: " + mapInfoPointModelInfrastructureOutfallList[0].Lat + " " + mapInfoPointModelInfrastructureOutfallList[0].Lng + "\r\n");
                    }
                    else
                    {
                        sbKML.AppendLine("Outfall: Latitude Longitude: \r\n");
                    }
                    sbKML.AppendLine("\r\n\r\n");
                    sbKML.AppendLine("Outfall Information\r\n\r\n");
                    sbKML.AppendLine(@"Average Depth (m): " + infrastructureModel.AverageDepth_m + "\r\n");
                    sbKML.AppendLine(@"Decay Rate (/day): " + infrastructureModel.DecayRate_per_day + "\r\n");
                    sbKML.AppendLine(@"Distance From Shore (m): " + infrastructureModel.DistanceFromShore_m + "\r\n");
                    sbKML.AppendLine(@"Far Field Velocity (m/s): " + infrastructureModel.FarFieldVelocity_m_s + "\r\n");
                    sbKML.AppendLine(@"Horizontal Angle (deg): " + infrastructureModel.HorizontalAngle_deg + "\r\n");
                    sbKML.AppendLine(@"Near Field Velocity (m/s): " + infrastructureModel.NearFieldVelocity_m_s + "\r\n");
                    sbKML.AppendLine(@"Number Of Ports: " + infrastructureModel.NumberOfPorts + "\r\n");
                    sbKML.AppendLine(@"Port Diameter (m): " + infrastructureModel.PortDiameter_m + "\r\n");
                    sbKML.AppendLine(@"Port Elevation (m): " + infrastructureModel.PortElevation_m + "\r\n");
                    sbKML.AppendLine(@"Port Spacing (m): " + infrastructureModel.PortSpacing_m + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Concentration (FC /100 ml): " + infrastructureModel.ReceivingWater_MPN_per_100ml + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Salinity (PSU): " + infrastructureModel.ReceivingWaterSalinity_PSU + "\r\n");
                    sbKML.AppendLine(@"Receiving Water Temperature (ºC): " + infrastructureModel.ReceivingWaterTemperature_C + "\r\n");
                    sbKML.AppendLine(@"Vertical Angle (deg): " + infrastructureModel.VerticalAngle_deg + "\r\n");
                    sbKML.AppendLine(@"</pre>");
                    sbKML.AppendLine(@"]]>");
                    sbKML.AppendLine(@"	</description>");

                    sbKML.AppendLine(@"		<Point>");
                    sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelInfrastructureList[0].Lng + "," + mapInfoPointModelInfrastructureList[0].Lat + ",0</coordinates>");
                    sbKML.AppendLine(@"		</Point>");
                    sbKML.AppendLine(@"	</Placemark>");

                    sbKML.AppendLine(@"	<Placemark>");
                    sbKML.AppendLine(@"	<name>Outfall " + tvItemModelInfrastructureList.Where(c => c.TVItemID == infrastructureModel.InfrastructureTVItemID).Select(c => c.TVText).FirstOrDefault() + "</name>");
                    sbKML.AppendLine(@"	<visibility>0</visibility>");
                    sbKML.AppendLine(@"<styleUrl>#msn_grn-pushpin</styleUrl>");

                    sbKML.AppendLine(@"		<Point>");
                    sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelInfrastructureOutfallList[0].Lng + "," + mapInfoPointModelInfrastructureOutfallList[0].Lat + ",0</coordinates>");
                    sbKML.AppendLine(@"		</Point>");
                    sbKML.AppendLine(@"	</Placemark>");
                }
                sbKML.AppendLine(@" </Folder>");
            }
            sbKML.AppendLine(@" </Folder>");

            // Doing Short Pollution Source Site
            sbKML.AppendLine(@" <Folder>");
            sbKML.AppendLine(@"	<name>Short Pollution Source Sites</name>");
            sbKML.AppendLine(@"	<visibility>0</visibility>");
            List<PolSourceSiteModel> polSourceSiteModelList = polSourceSiteService.GetPolSourceSiteModelListWithSubsectorTVItemIDDB(tvItemModelSubsector.TVItemID);

            foreach (PolSourceSiteModel polSourceSiteModel in polSourceSiteModelList.OrderBy(c => c.Site).ToList())
            {
                // Doing point
                sbKML.AppendLine(@"	<Placemark>");
                sbKML.AppendLine(@"	<name>" + polSourceSiteModel.Site.ToString() + "</name>");
                sbKML.AppendLine(@"	<visibility>0</visibility>");
                sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");
                sbKML.AppendLine(@"	<description>");
                sbKML.AppendLine(@"<![CDATA[");
                sbKML.AppendLine(@"<pre>");

                PolSourceObservationModel polSourceObservationModel = polSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelLatestWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID);
                if (polSourceObservationModel != null)
                {
                    List<PolSourceObservationIssueModel> polSourceObservationIssueModelList = polSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(polSourceObservationModel.PolSourceObservationID);

                    string SelectedObservation = "Selected: \r\n";
                    foreach (PolSourceObservationIssueModel polSourceObservationIssueModel in polSourceObservationIssueModelList)
                    {
                        foreach (PolSourceObsInfoEnum polSourceObsInfo in polSourceObservationIssueModel.PolSourceObsInfoList)
                        {
                            SelectedObservation += baseEnumService.GetEnumText_PolSourceObsInfoReportEnum(polSourceObsInfo);
                        }
                        SelectedObservation += "\r\n\r\n";
                    }

                    sbKML.AppendLine("Written: \r\n" + (string.IsNullOrWhiteSpace(polSourceObservationModel.Observation_ToBeDeleted) ? "" : polSourceObservationModel.Observation_ToBeDeleted.ToString()) + "\r\n\r\n" + SelectedObservation);
                }
                else
                {
                    string SelectedObservation = "Selected: \r\n";
                    sbKML.AppendLine("Written: \r\n\r\n" + SelectedObservation);
                }

                sbKML.AppendLine(@"</pre>");
                sbKML.AppendLine(@"]]>");
                sbKML.AppendLine(@"	</description>");

                mapInfoPointModelList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(polSourceSiteModel.PolSourceSiteTVItemID, TVTypeEnum.PolSourceSite, MapInfoDrawTypeEnum.Point);

                sbKML.AppendLine(@"		<Point>");
                sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelList[0].Lng + "," + mapInfoPointModelList[0].Lat + ",0</coordinates>");
                sbKML.AppendLine(@"		</Point>");
                sbKML.AppendLine(@"	</Placemark>");

            }
            sbKML.AppendLine(@" </Folder>");

            // Doing Long Pollution Source Site
            sbKML.AppendLine(@" <Folder>");
            sbKML.AppendLine(@"	<name>Long Pollution Source Sites</name>");
            sbKML.AppendLine(@"	<visibility>0</visibility>");
            polSourceSiteModelList = polSourceSiteService.GetPolSourceSiteModelListWithSubsectorTVItemIDDB(tvItemModelSubsector.TVItemID);

            foreach (PolSourceSiteModel polSourceSiteModel in polSourceSiteModelList.OrderBy(c => c.Site).ToList())
            {
                TVItemModel tvItemModelPolSourceSite = tvItemService.GetTVItemModelWithTVItemIDDB(polSourceSiteModel.PolSourceSiteTVItemID);

                // Doing point
                sbKML.AppendLine(@"	<Placemark>");
                sbKML.AppendLine(@"	<name>" + tvItemModelPolSourceSite.TVText + "</name>");
                sbKML.AppendLine(@"	<visibility>0</visibility>");
                sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");
                sbKML.AppendLine(@"	<description>");
                sbKML.AppendLine(@"<![CDATA[");
                sbKML.AppendLine(@"<pre>");

                PolSourceObservationModel polSourceObservationModel = polSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelLatestWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID);
                if (polSourceObservationModel != null)
                {
                    List<PolSourceObservationIssueModel> polSourceObservationIssueModelList = polSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(polSourceObservationModel.PolSourceObservationID);

                    string SelectedObservation = "Selected: \r\n";
                    foreach (PolSourceObservationIssueModel polSourceObservationIssueModel in polSourceObservationIssueModelList)
                    {
                        foreach (PolSourceObsInfoEnum polSourceObsInfo in polSourceObservationIssueModel.PolSourceObsInfoList)
                        {
                            SelectedObservation += baseEnumService.GetEnumText_PolSourceObsInfoReportEnum(polSourceObsInfo);
                        }
                        SelectedObservation += "\r\n\r\n";
                    }

                    sbKML.AppendLine("Written: \r\n" + (string.IsNullOrWhiteSpace(polSourceObservationModel.Observation_ToBeDeleted) ? "" : polSourceObservationModel.Observation_ToBeDeleted.ToString()) + "\r\n\r\n" + SelectedObservation);
                }
                else
                {
                    string SelectedObservation = "Selected: \r\n";
                    sbKML.AppendLine("Written: \r\n\r\n" + SelectedObservation);
                }

                sbKML.AppendLine(@"</pre>");
                sbKML.AppendLine(@"]]>");
                sbKML.AppendLine(@"	</description>");

                mapInfoPointModelList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(tvItemModelPolSourceSite.TVItemID, TVTypeEnum.PolSourceSite, MapInfoDrawTypeEnum.Point);

                sbKML.AppendLine(@"		<Point>");
                sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelList[0].Lng + "," + mapInfoPointModelList[0].Lat + ",0</coordinates>");
                sbKML.AppendLine(@"		</Point>");
                sbKML.AppendLine(@"	</Placemark>");

            }
            sbKML.AppendLine(@" </Folder>");


            // Doing MWQM Site
            sbKML.AppendLine(@" <Folder>");
            sbKML.AppendLine(@"	<name>MWQM Sites</name>");
            sbKML.AppendLine(@"	<visibility>0</visibility>");
            List<TVItemModel> tvItemModelMWQMSiteList = tvItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(tvItemModelSubsector.TVItemID, TVTypeEnum.MWQMSite);

            foreach (TVItemModel tvItemModelMWQMSite in tvItemModelMWQMSiteList)
            {
                // Doing point
                sbKML.AppendLine(@"	<Placemark>");
                sbKML.AppendLine(@"	<name>" + tvItemModelMWQMSite.TVText + "</name>");
                sbKML.AppendLine(@"	<visibility>0</visibility>");
                sbKML.AppendLine(@"<styleUrl>#msn_ylw-pushpin</styleUrl>");

                mapInfoPointModelList = mapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(tvItemModelMWQMSite.TVItemID, TVTypeEnum.MWQMSite, MapInfoDrawTypeEnum.Point);

                sbKML.AppendLine(@"		<Point>");
                sbKML.AppendLine(@"			<coordinates>" + mapInfoPointModelList[0].Lng + "," + mapInfoPointModelList[0].Lat + ",0</coordinates>");
                sbKML.AppendLine(@"		</Point>");
                sbKML.AppendLine(@"	</Placemark>");

            }
            sbKML.AppendLine(@" </Folder>");

            sbKML.AppendLine(@"	</Folder>");

            sbKML.AppendLine(@"</Document>");
            sbKML.AppendLine(@"</kml>");

            StreamWriter sw = fi.CreateText();
            sw.Write(sbKML.ToString());
            sw.Close();

        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceIssueList(int PolSourceObservationID, int IssueOrdinal)
        {
            ViewBag.PolSourceObservationID = PolSourceObservationID;
            ViewBag.IssueOrdinal = IssueOrdinal;
            ViewBag.PolSourceObservationIssueModelList = null;
            ViewBag.NextIssueOrdinal = IssueOrdinal + 1;

            if (PolSourceObservationID == 0)
            {
                return PartialView();
            }

            PolSourceObservationModel polSourceObservationModel = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelWithPolSourceObservationIDDB(PolSourceObservationID);
            if (!string.IsNullOrWhiteSpace(polSourceObservationModel.Error))
                return PartialView();

            List<PolSourceObservationIssueModel> polSourceObservationIssueModelList = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(PolSourceObservationID);
            if (polSourceObservationIssueModelList.Count == 0)
                return PartialView();

            ViewBag.PolSourceObservationIssueModelList = polSourceObservationIssueModelList;

            bool hasOrdinal = (from c in polSourceObservationIssueModelList
                               where c.Ordinal == IssueOrdinal
                               select c).Any();

            if (!hasOrdinal)
            {
                if (polSourceObservationIssueModelList.Count > 0)
                {
                    ViewBag.IssueOrdinal = polSourceObservationIssueModelList.Min(c => c.Ordinal);
                }
            }

            if (polSourceObservationIssueModelList.Count > 0)
            {
                ViewBag.NextIssueOrdinal = polSourceObservationIssueModelList.Max(c => c.Ordinal) + 1;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceIssueModify(int PolSourceObservationIssueID)
        {
            ViewBag.PolSourceObservationIssueID = PolSourceObservationIssueID;
            ViewBag.PolSourceController = _PolSourceController;
            ViewBag.PolSourceObservationIssueModel = null;
            ViewBag.PolSourceObsInfoEnumTextAndIDList = null;
            ViewBag.PolSourceObsInfoEnumHideAndIDList = null;
            ViewBag.PolSourceObsInfoEnumDescTextAndIDList = null;

            if (PolSourceObservationIssueID == 0)
            {
                return PartialView();
            }

            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelWithPolSourceObservationIssueIDDB(PolSourceObservationIssueID);
            ViewBag.PolSourceObservationIssueModel = polSourceObservationIssueModel;

            List<PolSourceObsInfoEnumTextAndID> polSourceObsInfoEnumTextAndIDList = new List<PolSourceObsInfoEnumTextAndID>();
            List<PolSourceObsInfoEnumHideAndID> polSourceObsInfoEnumHideAndIDList = new List<PolSourceObsInfoEnumHideAndID>();
            List<PolSourceObsInfoEnumTextAndID> polSourceObsInfoEnumDescTextAndIDList = new List<PolSourceObsInfoEnumTextAndID>();
            foreach (int id in Enum.GetValues(typeof(PolSourceObsInfoEnum)))
            {
                if (id == 0)
                    continue;

                string tempText = _BaseEnumService.GetEnumText_PolSourceObsInfoEnum((PolSourceObsInfoEnum)id);
                if (tempText.IndexOf("|") > 0)
                {
                    tempText = tempText.Substring(0, tempText.IndexOf("|")).Trim();
                }
                polSourceObsInfoEnumTextAndIDList.Add(new PolSourceObsInfoEnumTextAndID() { Text = tempText, ID = id });
                polSourceObsInfoEnumHideAndIDList.Add(new PolSourceObsInfoEnumHideAndID() { Hide = _BaseEnumService.GetEnumText_PolSourceObsInfoHideEnum((PolSourceObsInfoEnum)id), ID = id });
                polSourceObsInfoEnumDescTextAndIDList.Add(new PolSourceObsInfoEnumTextAndID() { Text = _BaseEnumService.GetEnumText_PolSourceObsInfoDescEnum((PolSourceObsInfoEnum)id), ID = id });
            }
            ViewBag.PolSourceObsInfoEnumTextAndIDList = polSourceObsInfoEnumTextAndIDList;
            ViewBag.PolSourceObsInfoEnumHideAndIDList = polSourceObsInfoEnumHideAndIDList;
            ViewBag.PolSourceObsInfoEnumDescTextAndIDList = polSourceObsInfoEnumDescTextAndIDList;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceIssueAddJSON(FormCollection fc) //int PolSourceObservationID, int NextIssueOrdinal)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostAddEmptyPolSourceObservationIssueDB(fc);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationIssueDeleteJSON(int PolSourceObservationIssueID)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostDeletePolSourceObservationIssueDB(PolSourceObservationIssueID);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationIssueMoveDownJSON(int PolSourceObservationIssueID)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostPolSourceObservationIssueMoveDownDB(PolSourceObservationIssueID);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationIssueMoveUpJSON(int PolSourceObservationIssueID)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostPolSourceObservationIssueMoveUpDB(PolSourceObservationIssueID);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceIssueSaveJSON(FormCollection fc)
        {
            PolSourceObservationIssueModel polSourceObservationIssueModel = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.PostModifyPolSourceObservationIssueDB(fc);

            return Json(polSourceObservationIssueModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationCopyJSON(int PolSourceObservationID)
        {
            PolSourceObservationModel polSourceObservationModel = _PolSourceSiteService._PolSourceObservationService.PolSourceObservationCopyDB(PolSourceObservationID);

            return Json(polSourceObservationModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationDeleteJSON(int PolSourceObservationID)
        {
            PolSourceObservationModel polSourceObservationModel = _PolSourceSiteService._PolSourceObservationService.PostDeletePolSourceObservationDB(PolSourceObservationID);

            return Json(polSourceObservationModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceObservationList(int PolSourceSiteTVItemID)
        {
            ViewBag.PolSourceSiteTVItemID = PolSourceSiteTVItemID;
            ViewBag.PolSourceController = _PolSourceController;
            ViewBag.PolSourceObservationModelList = null;

            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.GetPolSourceSiteModelWithPolSourceSiteTVItemIDDB(PolSourceSiteTVItemID);

            if (string.IsNullOrWhiteSpace(polSourceSiteModel.Error))
            {
                List<PolSourceObservationModel> polSourceObservationModelList = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelListWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID).OrderByDescending(c => c.ObservationDate_Local).OrderByDescending(c => c.LastUpdateDate_UTC).ToList();

                foreach (PolSourceObservationModel polSourceObservationModel in polSourceObservationModelList)
                {
                    polSourceObservationModel.PolSourceObservationIssueModelList = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(polSourceObservationModel.PolSourceObservationID);
                }

                ViewBag.PolSourceObservationModelList = polSourceObservationModelList;
            }

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceObservationAddOrModifyJSON(FormCollection fc)
        {
            PolSourceObservationModel PolSourceObservationModelRet = _PolSourceSiteService._PolSourceObservationService.PolSourceObservationAddOrModifyDB(fc);

            return Json(PolSourceObservationModelRet.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceSite(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.AddressModel = null;

            TVItemModel tvItemModelLocationCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelLocationCurrent = tvItemModelLocationCurrent;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            List<TabInfo> tabInfoList = GetTab1ViewTVItemInfoDB(tvItemModelLocationCurrent, tvAuth);

            ViewBag.TabInfoList = tabInfoList;

            ViewBag.PolSourceController = _PolSourceController;

            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.GetPolSourceSiteModelWithPolSourceSiteTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.PolSourceSiteModel = polSourceSiteModel;

            List<PolSourceObservationModel> polSourceObservationModelList = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelListWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID).OrderByDescending(c => c.ObservationDate_Local).OrderByDescending(c => c.LastUpdateDate_UTC).ToList();

            foreach (PolSourceObservationModel polSourceObservationModel in polSourceObservationModelList)
            {
                polSourceObservationModel.PolSourceObservationIssueModelList = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(polSourceObservationModel.PolSourceObservationID);
            }

            ViewBag.PolSourceObservationModelList = polSourceObservationModelList;

            List<MapInfoPointModel> mapInfoPointModelList = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.PolSourceSite, MapInfoDrawTypeEnum.Point);

            ViewBag.MapInfoPointModel = mapInfoPointModelList[0];

            if (polSourceSiteModel.CivicAddressTVItemID != null)
            {
                AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)polSourceSiteModel.CivicAddressTVItemID);

                ViewBag.AddressModel = addressModel;
            }

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult _polSourceSiteAddOrModify(int ParentTVItemID, int PolSourceSiteTVItemID)
        {
            ViewBag.PolSourceSiteModel = null;
            ViewBag.MapInfoPointModel = null;
            ViewBag.ParentTVItemID = ParentTVItemID;
            ViewBag.PolSourceSiteTVItemID = PolSourceSiteTVItemID;
            ViewBag.PolSourceController = _PolSourceController;
            ViewBag.PolSourceObservationModelList = null;
            ViewBag.TVItemModel = null;
            ViewBag.AddressModel = null;

            if (ParentTVItemID == 0 && PolSourceSiteTVItemID == 0)
            {
                return PartialView();
            }

            PolSourceSiteModel polSourceSiteModel = null;
            if (PolSourceSiteTVItemID > 0)
            {
                ViewBag.IsModify = true;

                polSourceSiteModel = _PolSourceSiteService.GetPolSourceSiteModelWithPolSourceSiteTVItemIDDB(PolSourceSiteTVItemID);

                if (ParentTVItemID == 0)
                {
                    ViewBag.ParentTVItemID = _TVItemService.GetTVItemModelWithTVItemIDDB(polSourceSiteModel.PolSourceSiteTVItemID).ParentID;
                }

                ViewBag.PolSourceSiteModel = polSourceSiteModel;

                List<PolSourceObservationModel> polSourceObservationModelList = _PolSourceSiteService._PolSourceObservationService.GetPolSourceObservationModelListWithPolSourceSiteIDDB(polSourceSiteModel.PolSourceSiteID).OrderByDescending(c => c.ObservationDate_Local).OrderByDescending(c => c.LastUpdateDate_UTC).ToList();

                foreach (PolSourceObservationModel polSourceObservationModel in polSourceObservationModelList)
                {
                    polSourceObservationModel.PolSourceObservationIssueModelList = _PolSourceSiteService._PolSourceObservationService._PolSourceObservationIssueService.GetPolSourceObservationIssueModelListWithPolSourceObservationIDDB(polSourceObservationModel.PolSourceObservationID);
                }

                ViewBag.PolSourceObservationModelList = polSourceObservationModelList;

                List<MapInfoPointModel> mapInfoPointModelList = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(PolSourceSiteTVItemID, TVTypeEnum.PolSourceSite, MapInfoDrawTypeEnum.Point);

                ViewBag.MapInfoPointModel = mapInfoPointModelList[0];

                TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(polSourceSiteModel.PolSourceSiteTVItemID);

                ViewBag.TVItemModel = tvItemModel;

                if (polSourceSiteModel.CivicAddressTVItemID != null)
                {
                    AddressModel addressModel = _AddressService.GetAddressModelWithAddressTVItemIDDB((int)polSourceSiteModel.CivicAddressTVItemID);

                    ViewBag.AddressModel = addressModel;
                }
            }

            List<PolSourceObsInfoEnumTextAndID> polSourceObsInfoEnumTextAndIDList = new List<PolSourceObsInfoEnumTextAndID>();
            foreach (int id in Enum.GetValues(typeof(PolSourceObsInfoEnum)))
            {
                if (id == 0)
                    continue;

                string tempText = _BaseEnumService.GetEnumText_PolSourceObsInfoEnum((PolSourceObsInfoEnum)id);
                if (tempText.IndexOf("|") > 0)
                {
                    tempText = tempText.Substring(0, tempText.IndexOf("|")).Trim();
                }
                polSourceObsInfoEnumTextAndIDList.Add(new PolSourceObsInfoEnumTextAndID() { Text = tempText, ID = id });
            }
            ViewBag.PolSourceObsInfoEnumTextAndIDList = polSourceObsInfoEnumTextAndIDList;

            List<PolSourceInactiveReasonEnumTextAndID> polSourceInactiveReasonEnumTextAndIDList = new List<PolSourceInactiveReasonEnumTextAndID>();
            foreach (int id in Enum.GetValues(typeof(PolSourceInactiveReasonEnum)))
            {
                if (id != 0)
                {
                    polSourceInactiveReasonEnumTextAndIDList.Add(new PolSourceInactiveReasonEnumTextAndID() { Text = _BaseEnumService.GetEnumText_PolSourceInactiveReasonEnum((PolSourceInactiveReasonEnum)id), ID = id });
                }
            }
            ViewBag.PolSourceInactiveReasonEnumTextAndIDList = polSourceInactiveReasonEnumTextAndIDList;


            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteAddOrModifyJSON(FormCollection fc)
        {
            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.PolSourceSiteAddOrModifyDB(fc);

            return Json(polSourceSiteModel.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult PolSourceSiteSetActiveJSON(int TVItemID, bool SetActive)
        {
            PolSourceSiteModel polSourceSiteModel = _PolSourceSiteService.PolSourceSiteSetActiveDB(TVItemID, SetActive);

            return Json(polSourceSiteModel.Error, JsonRequestBehavior.AllowGet);
        }


        #endregion Functions public
    }
}