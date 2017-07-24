using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using CSSPWebTools.Models;
using CSSPWebToolsDBDLL.Models;
using System.Web.UI;
using CSSPWebToolsDBDLL.Services;
using CSSPWebTools.Controllers.Resources;
using System.Transactions;
using CSSPModelsDLL.Models;

namespace CSSPWebTools.Controllers
{
    [Authorize]
    public class AccountController : BaseController
    {
        #region Variables
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        #endregion Variables

        #region Properties
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set { _signInManager = value; }
        }
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        #endregion Properties

        #region Constructors
        public AccountController()
        {
        }
        #endregion Constructors

        #region Overides
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
        }
        #endregion Overides

        #region Functions public

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _ForgotPassword()
        {
            return PartialView();
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _ForgotPasswordEmailSent()
        {
            return PartialView();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult ForgotPasswordJSON(ResetPasswordModel resetPasswordModel)
        {
            ContactModel contactModel = _ContactService.PostResetPasswordDB(resetPasswordModel);

            return Json(contactModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult IsAdminJSON()
        {
            bool IsAdmin = _ContactService.IsAdministratorDB(User.Identity.Name);
            return Json(IsAdmin.ToString().ToLower(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult LoggedInUserCreateNewUserJSON(NewContactModel newContactModel)
        {
            ContactModel contactModel = _ContactService.PostLoggedInUserCreateNewUserDB(newContactModel);

            return Json(contactModel, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _Login(string ReturnURL = "")
        {
            ViewBag.LoginModel = new LoginModel() { ReturnURL = ReturnURL };
            return PartialView();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult LoginJSON(LoginModel loginModel)
        {
            loginModel.Error = "";

            string retStr = _ContactService.LoginModelOK(loginModel);
            if (!string.IsNullOrWhiteSpace(retStr))
            {
                loginModel.Password = "";
                loginModel.Error = ControllerRes.EmailOrPasswordIncorrect;
                return Json(loginModel, JsonRequestBehavior.AllowGet);
            }

            SignInStatus signInStatus = GetSignInManagerPasswordSignIn(loginModel);
            if (signInStatus != SignInStatus.Success)
            {
                loginModel.Password = "";
                loginModel.Error = ControllerRes.EmailOrPasswordIncorrect;
                return Json(loginModel, JsonRequestBehavior.AllowGet);
            }

            if (loginModel.ReturnURL == null)
            {
                loginModel.ReturnURL = "";
            }

            loginModel.Password = "";

            return Json(loginModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult LogOffJSON()
        {
            AuthenticationManagerSignOut();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [AllowAnonymous]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public PartialViewResult _Register()
        {
            return PartialView();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult RegisterJSON(RegisterModel registerModel)
        {
            if (!string.IsNullOrWhiteSpace(registerModel.FirstName) && !string.IsNullOrWhiteSpace(registerModel.LastName))
            {
                registerModel.WebName = _ContactService.CreateUniqueWebName(registerModel.FirstName, registerModel.LastName);
            }
            ContactModel contactModelRet = _ContactService.PostRegisterNewContactDB(registerModel);
            if (!string.IsNullOrWhiteSpace(contactModelRet.Error))
            {
                return Json(contactModelRet, JsonRequestBehavior.AllowGet);
            }

            LoginModel loginModel = new LoginModel()
            { 
                Email = registerModel.LoginEmail,
                Password = registerModel.Password,
                RememberMe = false,
                ReturnURL = registerModel.ReturnURL,
            };

            SignInStatus signInStatus = GetSignInManagerPasswordSignIn(loginModel);
            if (signInStatus != SignInStatus.Success)
            {
                contactModelRet.Error = ControllerRes.EmailOrPasswordIncorrect;
                return Json(contactModelRet, JsonRequestBehavior.AllowGet);
            }

            if (loginModel.ReturnURL == null)
            {
                loginModel.ReturnURL = "";
            }

            return Json(contactModelRet, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public JsonResult TryToSendEmailJSON(string Email)
        {
            ResetPasswordModel resetPasswordModelRet = _ContactService.PostTryToSendEmailDB(Email);

            return Json(resetPasswordModelRet.Error, JsonRequestBehavior.AllowGet);
        }
        #endregion Functions public

        #region Functions private 
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
        private void AuthenticationManagerSignOut()
        {
            AuthenticationManager.SignOut();
        }
        private SignInStatus GetSignInManagerPasswordSignIn(LoginModel loginModel)
        {
            SignInStatus signInStatus = SignInManager.PasswordSignIn(loginModel.Email, loginModel.Password, loginModel.RememberMe, shouldLockout: false);

            return signInStatus;
        }
        #endregion Functions private
    }
}