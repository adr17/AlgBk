using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ALogBook.Startup))]
namespace ALogBook
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
