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
    public class TraingingHistoryController : ApiController
    {
        private ALogBookContainer db = new ALogBookContainer();

        // GET api/TraingingHistory
        public IQueryable<TrainingHistory> GetTrainingHistories()
        {
            return db.TrainingHistories;
        }

        // GET api/TraingingHistory/5
        [ResponseType(typeof(TrainingHistory))]
        public async Task<IHttpActionResult> GetTrainingHistory(int id)
        {
            TrainingHistory traininghistory = await db.TrainingHistories.FindAsync(id);
            if (traininghistory == null)
            {
                return NotFound();
            }

            return Ok(traininghistory);
        }

        // PUT api/TraingingHistory/5
        public async Task<IHttpActionResult> PutTrainingHistory(int id, TrainingHistory traininghistory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != traininghistory.Id)
            {
                return BadRequest();
            }

            db.Entry(traininghistory).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainingHistoryExists(id))
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

        // POST api/TraingingHistory
        [ResponseType(typeof(TrainingHistory))]
        public async Task<IHttpActionResult> PostTrainingHistory(TrainingHistory traininghistory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TrainingHistories.Add(traininghistory);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = traininghistory.Id }, traininghistory);
        }

        // DELETE api/TraingingHistory/5
        [ResponseType(typeof(TrainingHistory))]
        public async Task<IHttpActionResult> DeleteTrainingHistory(int id)
        {
            TrainingHistory traininghistory = await db.TrainingHistories.FindAsync(id);
            if (traininghistory == null)
            {
                return NotFound();
            }

            db.TrainingHistories.Remove(traininghistory);
            await db.SaveChangesAsync();

            return Ok(traininghistory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TrainingHistoryExists(int id)
        {
            return db.TrainingHistories.Count(e => e.Id == id) > 0;
        }
    }
}