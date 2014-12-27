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
    public class UserController : ApiController
    {
        private ALogBookContainer db = new ALogBookContainer();

        // GET api/User
        public IQueryable<Users> GetUsers()
        {
            return db.Users;
        }

        // GET api/User/5
        [ResponseType(typeof(Users))]
        public async Task<IHttpActionResult> GetUsers(int id)
        {
            Users users = await db.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        // PUT api/User/5
        public async Task<IHttpActionResult> PutUsers(int id, Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != users.Id)
            {
                return BadRequest();
            }

            db.Entry(users).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
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

        // POST api/User
        [ResponseType(typeof(Users))]
        public async Task<IHttpActionResult> PostUsers(Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(users);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = users.Id }, users);
        }

        // DELETE api/User/5
        [ResponseType(typeof(Users))]
        public async Task<IHttpActionResult> DeleteUsers(int id)
        {
            Users users = await db.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            db.Users.Remove(users);
            await db.SaveChangesAsync();

            return Ok(users);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UsersExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}