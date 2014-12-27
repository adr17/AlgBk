using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ALogBook.EFData;

namespace ALogBook.Controllers
{
    public class RefDataSurgeryController : ApiController
    {
        private ALogBookContainer db = new ALogBookContainer();

        // GET api/RefData
        public IQueryable<RefSurgery> GetRefSurgeries()
        {
            return db.RefSurgeries;
        }

        // GET api/RefData/5
        [ResponseType(typeof(RefSurgery))]
        public async Task<IHttpActionResult> GetRefSurgery(int id)
        {
            RefSurgery refsurgery = await db.RefSurgeries.FindAsync(id);
            if (refsurgery == null)
            {
                return NotFound();
            }

            return Ok(refsurgery);
        }

        // PUT api/RefData/5
        public async Task<IHttpActionResult> PutRefSurgery(int id, RefSurgery refsurgery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != refsurgery.Id)
            {
                return BadRequest();
            }

            db.Entry(refsurgery).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RefSurgeryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/RefData
        [ResponseType(typeof(RefSurgery))]
        public async Task<IHttpActionResult> PostRefSurgery(RefSurgery refsurgery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RefSurgeries.Add(refsurgery);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = refsurgery.Id }, refsurgery);
        }

        // DELETE api/RefData/5
        [ResponseType(typeof(RefSurgery))]
        public async Task<IHttpActionResult> DeleteRefSurgery(int id)
        {
            RefSurgery refsurgery = await db.RefSurgeries.FindAsync(id);
            if (refsurgery == null)
            {
                return NotFound();
            }

            db.RefSurgeries.Remove(refsurgery);
            await db.SaveChangesAsync();

            return Ok(refsurgery);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RefSurgeryExists(int id)
        {
            return db.RefSurgeries.Count(e => e.Id == id) > 0;
        }
    }
}