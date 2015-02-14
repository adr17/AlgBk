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
    public class LogBookController : ApiController
    {
        private ALogBookContainer db = new ALogBookContainer();

        // GET api/LogBook
        public IQueryable<LogBook> GetLogBooks()
        {
            return db.LogBooks;
        }

        // GET api/LogBook/5
        [ResponseType(typeof(LogBook))]
        public async Task<IHttpActionResult> GetLogBook(int id)
        {
            LogBook logbook = await db.LogBooks.FindAsync(id);
            if (logbook == null)
            {
                return NotFound();
            }

            return Ok(logbook);
        }

        // PUT api/LogBook/5
        public async Task<IHttpActionResult> PutLogBook(int id, LogBook logbook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != logbook.Id)
            {
                return BadRequest();
            }

            db.Entry(logbook).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LogBookExists(id))
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

        // POST api/LogBook
        [ResponseType(typeof(LogBook))]
        public async Task<IHttpActionResult> PostLogBook(LogBook logbook)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            db.LogBooks.Add(logbook);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = logbook.Id }, logbook);
        }

        // DELETE api/LogBook/5
        [ResponseType(typeof(LogBook))]
        public async Task<IHttpActionResult> DeleteLogBook(int id)
        {
            LogBook logbook = await db.LogBooks.FindAsync(id);
            if (logbook == null)
            {
                return NotFound();
            }

            db.LogBooks.Remove(logbook);
            await db.SaveChangesAsync();

            return Ok(logbook);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LogBookExists(int id)
        {
            return db.LogBooks.Count(e => e.Id == id) > 0;
        }
    }
}