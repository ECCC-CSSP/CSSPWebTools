using CSSPEnumsDLL.Enums;
using CSSPModelsDLL.Models;
using CSSPDBDLL.Models;
using CSSPDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class ReportController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        #endregion Properties

        #region Constructors
        #endregion Constructors
        
        #region Functions public
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetTVItemModelWithTVItemIDJSON(LanguageEnum Language, int TVItemID)
        {
            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemID);

            return Json(tvItemModel, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportAreaModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceArea reportServiceArea = new ReportServiceArea(Language, User);
            List<ReportAreaModel> ReportAreaModelList = reportServiceArea.GetReportAreaModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportAreaModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportArea_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceArea_File reportServiceArea_File = new ReportServiceArea_File(Language, User);
            List<ReportArea_FileModel> ReportArea_FileModelList = reportServiceArea_File.GetReportArea_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportArea_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportBox_ModelModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceBox_Model reportServiceBox_Model = new ReportServiceBox_Model(Language, User);
            List<ReportBox_ModelModel> ReportBox_ModelModelList = reportServiceBox_Model.GetReportBox_ModelModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportBox_ModelModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportBox_Model_ResultModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceBox_Model_Result reportServiceBox_Model_Result = new ReportServiceBox_Model_Result(Language, User);
            List<ReportBox_Model_ResultModel> ReportBox_Model_ResultModelList = reportServiceBox_Model_Result.GetReportBox_Model_ResultModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportBox_Model_ResultModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportClimate_SiteModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceClimate_Site reportServiceClimate_Site = new ReportServiceClimate_Site(Language, User);
            List<ReportClimate_SiteModel> ReportClimate_SiteModelList = reportServiceClimate_Site.GetReportClimate_SiteModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportClimate_SiteModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportClimate_Site_DataModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceClimate_Site_Data reportServiceClimate_Site_Data = new ReportServiceClimate_Site_Data(Language, User);
            List<ReportClimate_Site_DataModel> ReportClimate_Site_DataModelList = reportServiceClimate_Site_Data.GetReportClimate_Site_DataModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportClimate_Site_DataModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportCountryModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceCountry reportServiceCountry = new ReportServiceCountry(Language, User);
            List<ReportCountryModel> ReportCountryModelList = reportServiceCountry.GetReportCountryModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportCountryModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportCountry_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceCountry_File reportServiceCountry_File = new ReportServiceCountry_File(Language, User);
            List<ReportCountry_FileModel> ReportCountry_FileModelList = reportServiceCountry_File.GetReportCountry_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportCountry_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportHydrometric_SiteModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceHydrometric_Site reportServiceHydrometric_Site = new ReportServiceHydrometric_Site(Language, User);
            List<ReportHydrometric_SiteModel> ReportHydrometric_SiteModelList = reportServiceHydrometric_Site.GetReportHydrometric_SiteModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportHydrometric_SiteModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportHydrometric_Site_DataModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceHydrometric_Site_Data reportServiceHydrometric_Site_Data = new ReportServiceHydrometric_Site_Data(Language, User);
            List<ReportHydrometric_Site_DataModel> ReportHydrometric_Site_DataModelList = reportServiceHydrometric_Site_Data.GetReportHydrometric_Site_DataModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportHydrometric_Site_DataModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportHydrometric_Site_Rating_CurveModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceHydrometric_Site_Rating_Curve reportServiceHydrometric_Site_Rating_Curve = new ReportServiceHydrometric_Site_Rating_Curve(Language, User);
            List<ReportHydrometric_Site_Rating_CurveModel> ReportHydrometric_Site_Rating_CurveModelList = reportServiceHydrometric_Site_Rating_Curve.GetReportHydrometric_Site_Rating_CurveModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportHydrometric_Site_Rating_CurveModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportHydrometric_Site_Rating_Curve_ValueModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceHydrometric_Site_Rating_Curve_Value reportServiceHydrometric_Site_Rating_Curve_Value = new ReportServiceHydrometric_Site_Rating_Curve_Value(Language, User);
            List<ReportHydrometric_Site_Rating_Curve_ValueModel> ReportHydrometric_Site_Rating_Curve_ValueModelList = reportServiceHydrometric_Site_Rating_Curve_Value.GetReportHydrometric_Site_Rating_Curve_ValueModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportHydrometric_Site_Rating_Curve_ValueModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportInfrastructureModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceInfrastructure reportServiceInfrastructure = new ReportServiceInfrastructure(Language, User);
            List<ReportInfrastructureModel> ReportInfrastructureModelList = reportServiceInfrastructure.GetReportInfrastructureModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportInfrastructureModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportInfrastructure_AddressModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceInfrastructure_Address reportServiceInfrastructure_Address = new ReportServiceInfrastructure_Address(Language, User);
            List<ReportInfrastructure_AddressModel> ReportInfrastructure_AddressModelList = reportServiceInfrastructure_Address.GetReportInfrastructure_AddressModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportInfrastructure_AddressModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportInfrastructure_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceInfrastructure_File reportServiceInfrastructure_File = new ReportServiceInfrastructure_File(Language, User);
            List<ReportInfrastructure_FileModel> ReportInfrastructure_FileModelList = reportServiceInfrastructure_File.GetReportInfrastructure_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportInfrastructure_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMike_Boundary_ConditionModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMike_Boundary_Condition reportServiceMike_Boundary_Condition = new ReportServiceMike_Boundary_Condition(Language, User);
            List<ReportMike_Boundary_ConditionModel> ReportMike_Boundary_ConditionModelList = reportServiceMike_Boundary_Condition.GetReportMike_Boundary_ConditionModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMike_Boundary_ConditionModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMike_ScenarioModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMike_Scenario reportServiceMike_Scenario = new ReportServiceMike_Scenario(Language, User);
            List<ReportMike_ScenarioModel> ReportMike_ScenarioModelList = reportServiceMike_Scenario.GetReportMike_ScenarioModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMike_ScenarioModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMike_Scenario_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMike_Scenario_File reportServiceMike_Scenario_File = new ReportServiceMike_Scenario_File(Language, User);
            List<ReportMike_Scenario_FileModel> ReportMike_Scenario_FileModelList = reportServiceMike_Scenario_File.GetReportMike_Scenario_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMike_Scenario_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMike_SourceModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMike_Source reportServiceMike_Source = new ReportServiceMike_Source(Language, User);
            List<ReportMike_SourceModel> ReportMike_SourceModelList = reportServiceMike_Source.GetReportMike_SourceModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMike_SourceModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMike_Source_Start_EndModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMike_Source_Start_End reportServiceMike_Source_Start_End = new ReportServiceMike_Source_Start_End(Language, User);
            List<ReportMike_Source_Start_EndModel> ReportMike_Source_Start_EndModelList = reportServiceMike_Source_Start_End.GetReportMike_Source_Start_EndModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMike_Source_Start_EndModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMPN_LookupModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMPN_Lookup reportServiceMPN_Lookup = new ReportServiceMPN_Lookup(Language, User);
            List<ReportMPN_LookupModel> ReportMPN_LookupModelList = reportServiceMPN_Lookup.GetReportMPN_LookupModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMPN_LookupModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMunicipalityModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMunicipality reportServiceMunicipality = new ReportServiceMunicipality(Language, User);
            List<ReportMunicipalityModel> ReportMunicipalityModelList = reportServiceMunicipality.GetReportMunicipalityModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMunicipalityModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMunicipality_ContactModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMunicipality_Contact reportServiceMunicipality_Contact = new ReportServiceMunicipality_Contact(Language, User);
            List<ReportMunicipality_ContactModel> ReportMunicipality_ContactModelList = reportServiceMunicipality_Contact.GetReportMunicipality_ContactModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMunicipality_ContactModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMunicipality_Contact_AddressModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMunicipality_Contact_Address reportServiceMunicipality_Contact_Address = new ReportServiceMunicipality_Contact_Address(Language, User);
            List<ReportMunicipality_Contact_AddressModel> ReportMunicipality_Contact_AddressModelList = reportServiceMunicipality_Contact_Address.GetReportMunicipality_Contact_AddressModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMunicipality_Contact_AddressModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMunicipality_Contact_EmailModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMunicipality_Contact_Email reportServiceMunicipality_Contact_Email = new ReportServiceMunicipality_Contact_Email(Language, User);
            List<ReportMunicipality_Contact_EmailModel> ReportMunicipality_Contact_EmailModelList = reportServiceMunicipality_Contact_Email.GetReportMunicipality_Contact_EmailModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMunicipality_Contact_EmailModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMunicipality_Contact_TelModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMunicipality_Contact_Tel reportServiceMunicipality_Contact_Tel = new ReportServiceMunicipality_Contact_Tel(Language, User);
            List<ReportMunicipality_Contact_TelModel> ReportMunicipality_Contact_TelModelList = reportServiceMunicipality_Contact_Tel.GetReportMunicipality_Contact_TelModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMunicipality_Contact_TelModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMunicipality_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMunicipality_File reportServiceMunicipality_File = new ReportServiceMunicipality_File(Language, User);
            List<ReportMunicipality_FileModel> ReportMunicipality_FileModelList = reportServiceMunicipality_File.GetReportMunicipality_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMunicipality_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSampling_PlanModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSampling_Plan reportServiceSampling_Plan = new ReportServiceSampling_Plan(Language, User);
            List<ReportSampling_PlanModel> ReportSampling_PlanModelList = reportServiceSampling_Plan.GetReportSampling_PlanModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSampling_PlanModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSampling_Plan_Lab_SheetModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSampling_Plan_Lab_Sheet reportServiceSampling_Plan_Lab_Sheet = new ReportServiceSampling_Plan_Lab_Sheet(Language, User);
            List<ReportSampling_Plan_Lab_SheetModel> ReportSampling_Plan_Lab_SheetModelList = reportServiceSampling_Plan_Lab_Sheet.GetReportSampling_Plan_Lab_SheetModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSampling_Plan_Lab_SheetModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSampling_Plan_Lab_Sheet_DetailModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSampling_Plan_Lab_Sheet_Detail reportServiceSampling_Plan_Lab_Sheet_Detail = new ReportServiceSampling_Plan_Lab_Sheet_Detail(Language, User);
            List<ReportSampling_Plan_Lab_Sheet_DetailModel> ReportSampling_Plan_Lab_Sheet_DetailModelList = reportServiceSampling_Plan_Lab_Sheet_Detail.GetReportSampling_Plan_Lab_Sheet_DetailModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSampling_Plan_Lab_Sheet_DetailModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSampling_Plan_Lab_Sheet_Tube_And_MPN_DetailModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSampling_Plan_Lab_Sheet_Tube_And_MPN_Detail reportServiceSampling_Plan_Lab_Sheet_Tube_And_MPN_Detail = new ReportServiceSampling_Plan_Lab_Sheet_Tube_And_MPN_Detail(Language, User);
            List<ReportSampling_Plan_Lab_Sheet_Tube_And_MPN_DetailModel> ReportSampling_Plan_Lab_Sheet_Tube_And_MPN_DetailModelList = reportServiceSampling_Plan_Lab_Sheet_Tube_And_MPN_Detail.GetReportSampling_Plan_Lab_Sheet_Tube_And_MPN_DetailModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSampling_Plan_Lab_Sheet_Tube_And_MPN_DetailModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSampling_Plan_SubsectorModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSampling_Plan_Subsector reportServiceSampling_Plan_Subsector = new ReportServiceSampling_Plan_Subsector(Language, User);
            List<ReportSampling_Plan_SubsectorModel> ReportSampling_Plan_SubsectorModelList = reportServiceSampling_Plan_Subsector.GetReportSampling_Plan_SubsectorModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSampling_Plan_SubsectorModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSampling_Plan_Subsector_SiteModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSampling_Plan_Subsector_Site reportServiceSampling_Plan_Subsector_Site = new ReportServiceSampling_Plan_Subsector_Site(Language, User);
            List<ReportSampling_Plan_Subsector_SiteModel> ReportSampling_Plan_Subsector_SiteModelList = reportServiceSampling_Plan_Subsector_Site.GetReportSampling_Plan_Subsector_SiteModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSampling_Plan_Subsector_SiteModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_RunModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Run reportServiceMWQM_Run = new ReportServiceMWQM_Run(Language, User);
            List<ReportMWQM_RunModel> ReportMWQM_RunModelList = reportServiceMWQM_Run.GetReportMWQM_RunModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_RunModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_Run_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Run_File reportServiceMWQM_Run_File = new ReportServiceMWQM_Run_File(Language, User);
            List<ReportMWQM_Run_FileModel> ReportMWQM_Run_FileModelList = reportServiceMWQM_Run_File.GetReportMWQM_Run_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_Run_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_Run_Lab_SheetModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Run_Lab_Sheet reportServiceMWQM_Run_Lab_Sheet = new ReportServiceMWQM_Run_Lab_Sheet(Language, User);
            List<ReportMWQM_Run_Lab_SheetModel> ReportMWQM_Run_Lab_SheetModelList = reportServiceMWQM_Run_Lab_Sheet.GetReportMWQM_Run_Lab_SheetModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_Run_Lab_SheetModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_Run_Lab_Sheet_DetailModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Run_Lab_Sheet_Detail reportServiceMWQM_Run_Lab_Sheet_Detail = new ReportServiceMWQM_Run_Lab_Sheet_Detail(Language, User);
            List<ReportMWQM_Run_Lab_Sheet_DetailModel> ReportMWQM_Run_Lab_Sheet_DetailModelList = reportServiceMWQM_Run_Lab_Sheet_Detail.GetReportMWQM_Run_Lab_Sheet_DetailModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_Run_Lab_Sheet_DetailModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_Run_Lab_Sheet_Tube_And_MPN_DetailModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Run_Lab_Sheet_Tube_And_MPN_Detail reportServiceMWQM_Run_Lab_Sheet_Tube_And_MPN_Detail = new ReportServiceMWQM_Run_Lab_Sheet_Tube_And_MPN_Detail(Language, User);
            List<ReportMWQM_Run_Lab_Sheet_Tube_And_MPN_DetailModel> ReportMWQM_Run_Lab_Sheet_Tube_And_MPN_DetailModelList = reportServiceMWQM_Run_Lab_Sheet_Tube_And_MPN_Detail.GetReportMWQM_Run_Lab_Sheet_Tube_And_MPN_DetailModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_Run_Lab_Sheet_Tube_And_MPN_DetailModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_Run_SampleModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Run_Sample reportServiceMWQM_Run_Sample = new ReportServiceMWQM_Run_Sample(Language, User);
            List<ReportMWQM_Run_SampleModel> ReportMWQM_Run_SampleModelList = reportServiceMWQM_Run_Sample.GetReportMWQM_Run_SampleModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_Run_SampleModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_SiteModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Site reportServiceMWQM_Site = new ReportServiceMWQM_Site(Language, User);
            List<ReportMWQM_SiteModel> ReportMWQM_SiteModelList = reportServiceMWQM_Site.GetReportMWQM_SiteModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_SiteModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_Site_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Site_File reportServiceMWQM_Site_File = new ReportServiceMWQM_Site_File(Language, User);
            List<ReportMWQM_Site_FileModel> ReportMWQM_Site_FileModelList = reportServiceMWQM_Site_File.GetReportMWQM_Site_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_Site_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_Site_SampleModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Site_Sample reportServiceMWQM_Site_Sample = new ReportServiceMWQM_Site_Sample(Language, User);
            List<ReportMWQM_Site_SampleModel> ReportMWQM_Site_SampleModelList = reportServiceMWQM_Site_Sample.GetReportMWQM_Site_SampleModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_Site_SampleModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportMWQM_Site_Start_And_End_DateModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceMWQM_Site_Start_And_End_Date reportServiceMWQM_Site_Start_And_End_Date = new ReportServiceMWQM_Site_Start_And_End_Date(Language, User);
            List<ReportMWQM_Site_Start_And_End_DateModel> ReportMWQM_Site_Start_And_End_DateModelList = reportServiceMWQM_Site_Start_And_End_Date.GetReportMWQM_Site_Start_And_End_DateModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportMWQM_Site_Start_And_End_DateModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportPol_Source_SiteModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServicePol_Source_Site reportServicePol_Source_Site = new ReportServicePol_Source_Site(Language, User);
            List<ReportPol_Source_SiteModel> ReportPol_Source_SiteModelList = reportServicePol_Source_Site.GetReportPol_Source_SiteModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportPol_Source_SiteModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportPol_Source_Site_AddressModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServicePol_Source_Site_Address reportServicePol_Source_Site_Address = new ReportServicePol_Source_Site_Address(Language, User);
            List<ReportPol_Source_Site_AddressModel> ReportPol_Source_Site_AddressModelList = reportServicePol_Source_Site_Address.GetReportPol_Source_Site_AddressModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportPol_Source_Site_AddressModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportPol_Source_Site_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServicePol_Source_Site_File reportServicePol_Source_Site_File = new ReportServicePol_Source_Site_File(Language, User);
            List<ReportPol_Source_Site_FileModel> ReportPol_Source_Site_FileModelList = reportServicePol_Source_Site_File.GetReportPol_Source_Site_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportPol_Source_Site_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportPol_Source_Site_ObsModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServicePol_Source_Site_Obs reportServicePol_Source_Site_Obs = new ReportServicePol_Source_Site_Obs(Language, User);
            List<ReportPol_Source_Site_ObsModel> ReportPol_Source_Site_ObsModelList = reportServicePol_Source_Site_Obs.GetReportPol_Source_Site_ObsModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportPol_Source_Site_ObsModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportPol_Source_Site_Obs_IssueModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServicePol_Source_Site_Obs_Issue reportServicePol_Source_Site_Obs_Issue = new ReportServicePol_Source_Site_Obs_Issue(Language, User);
            List<ReportPol_Source_Site_Obs_IssueModel> ReportPol_Source_Site_Obs_IssueModelList = reportServicePol_Source_Site_Obs_Issue.GetReportPol_Source_Site_Obs_IssueModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportPol_Source_Site_Obs_IssueModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportProvinceModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceProvince reportServiceProvince = new ReportServiceProvince(Language, User);
            List<ReportProvinceModel> ReportProvinceModelList = reportServiceProvince.GetReportProvinceModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportProvinceModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportProvince_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceProvince_File reportServiceProvince_File = new ReportServiceProvince_File(Language, User);
            List<ReportProvince_FileModel> ReportProvince_FileModelList = reportServiceProvince_File.GetReportProvince_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportProvince_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportRootModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceRoot reportServiceRoot = new ReportServiceRoot(Language, User);
            List<ReportRootModel> ReportRootModelList = reportServiceRoot.GetReportRootModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportRootModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportRoot_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceRoot_File reportServiceRoot_File = new ReportServiceRoot_File(Language, User);
            List<ReportRoot_FileModel> ReportRoot_FileModelList = reportServiceRoot_File.GetReportRoot_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportRoot_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSectorModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSector reportServiceSector = new ReportServiceSector(Language, User);
            List<ReportSectorModel> ReportSectorModelList = reportServiceSector.GetReportSectorModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSectorModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSector_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSector_File reportServiceSector_File = new ReportServiceSector_File(Language, User);
            List<ReportSector_FileModel> ReportSector_FileModelList = reportServiceSector_File.GetReportSector_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSector_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsectorModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector reportServiceSubsector = new ReportServiceSubsector(Language, User);
            List<ReportSubsectorModel> ReportSubsectorModelList = reportServiceSubsector.GetReportSubsectorModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsectorModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Special_TableModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Special_Table reportServiceSubsector_Special_Table = new ReportServiceSubsector_Special_Table(Language, User);
            List<ReportSubsector_Special_TableModel> ReportSubsector_Special_TableModelList = reportServiceSubsector_Special_Table.GetReportSubsector_Special_TableModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Special_TableModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Climate_SiteModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Climate_Site reportServiceSubsector_Climate_Site = new ReportServiceSubsector_Climate_Site(Language, User);
            List<ReportSubsector_Climate_SiteModel> ReportSubsector_Climate_SiteModelList = reportServiceSubsector_Climate_Site.GetReportSubsector_Climate_SiteModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Climate_SiteModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Climate_Site_DataModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Climate_Site_Data reportServiceSubsector_Climate_Site_Data = new ReportServiceSubsector_Climate_Site_Data(Language, User);
            List<ReportSubsector_Climate_Site_DataModel> ReportSubsector_Climate_Site_DataModelList = reportServiceSubsector_Climate_Site_Data.GetReportSubsector_Climate_Site_DataModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Climate_Site_DataModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_FileModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_File reportServiceSubsector_File = new ReportServiceSubsector_File(Language, User);
            List<ReportSubsector_FileModel> ReportSubsector_FileModelList = reportServiceSubsector_File.GetReportSubsector_FileModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_FileModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Hydrometric_SiteModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Hydrometric_Site reportServiceSubsector_Hydrometric_Site = new ReportServiceSubsector_Hydrometric_Site(Language, User);
            List<ReportSubsector_Hydrometric_SiteModel> ReportSubsector_Hydrometric_SiteModelList = reportServiceSubsector_Hydrometric_Site.GetReportSubsector_Hydrometric_SiteModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Hydrometric_SiteModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Hydrometric_Site_DataModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Hydrometric_Site_Data reportServiceSubsector_Hydrometric_Site_Data = new ReportServiceSubsector_Hydrometric_Site_Data(Language, User);
            List<ReportSubsector_Hydrometric_Site_DataModel> ReportSubsector_Hydrometric_Site_DataModelList = reportServiceSubsector_Hydrometric_Site_Data.GetReportSubsector_Hydrometric_Site_DataModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Hydrometric_Site_DataModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Hydrometric_Site_Rating_CurveModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Hydrometric_Site_Rating_Curve reportServiceSubsector_Hydrometric_Site_Rating_Curve = new ReportServiceSubsector_Hydrometric_Site_Rating_Curve(Language, User);
            List<ReportSubsector_Hydrometric_Site_Rating_CurveModel> ReportSubsector_Hydrometric_Site_Rating_CurveModelList = reportServiceSubsector_Hydrometric_Site_Rating_Curve.GetReportSubsector_Hydrometric_Site_Rating_CurveModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Hydrometric_Site_Rating_CurveModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Hydrometric_Site_Rating_Curve_ValueModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Hydrometric_Site_Rating_Curve_Value reportServiceSubsector_Hydrometric_Site_Rating_Curve_Value = new ReportServiceSubsector_Hydrometric_Site_Rating_Curve_Value(Language, User);
            List<ReportSubsector_Hydrometric_Site_Rating_Curve_ValueModel> ReportSubsector_Hydrometric_Site_Rating_Curve_ValueModelList = reportServiceSubsector_Hydrometric_Site_Rating_Curve_Value.GetReportSubsector_Hydrometric_Site_Rating_Curve_ValueModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Hydrometric_Site_Rating_Curve_ValueModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Lab_SheetModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Lab_Sheet reportServiceSubsector_Lab_Sheet = new ReportServiceSubsector_Lab_Sheet(Language, User);
            List<ReportSubsector_Lab_SheetModel> ReportSubsector_Lab_SheetModelList = reportServiceSubsector_Lab_Sheet.GetReportSubsector_Lab_SheetModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Lab_SheetModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Lab_Sheet_DetailModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Lab_Sheet_Detail reportServiceSubsector_Lab_Sheet_Detail = new ReportServiceSubsector_Lab_Sheet_Detail(Language, User);
            List<ReportSubsector_Lab_Sheet_DetailModel> ReportSubsector_Lab_Sheet_DetailModelList = reportServiceSubsector_Lab_Sheet_Detail.GetReportSubsector_Lab_Sheet_DetailModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Lab_Sheet_DetailModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Lab_Sheet_Tube_And_MPN_DetailModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Lab_Sheet_Tube_And_MPN_Detail reportServiceSubsector_Lab_Sheet_Tube_And_MPN_Detail = new ReportServiceSubsector_Lab_Sheet_Tube_And_MPN_Detail(Language, User);
            List<ReportSubsector_Lab_Sheet_Tube_And_MPN_DetailModel> ReportSubsector_Lab_Sheet_Tube_And_MPN_DetailModelList = reportServiceSubsector_Lab_Sheet_Tube_And_MPN_Detail.GetReportSubsector_Lab_Sheet_Tube_And_MPN_DetailModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Lab_Sheet_Tube_And_MPN_DetailModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Tide_SiteModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Tide_Site reportServiceSubsector_Tide_Site = new ReportServiceSubsector_Tide_Site(Language, User);
            List<ReportSubsector_Tide_SiteModel> ReportSubsector_Tide_SiteModelList = reportServiceSubsector_Tide_Site.GetReportSubsector_Tide_SiteModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsector_Tide_SiteModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportSubsector_Tide_Site_DataModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceSubsector_Tide_Site_Data reportServiceSubsector_Tide_Site_Data = new ReportServiceSubsector_Tide_Site_Data(Language, User);
            List<ReportSubsector_Tide_Site_DataModel> ReportSubsectorTide_Site_DataModelList = reportServiceSubsector_Tide_Site_Data.GetReportSubsector_Tide_Site_DataModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportSubsectorTide_Site_DataModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportVisual_Plumes_ScenarioModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceVisual_Plumes_Scenario reportServiceVisual_Plumes_Scenario = new ReportServiceVisual_Plumes_Scenario(Language, User);
            List<ReportVisual_Plumes_ScenarioModel> ReportVisual_Plumes_ScenarioModelList = reportServiceVisual_Plumes_Scenario.GetReportVisual_Plumes_ScenarioModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportVisual_Plumes_ScenarioModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportVisual_Plumes_Scenario_AmbientModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceVisual_Plumes_Scenario_Ambient reportServiceVisual_Plumes_Scenario_Ambient = new ReportServiceVisual_Plumes_Scenario_Ambient(Language, User);
            List<ReportVisual_Plumes_Scenario_AmbientModel> ReportVisual_Plumes_Scenario_AmbientModelList = reportServiceVisual_Plumes_Scenario_Ambient.GetReportVisual_Plumes_Scenario_AmbientModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportVisual_Plumes_Scenario_AmbientModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult GetReportVisual_Plumes_Scenario_ResultModelListUnderTVItemIDJSON(LanguageEnum Language, string Command, int UnderTVItemID, string ParentTagItem, bool CountOnly, int Take)
        {
            ReportServiceVisual_Plumes_Scenario_Result reportServiceVisual_Plumes_Scenario_Result = new ReportServiceVisual_Plumes_Scenario_Result(Language, User);
            List<ReportVisual_Plumes_Scenario_ResultModel> ReportVisual_Plumes_Scenario_ResultModelList = reportServiceVisual_Plumes_Scenario_Result.GetReportVisual_Plumes_Scenario_ResultModelListUnderTVItemIDDB(Language, Command, UnderTVItemID, ParentTagItem, CountOnly, Take);

            return Json(ReportVisual_Plumes_Scenario_ResultModelList, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public
    }
}