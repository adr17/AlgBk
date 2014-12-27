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
    public class RefDataAbbrController : ApiController
    {
        private ALogBookContainer db = new ALogBookContainer();

        // GET api/RefDataAbbr
        public IQueryable<RefAbbreviations> GetRefAbbreviations()
        {
            return db.RefAbbreviations;
        }

        // GET api/RefDataAbbr/5
        [ResponseType(typeof(RefAbbreviations))]
        public async Task<IHttpActionResult> GetRefAbbreviations(int id)
        {
            RefAbbreviations refabbreviations = await db.RefAbbreviations.FindAsync(id);
            if (refabbreviations == null)
            {
                return NotFound();
            }

            return Ok(refabbreviations);
        }

        // PUT api/RefDataAbbr/5
        public async Task<IHttpActionResult> PutRefAbbreviations(int id, RefAbbreviations refabbreviations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != refabbreviations.Id)
            {
                return BadRequest();
            }

            db.Entry(refabbreviations).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RefAbbreviationsExists(id))
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

        // POST api/RefDataAbbr
        [ResponseType(typeof(RefAbbreviations))]
        public async Task<IHttpActionResult> PostRefAbbreviations(RefAbbreviations refabbreviations)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RefAbbreviations.Add(refabbreviations);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = refabbreviations.Id }, refabbreviations);
        }

        // DELETE api/RefDataAbbr/5
        [ResponseType(typeof(RefAbbreviations))]
        public async Task<IHttpActionResult> DeleteRefAbbreviations(int id)
        {
            RefAbbreviations refabbreviations = await db.RefAbbreviations.FindAsync(id);
            if (refabbreviations == null)
            {
                return NotFound();
            }

            db.RefAbbreviations.Remove(refabbreviations);
            await db.SaveChangesAsync();

            return Ok(refabbreviations);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RefAbbreviationsExists(int id)
        {
            return db.RefAbbreviations.Count(e => e.Id == id) > 0;
        }
    }
}