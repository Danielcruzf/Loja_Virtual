using System;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<User> signInManager;

        public AccountController(SignInManager<User> signInManager)
        {
            this.signInManager = signInManager;
        }

        [HttpPost("register")]//Resumindo: esse método cadastra um novo usuário, valida possíveis erros e, se tudo der certo, adiciona o usuário ao grupo "Member".
        public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Email, Email = registerDto.Email };//cria um novo usuário com o nome de usuário e email fornecidos no DTO de registro.

            var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);//

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await signInManager.UserManager.AddToRoleAsync(user, "Member");//Se o registro for bem-sucedido, adiciona o novo usuário ao papel (role) "Member".

            return Ok();
        }

        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            if (User.Identity?.IsAuthenticated ?? false) return NoContent();//verificação se o usuário está autenticado.

            var user = await signInManager.UserManager.GetUserAsync(User);//Obtém o usuário autenticado.
            if (user == null) return Unauthorized();//Se o usuário não for encontrado, retorna um erro de autorização.

            var roles = await signInManager.UserManager.GetRolesAsync(user);//Obtém os papéis (roles) do usuário autenticado.
            return Ok(new { user.UserName, user.Email, Roles = roles });//Retorna as informações do usuário
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();

            return NoContent();
        }
[Authorize]
        [HttpPost("address")]
        public async Task<ActionResult<Address>> CreateOrUpdateAddress(Address address)
        {
            var user = await signInManager.UserManager.Users
      .Include(x => x.Address)
      .FirstOrDefaultAsync(x => x.UserName == User.Identity!.Name);

            if (user == null) return Unauthorized();

            user.Address = address;

            var result = await signInManager.UserManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem updatating user address");

            return Ok(user.Address);
        }
        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<Address>> GetSavedAddress()
        {
            var address = await signInManager.UserManager.Users
            .Where(x => x.UserName == User.Identity!.Name)
            .Select(x => x.Address)
            .FirstOrDefaultAsync();

            if (address == null) return NoContent();

            return address;
        }
    }
}

