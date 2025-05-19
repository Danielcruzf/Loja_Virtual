using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound("This is a not found");
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthoriseid()
        {
            return Unauthorized("This is an unauthorized response");
        }
        [HttpGet("validation-error")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is a validation error");
            ModelState.AddModelError("Problem2", "This is a validation error");
            return ValidationProblem();
        }

           [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}