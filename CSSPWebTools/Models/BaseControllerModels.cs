using CSSPEnumsDLL.Enums;
using CSSPDBDLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CSSPWebTools.Models
{
    public class ContentActionAndController
    {
        public string Action { get; set; }
        public string Controller { get; set; }
    }

    public class TabInfo
    {
        public string URL { get; set; }
        public string Text { get; set; }
        public string Icon { get; set; }
        public string ToolTip { get; set; }
        public string Active { get; set; }
        public string Action { get; set; }
        public string Controller { get; set; }
        public TVTypeEnum ShowTVType { get; set; }
        public int Stat { get; set; }
        public int Stat2 { get; set; }
        public List<List<IconInfo>> viewTVItemIconListList { get; set; }
    }

    public class IconInfo
    {
        public string URL { get; set; }
        public bool IsVisible { get; set; }
        public string jbClassName { get; set; }
        public string Icon { get; set; }
        public string ToolTip { get; set; }
    }
}