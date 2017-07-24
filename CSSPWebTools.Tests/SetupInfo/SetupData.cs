using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSSPWebToolsDBDLL.Models;
using System.Globalization;
using CSSPModelsDLL.Models;

namespace CSSPWebTools.Tests.SetupInfo
{
    public class SetupData
    {
        public List<CultureInfo> cultureListGood { get; set; }
        public List<CultureInfo> cultureListBad { get; set; }
        public List<ContactModel> contactModelListGood { get; set; }
        public List<ContactModel> contactModelListBad { get; set; }
        public SetupData()
        {
            cultureListGood = new List<CultureInfo>() { new CultureInfo("en-CA"), new CultureInfo("fr-CA") };
            cultureListBad = new List<CultureInfo>() { new CultureInfo("en-GB"), new CultureInfo("FR-FR") };
            contactModelListGood = new List<ContactModel>()
            {
                new ContactModel() { ContactTVItemID = 2, ContactID = 1, LoginEmail = "Charles.LeBlanc2@canada.ca", FirstName = "Charles", Initial = "G", LastName = "LeBlanc", WebName = "Charles", IsAdmin = true, Disabled = false, EmailValidated = true },
                new ContactModel() { ContactTVItemID = 3, ContactID = 2, LoginEmail = "Christopher.Roberts@canada.ca",  FirstName = "Christopher", Initial = "", LastName = "Roberts", WebName = "Christopher", IsAdmin = false, Disabled = false, EmailValidated = false },
                new ContactModel() { ContactTVItemID = 4, ContactID = 3, LoginEmail = "Martin.Rodrigue@canada.ca", FirstName = "Martin", Initial = "", LastName = "Rodrigue", WebName = "Rodrigue", IsAdmin = false, Disabled = false, EmailValidated = false },
              };
            contactModelListBad = new List<ContactModel>()
            {
                new ContactModel() { LoginEmail = "BAdCharles.LeBlanc@canada.ca", FirstName = "Charles", Initial = "G", LastName = "LeBlanc", WebName = "Chalres", IsAdmin = false, Disabled = false, EmailValidated = false },
            };
          
        }
    }
}
