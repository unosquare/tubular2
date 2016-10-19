using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Unosquare.Tubular2.Models
{
    public class OrdersDto
    {
        public int OrderID { get; set; }

        public string CustomerName { get; set; }

        public string ShipperCity { get; set; }

        public bool IsShipped { get; set; }

        public decimal Amount { get; set; }

        public DateTime ShippedDate { get; set; }

        public string CreatedUserId { get; set; }

        public int WarehouseID { get; set; }

        public int OrderType { get; set; }
    }
}
