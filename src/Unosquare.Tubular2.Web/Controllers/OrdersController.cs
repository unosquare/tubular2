using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Unosquare.Tubular2.Sample.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        // PUT api/values/5
        [HttpPut]
        public IActionResult Put([FromBody]string value)
        {
            return Ok();
        }
    }
}
