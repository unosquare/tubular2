using Microsoft.AspNetCore.Mvc;
using Unosquare.Tubular2.Models;

namespace Unosquare.Tubular2.Sample.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        // POST api/values
        [HttpPost]
        public IActionResult Save([FromBody]OrdersDto order)
        {
            return Ok();
        }

        // PUT api/values
        [HttpPut]
        public IActionResult Put([FromBody]OrdersDto row)
        {
            return Ok();
        }
    }
}
