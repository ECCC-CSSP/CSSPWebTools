using CSSPDBDLL.Services.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSSPWebTools.Models
{
    public class URLModel
    {
        public URLModel()
        {
            Error = "";
            Q = Q;
            TVTextList = new List<string>() { "!Home", ServiceRes.AllLocations, "A", "B" };
            TVItemIDList = new List<int>() { 1, 1, 30 };
            VariableShow = "30" + new string("0".ToCharArray()[0], 30);
        }

        public string Error { get; set; }
        public string Q { get; set; }
        public List<string> TVTextList { get; set; }
        public List<int> TVItemIDList { get; set; }
        public string VariableShow { get; set; }
    }

    public enum URLVarShowEnum
    {
        NumberOfSampleDecade,
        NumberOfSampleUnit,
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
        ShowOrderByDateModified,
    }
}