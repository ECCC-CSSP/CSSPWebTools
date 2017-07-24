using CSSPEnumsDLL.Enums;
using CSSPEnumsDLL.Services;
using CSSPModelsDLL.Models;
using CSSPWebTools.Models;
using CSSPWebToolsDBDLL;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using CSSPWebToolsDBDLL.Services.Resources;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace CSSPWebTools.Controllers
{
    public class FileController : BaseController
    {
        #region Variables
        #endregion Variables

        #region Properties
        public FileController _FileController { get; private set; }
        public TVFileService _TVFileService { get; private set; }
        public MapInfoService _MapInfoService { get; private set; }
        public DocTemplateService _DocTemplateService { get; private set; }
        public BaseEnumService _BaseEnumService { get; private set; } 
        #endregion Properties

        #region Constructors
        public FileController()
        {
            _FileController = this;
        }
        #endregion Constructors

        #region Overrides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            _TVFileService = new TVFileService(LanguageRequest, User);
            _MapInfoService = new MapInfoService(LanguageRequest, User);
            _DocTemplateService = new DocTemplateService(LanguageRequest, User);
            _BaseEnumService = new BaseEnumService(LanguageRequest);
        }
        #endregion Overrides

        #region Functions public

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public FileResult FileDownload(int TVFileTVItemID)
        {
            TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);

            string ServerFileName = _TVFileService.ChoseEDriveOrCDrive(tvFileModel.ServerFilePath + tvFileModel.ServerFileName);

            FileInfo fi = new FileInfo(ServerFileName);

            string ContentType = _TVFileService.GetMimeType(ServerFileName);
            return File(ServerFileName, ContentType, fi.Name);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public FileResult OpenGoogleEarth()
        {
            string ServerFileName = Server.MapPath("/") + "Images\\empty.kmz";

            FileInfo fi = new FileInfo(ServerFileName);

            string ContentType = _TVFileService.GetMimeType(ServerFileName);
            return File(ServerFileName, ContentType, fi.Name);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public FileStreamResult ImageDownload(string Text)
        {
            //Create new image
            Image img = Image.FromFile(@"C:\CSSPWebTools\CSSPWebTools\Images\mapMarker.png", true);
            //Graphics g = Graphics.FromImage(img);

            ////Do some drawing
            //Font font = new Font("Arial", 14);
            //PointF drawingPoint = new PointF(5, 3);

            //g.DrawRectangle(new Pen(Brushes.White), new Rectangle(0, 0, img.Width, img.Height));
            //g.DrawString(Text, font, Brushes.Orange, drawingPoint);

            //Return Image
            MemoryStream ms = new MemoryStream();
            img.Save(ms, ImageFormat.Png);

            ms.Position = 0;

            return new FileStreamResult(ms, "image/png");
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _fileEdit(int TVFileTVItemID)
        {
            ViewBag.TVFileModel = null;
            ViewBag.FilePurposeAndTextList = null;

            TVFileModel tvFileModel = _TVFileService.GetTVFileModelWithTVFileTVItemIDDB(TVFileTVItemID);
            ViewBag.TVFileModel = tvFileModel;

            List<FilePurposeAndText> filePurposeAndTextList = FillFilePurposeAndTextList();
            ViewBag.FilePurposeAndTextList = filePurposeAndTextList.OrderBy(c => c.FilePurposeText).ToList();
          
            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _createDocument(int TVItemID)
        {
            ViewBag.FileController = _FileController;
            ViewBag.TVItemModel = null;
            ViewBag.DocTemplateModelList = null;

            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(TVItemID);
            ViewBag.TVItemModel = tvItemModel;

            if (string.IsNullOrWhiteSpace(tvItemModel.Error))
            {
                List<DocTemplateModel> docTemplateModelList = _DocTemplateService.GetDocTemplateModelListWithTVTypeDB(tvItemModel.TVType);
                ViewBag.DocTemplateModelList = docTemplateModelList;
            }
            return PartialView(); 
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult CreateDocumentFromTemplateJSON(FormCollection fc)
        {
            string ret = _TVFileService.CreateDocumentFromTemplateDB(fc);

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult FileEditSaveJSON(FormCollection fc)
        {
            TVFileModel tvFileModelRet = _TVFileService.FileEditSaveDB(fc);

            return Json(tvFileModelRet.Error, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _fileImport(int ParentTVItemID)
        {
            ViewBag.ParentTVItemID = ParentTVItemID;
            ViewBag.FilePurposeAndTextList = null;

            List<FilePurposeAndText> filePurposeAndTextList = FillFilePurposeAndTextList();
            ViewBag.FilePurposeAndTextList = filePurposeAndTextList.OrderBy(c => c.FilePurposeText).ToList();
          
            return PartialView();
        }

        [HttpGet]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _fileList(string Q)
        {
            ViewBag.URLModel = null;
            ViewBag.TVFileModelList = null;
            ViewBag.FilePurposeAndTextList = null;
            ViewBag.TVItemModel = null;
            ViewBag.TVAuth = null;
            //ViewBag.Tab1ViewTVItemInfoList = null;
            ViewBag.NumberOfSample = null;
            ViewBag.IsShowMoreInfo = null;

            SetArgs(Q);
            ViewBag.URLModel = urlModel;

            List<TVFileModel> tvFileModelList = _TVFileService.GetTVFileModelListWithParentTVItemIDDB(urlModel.TVItemIDList[0]);
            ViewBag.TVFileModelList = tvFileModelList;

            List<FilePurposeAndText> filePurposeAndTextList = FillFilePurposeAndTextList();
            ViewBag.FilePurposeAndTextList = filePurposeAndTextList.OrderBy(c => c.FilePurposeText).ToList();

            TVItemModel tvItemModel = _TVItemService.GetTVItemModelWithTVItemIDDB(urlModel.TVItemIDList[0]);
            ViewBag.TVItemModel = tvItemModel;

            TVAuthEnum tvAuth = _TVItemService.GetTVAuthWithTVItemIDAndLoggedInUser(urlModel.TVItemIDList[0], null, null, null);
            ViewBag.TVAuth = tvAuth;

            //List<TabInfo> Tab1ViewTVItemInfoList = GetTab1ViewTVItemInfoDB(tvItemModel, tvAuth);
            //ViewBag.Tab1ViewTVItemInfoList = Tab1ViewTVItemInfoList;

            ViewBag.NumberOfSample = int.Parse(GetURLVarShowEnumStr(URLVarShowEnum.NumberOfSampleDecade) + GetURLVarShowEnumStr(URLVarShowEnum.NumberOfSampleUnit));

            ViewBag.IsShowMoreInfo = (GetURLVarShowEnumStr(URLVarShowEnum.ShowMoreInfo) == "0" ? false : true);

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult FileRemoveJSON(int TVFileTVItemID)
        {
            TVFileModel tvFileModelRet = _TVFileService.PostDeleteTVFileWithTVItemIDDB(TVFileTVItemID);

            return Json(tvFileModelRet.Error, JsonRequestBehavior.AllowGet);
        }
         
        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _fileUpload(FormCollection fc)
        {
            TVFileModel tvFileModelRet = FileUploadDB(fc, Request);

            ViewBag.TVFileModel = tvFileModelRet;

            return PartialView();
        }

        [HttpPost]
        [OutputCache(Duration = 1)]
        public ActionResult GetParentLatLng(int TVItemID)
        {
            CoordModel coordModel = _MapInfoService.GetParentLatLngDB(TVItemID);

            return Json(coordModel, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public

        #region private
        [NonAction]
        private List<FilePurposeAndText> FillFilePurposeAndTextList()
        {
            List<FilePurposeAndText> filePurposeAndTextList = new List<FilePurposeAndText>();
            for (int i = 1, count = Enum.GetNames(typeof(FilePurposeEnum)).Length; i < count; i++)
            {
                FilePurposeAndText filePurposeAndText = new FilePurposeAndText()
                {
                    FilePurpose = (FilePurposeEnum)i,
                    FilePurposeText = _BaseEnumService.GetEnumText_FilePurposeEnum((FilePurposeEnum)i)
                };

                filePurposeAndTextList.Add(filePurposeAndText);
            }

            return filePurposeAndTextList;
        }
        [NonAction]
        public TVFileModel FileUploadDB(FormCollection fc, HttpRequestBase Request)
        {
            ContactOK contactOK = _TVFileService.IsContactOK();
            if (!string.IsNullOrEmpty(contactOK.Error))
                return _TVFileService.ReturnError(contactOK.Error);

            int ParentTVItemID = 0;
            int tempInt = 0;
            LanguageEnum Language = LanguageEnum.Error;
            FilePurposeEnum FilePurpose = FilePurposeEnum.Error;
            string FileDescription = "";
            bool KeepFileName = true;
            string SaveAsFileName = "";
            bool? FromWater = null;

            int.TryParse(fc["ParentTVItemID"], out ParentTVItemID);
            if (ParentTVItemID == 0)
                return new TVFileModel() { Error = string.Format(ServiceRes._IsRequired, ServiceRes.ParentTVItemID) };

            int.TryParse(fc["Language"], out tempInt);
            if (tempInt == 0)
                return new TVFileModel() { Error = string.Format(ServiceRes._IsRequired, ServiceRes.Language) };

            Language = (LanguageEnum)tempInt;

            int.TryParse(fc["FilePurpose"], out tempInt);
            if (tempInt == 0)
                return new TVFileModel() { Error = string.Format(ServiceRes._IsRequired, ServiceRes.FilePurpose) };

            FilePurpose = (FilePurposeEnum)tempInt;

            FileDescription = fc["FileDescription"];
            if (string.IsNullOrWhiteSpace(FileDescription))
                return new TVFileModel() { Error = string.Format(ServiceRes._IsRequired, ServiceRes.FileDescription) };

            if (fc["KeepFileName"] == null)
            {
                KeepFileName = false;
            }

            if (!KeepFileName)
            {
                SaveAsFileName = fc["SaveAsFileName"];
                if (string.IsNullOrWhiteSpace(SaveAsFileName))
                    return new TVFileModel() { Error = string.Format(ServiceRes._IsRequired, ServiceRes.SaveAsFileName) };
            }

            if (fc["FromWater"] != null)
            {
                if (string.IsNullOrWhiteSpace(fc["FromWater"]))
                {
                    FromWater = null;
                }
                else
                {
                    FromWater = true;
                }
            }

            List<string> AllowableExt = _TVFileService.GetAllowableExt();

            TVFileModel tvFileModelRet = new TVFileModel();
            using (TransactionScope ts = new TransactionScope())
            {
                string FileName = "";

                if (Request.Files.Count != 1)
                    return _TVFileService.ReturnError(ServiceRes.CanOnlyLoadOneFileAtATime);

                HttpPostedFileBase hpf = null;
                foreach (string file in Request.Files)
                {
                    hpf = Request.Files[file];
                }

                if (hpf == null)
                    return _TVFileService.ReturnError(ServiceRes.PleaseSelectAFileToUpload);

                FileName = hpf.FileName;

                FileInfo fi = new FileInfo(FileName);

                if (!AllowableExt.Contains(fi.Extension.ToLower()))
                {
                    string AllowableExtText = "";
                    foreach (string s in AllowableExt)
                    {
                        AllowableExtText += s + " ";
                    }
                    return _TVFileService.ReturnError(string.Format(ServiceRes.PleaseSelectAFileOfType_, AllowableExtText));
                }

                string ServerFileName = "";
                if (FileName.Contains(@"\"))
                {
                    ServerFileName = FileName.Substring(FileName.LastIndexOf(@"\") + 1);
                }
                else
                {
                    ServerFileName = FileName;
                }

                if (!KeepFileName)
                {
                    ServerFileName = SaveAsFileName + fi.Extension;
                }
                
                string ServerFilePath = "";

                TVItemModel tvItemModelParent = new TVItemModel();

                if (FilePurpose == FilePurposeEnum.Template)
                {
                    tvItemModelParent = _TVItemService.GetRootTVItemModelDB();
                    if (!string.IsNullOrEmpty(tvItemModelParent.Error))
                        return _TVFileService.ReturnError(tvItemModelParent.Error);
                }
                else
                {
                    tvItemModelParent = _TVFileService._TVItemService.GetTVItemModelWithTVItemIDDB(ParentTVItemID);
                    if (!string.IsNullOrWhiteSpace(tvItemModelParent.Error))
                        return _TVFileService.ReturnError(tvItemModelParent.Error);
                }

                TVItemModel tvItemModelExist = _TVFileService._TVItemService.GetChildTVItemModelWithParentIDAndTVTextAndTVTypeDB(tvItemModelParent.TVItemID, ServerFileName, TVTypeEnum.File);
                if (string.IsNullOrEmpty(tvItemModelExist.Error))
                    return _TVFileService.ReturnError(string.Format(ServiceRes._AlreadyExists, ServerFileName));

                TVItemModel tvItemModelTVFileRet = _TVFileService._TVItemService.PostAddChildTVItemDB(tvItemModelParent.TVItemID, ServerFileName, TVTypeEnum.File);
                if (!string.IsNullOrEmpty(tvItemModelTVFileRet.Error))
                    return _TVFileService.ReturnError(tvItemModelTVFileRet.Error);

                ServerFilePath = _TVFileService.GetServerFilePath(tvItemModelParent.TVItemID);

                int FileLength = hpf.ContentLength;

                DirectoryInfo di = new DirectoryInfo(ServerFilePath);
                if (!di.Exists)
                {
                    di.Create();
                }
         
                fi = new FileInfo(ServerFilePath + ServerFileName);

                if (fi.Exists)
                    return _TVFileService.ReturnError(string.Format(ServiceRes.File_AlreadyExist, ServerFileName));

                hpf.SaveAs(fi.FullName);

                FileTypeEnum fileType = _TVFileService.GetFileType(fi.Extension.ToUpper());

                if (FilePurpose == FilePurposeEnum.Template)
                {
                    //if (!(fileType == FileTypeEnum.CSV || fileType == FileTypeEnum.XLSX || fileType == FileTypeEnum.DOCX || fileType == FileTypeEnum.KML))
                    //{
                    //    DeleteFileFromServer(fi);
                    //    return _TVFileService.ReturnError(string.Format(ServiceRes.WhenUploadingTemplateOnlyFileTypes_AreAllowed, ".csv, .docx, .xlsx, .kml"));
                    //}
                    if (!(fileType == FileTypeEnum.CSV || fileType == FileTypeEnum.DOCX || fileType == FileTypeEnum.KML || fileType == FileTypeEnum.XLSX))
                    {
                        DeleteFileFromServer(fi);
                        return _TVFileService.ReturnError(string.Format(ServiceRes.WhenUploadingTemplateOnlyFileTypes_AreAllowed, ".csv, .docx, .xmlx and .kml") + " ... for now.");
                    }
                }

                TVFileModel tvFileModelNew = new TVFileModel()
                {
                    TVFileTVItemID = tvItemModelTVFileRet.TVItemID,
                    FilePurpose = FilePurpose,
                    FileDescription = FileDescription,
                    FileType = fileType,
                    FileSize_kb = Math.Max(hpf.ContentLength/1024, 1),
                    FileInfo = "Uploaded file",
                    FileCreatedDate_UTC = DateTime.Now,
                    FromWater = FromWater,
                    ClientFilePath = FileName,
                    ServerFileName = ServerFileName,
                    ServerFilePath = ServerFilePath,
                    Language = Language,
                };

                TVFile tvFileExist = _TVFileService.GetTVFileExistDB(tvFileModelNew);
                if (tvFileExist != null)
                {
                    DeleteFileFromServer(fi);
                    return _TVFileService.ReturnError(string.Format(ServiceRes._AlreadyExists, ServiceRes.TVFile));
                }

                tvFileModelRet = _TVFileService.PostAddTVFileDB(tvFileModelNew);
                if (!string.IsNullOrWhiteSpace(tvFileModelRet.Error))
                {
                    DeleteFileFromServer(fi);
                    return _TVFileService.ReturnError(tvFileModelRet.Error);
                }

                if (FilePurpose == FilePurposeEnum.Template)
                {
                    tvItemModelParent = _TVFileService._TVItemService.GetTVItemModelWithTVItemIDDB(ParentTVItemID);
                    if (!string.IsNullOrWhiteSpace(tvItemModelParent.Error))
                        return _TVFileService.ReturnError(tvItemModelParent.Error);

                    DocTemplateModel docTemplateModelNew = new DocTemplateModel()
                    {
                        TVType = tvItemModelParent.TVType,
                        TVFileTVItemID = tvFileModelRet.TVFileTVItemID,
                        FileName = ServerFileName,
                    };

                    DocTemplateModel docTemplateModelRet = _DocTemplateService.PostAddDocTemplateDB(docTemplateModelNew);
                    if (!string.IsNullOrWhiteSpace(docTemplateModelRet.Error))
                    {
                        DeleteFileFromServer(fi);
                        return _TVFileService.ReturnError(docTemplateModelRet.Error);
                    }

                    //bool IsTrue = true;
                    //if (IsTrue)
                    //{
                    //    DeleteFileFromServer(fi);
                    //    return _TVFileService.ReturnError("Should parse the File to check if the first ||| tag has the right TVType");
                    //}
                }

                ts.Complete();
            }

            return tvFileModelRet;
        }
        [NonAction]
        public void DeleteFileFromServer(FileInfo fi)
        {
            try
            {
                fi.Delete();
            }
            catch (Exception)
            {
                // nothing
            }
        }

        #endregion private
    }
}