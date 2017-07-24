using CSSPWebTools.Controllers;
using CSSPWebTools.Controllers.Fakes;
using CSSPWebTools.Controllers.Resources;
using CSSPWebTools.Fakes;
using CSSPWebTools.Tests.SetupInfo;
using CSSPWebToolsDBDLL.Models;
using CSSPWebToolsDBDLL.Services;
using CSSPWebToolsDBDLL.Services.Fakes;
using CSSPWebToolsDBDLL.Services.Resources;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.QualityTools.Testing.Fakes;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Security.Principal;
using System.Transactions;
using System.Web.Fakes;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security.Fakes;
using System.Linq;
using CSSPWebTools.Models;
using System.Globalization;
using System;
using System.IO;
using CSSPModelsDLL.Models;
using CSSPEnumsDLL.Enums;

namespace CSSPWebTools.Tests.Controllers
{
    /// <summary>
    /// Summary description for FileControllerTest2
    /// </summary>
    [TestClass]
    public class FileControllerTest : SetupData
    {

        #region Variables
        private TestContext testContextInstance;
        private SetupData setupData;
        private string controllerAction = "";
        //private string StartVarShow = "000000000000000000000000000000000";
        //private string StartVarYear = "20101970";
        #endregion Variables

        #region Properties
        private ContactModel contactModel { get; set; }
        private IPrincipal user { get; set; }
        private RouteData routeData { get; set; }
        private StubHttpContextBase stubHttpContext { get; set; }
        private StubHttpRequestBase stubHttpRequestBase { get; set; }
        private RequestContext requestContext { get; set; }
        private FileController controller { get; set; }
        private RandomService randomService { get; set; }
        private ShimFileController shimFileController { get; set; }
        private TVFileService tvFileService { get; set; }
        private TVItemService tvItemService { get; set; }
        private AppTaskService appTaskService { get; set; }
        private MapInfoService mapInfoService { get; set; }
        private DocTemplateService docTemplateService { get; set; }
        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }
        #endregion Properties

        #region Constructors
        public FileControllerTest()
        {
            setupData = new SetupData();
        }
        #endregion Constructors

        #region Initialize and Cleanup
        //
        // You can use the following additional attributes as you write your tests:
        //
        // Use ClassInitialize to run code before running the first test in the class
        // [ClassInitialize()]
        // public static void MyClassInitialize(TestContext testContext) { }
        //
        // Use ClassCleanup to run code after all tests in a class have run
        // [ClassCleanup()]
        // public static void MyClassCleanup() { }
        //
        // Use TestInitialize to run code before running each test 
        // [TestInitialize()]
        // public void MyTestInitialize() { }
        //
        // Use TestCleanup to run code after each test has run
        // [TestCleanup()]
        // public void MyTestCleanup() { }
        //
        #endregion Initialize and Cleanup

        #region Testing Methods
        [TestMethod]
        public void FileController_Constructor_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                SetupTest(contactModelListGood[0], culture, controllerAction);
            }
        }
        [TestMethod]
        public void FileController_FileDownload_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "FileDownload";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    DirectoryInfo di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    if (!di.Exists)
                    {
                        di.Create();
                    }

                    di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));
                    Assert.IsTrue(di.Exists);

                    FileInfo fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + "testing.html");

                    if (!fi.Exists)
                    {
                        StreamWriter sw = new StreamWriter(fi.FullName);

                        for (int i = 0; i < 12; i++)
                        {
                            sw.WriteLine("Testing document " + i.ToString());
                        }

                        sw.Close();
                    }

                    string FileName = "testing.html";
                    fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + FileName);
                    Assert.IsTrue(fi.Exists);

                    TVItemModel tvItemModelFile = tvItemService.PostAddChildTVItemDB(tvItemModelRoot.TVItemID, FileName, TVTypeEnum.File);
                    Assert.AreEqual("", tvItemModelFile.Error);

                    TVFileModel tvFileModelNew = new TVFileModel();
                    tvFileModelNew.TVFileTVItemID = tvItemModelFile.TVItemID;

                    FillTVFileModel(tvFileModelNew);
                    tvFileModelNew.Language = controller.LanguageRequest;
                    tvFileModelNew.FilePurpose = FilePurposeEnum.Reported;
                    tvFileModelNew.FileType = FileTypeEnum.HTML;
                    tvFileModelNew.FileDescription = randomService.RandomString("File Description", 200);
                    tvFileModelNew.FileSize_kb = (int)(fi.Length / 1024);
                    tvFileModelNew.FileInfo = randomService.RandomString("File Info", 200);
                    tvFileModelNew.FileCreatedDate_UTC = DateTime.Now;
                    tvFileModelNew.ClientFilePath = "";
                    tvFileModelNew.ServerFileName = FileName;
                    tvFileModelNew.ServerFilePath = tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID);

                    TVFileModel tvFileModelRet = tvFileService.PostAddTVFileDB(tvFileModelNew);
                    Assert.AreEqual("", tvFileModelRet.Error);

                    FileResult fileResult = controller.FileDownload(tvFileModelRet.TVFileTVItemID) as FileResult;
                    Assert.IsNotNull(fileResult);
                    Assert.IsTrue(fileResult.ContentType.Length > 0);
                    Assert.AreEqual(tvFileModelRet.ServerFileName, fileResult.FileDownloadName);

                    fi.Delete();
                }
            }
        }
        [TestMethod]
        public void FileController_OpenGoogleEarth_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "OpenGoogleEarth";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                   // no testing yet
                }
            }
        }
        [TestMethod]
        public void FileController_ImageDownload_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "ImageDownload";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // no testing yet
                }
            }
        }
        [TestMethod]
        public void FileController__fileEdit_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_fileEdit";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    DirectoryInfo di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    if (!di.Exists)
                    {
                        di.Create();
                    }

                    di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));
                    Assert.IsTrue(di.Exists);

                    FileInfo fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + "this_should_be_unique.html");

                    if (!fi.Exists)
                    {
                        StreamWriter sw = new StreamWriter(fi.FullName);

                        for (int i = 0; i < 12; i++)
                        {
                            sw.WriteLine("Testing document " + i.ToString());
                        }

                        sw.Close();
                    }

                    string FileName = "this_should_be_unique.html";
                    fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + FileName);
                    Assert.IsTrue(fi.Exists);

                    TVItemModel tvItemModelFile = tvItemService.PostAddChildTVItemDB(tvItemModelRoot.TVItemID, FileName, TVTypeEnum.File);
                    Assert.AreEqual("", tvItemModelFile.Error);

                    TVFileModel tvFileModelNew = new TVFileModel();
                    tvFileModelNew.TVFileTVItemID = tvItemModelFile.TVItemID;

                    FillTVFileModel(tvFileModelNew);
                    tvFileModelNew.Language = controller.LanguageRequest;
                    tvFileModelNew.FilePurpose = FilePurposeEnum.Reported;
                    tvFileModelNew.FileType = FileTypeEnum.HTML;
                    tvFileModelNew.FileDescription = randomService.RandomString("File Description", 200);
                    tvFileModelNew.FileSize_kb = (int)(fi.Length / 1024);
                    tvFileModelNew.FileInfo = randomService.RandomString("File Info", 200);
                    tvFileModelNew.FileCreatedDate_UTC = DateTime.Now;
                    tvFileModelNew.ClientFilePath = "";
                    tvFileModelNew.ServerFileName = FileName;
                    tvFileModelNew.ServerFilePath = tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID);

                    TVFileModel tvFileModelRet = tvFileService.PostAddTVFileDB(tvFileModelNew);
                    Assert.AreEqual("", tvFileModelRet.Error);

                    PartialViewResult partialViewResult = controller._fileEdit(tvFileModelRet.TVFileTVItemID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);
                    TVFileModel tvFileModelRet2 = (TVFileModel)partialViewResult.ViewBag.TVFileModel;
                    Assert.IsNotNull(tvFileModelRet2);
                    Assert.AreEqual(tvFileModelRet.TVFileTVItemID, tvFileModelRet2.TVFileTVItemID);
                    List<FilePurposeAndText> filePurposeAndTextList = (List<FilePurposeAndText>)partialViewResult.ViewBag.FilePurposeAndTextList;
                    Assert.IsTrue(filePurposeAndTextList.Count > 0);

                    fi.Delete();
                }
            }
        }
        [TestMethod]
        public void FileController__createDocument_Root_Word_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_createDocument";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    DirectoryInfo di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    if (!di.Exists)
                    {
                        di.Create();
                    }

                    di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));
                    Assert.IsTrue(di.Exists);

                    FileInfo fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + "this_should_be_unique.docx");

                    if (!fi.Exists)
                    {
                        StreamWriter sw = new StreamWriter(fi.FullName);
                        sw.WriteLine("|||Testing document|||");
                        sw.Close();
                    }

                    string FileName = "this_should_be_unique.docx";
                    fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + FileName);
                    Assert.IsTrue(fi.Exists);

                    TVItemModel tvItemModelFile = tvItemService.PostAddChildTVItemDB(tvItemModelRoot.TVItemID, FileName, TVTypeEnum.File);
                    Assert.AreEqual("", tvItemModelFile.Error);

                    TVFileModel tvFileModelNew = new TVFileModel();
                    tvFileModelNew.TVFileTVItemID = tvItemModelFile.TVItemID;

                    FillTVFileModel(tvFileModelNew);
                    tvFileModelNew.Language = controller.LanguageRequest;
                    tvFileModelNew.FilePurpose = FilePurposeEnum.Template;
                    tvFileModelNew.FileType = FileTypeEnum.DOCX;
                    tvFileModelNew.FileDescription = randomService.RandomString("File Description", 200);
                    tvFileModelNew.FileSize_kb = (int)(fi.Length / 1024);
                    tvFileModelNew.FileInfo = randomService.RandomString("File Info", 200);
                    tvFileModelNew.FileCreatedDate_UTC = DateTime.Now;
                    tvFileModelNew.ClientFilePath = "";
                    tvFileModelNew.ServerFileName = FileName;
                    tvFileModelNew.ServerFilePath = tvFileService.ChoseEDriveOrCDrive(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    TVFileModel tvFileModelRet = tvFileService.PostAddTVFileDB(tvFileModelNew);
                    Assert.AreEqual("", tvFileModelRet.Error);

                    DocTemplateModel docTemplateModelNew = new DocTemplateModel()
                    {
                        TVType = tvItemModelRoot.TVType,
                        TVFileTVItemID = tvFileModelRet.TVFileTVItemID,
                        FileName = FileName,
                    };

                    DocTemplateModel docTemplateModelRet = docTemplateService.PostAddDocTemplateDB(docTemplateModelNew);
                    Assert.AreEqual("", docTemplateModelRet.Error);

                    PartialViewResult partialViewResult = controller._createDocument(tvItemModelRoot.TVItemID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    FileController fileController = (FileController)partialViewResult.ViewBag.FileController;
                    Assert.IsNotNull(fileController);

                    TVItemModel tvItemModelRet = (TVItemModel)partialViewResult.ViewBag.TVItemModel;
                    Assert.AreEqual("", tvItemModelRet.Error);
                    Assert.AreEqual(tvItemModelRet.TVItemID, tvItemModelRoot.TVItemID);

                    List<DocTemplateModel> docTemplateModelList = (List<DocTemplateModel>)partialViewResult.ViewBag.DocTemplateModelList;
                    Assert.IsTrue(docTemplateModelList.Count > 0);

                    fi.Delete();
                }
            }
        }
        [TestMethod]
        public void FileController__createDocument_Canada_Word_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_createDocument";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelCanada = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    DirectoryInfo di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    if (!di.Exists)
                    {
                        di.Create();
                    }

                    di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));
                    Assert.IsTrue(di.Exists);

                    FileInfo fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + "this_should_be_unique.docx");

                    if (!fi.Exists)
                    {
                        StreamWriter sw = new StreamWriter(fi.FullName);
                        sw.WriteLine("|||Testing document|||");
                        sw.Close();
                    }

                    string FileName = "this_should_be_unique.docx";
                    fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + FileName);
                    Assert.IsTrue(fi.Exists);

                    TVItemModel tvItemModelFile = tvItemService.PostAddChildTVItemDB(tvItemModelRoot.TVItemID, FileName, TVTypeEnum.File);
                    Assert.AreEqual("", tvItemModelFile.Error);

                    TVFileModel tvFileModelNew = new TVFileModel();
                    tvFileModelNew.TVFileTVItemID = tvItemModelFile.TVItemID;

                    FillTVFileModel(tvFileModelNew);
                    tvFileModelNew.Language = controller.LanguageRequest;
                    tvFileModelNew.FilePurpose = FilePurposeEnum.Template;
                    tvFileModelNew.FileType = FileTypeEnum.DOCX;
                    tvFileModelNew.FileDescription = randomService.RandomString("File Description", 200);
                    tvFileModelNew.FileSize_kb = (int)(fi.Length / 1024);
                    tvFileModelNew.FileInfo = randomService.RandomString("File Info", 200);
                    tvFileModelNew.FileCreatedDate_UTC = DateTime.Now;
                    tvFileModelNew.ClientFilePath = "";
                    tvFileModelNew.ServerFileName = FileName;
                    tvFileModelNew.ServerFilePath = tvFileService.ChoseEDriveOrCDrive(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    TVFileModel tvFileModelRet = tvFileService.PostAddTVFileDB(tvFileModelNew);
                    Assert.AreEqual("", tvFileModelRet.Error);

                    DocTemplateModel docTemplateModelNew = new DocTemplateModel()
                    {
                        TVType = tvItemModelCanada.TVType,
                        TVFileTVItemID = tvFileModelRet.TVFileTVItemID,
                        FileName = FileName,
                    };

                    DocTemplateModel docTemplateModelRet = docTemplateService.PostAddDocTemplateDB(docTemplateModelNew);
                    Assert.AreEqual("", docTemplateModelRet.Error);

                    PartialViewResult partialViewResult = controller._createDocument(tvItemModelCanada.TVItemID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    FileController fileController = (FileController)partialViewResult.ViewBag.FileController;
                    Assert.IsNotNull(fileController);

                    TVItemModel tvItemModelRet = (TVItemModel)partialViewResult.ViewBag.TVItemModel;
                    Assert.AreEqual("", tvItemModelRet.Error);
                    Assert.AreEqual(tvItemModelRet.TVItemID, tvItemModelCanada.TVItemID);

                    List<DocTemplateModel> docTemplateModelList = (List<DocTemplateModel>)partialViewResult.ViewBag.DocTemplateModelList;
                    Assert.IsTrue(docTemplateModelList.Count > 0);

                    fi.Delete();
                }
            }
        }
        [TestMethod]
        public void FileController_CreateDocumentFromTemplateJSON_Root_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CreateDocumentFromTemplateJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    DirectoryInfo di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    if (!di.Exists)
                    {
                        di.Create();
                    }

                    di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));
                    Assert.IsTrue(di.Exists);

                    FileInfo fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + "this_should_be_unique.docx");

                    if (!fi.Exists)
                    {
                        StreamWriter sw = new StreamWriter(fi.FullName);
                        sw.WriteLine("|||Testing document|||");
                        sw.Close();
                    }

                    string FileName = "this_should_be_unique.docx";
                    fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + FileName);
                    Assert.IsTrue(fi.Exists);

                    TVItemModel tvItemModelFile = tvItemService.PostAddChildTVItemDB(tvItemModelRoot.TVItemID, FileName, TVTypeEnum.File);
                    Assert.AreEqual("", tvItemModelFile.Error);

                    TVFileModel tvFileModelNew = new TVFileModel();
                    tvFileModelNew.TVFileTVItemID = tvItemModelFile.TVItemID;

                    FillTVFileModel(tvFileModelNew);
                    tvFileModelNew.Language = controller.LanguageRequest;
                    tvFileModelNew.FilePurpose = FilePurposeEnum.Template;
                    tvFileModelNew.FileType = FileTypeEnum.DOCX;
                    tvFileModelNew.FileDescription = randomService.RandomString("File Description", 200);
                    tvFileModelNew.FileSize_kb = (int)(fi.Length / 1024);
                    tvFileModelNew.FileInfo = randomService.RandomString("File Info", 200);
                    tvFileModelNew.FileCreatedDate_UTC = DateTime.Now;
                    tvFileModelNew.ClientFilePath = "";
                    tvFileModelNew.ServerFileName = FileName;
                    tvFileModelNew.ServerFilePath = tvFileService.ChoseEDriveOrCDrive(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    TVFileModel tvFileModelRet = tvFileService.PostAddTVFileDB(tvFileModelNew);
                    Assert.AreEqual("", tvFileModelRet.Error);

                    DocTemplateModel docTemplateModelNew = new DocTemplateModel()
                    {
                        TVType = tvItemModelRoot.TVType,
                        TVFileTVItemID = tvFileModelRet.TVFileTVItemID,
                        FileName = FileName,
                    };

                    DocTemplateModel docTemplateModelRet = docTemplateService.PostAddDocTemplateDB(docTemplateModelNew);
                    Assert.AreEqual("", docTemplateModelRet.Error);

                    System.Web.Mvc.FormCollection fc = new System.Web.Mvc.FormCollection();
                    fc.Add("TVItemID", tvItemModelRoot.TVItemID.ToString());
                    fc.Add("DocTemplateID", docTemplateModelRet.DocTemplateID.ToString());

                    JsonResult jsonResult = controller.CreateDocumentFromTemplateJSON(fc) as JsonResult;
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);

                    AppTaskModel appTaskModel = appTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(tvItemModelRoot.TVItemID, tvItemModelRoot.TVItemID, AppTaskCommandEnum.CreateDocumentFromTemplate);
                    Assert.AreEqual("", appTaskModel.Error);
                }
            }
        }
        [TestMethod]
        public void FileController_CreateDocumentFromTemplateJSON_Canada_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "CreateDocumentFromTemplateJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelRoot = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    TVItemModel tvItemModelCanada = tvItemService.GetChildTVItemModelWithTVItemIDAndTVTextStartWithAndTVTypeDB(tvItemModelRoot.TVItemID, "Canada", TVTypeEnum.Country);
                    Assert.AreEqual("", tvItemModelRoot.Error);

                    DirectoryInfo di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    if (!di.Exists)
                    {
                        di.Create();
                    }

                    di = new DirectoryInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));
                    Assert.IsTrue(di.Exists);

                    FileInfo fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + "this_should_be_unique.docx");

                    if (!fi.Exists)
                    {
                        StreamWriter sw = new StreamWriter(fi.FullName);
                        sw.WriteLine("|||Testing document|||");
                        sw.Close();
                    }

                    string FileName = "this_should_be_unique.docx";
                    fi = new FileInfo(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID) + FileName);
                    Assert.IsTrue(fi.Exists);

                    TVItemModel tvItemModelFile = tvItemService.PostAddChildTVItemDB(tvItemModelRoot.TVItemID, FileName, TVTypeEnum.File);
                    Assert.AreEqual("", tvItemModelFile.Error);

                    TVFileModel tvFileModelNew = new TVFileModel();
                    tvFileModelNew.TVFileTVItemID = tvItemModelFile.TVItemID;

                    FillTVFileModel(tvFileModelNew);
                    tvFileModelNew.Language = controller.LanguageRequest;
                    tvFileModelNew.FilePurpose = FilePurposeEnum.Template;
                    tvFileModelNew.FileType = FileTypeEnum.DOCX;
                    tvFileModelNew.FileDescription = randomService.RandomString("File Description", 200);
                    tvFileModelNew.FileSize_kb = (int)(fi.Length / 1024);
                    tvFileModelNew.FileInfo = randomService.RandomString("File Info", 200);
                    tvFileModelNew.FileCreatedDate_UTC = DateTime.Now;
                    tvFileModelNew.ClientFilePath = "";
                    tvFileModelNew.ServerFileName = FileName;
                    tvFileModelNew.ServerFilePath = tvFileService.ChoseEDriveOrCDrive(tvFileService.GetServerFilePath(tvItemModelRoot.TVItemID));

                    TVFileModel tvFileModelRet = tvFileService.PostAddTVFileDB(tvFileModelNew);
                    Assert.AreEqual("", tvFileModelRet.Error);

                    DocTemplateModel docTemplateModelNew = new DocTemplateModel()
                    {
                        TVType = tvItemModelCanada.TVType,
                        TVFileTVItemID = tvFileModelRet.TVFileTVItemID,
                        FileName = FileName,
                    };

                    DocTemplateModel docTemplateModelRet = docTemplateService.PostAddDocTemplateDB(docTemplateModelNew);
                    Assert.AreEqual("", docTemplateModelRet.Error);

                    System.Web.Mvc.FormCollection fc = new System.Web.Mvc.FormCollection();
                    fc.Add("TVItemID", tvItemModelCanada.TVItemID.ToString());
                    fc.Add("DocTemplateID", docTemplateModelRet.DocTemplateID.ToString());

                    JsonResult jsonResult = controller.CreateDocumentFromTemplateJSON(fc) as JsonResult;
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);

                    AppTaskModel appTaskModel = appTaskService.GetAppTaskModelWithTVItemIDTVItemID2AndCommandDB(tvItemModelCanada.TVItemID, tvItemModelCanada.TVItemID, AppTaskCommandEnum.CreateDocumentFromTemplate);
                    Assert.AreEqual("", appTaskModel.Error);
                    Assert.AreEqual("", appTaskModel.Error);
                }
            }
        }
        [TestMethod]
        public void FileController_FileEditSaveJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "FileEditSaveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    TVItemModel tvItemModelTVFile = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, randomService.RandomString("FileName ", 20), TVTypeEnum.File);
                    Assert.AreEqual("", tvItemModelTVFile.Error);

                    TVFileModel tvFileModel = randomService.RandomTVFileModel(tvItemModelTVFile, true);
                    Assert.AreEqual("", tvFileModel.Error);

                    System.Web.Mvc.FormCollection fc = new System.Web.Mvc.FormCollection();
                    fc.Add("TVFileTVItemID", tvFileModel.TVFileTVItemID.ToString());
                    if (tvFileModel.FilePurpose == FilePurposeEnum.Information)
                    {
                        fc.Add("FilePurpose", ((int)FilePurposeEnum.Generated).ToString());
                    }
                    else
                    {
                        fc.Add("FilePurpose", ((int)FilePurposeEnum.Information).ToString());
                    }
                    fc.Add("FileDescription", randomService.RandomString("Bonjour ", 100));
                    fc.Add("SaveAsFileName", randomService.RandomString("aaa ", 20));
                    fc.Add("FromWater", true.ToString());

                    JsonResult jsonResult = controller.FileEditSaveJSON(fc) as JsonResult;
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void FileController__fileImport_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_fileImport";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModel = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModel.Error);

                    PartialViewResult partialViewResult = controller._fileImport(tvItemModel.TVItemID) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    List<FilePurposeAndText> filePurposeAndTextList = (List<FilePurposeAndText>)partialViewResult.ViewBag.FilePurposeAndTextList;
                    Assert.IsNotNull(filePurposeAndTextList);
                }
            }
        }
        [TestMethod]
        public void FileController__fileList_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_fileList";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModel = tvItemService.GetRootTVItemModelDB();
                    Assert.AreEqual("", tvItemModel.Error);

                    string Q = "!View/All Location|||" + tvItemModel.TVItemID;

                    PartialViewResult partialViewResult = controller._fileList(Q) as PartialViewResult;
                    Assert.IsNotNull(partialViewResult);

                    URLModel urlModelRet = (URLModel)partialViewResult.ViewBag.URLModel;
                    Assert.IsNotNull(urlModelRet);

                    List<TVFileModel> tvFileModelList = (List<TVFileModel>)partialViewResult.ViewBag.TVFileModelList;
                    Assert.IsNotNull(tvFileModelList);

                    List<FilePurposeAndText> filePurposeAndTextList = (List<FilePurposeAndText>)partialViewResult.ViewBag.FilePurposeAndTextList;
                    Assert.IsNotNull(filePurposeAndTextList);

                    TVItemModel tvItemModelRet = (TVItemModel)partialViewResult.ViewBag.TVItemModel;
                    Assert.AreEqual("", tvItemModelRet.Error);

                    TVAuthEnum TVAuthRet = (TVAuthEnum)partialViewResult.ViewBag.TVAuth;
                    Assert.AreEqual(TVAuthEnum.Admin, TVAuthRet);

                    int NumberOfSampleRet = (int)partialViewResult.ViewBag.NumberOfSample;
                    Assert.AreEqual(30, NumberOfSampleRet);

                    bool IsShowMoreInfoRet = (bool)partialViewResult.ViewBag.IsShowMoreInfo;
                    Assert.IsFalse(IsShowMoreInfoRet);
                }
            }
        }
        [TestMethod]
        public void FileController_FileRemoveJSON_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "FileRemoveJSON";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    TVItemModel tvItemModelMunicipality = randomService.RandomTVItem(TVTypeEnum.Municipality);
                    Assert.AreEqual("", tvItemModelMunicipality.Error);

                    TVItemModel tvItemModelTVFile = tvItemService.PostAddChildTVItemDB(tvItemModelMunicipality.TVItemID, randomService.RandomString("FileName ", 20), TVTypeEnum.File);
                    Assert.AreEqual("", tvItemModelTVFile.Error);

                    TVFileModel tvFileModel = randomService.RandomTVFileModel(tvItemModelTVFile, true);
                    Assert.AreEqual("", tvFileModel.Error);

                    CoordModel coordModel = mapInfoService.GetParentLatLngDB(tvFileModel.TVFileTVItemID);
                    Assert.AreEqual("", coordModel.Error);

                    JsonResult jsonResult = controller.FileRemoveJSON(tvFileModel.TVFileTVItemID) as JsonResult;
                    Assert.IsNotNull(jsonResult);
                    string retStr = (string)jsonResult.Data;
                    Assert.AreEqual("", retStr);
                }
            }
        }
        [TestMethod]
        public void FileController__fileUpload_Test()
        {
            foreach (CultureInfo culture in setupData.cultureListGood)
            {
                controllerAction = "_fileUpload";
                contactModel = contactModelListGood[0];

                SetupTest(contactModel, culture, controllerAction);

                using (TransactionScope ts = new TransactionScope())
                {
                    // no testing yet
                }
            }
        }
        #endregion Testing Methods

        #region Functions private
        private void FillTVFileModel(TVFileModel tvFileModel)
        {
            tvFileModel.TVFileTVItemID = tvFileModel.TVFileTVItemID;
            tvFileModel.Language = LanguageEnum.en;
            tvFileModel.FilePurpose = FilePurposeEnum.Image;
            tvFileModel.FileType = FileTypeEnum.PNG;
            tvFileModel.FileDescription = randomService.RandomString("File Description", 200);
            tvFileModel.FileSize_kb = randomService.RandomInt(1, 2000000);
            tvFileModel.FileInfo = randomService.RandomString("File Info", 200);
            tvFileModel.FileCreatedDate_UTC = randomService.RandomDateTime();
            tvFileModel.ClientFilePath = randomService.RandomString("ClientFilePath", 50);
            tvFileModel.ServerFileName = randomService.RandomString("ServerFileName", 50) + ".html";
            tvFileModel.ServerFilePath = randomService.RandomString("ServerFilePath", 50);

            Assert.IsTrue(tvFileModel.TVFileTVItemID != 0);
            Assert.IsTrue(tvFileModel.Language == LanguageEnum.en);
            Assert.IsTrue(tvFileModel.FilePurpose == FilePurposeEnum.Image);
            Assert.IsTrue(tvFileModel.FileType == FileTypeEnum.PNG);
            Assert.IsTrue(tvFileModel.FileDescription.Length == 200);
            Assert.IsTrue(tvFileModel.FileSize_kb >= 1 && tvFileModel.FileSize_kb <= 2000000);
            Assert.IsTrue(tvFileModel.FileInfo.Length == 200);
            Assert.IsTrue(tvFileModel.FileCreatedDate_UTC != null);
            Assert.IsTrue(tvFileModel.ClientFilePath.Length == 50);
            Assert.IsTrue(tvFileModel.ServerFileName.Length == 55);
            Assert.IsTrue(tvFileModel.ServerFilePath.Length == 50);
        }
        private void SetupTest(ContactModel contactModelToDo, CultureInfo culture, string actionStr)
        {
            LanguageEnum languageEnum = (culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en);

            if (contactModelToDo == null)
            {
                user = null;
            }
            else
            {
                user = new GenericPrincipal(new GenericIdentity(contactModelToDo.LoginEmail, "Forms"), null);
            }
            routeData = new RouteData();
            routeData.Values.Add("culture", culture);
            routeData.Values.Add("controller", "File");
            routeData.Values.Add("action", actionStr);

            stubHttpContext = new StubHttpContextBase();
            stubHttpRequestBase = new StubHttpRequestBase();
            stubHttpContext.RequestGet = () => stubHttpRequestBase;
            requestContext = new RequestContext(stubHttpContext, routeData);
            controller = new FileController();
            controller.Url = new UrlHelper(requestContext);
            controller.ControllerContext = new ControllerContext(stubHttpContext, routeData, controller);
            stubHttpContext.UserGet = () => user;
            randomService = new RandomService(languageEnum, user);
            appTaskService = new AppTaskService(languageEnum, user);
            mapInfoService = new MapInfoService(languageEnum, user);
            tvFileService = new TVFileService(languageEnum, user);
            tvItemService = new TVItemService(languageEnum, user);
            docTemplateService = new DocTemplateService(languageEnum, user);

            controller.SetRequestContext(requestContext);

            Assert.IsNotNull(controller);
            Assert.IsNotNull(controller._FileController);
            Assert.IsNotNull(controller._TVFileService);
            Assert.IsNotNull(controller._MapInfoService);
            Assert.IsNotNull(controller._DocTemplateService);
            Assert.IsNotNull(controller._BaseEnumService);
            Assert.AreEqual(2, controller.CultureListAllowable.Count);
            Assert.AreEqual("en-CA", controller.CultureListAllowable[0]);
            Assert.AreEqual("fr-CA", controller.CultureListAllowable[1]);
            Assert.IsNotNull(controller._ContactService);
            Assert.IsNotNull(controller._RequestContext);
            Assert.IsNotNull(controller._TVFileService);
            Assert.IsNotNull(controller.urlModel);
            Assert.IsNotNull(culture.Name, controller._RequestContext.RouteData.Values["culture"].ToString());
            Assert.IsNotNull("File", controller._RequestContext.RouteData.Values["controller"].ToString());
            Assert.IsNotNull(actionStr, controller._RequestContext.RouteData.Values["action"].ToString());
            Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.LanguageRequest);
            Assert.AreEqual((culture.TwoLetterISOLanguageName == "fr" ? LanguageEnum.fr : LanguageEnum.en), controller.ViewBag.Language);
            Assert.AreEqual(culture.Name, controller.CultureRequest);
            Assert.AreEqual(culture.Name, controller.ViewBag.Culture);
            if (contactModelToDo != null)
            {
                Assert.AreEqual(contactModelToDo.IsAdmin, controller.IsAdmin);
                Assert.AreEqual(contactModelToDo.IsAdmin, controller.ViewBag.IsAdmin);
            }
            Assert.AreEqual(true, controller.Debug);
            Assert.AreEqual(true, controller.ViewBag.Debug);
        }
        private void SetupShim()
        {
            shimFileController = new ShimFileController(controller);
        }
        #endregion Functions private
    }
}

