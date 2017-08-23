using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
using CSSPWebTools.Models;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class TVItemController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public TVItemController _TVItemController { get; private set; }
        public MapInfoService _MapInfoService { get; private set; }
        public BaseEnumService _EnumService { get; private set; }
        #endregion Properties

        #region Constructors
        public TVItemController()
        {
            _TVItemController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _MapInfoService = new MapInfoService(LanguageRequest, User);
            _EnumService = new BaseEnumService(LanguageRequest);
        }
        #endregion Overrides

        #region Functions public
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _breadCrumb(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            List<TVItemModel> tvItemModelLocationParentList = _TVItemService.GetParentTVItemModelListWithTVItemIDForLocationDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelLocationParentList = tvItemModelLocationParentList;

            ViewBag.TVItemController = _TVItemController;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _tabContent(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            TVItemModel tvItemModelLocationCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelLocationCurrent = tvItemModelLocationCurrent;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            List<TabInfo> tabInfoList = GetTab1ViewTVItemInfoDB(tvItemModelLocationCurrent, tvAuth);

            ViewBag.TabInfoList = tabInfoList;
            
            ViewBag.TVItemController = _TVItemController;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _content(string Q)
        {
            TVTypeEnum tvType = TVTypeEnum.Error;

            List<string> OptionListTxt = new List<string>() { "10", "15", "20", "25", "30", "35", "40" };

            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            if (!OptionListTxt.Contains(urlModel.VariableShow.Substring(0, 2)))
            {
                urlModel.VariableShow = "30" + urlModel.VariableShow.Substring(2);
            }

            string url = "";

            List<int> OptionList = new List<int>() { 10, 15, 20, 25, 30, 35, 40 };

            List<URLNumberOfSamples> urlNumberOfSamplesList = new List<URLNumberOfSamples>();

            foreach (int option in OptionList)
            {
                SetVariableShow(URLVarShowEnum.NumberOfSampleDecade, option.ToString().Substring(0, 1));
                SetVariableShow(URLVarShowEnum.NumberOfSampleUnit, option.ToString().Substring(1, 1));
                url = CreateHashURL(urlModel.TVItemIDList[0]);
                urlNumberOfSamplesList.Add(new URLNumberOfSamples() { NumberOfSamples = option, url = CreateHashURL(urlModel.TVItemIDList[0]) });
            }

            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            if (!OptionListTxt.Contains(urlModel.VariableShow.Substring(0, 2)))
            {
                urlModel.VariableShow = "30" + urlModel.VariableShow.Substring(2);
            }

            ViewBag.URLNumberOfSamplesList = urlNumberOfSamplesList;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);

            ViewBag.TVAuth = tvAuth;

            TVItemModel tvItemModelLocationCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);

            ViewBag.TVItemModelLocationCurrent = tvItemModelLocationCurrent;

            List<TabInfo> tabInfoList = GetTab1ViewTVItemInfoDB(tvItemModelLocationCurrent, tvAuth);

            ViewBag.TabInfoList = tabInfoList;

            ViewBag.NumberOfSample = int.Parse(GetURLVarShowEnumStr(URLVarShowEnum.NumberOfSampleDecade) + GetURLVarShowEnumStr(URLVarShowEnum.NumberOfSampleUnit));

            ContentActionAndController contentActionAndController = GetContentActionAndController(tvItemModelLocationCurrent, tabInfoList);

            ViewBag.ContentActionAndController = contentActionAndController;

            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);
            ViewBag.IsShowMap = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMap) == "0" ? false : true);
            ViewBag.AllSites = (GetURLVarShowEnumStr(URLVarShowEnum.ShowAll) == "0" ? false : true);

            if (ViewBag.AllSites)
            {
                ViewBag.ActiveURL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowAll, "0", "1");
            }
            else
            {
                ViewBag.ActiveURL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowAll, "1", "0");
            }

            ViewBag.OrderByDateModified = false;

            List<TVTypeEnum> tvTypeWithMunicipalityList = new List<TVTypeEnum>() { TVTypeEnum.Province, TVTypeEnum.Area, TVTypeEnum.Sector };

            List<TVItemModelAndChildCount> tvItemModelLocationChildrenList = new List<TVItemModelAndChildCount>();
            if (tvTypeWithMunicipalityList.Contains(tvItemModelLocationCurrent.TVType) && tabInfoList.FirstOrDefault().Active == "1")
            {
                tvItemModelLocationChildrenList = _TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.Municipality);
                tvType = TVTypeEnum.Municipality;
            }
            else if (tvItemModelLocationCurrent.TVType == TVTypeEnum.Municipality && tabInfoList.FirstOrDefault().Active == "1")
            {
                tvItemModelLocationChildrenList = _TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.MikeScenario);
                tvType = TVTypeEnum.MikeScenario;
            }
            else if (tvItemModelLocationCurrent.TVType == TVTypeEnum.MWQMSite && tabInfoList.FirstOrDefault().Active == "0")
            {
                tvItemModelLocationChildrenList = _TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.MWQMSiteSample);
                tvType = TVTypeEnum.MWQMSiteSample;
            }
            else if (tvItemModelLocationCurrent.TVType == TVTypeEnum.Subsector && tabInfoList.FirstOrDefault().Active == "1")
            {
                tvItemModelLocationChildrenList = _TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.MWQMRun).OrderByDescending(c => c.TVText).ToList();
                tvType = TVTypeEnum.MWQMRun;
            }
            else if (tvItemModelLocationCurrent.TVType == TVTypeEnum.Subsector && tabInfoList.FirstOrDefault().Active == "2")
            {
                tvItemModelLocationChildrenList = _TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.PolSourceSite);
                tvType = TVTypeEnum.PolSourceSite;

                ViewBag.OrderByDateModified = (GetURLVarShowEnumStr(URLVarShowEnum.ShowOrderByDateModified) == "0" ? false : true);

                if (ViewBag.OrderByDateModified)
                {
                    ViewBag.OrderByDateModifiedURL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowOrderByDateModified, "0", "1");
                }
                else
                {
                    ViewBag.OrderByDateModifiedURL = CreateTempVariableShowHashURL(URLVarShowEnum.ShowOrderByDateModified, "1", "0");
                }

                if (ViewBag.OrderByDateModified)
                {
                    tvItemModelLocationChildrenList = tvItemModelLocationChildrenList.OrderByDescending(c => c.LastUpdateDate_UTC).ToList();
                }

            }
            else if (tvItemModelLocationCurrent.TVType == TVTypeEnum.Subsector && tabInfoList.FirstOrDefault().Active == "3")
            {
                tvItemModelLocationChildrenList = _TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], TVTypeEnum.Municipality);
                tvType = TVTypeEnum.Municipality;
            }
            else
            {
                tvItemModelLocationChildrenList = _TVItemService.GetChildrenTVItemModelAndChildCountListWithTVItemIDAndTVTypeDB(urlModel.TVItemIDList[0], GetChildLocation(tvItemModelLocationCurrent.TVType));
                tvType = GetChildLocation(tvItemModelLocationCurrent.TVType);
            }

            if (!ViewBag.AllSites)
            {
                tvItemModelLocationChildrenList = tvItemModelLocationChildrenList.Where(c => c.IsActive).ToList();
            }


            ViewBag.TVItemModelLocationChildrenList = tvItemModelLocationChildrenList;

            ViewBag.TVItemController = _TVItemController;

            ViewBag.TVType = tvType;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _MovingTVItem(int TVItemID)
        {
            TVItemModel tvItemModelCurrent = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemID);
            ViewBag.TVItemModelCurrent = tvItemModelCurrent;

            ViewBag.TVItemController = _TVItemController;

            ViewBag.TVTypeNamesAndPathList = null;
            ViewBag.TVItemModelCountryList = null;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(TVItemID, null, null, null);
            ViewBag.TVAuth = tvAuth;
            if (tvAuth < TVAuthEnum.Write)
            {
                return PartialView();
            }

            List<TVItemModel> parentTVItemModelList = _TVItemService.GetParentsTVItemModelList(_TVItemService.GetParentTVPath(tvItemModelCurrent.TVPath));

            string TVTypeTVPath = _TVItemService.tvTypeNamesAndPathList.Where(c => c.TVTypeName == tvItemModelCurrent.TVType.ToString()).FirstOrDefault().TVPath;

            TVTypeTVPath = _TVItemService.GetParentTVPath(TVTypeTVPath);

            List<TVTypeNamesAndPath> tvTypeNamesAndPathList = new List<TVTypeNamesAndPath>();
            Dictionary<string, List<TVItemModel>> tvItemModelDictList = new Dictionary<string, List<TVItemModel>>();

            ViewBag.ParentTVItemModelList = parentTVItemModelList;

            if (string.IsNullOrWhiteSpace(tvItemModelCurrent.Error))
            {
                tvTypeNamesAndPathList = _TVItemService.GetTVTypeNamesAndPathParentsWithTVType(TVTypeTVPath);

                if (tvTypeNamesAndPathList.Count != parentTVItemModelList.Count)
                {
                    return PartialView();
                }
                for (int i = 0, count = parentTVItemModelList.Count - 1; i < count; i++)
                {
                    tvItemModelDictList.Add(tvTypeNamesAndPathList[i + 1].TVTypeName, _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(parentTVItemModelList[i].TVItemID, ((TVTypeEnum)tvTypeNamesAndPathList[i + 1].Index)));
                }
            }

            ViewBag.TVTypeNamesAndPathList = tvTypeNamesAndPathList;
            ViewBag.TVItemModelDictList = tvItemModelDictList;

            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _MovingTVItemSelect(int ParentTVItemID, TVTypeEnum TVType)
        {
            List<TVItemModel> TVItemModelList = _TVItemService.GetChildrenTVItemModelListWithTVItemIDAndTVTypeDB(ParentTVItemID, TVType);

            ViewBag.TVItemModelList = TVItemModelList;

            ViewBag.TVItemController = _TVItemController;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult MoveTVItemJSON(int TVItemIDToMove, int TVItemIDUnder)
        {
            TVItemModel tvItemModel = _TVItemService.PostMoveTVItemUnderAnotherTVItemDB(TVItemIDToMove, TVItemIDUnder);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _TVItemLinkList(string Q)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            int TVItemID = urlModel.TVItemIDList[0];
            ViewBag.TVItemController = _TVItemController;

            List<TVItemModel> tvItemModelFromList = new List<TVItemModel>();
            List<TVItemModel> tvItemModelToList = new List<TVItemModel>();

            // From
            List<TVItemLinkModel> tvItemLinkModelFromList = _TVItemService._TVItemLinkService.GetTVItemLinkModelListWithToTVItemIDDB(TVItemID).ToList();

            foreach (TVItemLinkModel tvItemLinkModel in tvItemLinkModelFromList)
            {
                TVItemModel tvItemModelTemp = _TVItemService.GetTVItemModelWithTVItemIDDB(tvItemLinkModel.FromTVItemID);
                if (tvItemModelTemp.TVItemID != TVItemID)
                {
                    tvItemModelFromList.Add(tvItemModelTemp);
                }
            }

            // To
            List<TVItemLinkModel> tvItemLinkModelToList = _TVItemService._TVItemLinkService.GetTVItemLinkModelListWithFromTVItemIDDB(urlModel.TVItemIDList[0]).ToList();

            foreach (TVItemLinkModel tvItemLinkModel in tvItemLinkModelToList)
            {
                TVItemModel tvItemModelTemp = _TVItemService.GetTVItemModelWithTVItemIDDB(tvItemLinkModel.ToTVItemID);
                if (tvItemModelTemp.TVItemID != TVItemID)
                {
                    tvItemModelToList.Add(tvItemModelTemp);
                }
            }

            ViewBag.TVItemModelFromList = tvItemModelFromList;
            ViewBag.TVItemModelToList = tvItemModelToList;

            int TVItemIDParent = _TVItemService.GetParentTVItemID(_TVItemService.GetTVItemModelWithTVItemIDDB(TVItemID).TVPath);

            TVItemModel tvItemModelParent = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemIDParent);

            if (!(tvItemModelFromList.Contains(tvItemModelParent)))
            {
                ViewBag.TVItemModelParent = tvItemModelParent;

                switch (tvItemModelParent.TVType)
                {
                    case TVTypeEnum.Error:
                        break;
                    case TVTypeEnum.Root:
                        SetVariableShow(URLVarShowEnum.ShowRootTab, "1");
                        break;
                    case TVTypeEnum.Address:
                        break;
                    case TVTypeEnum.Area:
                        SetVariableShow(URLVarShowEnum.ShowAreaTab, "2");
                        break;
                    case TVTypeEnum.ClimateSite:
                        break;
                    case TVTypeEnum.Contact:
                        break;
                    case TVTypeEnum.Country:
                        SetVariableShow(URLVarShowEnum.ShowCountryTab, "1");
                        break;
                    case TVTypeEnum.Email:
                        break;
                    case TVTypeEnum.File:
                        break;
                    case TVTypeEnum.HydrometricSite:
                        break;
                    case TVTypeEnum.Infrastructure:
                        SetVariableShow(URLVarShowEnum.ShowInfrastructureTab, "3");
                        break;
                    case TVTypeEnum.MikeBoundaryConditionWebTide:
                        break;
                    case TVTypeEnum.MikeBoundaryConditionMesh:
                        break;
                    case TVTypeEnum.MikeScenario:
                        SetVariableShow(URLVarShowEnum.ShowMikeScenarioTab, "3");
                        break;
                    case TVTypeEnum.MikeSource:
                        break;
                    case TVTypeEnum.Municipality:
                        SetVariableShow(URLVarShowEnum.ShowMunicipalityTab, "3");
                        break;
                    case TVTypeEnum.MWQMSite:
                        SetVariableShow(URLVarShowEnum.ShowMWQMSitesTab, "1");
                        break;
                    case TVTypeEnum.PolSourceSite:
                        SetVariableShow(URLVarShowEnum.ShowPolSourceSiteTab, "1");
                        break;
                    case TVTypeEnum.Province:
                        SetVariableShow(URLVarShowEnum.ShowProvinceTab, "2");
                        break;
                    case TVTypeEnum.Sector:
                        SetVariableShow(URLVarShowEnum.ShowSectorTab, "2");
                        break;
                    case TVTypeEnum.Subsector:
                        SetVariableShow(URLVarShowEnum.ShowSubsectorTab, "4");
                        break;
                    case TVTypeEnum.Tel:
                        break;
                    case TVTypeEnum.TideSite:
                        break;
                    case TVTypeEnum.MWQMSiteSample:
                        break;
                    case TVTypeEnum.WasteWaterTreatmentPlant:
                        break;
                    case TVTypeEnum.LiftStation:
                        break;
                    case TVTypeEnum.Spill:
                        break;
                    case TVTypeEnum.BoxModel:
                        break;
                    case TVTypeEnum.VisualPlumesScenario:
                        break;
                    case TVTypeEnum.Outfall:
                        break;
                    case TVTypeEnum.OtherInfrastructure:
                        break;
                    case TVTypeEnum.MWQMRun:
                        SetVariableShow(URLVarShowEnum.ShowMWQMRunsTab, "1");
                        break;
                    case TVTypeEnum.NoDepuration:
                        break;
                    case TVTypeEnum.Failed:
                        break;
                    case TVTypeEnum.Passed:
                        break;
                    case TVTypeEnum.NoData:
                        break;
                    case TVTypeEnum.LessThan10:
                        break;
                    case TVTypeEnum.MeshNode:
                        break;
                    case TVTypeEnum.WebTideNode:
                        break;
                    case TVTypeEnum.SamplingPlan:
                        break;
                    case TVTypeEnum.SeeOther:
                        break;
                    case TVTypeEnum.LineOverflow:
                        break;
                    default:
                        break;
                }
            }
            else
            {
                ViewBag.TVItemModelParent = null;
            }
            return PartialView();
        }
        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _TVItemMoreInfo(string Q, int TVItemID, int NumberOfSample)
        {
            SetArgs(Q);
            ViewBag.URLModel = urlModel;
            ViewBag.TVItemController = _TVItemController;
            ViewBag.TVItemStatModelList = null as List<TVItemStatModel>;
            ViewBag.TVItemMoreInfoInfrastructureModel = null as TVItemMoreInfoInfrastructureModel;
            ViewBag.TVItemMoreInfoMikeScenarioModel = null as TVItemMoreInfoMikeScenarioModel;
            ViewBag.TVItemMoreInfoPolSourceSiteModel = null as TVItemMoreInfoPolSourceSiteModel;
            ViewBag.TVItemMoreInfoFileModel = null as TVItemMoreInfoFileModel;
            ViewBag.TVItemMoreInfoMWQMRunModel = null as TVItemMoreInfoMWQMRunModel;
            ViewBag.TVItemMoreInfoMWQMSiteModel = null as TVItemMoreInfoMWQMSiteModel;

            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemID);

            ViewBag.TVItemModel = tvItemModel;

            switch ((TVTypeEnum)tvItemModel.TVType)
            {
                case TVTypeEnum.Root:
                case TVTypeEnum.Country:
                case TVTypeEnum.Province:
                case TVTypeEnum.Area:
                case TVTypeEnum.Sector:
                case TVTypeEnum.Subsector:
                case TVTypeEnum.Municipality:
                    {
                        List<TVItemStatModel> tvItemStatModelList = _TVItemStatService.GetTVItemStatModelListWithTVItemIDDB(TVItemID);

                        ViewBag.TVItemStatModelList = tvItemStatModelList;
                    }
                    break;
                case TVTypeEnum.File:
                    {
                        ViewBag.TVItemMoreInfoFileModel = _TVItemService.GetTVItemMoreInfoFileDB(TVItemID);
                    }
                    break;
                case TVTypeEnum.Infrastructure:
                    {
                        ViewBag.TVItemMoreInfoInfrastructureModel = _TVItemService.GetTVItemMoreInfoInfrastructureDB(TVItemID);
                    }
                    break;
                case TVTypeEnum.MikeScenario:
                    {
                        ViewBag.TVItemMoreInfoMikeScenarioModel = _TVItemService.GetTVItemMoreInfoMikeScenarioDB(TVItemID);
                    }
                    break;
                case TVTypeEnum.PolSourceSite:
                    {
                        ViewBag.TVItemMoreInfoPolSourceSiteModel = _TVItemService.GetTVItemMoreInfoPolSourceSiteDB(TVItemID);
                    }
                    break;
                case TVTypeEnum.MWQMRun:
                    {
                        ViewBag.TVItemMoreInfoMWQMRunModel = _TVItemService.GetTVItemMoreInfoMWQMRunTVItemIDDB(TVItemID);
                    }
                    break;
                case TVTypeEnum.MWQMSite:
                    {
                        ViewBag.TVItemMoreInfoMWQMSiteModel = _TVItemService.GetTVItemMoreInfoMWQMSiteTVItemIDDB(TVItemID, NumberOfSample);
                    }
                    break;
                default:
                    {
                    }
                    break;
            }
            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _TVItemAddOrModify(int ParentTVItemID, int TVItemID, TVTypeEnum TVType)
        {
            ViewBag.TVItemModel = null;
            ViewBag.MapInfoPointModel = null;
            ViewBag.MapInfoPointModelListPolyline = null;
            ViewBag.MapInfoPointModelListPolygon = null;
            ViewBag.ParentTVItemID = ParentTVItemID;
            ViewBag.TVItemID = TVItemID;
            ViewBag.TVType = TVType;
            ViewBag.TVTypeText = _EnumService.GetEnumText_TVTypeEnum(TVType); ;

            if (TVItemID > 0)
            {
                ViewBag.IsModify = true;

                TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemID);

                ViewBag.TVItemModel = tvItemModel;

                MapInfoPointModel mapInfoPointModel = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(TVItemID, TVType, MapInfoDrawTypeEnum.Point).FirstOrDefault();

                ViewBag.MapInfoPointModel = mapInfoPointModel;

                List<MapInfoPointModel> mapInfoPointModelListPolyline = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(TVItemID, TVType, MapInfoDrawTypeEnum.Polyline);

                ViewBag.MapInfoPointModelListPolyline = mapInfoPointModelListPolyline;

                List<MapInfoPointModel> mapInfoPointModelListPolygon = _MapInfoService._MapInfoPointService.GetMapInfoPointModelListWithTVItemIDAndTVTypeAndMapInfoDrawTypeDB(TVItemID, TVType, MapInfoDrawTypeEnum.Polygon);

                ViewBag.MapInfoPointModelListPolygon = mapInfoPointModelListPolygon;
            }

            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult TVItemEditJSON(FormCollection fc)
        {
            TVItemModel tvItemModel = _TVItemService.PostAddOrModifyTVItemDB(fc);

            return Json(tvItemModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult TVItemDeleteJSON(int TVItemID)
        {
            TVItemModel tvItemModel = _TVItemService.TVItemDeleteDB(TVItemID);

            return Json(tvItemModel.Error, JsonRequestBehavior.AllowGet);
        }

        #endregion Functions public

        #region Function private


        #endregion Function private
    }
}