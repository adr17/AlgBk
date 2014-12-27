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
    public class ClinicSessionsController : ApiController
    {
        private ALogBookContainer db = new ALogBookContainer();

        // GET api/ClinicSessions
        public IQueryable<ClinicSessions> GetClinicSessions()
        {
            return db.ClinicSessions;
        }

        // GET api/ClinicSessions/5
        [ResponseType(typeof(ClinicSessions))]
        public async Task<IHttpActionResult> GetClinicSessions(int id)
        {
            ClinicSessions clinicsessions = await db.ClinicSessions.FindAsync(id);
            if (clinicsessions == null)
            {
                return NotFound();
            }

            return Ok(clinicsessions);
        }

        // PUT api/ClinicSessions/5
        public async Task<IHttpActionResult> PutClinicSessions(int id, ClinicSessions clinicsessions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clinicsessions.Id)
            {
                return BadRequest();
            }

            db.Entry(clinicsessions).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClinicSessionsExists(id))
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

        // POST api/ClinicSessions
        [ResponseType(typeof(ClinicSessions))]
        public async Task<IHttpActionResult> PostClinicSessions(ClinicSessions clinicsessions)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClinicSessions.Add(clinicsessions);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = clinicsessions.Id }, clinicsessions);
        }

        // DELETE api/ClinicSessions/5
        [ResponseType(typeof(ClinicSessions))]
        public async Task<IHttpActionResult> DeleteClinicSessions(int id)
        {
            ClinicSessions clinicsessions = await db.ClinicSessions.FindAsync(id);
            if (clinicsessions == null)
            {
                return NotFound();
            }

            db.ClinicSessions.Remove(clinicsessions);
            await db.SaveChangesAsync();

            return Ok(clinicsessions);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClinicSessionsExists(int id)
        {
            return db.ClinicSessions.Count(e => e.Id == id) > 0;
        }
    }
}