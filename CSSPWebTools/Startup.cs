using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CSSPWebTools.Startup))]
namespace CSSPWebTools
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
